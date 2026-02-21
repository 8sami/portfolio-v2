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
        variant: "success",
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
        gap="s"
        vertical="center"
        direction="column"
        fillWidth
        horizontal="center"
      >
        <Heading variant="display-strong-s" align="center">
          {doom.label}
        </Heading>
        <Text
          variant="body-default-l"
          onBackground="neutral-medium"
          style={{ textAlign: "center" }}
        >
          {doom.description}
        </Text>
      </Column>
      <Column gap="s" fillWidth horizontal="center">
        <Text
          style={{ textAlign: "center" }}
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
            borderRadius: "9px",
            boxShadow: "0 0 20px rgba(0,0,0,0.2)",
          }}
          title={doom.title}
          allowFullScreen
        />
      </Column>
    </Column>
  );
}
