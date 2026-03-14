import { getPosts, shuffleArray } from "@/utils/utils";
import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  randomize?: boolean;
  limit?: number;
}

export function Projects({ range, exclude, randomize, limit }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  let displayedProjects;

  if (randomize) {
    const shuffled = shuffleArray(allProjects);
    displayedProjects = limit ? shuffled.slice(0, limit) : shuffled;
  } else {
    const sortedProjects = allProjects.sort((a, b) => {
      return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
    });

    displayedProjects = range
      ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
      : sortedProjects;
  }

  // Handle case where no projects exist
  if (displayedProjects.length === 0) return null;

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`/work/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          content={post.content}
          avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
          link={post.metadata.link || ""}
        />
      ))}
    </Column>
  );
}
