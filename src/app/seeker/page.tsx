"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  Column,
  Row,
  Text,
  Heading,
  Button,
  LetterFx,
  Icon,
  Line,
  Schema,
  Skeleton,
} from "@once-ui-system/core";
import { baseURL, seeker, person, about } from "@/resources";
import { LocationInfo, MapEmbed, Disclaimer, DeviceInfo } from "@/components/seeker";
import { useDeviceInfo } from "@/components/seeker/useDeviceInfo";

type GeoState = "idle" | "loading" | "success" | "denied" | "error";

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

export default function SeekerPage() {
  const [geoState, setGeoState] = useState<GeoState>("idle");
  const [location, setLocation] = useState<LocationData | null>(null);
  const watchIdRef = useRef<number | null>(null);
  const device = useDeviceInfo();

  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoState("error");
      return;
    }
    setGeoState("loading");
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        if (watchIdRef.current !== null) {
          navigator.geolocation.clearWatch(watchIdRef.current);
          watchIdRef.current = null;
        }
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          altitude: pos.coords.altitude,
          altitudeAccuracy: pos.coords.altitudeAccuracy,
          heading: pos.coords.heading,
          speed: pos.coords.speed,
        });
        setGeoState("success");
      },
      (err) => {
        if (watchIdRef.current !== null) {
          navigator.geolocation.clearWatch(watchIdRef.current);
          watchIdRef.current = null;
        }
        setGeoState(err.code === err.PERMISSION_DENIED ? "denied" : "error");
      },
      { enableHighAccuracy: true, maximumAge: 0 },
    );
  }, []);

  const reset = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setGeoState("idle");
    setLocation(null);
  }, []);

  return (
    <Column maxWidth="m" paddingY="24" gap="l" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={seeker.path}
        title={seeker.title}
        description={seeker.description}
        image={`/api/og/generate?title=${encodeURIComponent(seeker.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* ── Header ── */}
      <Column
        fillWidth
        gap="32"
        horizontal="center"
        align="center"
        maxWidth={"m"}
      >
        <Heading variant="display-strong-s" align="center">
          <LetterFx trigger="instant" speed="slow">
            {seeker.ui.pageHeading}
          </LetterFx>
        </Heading>
        <Text
          variant="body-default-m"
          onBackground="neutral-medium"
          align="center"
          wrap="balance"
        >
          {seeker.ui.pageDescription}
        </Text>
      </Column>

      {/* ── Entrance ── */}
      {geoState === "idle" && (
        <Column
          fillWidth
          radius="m"
          horizontal="center"
          gap="s"
        >
          <Button
            id="grant-location"
            data-border="conservative"
            variant="primary"
            size="s"
            prefixIcon={seeker.ui.entrance?.buttonIcon}
            arrowIcon
            onClick={requestLocation}
          >
            {seeker.ui.entrance?.button}
          </Button>

          <Text
            variant="label-default-xs"
            onBackground="neutral-weak"
            style={{ opacity: 0.6 }}
          >
            {seeker.ui.entrance?.permissionLabel}
          </Text>
        </Column>
      )}

      {geoState === "loading" && (
        <Column fillWidth gap="l">
          <Skeleton shape="block" width="xl" style={{ height: "400px", borderRadius: "var(--radius-m)" }} />
          <Skeleton shape="block" width="xl" style={{ height: "200px", borderRadius: "var(--radius-m)" }} />
        </Column>
      )}

      {geoState === "denied" && (
        <Column
          fillWidth
          padding="48"
          radius="m"
          border="danger-alpha-medium"
          background="danger-alpha-weak"
          horizontal="center"
          align="center"
          gap="16"
          data-border="conservative"
        >
          <Heading
            as="h2"
            variant="display-strong-s"
            onBackground="danger-strong"
            align="center"
          >
            {seeker.ui.denied?.heading}
          </Heading>
          <Text
            variant="body-default-m"
            onBackground="danger-medium"
            align="center"
            wrap="balance"
          >
            {seeker.ui.denied?.message}
          </Text>
          <Button
            data-border="conservative"
            variant="secondary"
            size="s"
            prefixIcon={seeker.ui.denied?.buttonIcon}
            onClick={reset}
          >
            {seeker.ui.denied?.tryAgain}
          </Button>
        </Column>
      )}

      {/* ── Results ── */}
      {geoState === "success" && location && (
        <Column fillWidth gap="l">
          <Row
            fillWidth
            padding="12"
            radius="m"
            border="danger-alpha-medium"
            background="danger-alpha-weak"
            gap="12"
            vertical="center"
            data-border="conservative"
          >
            <Icon name="info" size="xs" onBackground="danger-medium" />
            <Text variant="body-default-s" onBackground="danger-medium">
              <Text as="span" weight="strong" onBackground="danger-strong">
                {seeker.ui.results?.alertTitle}{" "}
              </Text>
              {seeker.ui.results?.alertMessage}
            </Text>
          </Row>

          <LocationInfo data={location} />
          <MapEmbed
            latitude={location.latitude}
            longitude={location.longitude}
            accuracy={location.accuracy}
          />
        </Column>
      )}

      {/* ── Device Intel ── */}
      <Column fillWidth gap="m">
        <Heading as="h2" variant="display-strong-s">
          {seeker.ui?.device.heading ?? "Personal Information Leak"}
        </Heading>

        {device ? (
          <DeviceInfo data={device} />
        ) : (
          <Column fillWidth gap="m">
            <Skeleton shape="line" width="m" height="m" />
            <Skeleton shape="block" width="xl" style={{ height: "300px" }} />
          </Column>
        )}
      </Column>

      <Line background="neutral-alpha-weak" fillWidth marginY="8" />

      <Disclaimer />
    </Column>
  );
}
