import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import SocialsView from "@/components/socials/SocialsView";
import { baseURL, socials, person } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: socials.title,
    description: socials.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(socials.title)}`,
    path: socials.path,
  });
}

export default function Socials() {
  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={socials.title}
        description={socials.description}
        path={socials.path}
        image={`/api/og/generate?title=${encodeURIComponent(socials.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${socials.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column maxWidth="m" horizontal="center" vertical="center" marginBottom="l">
        <Heading variant="heading-strong-xl">
          {socials.title}
        </Heading>
      </Column>
      <SocialsView />
    </Column>
  );
}
