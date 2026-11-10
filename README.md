
---

## INFO

| | |
|---|---|
| **What it is** | A collection of 73 Hermes Agent skills across 12 categories — AI coding agents, email automation, document processing, research tools, creative media, Apple ecosystem, cloud APIs, social media, debugging, QA, design direction, and meta utilities |
| **Platform** | Hermes Agent on Linux, macOS, Windows |
| **Install** | One command: `curl -fsSL https://raw.githubusercontent.com/V4TIME/V4SKILL/main/install.sh \| bash` — installs all 73 skills and verifies them. Manual: `git clone https://github.com/V4TIME/V4SKILL.git && cd V4SKILL && ./install.sh` |
| **Browse** | [Browse the full skill catalog](docs/SKILLS.md), or load `skill-compass` to find any skill by tag |

---

# Hermes Agent Skills — 73 AI Agent Skills for Productivity, Coding, Research, Creative Work & System Automation

> A comprehensive collection of **73 Hermes Agent skills** spanning **12 categories** — AI coding assistants (Claude Code, OpenAI Codex, OpenCode), email automation (IMAP/SMTP, Gmail, inbox triage), document processing (PDF, DOCX, XLSX, PPTX), research tools (arXiv, grounded citations, wiki knowledge bases), creative tools (infographics, SVG architecture diagrams, ASCII video, Manim math animations, p5.js generative art), Apple ecosystem automation (Notes, Reminders, iMessage, Find My), cloud APIs (Google Workspace, Box, Airtable, Notion), social media (X/Twitter CLI), debugging & code review (systematic debugging, TDD, pre-commit security scans), and meta skills (skill-compass tag lookup, drytalk ultra-short communication modes). All skills include **YAML frontmatter with tags** for instant skill-compass lookup. Designed for **Hermes Agent** on Linux, macOS, and Windows — install all 73 in one command with `curl -fsSL https://raw.githubusercontent.com/V4TIME/V4SKILL/main/install.sh | bash`, or clone the repo and run `./install.sh`.

---

## Table of Contents

