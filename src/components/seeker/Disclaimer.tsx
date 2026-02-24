"use client";

import { Column, Row, Text, Heading, Icon, Grid } from "@once-ui-system/core";

const tips = [
  {
    icon: "globe" as const,
    title: "Look at the URL—seriously",
    desc: "Sites like 'googl-secure.com' aren't real. They're just waiting for you to trip up.",
  },
  {
    icon: "eyeOff" as const,
    title: "GPS isn't for fun",
    desc: "Your coordinates show exactly where you sleep and work. Don't hand that out to strangers.",
  },
  {
    icon: "info" as const,
    title: "Links are just hooks",
    desc: "Every random SMS or email is a fishing line. Don't be the catch.",
  },
  {
    icon: "check" as const,
    title: "Clean your permissions",
    desc: "Most of us have apps that have been watching our cameras for years. Fix that.",
  },
];

const vectors = [
  {
    label: "I",
    name: "The 'I Win' Scam",
    desc: "Fake prizes that only 'unlock' if you share your location. Spoiler: there is no prize.",
  },
  {
    label: "II",
    name: "Urgency and Fear",
    desc: "Emails about a 'suspicious purchase' that make you panic and click without thinking.",
  },
  {
    label: "III",
    name: "Obscured Destinations",
    desc: "Tiny URLs that hide 50 different tracking scripts behind a single click.",
  },
  {
    label: "IV",
    name: "Delivery 'Delays'",
    desc: "Texts about a missing package that need your GPS to 'confirm' your address. Think about it.",
  },
];

export function Disclaimer() {
  return (
    <Column fillWidth gap="l">
      {/* Title */}
      <Heading as="h2" variant="display-strong-s">
        How they actually get you
      </Heading>

      <Column fillWidth gap="m">
        <Text variant="body-default-m" onBackground="neutral-weak">
          I didn’t use some complex exploit to find you—this is just standard browser behavior. Most people don’t realize that your device is basically shouting its location to anyone who asks nicely. The moment you tap ‘Allow’ on a shady site, it’s game over. There’s no undo button for your privacy.
        </Text>
      </Column>

      {/* Modern Grid Layout */}
      <Grid columns="2" gap="12" fillWidth s={{ columns: "1" }}>
        {/* Tips Column */}
        <Column
          gap="12"
          padding="16"
          radius="m"
          background="surface"
          border="neutral-alpha-weak"
          data-border="conservative"
        >
          <Row gap="8" vertical="center" marginBottom="4">
            <Icon name="shieldCheck" size="s" onBackground="success-medium" />
            <Text variant="label-default-m" weight="strong">
              Defensive Measures
            </Text>
          </Row>
          {tips.map((tip) => (
            <Row key={tip.title} gap="12" vertical="start">
              <Icon
                name={tip.icon}
                size="xs"
                onBackground="neutral-weak"
                style={{ marginTop: "20px" }}
              />
              <Column gap="2">
                <Text variant="label-default-s" weight="strong">
                  {tip.title}
                </Text>
                <Text variant="body-default-s" onBackground="neutral-weak" style={{ opacity: 0.8 }}>
                  {tip.desc}
                </Text>
              </Column>
            </Row>
          ))}
        </Column>

        {/* Vectors Column */}
        <Column
          gap="12"
          padding="16"
          radius="m"
          background="surface"
          border="neutral-alpha-weak"
          data-border="conservative"
        >
          <Row gap="8" vertical="center" marginBottom="4">
            <Icon name="alertTriangle" size="s" onBackground="warning-medium" />
            <Text variant="label-default-m" weight="strong">
              Common Vectors
            </Text>
          </Row>
          {vectors.map((v) => (
            <Row key={v.name} gap="12" vertical="start">
              <Text
                variant="label-default-s"
                onBackground="neutral-weak"
                style={{
                  fontFamily: "var(--font-code)",
                  minWidth: "16px",
                  marginTop: "2px",
                }}
              >
                {v.label}
              </Text>
              <Column gap="2">
                <Text variant="label-default-s" weight="strong">
                   {v.name}
                </Text>
                <Text variant="body-default-s" onBackground="neutral-weak" style={{ opacity: 0.8 }}>
                  {v.desc}
                </Text>
              </Column>
            </Row>
          ))}
        </Column>
      </Grid>

      {/* Footer Audit Note */}
      <Row
        fillWidth
        padding="12"
        radius="m"
        border="neutral-alpha-weak"
        gap="12"
        vertical="center"
        style={{ opacity: 0.4 }}
        data-border="conservative"
      >
        <Icon name="info" size="xs" onBackground="neutral-weak" />
        <Text variant="label-default-s" onBackground="neutral-weak">
          Independent security audit demo. No data persistence. No network
          egress.
        </Text>
      </Row>
    </Column>
  );
}
