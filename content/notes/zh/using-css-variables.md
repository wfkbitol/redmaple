---
title: 用 CSS 变量统一主题色
date: 2026-06-21
description: 简单记录一下把主题色从零散样式中抽离出来的思路。
readTime: 3 min read
tags: [CSS, 主题]
---

# 用 CSS 变量统一主题色

在搭建这个站点的时候，我把主色、强调色、背景色全部抽离成 CSS 变量。这样做的好处很直接：以后换主题，只需要改一处。

```css
:root {
  --accent: #ff4d4f;
  --accent-soft: rgba(255, 77, 79, 0.16);
  --surface: #140608;
}
```

随后在组件里就可以通过 `var(--accent)` 来引用。对于多主题站点，这种方式非常稳妥。
