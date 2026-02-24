"use client";

import type React from "react";
import { useState } from "react";
import {
  Button,
  Row,
  Column,
  Input,
  UserMenu,
  Dropdown,
  Option,
  Icon,
} from "@once-ui-system/core";
import type { User } from "@supabase/supabase-js";

interface CommentFormProps {
  onSubmit: (content: string) => Promise<void>;
  user: User | null;
  onSignOut: () => void;
  onSignIn: () => void;
}

export const CommentForm: React.FC<CommentFormProps> = ({
  onSubmit,
  user,
  onSignOut,
  onSignIn,
}) => {
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
    <Column fillWidth gap="12" paddingY="12">
      <Row fillWidth gap="xs" vertical="center">
        <UserMenu
          name=""
          avatarProps={{
            src:
              user?.user_metadata?.avatar_url || user?.user_metadata?.picture,
            style: {
              width: "52px",
              height: "52px",
            },
          }}
          dropdown={
            <Dropdown radius="m-4">
              {user ? (
                <Option
                  label="Sign out"
                  value="signout"
                  onClick={onSignOut}
                  hasSuffix={<Icon size="s" name="signout" />}
                />
              ) : (
                <Option
                  label="Sign in"
                  value="signin"
                  onClick={onSignIn}
                  hasSuffix={<Icon size="s" name="signin" />}
                />
              )}
            </Dropdown>
          }
        />
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Input
            id="comment-content"
            placeholder="Add a nice comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isSubmitting}
            height="s"
            hasSuffix={
              <Button
                type="submit"
                disabled={isSubmitting || !content.trim()}
                loading={isSubmitting}
                size="s"
                variant="primary"
              >
                Post
              </Button>
            }
          />
        </form>
      </Row>
    </Column>
  );
};
