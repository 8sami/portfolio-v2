import { Column, Grid, Line } from "@once-ui-system/core";
import type { DeviceData } from "./useDeviceInfo";
import { DataRow } from "./DataRow";
import { SectionCard } from "./SectionCard";

interface DeviceInfoProps {
  data: DeviceData;
}

export function DeviceInfo({ data }: DeviceInfoProps) {
  const { browser, os, device, fingerprint, screen, network, hardware, battery, storage, permissions, preferences, media } = data;

  const getPermissionVariant = (state: string) => {
    if (state === "granted") return "success-strong";
    if (state === "denied") return "danger-strong";
    if (state === "prompt") return "warning-strong";
    return "neutral-strong";
  };

  return (
    <Column fillWidth gap="24">
      <Grid columns="2" gap="12" fillWidth s={{ columns: "1" }}>
        <SectionCard icon="masks" title="Identity">
          <DataRow label="Platform" value={hardware.platform} />
          <DataRow label="OS" value={`${os.name} ${os.version}`} />
          <DataRow label="Browser" value={`${browser.name} ${browser.version}`} />
          <DataRow label="Type" value={device.type.toUpperCase()} />
        </SectionCard>

        <SectionCard icon="network" title="Network" tag={{ label: "LEAKED", variant: "danger" }}>
          <DataRow
            label="Private IPs"
            value={network.localIPs.length > 0 ? network.localIPs : "No leak"}
            variant={network.localIPs.length > 0 ? "danger-strong" : "neutral-strong"}
          />
          <DataRow label="Timezone" value={network.timezone} />
          <DataRow label="Downlink" value={network.downlink} />
        </SectionCard>

        <SectionCard icon="shield" title="Privacy" tag={{ label: "PERMISSIONS", variant: "warning" }}>
          {Object.entries(permissions).map(([name, state]) => (
            <DataRow
              key={name}
              label={name.charAt(0).toUpperCase() + name.slice(1)}
              value={state}
              variant={getPermissionVariant(state)}
            />
          ))}
        </SectionCard>

        <SectionCard icon="chip" title="Hardware">
          <DataRow label="Cores" value={`${hardware.hardwareConcurrency}`} />
          <DataRow label="RAM" value={hardware.deviceMemory} />
          <DataRow label="Heap" value={hardware.heapTotal} />
          <DataRow label="Cameras" value={String(media.cameras)} />
        </SectionCard>

        <SectionCard icon="battery" title="Resources">
          {battery ? (
            <DataRow
              label="Battery"
              value={battery.level}
              variant={battery.charging ? "success-strong" : "neutral-strong"}
            />
          ) : (
            <DataRow label="Battery" value="Power blocked" />
          )}
          <DataRow label="Storage" value={storage?.quota || "Quota blocked"} />
        </SectionCard>

        <SectionCard icon="settings" title="Preferences">
          <DataRow label="Theme" value={preferences.darkMode} />
          <DataRow label="Motion" value={preferences.reducedMotion} />
          <DataRow label="Ratio" value={`${screen.pixelRatio}x`} />
        </SectionCard>
      </Grid>

      <SectionCard icon="signature" title="Digital Signature" tag={{ label: "TRACEABLE", variant: "danger" }}>
        <Grid gap="8" columns="2" fillWidth s={{ columns: "1" }}>
          <Column gap="8">
            <DataRow label="Visitor ID" value={fingerprint.visitorId} variant="danger-strong" />
            <DataRow label="Canvas Hash" value={fingerprint.canvas} variant="danger-strong" />
            <DataRow label="Audio Hash" value={fingerprint.audio} variant="danger-strong" />
          </Column>
          <Column gap="8" marginLeft="20" s={{ style: { marginLeft: "0" } }}>
            <DataRow label="WebGL Vendor" value={fingerprint.webGLVendor} />
            <DataRow label="Plugins" value={fingerprint.plugins} />
          </Column>
        </Grid>
      </SectionCard>
    </Column>
  );
}
