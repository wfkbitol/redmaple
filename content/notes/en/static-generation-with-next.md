---
title: Static Content Pages with Next.js
date: 2026-06-19
description: This note explains how to generate Markdown content as static pages in Next.js.
readTime: 4 min read
tags: [Next.js, static generation]
---

# Static Content Pages with Next.js

If your content lives in Markdown files, one of the simplest approaches is to read them at build time and render them into pages. For a personal blog, this is lightweight and easy to maintain.

The key steps are:

1. Read Markdown files from the content directory during build.
2. Parse frontmatter and body content.
3. Generate a route for each article.
4. Render the Markdown content in a page component.

This keeps content and code separate, so adding a new post is as easy as dropping in a Markdown file.
