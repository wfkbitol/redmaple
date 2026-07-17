---
title: Next.js 里如何做静态内容页面
date: 2026-06-19
description: 这篇随笔讲的是如何把 Markdown 内容生成为静态页面。
readTime: 4 min read
tags: [Next.js, 静态生成]
---

# Next.js 里如何做静态内容页面

如果内容是 Markdown 文件，最简单的做法是把它们在构建时读取出来，再转换成页面内容。对于个人博客来说，这种方式足够轻量，也很适合长期维护。

关键点很简单：

1. 在构建阶段读取内容目录中的 Markdown 文件。
2. 解析 frontmatter 和正文。
3. 为每一篇文章生成对应的路由。
4. 在页面组件里把内容渲染出来。

这让内容和代码可以分离，后续只需要新增一个 Markdown 文件即可。
