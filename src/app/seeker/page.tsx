"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  Column,
  Row,
  Text,
  Heading,
  Button,
  RevealFx,
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
        gap="12"
        horizontal="center"
        align="center"
        marginBottom="20"
      >
        <Heading variant="display-strong-s" align="center">
          <LetterFx trigger="instant" speed="medium">
            EVERYBODY'S WATCHING
          </LetterFx>
        </Heading>
        <Text
          variant="body-default-m"
          onBackground="neutral-weak"
          align="center"
          wrap="balance"
        >
          Look, your browser is basically a sieve. Honestly, it's just leaking your life out to any site that knows how to ask—and most of them do.
        </Text>
      </Column>

      {/* ── Entrance ── */}
      {geoState === "idle" && (
        <Column
          fillWidth
          padding="64"
          radius="m"
          horizontal="center"
          align="center"
          gap="24"
        >
          <RevealFx translateY="12" speed="medium">
            <Column horizontal="center" align="center" gap="12">
              <Icon name="globe" size="l" onBackground="brand-medium" />
              <Heading as="h2" variant="display-strong-s" align="center">
                Think you're safe?
              </Heading>
            </Column>
          </RevealFx>
          
          <RevealFx translateY="12" delay={0.2} speed="medium">
            <Column horizontal="center" align="center" maxWidth="s">
              <Text
                variant="body-default-m"
                onBackground="neutral-weak"
                align="center"
                wrap="balance"
              >
                Go on. Tap it. It’s the same split-second choice you make when checking a "failed delivery" text or some random email. I just want to show you exactly what the bad guys see before they actually start cleaning you out. No fluff, just a look at your own front door from the outside.
              </Text>
            </Column>
          </RevealFx>

          <RevealFx translateY="12" delay={0.4} speed="medium">
            <Button
              id="grant-location"
              data-border="conservative"
              variant="primary"
              size="m"
              prefixIcon="globe"
              arrowIcon
              onClick={requestLocation}
            >
              Expose me
            </Button>
          </RevealFx>

          <Text
            variant="label-default-xs"
            onBackground="neutral-weak"
            style={{ opacity: 0.6 }}
          >
            Requires location permission.
          </Text>
        </Column>
      )}

      {geoState === "loading" && (
        <Column fillWidth gap="l">
          <Skeleton shape="block" width="xl" style={{ height: "400px" }} />
          <Skeleton shape="block" width="xl" style={{ height: "200px" }} />
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
            Access Denied
          </Heading>
          <Text
            variant="body-default-m"
            onBackground="danger-medium"
            align="center"
            wrap="balance"
          >
            You blocked the request. Good. But a real hacker would already be trying another way to get in.
          </Text>
          <Button
            data-border="conservative"
            variant="secondary"
            size="s"
            prefixIcon="arrowLeft"
            onClick={reset}
          >
            Try Again
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
                YOU'RE TOTALLY EXPOSED.{" "}
              </Text>
              An attacker is basically sitting in your living room now. They’ve got your home layout, your device ID, and even how much battery you have left—it’s everything they need to pick their next target. You, probably.
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
          Personal Information Leak
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
