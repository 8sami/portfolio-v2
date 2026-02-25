"use client";

import type React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Heading,
  Schema,
  Column,
  Button,
  Text,
  Dialog,
  Toast,
} from "@once-ui-system/core";
import { baseURL, guestbook, person } from "@/resources";
import { CommentForm } from "@/components/CommentForm";
import { CommentList } from "@/components/CommentList";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import type { Comment } from "@/components/CommentList";

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
          Authorization: `Bearer ${token}`,
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
        redirectTo: `${window.location.origin}/guestbook`,
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <Column maxWidth="m" fillWidth paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={guestbook.title}
        description=""
        path={guestbook.path}
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

      <Column fillWidth gap="24" paddingX="m">
        {/* Header */}
        <Heading variant="display-strong-s" align="center">
          {guestbook.title}
        </Heading>

        {/* Comment Section */}
        <Column fillWidth horizontal="center" gap="32">
          <Column
            fillWidth
            style={{
              opacity: isPosting ? 0.5 : 1,
              pointerEvents: isPosting ? "none" : "auto",
            }}
          >
            <CommentForm
              onSubmit={handleSubmit}
              user={user}
              onSignOut={handleSignOut}
              onSignIn={() => setShowSignInModal(true)}
            />
          </Column>

          {/* Comments List */}
          <Column fillWidth maxWidth="m" gap="0">
            <CommentList comments={comments} isLoading={isPosting} />
          </Column>
        </Column>
      </Column>

      {/* Sign-in Modal */}
      <Dialog
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        title="Sign in to comment"
        maxWidth="xs"
        style={{
          height: 'fit-content',
          margin: 'auto',
        }}
      >
        <Column 
          gap="32" 
          padding="16" 
          horizontal="center"
        >
          <Text
            variant="body-default-l"
            onBackground="neutral-weak"
            align="center"
          >
            Join the conversation and share your thoughts.
          </Text>
          <Column fillWidth gap="12">
            <Button
              onClick={() => handleSignIn("google")}
              size="m"
              fillWidth
              variant="primary"
              prefixIcon="google"
            >
              Continue with Google
            </Button>
            <Button
              onClick={() => handleSignIn("github")}
              size="m"
              fillWidth
              variant="primary"
              prefixIcon="github"
            >
              Continue with GitHub
            </Button>
          </Column>
        </Column>
      </Dialog>
    </Column>
  );
};
