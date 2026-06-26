import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { baseURL, blog, person, newsletter } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title as string,
    description: blog.description as string,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(blog.title as string)}`,
    path: blog.path,
  });
}

export default function Blog() {
  return (
    <Column maxWidth="s" paddingTop="24">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={blog.title as string}
        description={blog.description as string}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title as string)}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="display-strong-s" align="center">
        {blog.title}
      </Heading>
      <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
        <Posts thumbnail />
      </Column>
    </Column>
  );
}
