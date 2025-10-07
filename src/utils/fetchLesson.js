import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import MDXComponents from "./MDXComponents";

export async function fetchLesson(pathSlug, lessonNumber) {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "content",
      pathSlug,
      `lezione-${lessonNumber}.mdx`
    );

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return null;
    }

    // Read the MDX file
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // Compile the MDX content with custom components
    const { content, frontmatter } = await compileMDX({
      source: fileContent,
      components: MDXComponents,
      options: {
        parseFrontmatter: true,
      },
    });

    return {
      content,
      title: frontmatter?.title || `Lezione ${lessonNumber}`,
      slug: pathSlug,
      lessonNumber,
    };
  } catch (error) {
    console.error("Error fetching lesson:", error);
    return null;
  }
}

export async function getAllLessons(pathSlug) {
  try {
    const contentDir = path.join(process.cwd(), "public", "content", pathSlug);

    // Check if directory exists
    if (!fs.existsSync(contentDir)) {
      return [];
    }

    // Read all files in the directory
    const files = fs.readdirSync(contentDir);

    // Filter for .mdx files and extract lesson numbers
    const lessons = files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => {
        const match = file.match(/lezione-(\d+)\.mdx/);
        return match ? parseInt(match[1], 10) : null;
      })
      .filter((num) => num !== null)
      .sort((a, b) => a - b);

    return lessons;
  } catch (error) {
    console.error("Error getting all lessons:", error);
    return [];
  }
}
