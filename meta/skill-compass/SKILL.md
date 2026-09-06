---
name: skill-compass
description: "Lookup every skill by tag. Use before picking any tool."
version: 1.0.0
author: Hermes Agent
license: MIT
platforms: [linux, macos, windows]
tags: [compass, lookup, registry, skills, meta, index, routing, tool-selection]
---

# Skill Compass

One place that knows every skill you have. When unsure what to use, load this skill — it reads the reference below and points you at the right skill or tool.

## How to use

- **"I need to do X"** → load this skill; it matches X to a skill + tags.
- **"What skills do I have for Y?"** → load; it filters the tree.
- **`skill-compass --refresh`** → re-reads every SKILL.md on disk and rewrites the reference so new skills are included.

## Golden Rule

Before using ANY tool or skill, load `skill-compass` and confirm the skill exists and is the right one. Never guess. The reference is the source of truth.

---

# SKILL REGISTRY

> Auto-generated. Run `skill-compass --refresh` to rebuild.

## Category Tree

```
apple (4)
├── apple-notes      — notes, apple, create, search, edit, memo
├── apple-reminders  — reminders, apple, todo, add, list, complete, remindctl
├── findmy          — findmy, apple, track, device, airtag, locate
└── imessage        — imessage, sms, send, receive, imsg, apple

autonomous-ai-agents (5)
├── code-cli-ctrl       — coding, delegate, claude, cli, pr, agent
├── code-task-runner       — coding, delegate, openai, cli, pr, agent
├── desk-automation-bg     — desktop, automate, drive, background, escalate, ui
├── hermes-agent      — hermes, configure, theme, extend, orchestrate, bot, gateway
└── ai-task-agent-cli      — coding, delegate, opencode, cli, pr, review, agent

creative (10)
├── svg-arch-diagram — diagram, svg, architecture, cloud, infra, html, dark
├── ascii-video          — video, ascii, convert, colored, mp4, gif
├── infographic-generator    — infographic, info, chart, 可视化, 信息图, template
├── claude-design        — design, html, landing, deck, prototype, one-off
├── design-tokens-spec      — design, token, spec, google, validate, export
├── ai-text-detox        — humanize, text, voice, ai-isms, rewrite, tone
├── manim-video          — video, math, animation, 3blue1brown, manim, algo
├── p5js                 — p5js, gen-art, shader, interactive, 3d, creative-coding
├── popular-web-designs  — design, web, stripe, linear, vercel, system, html
└── songwriting-and-ai-music — song, music, suno, prompt, writing, audio

devops (1)
└── sdlc-review          — devops, kanban, review, handoff, route, verified

email (2)
├── email-inbox-triage — email, triage, inbox, prioritize, draft, reply
└── term-mail-cli           — email, imap, smtp, cli, send, receive

human-first-ui (1)
└── human-first-ui        — ui, human, web, design, not-ai, polished

local-ai-webapp (1)
└── local-ai-webapp       — flask, webapp, ai, nara, termux, localhost

media (3)
├── gif-search        — gif, search, download, tenor, curl, image
├── song-spectrum-cli           — audio, spectrogram, mel, chroma, mfcc, feature, cli
└── youtube-content   — youtube, transcript, summary, blog, thread, video

note-taking (1)
└── obsidian          — note, obsidian, vault, read, search, create, edit

productivity (21)
├── airtable               — airtable, api, curl, record, crud, filter, upsert
├── box                    — box, cloud, file, share, search, metadata
├── cavecrew               — delegate, investigator, locate, code, task
├── caveman                — compress, ultra-short, mode, communication
├── caveman-commit         — commit, conventional, compress, git
├── caveman-compress       — compress, memory, file, shorten
├── caveman-help           — help, caveman, quick-ref, mode, skill
├── caveman-review         — review, code, compressed, line, finding
├── caveman-stats          — stats, token, usage, savings, estimate
├── document-to-action-items — document, action, obligation, deadline, task
├── docx                   — word, docx, create, read, edit, template, review
├── google-workspace       — google, gmail, calendar, drive, docs, sheets, gws
├── maps                   — map, geocode, poi, route, timezone, osrm, osm
├── meeting-action-items   — meeting, action, decision, owner, ticket, notes
├── notion                 — notion, api, page, database, markdown, ntn
├── pdf                    — pdf, create, read, merge, fill, ocr, edit
├── powerpoint             — powerpoint, pptx, create, read, edit, python-pptx
├── product-price-monitor  — price, monitor, product, flight, alert, watch
├── teams-meeting-pipeline — teams, meeting, summary, job, graph, subscription
├── weekly-review-planning — weekly, review, plan, reset, commitment
└── xlsx                   — excel, xlsx, create, read, edit, csv

research (4)
├── arxiv               — arxiv, paper, search, academic, author, category
├── competitor-news-monitor — news, competitor, company, monitor, digest, cited
├── grounded-citations  — citation, source, ground, verify, document, answer
└── compound-wiki            — wiki, karpathy, llm, knowledge, interlinked, markdown

social-media (1)
└── x-twitter-api-cli            — x, twitter, post, search, dm, media, x-twitter

software-development (13)
├── codebase-inspection   — codebase, inspect, loc, language, ratio, pygount
├── dogfood               — qa, webapp, bug, explore, evidence, report
├── github               — github, gh, pr, issue, review, repo, auth
├── hermes-agent-skill-authoring — skill, author, skil.md, frontmatter, structure
├── inspecting-hermes-desktop-dom — desktop, dom, css, cdp, live, inspector
├── node-inspect-debugger  — node, debug, inspect, chrome-devtools, dap
├── python-debugpy         — python, debug, pdb, debugpy, remote, dap
├── requesting-code-review — review, code, pre-commit, security, quality, auto-fix
├── simplify-code          — simplify, cleanup, parallel, agent, recent
├── idea-test-lab                 — experiment, prototype, throwaway, validate, idea
├── systematic-debugging   — debug, root-cause, 4-phase, understand, fix
├── test-driven-development — tdd, test, red-green-refactor, enforce
└── systematic-agent       — coding, disciplined, inspect, plan, verify, diagnose

webmxerz (1)
└── webmxerz      — ui, ux, design, system, component, max

web (1)
└── blocked-page-recovery — web, blocked, 403, 429, paywall, waf, bot, fetch
```

