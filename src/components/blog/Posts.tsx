import { getPosts, shuffleArray } from "@/utils/utils";
import { Grid } from "@once-ui-system/core";
import Post from "./Post";

interface PostsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  direction?: "row" | "column";
  exclude?: string[];
  randomize?: boolean;
  limit?: number;
}

export function Posts({
  range,
  columns = "1",
  thumbnail = false,
  exclude = [],
  direction,
  randomize,
  limit,
}: PostsProps) {
  let allBlogs = getPosts(["src", "app", "blog", "posts"]);

  // Exclude by slug
  if (exclude.length) {
    allBlogs = allBlogs.filter((post) => !exclude.includes(post.slug));
  }

  let displayedBlogs;

  if (randomize) {
    // Use the utility you just exported
    const shuffled = shuffleArray(allBlogs);
    displayedBlogs = limit ? shuffled.slice(0, limit) : shuffled;
  } else {
    // Standard date sorting
    const sortedBlogs = allBlogs.sort((a, b) => {
      return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
    });

    // Standard range slicing
    displayedBlogs = range
      ? sortedBlogs.slice(range[0] - 1, range.length === 2 ? range[1] : sortedBlogs.length)
      : sortedBlogs;
  }

  return (
    <>
      {displayedBlogs.length > 0 && (
        <Grid columns={columns} s={{ columns: 1 }} fillWidth marginBottom="40" gap="16">
          {displayedBlogs.map((post) => (
            <Post key={post.slug} post={post} thumbnail={thumbnail} direction={direction} />
          ))}
        </Grid>
      )}
    </>
  );
}