- [Installation & Setup](#installation--setup)
- [Why This Repository](#why-this-repository)
- [Categories Overview](#categories-overview)
- [Skill Catalog](docs/SKILLS.md)
- [Skill Format & Conventions](#skill-format--conventions)
- [Using the Skill-Compass](#using-the-skill-compass)
- [Search Keywords](#search-keywords)
- [Contributing](#contributing)

---

## Installation & Setup

### Quick install — all 73 skills in one command

```bash
curl -fsSL https://raw.githubusercontent.com/V4TIME/V4SKILL/main/install.sh | bash
```

The installer:

- copies every skill into `${HERMES_HOME:-~/.hermes}/skills/v4skill`
- skips `.git`, `__pycache__`, and other generated artifacts
- verifies that all **73** `SKILL.md` files exist with valid YAML frontmatter
- exits non-zero if any skill is missing or malformed

See [`SECURITY.md`](SECURITY.md) for the audit scope and the list of intentionally credential-aware scripts.

Prefer to read the script before running it? Clone and use the same installer locally:

```bash
git clone https://github.com/V4TIME/V4SKILL.git
cd V4SKILL
./install.sh            # copy install (self-contained)
./install.sh --link     # symlink install (git pull updates skills live)
```

### Installer options

| Option | What it does |
|---|---|
| `--copy` | Copy skills into the target directory (default) |
| `--link` | Symlink the checkout into the target; `git pull` updates skills live |
| `--force`, `-f` | Replace an existing install |
| `--target DIR` | Install somewhere other than `$HERMES_HOME/skills/v4skill` |
| `--repo URL` | Clone a different remote when not running from a checkout |
| `--branch NAME` | Clone a different branch (default: `main`) |
| `--help` | Show usage and examples |

Use a named Hermes profile or non-default home:

```bash
HERMES_HOME=~/.hermes/profiles/work ./install.sh
./install.sh --target /opt/hermes/skills/v4skill
```

On Windows, run the same script from **Git Bash** or **WSL**.

### Verify the install

```bash
find -L "$HOME/.hermes/skills/v4skill" -name SKILL.md | wc -l   # 73
```

The installer already performs this count plus frontmatter validation. To re-check manually, load `skill-compass` and ask Hermes to list the registry; it should show 73 skills across 12 categories.

### Refresh the skill index

After installing or updating:

```bash
skill-compass --refresh
```

Or ask Hermes: **"refresh skill-compass"**. This re-reads every `SKILL.md` so the lookup table includes all 73 skills.

### Update

```bash
# link mode: pull once, skills update in place
cd /path/to/V4SKILL && git pull

# copy mode: pull, then reinstall
cd /path/to/V4SKILL && git pull && ./install.sh --force
```

### Copy a single skill

```bash
cp -r /path/to/V4SKILL/creative/ai-text-detox ~/.hermes/skills/
```

### Per-skill dependencies

Most skills are Markdown-only and need nothing beyond Hermes Agent. Script-backed skills list their prerequisites in the skill body and fail with an install hint if something is missing. Common optional tools: `python3`, `uv`, `node`, `ffmpeg`, `poppler-utils` (`pdftoppm`), `gh`, `himalaya`, and `xurl`. The installer does **not** install system packages or global CLIs.

### Uninstall

```bash
rm -rf "${HERMES_HOME:-$HOME/.hermes}/skills/v4skill"
```

---

## Why This Repository

This is a **skills registry for Hermes Agent** — an AI agent framework that uses skills (Markdown files with YAML frontmatter) to extend the agent's capabilities. Each skill teaches Hermes **how to use a specific tool, API, or workflow**.

### What makes this collection useful:

- **73 skills across 12 categories** — from coding agents to PDF editing to Apple Reminders
- **Tag-based routing** — every skill has `tags:` in YAML frontmatter, enabling `skill-compass` to find the right skill by keyword
- **SEO-optimized** — skill descriptions include keywords people search for (coding agent, email automation, PDF editing, arXiv search, etc.)
- **Externally-sourced skills** — many skills are adapted from real open-source projects (Claude Code, OpenAI Codex, OpenCode, Himalaya CLI, xurl, Manim, p5.js, Google DESIGN.md, Karpathy's LLM Wiki, GSD spike workflow)
- **Cross-platform** — most skills work on Linux, macOS, and Windows
- **Terminal-first** — everything is command-line driven, no GUI needed

### Who this is for:

- **AI developers** building agentic workflows with Hermes Agent
- **Power users** who want AI agents to automate email, documents, research, and coding
- **Teams** standardizing on Hermes Agent for multi-skill orchestration
- **Contributors** who want to add new skills or improve existing ones

---

## Categories Overview

| Category | Count | Focus |
|----------|-------|-------|
| [AI Coding Agents & Delegation](docs/skills/ai-coding-agents.md) | 3 | Claude Code, OpenAI Codex, OpenCode CLI, agent delegation |
| [Desktop Automation](docs/skills/desktop-automation.md) | 2 | Background-first desktop GUI driving (cua-driver), DOM/CSS inspect (CDP) |
| [Creative & Media](docs/skills/creative-media.md) | 18 | Infographics, SVG diagrams, ASCII video, Manim, p5.js, GIF search, motion graphics, design director, UI/UX, component library, design tokens, design-system search (webmxerz) |
| [Apple Ecosystem](docs/skills/apple-ecosystem.md) | 4 | Notes, Reminders, Find My, iMessage |
| [Email & Messaging](docs/skills/email-messaging.md) | 2 | Terminal email (IMAP/SMTP), inbox triage |
| [Google Workspace & Cloud APIs](docs/skills/google-workspace-cloud.md) | 5 | Gmail/Calendar/Drive/Docs/Sheets, Box, Airtable, Notion, Maps |
| [Research & Knowledge](docs/skills/research-knowledge.md) | 4 | arXiv, grounded citations, wiki knowledge base, competitor news |
| [Social Media](docs/skills/social-media.md) | 1 | X/Twitter CLI (xurl) |
| [Software Development & QA](docs/skills/software-development-qa.md) | 12 | GitHub, code review, TDD, debugging, codebase inspection, dogfood QA, SDLC review |
| [Productivity & Documents](docs/skills/productivity-documents.md) | 10 | PDF, DOCX, XLSX, PPTX, meeting notes, weekly planning, price monitoring, doc→action items, Teams pipeline, Obsidian |
| [Web & Infrastructure](docs/skills/web-infrastructure.md) | 2 | Blocked page recovery (403/429/paywall), Flask webapp (Termux) |
| [Meta & Utilities](docs/skills/meta-utilities.md) | 10 | Skill-compass tag lookup, Hermes Agent orchestration, drytalk compression modes (7), swarm-brief investigator, skill authoring |

**Total: 73 skills**

---

## Skill Catalog

The detailed descriptions live in per-category pages so the main README stays fast:

- [AI Coding Agents & Delegation](docs/skills/ai-coding-agents.md) — 3 skills
- [Desktop Automation](docs/skills/desktop-automation.md) — 2 skills
- [Productivity & Documents](docs/skills/productivity-documents.md) — 10 skills
- [Email & Messaging](docs/skills/email-messaging.md) — 2 skills
- [Apple Ecosystem](docs/skills/apple-ecosystem.md) — 4 skills
- [Creative & Media](docs/skills/creative-media.md) — 18 skills
- [Google Workspace & Cloud APIs](docs/skills/google-workspace-cloud.md) — 5 skills
- [Research & Knowledge](docs/skills/research-knowledge.md) — 4 skills
- [Social Media](docs/skills/social-media.md) — 1 skills
- [Software Development & QA](docs/skills/software-development-qa.md) — 12 skills
- [Web & Infrastructure](docs/skills/web-infrastructure.md) — 2 skills
- [Meta & Utilities](docs/skills/meta-utilities.md) — 10 skills

**[Browse the full catalog index →](docs/SKILLS.md)**

---

## Skill Format & Conventions

Every skill in this repository follows the same format:

```yaml
---
name: skill-name
description: "One-line description of what this skill does."
version: X.Y.Z
author: Author Name
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [tag1, tag2, tag3]
    category: category-name
    related_skills: [skill-a, skill-b]
tags: ["tag1", "tag2", "tag3"]
---
# Skill Title

Markdown body with usage instructions, prerequisites, procedures, pitfalls, and verification steps.
```

**Key fields:**
- `name` — unique skill identifier (used by Hermes to load the skill)
- `description` — one-line summary (indexed by skill-compass)
- `tags` — searchable keywords (used by skill-compass for lookup)
- `category` — which category this skill belongs to
- `related_skills` — skills that complement or are alternatives to this one
- `homepage` — URL to the original source (for externally-sourced skills)
- `prerequisites.commands` — CLI tools required (e.g., `["himalaya"]`, `["xurl"]`)

---

## Using the Skill-Compass

The **skill-compass** is the entry point for the entire collection. Load it first:

```
Load the skill-compass skill.
```

Then ask by what you want to do:

- "I want to humanize text" → ai-text-detox
- "I need to search arXiv" → arxiv
- "I want to send an email" → term-mail-cli or email-inbox-triage
- "I need to debug Python" → python-debugpy
- "I want to create a presentation" → powerpoint
- "I need to draw an architecture diagram" → svg-arch-diagram

The compass lookup table maps **what you want to do** → **which skill to use** → **tags**.

---

## Search Keywords

If you're searching for this repository on GitHub, these are the keywords its descriptions contain:

**Coding & Development:** coding agent, Claude Code, OpenAI Codex, OpenCode, code delegation, PR review, refactoring, autonomous coding, pty, terminal automation, subagent, parallel agents, code review, pre-commit, security scan, quality gates, TDD, test-driven development, red-green-refactor, systematic debugging, root cause, 4-phase debugging, codebase inspection, LOC, pygount, dogfood QA, exploratory testing, conventional commits, simplify code, refactoring, debugging Node.js, debugging Python, pdb, debugpy, CDP, Chrome DevTools, DOM inspection, Electron, skill authoring, SKILL.md, frontmatter, GitHub, gh CLI, pull requests, issues, CI, git, code analysis, repository metrics.

**Documents & Productivity:** PDF, create, read, merge, fill, OCR, edit, text extraction, form filling, watermark, stamp, split, reportlab, pypdf, pdfplumber, pymupdf, marker, DOCX, Word, python-docx, template, revisions, comments, XLSX, Excel, CSV, openpyxl, spreadsheet, restructure, PowerPoint, PPTX, presentation, slides, python-pptx, document to action items, obligations, deadlines, tasks, extraction, OCR, meeting action items, decisions, owners, tickets, weekly review, planning, reset, commitment, product price monitor, price tracking, alert, shopping, travel.

**Email & Messaging:** email, IMAP, SMTP, CLI, send, receive, Himalaya, terminal email, inbox triage, prioritize, thread, draft reply, approval batch, urgent, disposition, inbox zero, Apple Notes, memo, macOS, Apple Reminders, remindctl, todo, tasks, Find My, AirTag, track, locate, device, location, iMessage, SMS, imsg, messaging.

**Creative & Media:** infographic, visual summary, chart, 可视化, 信息图, template, layout, style, data visualization, bento grid, Venn diagram, periodic table, flowchart, SVG, architecture diagram, cloud, infra, HTML, dark, visualization, infrastructure, system architecture, network topology, component diagram, design, HTML, prototype, UX, UI, creative, artifact, deck, motion, design-system, landing, web design, front-end, design tokens, DESIGN.md, Google, token spec, WCAG, accessibility, Tailwind, DTCG, validate, export, ASCII video, video to ASCII, colored ASCII, ASCII art, MP4, GIF, ffmpeg, terminal art, Manim, Manim CE, 3Blue1Brown, math animation, algorithmic video, animation, mathematical visualization, LaTeX, p5.js, generative art, creative coding, shaders, interactive, 3D, canvas, WebGL, visualization, animation, gen-art, GIF search, Tenor, curl, jq, motion graphics, animation, video, kinetic typography, gsap, framer-motion, lottie, threejs, webgl, glsl, manim, remotion, after-effects, explainer video, tiktok, reels, youtube shorts, data visualization, chart animation, animated infographic, product video, promo video, ad creative, launch video, testimonial, whiteboard animation, isometric animation, svg animation, page transitions, micro-interaction, glassmorphism, 60fps, accessible animation, ascii animation, map animation, vox-style, brand motion, creative brief, motion pricing, freelance motion, video delivery specs, particle system, shader, 3d animation, short-form video, caption animation, countdown, lower thirds, text message video, audiogram, diagram animation, presentation video, bar chart race, count-up, animated counter, motion design principles, 12 principles, easing, timing, shot composition, art direction, design director, critique, audit, polish, layout, typography, color, motion, accessibility, performance, responsive, design system, product truth, visitor mode, dual assessment, five dimension audit, 0-4 scoring, wcag, Paul Bakaus, Impeccable, Apache 2.0, 66k stars, frontend design, ui design, ux design.

**Google & Cloud:** Google Workspace, Gmail, Calendar, Drive, Docs, Sheets, Google API, OAuth, gws CLI, email, calendar, cloud storage, documents, spreadsheets, Google, productivity, G Suite, maps, geocode, POI, route, timezone, OSRM, OSM, OpenStreetMap, Nominatim, distance, directions, location, GPS, coordinates, mapping, geolocation, Box, cloud, file, share, search, metadata, content, collaboration, CLI, SDK, OAuth, webhooks, enterprise, storage, document management, Airtable, API, CRUD, record, filter, upsert, database, spreadsheet, productivity, no-code, Notion, API, page, database, markdown, workers, ntn, CLI, productivity, notes, workspace.

**Research & Knowledge:** arxiv, paper, search, academic, author, category, research, science, API, scholarly, literature search, wiki, Karpathy, LLM Wiki, knowledge base, interlinked markdown, compounding knowledge, RAG alternative, research, notes, Obsidian, schema, tag taxonomy, entity pages, concept pages, comparison pages, cross-reference, knowledge compilation, atomic memory, llm-wiki-compiler, grounded citations, citation, source, ground, verify, document, answer, research, web, reports, verifiable sources, citation formats, fact-checking, source attribution, academic citation, research integrity, competitor news, company, monitor, digest, cited, market research, competitive intelligence, company tracking, news monitoring, business intelligence.

**Social Media:** X, Twitter, post, search, DM, media, xurl, social media, official API, OAuth 2.0, PKCE, tweet, reply, quote, delete, like, repost, bookmark, follow, block, mute, DM, media upload, X API, Twitter API v2, social media automation, xdevplatform, openclaw.

**Apple Ecosystem:** Apple Notes, memo, macOS, notes, create, search, edit, note-taking, Apple Reminders, remindctl, macOS, todo, tasks, reminders, add, list, complete, task management, Apple ecosystem, Find My, Apple, AirTag, track, locate, device, location, lost device, iPhone, iPad, Mac, Apple Watch, macOS, iMessage, SMS, messaging, imsg, Apple, macOS, send, receive, text message, chat.

**Desktop & Automation:** computer use, desktop automation, background, cua-driver, GUI automation, click by element index, screenshot, AX tree, accessibility, cross-platform, macOS, Windows, Linux, Wayland, X11, foreground escalation, prompt injection safety, desktop, Electron, CDP, DOM, CSS, UI verification, self-inspection, inspector, Chrome DevTools Protocol, Hermes desktop, theme verification, widget inspection.

**Meta & Communication:** Hermes Agent, orchestration, configuration, theme, plugin, MCP, slash commands, multi-agent, CLI, setup, bot, gateway, spawning, agentic workflow, Nous Research, Termux, Linux, macOS, Windows, skill-compass, lookup, registry, skills, meta, index, routing, tool selection, skill lookup, tag-based routing, skill registry, skill index, skill catalog, drytalk, compress, ultra-short, mode, communication, terse, tokens, session, style, ultra compressed, minimal communication, token-efficient, brevity, commit-shorthand, conventional, git, terse, message, version control, Conventional Commits, commit message, compressed commit, memoshrink, memory, tokens, backup, shorten, markdown, memory compression, file compression, context compression, token savings, brevity-card, quick-ref, reference, modes, commands, card, quick reference, drytalk modes, drytalk commands, pr-shorthand, code, compressed, PR, diff, finding, one-line, severity, code review, compressed review, PR review, token-audit, token, usage, savings, estimate, session, overhead, token stats, compression savings, token usage tracking, swarm-brief, delegate, investigator, builder, reviewer, compressed, context, locate, edit, code location, context finding, subagent delegation, code investigation.

---

## Contributing

1. Read `hermes-agent-skill-authoring` for skill format conventions
2. Create a new skill folder under the appropriate category
3. Write `SKILL.md` with YAML frontmatter (name, description, version, author, license, platforms, metadata with tags/category/related_skills, tags array)
4. Add tags that people would search for
5. Test the skill with `skill-compass --refresh`
6. Submit a pull request to `V4TIME/V4SKILL`

---

*Repository: https://github.com/V4TIME/V4SKILL*
*Skills: 73 | Categories: 12 | Keywords: 400+*
