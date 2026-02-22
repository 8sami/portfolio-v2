"use client";

import React, { useState } from "react";
import { Button, Flex, Textarea, Avatar } from "@once-ui-system/core";

interface CommentFormProps {
  onSubmit: (content: string) => Promise<void>;
  userAvatar?: string | null;
}

export const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, userAvatar }) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit(content.trim());
      setContent("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Flex gap="12" fillWidth>
      <Avatar
        src={userAvatar || undefined}
        size="l"
        style={{ flexShrink: 0 }}
      />
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Textarea
          id="comment-content"
          placeholder="Share your thoughts..."
          value={content}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setContent(event.target.value)}
          disabled={isSubmitting}
          lines={2}
          style={{ width: '100%' }}
          hasSuffix={
            <Flex paddingRight="8" vertical="center" height="fill">
              <Button
                type="submit"
                disabled={!content.trim() || isSubmitting}
                loading={isSubmitting}
                size="m"
                variant="primary"
              >
                Post
              </Button>
            </Flex>
          }
        />
      </form>
    </Flex>
  );
};