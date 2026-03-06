import type React from "react";
import { Row, Column, Text, Heading } from "@once-ui-system/core";
import { formatDate } from "@/utils/formatDate";
import type { Goal } from "@/app/api/goals/route";

interface GoalStatsProps {
  goals: Goal[];
}

export const GoalStats: React.FC<GoalStatsProps> = ({ goals }) => {
  const total = goals.length;
  const accomplished = goals.filter((g) => !!g.accomplished_at).length;

  const lastUpdated = [...goals].sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  )[0];

  return (
    <Row fillWidth horizontal="between" vertical="end" gap="16" style={{ flexWrap: "wrap" }}>
      <Text variant="body-default-s" onBackground="neutral-weak">
        {lastUpdated ? `last updated ${formatDate(lastUpdated.updated_at, true)}` : ""}
      </Text>
      <Row gap="8" vertical="center">
        <Heading variant="display-strong-xs">{accomplished}</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          accomplished (of {total} total)
        </Text>
      </Row>
    </Row>
  );
};
