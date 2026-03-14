import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
} from "@once-ui-system/core";
import { home, about, person, baseURL, routes } from "@/resources";
import { Mailchimp } from "@/components";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingBottom="32"
              delay={1.2}
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="8"
                paddingY="4"
                radius="m"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Text paddingY="2">{home.featured.title}</Text>
              </Badge>
            </RevealFx>
          )}
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="center" paddingLeft="12">
            <Button
              id="about"
              data-border="conservative"
              href={about.path}
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
            >
              <Row gap="8" vertical="center" paddingRight="4">
                {about.avatar.display && (
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {about.title}
              </Row>
            </Button>
          </RevealFx>
        </Column>
      </Column>

      {/* Randomized Section */}
      <RevealFx translateY="16" delay={0.6} fillWidth>
        <Column fillWidth gap="48" marginBottom="l" horizontal="center">
          {routes["/blog"] && (
            <Column fillWidth horizontal="center" gap="32" marginTop="40">
              {/* Heading and Posts on separate lines, centered */}
              <Heading as="h2" variant="display-strong-xs" wrap="balance" align="center">
                Randomly picked, just for you
              </Heading>
              <Column fillWidth maxWidth="s">
                <Posts randomize limit={2} columns="2" thumbnail />
              </Column>
            </Column>
          )}
          
          {/* Projects width and spacing synced with Posts */}
          <Column fillWidth maxWidth="s" gap="32">
            <Projects randomize limit={3} />
          </Column>
          
          <Mailchimp />
        </Column>
      </RevealFx>
    </Column>
  );
}
