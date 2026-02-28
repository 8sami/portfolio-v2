"use client";

import { useState, useEffect, useRef } from "react";
import { Column, RevealFx, Skeleton, SmartLink, Text } from "@once-ui-system/core";
import Script from "next/script";

export default function TikTokEmbed() {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.addedNodes.length) {
          for (let i = 0; i < mutation.addedNodes.length; i++) {
            const node = mutation.addedNodes[i];
            // TikTok script injects an iframe
            if (node.nodeName === "IFRAME") {
              // Add a small delay for iframe content to render visually
              setTimeout(() => {
                setIsLoaded(true);
              }, 800);
              observer.disconnect();
              return;
            }
          }
        }
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current, { childList: true, subtree: true });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Column
      ref={containerRef}
      style={{
        width: "100%",
        maxWidth: "850px",
        minHeight: isLoaded ? "auto" : "480px",
        position: "relative",
        borderRadius: "var(--radius-m)",
        overflow: "hidden",
      }}
    >
      {!isLoaded && (
        <Column style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Skeleton shape="block" style={{ width: "100%", height: "100%" }} />
        </Column>
      )}
      <RevealFx delay={1.6} zIndex={10} radius="m" position="relative" overflow="hidden">
        <blockquote
          className="tiktok-embed"
          cite="https://www.tiktok.com/@huzaifa.gguf"
          data-unique-id="huzaifa.gguf"
          data-embed-from="embed_page"
          data-embed-type="creator"
          style={{
            minWidth: "288px",
            width: "100%",
            padding: 0,
            border: "none",
            borderRadius: "var(--radius-m)",
            scale: "1.1",
          }}
        >
          <SmartLink
            href="https://www.tiktok.com/@huzaifa.gguf?refer=creator_embed"
            target="_blank"
            rel="noopener noreferrer"
            style={{ border: 0 }}
          >
            <Text variant="label-default-s" onBackground="neutral-weak">@huzaifa.ggf</Text>
          </SmartLink>
        </blockquote>
      </RevealFx>
      <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />
    </Column>
  );
}
