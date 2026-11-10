---
name: skill-compass
description: "Lookup every skill by tag. Use before picking any tool."
version: 1.0.0
author: V4TIME
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [compass, lookup, registry, skills, meta, index, routing, tool-selection]
    category: meta
    related_skills: []
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
├── apple-notes — apple, notes, memo, create, search, edit
├── apple-reminders — apple, reminders, todo, tasks, add, list
├── findmy — apple, findmy, track, airtag, locate, device
└── imessage — apple, imessage, sms, messaging, send, receive

ai-coding-agents (3)
├── ai-task-agent-cli — coding, delegate, opencode, cli, pr, review
├── code-cli-ctrl — coding, delegate, claude, anthropic, cli, pr
└── code-task-runner — coding, delegate, openai, cli, pr, agent

desktop-automation (2)
├── desk-automation-bg — desktop, automate, drive, background, escalate, gui
└── inspecting-hermes-desktop-dom — desktop, electron, cdp, dom, css, ui-verification

creative-media (18)
├── ai-text-detox — humanize, text, voice, ai-isms, rewrite, tone
├── ascii-video — video, ascii, convert, colored, mp4, gif
├── claude-design — design, html, prototype, ux, ui, creative
├── craft-director — design, frontend, ui, ux, critique, audit
├── design-tokens-spec — design, design-system, tokens, ui, accessibility, wcag
├── gif-search — gif, search, download, tenor, curl, image
├── human-first-ui — ui, human, web, design, not-ai, polished
├── infographic-generator — infographic, visual-summary, chart, 可视化, 信息图, template
├── manim-video — video, math, animation, 3blue1brown, manim, algo
├── motion-craft-kit — motion, animation, video, kinetic-typography, gsap, framer-motion
├── p5js — p5js, gen-art, shader, interactive, 3d, creative-coding
├── popular-web-designs — design, css, html, ui, web-development, design-systems
├── song-spectrum-cli — audio, spectrogram, mel, chroma, mfcc, feature
├── songwriting-and-ai-music — songwriting, music, suno, parody, lyrics, creative
├── svg-arch-diagram — diagram, svg, architecture, cloud, infra, html
├── visual-repo-branding — github, banner, logo, svg, branding, readme
├── webmxerz — ui, ux, design-system, web-design, color, typography
└── youtube-content — youtube, transcript, summary, blog, thread, video

email (2)
├── email-inbox-triage — email, triage, inbox, prioritize, draft, reply
└── term-mail-cli — email, imap, smtp, cli, send, receive

productivity (10)
├── document-to-action-items — document, action, obligation, deadline, task, extraction
├── docx — word, docx, create, read, edit, template
├── meeting-action-items — meeting, action, decision, owner, ticket, notes
├── obsidian — note, obsidian, vault, markdown, read, search
├── pdf — pdf, create, read, merge, fill, ocr
├── powerpoint — powerpoint, pptx, create, read, edit, presentation
├── product-price-monitor — price, monitor, product, flight, alert, watch
├── teams-meeting-pipeline — teams, meeting, summary, job, graph, subscription
├── weekly-review-planning — weekly, review, plan, reset, commitment, tasks
└── xlsx — excel, xlsx, csv, spreadsheet, openpyxl, create

google-cloud (5)
├── airtable — airtable, api, crud, record, filter, upsert
├── box — box, cloud, file, share, search, metadata
├── google-workspace — google, gmail, calendar, drive, docs, sheets
├── maps — map, geocode, poi, route, timezone, osrm
└── notion — notion, api, page, database, markdown, workers

research (4)
├── arxiv — arxiv, paper, search, academic, author, category
├── competitor-news-monitor — news, competitor, company, monitor, digest, cited
├── compound-wiki — wiki, karpathy, llm, knowledge, interlinked, markdown
└── grounded-citations — citation, source, ground, verify, document, answer

social-media (1)
└── x-twitter-api-cli — x, twitter, post, search, dm, media

software-development (12)
├── codebase-inspection — codebase, inspect, loc, language, ratio, pygount
├── dogfood — qa, testing, browser, web, dogfood, bug
├── github — github, gh, git, pull-requests, issues, code-review
├── idea-test-lab — spike, prototype, experiment, feasibility, throwaway, exploration
├── node-inspect-debugger — node, debug, inspect, chrome-devtools, cdp, breakpoints
├── python-debugpy — python, debug, pdb, debugpy, breakpoints, dap
├── requesting-code-review — review, code, pre-commit, security, quality, auto-fix
├── sdlc-review — devops, kanban, review, handoff, route, verified
├── simplify-code — simplify, cleanup, refactor, delegation, subagent, parallel
├── systematic-agent — discipline, verification, debugging, planning, code-quality
├── systematic-debugging — debug, root-cause, 4-phase, troubleshooting, problem-solving, investigation
└── test-driven-development — tdd, test, red-green-refactor, testing, development, quality

web-infrastructure (2)
├── blocked-page-recovery — web, blocked, 403, 429, paywall, waf
└── termux-flask — flask, webapp, ai, nara, termux, localhost

