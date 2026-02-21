import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import { baseURL, doom, person, about } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: doom.title,
    description: doom.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(doom.title)}`,
    path: doom.path,
  });
}

export default function DoomPage() {
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
        <iframe
          src={doom.iframe.link}
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
