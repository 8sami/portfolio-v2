"use client";

import type { Comment } from "@/app/api/comments/route";
import type { Goal } from "@/app/api/goals/route";
import { CommentForm } from "@/components/CommentForm";
import { CommentList } from "@/components/CommentList";
import { formatDate } from "@/utils/formatDate";
import { Badge, Button, Column, Flex, Icon, Row, SmartLink, Text } from "@once-ui-system/core";
import type { User } from "@supabase/supabase-js";
import type React from "react";
import { useState } from "react";

interface GoalCardProps {
  goal: Goal;
  isAdmin: boolean;
  user: User | null;
  token: string | null;
  onDelete: (id: string) => void;
  onEdit: (goal: Goal) => void;
  onUpdateAdded: (goalId: string, comment: Comment) => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  isAdmin,
  user,
  token,
  onDelete,
  onEdit,
  onUpdateAdded,
}) => {
  const [showUpdates, setShowUpdates] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const isAccomplished = !!goal.accomplished_at;
  const updates = goal.updates ?? [];

  const handlePostUpdate = async (content: string) => {
    if (!token) return;
    setIsPosting(true);
    try {
      const res = await fetch(`/api/goals/${goal.id}/updates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });
      if (res.ok) {
        const comment: Comment = await res.json();
        onUpdateAdded(goal.id, comment);
      }
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Column
      fillWidth
      border="neutral-alpha-weak"
      radius="m"
      paddingX="20"
      style={{ paddingTop: "14px", paddingBottom: "14px" }}
      gap="8"
      background="surface"
    >
      {/* Top row */}
      <Row fillWidth horizontal="between" vertical="start" gap="12">
        <Row gap="12" vertical="start" flex={1}>
          <Column gap="8" flex={1}>
            <Row gap="8" horizontal="between" vertical="center" style={{ flexWrap: "wrap" }}>
              <Text
                variant="body-default-m"
                onBackground={isAccomplished ? "neutral-weak" : "neutral-strong"}
                style={{
                  textDecoration: isAccomplished ? "line-through" : "none",
                }}
              >
                {goal.title}
              </Text>
              {(goal.is_current || isAccomplished) && (
                <Badge
                  vertical="center"
                  gap="4"
                  paddingX="8"
                  paddingY="2"
                  radius="s"
                  background={`${isAccomplished ? "success" : "brand"}-strong`}
                  border={`${isAccomplished ? "success" : "brand"}-alpha-medium`}
                >
                  <Text variant="label-strong-xs" onBackground={`${isAccomplished ? "success" : "brand"}-medium`}>
                    {isAccomplished ? "Accomplished" : "In Progress"}
                  </Text>
                </Badge>
              )}
            </Row>
            {goal.description && (
              <Text
                variant="body-default-s"
                onBackground="neutral-weak"
                style={{ lineHeight: "1.6" }}
              >
                {goal.description}
              </Text>
            )}
          </Column>
        </Row>

        {isAdmin && (
          <Row gap="4" style={{ flexShrink: 0 }}>
            <Button
              size="s"
              variant="tertiary"
              prefixIcon="edit"
              onClick={() => onEdit(goal)}
              aria-label="Edit goal"
            />
            <Button
              size="s"
              variant="tertiary"
              prefixIcon="trash"
              onClick={() => onDelete(goal.id)}
              aria-label="Delete goal"
            />
          </Row>
        )}
      </Row>

      {/* Meta row */}
      <Flex direction="row-reverse" fillWidth horizontal="between" vertical="center" gap="12" style={{ flexWrap: "wrap" }}>
        <Text variant="label-default-xs" onBackground="neutral-weak">
          {isAccomplished
            ? `Accomplished ${formatDate(goal.accomplished_at!, true)}`
            : `${formatDate(goal.created_at, true)}`}
        </Text>

        {(updates.length > 0 || isAdmin) && (
          <SmartLink
            style={{
              color: "var(--scheme-neutral-700)",
              cursor: "pointer",
              fontFamily: "var(--font-label)",
            }}
            onClick={() => setShowUpdates((v) => !v)}
          >
            {updates.length > 0
              ? `${updates.length} Update${updates.length !== 1 ? "s" : ""}`
              : "Add Update"}
          </SmartLink>
        )}
      </Flex>

      {/* Updates panel */}
      {showUpdates && (
        <Column fillWidth gap="12" paddingTop="4">
          <CommentList comments={updates} isLoading={isPosting} variant="compact" />
          {isAdmin && user && (
            <Column
              fillWidth
              style={{
                opacity: isPosting ? 0.5 : 1,
                pointerEvents: isPosting ? "none" : "auto",
              }}
            >
              <CommentForm
                onSubmit={handlePostUpdate}
                user={user}
                onSignOut={() => {}}
                onSignIn={() => {}}
                placeholder="Add update"
                variant="compact"
              />
            </Column>
          )}
        </Column>
      )}
    </Column>
  );
};
