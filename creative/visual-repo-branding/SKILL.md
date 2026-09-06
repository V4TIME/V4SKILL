---
name: visual-repo-branding
version: 1.0.0
description: Dark SVG banner + logo for GitHub READMEs. Create, verify.
category: creative
tags: [github, banner, logo, svg, branding, readme, visual]
---

# Visual Repo Branding

Create a dark-themed SVG banner and logo for a GitHub repository README. Covers design, embed, verify, and publish.

## What This Covers

- **Banner image**: Full-width dark SVG at top of README with title, subtitle, stats/keyword strip
- **Logo icon**: Square SVG icon for potential repo icon use
- **Embedding**: Markdown image tag pointing to `assets/banner.svg` (repo-served SVG, no external hosting)
- **Verification**: Push, confirm renders on GitHub repo page

## Quick Start

### 1. Create banner SVG

Write `assets/banner.svg` at repo root. Dark background (#0d1117 → #161b22), owner/username as hero text, stats box on right.

Structure:
- **Left (60%)**: Username in large monospace (72-96px) with glow filter (`<filter id="glow">` + feGaussianBlur). Below: subtitle line like "GITHUB PROFILE — SKILLS COLLECTION"
- **Right (40%)**: Dark card (#161b22, #30363d border) with stats — skill count, category count, key numbers
- **Bottom strip**: Keyword tags separated by `·` — these are search-indexed by GitHub
- **Decorative**: Subtle grid, glowing circles in corners

### 2. Create logo SVG

Write `assets/logo.svg`. 100-200px square, dark circle background, symbol (hexagon, V mark) inside, gradient accents.

### 3. Embed in README.md

Add at very top of README.md (before first heading):

```markdown
<p align="center">
  <img src="assets/banner.svg" width="100%" alt="<REPO> — <subtitle>" />
</p>
```

`width="100%"` = full-width on GitHub. `alt` text is indexed by GitHub search.

### 4. Verify on GitHub

After push:
- Open `github.com/<owner>/<repo>` in browser
- Confirm banner renders full-width, not clipped
- If 404: check file path (`assets/banner.svg` at repo root → `assets/`), check commit landed (`git ls-remote origin`)

## Design Reference

### Colors

| Role | Hex |
|------|-----|
| Background gradient start | #0d1117 |
| Background gradient end | #161b22 |
| Card background | #161b22 |
| Card border | #30363d |
| Text primary (accent) | #58a6ff |
| Text muted | #8b949e |
| Divider | #21262d |

### Text hierarchy

- **Hero/username**: 72-96px monospace, bold, glow filter
- **Subtitle**: 14-16px, uppercase, letter-spacing 2-4px, muted
- **Stats numbers**: 24-32px bold
- **Stats labels**: 11-12px, uppercase, letter-spacing
- **Keyword strip**: 10-12px per keyword

### Pitfalls

- **Spaces in SVG filename**: GitHub may not render. Use hyphens: `banner.svg`, not `banner final.svg`
- **Repo doesn't exist yet**: `git push` to non-existent repo fails silently via SSH. User must create repo via GitHub web UI first
- **No GitHub PAT + no `gh` CLI**: Cannot create repo via API. Must use web UI
- **SVG too large**: Keep under ~200KB. Remove unnecessary elements
- **Text too small**: Keywords below 10px may not render on high-DPI
- **No alt text**: GitHub uses alt for accessibility + search. Always include
- **Propagation delay**: After push, repo may 404 for 30s-2min. Wait and retry

## Reference

See `references/banner-design-patterns.md` for SVG templates, color palettes, and example banner structures.

## When to Use

- Setting up a new GitHub repo with branded banner + logo
- Updating an existing repo's visual identity
- User asks for "banner", "logo", "branding", "make it look good"
- Skills collection, docs repo, any repo where visual identity matters

Do NOT use for:
- Organization-level branding (GitHub orgs have separate settings banner)
- Profile READMEs (`github.com/<user>/<user>`) — different layout
