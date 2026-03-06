"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Column,
  Row,
  Heading,
  Text,
  Button,
  Schema,
} from "@once-ui-system/core";
import { baseURL, goals, person } from "@/resources";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import type { Goal } from "@/app/api/goals/route";
import type { Comment } from "@/app/api/comments/route";
import { GoalCard } from "./GoalCard";
import { GoalForm } from "./GoalForm";
import { GoalStats } from "./GoalStats";

interface GoalsContentProps {
  initialGoals?: Goal[];
}

export const GoalsContent: React.FC<GoalsContentProps> = ({
  initialGoals = [],
}) => {
  const [goalsList, setGoalsList] = useState<Goal[]>(initialGoals);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkAdmin = async (uid: string) => {
      const { data } = await supabase
        .from("users")
        .select("is_admin")
        .eq("id", uid)
        .single();
      return data?.is_admin === true;
    };

    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!mounted) return;
      if (session?.user) {
        setUser(session.user);
        setToken(session.access_token);
        const admin = await checkAdmin(session.user.id);
        if (mounted) setIsAdmin(admin);
      }
      if (mounted) setIsAuthLoaded(true);
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return;
        const u = session?.user ?? null;
        setUser(u);
        setToken(session?.access_token ?? null);
        if (u) {
          const admin = await checkAdmin(u.id);
          if (mounted) setIsAdmin(admin);
        } else {
          setIsAdmin(false);
        }
        if (mounted) setIsAuthLoaded(true);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleGoalSaved = (saved: Goal) => {
    setGoalsList((prev) => {
      const exists = prev.find((g) => g.id === saved.id);
      if (exists) {
        return prev.map((g) =>
          g.id === saved.id ? { ...saved, updates: g.updates } : g
        );
      }
      return [{ ...saved, updates: [] }, ...prev];
    });
    setShowForm(false);
    setEditingGoal(null);
  };

  const handleDeleteGoal = async (id: string) => {
    if (!token) return;
    const res = await fetch(`/api/goals/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) setGoalsList((prev) => prev.filter((g) => g.id !== id));
  };

  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal);
    setShowForm(true);
  };

  const handleUpdateAdded = (goalId: string, comment: Comment) => {
    setGoalsList((prev) =>
      prev.map((g) =>
        g.id === goalId
          ? { ...g, updates: [comment, ...(g.updates ?? [])] }
          : g
      )
    );
  };

  const handleUpdateDeleted = async (goalId: string, commentId: string) => {
    if (!token) return;
    const res = await fetch(
      `/api/goals/${goalId}/updates?commentId=${commentId}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    );
    if (res.ok) {
      setGoalsList((prev) =>
        prev.map((g) =>
          g.id === goalId
            ? { ...g, updates: (g.updates ?? []).filter((u) => u.id !== commentId) }
            : g
        )
      );
    }
  };

  const sortedGoals = [...goalsList].sort((a, b) => {
    if (a.is_current && !b.is_current) return -1;
    if (!a.is_current && b.is_current) return 1;
    if (!a.accomplished_at && b.accomplished_at) return -1;
    if (a.accomplished_at && !b.accomplished_at) return 1;
    return a.display_order - b.display_order;
  });

  return (
    <Column maxWidth="m" fillWidth paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={goals.title}
        description={goals.description ?? ""}
        path={goals.path}
        author={{
          name: person.name,
          url: `${baseURL}${goals.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column fillWidth gap="24" paddingX="m">
        <Heading variant="display-strong-s" align="center">
          {goals.title}
        </Heading>

        <GoalStats goals={goalsList} />

        {isAdmin && isAuthLoaded && (
          <Row fillWidth horizontal="end">
            <Button
              size="s"
              variant="primary"
              prefixIcon="plus"
              onClick={() => {
                setEditingGoal(null);
                setShowForm((v) => !v);
              }}
            >
              {showForm && !editingGoal ? "Cancel" : "Add Goal"}
            </Button>
          </Row>
        )}

        {isAdmin && showForm && token && (
          <GoalForm
            token={token}
            editingGoal={editingGoal}
            onSaved={handleGoalSaved}
            onCancel={() => { setShowForm(false); setEditingGoal(null); }}
          />
        )}

        {sortedGoals.length === 0 ? (
          <Column horizontal="center" paddingY="48">
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              No goals yet.
            </Text>
          </Column>
        ) : (
          <Column fillWidth gap="12">
            {sortedGoals.map((goal, index) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                index={index}
                isAdmin={isAdmin}
                user={user}
                token={token}
                onDelete={handleDeleteGoal}
                onEdit={handleEditGoal}
                onUpdateAdded={handleUpdateAdded}
                onUpdateDeleted={handleUpdateDeleted}
              />
            ))}
          </Column>
        )}
      </Column>
    </Column>
  );
};