## Quick Tag → Skill Lookup

| You want to... | Use skill | Tags |
|---|---|---|---|
| Code with an external LLM CLI | `code-cli-ctrl`, `code-task-runner`, or `ai-task-agent-cli` | coding, delegate, agent, pr |
| Build a Flask webapp in Termux | `local-ai-webapp` | flask, webapp, ai, nara, termux |
| Make text sound human, not AI | `ai-text-detox` | humanize, text, voice, ai-isms |
| Search/read YouTube transcripts | `youtube-content` | youtube, transcript, summary |
| Search arXiv papers | `arxiv` | arxiv, paper, search, academic |
| GitHub PRs/issues/releases | `github` | github, gh, pr, issue, repo |
| Debug Python | `python-debugpy` | python, debug, pdb, debugpy |
| Debug Node.js | `node-inspect-debugger` | node, debug, inspect, cdp |
| TDD / write tests first | `test-driven-development` | tdd, test, red-green-refactor |
| Systematic bug hunt | `systematic-debugging` | debug, root-cause, 4-phase |
| Code review before commit | `requesting-code-review` | review, code, pre-commit, security |
| Simplify recent code | `simplify-code` | simplify, cleanup, parallel |
|| Throwaway experiment | `idea-test-lab` | experiment, prototype, throwaway ||
| Create diagrams (SVG/HTML) | `svg-arch-diagram` | diagram, svg, architecture, cloud |
| ASCII video from media | `ascii-video` | video, ascii, convert, mp4, gif |
| Infographics | `infographic-generator` | infographic, chart, 可视化 |
| One-off HTML design | `claude-design` | design, html, landing, deck |
| Google DESIGN.md token spec | `design-tokens-spec` | design, token, spec, google |
| p5.js gen-art/shader | `p5js` | p5js, gen-art, shader, interactive |
| Real design systems (Stripe/etc) | `popular-web-designs` | design, web, stripe, linear |
| Songwriting + Suno prompts | `songwriting-and-ai-music` | song, music, suno, prompt |
| GIF search/download | `gif-search` | gif, search, download, tenor |
|| Audio features/spectrogram | `song-spectrum-cli` | audio, spectrogram, mel, chroma ||
| Send/receive email (IMAP/SMTP) | `term-mail-cli` | email, imap, smtp, cli ||
| Triage an inbox | `email-inbox-triage` | email, triage, inbox, draft |
| Read/create Obsidian notes | `obsidian` | note, obsidian, vault |
| Apple Notes | `apple-notes` | notes, apple, memo |
| Apple Reminders | `apple-reminders` | reminders, apple, todo |
| Find My / AirTag tracking | `findmy` | findmy, apple, track, airtag |
| iMessage / SMS | `imessage` | imessage, sms, imsg |
| Notion pages/databases | `notion` | notion, api, page, database |
| Google Workspace (Gmail/Drive/Docs) | `google-workspace` | google, gmail, calendar, drive |
| Airtable records | `airtable` | airtable, api, crud |
| Box cloud files | `box` | box, cloud, file, share |
| PDF create/read/edit/OCR | `pdf` | pdf, create, read, ocr |
| Word .docx | `docx` | word, docx, create, edit |
| Excel / .xlsx / CSV | `xlsx` | excel, xlsx, csv |
| PowerPoint .pptx | `powerpoint` | powerpoint, pptx |
| Maps / geocode / routes | `maps` | map, geocode, poi, route |
| Meeting notes to action items | `meeting-action-items` | meeting, action, decision |
| Document to obligations/deadlines | `document-to-action-items` | document, action, obligation |
| Product/flight price monitoring | `product-price-monitor` | price, monitor, alert |
| Weekly review / planning | `weekly-review-planning` | weekly, review, plan |
| Teams meeting pipeline | `teams-meeting-pipeline` | teams, meeting, summary |
| Web page blocked (403/429/paywall) | `blocked-page-recovery` | web, blocked, 403, paywall |
| Codebase LOC / language stats | `codebase-inspection` | codebase, loc, language |
| QA / exploratory testing | `dogfood` | qa, webapp, bug |
| Kanban / SDLC handoff review | `sdlc-review` | devops, kanban, review |
| Herms config/theme/bots | `hermes-agent` | hermes, configure, theme, bot |
| Write a new skill | `hermes-agent-skill-authoring` | skill, author, skil.md |
| Desktop app DOM/CSS inspect | `inspecting-hermes-desktop-dom` | desktop, dom, css, cdp |
| Ultra-short communication | `caveman` | compress, ultra-short |
| Conventional commit (compressed) | `caveman-commit` | commit, conventional, compress |
| Compress a memory file | `caveman-compress` | compress, memory |
| Compressed code review | `caveman-review` | review, code, compressed |
| Token usage stats | `caveman-stats` | stats, token, usage |
| Caveman quick reference | `caveman-help` | help, caveman, quick-ref |
| Delegate to investigator | `cavecrew` | delegate, investigator |
| Make web UI look human-built | `human-first-ui` | ui, human, web, not-ai |
| Make UI component library | `webmxerz` | ui, ux, design, system |
| Disciplined coding (every task) | `systematic-agent` | coding, disciplined, inspect |

## Refresh Procedure

When a new skill is installed, run:

```
skill-compass --refresh
```

This re-reads every `SKILL.md` under `~/.hermes/skills/` and rewrites this reference. The `hermes-agent-skill-authoring` skill can also trigger a refresh after writing a new skill.
