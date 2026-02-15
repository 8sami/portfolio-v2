import {
  Heading,
  Text,
  Button,
  Column,
  Row,
  Media,
  Grid,
  RevealFx,
  Flex,
  Schema,
} from "@once-ui-system/core";
import { baseURL, thefunstuff } from "@/resources";

export async function generateMetadata() {
  const title = thefunstuff.title;
  const description = thefunstuff.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}${thefunstuff.path}`,
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

export default function TheFunStuffPage() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={thefunstuff.path}
        title={thefunstuff.title}
        description={thefunstuff.description}
        image={thefunstuff.images[0].src}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: thefunstuff.title,
            description: thefunstuff.description,
            url: `https://${baseURL}${thefunstuff.path}`,
            image: `https://${baseURL}/og?title=${encodeURIComponent(thefunstuff.title)}`,
          }),
        }}
      />
      
      <Column fillWidth gap="l">
        <RevealFx translateY="4" fillWidth>
            <Heading variant="display-strong-l">{thefunstuff.title}</Heading>
        </RevealFx>
        <RevealFx translateY="8" delay={0.2} fillWidth>
            <Text variant="heading-default-xl" onBackground="neutral-weak">
                {thefunstuff.description}
            </Text>
        </RevealFx>
      </Column>

      <Grid columns="3" gap="l">
        {thefunstuff.stuff.map((item) => (
          <Column
              padding="l"
              gap="m"
              radius="l"
              border="neutral-medium"
              background="surface"
          >
              <Media
                  radius="m"
                  src={item.image}
                  alt={item.name}
              />
              <Column gap="s">
                  <Heading variant="display-strong-s">{item.name}</Heading>
                  <Text variant="body-default-m" onBackground="neutral-weak">
                      {item.description}
                  </Text>
              </Column>
              <Button href={item.name === "DOOM" ? "/doom" : "#"} variant="primary" arrowIcon>
                  {item.button}
              </Button>
          </Column>
        ))}
      </Grid>
    </Column>
  );
}
