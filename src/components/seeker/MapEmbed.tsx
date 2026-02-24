"use client";

import { Column, Row, Text, Heading, Button, Icon } from "@once-ui-system/core";

interface MapEmbedProps {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export function MapEmbed({ latitude, longitude, accuracy }: MapEmbedProps) {
  const accuracyInDegrees = accuracy / 111000;
  const delta = Math.min(Math.max(accuracyInDegrees * 1.5, 0.002), 0.1);

  const googleMapsUrl = `https://maps.google.com/?q=${latitude},${longitude}&ll=${latitude},${longitude}&z=18`;
  const osmViewUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=17/${latitude}/${longitude}`;
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    longitude - delta
  },${latitude - delta},${longitude + delta},${latitude + delta}&layer=mapnik&marker=${latitude},${longitude}`;

  return (
    <Column fillWidth gap="m">
      <Heading as="h2" variant="display-strong-s">
        Location Map
      </Heading>
      <Column
        fillWidth
        gap="12"
        radius="m"
        border="neutral-alpha-weak"
        background="surface"
        overflow="hidden"
        data-border="conservative"
      >
        <iframe
          src={osmEmbedUrl}
          style={{ width: "100%", height: "320px", border: "none", display: "block" }}
          title="Location Map"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <Row
          fillWidth
          paddingX="12"
          paddingY="8"
          gap="12"
          vertical="center"
          wrap
          style={{ borderTop: "1px solid var(--neutral-alpha-weak)" }}
        >
          <Row gap="8" vertical="center" flex={1}>
            <Icon name="globe" size="xs" onBackground="neutral-weak" />
            <Text variant="label-default-xs" onBackground="neutral-weak" style={{ opacity: 0.6 }}>Lat</Text>
            <Text
              variant="body-default-s"
              onBackground="neutral-strong"
              style={{ fontFamily: "var(--font-code)" }}
            >
              {latitude.toFixed(8)}
            </Text>
          </Row>
          <Row gap="8" vertical="center" flex={1}>
            <Icon name="globe" size="xs" onBackground="neutral-weak" />
            <Text variant="label-default-xs" onBackground="neutral-weak" style={{ opacity: 0.6 }}>Lon</Text>
            <Text
              variant="body-default-s"
              onBackground="neutral-strong"
              style={{ fontFamily: "var(--font-code)" }}
            >
              {longitude.toFixed(8)}
            </Text>
          </Row>
          <Text
            variant="label-default-xs"
            onBackground="neutral-weak"
          >
            +/- {accuracy.toFixed(0)} m
          </Text>
        </Row>
      </Column>
      <Row style={{ flexWrap: "nowrap" }} fillWidth gap="8" wrap data-border="conservative">
        <Button
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          size="s"
          prefixIcon="globe"
          arrowIcon
          fillWidth
        >
          Google Maps
        </Button>
        <Button
          href={osmViewUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          size="s"
          prefixIcon="globe"
          fillWidth
        >
          OpenStreetMap
        </Button>
      </Row>
    </Column>
  );
}