meta (10)
├── brevity-card — drytalk, help, quick-ref, reference, modes, commands
├── commit-shorthand — drytalk, commit, conventional, git, terse, message
├── drytalk — drytalk, compress, ultra-short, mode, communication, terse
├── hermes-agent — hermes, configure, theme, extend, orchestrate, bot
├── hermes-agent-skill-authoring — skill, author, skill-md, frontmatter, structure, conventions
├── memoshrink — drytalk, compress, memory, tokens, backup, shorten
├── pr-shorthand — drytalk, review, code, compressed, pr, diff
├── skill-compass — compass, lookup, registry, skills, meta, index
├── swarm-brief — swarm-brief, delegate, subagent, investigator, builder, reviewer
└── token-audit — drytalk, stats, token, usage, savings, estimate
```

## Quick Tag → Skill Lookup

| You want to... | Use skill | Tags |
|---|---|---|---|
| Code with an external LLM CLI | `code-cli-ctrl`, `code-task-runner`, or `ai-task-agent-cli` | coding, delegate, agent, pr |
| Build a Flask webapp in Termux | `termux-flask` | flask, webapp, ai, nara, termux, localhost |
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
| Throwaway experiment | `idea-test-lab` | experiment, prototype, throwaway |
| Create diagrams (SVG/HTML) | `svg-arch-diagram` | diagram, svg, architecture, cloud |
| ASCII video from media | `ascii-video` | video, ascii, convert, mp4, gif |
| Infographics | `infographic-generator` | infographic, chart, 可视化 |
| One-off HTML design | `claude-design` | design, html, landing, deck |
| Google DESIGN.md token spec | `design-tokens-spec` | design, token, spec, google |
| p5.js gen-art/shader | `p5js` | p5js, gen-art, shader, interactive |
| Real design systems (Stripe/etc) | `popular-web-designs` | design, web, stripe, linear |
| Songwriting + Suno prompts | `songwriting-and-ai-music` | song, music, suno, prompt |
| GIF search/download | `gif-search` | gif, search, download, tenor |
| Motion graphics/animation/video reference | `motion-craft-kit` | motion, animation, video, gsap, 3d, webgl, manim |
| Audio features/spectrogram | `song-spectrum-cli` | audio, spectrogram, mel, chroma |
| Send/receive email (IMAP/SMTP) | `term-mail-cli` | email, imap, smtp, cli |
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
| Hermes config/theme/bots | `hermes-agent` | hermes, configure, theme, bot |
| Write a new skill | `hermes-agent-skill-authoring` | skill, author, SKILL.md |
| Desktop app DOM/CSS inspect | `inspecting-hermes-desktop-dom` | desktop, dom, css, cdp |
| Ultra-short communication | `drytalk` | compress, ultra-short |
| Conventional commit (compressed) | `commit-shorthand` | commit, conventional, compress |
| Compress a memory file | `memoshrink` | compress, memory |
| Compressed code review | `pr-shorthand` | review, code, compressed |
| Token usage stats | `token-audit` | stats, token, usage |
| Caveman quick reference | `brevity-card` | help, drytalk, quick-ref |
| Delegate to investigator | `swarm-brief` | delegate, investigator |
| Make web UI look human-built | `human-first-ui` | ui, human, web, not-ai |
| Search UI/UX data or generate a design system | `webmxerz` | ui, ux, design-system, search |
| Disciplined coding (every task) | `systematic-agent` | coding, disciplined, inspect |
| Find the right skill by tag | `skill-compass` | compass, lookup, registry, skills |
| Monitor competitor news | `competitor-news-monitor` | news, competitor, monitor, digest |
| Build an interlinked LLM wiki | `compound-wiki` | wiki, karpathy, llm, knowledge |
| Design, critique, or polish a frontend | `craft-director` | design, ui, ux, critique, audit |
| Drive the desktop in the background | `desk-automation-bg` | desktop, automate, cua-driver, background |
| Ground answers in verified sources | `grounded-citations` | citation, source, verify, ground |
| Render Manim math animations | `manim-video` | video, math, animation, manim |
| Brand a repo visually | `visual-repo-branding` | branding, repo, visual, assets |
| Post/search/DM on X (Twitter) | `x-twitter-api-cli` | x, twitter, post, search, dm |

## Refresh Procedure

When a new skill is installed, run:

```
skill-compass --refresh
```

This re-reads every `SKILL.md` under `~/.hermes/skills/` and rewrites this reference. The `hermes-agent-skill-authoring` skill can also trigger a refresh after writing a new skill.

## Renaming or Migrating a Skill

When a skill needs a new name (more descriptive, function-based, not derived from the old name), follow this procedure ONE skill at a time — never batch multiple renames.

### Procedure

1. **Read the skill's SKILL.md** — understand what it does before choosing a new name.
2. **Choose a new name** — descriptive of function, completely different from the old name.
3. **Patch the SKILL.md `name:` field** — `name: old-name` → `name: new-name`.
4. **Rename the folder** — `mv old-name new-name`. Verify with `ls` after.
5. **Find and patch cross-references** — grep for the old name across all skills:
   ```
   grep -rn "old-name" ~/.hermes/skills/ --include="*.md"
   ```
   Patch every match in other skills' SKILL.md files. Leave source attributions (original repo names) intact.
6. **Update skill-compass** — patch BOTH:
   - The category tree line (`├── old-name` → `├── new-name`)
   - The quick lookup table row (`| category | old-name | tags |` → `| category | new-name | tags |`)
7. **Verify** — grep again; zero stale references should remain (excluding source attributions and the renamed skill's own files).

### Pitfalls

- **Folder move fails if directory is not empty.** Use `mv` on the whole directory, not `rmdir`. Check with `ls` after the move.
- **Cross-references in other skills are easy to miss.** Always grep after renaming — don't assume you found them all.
- **skill-compass has TWO places to update:** the category tree and the lookup table. Missing one leaves a stale reference.
- **Don't batch rename multiple skills.** One at a time: rename, verify, then move to the next. Batch operations miss cross-references.
- **Source attributions stay.** References to the original upstream repo name (e.g., "pimalaya/himalaya") in the skill's own SKILL.md are historical attribution — do NOT change these.

