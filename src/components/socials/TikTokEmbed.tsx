import Script from "next/script";
import { SmartLink, Text } from "@once-ui-system/core";
import { social } from "@/resources";

const TIKTOK = social.find((s) => s.name === "Tiktok");
const TIKTOKHANDLE = TIKTOK?.link.split("@")[1];

export default function TikTokEmbed() {
  return (
    <>
    <blockquote
      className="tiktok-embed"
      cite={TIKTOK?.link}
      data-unique-id={TIKTOKHANDLE}
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
        href="?refer=creator_embed"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Text variant="label-default-s" onBackground="neutral-weak">@{TIKTOKHANDLE}</Text>
      </SmartLink>
    </blockquote>
    <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />
    </>
  );
}
