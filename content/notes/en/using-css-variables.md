---
title: Use CSS Variables to Unify Theme Colors
date: 2026-06-21
description: A quick note on extracting theme colors into CSS variables.
readTime: 3 min read
tags: [CSS, theme]
---

# Use CSS Variables to Unify Theme Colors

When building this site, I extracted the main color palette into CSS variables. The benefit is simple: if you want to change the theme later, you only change one place.

```css
:root {
  --accent: #ff4d4f;
  --accent-soft: rgba(255, 77, 79, 0.16);
  --surface: #140608;
}
```

Then components can use `var(--accent)` directly. For multi-theme sites, this is a very stable approach.
