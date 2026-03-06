"use client";

import type React from "react";
import { useState } from "react";
import {
  Column,
  Row,
  Text,
  Button,
  Icon,
} from "@once-ui-system/core";
import { formatDate } from "@/utils/formatDate";
import type { Goal } from "@/app/api/goals/route";
import type { Comment } from "@/app/api/comments/route";
import { CommentForm } from "@/components/CommentForm";
import { CommentList } from "@/components/CommentList";
import type { User } from "@supabase/supabase-js";

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
      paddingY="20"
      paddingX="24"
      gap="12"
      background="surface"
    >
      {/* Top row */}
      <Row fillWidth horizontal="between" vertical="center" gap="8">
        <Row gap="12" vertical="center">
          {/* checkbox-style indicator */}
          <div
            style={{
              width: "18px",
              height: "18px",
              minWidth: "18px",
              backgroundColor: isAccomplished ? "var(--brand-solid-strong)" : "transparent",
              border: isAccomplished
                ? "none"
                : "2px solid var(--neutral-alpha-medium)",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {isAccomplished && (
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path
                  d="M10 3L4.5 8.5L2 6"
                  stroke="var(--static-black)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>

          <Column gap="2">
            <Row gap="8" vertical="center">
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
                <Icon name="rocket" size="xs" onBackground="brand-weak" />
              )}
            </Row>
            {goal.description && (
              <Text variant="body-default-s" onBackground="neutral-medium" style={{ lineHeight: "1.6" }}>
                {goal.description}
              </Text>
            )}
          </Column>
        </Row>

        {isAdmin && (
          <Row gap="2" style={{ flexShrink: 0 }}>
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
      <Row gap="12" vertical="center" style={{ flexWrap: "wrap" }}>
        <Text variant="body-default-xs" onBackground="neutral-weak">
          {isAccomplished
            ? `Accomplished ${formatDate(goal.accomplished_at!, true)}`
            : `Added ${formatDate(goal.created_at, true)}`}
        </Text>

        {(updates.length > 0 || isAdmin) && (
          <button
            type="button"
            onClick={() => setShowUpdates((v) => !v)}
            style={{
              all: "unset",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <Icon name="book" size="xs" onBackground="neutral-weak" />
            <Text variant="body-default-xs" onBackground="neutral-weak">
              {updates.length > 0
                ? `${updates.length} note${updates.length !== 1 ? "s" : ""}`
                : "add note"}
            </Text>
          </button>
        )}
      </Row>

      {/* Updates panel */}
      {showUpdates && (
        <Column
          fillWidth
          gap="4"
          paddingTop="8"
          borderTop="neutral-alpha-weak"
        >
          <CommentList comments={updates} isLoading={isPosting} />
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
                placeholder="Add a progress note…"
              />
            </Column>
          )}
        </Column>
      )}
    </Column>
  );
};
