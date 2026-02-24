"use client";

import { Column, Heading } from "@once-ui-system/core";
import { DataRow } from "./DataRow";
import { SectionCard } from "./SectionCard";

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

export function LocationInfo({ data }: { data: LocationData }) {
  const { latitude, longitude, accuracy, altitude, altitudeAccuracy, heading, speed } = data;

  return (
    <Column fillWidth gap="m">
      <Heading as="h2" variant="display-strong-s">
        Live Tracking
      </Heading>
      <SectionCard title="GPS Coordinates">
        <DataRow label="Latitude" value={`${latitude.toFixed(8)} deg`} />
        <DataRow label="Longitude" value={`${longitude.toFixed(8)} deg`} />
        <DataRow label="Accuracy" value={`+/- ${accuracy.toFixed(1)} m`} />
        <DataRow
          label="Altitude"
          value={altitude !== null ? `${altitude.toFixed(1)} m ASL` : "N/A"}
        />
        <DataRow
          label="Alt. Accuracy"
          value={altitudeAccuracy !== null ? `+/- ${altitudeAccuracy.toFixed(1)} m` : "N/A"}
        />
        <DataRow
          label="Heading"
          value={heading !== null ? `${heading.toFixed(1)} deg` : "N/A"}
        />
        <DataRow
          label="Speed"
          value={speed !== null ? `${(speed * 3.6).toFixed(1)} km/h` : "Stationary"}
        />
      </SectionCard>
    </Column>
  );
}
