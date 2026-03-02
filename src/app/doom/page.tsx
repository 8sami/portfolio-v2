"use client";

import { Column, Heading, Meta, Schema, Text, useToast } from "@once-ui-system/core";
import { baseURL, doom, person, about } from "@/resources";
import { useEffect, useRef } from "react";

export default function DoomPage() {
  const { addToast } = useToast();
  const toastShown = useRef(false);

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

  return (
    <Column maxWidth="m" paddingTop="24" gap="xl" horizontal="center">
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
        <Heading variant="display-strong-s" marginBottom="l" align="center">
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
          onBackground="neutral-medium"
        >
          {doom.controls}
        </Text>
        <style dangerouslySetInnerHTML={{ __html: `
          @media (orientation: landscape) and (max-height: 600px) {
            .doom-iframe {
              height: 80vh !important;
              max-height: none !important;
              max-width: 800px !important;
              aspect-ratio: auto !important;
            }
          }
        ` }} />
        <iframe
          src={doom.iframe.link}
          className="doom-iframe"
          style={{
            border: "none",
            maxWidth: "700px",
            width: "100%",
            aspectRatio: "16/10",
            borderRadius: "var(--radius-m)",
            boxShadow: "var(--shadow-l-strong)",
          }}
          title={doom.title}
          allowFullScreen
        />
      </Column>
    </Column>
  );
}
