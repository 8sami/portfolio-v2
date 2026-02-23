"use client";

import type React from "react";
import { Text, Avatar, Skeleton, Row, Column } from "@once-ui-system/core";
import { formatDate } from "@/utils/formatDate";

export interface Comment {
  id: string;
  content: string;
  created_at: string;
  author: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    is_admin?: boolean;
  } | null;
}

interface CommentListProps {
  comments: Comment[];
  isLoading?: boolean;
}

const CommentSkeleton: React.FC = () => (
  <Row gap="12" paddingY="16" fillWidth vertical="start">
    <Skeleton shape="circle" width="m" height="m" />
    <Column gap="8" fillWidth>
      <Skeleton shape="block" width="m" height="xs" />
      <Skeleton shape="block" width="xl" height="xs" />
    </Column>
  </Row>
);

export const CommentList: React.FC<CommentListProps> = ({
  comments = [],
  isLoading,
}) => {
  return (
    <Column fillWidth gap="4">
      {comments.map((comment) => (
        <Row key={comment.id} gap="16" paddingY="12" fillWidth vertical="start">
          <Avatar
            src={comment.author?.image || undefined}
            size="l"
            style={{ flexShrink: 0, marginTop: "2px" }}
            border={
              comment.author?.is_admin === true
                ? "brand-strong"
                : "neutral-strong"
            }
            borderWidth={2}
          />
          <Column gap="4" fillWidth>
            <Row
              vertical="center"
              gap="8"
              fillWidth
              style={{ flexWrap: "wrap" }}
            >
              <Text variant="label-strong-s" onBackground="neutral-strong">
                {comment.author?.name ||
                  comment.author?.email?.split("@")[0] ||
                  "Anonymous"}
              </Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {formatDate(comment.created_at, true)}
              </Text>
            </Row>
            <Text
              variant="body-default-m"
              style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}
              onBackground="neutral-medium"
            >
              {comment.content}
            </Text>
          </Column>
        </Row>
      ))}
      {isLoading && <CommentSkeleton />}
    </Column>
  );
};
