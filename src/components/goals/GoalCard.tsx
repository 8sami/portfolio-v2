"use client";

import type { Comment } from "@/app/api/comments/route";
import type { Goal } from "@/app/api/goals/route";
import { CommentForm } from "@/components/CommentForm";
import { CommentList } from "@/components/CommentList";
import { formatDate } from "@/utils/formatDate";
import { Button, Column, Icon, Row, Text } from "@once-ui-system/core";
import type { User } from "@supabase/supabase-js";
import type React from "react";
import { useState } from "react";

interface GoalCardProps {
  goal: Goal;
  index: number;
  isAdmin: boolean;
  user: User | null;
  token: string | null;
  onDelete: (id: string) => void;
  onEdit: (goal: Goal) => void;
  onUpdateAdded: (goalId: string, comment: Comment) => void;
  onUpdateDeleted: (goalId: string, commentId: string) => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  index,
  isAdmin,
  user,
  token,
  onDelete,
  onEdit,
  onUpdateAdded,
  onUpdateDeleted,
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
      paddingY="16"
      paddingX="20"
      gap="12"
      background="surface"
    >
      {/* Top row */}
      <Row fillWidth horizontal="between" vertical="start" gap="12">
        <Row gap="12" vertical="start" flex={1}>
          {/* checkbox-style indicator */}
          <div
            style={{
              width: "20px",
              height: "20px",
              minWidth: "20px",
              marginTop: "2px",
              backgroundColor: isAccomplished ? "var(--brand-solid-strong)" : "transparent",
              border: isAccomplished ? "none" : "2px solid var(--neutral-alpha-medium)",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {isAccomplished && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M10 3L4.5 8.5L2 6"
                  stroke="var(--static-black)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>

          <Column gap="4" flex={1}>
            <Row gap="8" vertical="center" style={{ flexWrap: "wrap" }}>
              <Text
                variant="label-strong-m"
                onBackground={isAccomplished ? "neutral-weak" : "neutral-strong"}
                style={{
                  textDecoration: isAccomplished ? "line-through" : "none",
                }}
              >
                {goal.title}
              </Text>
              {goal.is_current && (
                <Row
                  vertical="center"
                  gap="4"
                  paddingX="8"
                  paddingY="2"
                  radius="s"
                  background="brand-alpha-weak"
                  border="brand-alpha-medium"
                >
                  <Icon name="rocket" size="m" onBackground="brand-strong" />
                  <Text variant="label-strong-xs" onBackground="brand-strong">
                    In Progress
                  </Text>
                </Row>
              )}
            </Row>
            {goal.description && (
              <Text
                variant="body-default-m"
                onBackground="neutral-medium"
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
      <Row fillWidth horizontal="between" vertical="center" gap="12" style={{ flexWrap: "wrap" }}>
        <Row vertical="center" gap="8">
          <Icon name="calendar" size="m" onBackground="neutral-weak" />
          <Text variant="body-default-xs" onBackground="neutral-weak">
            {isAccomplished
              ? `Accomplished ${formatDate(goal.accomplished_at!, false)}`
              : `Added ${formatDate(goal.created_at, false)}`}
          </Text>
        </Row>

        {(updates.length > 0 || isAdmin) && (
          <Button
            size="s"
            variant="tertiary"
            prefixIcon="book"
            onClick={() => setShowUpdates((v) => !v)}
          >
            {updates.length > 0
              ? `${updates.length} Update${updates.length !== 1 ? "s" : ""}`
              : "Add Update"}
          </Button>
        )}
      </Row>

      {/* Updates panel */}
      {showUpdates && (
        <Column fillWidth gap="12" paddingTop="8">
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
                placeholder="Log progress or notes..."
                variant="compact"
              />
            </Column>
          )}
        </Column>
      )}
    </Column>
  );
};
