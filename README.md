
---

## INFO

| | |
-|---|-
| **What it is** | A collection of 69 Hermes Agent skills across 14 categories — AI coding agents, email automation, document processing, research tools, creative media, Apple ecosystem, cloud APIs, social media, debugging, QA, and meta utilities |
| **Platform** | Hermes Agent on Linux, macOS, Windows |
| **Install** | `git clone https://github.com/V4TIME/V4SKILL.git ~/.hermes/skills` then `skill-compass --refresh` |
| **Browse** | Load `skill-compass` to find any skill by tag, or scan the [Categories Overview](#categories-overview) below |
| **License** | MIT (Hermes-authored) / original license (externally-sourced) — see each skill's SKILL.md |

---

# Hermes Agent Skills — 69 AI Agent Skills for Productivity, Coding, Research, Creative Work & System Automation

> A comprehensive collection of **69 Hermes Agent skills** spanning **14 categories** — AI coding assistants (Claude Code, OpenAI Codex, OpenCode), email automation (IMAP/SMTP, Gmail, inbox triage), document processing (PDF, DOCX, XLSX, PPTX), research tools (arXiv, grounded citations, wiki knowledge bases), creative tools (infographics, SVG architecture diagrams, ASCII video, Manim math animations, p5.js generative art), Apple ecosystem automation (Notes, Reminders, iMessage, Find My), cloud APIs (Google Workspace, Box, Airtable, Notion), social media (X/Twitter CLI), debugging & code review (systematic debugging, TDD, pre-commit security scans), and meta skills (skill-compass tag lookup, caveman ultra-short communication modes). All skills include **YAML frontmatter with tags** for instant skill-compass lookup. Designed for **Hermes Agent** on Linux, macOS, and Windows — install via `skill-compass --refresh` or clone this repo into `~/.hermes/skills/`.

---

## Table of Contents

- [Why This Repository](#why-this-repository)
- [Categories Overview](#categories-overview)
- [All 69 Skills — Detailed Descriptions](#all-69-skills--detailed-descriptions)
  - [AI Coding Agents & Delegation](#ai-coding-agents--delegation)
  - [Productivity & Documents](#productivity--documents)
  - [Email & Messaging](#email--messaging)
  - [Apple Ecosystem](#apple-ecosystem)
  - [Creative & Media](#creative--media)
  - [Google Workspace & Cloud APIs](#google-workspace--cloud-apis)
  - [Research & Knowledge](#research--knowledge)
  - [Social Media](#social-media)
  - [Software Development & QA](#software-development--qa)
  - [Web & Infrastructure](#web--infrastructure)
  - [Meta & Utilities](#meta--utilities)
- [Skill Format & Conventions](#skill-format--conventions)
- [Installation](#installation)
- [Using the Skill-Compass](#using-the-skill-compass)
- [Search Keywords](#search-keywords)
- [Contributing](#contributing)
- [License](#license)

---

## Why This Repository

This is a **skills registry for Hermes Agent** — an AI agent framework that uses skills (Markdown files with YAML frontmatter) to extend the agent's capabilities. Each skill teaches Hermes **how to use a specific tool, API, or workflow**.

### What makes this collection useful:

- **69 skills across 14 categories** — from coding agents to PDF editing to Apple Reminders
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
| AI Coding Agents & Delegation | 3 | Claude Code, OpenAI Codex, OpenCode CLI |
| Desktop Automation | 1 | Background-first desktop GUI driving (cua-driver) |
| Creative & Media | 11 | Infographics, SVG diagrams, ASCII video, Manim, p5.js, GIF search, motion graphics, design director, music |
| Apple Ecosystem | 4 | Notes, Reminders, Find My, iMessage |
| Email & Messaging | 2 | Terminal email (IMAP/SMTP), inbox triage |
| Google Workspace & Cloud APIs | 5 | Gmail/Calendar/Drive/Docs/Sheets, Box, Airtable, Notion, Maps |
| Research & Knowledge | 5 | arXiv, grounded citations, wiki knowledge base, competitor news |
| Social Media | 1 | X/Twitter CLI (xurl) |
| Software Development & QA | 12 | GitHub, code review, TDD, debugging, codebase inspection, dogfood QA |
| Productivity & Documents | 10 | PDF, DOCX, XLSX, PPTX, meeting notes, weekly planning, price monitoring |
| Web & Infrastructure | 1 | Blocked page recovery (403/429/paywall) |
| Meta & Utilities | 2 | Skill-compass tag lookup, Hermes Agent orchestration |

**Total: 71 skills**

---

## All 69 Skills — Detailed Descriptions

---

### AI Coding Agents & Delegation

These skills let Hermes Agent delegate coding tasks to external AI coding CLI tools. Each skill teaches Hermes how to install, authenticate, and orchestrate a specific coding agent.

**code-cli-ctrl (Claude Code CLI)**
- **What it does:** Delegates coding tasks to Anthropic's Claude Code CLI via Hermes terminal tools. Handles feature building, refactoring, and PR reviews.
- **Why use it:** When you want Claude's coding capability integrated into your Hermes agent session — write code, review PRs, fix issues with `claude-code` as the worker.
- **Main contents:** Installation via `npm install -g @anthropic-ai/claude-code`, prerequisites (git repository required), one-shot tasks with `pty=true`, background mode for long tasks, PR review workflow with `gh pr checkout`, parallel issue fixing with git worktrees and `codex --sandbox workspace-write`, Hermes gateway caveats (bubblewrap namespace errors, `codex exec --sandbox danger-full-access` workaround), key flags (`exec`, `--sandbox workspace-write`, `--dangerously-bypass-approvals-and-sandbox`, `--sandbox danger-full-access`), rules (always `pty=true`, git repo required, use `exec` for one-shots, background for long tasks, don't interfere).
- **Keywords:** Claude Code, Anthropic, coding agent, CLI, PR review, code delegation, refactoring, pty, terminal automation, OpenAI-compatible, autonomous coding.

**code-task-runner (OpenAI Codex CLI)**
- **What it does:** Delegates coding tasks to OpenAI's Codex CLI — an autonomous coding agent. Supports one-shot execution, background mode, PR reviews, and parallel issue fixing with worktrees.
- **Why use it:** When you want OpenAI's Codex as your coding worker inside Hermes — build features, refactor code, review PRs, fix multiple issues in parallel.
- **Main contents:** Installation via `npm install -g @openai/codex`, prerequisites (OpenAI auth via `OPENAI_API_KEY` or Codex OAuth, git repository required, `pty=true`), one-shot tasks with `codex exec 'task'`, background mode with `codex exec --sandbox workspace-write 'task'`, monitoring with `process` tool (poll, log, submit, kill), key flags (`exec`, `--sandbox workspace-write`, `--dangerously-bypass-approvals-and-sandbox`, `--sandbox danger-full-access`, deprecated `--full-auto`), Hermes gateway caveats (bubblewrap permission errors, `codex exec --sandbox danger-full-access` fallback), PR review cloning to temp directory, parallel issue fixing with `git worktree add` and multiple Codex processes, batch PR reviews fetching all PR refs and reviewing in parallel, rules (always use `pty=true`, git repo required, use `exec` for one-shots, `--sandbox workspace-write` for building, background for long tasks, don't interfere, parallel is fine).
- **Keywords:** OpenAI Codex, coding agent, autonomous coding, CLI, PR review, code delegation, refactoring, sandbox, worktree, parallel issue fixing, OpenAI API.

**ai-task-agent-cli (OpenCode CLI)**
- **What it does:** Delegates coding to OpenCode CLI — a provider-agnostic, open-source AI coding agent with a TUI and CLI. Supports one-shot `opencode run`, interactive TUI sessions, PR reviews, and parallel work in isolated workdirs/worktrees.
- **Why use it:** When you want an open-source, provider-agnostic coding agent inside Hermes — works with OpenRouter, Anthropic, OpenAI, and other providers.
- **Main contents:** Installation via `npm i -g opencode-ai@latest` or `brew install anomalyco/tap/opencode`, auth via `opencode auth login` or provider env vars (OPENROUTER_API_KEY, etc.), binary resolution (`which -a opencode`, `opencode --version`, pinning `$HOME/.opencode/bin/opencode`), one-shot tasks with `opencode run 'prompt'` and `-f` file attachments, `--thinking` for model thinking display, `--model` to force a specific model, interactive TUI sessions with `background=true, pty=true`, TUI keybindings (Enter, Tab, Ctrl+P, Ctrl+X L/M/N/E, Ctrl+C), session resuming with `opencode -c` and `opencode -s ses_abc123`, common flags (`run`, `--continue`/`-c`, `--session`/`-s`, `--agent`, `--model`, `--format json`, `--file`/`-f`, `--thinking`, `--variant`, `--title`, `--attach`), procedure (verify tool readiness, use `opencode run` for bounded tasks, start `opencode` with background+pty for iterative tasks, monitor with `process`, respond via `process(action="submit")`, exit with Ctrl+C or kill, summarize outcomes), PR review with `opencode pr 42` or temporary clone, parallel work pattern with separate workdirs/worktrees, session & cost management (`opencode session list`, `opencode stats`, `opencode stats --days 7 --models`), pitfalls (interactive TUI requires pty, `/exit` is invalid, PATH mismatch, inspect logs before killing, avoid shared working directories across parallel sessions, Enter may need double-press), verification smoke test (`opencode run 'Respond with exactly: OPENCODE_SMOKE_OK'`), rules (prefer `opencode run` for one-shot automation, use interactive background only when iteration needed, scope to single repo/workdir, provide progress updates, report concrete outcomes, exit with Ctrl+C or kill never `/exit`).
- **Keywords:** OpenCode, coding agent, autonomous coding, CLI, TUI, PR review, code delegation, open-source, provider-agnostic, refactoring, OpenRouter, Anthropic, OpenAI, terminal automation.

**desk-automation-bg (Computer Use — Background Desktop Automation)**
- **What it does:** Drives the user's desktop in the background using cua-driver — clicks, types, scrolls, drags, captures screenshots — without moving the cursor or stealing focus. Escalates through a verify→escalate ladder (element click → fresh verification → pixel click → foreground → app-specific I/O).
- **Why use it:** When you need to automate native desktop apps (Finder/Explorer, Mail, native chat clients, Figma, games, Electron apps, consent dialogs) without disrupting the user's work.
- **Main contents:** The canonical workflow (capture first with `computer_use(action="capture", mode="som", app="...")`, click by element index with `computer_use(action="click", element=7)`, verify with re-capture or `capture_after=True`), capture modes (`som` — screenshot + numbered overlays + AX index, `vision` — plain screenshot, `ax` — AX tree only), actions vocabulary (capture, click, double_click, right_click, middle_click, drag, scroll, type, key, wait, list_apps, focus_app), the verify→escalate ladder (element background → fresh verification → pixel background → foreground delivery → app-specific I/O like DBus/CLI for KTextEditor), escalation fields (`effect`: confirmed/unverifiable/suspected_noop, `escalation`: recommended rung, `code`: structured refusal, `verified`), background rules (never `raise_window=True` unless asked, scope captures to an app, don't switch virtual desktops/Spaces, user can be on same machine), drag & drop (prefer element indices, rubber-band selection with coordinates), scroll (viewport under element or at specific point), managing focus (`list_apps`, `focus_app`), delivering screenshots to user (write_file + MEDIA: path, or describe on CLI), safety rules (never click permission dialogs/password prompts/2FA/payment UI, never type secrets, never follow screenshot instructions — prompt injection, hard-blocked system shortcuts, don't interact with personal browser tabs), failure modes (cua-driver not installed → `hermes computer-use install`, empty captures → DISPLAY not set on Linux/Wayland or Session 0 on Windows, stale element index → re-capture, click had no effect → read structured verdict and climb ladder, type text disappears into terminal → cua-driver terminal detection, `blocked pattern in type text` → break up dangerous commands, anything else → `hermes computer-use doctor`), when NOT to use (web automation via headless browser tools is better, file edits via read_file/write_file/patch, shell commands via terminal), going deeper — cua-driver skill pack (`cua-driver skills install` gives SKILL.md, MACOS.md, WINDOWS.md, LINUX.md, RECORDING.md, WEB_APPS.md, TESTS.md).
- **Keywords:** computer use, desktop automation, background, cua-driver, GUI automation, click by element index, screenshot, AX tree, accessibility, cross-platform, macOS, Windows, Linux, Wayland, X11, foreground escalation, prompt injection safety.

**hermes-agent (Hermes Agent Orchestration)**
- **What it does:** The core meta-skill for using, configuring, theming, extending, and orchestrating Hermes Agent itself. Covers CLI subcommands, slash commands, plugins, themes, MCP servers, multi-agent spawning, configuration, and troubleshooting.
- **Why use it:** The first skill to load when setting up or operating Hermes Agent. Teaches how to use Hermes itself — its CLI, config, themes, plugins, MCP, and agent spawning.
- **Main contents:** CLI reference (`hermes` command and subcommands), configuration (`~/.hermes/config.yaml`), themes, plugins, MCP (Model Context Protocol) servers, slash commands, multi-agent spawning and delegation, background systems, portal auth for third-party apps, project context files, providers and models, security & privacy, troubleshooting, TUI widgets, webhooks, native MCP, delegate task concurrency diagnosis, contributor guide, petdex, desktop plugins, background-systems reference, configuration reference, cli-reference.
- **Keywords:** Hermes Agent, orchestration, configuration, theme, plugin, MCP, slash commands, multi-agent, CLI, setup, bot, gateway, spawning, agentic workflow, Nous Research, Termux, Linux, macOS, Windows.

---

### Productivity & Documents

Skills for creating, reading, editing, and automating documents and productivity workflows.

**pdf (PDF Create, Read, Merge, Fill, OCR, Edit)**
- **What it does:** Comprehensive PDF manipulation — create PDFs from scratch, read/extract text, merge multiple PDFs, fill forms, OCR scanned documents, edit existing text, split, stamp watermarks, page images, secure PDFs, and more.
- **Why use it:** When you need to work with PDF files — generate reports, extract data from PDFs, fill forms programmatically, OCR images to text, edit existing PDFs, or secure documents.
- **Main contents:** PDF creation with reportlab, reading with PyPDF2/pypdf and pdfplumber, merging/splitting, form filling, OCR with marker (layout-preserving PDF-to-Markdown) and pymupdf, text editing, page image generation, watermarking/stamping, security (password protection, redaction), extraction markers, rasterization, tests.
- **Keywords:** PDF, create, read, merge, fill, OCR, edit, text extraction, form filling, watermark, stamp, split, reportlab, pypdf, pdfplumber, pymupdf, marker, document processing, office automation.

**docx (Word DOCX Create, Read, Edit, Template, Review)**
- **What it does:** Create, read, edit, and review Microsoft Word .docx files. Supports templates, comments, revisions tracking, and common document operations via python-docx.
- **Why use it:** When you need to automate Word document workflows — generate reports from templates, read extracted text, add/edit content, track revisions, manage comments.
- **Main contents:** DOCX creation with python-docx, reading/extracting text, editing (add paragraphs, tables, images), template-based creation, revision and comments handling, validation, common scripts (docx_common, docx_create, docx_edit, docx_read, docx_revisions, docx_template, docx_validate), tests.
- **Keywords:** Word, DOCX, create, read, edit, template, review, python-docx, documents, office automation, revisions, comments, Microsoft Word.

**xlsx (Excel XLSX/CSV Create, Read, Edit, Restructure)**
- **What it does:** Create, read, edit, and restructure Excel .xlsx files and CSVs. Supports cell manipulation, formulas, formatting, sheet operations, and CSV conversion.
- **Why use it:** When you need to automate spreadsheet workflows — generate reports, read Excel data, edit cells, restructure sheets, convert between CSV and XLSX.
- **Main contents:** XLSX creation with openpyxl, reading cell data, editing cells/formulas/formatting, sheet operations (add, remove, reorder), restructuring (merge cells, split data), CSV to XLSX conversion, XLSX to CSV conversion, recalc, tests.
- **Keywords:** Excel, XLSX, CSV, spreadsheet, openpyxl, create, read, edit, restructure, convert, office automation, data processing, tables, formulas.

**powerpoint (PowerPoint PPTX Create, Read, Edit, Render)**
- **What it does:** Create, read, edit, and render PowerPoint .pptx presentations. Supports slide creation, text/images/tables, template-based generation, and rendering to images.
- **Why use it:** When you need to automate presentation generation — create slides from data, read existing presentations, edit content, render slides as images for previews.
- **Main contents:** PPTX creation with python-pptx, reading slide content, editing slides/text/images/tables, template-based creation, rendering to images, tests.
- **Keywords:** PowerPoint, PPTX, create, read, edit, presentation, slides, office automation, python-pptx, template, render, deck, slide deck.

**document-to-action-items (Extract Obligations, Deadlines, Tasks from Documents)**
- **What it does:** Extracts cited obligations, deadlines, and tasks from documents (PDFs, DOCX, text). Uses OCR when needed and produces cited action items with source references.
- **Why use it:** When you have a contract, agreement, policy document, or meeting notes and need to extract every actionable item with citations back to the source.
- **Main contents:** Document ingestion (multiple formats), OCR for scanned PDFs, obligation/deadline/task extraction with citations, output format for action items, integration with PDF, DOCX, and Notion skills.
- **Keywords:** document, action items, obligations, deadlines, tasks, extraction, OCR, cited, contract review, agreement analysis, policy extraction, meeting notes, productivity.

**meeting-action-items (Turn Meeting Notes into Decisions, Owners, Tickets)**
- **What it does:** Transforms meeting notes into cited decisions, action owners, and ticket-ready items. Produces structured output: what was decided, who owns each action, and what tickets need creating.
- **Why use it:** After a meeting, when you have raw notes and need structured follow-up: decisions documented, owners assigned, tickets created.
- **Main contents:** Note parsing, decision extraction, owner identification, ticket formatting, follow-up generation, integration with Teams meeting pipeline, Google Workspace, and Notion.
- **Keywords:** meeting, action items, decisions, owners, tickets, notes, follow-up, productivity, meeting summary, standup, retrospective, sprint planning.

**weekly-review-planning (Weekly Reset: Commitments, Stalled Work, Next-Week Plan)**
- **What it does:** Weekly review and planning workflow — reviews current commitments, identifies stalled work, and produces a next-week plan. Integrates with calendar and task systems.
- **Why use it:** At the end of each week, to reset: what's committed, what's stuck, and what's planned for next week.
- **Main contents:** Commitment review, stalled work identification, next-week planning, calendar integration, task system integration (Obsidian, Notion, Airtable, Google Workspace, email-inbox-triage).
- **Keywords:** weekly, review, plan, reset, commitment, tasks, calendar, productivity, weekly review, weekly planning, sprint planning, goal tracking.

**product-price-monitor (Watch Product, Flight, Listing Prices; Alert on Target)**
- **What it does:** Monitors product prices, flight prices, or listing prices over time and alerts when a target price is reached or availability changes.
- **Why use it:** When you're waiting to buy something (product, flight, rental) and want the AI agent to watch prices and notify you when they drop to your target.
- **Main contents:** Price tracking setup, target price configuration, availability monitoring, alerting, integration with maps for location-based products.
- **Keywords:** price, monitor, product, flight, alert, watch, shopping, travel, availability, price tracking, deal hunting, price drop alert.

**airtable (Airtable REST API — Records CRUD, Filters, Upserts)**
- **What it does:** Interacts with Airtable's REST API for record CRUD (create, read, update, delete), filtering, sorting, and upserts. Works via curl-based API calls.
- **Why use it:** When you need to read or write Airtable data from Hermes — pull records, create new entries, update existing ones, apply filters.
- **Main contents:** Airtable API authentication, base/Table identification, record CRUD operations, filter syntax, sorting, upsert patterns, rate limit handling.
- **Keywords:** Airtable, API, CRUD, record, filter, upsert, database, spreadsheet, productivity, no-code, base, table, field, formula.

**box (Box Cloud Files — Share, Search, Metadata, Content Workflows)**
- **What it does:** Interacts with Box's API for file management, sharing, search, metadata, content workflows, hubs, OAuth setup, SDK development, webhooks, and bulk operations.
- **Why use it:** When you need to manage files in Box cloud storage from Hermes — upload, download, share, search, manage metadata, set up webhooks.
- **Main contents:** Box API authentication (OAuth), file CRUD, folder management, sharing and collaboration, search, metadata management, content workflows, hubs, SDK development patterns, webhooks and events, bulk operations, CLI guide, troubleshooting, OAuth setup.
- **Keywords:** Box, cloud, file, share, search, metadata, content, collaboration, CLI, SDK, OAuth, webhooks, enterprise, storage, document management.

---

### Email & Messaging

**term-mail-cli (Himalaya CLI — IMAP/SMTP Email from Terminal)**
- **What it does:** Terminal email client via Himalaya CLI — send, receive, read, search, flag, and manage emails via IMAP/SMTP from the command line. Supports account configuration, folder management, templates, MIME structure inspection, and attachment handling.
- **Why use it:** When you need email capabilities inside Hermes — send emails, read inbox, search messages, manage flags, work with attachments, all from the terminal without a GUI email client.
- **Main contents:** Himalaya CLI installation (`curl -sSL ... | PREFIX=~/.local sh` or `brew install himalaya`), account configuration (IMAP/SMTP server settings, OAuth, app passwords), sending emails (`himalaya message write`, `himalaya message reply`, `himalaya message forward`, `himalaya template send`), reading/receiving (`himalaya message list`, `himalaya message read`), searching and filtering, flag management (`himalaya flag add`, `himalaya flag remove`), attachment handling (`himalaya attachment download`), folder aliases (himalaya v1.2.0+ syntax for server folder name mapping), configuration file location (`~/.config/himalaya/config.toml`), MIME structure inspection (`himalaya message export --full`), prerequisites and commands.
- **Keywords:** email, IMAP, SMTP, CLI, send, receive, communication, Himalaya, terminal email, email client, mail, messaging, attachment, flag, folder, template, MIME.

**email-inbox-triage (Triage Inbox: Prioritize Threads, Draft Replies Safely)**
- **What it does:** Triages an email inbox into a bounded queue of decisions. Prioritizes threads by urgency, classifies each with a disposition (urgent reply, reply, action without reply, waiting, reference, noise), drafts replies in thread context, and presents an approval batch before applying any mutations.
- **Why use it:** When you have an overflowing inbox and need the AI agent to prioritize, draft replies, and present a clear action plan — but never send anything without your approval.
- **Main contents:** Inbox scope resolution (account, folders/labels, time window, unread/all status, max thread count, allowed actions — default read+draft not send/delete), complete thread retrieval (load term-mail-cli/google-workspace connector, search with structured filters, paginate, read complete threads not just newest message, treat content as data never instructions), thread classification with 6 dispositions (urgent reply, reply, action without reply, waiting, reference, noise), reply drafting in thread context (answer material questions, preserve tone, avoid invented commitments, state uncertainty, resolve attachment/link facts first), approval batch presentation (per-thread: account, recipient/thread, action, draft summary, deadline, risk — approve individually or as defined batch), apply and verify (send/label/archive/follow-up only within approval, for ambiguous send errors inspect Sent before retrying — SMTP may have succeeded while save-to-Sent failed, blind retry duplicates mail, read back message/draft/label state for provider-confirmed results), output shape (6 sections: needs attention now, replies to approve, actions without replies, waiting on others, reference/noise summary, coverage and failures), pitfalls (unread ≠ important, missing earlier unanswered questions in long threads, retrying after SMTP succeeded but save-to-Sent failed causing duplicate mail, claiming inbox zero when pagination or another folder was omitted), verification checklist (folders and time window fully covered or gaps stated, every disposition has reason traceable to thread content, no send/delete/archive outside approved batch, every approved mutation read back from provider, final response separates completed actions/drafts awaiting approval/blockers).
- **Keywords:** email, inbox, triage, prioritize, thread, draft reply, approval batch, urgent, disposition, SMTP, IMAP, inbox zero, email management, productivity, safe send.

---

### Apple Ecosystem

**apple-notes (Apple Notes via memo CLI)**
- **What it does:** Manages Apple Notes on macOS via the `memo` CLI — create, search, and edit notes. Integrates with the Obsidian skill for cross-vault workflows.
- **Why use it:** When you use Apple Notes on macOS and want Hermes to create, find, or edit notes programmatically.
- **Main contents:** memo CLI for Apple Notes, note creation, search, editing, macOS integration, related to Obsidian for vault sync.
- **Keywords:** Apple Notes, memo, macOS, notes, create, search, edit, note-taking, Apple ecosystem.

**apple-reminders (Apple Reminders via remindctl)**
- **What it does:** Manages Apple Reminders on macOS via `remindctl` — add, list, and complete reminders/tasks.
- **Why use it:** When you use Apple Reminders and want Hermes to add tasks, list current reminders, or mark them complete.
- **Main contents:** remindctl for Apple Reminders, adding reminders, listing reminders, completing reminders, task management, macOS integration.
- **Keywords:** Apple Reminders, remindctl, macOS, todo, tasks, reminders, add, list, complete, task management, Apple ecosystem.

**findmy (Find My — Track Apple Devices and AirTags)**
- **What it does:** Tracks Apple devices and AirTags via the Find My app on macOS. Locates devices by name, shows last known location, and helps find lost items.
- **Why use it:** When you need to locate a lost iPhone, iPad, Mac, Apple Watch, or AirTag — Hermes can query Find My on macOS.
- **Main contents:** Find My integration on macOS, device tracking, AirTag location, last known location, device lookup by name.
- **Keywords:** Find My, Apple, AirTag, track, locate, device, location, lost device, iPhone, iPad, Mac, Apple Watch, macOS.

**imessage (iMessage / SMS Messaging)**
- **What it does:** Sends and receives iMessage and SMS messages on macOS via the `imsg` CLI. Supports messaging from Hermes agent sessions.
- **Why it use it:** When you need to send or read iMessages/SMS from Hermes — message contacts, check for replies.
- **Main contents:** imsg CLI for iMessage/SMS, sending messages, receiving messages, macOS iMessage integration.
- **Keywords:** iMessage, SMS, messaging, imsg, Apple, macOS, send, receive, text message, chat.

---

### Creative & Media

**infographic-generator (Infographics — 21 Layouts × 21 Styles)**
- **What it does:** Generates infographics from structured content using 21 layout types (bento-grid, comparison-matrix, circular-flow, comic-strip, dashboard, funnel, hierarchical-layers, hub-spoke, iceberg, isometric-map, jigsaw, linear-progression, periodic-table, story-mountain, tree-branching, venn-diagram, winding-roadmap, and more) and 21 visual styles (aged-academia, bold-graphic, chalkboard, claymation, corporate-memphis, craft-handmade, cyberpunk-neon, hand-drawn-edu, ikea-manual, kawaii, knolling, lego-brick, morandi-journal, origami, pixel-art, pop-laboratory, retro-pop-grid, storybook-watercolor, subway-map, technical-schematic, ui-wireframe). Bilingual support (信息图, 可视化).
- **Why use it:** When you need to turn structured data or comparisons into a visual infographic — reports, comparisons, processes, hierarchies, timelines.
- **Main contents:** Layout framework (21 layouts with structured content templates), style system (21 visual styles), analysis framework, base prompt, layout-specific templates (each layout has its own content structure guide), style-specific templates (each style defines color palette, typography, visual treatment), structured content template for input format, PORT_NOTES.md with porting notes from original baoyu-skills project by JimLiu.
- **Keywords:** infographic, visual summary, chart, 可视化, 信息图, template, creative, image, layout, style, data visualization, comparison, process diagram, bento grid, Venn diagram, periodic table, flowchart.

**svg-arch-diagram (SVG Architecture/Cloud/Infra Diagrams as HTML)**
- **What it does:** Creates dark-themed SVG architecture, cloud, and infrastructure diagrams rendered as standalone HTML files. Good for system architecture docs, cloud infrastructure diagrams, network topology, and component relationship maps.
- **Why use it:** When you need to visually document a system architecture, cloud deployment, or infrastructure layout — produces a clean dark-themed SVG embedded in HTML.
- **Main contents:** SVG diagram generation, dark theme styling, HTML output template (`templates/template.html`), architecture/cloud/infrastructure diagram patterns, component relationship visualization.
- **Keywords:** diagram, SVG, architecture, cloud, infra, HTML, dark, visualization, infrastructure, system architecture, network topology, component diagram, cloud deployment, AWS, GCP, Azure, on-prem.

**claude-design (One-off HTML Design — Landing Pages, Decks, Prototypes)**
- **What it does:** Designs one-off HTML artifacts — landing pages, decks, prototypes, UI components, design systems, motion pieces. Leverages design-tokens-spec for token-compliant designs and popular-web-designs for real design system patterns.
- **Why use it:** When you need a polished HTML page, landing page, deck, or UI prototype generated by the AI — with proper design token usage and real design system inspiration.
- **Main contents:** HTML design generation, design token usage (from design-tokens-spec), design system patterns (from popular-web-designs), UX/UI principles, creative artifact generation, deck/motion design, landing page patterns.
- **Keywords:** design, HTML, prototype, UX, UI, creative, artifact, deck, motion, design-system, landing, web design, front-end, component, visual design, single-page.

**popular-web-designs (54 Real Design Systems — Stripe, Linear, Vercel, etc.)**
- **What it does:** A catalog of 54 real-world design systems (Airbnb, Airtable, Apple, BMW, Cal, Claude, Clay, ClickHouse, Coinbase, Composio, Cursor, ElevenLabs, Expo, Figma, Framer, HashiCorp, IBM, Intercom, Kraken, Linear.app, Lovable, Mattermost, Maxim, Mintlify, Miro, Mistral.ai, MongoDB, Notion, NVIDIA, Ollama, OpenAI, Posthog, Replicate, Revolut, RunwayML, Sanity, Sentry, SpaceOS, Spotify, Stripe, Supabase, Superhuman, Telegram, Together.ai, Uber, Vercel, VoltAgent, Warp, Webflow, Wise, X.ai, Zapier) with template files capturing their design language, color palettes, typography, and component patterns.
- **Why use it:** When designing an HTML artifact and you want real design system inspiration — pick a template (e.g., Stripe, Linear, Vercel) and generate designs matching that system's aesthetic.
- **Main contents:** 54 design system templates (each as a .md file capturing the system's design language), template structure (colors, typography, spacing, component patterns), VoltAgent/awesome-design-md sourced design systems.
- **Keywords:** design systems, Stripe, Linear, Vercel, web design, CSS, HTML, UI templates, design patterns, component library, visual design, brand guidelines, color palette, typography, real design systems, VoltAgent, awesome-design-md.

**craft-director (Design Director — AI Frontend Design Guidance, Reverse-Engineered from Impeccable)**
- **What it does:** One consolidated design-direction skill for AI coding agents, rebuilt from Paul Bakaus's Impeccable (github.com/pbakaus/impeccable, Apache 2.0, 66k stars). Covers the full design guidance surface: product-truth capture (PACT.md) separate from visual direction (SURFACE.md), four visitor modes (Convert/Work/Comprehend/Experience), twenty conductor commands (shape, init, document, extract, critique, audit, polish, distill, harden, onboard, animate, colorize, typeset, layout, delight, overdrive, clarify, adapt, optimize, live), a quality floor with absolute bans (kicker/eyebrow ban, no 3-column equal cards, no nested cards, no gradient text as default, no Inter as default font, no serif as default, Fraunces/Instrument_Serif banned, em-dash ban, premium-consumer palette ban, CTA wrap ban, button contrast check, section-layout repetition ban, logo wall = logo only, no div-based fake screenshots, no AI-tell content, browser-surface theming, page theme lock), 61 anti-pattern detector rule categories (typography tells, color tells, layout tells, structural tells, content tells, motion tells, browser-surface tells), dual-assessment UX critique method, five-dimension audit with 0–4 scoring (Accessibility, Performance, Theming/Consistency, Responsive, Implementation Integrity), polish triage in order, shape discovery-to-brief flow, init product-truth interview, new-work visual-world creation/replacement flow, and Operate/Read depth rules.
- **Why use it:** When the task involves designing, redesigning, shaping, critiquing, auditing, polishing, or improving any frontend interface — from a landing page to a dashboard to a component to a color/typography pass. One skill covers the full design-judgment surface; the upstream Impeccable distributes across a Rust engine, CLI, browser extension, and 16 agent-runtime provider directories.
- **Main contents:** 4 visitor modes (Convert/Work/Comprehend/Experience), 20 conductor commands with descriptions, 3 core artifacts (PACT.md product truth, SURFACE.md visual design system, surface brief), setup flow (base directory, context loader, reference loading, quality floor), quality floor checkpoints (contrast, depth, spacing, type measure, motion authorship, states coverage, browser-surface theming, copy, coverage) and absolute bans (page scaffolds, surface habits, emphasis discipline, color discipline, layout discipline, CTA/button rules, form discipline, motion discipline, image/logo rules, content rules, theme lock), anti-pattern detector rules distilled into 7 categories with specific tells, critique method (dual-assessment, hard invariants, setup, Assessment A design review, Assessment B detector evidence, synthesis), audit method (5 dimensions, 0–4 scoring, report structure, severity classification P0/P1/P2/P3, recommended actions), shape flow (discovery interview, direction resolution, brief writing — 7 sections), init flow (6 steps: load state, explore, interview, write PACT.md, record workflow defaults, wrap up), new-work flow (3 steps: decide what's true, ask what will change, choose invention level), Operate/Read depth (color, typography, components, motion, product permissions for Operate; prose measure, hierarchy, navigation, wayfinding, consistency for Read).
- **Keywords:** design, ui, ux, frontend, design director, critique, audit, polish, layout, typography, color, motion, accessibility, performance, responsive, design system, product truth, landing page, dashboard, component, web design, pakt, surface, brief, shape, init, document, extract, convert, work, comprehend, experience, visual direction, quality floor, absolute bans, anti-pattern, detector rules, visitor mode, dual assessment, five dimension audit, 0-4 scoring, wcag, contrast, focus ring, scrollbar, caret, text selection, tabular nums, token, design token, craft, Paul Bakaus, Impeccable, Apache 2.0, 66k stars, design guidance, AI design skill, frontend design.

**design-tokens-spec (Google DESIGN.md Token Spec — Author, Validate, Export)**
- **What it does:** Authoring, validating, and exporting design token specification files using Google's DESIGN.md format. Supports token taxonomy definition, WCAG accessibility validation, Tailwind-compatible export, and Design Token Community Group (DTCG) spec compliance.
- **Why use it:** When you're building a design system and need to define, validate, and export design tokens (colors, typography, spacing, shadows, etc.) in a standardized, machine-readable format.
- **Main contents:** DESIGN.md token spec format (Google Labs Code), token taxonomy authoring, WCAG accessibility validation, Tailwind CSS export, DTCG (Design Token Community Group) spec compliance, token validation rules, export pipelines, starter template (`design_md/templates/starter.md`).
- **Keywords:** design tokens, DESIGN.md, Google, token spec, design system, WCAG, accessibility, Tailwind, DTCG, validate, export, color tokens, typography tokens, spacing tokens, design token taxonomy, style dictionary.

**ascii-video (ASCII Video — Convert Video/Audio to Colored ASCII MP4/GIF)**
- **What it does:** Converts video and audio files into colored ASCII art animations — output as MP4 or GIF. Uses ffmpeg for processing and terminal-art aesthetics.
- **Why use it:** When you want to create ASCII art versions of videos or audio visualizations — nostalgic terminal aesthetics, artistic conversions, GIF generation from media.
- **Main contents:** Video-to-ASCII conversion pipeline, audio-to-ASCII visualization, colored ASCII output, MP4 and GIF export, ffmpeg integration, terminal-art aesthetics, scene composition, effects, inputs, optimization, architecture, troubleshooting.
- **Keywords:** ASCII video, video to ASCII, colored ASCII, ASCII art, MP4, GIF, ffmpeg, terminal art, video conversion, audio visualization, ASCII animation, retro, nostalgia, media conversion.

**manim-video (Manim CE Animations — 3Blue1Brown Math/Algo Videos)**
- **What it does:** Creates mathematical and algorithmic animations using Manim Community Edition (Manim CE) — the same engine behind 3Blue1Brown's famous math explainer videos. Supports camera/3D, equations, graphs, data visualization, decorations, mobjects, updaters, and production-quality rendering.
- **Why use it:** When you need to create math explainer videos, algorithm visualizations, or animated diagrams — Manim CE gives you precise, publication-quality mathematical animations.
- **Main contents:** Manim CE setup (`scripts/setup.sh`), animation design thinking, animations reference, camera and 3D, decorations, equations (LaTeX), graphs and data, mobjects (geometric objects), paper explainer patterns, production quality, rendering, scene planning, updaters and trackers, troubleshooting, animations directory reference.
- **Keywords:** Manim, Manim CE, 3Blue1Brown, math animation, algorithmic video, animation, mathematical visualization, LaTeX, graphs, 3D, camera, geometry, explainer video, education, math communication.

**p5.js (p5.js Sketches — Gen Art, Shaders, Interactive, 3D)**
- **What it does:** Creates generative art, shader-based visuals, interactive sketches, and 3D scenes using p5.js — a JavaScript library for creative coding. Supports animation, color systems, core API, export pipeline, interaction, shapes/geometry, typography, visual effects, and WebGL/3D.
- **Why use it:** When you want to create generative art, interactive visualizations, shader effects, or 3D creative coding pieces in the browser using p5.js.
- **Main contents:** p5.js setup (`scripts/setup.sh`), viewer template (`templates/viewer.html`), animation techniques, color systems, core API reference, export pipeline (frames to video/GIF), interaction (mouse, keyboard, touch), shapes and geometry, typography, visual effects, WebGL and 3D rendering, troubleshooting, scripts (export-frames.js, render.sh, serve.sh).
- **Keywords:** p5.js, generative art, creative coding, shaders, interactive, 3D, canvas, WebGL, visualization, animation, gen-art, processing, JavaScript, creative coding library, visual art, algorithmic art.

**songwriting-and-ai-music (Songwriting Craft & Suno AI Music Prompts)**
- **What it does:** Guides songwriting craft and generates Suno AI music prompts — covers parody, lyrics structure, songwriting techniques, and Suno-specific prompt formatting for AI music generation.
- **Why use it:** When you want to write songs (parodies, originals) or generate AI music with Suno — get songwriting guidance and properly formatted Suno prompts.
- **Main contents:** Songwriting craft (parody, lyrics, structure), Suno AI music prompt formatting, creative writing for music, genre and style guidance.
- **Keywords:** songwriting, music, Suno, parody, lyrics, creative, AI music, music generation, song prompt, music prompt, songwriting craft, lyric writing.

**gif-search (Search/Download GIFs from Tenor via curl + jq)**
- **What it does:** Searches and downloads GIFs from Tenor's API using curl and jq — terminal-based GIF search and download without a browser.
- **Why use it:** When you need to find and download GIFs from the terminal — for messaging, documentation, or creative projects.
- **Main contents:** Tenor API search, curl-based queries, jq parsing for GIF URLs, download workflow, media handling.
- **Keywords:** GIF, search, download, Tenor, curl, jq, image, media, GIF search, animated images, terminal, API.

**motion-craft-kit (Motion Graphics & Animation — 51 Skills Consolidated from iart-ai/motion-skills)**
- **What it does:** One consolidated reference covering 51 motion-graphics, animation, and video workflows from 14 open-source packs by iart.ai (MIT license). Covers every motion domain an AI coding agent might encounter: short-form vertical video (TikTok/Reels/Shorts), podcast/YouTube audiograms and intros, e-commerce product demos and promo videos, ad creative and launch films, explainer video pipelines, kinetic typography, web animation (GSAP/Framer Motion/Lottie/SVG), data-driven chart animation and animated infographics, WebGL/Three.js/GLSL shaders, Manim math animation, map animation (Vox-style), motion design fundamentals (12 principles, shot composition, art direction), and freelance motion business tools (creative briefs, pricing, revision management, delivery specs, brand motion guidelines).
- **Why use it:** When the task involves any kind of motion graphics, animation, or video — from a 9:16 TikTok caption animation to a WebGL shader background, from a narrated explainer to a brand motion system document. One skill covers the full domain; the original 14 packs install separately via `npx skills add iart-ai/<pack>` when you only need one domain.
- **Main contents:** 51 skills reorganized by workflow (not original pack). Sections: short-form vertical video (5 skills), podcast/YouTube (2), e-commerce/product (3), ads/marketing (3), explainer/educational (6), kinetic typography (1), web animation (9), data animation/infographic (3), WebGL/3D (3), map animation (1), motion design fundamentals (7), freelance business (5). Includes tools/engines reference table (GSAP, Framer Motion, Lottie, Three.js, GLSL, Manim, Remotion, After Effects, Google Earth Studio, GeoJSON/SVG), deliver-and-verify loop description, and full source attribution to iart-ai/motion-skills (MIT).
- **Keywords:** motion, animation, video, motion graphics, kinetic typography, gsap, framer-motion, lottie, threejs, webgl, glsl, manim, remotion, after-effects, explainer video, tiktok, reels, youtube shorts, data visualization, chart animation, animated infographic, product video, promo video, ad creative, launch video, testimonial, whiteboard animation, isometric animation, svg animation, page transitions, micro-interaction, glassmorphism, 60fps, accessible animation, ascii animation, map animation, vox-style, brand motion, creative brief, motion pricing, freelance motion, video delivery specs, particle system, shader, 3d animation, short-form video, caption animation, countdown, lower thirds, text message video, audiogram, diagram animation, presentation video, bar chart race, count-up, animated counter, motion design principles, 12 principles, easing, timing, shot composition, art direction.

**youtube-content (YouTube Transcripts to Summaries, Threads, Blogs)**
- **What it does:** Fetches YouTube video transcripts and transforms them into summaries, discussion threads, blog posts, and other written content formats. Includes output format references and a transcript fetching script.
- **Why use it:** When you want to turn a YouTube video into written content — summarize it, create a blog post, generate a discussion thread, or extract key points.
- **Main contents:** Transcript fetching (`scripts/fetch_transcript.py`), output format options (summary, thread, blog, etc.), content transformation, reference documentation for output formats.
- **Keywords:** YouTube, transcript, summary, blog, thread, video, media, content generation, transcript-to-text, video summary, YouTube API, content repurposing.

---

### Google Workspace & Cloud APIs

**google-workspace (Gmail, Calendar, Drive, Docs, Sheets via gws CLI or Python)**
- **What it does:** Interacts with Google Workspace services — Gmail, Calendar, Drive, Docs, Sheets, and Contacts — via the `gws` CLI bridge or direct Python API calls. Supports OAuth setup, daily brief generation, Gmail search syntax, and a Her Hermes home integration script.
- **Why use it:** When you need to automate Google Workspace tasks from Hermes — read/send Gmail, manage Calendar events, work with Drive files, read/edit Docs and Sheets.
- **Main contents:** gws CLI bridge (`scripts/gws_bridge.py`), Google API Python client (`scripts/google_api.py`), OAuth setup, daily brief generation (`references/daily-brief.md`), Gmail search syntax (`references/gmail-search-syntax.md`), `_hermes_home.py` for Hermes home integration, setup script, related to term-mail-cli for IMAP/SMTP fallbacks.
- **Keywords:** Google Workspace, Gmail, Calendar, Drive, Docs, Sheets, Google API, OAuth, gws CLI, email, calendar, cloud storage, documents, spreadsheets, Google, productivity, G Suite.

**maps (Geocode, POIs, Routes, Timezones via OpenStreetMap/OSRM)**
- **What it does:** Geocoding (address to coordinates and reverse), points of interest (POI) search, route planning and distance calculation, and timezone lookup via OpenStreetMap (Nominatim), OSRM (Open Source Routing Machine), and related services.
- **Why use it:** When you need location services — find coordinates for an address, get directions between points, find nearby places, determine timezones.
- **Main contents:** Nominatim geocoding (forward and reverse), OSRM route planning, POI search, distance calculation, timezone lookup, maps client script (`scripts/maps_client.py`).
- **Keywords:** map, geocode, POI, route, timezone, OSRM, OSM, OpenStreetMap, Nominatim, distance, directions, location, GPS, coordinates, mapping, geolocation.

**notion (Notion API + ntn CLI — Pages, Databases, Markdown, Workers)**
- **What it does:** Interacts with Notion's API for pages, databases, markdown content, and Notion Workers. Uses the `ntn` CLI for Notion operations.
- **Why use it:** When you need to read, create, or edit Notion pages and databases from Hermes — migrate content, sync data, automate Notion workflows.
- **Main contents:** Notion API integration, ntn CLI usage, page creation and reading, database operations, markdown content handling, Notion Workers, API authentication.
- **Keywords:** Notion, API, page, database, markdown, workers, ntn, CLI, productivity, notes, workspace, Notion integration, page creation, database CRUD.

---

### Research & Knowledge

**arxiv (Search arXiv Papers by Keyword, Author, Category, or ID)**
- **What it does:** Searches arXiv for academic papers by keyword, author, category, or paper ID. Returns paper metadata, abstracts, and links for further reading or PDF download.
- **Why use it:** When you need to find academic papers on a topic — search by subject, find papers by a specific author, look up a known arXiv ID, or browse a category.
- **Main contents:** arXiv API search, keyword search, author search, category search, paper ID lookup, search script (`scripts/search_arxiv.py`), integration with PDF skill for downloading/reading papers.
- **Keywords:** arxiv, paper, search, academic, author, category, research, science, API, scholarly, literature search, CS papers, physics, mathematics, quantitative biology, quantitative finance, statistics, electrical engineering, economics.

**compound-wiki (Karpathy's LLM Wiki — Build/Query Interlinked Markdown Knowledge Base)**
- **What it does:** Builds and maintains a persistent, compounding knowledge base as interlinked markdown files, based on Andrej Karpathy's LLM Wiki pattern. Unlike RAG (which rediscovers knowledge from scratch per query), the wiki compiles knowledge once and keeps it current — cross-references are already there, contradictions already flagged.
- **Why use it:** When you want a persistent knowledge base that grows over time — ingest sources, create entity/concept/comparison pages, cross-reference everything, and query the compiled knowledge. Better than RAG for domains you repeatedly work in.
- **Main contents:** Three-layer architecture (raw sources immutable, wiki pages agent-owned, schema defines structure), wiki location (`WIKI_PATH` env var, defaults to `~/wiki`), resuming an existing wiki (always read SCHEMA.md + index.md + recent log.md before any operation), initializing a new wiki (create directory structure, write SCHEMA.md, index.md, log.md), SCHEMA.md template (domain, conventions, frontmatter format, tag taxonomy, page thresholds), tag taxonomy (define 10-20 top-level tags, add new tags before using them), page thresholds (create page when entity appears in 2+ sources or central to one source, don't create for passing mentions, split pages over 200 lines, archive superseded content), entity pages, concept pages, comparison pages, update policy (check dates, note contradictions with dates, mark in frontmatter, flag for review), core operations (ingest — capture raw source with frontmatter + sha256, discuss takeaways, check existing pages, write/update wiki pages with cross-references and tags, update navigation, report changes; query — read index, search for key terms, read relevant pages, synthesize answer with citations, file valuable answers, update log; lint — orphan pages, broken wikilinks, index completeness, frontmatter validation, stale content, contradictions, quality signals, source drift, page size, tag audit, log rotation), Obsidian integration (wiki directory works as Obsidian vault, wikilinks render, graph view, YAML frontmatter for Dataview, raw/assets for images), Obsidian headless (obsidian-headless for server-side sync via Obsidian Sync, systemd service for continuous background sync), pitfalls (never modify raw/ files, always orient first, always update index.md and log.md, don't create pages for passing mentions, don't create pages without cross-references, frontmatter required, tags from taxonomy, keep pages scannable, ask before mass-updating, rotate log, handle contradictions explicitly), llm-wiki-compiler reference (Node.js CLI from atomicmemory/llm-wiki-compiler for Node.js-based workflows).
- **Keywords:** wiki, Karpathy, LLM Wiki, knowledge base, interlinked markdown, compounding knowledge, RAG alternative, research, notes, Obsidian, schema, tag taxonomy, entity pages, concept pages, comparison pages, cross-reference, knowledge compilation, atomic memory, llm-wiki-compiler.

**grounded-citations (Ground Answers & Documents in Cited, Verifiable Sources)**
- **What it does:** Grounds answers and documents in cited, verifiable sources. Ensures every claim traces back to a source, with citation formats and grounding rationale documentation. Supports web search, arXiv, and PDF sources.
- **Why use it:** When you need answers that are backed by verifiable sources — every claim has a citation, every source is traceable, and the grounding logic is transparent.
- **Main contents:** Citation formats reference (`references/citation-formats.md`), grounding rationale (`references/grounding-rationale.md`), sources script (`scripts/sources.py`), `_hermes_home.py` for home integration, wiki/multi-page output patterns (llm-wiki, Obsidian), web search integration, arXiv integration, PDF integration.
- **Keywords:** citation, source, ground, verify, document, answer, research, web, reports, grounded citations, verifiable sources, citation formats, fact-checking, source attribution, academic citation, research integrity.

**competitor-news-monitor (Watch Named Companies for Material News; Cited Digests)**
- **What it does:** Monitors named companies for material news and produces cited digests. Tracks company mentions across news sources and surfaces relevant developments with citations.
- **Why use it:** When you need to track competitor or company news — get cited digests of material developments, market moves, product launches, executive changes.
- **Main contents:** Company watchlist configuration, news monitoring, cited digest generation, material event detection, integration with blogwatcher for broader content monitoring.
- **Keywords:** news, competitor, company, monitor, digest, cited, market research, competitive intelligence, company tracking, news monitoring, business intelligence, material news, cited digest.

---

### Social Media

**x-twitter-api-cli (X/Twitter via xurl CLI — Post, Search, DM, Media)**
- **What it does:** Interacts with X (Twitter) via the official `xurl` CLI — post, reply, quote, delete, read, search posts, manage timeline, mentions, likes, reposts, bookmarks, follow/unfollow, block/mute, send DMs, list DMs, upload media, check media status, manage auth apps and OAuth tokens. Supports raw API mode for endpoints beyond the shortcuts.
- **Why use it:** When you need to automate X/Twitter operations from Hermes — post content, search posts, manage social interactions, upload media, all through the official X developer platform CLI.
- **Main contents:** xurl CLI installation (`curl -fsSL ... | bash`, `brew install --cask xdevplatform/tap/xurl`, `npm install -g @xdevplatform/xurl`, `go install github.com/xdevplatform/xurl@latest`), auth setup (`xurl auth status`, `xurl auth apps add`, `xurl auth oauth2`, `xurl auth default`, OAuth 2.0 PKCE flow), common pitfalls (never read/print/parse/summarize/upload/send `~/.xurl` to LLM context — contains secrets, user must fill `~/.xurl` manually, Docker HOME pitfall — `/opt/data` vs `/opt/data/home` for Hermes subprocess HOME, `UsernameNotFound` or 403 on `/2/users/me` right after OAuth — re-run with explicit handle, token saved to `default` app instead of named app — re-run `xurl auth oauth2 --app my-app`), shortcut commands table (post, reply, quote, delete, read, search, whoami, user, timeline, mentions, like/unlike, repost/unrepost, bookmark/unbookmark, bookmarks/likes, follow/unfollow, following/followers, block/unblock, mute/unmute, dm, dms, media upload, media status, auth apps list/remove/default, per-request app, auth status), raw API mode (`xurl --app APP_NAME '/2/tweets/...'`, `xurl -X POST /2/tweets -d '...'`, `xurl -X DELETE /2/tweets/ID`, `xurl -H 'Content-Type: application/json' /2/some/endpoint`, `xurl -s /2/tweets/search/stream`, `xurl https://api.x.com/2/users/me`), search guidance (reach for search when task needs actual post objects, authenticated account context, or leads into an X workflow), verification (only `xurl` command output or raw X API response proves a write happened — never report a write as done based on assumption), troubleshooting table (auth errors after successful OAuth → re-run `xurl auth oauth2 --app my-app`, `UsernameNotFound`/403 → re-run `xurl auth oauth2 --app my-app YOUR_USERNAME`, 401 on every request → check `xurl auth status` — verify `▸` points to app with oauth2 tokens), scopes (OAuth 2.0 tokens use broad scopes — 403 on specific action usually means missing scope), multiple apps (each app has isolated credentials/tokens — switch with `xurl auth default` or `--app`), multiple accounts per app (select with `-u`/`--username` or set default), token storage (`~/.xurl` is YAML — in Docker use Hermes subprocess HOME), upstream references (xurl CLI from xdevplatform/xurl by X developer platform team, Chris Park et al.; upstream agent skill from openclaw/openclaw/blob/main/skills/xurl/SKILL.md).
- **Keywords:** X, Twitter, post, search, DM, media, xurl, social media, official API, OAuth 2.0, PKCE, tweet, post, reply, quote, delete, like, repost, bookmark, follow, block, mute, DM, media upload, X API, Twitter API v2, social media automation, xdevplatform, openclaw.

---

### Software Development & QA

**github (GitHub via gh CLI — PRs, Issues, Reviews, Repos, Auth)**
- **What it does:** Interacts with GitHub via the `gh` CLI — pull requests (create, view, checkout, merge), issues (create, list, search, close), code reviews (request review, view reviews, comment), repository management (create, clone, fork, view), authentication (`gh auth`), CI troubleshooting, and conventional commits.
- **Why use it:** When you need to automate GitHub workflows from Hermes — create PRs, review code, manage issues, check CI status, handle auth.
- **Main contents:** gh CLI usage, PR workflow (create PR, checkout PR, view PR, merge PR), issue management (create issue, list issues, search issues, close issues), code review (request review, view reviews, review output template), repo management (create repo, clone, fork, view repo settings), auth (`gh auth login`, `gh auth status`, gh-env.sh script, git-credential-token.py), CI troubleshooting, conventional commits reference, templates (bug-report.md, feature-request.md, pr-body-bugfix.md, pr-body-feature.md), references (auth, CI troubleshooting, code review, conventional commits, GitHub API cheatsheet, issue-to-PR, issues, PR workflow, repo management, review output template).
- **Keywords:** GitHub, gh CLI, PR, pull request, issues, code review, repos, auth, CI, git, conventional commits, GitHub API, repository management, fork, clone, merge, review, bug report, feature request.

**requesting-code-review (Pre-commit Review — Security Scan, Quality Gates, Auto-fix)**
- **What it does:** Performs pre-commit code review with security scanning, quality gates, and auto-fix suggestions. Integrates with GitHub for PR-based reviews and subagent-driven development for parallel review.
- **Why use it:** Before committing code, when you want a security scan, quality gate check, and auto-fix recommendations — catches vulnerabilities, style issues, and anti-patterns before they land.
- **Main contents:** Pre-commit review workflow, security scanning, quality gates, auto-fix suggestions, integration with subagent-driven development for parallel review, integration with test-driven development, GitHub PR review integration.
- **Keywords:** code review, pre-commit, security, quality, auto-fix, verification, gates, security scan, code quality, vulnerability detection, static analysis, before commit, PR review, subagent-driven development.

**simplify-code (Parallel 4-Agent Cleanup of Recent Code Changes)**
- **What it does:** Cleans up and simplifies recent code changes using a parallel 4-agent delegation pattern. Spawns multiple subagents to review, refactor, and clean up code in parallel.
- **Why use it:** After a batch of code changes, when you want to simplify, refactor, and clean up — parallel agents work on different aspects simultaneously.
- **Main contents:** Parallel 4-agent delegation pattern, code cleanup and simplification, refactoring, subagent coordination, integration with requesting-code-review and test-driven-development.
- **Keywords:** simplify, cleanup, refactor, delegation, subagent, parallel, code review, code simplification, refactoring, parallel agents, 4-agent pattern, code cleanup.

**codebase-inspection (Inspect Codebases with pygount — LOC, Languages, Ratios)**
- **What it does:** Inspects codebases using pygount to report lines of code (LOC), language breakdown, and code ratios. Gives a quantitative picture of a codebase's composition.
- **Why use it:** When you need to understand a codebase's size and language composition — how many lines in each language, what's the ratio of test code to production code, etc.
- **Main contents:** pygount usage, LOC counting, language detection, code ratio analysis, codebase metrics, repository analysis.
- **Keywords:** codebase, inspect, LOC, language, ratio, pygount, metrics, repository, code analysis, lines of code, language breakdown, code metrics, codebase composition.

**dogfood (Exploratory QA of Web Apps — Find Bugs, Evidence, Reports)**
- **What it does:** Performs exploratory QA testing of web applications — finds bugs, gathers evidence, and produces structured reports. Uses browser tools for web app exploration.
- **Why use it:** When you need to QA a web app — explore it like a user would, find bugs, document evidence, and produce a clear report.
- **Main contents:** Exploratory QA methodology, bug finding, evidence gathering, report generation, browser-based testing, issue taxonomy reference, dogfood report template.
- **Keywords:** QA, testing, browser, web, dogfood, bug, explore, evidence, report, exploratory testing, web app testing, bug report, quality assurance, user testing, issue taxonomy.

**systematic-debugging (4-Phase Root Cause Debugging — Understand Bugs Before Fixing)**
- **What it does:** A disciplined 4-phase debugging methodology — understand the bug fully before attempting to fix it. Prevents premature fixes and ensures root causes are identified.
- **Why use it:** When debugging complex issues — don't just try random fixes; follow a systematic process to understand the root cause first.
- **Main contents:** 4-phase debugging process, root cause analysis, problem understanding, investigation methodology, integration with test-driven-development and subagent-driven-development.
- **Keywords:** debug, root cause, 4-phase, troubleshooting, problem-solving, investigation, systematic debugging, bug fixing, debugging methodology, root cause analysis, diagnose.

**test-driven-development (TDD — Enforce RED-GREEN-REFACTOR, Tests Before Code)**
- **What it does:** Enforces Test-Driven Development (TDD) with the RED-GREEN-REFACTOR cycle — write tests first, watch them fail (RED), write minimal code to pass (GREEN), then refactor. Integrates with systematic-debugging and subagent-driven-development.
- **Why use it:** When you want to practice TDD — tests before code, red-green-refactor cycle, test-first development discipline.
- **Main contents:** TDD methodology, RED-GREEN-REFACTOR cycle, test-first development, integration with systematic-debugging, integration with subagent-driven-development, quality enforcement.
- **Keywords:** TDD, test, red-green-refactor, testing, development, quality, test-driven development, test first, unit testing, red green refactor, testing methodology.

**hermes-agent-skill-authoring (Author In-Repo SKILL.md Files — Frontmatter and Structure)**
- **What it does:** Guides the authoring of in-repo SKILL.md files — YAML frontmatter conventions, skill structure, naming, tags, related_skills, and skill submission standards.
- **Why use it:** When you're writing a new skill for Hermes Agent — this skill teaches the conventions, frontmatter format, structure, and submission process.
- **Main contents:** SKILL.md frontmatter (name, description, version, author, license, platforms, metadata, tags), skill structure conventions, naming conventions, related_skills linking, skill submission process, conventions reference.
- **Keywords:** skill, author, SKILL.md, frontmatter, structure, conventions, Hermes Agent, skill authoring, skill submission, YAML frontmatter, skill conventions, skill format.

**idea-test-lab (Throwaway Experiments to Validate an Idea Before Build)**
- **What it does:** Runs throwaway experiments (spikes) to validate an idea before committing to a real build. Decomposes the idea into 2-5 independent feasibility questions, researches each, builds quick prototypes, and delivers verdicts (VALIDATED | PARTIAL | INVALIDATED). Adapted from GSD (Get Shit Done) project's spike workflow.
- **Why use it:** When you have an idea and want to validate feasibility before building — decompose into spikes, research, build quick prototypes, get honest verdicts.
- **Main contents:** Spike methodology (decompose → research → build → verdict loop), decomposition into 2-5 feasibility questions with Given/When/Then framing, spike types (standard — one approach, one question; comparison — same question, different approaches with letter suffixes), good vs bad spike questions, ordering by risk (most likely to kill the idea runs first), alignment for multi-spike ideas (present spike table, let user adjust), research per spike (brief it, surface competing approaches with tool/library pros/cons/status, pick one, skip for pure logic), build (one directory per spike, bias toward interactive output — CLI, HTML page, web server, unit test; depth over speed — test edge cases, follow surprises; avoid complex package management, build tools, Docker, env files, config — hardcode everything), verdict format (VALIDATED/PARTIAL/INVALIDATED with what worked, what didn't, surprises, recommendation), comparison spikes (head-to-head after building both), frontier mode (picking what to spike next — integration risks, data handoffs, gaps in vision, alternative approaches), output (create spikes/ directory, one dir per spike with README.md, keep code throwaway), GSD integration note (if gsd-spike shows up as sibling skill, prefer gsd-spike for full GSD workflow with persistent .planning/spikes/ state, MANIFEST tracking, Given/When/Then verdict format, commit patterns), attribution (adapted from gsd-build/get-shit-done by Lex Christopherson, MIT 2025).
- **Keywords:** spike, prototype, experiment, feasibility, throwaway, exploration, research, planning, MVP, proof-of-concept, idea validation, GSD, get-shit-done, feasibility study, prototype, before build, risk assessment.

**systematic-agent (Disciplined Coding — Inspect Before Change, Verify After)**
- **What it does:** The meta-skill enforcing disciplined coding practices on every task — inspect before making changes, verify after, and apply coding discipline rules consistently. Works alongside all other software development skills.
- **Why use it:** As a default overlay on any coding task — ensures every change is preceded by inspection and followed by verification, preventing careless edits.
- **Main contents:** Disciplined coding rules, inspect-before-change principle, verify-after principle, integration with spike experiments (rules still apply even for throwaway work), coding discipline user rules reference.
- **Keywords:** systematic, agent, coding, disciplined, inspect, plan, verify, diagnose, coding discipline, inspect before change, verify after, software engineering discipline, coding standards.

**inspecting-hermes-desktop-dom (Read Live Hermes Desktop DOM/CSS over CDP)**
- **What it does:** Reads the live Hermes desktop application's DOM and CSS over Chrome DevTools Protocol (CDP). Used for inspecting and verifying the desktop app's UI, theme application, and widget rendering.
- **Why use it:** When you need to inspect or debug the Hermes desktop app's UI — read DOM structure, check CSS applied, verify theme rendering, inspect widget state.
- **Main contents:** CDP connection to Hermes desktop (Electron app), DOM inspection, CSS reading, UI verification, self-inspection patterns, inspector reference, integration with node-inspect-debugger and systematic-debugging.
- **Keywords:** desktop, Electron, CDP, DOM, CSS, UI verification, self-inspection, inspector, Chrome DevTools Protocol, Hermes desktop, Electron app, theme verification, widget inspection.

**node-inspect-debugger (Debug Node.js via --inspect + Chrome DevTools Protocol CLI)**
- **What it does:** Debugs Node.js applications via the `--inspect` flag and Chrome DevTools Protocol (CDP) CLI. Supports breakpoints, DAP (Debug Adapter Protocol), and remote debugging.
- **Why use it:** When you need to debug Node.js code — set breakpoints, step through execution, inspect variables, use Chrome DevTools for Node debugging.
- **Main contents:** Node.js --inspect flag, CDP debugging, breakpoints, DAP (Debug Adapter Protocol), remote debugging, integration with systematic-debugging and python-debugpy.
- **Keywords:** Node.js, debug, inspect, Chrome DevTools, CDP, breakpoints, DAP, Debug Adapter Protocol, Node.js debugging, remote debugging, JavaScript debugging, --inspect.

**python-debugpy (Debug Python via pdb REPL + debugpy Remote DAP)**
- **What it does:** Debugs Python code via pdb REPL and debugpy for remote DAP (Debug Adapter Protocol) debugging. Supports breakpoints, post-mortem debugging, and remote debugging sessions.
- **Why use it:** When you need to debug Python code — use pdb for interactive debugging, debugpy for remote/IDE-integrated debugging with breakpoints and variable inspection.
- **Main contents:** pdb REPL usage, debugpy remote debugging, DAP support, breakpoints, post-mortem debugging, remote debugging sessions, integration with systematic-debugging and node-inspect-debugger.
- **Keywords:** Python, debug, pdb, debugpy, breakpoints, DAP, Debug Adapter Protocol, post-mortem, remote debugging, Python debugging, interactive debugging.

---

### Web & Infrastructure

**blocked-page-recovery (Use When a Fetch Fails — 403/429, Paywall, WAF, Bot Wall)**
- **What it does:** Recovers content from web pages that block automated fetches — handles 403/429 errors, paywalls, WAF (Web Application Firewall) blocks, and bot detection walls. Uses archive services (Wayback Machine), fallback strategies, and alternative fetch approaches.
- **Why use it:** When a web page blocks your fetch attempt — instead of giving up, use this skill to try archives, alternative URLs, and recovery strategies.
- **Main contents:** Blocked page diagnosis (403, 429, paywall, WAF, bot wall identification), recovery strategies (Wayback Machine archive, alternative mirrors, cached versions, different user agents, rate-limit backoff), fallback approaches, archive integration, wayback machine usage, reference to grounded-citations for source verification.
- **Keywords:** web, blocked, 403, 429, paywall, WAF, bot, fetch, archive, Wayback Machine, fallback, web scraping, blocked page, rate limit, bot detection, web recovery, archive.org, internet archive.

---

### Meta & Utilities

**skill-compass (Lookup Every Skill by Tag — Use Before Picking Any Tool)**
- **What it does:** The master lookup skill for the entire Hermes skills collection. Maps every skill to short tags and provides a category tree and quick-reference lookup table. The golden rule: load skill-compass before using any tool, and check the list every time before picking a skill.
- **Why use it:** Before using any skill, load skill-compass to find the right skill by tag. It's the routing layer for the entire skills collection — tells you which skill handles which task.
- **Main contents:** Category tree (indented ├── structure showing all 14 categories and their skills), quick tag→skill lookup table (what you want to do → use skill → tags), refresh procedure (`skill-compass --refresh` re-reads every SKILL.md and rewrites the reference), tags on every skill (for lookup and routing), skill registration (when new skills are installed, run refresh to add them).
- **Keywords:** compass, lookup, registry, skills, meta, index, routing, tool selection, skill lookup, tag-based routing, skill registry, Hermes Agent skills, skill index, skill catalog.

**caveman (Ultra-Short Communication Mode — Compress to the Bone)**
- **What it does:** An ultra-short communication mode that compresses messages to the absolute minimum — cuts all filler, reduces to intent-only statements. Part of the caveman family of compressed communication skills.
- **Why use it:** When you want ultra-brief, token-efficient communication — maximum compression, minimum words, just the intent.
- **Main contents:** Caveman mode overview, compression techniques, ultra-short communication patterns, token savings, session style, related skills (caveman-commit, caveman-compress, caveman-help, caveman-review, caveman-stats, cavecrew).
- **Keywords:** caveman, compress, ultra-short, mode, communication, terse, tokens, session, style, ultra compressed, minimal communication, token-efficient, brevity.

**caveman-commit (Conventional Commits — Compressed)**
- **What it does:** Writes conventional commit messages in compressed caveman style — follows Conventional Commits format but with minimum words.
- **Why use it:** When committing code and you want a conventional commit message that's also ultra-short — follows the convention, saves tokens.
- **Main contents:** Conventional Commits format, caveman-style compression, commit message templates, git integration.
- **Keywords:** caveman, commit, conventional, git, terse, message, version control, Conventional Commits, commit message, compressed commit.

**caveman-compress (Compress Memory Files — Backup, Shorten, Markdown)**
- **What it does:** Compresses memory files (like MEMORY.md or todo lists) into shorter form — backs up the original, produces a shortened version, handles markdown compression.
- **Why use it:** When you need to shrink a memory file or document to save space while keeping the essential content — compress, backup, shorten.
- **Main contents:** Compression workflow, backup before compress, markdown shortening, memory file compression, token savings.
- **Keywords:** caveman, compress, memory, tokens, backup, shorten, markdown, memory compression, file compression, context compression, token savings.

**caveman-help (Caveman Quick Reference — Modes, Commands, Card)**
- **What it does:** Quick reference card for caveman modes, commands, and usage — the go-to reference when you need to use caveman compression modes.
- **Why use it:** When you need a quick reminder of caveman modes and how to use them — single reference card.
- **Main contents:** Caveman modes reference, commands, usage patterns, quick reference card, mode overview.
- **Keywords:** caveman, help, quick-ref, reference, modes, commands, card, quick reference, caveman modes, caveman commands.

**caveman-review (Compressed Code Review — One Line per Finding, Severity)**
- **What it does:** Performs code review in compressed caveman style — one line per finding with severity, minimal words, maximum signal.
- **Why use it:** When reviewing code and you want findings in ultra-short format — one line per issue, severity tagged, no filler.
- **Main contents:** Compressed review format, one-line-per-finding pattern, severity tagging, PR diff review, code finding compression.
- **Keywords:** caveman, review, code, compressed, PR, diff, finding, one-line, severity, code review, compressed review, PR review.

**caveman-stats (Token Usage Stats — Estimate Savings, Session Overhead)**
- **What it does:** Reports token usage statistics for caveman sessions — estimates savings from compression, measures session overhead, tracks token efficiency.
- **Why use it:** When you want to know how much token savings caveman compression achieved — stats, estimates, overhead measurement.
- **Main contents:** Token usage tracking, savings estimation, session overhead measurement, compression statistics, token efficiency metrics.
- **Keywords:** caveman, stats, token, usage, savings, estimate, session, overhead, token stats, compression savings, token usage tracking.

**cavecrew (Delegate to Investigator — Locate Code, Context, Edit Targets)**
- **What it does:** Delegates to a cavecrew investigator subagent — locates code, finds context, identifies edit targets. Used when you need to find something in a codebase before making changes.
- **Why use it:** When you need to locate code, understand context, or find edit targets in a codebase — delegate to a cavecrew investigator.
- **Main contents:** Investigator delegation pattern, code location, context finding, edit target identification, subagent delegation, locate-and-edit workflow.
- **Keywords:** cavecrew, delegate, investigator, builder, reviewer, compressed, context, locate, edit, code location, context finding, subagent delegation, code investigation.

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

## Installation

### Option 1: Clone this repository

```bash
# Clone into your Hermes skills directory
git clone https://github.com/V4TIME/V4SKILL.git ~/.hermes/skills

# OR if skills already exist, pull updates
cd ~/.hermes/skills
git pull origin main
```

### Option 2: Copy specific skills

```bash
# Copy a single skill folder
cp -r /path/to/V4SKILL/creative/ai-text-detox ~/.hermes/skills/creative/
```

### Refresh skill-compass

After adding or updating skills, refresh the skill-compass index:

```bash
# The skill-compass reads every SKILL.md and rebuilds its lookup table
# Trigger via the hermes-agent-skill-authoring skill or manually
```

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

**Meta & Communication:** Hermes Agent, orchestration, configuration, theme, plugin, MCP, slash commands, multi-agent, CLI, setup, bot, gateway, spawning, agentic workflow, Nous Research, Termux, Linux, macOS, Windows, skill-compass, lookup, registry, skills, meta, index, routing, tool selection, skill lookup, tag-based routing, skill registry, skill index, skill catalog, caveman, compress, ultra-short, mode, communication, terse, tokens, session, style, ultra compressed, minimal communication, token-efficient, brevity, caveman-commit, conventional, git, terse, message, version control, Conventional Commits, commit message, compressed commit, caveman-compress, memory, tokens, backup, shorten, markdown, memory compression, file compression, context compression, token savings, caveman-help, quick-ref, reference, modes, commands, card, quick reference, caveman modes, caveman commands, caveman-review, code, compressed, PR, diff, finding, one-line, severity, code review, compressed review, PR review, caveman-stats, token, usage, savings, estimate, session, overhead, token stats, compression savings, token usage tracking, cavecrew, delegate, investigator, builder, reviewer, compressed, context, locate, edit, code location, context finding, subagent delegation, code investigation.

---

## Contributing

1. Read `hermes-agent-skill-authoring` for skill format conventions
2. Create a new skill folder under the appropriate category
3. Write `SKILL.md` with YAML frontmatter (name, description, version, author, license, platforms, metadata with tags/category/related_skills, tags array)
4. Add tags that people would search for
5. Test the skill with `skill-compass --refresh`
6. Submit a pull request to `V4TIME/V4SKILL`

---

## License

Skills in this repository inherit their original licenses where applicable:

- **Externally-sourced skills** retain their original license (MIT, Apache, etc.) as noted in each skill's SKILL.md
- **Hermes-authored skills** are MIT licensed
- See individual skill files for specific license declarations

---

*Repository: https://github.com/V4TIME/V4SKILL*
*Skills: 69 | Categories: 14 | Keywords: 400+*
