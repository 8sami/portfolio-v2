import { Media, MasonryGrid, Flex, Column, Text, Card, Row, Avatar, Line, Icon } from "@once-ui-system/core";
import TikTokEmbed from "./TikTokEmbed";

type BeholdPost = {
  id: string;
  mediaUrl: string;
  permalink: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  caption?: string;
  prunedCaption?: string;
  thumbnailUrl?: string;
  timestamp?: string;
};

export default async function SocialsView() {
  const beholdRevalidate = 3600;
  const BEHOLD_URL = process.env.BEHOLD_FEED_URL!;

  let posts: BeholdPost[] = [];
  let user: { username?: string; profilePictureUrl?: string } = {};

  try {
    if (process.env.BEHOLD_FEED_URL) {
      const res = await fetch(BEHOLD_URL, {
        next: { revalidate: beholdRevalidate },
      });
      if (res.ok) {
        const data = await res.json();
        posts = Array.isArray(data) ? data : data.posts || [];
        if (!Array.isArray(data)) {
          user = { username: data.username, profilePictureUrl: data.profilePictureUrl };
        }
      }
    }
  } catch (error) {
    console.error("Failed to fetch Behold feed:", error);
  }

  return (
    <Flex direction="column" horizontal="center" gap="32" fillWidth>
      {/* Instagram Grid */}
      <Column style={{ maxWidth: "850px" }} horizontal="center">
      {posts.length > 0 ? (
        <MasonryGrid columns={3} m={{ columns: 2 }} s={{ columns: 1 }} gap="16">
          {posts.map((post) => (
            <Row maxWidth={24} fillWidth key={post.id}>
              <Card
                href={post.permalink}
                radius="l-4"
                direction="column"
                border="neutral-alpha-medium"
                background="surface"
                className="social-post-card group"
                fillWidth
              >
                <Row fillWidth paddingX="20" paddingY="12" gap="8" vertical="center">
                  <Avatar size="xs" src={user.profilePictureUrl || ""} />
                  <Text variant="label-default-s">{user.username || "Instagram User"}</Text>
                </Row>
                <Media
                  border="neutral-alpha-weak"
                  fillWidth
                  radius="l"
                  alt={post.caption?.substring(0, 50) || "Instagram post"}
                  src={
                    post.mediaType === "VIDEO"
                      ? post.thumbnailUrl || post.mediaUrl
                      : post.mediaUrl
                  }
                />
                <Column fillWidth paddingX="20" paddingY="24" gap="8">
                  {post.caption && (
                    <Text onBackground="neutral-weak" variant="body-default-s">
                      {`${post.prunedCaption?.substring(0, 150)}...`}
                    </Text>
                  )}
                </Column>
                <Line background="neutral-alpha-medium" />
                <Row
                  paddingX="20" paddingY="12" horizontal="center" gap="8" vertical="center"
                  textVariant="label-default-s" onBackground="neutral-medium"
                >
                  <Icon name="instagram" size="s" onBackground="neutral-strong" />
                  <Text>{post.mediaType === "VIDEO" ? "Reel" : "Post"}</Text>
                </Row>
              </Card>
            </Row>
          ))}
        </MasonryGrid>
      ) : !process.env.BEHOLD_FEED_URL ? (
        <Column padding="24" horizontal="center" vertical="center">
          <Text variant="label-default-l" onBackground="neutral-weak">
            Please configure BEHOLD_FEED_URL in your environment.
          </Text>
        </Column>
      ) : null}
      </Column>
      {/* TikTok Embed */}
      <TikTokEmbed />
    </Flex>
  );
}