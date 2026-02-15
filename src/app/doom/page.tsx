import {
  Heading,
  Text,
  Column,
  Flex,
  RevealFx,
  TypeFx,
} from "@once-ui-system/core";
import { baseURL, doom } from "@/resources";


export async function generateMetadata() {
  const title = doom.title;
  const description = doom.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}{doom.path}`,
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
            name: doom.title,
            description: doom.description,
            url: `https://${baseURL}${doom.path}`,
            image: `https://${baseURL}/og?title=${doom.label}`,
          }),
        }}
      />
      
      <Column fillWidth gap="m" horizontal="center">
        <Heading variant="display-strong-l">{doom.label}</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          <TypeFx words={doom.description} />
        </Text>
      </Column>
      <Flex
          horizontal="center"
          direction="column"
          gap="m"
          align="center"
      >
          <iframe
              src={doom.iframe.link}
              style={{
                  border: "none",
                  maxWidth: "800px",
                  width: "100%",
                  aspectRatio: "16/10",
                  imageRendering: "pixelated",
                  boxShadow: "0 0 20px rgba(0,0,0,0.5)",
              }}
              title={doom.title}
              allowFullScreen
          />
          <Text variant="body-default-s" onBackground="neutral-weak">
            <TypeFx words={doom.controls} />
          </Text>
      </Flex>
    </Column>
  );
}
