"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Flex, Heading, Schema, Column, Button, Text, Icon, Dialog, Toast, UserMenu, Dropdown, Option } from "@once-ui-system/core";
import { baseURL, guestbook, person } from "@/resources";
import { CommentForm } from "@/components/CommentForm";
import { CommentList } from "@/components/CommentList";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

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

export const GuestbookContent: React.FC<{ initialComments?: Comment[] }> = ({
  initialComments = [],
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [errorToast, setErrorToast] = useState<string | null>(null);
  const processingRef = useRef(false);

  const postComment = async (content: string, token: string) => {
    setIsPosting(true);
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        const refresh = await fetch("/api/comments");
        const data = await refresh.json();
        setComments(data);
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    } finally {
      setIsPosting(false);
    }
  };

  useEffect(() => {
    const handleSessionOnLoad = async () => {
      if (processingRef.current) return;
      processingRef.current = true;

      const params = new URLSearchParams(window.location.hash.substring(1));
      if (params.get("error")) {
        setErrorToast("Sign in cancelled or failed.");
        setUser(null);
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      if (session?.user) {
        const pending = localStorage.getItem("pendingComment");
        if (pending && session.access_token) {
          const success = await postComment(pending, session.access_token);
          if (success) {
            localStorage.removeItem("pendingComment");
            setShowSignInModal(false);
          }
        }
      }
    };

    handleSessionOnLoad();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (content: string) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      localStorage.setItem("pendingComment", content);
      setShowSignInModal(true);
    } else {
      await postComment(content, session.access_token);
    }
  };

  const handleSignIn = async (provider: "google" | "github") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/guestbook`
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <Column maxWidth="m" fillWidth horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={guestbook.title}
        description={guestbook.description}
        path={guestbook.path}
        image={`/api/og/generate?title=${encodeURIComponent(guestbook.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${guestbook.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {errorToast && (
        <Toast variant="danger" onClose={() => setErrorToast(null)}>
          {errorToast}
        </Toast>
      )}

      <Flex direction="column" fillWidth gap="24" paddingX="l">
        {/* Header */}
        <Column fillWidth gap="8">
          <Heading variant="display-strong-l">
            {guestbook.title}
          </Heading>
          <Text variant="heading-default-xl" onBackground="neutral-weak">
            {guestbook.description}
          </Text>
        </Column>

        {/* Comment Section */}
        <Column fillWidth gap="16">
          {/* Form and Auth */}
          <Column fillWidth gap="8">
            <Flex vertical="center" fillWidth horizontal="between" gap="12">
              <div /> {/* Spacer since Heading is removed */}
              {user && (
                <UserMenu
                  name={user.user_metadata?.full_name || user.user_metadata?.name || user.email || ""}
                  subline={user.email}
                  avatarProps={{ src: user.user_metadata?.avatar_url || user.user_metadata?.picture }}
                  dropdown={
                    <Dropdown>
                      <Option
                        label="Log out"
                        hasPrefix={<Icon name="logout" size="xs" />}
                        onClick={handleSignOut}
                        danger
                      />
                    </Dropdown>
                  }
                />
              )}
            </Flex>
            <Column
              style={{
                opacity: isPosting ? 0.5 : 1,
                pointerEvents: isPosting ? "none" : "auto",
              }}
            >
              <CommentForm 
                onSubmit={handleSubmit} 
                userAvatar={user?.user_metadata?.avatar_url || user?.user_metadata?.picture}
              />
            </Column>
          </Column>

          {/* Comments List */}
          <Column fillWidth gap="0">
            <CommentList comments={comments} isLoading={isPosting} />
          </Column>
        </Column>
      </Flex>

      {/* Sign-in Modal */}
      <Dialog
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        title="Sign in to comment"
        maxWidth="xs"
      >
        <Flex
          direction="column"
          gap="m"
          background="transparent"
          border="transparent"
        >
          <Text variant="body-default-m" onBackground="neutral-weak">
            You need to sign in to leave a comment.
          </Text>
          <Flex direction="column" gap="s">
            <Button
              onClick={() => handleSignIn("google")}
              size="m"
              fillWidth
            >
              <Icon name="google" size="s" marginRight="8" />
              Continue with Google
            </Button>
            <Button
              onClick={() => handleSignIn("github")}
              size="m"
              fillWidth
            >
              <Icon name="github" size="s" marginRight="8" />
              Continue with GitHub
            </Button>
          </Flex>
        </Flex>
      </Dialog>
    </Column>
  );
};
