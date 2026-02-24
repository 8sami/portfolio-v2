"use client";

import { Row, Text } from "@once-ui-system/core";
import { LetterFx } from "@once-ui-system/core";

interface DataRowProps {
  label: string;
  value: string | string[];
  variant?: "neutral-strong" | "danger-strong" | "warning-strong" | "success-strong";
}

export function DataRow({
  label,
  value,
  variant = "neutral-strong",
}: DataRowProps) {
  const displayValue = Array.isArray(value) ? value.join(", ") : value;
  return (
    <Row fillWidth vertical="start" gap="8">
      <Text
        variant="label-default-xs"
        onBackground="neutral-weak"
        style={{ width: "var(--s-11)", flexShrink: 0 }}
      >
        {label}
      </Text>
      <Text
        variant="body-default-s"
        onBackground={variant}
        style={{ fontFamily: "var(--font-code)", wordBreak: "break-all", flexGrow: 1 }}
      >
        <LetterFx trigger="instant" speed="fast">
          {displayValue || "None"}
        </LetterFx>
      </Text>
    </Row>
  );
}
