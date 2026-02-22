"use client";

import type React from "react";
import { Flex, Text, Avatar, Skeleton, Icon } from "@once-ui-system/core";

interface Comment {
  id: string;
  content: string;
  created_at: string;
  author: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  } | null;
}

interface CommentListProps {
  comments: Comment[];
  isLoading?: boolean;
}

const CommentSkeleton: React.FC = () => (
  <Flex
    direction="column"
    gap="12"
    padding="16"
    radius="l"
    background="surface"
    border="neutral-alpha-weak"
    fillWidth
  >
    <Flex horizontal="between" vertical="center">
      <Flex direction="row" vertical="center" gap="8">
        <Skeleton shape="circle" width="s" height="s" />
        <Flex direction="column" gap="4">
          <Skeleton shape="block" width="120px" height="xs" />
          <Skeleton shape="block" width="80px" height="xs" />
        </Flex>
      </Flex>
    </Flex>
    <Flex direction="column" gap="8" fillWidth>
      <Skeleton shape="block" width="100%" height="xs" />
      <Skeleton shape="block" width="60%" height="xs" />
    </Flex>
  </Flex>
);

export const CommentList: React.FC<CommentListProps> = ({ comments, isLoading }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Flex direction="column" gap="32" fillWidth>
      <Flex direction="column" gap="24" fillWidth>
        {comments.map((comment) => (
          <Flex
            key={comment.id}
            gap="12"
            fillWidth
          >
            <Avatar
              src={comment.author?.image || undefined}
              size="l"
              style={{ flexShrink: 0 }}
            />
            <Flex direction="column" gap="4" fillWidth>
              <Flex vertical="center" gap="8" fillWidth>
                <Text variant="body-strong-s" onBackground="neutral-strong">
                  {comment.author?.name || comment.author?.email || "Anonymous"}
                </Text>
                <Text variant="body-default-xs" onBackground="neutral-weak">
                  {formatDate(comment.created_at)}
                </Text>
              </Flex>
              <Text variant="body-default-m" style={{ whiteSpace: "pre-wrap" }} onBackground="neutral-medium">
                {comment.content}
              </Text>
            </Flex>
          </Flex>
        ))}
        {isLoading && (
          <Flex gap="12" fillWidth>
            <Skeleton shape="circle" width="l" height="l" />
            <Flex direction="column" gap="8" fillWidth>
              <Skeleton shape="block" width="30%" height="xs" />
              <Skeleton shape="block" width="100%" height="xs" />
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
 