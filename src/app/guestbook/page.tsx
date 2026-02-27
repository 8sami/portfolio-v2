import { Meta } from "@once-ui-system/core";
import { baseURL, guestbook } from "@/resources";
import { GuestbookContent } from "@/components/guestbook/GuestbookContent";
import { createClient } from "@supabase/supabase-js";
import { supabaseAnonKey, supabaseUrl } from "@/lib/supabase";

export async function generateMetadata() {
  return Meta.generate({
    title: guestbook.title,
    description: guestbook.description || "",
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(guestbook.title)}`,
    path: guestbook.path,
  });
}

async function fetchComments() {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data: comments, error } = await supabase
    .from('comments')
    .select(`
      id,
      content,
      created_at,
      author:author_id (
        id, name, email, image, is_admin
      )
    `)
    .order('created_at', { ascending: false });

  if (error) return [];
  return comments;
}

async function GuestbookData() {
  const comments = await fetchComments();
  // @ts-ignore
  return <GuestbookContent initialComments={comments} />;
}

export default function Guestbook() {
  return <GuestbookData />;
}