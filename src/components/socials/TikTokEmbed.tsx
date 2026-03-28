"use client";

import Script from "next/script";
import { SmartLink, Text } from "@once-ui-system/core";

export default function TikTokEmbed() {
  return (
    <>
    <blockquote
      className="tiktok-embed"
      cite="https://www.tiktok.com/@huzaifa.gguf"
      data-unique-id="huzaifa.gguf"
      data-embed-from="embed_page"
      data-embed-type="creator"
      style={{
        minWidth: "288px",
        maxWidth: "780px",
        width: "100%",
        padding: 0,
        border: "none",
        borderRadius: "var(--radius-m)",
      }}
    >
      <SmartLink
        href="https://www.tiktok.com/@huzaifa.gguf?refer=creator_embed"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Text variant="label-default-s" onBackground="neutral-weak">@huzaifa.gguf</Text>
      </SmartLink>
    </blockquote>
    <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />
    </>
  );
}
