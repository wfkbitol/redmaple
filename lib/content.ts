import fs from "node:fs";
import path from "node:path";
import { defaultLocale, type Locale } from "@/lib/i18n";

export type ContentSection = "blog" | "notes" | "musings";

export type ContentItem = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
  section: ContentSection;
};

const contentRoot = path.join(process.cwd(), "content");

function getSectionDir(section: ContentSection) {
  return path.join(contentRoot, section);
}

function getSectionLocaleDir(section: ContentSection, locale: Locale) {
  return path.join(getSectionDir(section), locale);
}

function parseFrontmatter(markdown: string) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, body: markdown };
  }

  const [, rawFrontmatter, body] = match;
  const frontmatter: Record<string, unknown> = {};

  for (const line of rawFrontmatter.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const separatorIndex = trimmed.indexOf(":");
    if (separatorIndex === -1) continue;
    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    if (key === "tags") {
      frontmatter[key] = value
        .replace(/\[|\]/g, "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    } else {
      frontmatter[key] = value.replace(/^['\"]|['\"]$/g, "");
    }
  }

  return { frontmatter, body };
}

function getMarkdownFiles(section: ContentSection, locale: Locale = defaultLocale) {
  const localeDir = getSectionLocaleDir(section, locale);
  if (!fs.existsSync(localeDir)) return [];

  return fs
    .readdirSync(localeDir)
    .filter((file) => file.endsWith(".md"))
    .sort((a, b) => b.localeCompare(a))
    .map((file) => path.join(localeDir, file));
}

export function getContentItems(section: ContentSection, locale: Locale = defaultLocale): ContentItem[] {
  return getMarkdownFiles(section, locale).map((filePath) => {
    const slug = path.basename(filePath, ".md");
    const content = fs.readFileSync(filePath, "utf8");
    const { frontmatter, body } = parseFrontmatter(content);

    return {
      slug,
      title: String(frontmatter.title ?? slug),
      description: String(frontmatter.description ?? ""),
      date: String(frontmatter.date ?? ""),
      readTime: String(frontmatter.readTime ?? ""),
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      content: body,
      section,
    };
  });
}

export function getContentBySlug(section: ContentSection, slug: string, locale: Locale = defaultLocale) {
  const filePath = path.join(getSectionLocaleDir(section, locale), `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const content = fs.readFileSync(filePath, "utf8");
  const { frontmatter, body } = parseFrontmatter(content);

  return {
    slug,
    title: String(frontmatter.title ?? slug),
    description: String(frontmatter.description ?? ""),
    date: String(frontmatter.date ?? ""),
    readTime: String(frontmatter.readTime ?? ""),
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    content: body,
    section,
  } as ContentItem;
}

