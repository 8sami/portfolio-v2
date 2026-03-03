"use client";
import {
  Button,
  Column,
  Heading,
  Schema,
  Skeleton,
  SmartLink,
  Text,
  useToast,
} from "@once-ui-system/core";
import { baseURL, doom, person, about } from "@/resources";
import { useEffect, useRef, useState } from "react";

export default function DoomPage() {
  const { addToast } = useToast();
  const toastShown = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (toastShown.current) return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    if (isMobile && isPortrait) {
      addToast({
        variant: "danger",
        message: "Landscape mode recommended for the best experience.",
      });
      toastShown.current = true;
    }
  }, [addToast]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "doom-ready") {
        setIsLoaded(true);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <Column maxWidth="m" paddingTop="24" gap="40" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={doom.path}
        title={doom.title}
        description={doom.description}
        image={`/api/og/generate?title=${encodeURIComponent(doom.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column
        direction="column"
        fillWidth
        horizontal="center"
        paddingBottom="4"
      >
        <Heading variant="display-strong-s" align="center">
          {doom.label}
        </Heading>
        <Text
          variant="body-default-m"
          onBackground="neutral-medium"
          align="center"
          wrap="balance"
        >
          {doom.description}
        </Text>
      </Column>
      <Column gap="16" fillWidth horizontal="center">
        <Text
          align="center"
          variant="label-default-xs"
          onBackground="neutral-weak"
          wrap="balance"
        >
          {doom.controls}
        </Text>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @media (orientation: landscape) and (max-height: 600px) {
            .doom-iframe {
              height: 80vh !important;
              max-height: none !important;
              max-width: 800px !important;
              aspect-ratio: auto !important;
            }
          }
        `,
          }}
        />
        <div
          style={{
            position: "relative",
            maxWidth: "700px",
            width: "100%",
            aspectRatio: "16/10",
          }}
        >
          {!isLoaded && (
            <Skeleton
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                borderRadius: "var(--radius-m)",
              }}
              shape="block"
            />
          )}
          <iframe
            src={doom.iframe.link}
            className="doom-iframe"
            style={{
              border: "none",
              width: "100%",
              height: "100%",
              aspectRatio: "16/10",
              borderRadius: "var(--radius-m)",
              boxShadow: "var(--shadow-l-strong)",
              opacity: isLoaded ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
            title={doom.title}
            allowFullScreen
          />
        </div>
        <Text
          align="center"
          variant="label-default-xs"
          onBackground="neutral-weak"
        >
          {doom.caution}{" "}
          <SmartLink href="/doom-game/index.html">Play in fullscreen</SmartLink>
        </Text>
        {doom?.meme && (
          <Button
            variant="tertiary"
            size="s"
            href={doom.meme.link}
            style={{ opacity: 0.4 }}
          >
            {doom.meme.text}
          </Button>
        )}
      </Column>
    </Column>
  );
}
