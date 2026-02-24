"use client";

import { Column, Row, Text, Heading, Icon, Grid } from "@once-ui-system/core";

// 1. Centralized Data Structure
const CONTENT = {
  tips: {
    title: "Defensive Measures",
    items: [
      { icon: "globe", title: "Look at the URL—seriously", desc: "Sites like 'googl-secure.com' aren't real." },
      { icon: "eyeOff", title: "GPS isn't for fun", desc: "Your coordinates show exactly where you sleep and work." },
      { icon: "hook", title: "Links are just hooks", desc: "Every random SMS or email is a fishing line." },
      { icon: "clean", title: "Clean your permissions", desc: "Most of us have apps watching our cameras for years." },
    ]
  },
  vectors: {
    title: "Common Vectors",
    items: [
      { icon: "gifts", title: "The 'I Win' Scam", desc: "Fake prizes that only 'unlock' if you share your location." },
      { icon: "alert", title: "Urgency and Fear", desc: "Emails about a 'suspicious purchase' that make you panic." },
      { icon: "cut", title: "Obscured Destinations", desc: "Tiny URLs that hide 50 different tracking scripts." },
      { icon: "compass", title: "Delivery 'Delays'", desc: "Texts about a missing package that need your GPS." },
    ]
  }
};

// 2. Reusable Sub-component
const InfoSection = ({ title, items }: { title: string; items: any[] }) => (
  <Column
    gap="12"
    padding="16"
    radius="m"
    background="surface"
    border="neutral-alpha-weak"
    data-border="conservative"
  >
    <Text variant="label-default-l" paddingY="8" weight="strong">
      {title}
    </Text>
    {items.map((item, index) => (
      <Row key={`${item.title}-${index}`} gap="12" vertical="center">
        <Icon name={item.icon} size="s" onBackground="neutral-weak" />
        <Column gap="4">
          <Text variant="label-default-s" weight="strong">
            {item.title}
          </Text>
          <Text variant="body-default-s" onBackground="neutral-weak" style={{ opacity: 0.8 }}>
            {item.desc}
          </Text>
        </Column>
      </Row>
    ))}
  </Column>
);

export function Disclaimer() {
  return (
    <Column fillWidth gap="l">
      <Heading as="h2" variant="display-strong-s">How they actually get you</Heading>

      <Text variant="body-default-m" onBackground="neutral-weak">
        I didn’t use some complex exploit to find you—this is just standard browser behavior...
      </Text>

      {/* 3. Dynamic Grid Mapping */}
      <Grid columns="2" gap="12" fillWidth s={{ columns: "1" }}>
        <InfoSection title={CONTENT.tips.title} items={CONTENT.tips.items} />
        <InfoSection title={CONTENT.vectors.title} items={CONTENT.vectors.items} />
      </Grid>

      <Row
        fillWidth padding="12" radius="m" border="neutral-medium" gap="12"
        vertical="center" style={{ opacity: 0.5 }} data-border="conservative"
      >
        <Icon name="info" size="s" onBackground="neutral-strong" />
        <Text variant="label-default-s" onBackground="neutral-strong">
          Independent security audit demo. No data persistence. No network egress.
        </Text>
      </Row>
    </Column>
  );
}
