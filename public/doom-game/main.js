'use strict';
var memory = new WebAssembly.Memory({ initial: 108 });

/* STRIPPED LOGGING 
   We define these but keep them empty or console-only to prevent HTML clutter.
*/
function readWasmString(offset, length) {
    const bytes = new Uint8Array(memory.buffer, offset, length);
    return new TextDecoder('utf8').decode(bytes);
}

function appendOutput(style) {
    return function(offset, length) {
        // console.log(readWasmString(offset, length)); // Uncomment for debug
    }
}

function getMilliseconds() {
    return performance.now();
}

/* RENDERING */
const canvas = document.getElementById('screen');
const doom_screen_width = 320 * 2;
const doom_screen_height = 200 * 2;

// Ensure canvas internal buffer matches Doom resolution
canvas.width = doom_screen_width;
canvas.height = doom_screen_height;

function drawCanvas(ptr) {
    var doom_screen = new Uint8ClampedArray(memory.buffer, ptr, doom_screen_width * doom_screen_height * 4);
    var render_screen = new ImageData(doom_screen, doom_screen_width, doom_screen_height);
    var ctx = canvas.getContext('2d');
    ctx.putImageData(render_screen, 0, 0);
}

/* WASM IMPORTS */
var importObject = {
    js: {
        js_console_log: appendOutput("log"),
        js_stdout: appendOutput("stdout"),
        js_stderr: appendOutput("stderr"),
        js_milliseconds_since_start: getMilliseconds,
        js_draw_screen: drawCanvas,
    },
    env: {
        memory: memory
    }
};

/* DOOM LOGIC */
WebAssembly.instantiateStreaming(fetch('doom.wasm'), importObject)
    .then(obj => {

    obj.instance.exports.main();

    // Doom Key Constants
    const KEY_LEFT = 0xac;
    const KEY_UP = 0xad;
    const KEY_RIGHT = 0xae;
    const KEY_DOWN = 0xaf;
    const KEY_BACKSPACE = 127;
    const KEY_RCTRL = 0x80 + 0x1d;
    const KEY_RALT = 0x80 + 0x38;

    /* STRICT INPUT MAPPING 
       We only return valid Doom keys. 
       Everything else returns 0 (Ignored).
    */
    let doomKeyCode = function(keyCode) {
        // Numbers 0-9 for weapon switching
        if (keyCode >= 48 && keyCode <= 57) return keyCode;

        switch (keyCode) {
            case 37: return KEY_LEFT;   // Arrow Left
            case 38: return KEY_UP;     // Arrow Up
            case 39: return KEY_RIGHT;  // Arrow Right
            case 40: return KEY_DOWN;   // Arrow Down
            
            case 32: return KEY_RCTRL;  // SPACE -> FIRE (Ctrl in Doom)
            case 17: return 32;         // CTRL -> OPEN/USE (Space in Doom)
            
            case 16: return KEY_RALT;   // Shift (Strafe)
            
            case 13: return 13;         // Enter
            case 8:  return KEY_BACKSPACE;
            case 27: return 27;         // Escape (Menu)
            
            case 89: return 121;        // Y (Yes)
            case 78: return 110;        // N (No)

            default: return 0; 
        }
    };

    let keyDown = function(keyCode) { 
        if(keyCode !== 0) obj.instance.exports.add_browser_event(0, keyCode); 
    };
    
    let keyUp = function(keyCode) { 
        if(keyCode !== 0) obj.instance.exports.add_browser_event(1, keyCode); 
    };

    /* Keyboard Listeners */
    window.addEventListener('keydown', function(event) {
        const k = doomKeyCode(event.keyCode);
        if (k !== 0) {
            keyDown(k);
            event.preventDefault(); // Stop browser scrolling
        }
    }, false);

    window.addEventListener('keyup', function(event) {
        const k = doomKeyCode(event.keyCode);
        if (k !== 0) {
            keyUp(k);
            event.preventDefault();
        }
    }, false);

    /* Mobile Touch Input */
    const mobileMap = [
        ["btn-up", KEY_UP],
        ["btn-down", KEY_DOWN],
        ["btn-left", KEY_LEFT],
        ["btn-right", KEY_RIGHT],
        ["btn-enter", 13],
        ["btn-strafe", KEY_RALT],
        ["btn-fire", KEY_RCTRL],
        ["btn-use", 32],
        ["btn-esc", 27],
    ];

    mobileMap.forEach(([id, code]) => {
        const btn = document.getElementById(id);
        if(btn) {
            // Prevent context menu
            btn.addEventListener("contextmenu", e => { e.preventDefault(); });
            
            btn.addEventListener("touchstart", (e) => {
                e.preventDefault();
                btn.style.backgroundColor = "rgba(255,255,255,0.5)";
                keyDown(code);
            });
            
            btn.addEventListener("touchend", (e) => {
                e.preventDefault();
                btn.style.backgroundColor = "";
                keyUp(code);
            });
        }
    });

    /* Focus Hint */
    // Clicking anywhere on screen focuses the canvas
    window.addEventListener('click', () => canvas.focus());
    canvas.focus();

    /* Game Loop */
    function step(timestamp) {
        obj.instance.exports.doom_loop_step();
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
});