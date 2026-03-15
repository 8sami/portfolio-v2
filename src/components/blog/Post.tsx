"use client";

import { Card, Column, Media, Row, Avatar, Text, Flex } from "@once-ui-system/core";
import { formatDate } from "@/utils/formatDate";
import { person } from "@/resources";

interface PostProps {
  post: any;
  thumbnail: boolean;
  direction?: "row" | "column";
}

export default function Post({ post, thumbnail, direction = "column" }: PostProps) {
  return (
    <Card
      fillWidth
      key={post.slug}
      href={`/blog/${post.slug}`}
      transition="micro-medium"
      direction={direction}
      border="transparent"
      background="transparent"
      radius="l"
      gap="24"
    >
      {post.metadata.image && thumbnail && (
        <Flex fillWidth style={{ flex: direction === "row" ? '1' : 'none' }}>
          <Media
            priority
            sizes="(max-width: 768px) 100vw, 640px"
            border="neutral-alpha-weak"
            cursor="interactive"
            radius="m"
            src={post.metadata.image}
            alt={"Thumbnail of " + post.metadata.title}
            aspectRatio="16 / 9"
          />
        </Flex>
      )}
      <Column 
        fillWidth 
        paddingY="12" 
        gap="16" 
        style={{ flex: direction === "row" ? '1.5' : 'none' }}
      >
        <Row gap="12" vertical="center">
          <Row vertical="center" gap="8">
            <Avatar src={person.avatar} size="s" />
            <Text variant="body-default-m" onBackground="neutral-strong">
              {person.name}
            </Text>
          </Row>
          <Text variant="label-default-xs" onBackground="neutral-weak">
            {formatDate(post.metadata.publishedAt, false)}
          </Text>
        </Row>

        <Column gap="8">
          <Text variant="heading-strong-xl" wrap="balance">
            {post.metadata.title}
          </Text>
          {post.metadata.summary && (
            <Text variant="body-default-s" onBackground="neutral-medium">
              {post.metadata.summary}
            </Text>
          )}
        </Column>

        {post.metadata.tag && (
          <Text variant="label-strong-xs" onBackground="neutral-weak">
            {post.metadata.tag}
          </Text>
        )}
      </Column>
    </Card>
  );
}
