"use client";

import { Column, Row, Text } from "@once-ui-system/core";

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  tag?: {
    label: string;
    variant: "neutral" | "warning" | "danger" | "success";
  };
}

export function SectionCard({
  title,
  children,
  tag,
}: SectionCardProps) {
  return (
    <Column
      fillWidth
      gap="12"
      padding="16"
      radius="m"
      border="neutral-alpha-weak"
      background="surface"
      data-border="conservative"
    >
      <Row vertical="center" horizontal="between">
        <Text
          variant="label-default-s"
          weight="strong"
          onBackground="neutral-strong"
        >
          {title}
        </Text>
        {tag && (
          <Row
            paddingX="8"
            paddingY="2"
            radius="s"
            background={`${tag.variant}-alpha-weak`}
            border={`${tag.variant}-alpha-medium`}
          >
            <Text
              variant="label-default-xs"
              onBackground={`${tag.variant}-strong`}
            >
              {tag.label}
            </Text>
          </Row>
        )}
      </Row>
      <Column fillWidth gap="8">
        {children}
      </Column>
    </Column>
  );
}
