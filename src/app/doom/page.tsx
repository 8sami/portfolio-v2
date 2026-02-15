import {
  Heading,
  Text,
  Button,
  Column,
  Flex,
  RevealFx,
} from "@once-ui-system/core";
import { baseURL } from "@/resources";


export async function generateMetadata() {
  const title = "Doom";
  const description = "Play the classic Doom game right in your browser.";
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/doom`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function DoomPage() {
  return (
    <Column maxWidth="l" gap="l" paddingY="12" horizontal="center" fillWidth>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Doom",
            description: "Play Doom in your browser.",
            url: `https://${baseURL}/doom`,
            image: `https://${baseURL}/og?title=Doom`,
          }),
        }}
      />
      
      <Column fillWidth gap="m" horizontal="center">
        <RevealFx translateY="4" fillWidth horizontal="center">
            <Heading variant="display-strong-l">DOOM</Heading>
        </RevealFx>
        <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center">
             <Text variant="body-default-m" onBackground="neutral-weak">
                Rip and Tear, until it is done.
            </Text>
        </RevealFx>
      </Column>

      <RevealFx translateY="12" delay={0.4} horizontal="center">
        <Flex
            horizontal="center"
            direction="column"
            gap="m"
            align="center"
        >
            <iframe
                src="/doom-game/index.html"
                style={{
                    border: "none",
                    maxWidth: "800px",
                    width: "100%",
                    aspectRatio: "16/10",
                    imageRendering: "pixelated",
                    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
                }}
                title="Doom Game"
                allowFullScreen
            />
            <Text variant="body-default-s" onBackground="neutral-weak">
                Controls: Arrow Keys to Move, CTRL to Open, SPACE to Fire, SHIFT to Strafe.
            </Text>
        </Flex>
      </RevealFx>
    </Column>
  );
}
