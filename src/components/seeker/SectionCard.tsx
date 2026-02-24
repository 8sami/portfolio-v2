"use client";

import type { IconName } from "@/resources/icons";
import { Column, Icon, Row, Text } from "@once-ui-system/core";

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  tag?: {
    label: string;
    variant: "neutral" | "warning" | "danger" | "success";
  };
  icon?: IconName;}

export function SectionCard({
  title,
  children,
  tag,
  icon,
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
        <Row vertical="center" gap="4">
          {icon && (
            <Icon name={icon} size="m" onBackground="neutral-strong" marginRight="4" />
          )}
          <Text
            paddingY="8"
            variant="label-default-l"
            weight="strong"
          >
            {title}
          </Text>
        </Row>
        {tag && (
          <Row
            paddingX="8"
            paddingY="2"
            radius="xs"
            background={`${tag.variant}-alpha-strong`}
            border={`${tag.variant}-alpha-medium`}
          >
            <Text
              variant="label-default-xs"
              onBackground={`${tag.variant}-medium`}
            >
              {tag.label}
            </Text>
          </Row>
        )}
      </Row>
      <Column fillWidth gap="12">
        {children}
      </Column>
    </Column>
  );
}
