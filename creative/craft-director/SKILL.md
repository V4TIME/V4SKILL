---
name: craft-director
version: 1.0.0
author: V4TIME — reverse-engineered from pbakaus/impeccable (github.com/pbakaus/impeccable, Apache 2.0)
license: Apache 2.0
platforms:
  - Claude Code
  - Cursor
  - Codex
  - any agent that reads SKILL.md
description: >
  One consolidated design-direction skill for AI coding agents, rebuilt from Paul Bakaus's
  Impeccable (github.com/pbakaus/impeccable, Apache 2.0, 66k stars). Covers the full design
  guidance surface: product-truth capture separate from visual direction, four visitor
  modes, twenty conductor commands, quality floor with absolute bans, anti-pattern
  detector rules, dual-assessment UX critique, audit with 5-dimension scoring, polish
  triage, shape discovery-to-brief flow, init/product-truth interview, document/extract
  for existing systems, and the Operate/Read depth rules. Restructured, renamed, order
  shuffled, explanations rewritten for roughly half. Use when the user wants to design,
  redesign, shape, critique, audit, polish, clarify, distill, harden, optimize, adapt,
  animate, colorize, typeset, layout, delight, or otherwise improve a frontend interface.
tags:
  - design
  - frontend
  - ui
  - ux
  - critique
  - audit
  - polish
  - typography
  - layout
  - motion
  - accessibility
  - performance
  - responsive
  - design-system
  - product-truth
  - landing-page
  - dashboard
  - component
  - web-design
related_skills:
  - webmxerz
  - design-tokens-spec
  - infographic-generator
  - svg-arch-diagram
  - motion-craft-kit
  - human-first-ui
---

# Craft Director

> **Source:** github.com/pbakaus/impeccable — Paul Bakaus, Apache 2.0 license, 66,000 stars.
> This is a single consolidated skill that reverse-engineers Impeccable's design-guidance
> surface into one document. The original distributes across 16 agent-runtime provider
> directories, a Rust engine, a CLI (`npx impeccable`), a browser extension, and 61
> deterministic detector rules. This skill captures the craft knowledge in one place.
> For the full original including the engine, detector, live-mode browser iteration, and
> per-runtime provider packs, see the upstream repo.

---

## INFO

| | |
|---|---|
| **Upstream repository** | `pbakaus/impeccable` (Apache 2.0) |
| **Upstream author** | Paul Bakaus (pbakaus) |
| **What this is** | One consolidated design-direction skill rebuilt from Impeccable's 23-command, 4-mode, 61-rule system |
| **Format** | Reference skill — reads like a design-director handbook, one SKILL.md |
| **Install upstream** | `npx impeccable install` then `/impeccable init` in your AI tool |
| **When to use** | Any UI/UX design task: landing pages, dashboards, app shells, components, forms, settings, onboarding, empty states, redesigns, polish passes, audits, critiques, typography, layout, motion, color, accessibility, performance, responsive, theming |

---

## Main Theme

**Give an AI coding agent the craft judgment of a senior design director** — the ability to look at a frontend interface and decide what's wrong, what's worth fixing, what order to fix it in, and when to stop. Not a pixel-pushing tool. Not a template generator. A judgment layer that separates "this is technically functional" from "this is designed."

Impeccable started from Anthropic's frontend-design skill and extended it with: a durable product-truth artifact separate from visual direction, a four-mode visitor taxonomy, twenty named commands with dedicated reference files, a quality floor with absolute bans, 61 deterministic detector rules (no LLM, no API key), a dual-assessment critique method, a five-dimension audit with 0-4 scoring, and a browser live-mode for visual iteration.

The throughline: **design truth is durable; visual surface is disposable.** Product truth (who, why, constraints, voice, evidence) lives in one artifact. Visual decisions (tokens, theme, components, layout) live per surface. A page brief inherits both. You don't ask "what color should this button be" until you know what the product is, who uses it, and what this screen is for.

---

## Main Key Themes

1. **Product truth is separate from visual direction.** The product record (audience, purpose, constraints, voice, evidence, brand commitments) is one artifact. The visual system (tokens, theme, CSS, components) is another, per surface. A missing visual artifact doesn't erase an existing coherent identity in code.

2. **Four visitor modes, chosen from the surface not the product.** Persuade (visitor decides and acts — landing, marketing, pricing), Operate (visitor completes a task — app UI, dashboard, settings, tools), Read (visitor understands — docs, articles, guides), Experience (visitor is inside the work — portfolio, gallery, showcase). A tool's landing page is still Persuade; a fashion house's documentation is still Read.

3. **Design is the product in Persuade mode; design serves the product in Operate mode.** In Persuade, the visitor's decision is the deliverable — earn attention and action. In Operate, scanability, consistency, native expectations, and the real usage scene outrank expression; brand lives in precise details.

4. **The quality floor is non-negotiable and loaded immediately before editing UI.** Contrast, depth, spacing, type measure, motion authorship, states coverage, browser-surface theming, copy that names actions and problems — these are checks on the built result, not intentions. Run them together in batched inspection rounds.

5. **Refinement preserves; redesign replaces.** Refinement keeps the incumbent visual world, content, behavior, and everything outside scope. Redesign treats the old look as evidence and anti-reference — keep product truth, content, function, constraints, explicit brand commitments, but choose a replacement world and replace the visual artifact, not split the difference into polish on the discarded look.

6. **A detector result is defect evidence, not proof of quality.** Deterministic rules catch AI design tells (Inter everywhere, purple-to-blue gradients, cards-in-cards, gray text on colored backgrounds, rounded-square icon tiles) but a page can pass the detector and still be bad. Inspect the rendered experience and real interaction path.

7. **Critique runs two independent assessments, never inline.** Assessment A (design review — hierarchy, clarity, emotional resonance) and Assessment B (detector/browser evidence) are both required and must run as separate sub-agents when available. The report is the deliverable; the question is last.

8. **Audit scores five dimensions 0-4:** Accessibility, Performance, Responsive, Theming/Consistency, Implementation Integrity. Each finding gets a severity (P0/P1/P2/P3), a location, a category, an impact, a standard if applicable, a recommendation, and a suggested command. End with polish.

9. **Polish is triage, not perfection.** Fix in this order: broken/blocked tasks and inaccessible paths → missing states (loading, empty, error, success, disabled) → flow/hierarchy/responsive/design-system drift → visual and motion inconsistencies → code and asset cleanup. Don't perfect one corner while leaving the rest below the same bar.

10. **The 20 conductor commands are a shared vocabulary.** Build (shape, init, document, extract), Evaluate (critique, audit), Refine (polish, distill, harden, onboard), Enhance (animate, colorize, typeset, layout, delight, overdrive), Fix (clarify, adapt, optimize), Iterate (live). Each has a dedicated reference; routing picks the right one.

---

## The 4 Visitor Modes

Name the mode from the surface, not the product. A mode is what the visitor's success looks like on this specific screen.

### Convert
The visitor decides and acts. Design is the product. Landing pages, marketing pages, campaigns, pricing, product pages that must earn a click or a purchase. Earn attention and action. Ship real imagery when the brief needs it. Follow the committed visual world, not category habit. The CTA sequence, the proof placement, the first viewport — these carry the weight.

### Work
The visitor completes a task. App UI, dashboards, editors, admin, settings, tools, authenticated surfaces, anything where the user is in a task. Scanability, consistency, native expectations, and the real usage scene outrank expression. Brand lives in precise details — the same button shape, the same form-control vocabulary, the same icon style screen to screen. Overlays escape their container. Motion conveys state, not decoration.

### Comprehend
The visitor understands something. Docs, articles, guides, help, changelogs, long-form. Structure for comprehension first, then make the reading experience worth staying in. Typography measure, navigation, wayfinding, and prose quality matter more than component density. A docs index is Read, not Persuade, even if it belongs to a Persuade product.

### Experience
The visitor is inside the work itself. Portfolios, galleries, showcases, demo surfaces. Let the artifact lead from the first viewport; the interface recedes. Exploration, transition, and interaction design carry the weight. The frame should not compete with what it frames.

---

## The 20 Conductor Commands

A shared design vocabulary between the agent and the user. Each command has a dedicated reference below. Routing: no argument → present a context-aware menu, never auto-run. Explicit or clearly implied command → load its reference and follow it. Otherwise → treat as general design work.

### Build

**shape** — Plan UX/UI before writing code. Discovery interview (material, behavior, boundaries) → resolve design direction → write the brief (job and audience, outcome and proof, selected direction, scope and boundaries, states and ranges, interaction and layout, constraints and open decisions). Returns a confirmed brief, not code.

**init** — Capture durable product truth in PACT.md (the product record). Explore the project, interview only for material gaps, write the record. Does NOT invent a visual world and does NOT write SURFACE.md. One-time per project; re-run only when product knowledge is stale or missing.

**document** — Generate the root SURFACE.md from existing project code. Records the incumbent visual system (tokens, theme, components, patterns, assets) independently of a new build. Use when an existing coherent interface has no design artifact yet.

**extract** — Pull reusable tokens and components into the design system. Identify what's repeatable, name it, place it in the system, and redirect consumers. The inverse of document: document reads the system out of code; extract writes code toward a system.

### Evaluate

**critique** — UX design review with two independent assessments. Assessment A: design review (hierarchy, clarity, emotional resonance, visitor success). Assessment B: detector/browser evidence (deterministic rules + rendered inspection). Synthesize into a design critique, persist a snapshot, ask what to improve next. The question is the LAST thing in the response.

**audit** — Technical quality scan across five dimensions, each scored 0-4. Accessibility (contrast, ARIA, keyboard, semantic HTML, alt text), Performance (assets, render, bundle, interaction), Responsive (fixed widths, touch targets, overflow, breakpoints, text scaling), Theming/Consistency (token usage, visual drift, component consistency), Implementation Integrity (detector findings, shortcuts, design-system drift, interchangeable structure). Generates a report with executive summary, severity-classified findings, systemic patterns, and recommended commands. End with polish.

### Refine

**polish** — Final quality pass before shipping. Refinement, never concealed redesign. Read SURFACE.md and representative tokens/components/neighbors. Classify each drift (missing token, one-off implementation, conceptual mismatch, local defect). Fix the cause at the narrowest correct level. Triage in order: broken/blocked → missing states → flow/hierarchy/responsive/design-system drift → visual/motion inconsistencies → code/asset cleanup.

**distill** — Strip to essence. Remove complexity, side channels, decoration that does not carry weight. Reduce until removing anything else would lose function or clarity. The opposite of bolder.

**harden** — Production-ready: error handling, i18n, text overflow, edge cases, permission states, degraded modes. The surface that survives real use, not the happy-path demo.

**onboard** — Design first-run flows, empty states, activation paths, the zero-to-one experience. The first session is a designed surface, not a missing-state gap.

### Enhance

**animate** — Add purposeful animations and motion. One authored moment, not scattered effects and not one identical entrance on every section. Exponential ease-out from an already-visible default. Reach past transform and opacity: blur, backdrop-filter, clip-path, mask, shadow belong to the palette when they stay smooth. Motion conveys state, hierarchy, feedback, loading, reveal — nothing else.

**colorize** — Add strategic color to monochromatic UIs. One accent, saturation under 80% by default, the rest neutrals. Color carries meaning, not decoration. Don't add color to make something "pop" — add it to signal category, state, or status.

**typeset** — Improve typography hierarchy and fonts. Body measure 65-75ch, display max 6rem, tracking floor -0.04em, balanced headings, obvious scale and weight steps. Run the real copy at every breakpoint and fix what overflows. Serif as default is very discouraged; Fraunces and Instrument_Serif are banned as defaults.

**layout** — Fix spacing, rhythm, and visual hierarchy. Align to the project's grid and spacing scale; fix optical as well as mathematical alignment. Tight groups, generous separation, more space above a heading than below it. Cards are the lazy container; nested cards are always wrong.

**delight** — Add moments of joy and personality. Saved for moments, not pages. In Work mode, the same visual vocabulary screen to screen is a virtue; delight is the exception that earns its place.

**overdrive** — Push past conventional limits. Technically extraordinary effects, ambitious visual work, effects that feel like they shouldn't be possible on the web. Only when the brief earns it; overdrive on a vanilla brief is the AI default, not a choice.

### Fix

**clarify** — Improve UX copy, labels, and error messages. Controls name their action; errors name the problem and the recovery. The product's own language, not placeholder prose.

**adapt** — Adapt for different devices and screen sizes. Responsive behavior, breakpoint strategy, touch targets (min 44x44px), text scaling, orientation shifts. Name the target devices; don't pretend "mobile" is one thing.

**optimize** — Diagnose and fix UI performance. Layout thrash, expensive animations, unoptimized assets, bundle size, interaction latency, render cost. The goal is the devices the audience actually has, not a dev laptop.

### Iterate

**live** — Visual variant mode: pick elements in the browser, generate alternatives, compare side by side. Requires setup (dev server reachable, script injection working, config recorded). Not for every project; use when visual direction is the open question and the browser is the fastest feedback loop.

---

## The 3 Core Artifacts

### PACT.md — Product Truth (durable, slow-changing)

Captured by `init`. What the product is, who uses it, why it exists, what success means, what it can and cannot do, what voice and brand commitments are confirmed, what evidence is on hand. NOT visual direction, NOT visitor mode, NOT CTA sequence, NOT page concepts.

Schema:
- Platform (bare value: web, ios, android, adaptive)
- Stack (greenfield only: the user's answer; omit when existing code answers it)
- Users (primary users, their situation, their job)
- Product Purpose (what it does, why it exists, what success means)
- Positioning (the mechanism or claim a neighbor couldn't truthfully copy)
- Operating Context (workflows, environments, tools, documents, materials, rituals that are factual parts of using or evaluating the product)
- Capabilities and Constraints (confirmed functionality, technical constraints, terminology, explicitly undecided facts)
- Brand Commitments (existing name, voice, assets, personality, identity constraints, references the user made binding — omit when none)
- Evidence on Hand (real content, data, demos, testimonials, case studies, press, assets — with paths; state absences future work must not fabricate)
- Product Principles (three to five durable strategic principles from confirmed answers — no visual recipes)
- Accessibility & Inclusion (known user needs or required standard — omit when none established)

### SURFACE.md — Visual Design System (per surface, faster-changing)

The durable visual decisions for one surface or one product's visual world. Tokens, theme, typography, color, spacing scale, components, patterns, assets, motion language. A surface brief inherits from PACT.md and SURFACE.md; a component or feature inside an established surface inherits that surface — never turn a local addition into a new identity exercise.

A missing SURFACE.md does not erase a coherent identity already in code. Document that identity instead of inventing a replacement. Redesign replaces SURFACE.md; refinement works against it.

### Surface Brief — Per-page/per-component strategy

Inherits from PACT.md (product truth) and SURFACE.md (visual system). Carries what's specific to this route or artifact: visitor mode, job and audience, outcome and proof, selected direction, scope and boundaries, states and ranges, interaction and layout intent, constraints and open decisions. The brief wins — pinned aesthetics, era, material, font, palette from the brief override the quality floor. Redirecting a clear brief toward your taste is failure.

---

## Setup Flow

1. **Resolve the base directory.** The skill's scripts resolve relative to the loaded base directory the runtime reports. Keep cwd at the user's project. When the runtime reports no base directory, fall back to the skill's own scripts directory.

2. **Run the context loader once per session** against a named source file or route (`--target <path>`). It loads PACT.md, SURFACE.md, the matching surface brief, and native-platform guidance when applicable. Follow its directives. Do not rerun it after product truth is settled.

3. **Before acting, load the one reference that owns the request.** The Commands table above names the reference for each command. For a new surface or replacement visual world, load the new-work reference. For editing UI after direction is settled, load the quality-floor reference immediately before editing — it carries the quality floor, the absolute bans, and the reflexes no detector catches. Do not load it for planning-only work.

4. **After analysis and direction are resolved, build against the brief.** The brief is the authority. The quality floor is the floor. The detector is evidence. The rendered experience is the final test.

---

## Quality Floor — Absolute Bans and Checkpoints

Load this after direction is settled, immediately before editing UI. Build without announcing the checklist. A pinned brief or the committed visual world overrides anything here; your own habit does not.

### Checkpoints — verify on the built result, not as intention

Run these together in batched inspection rounds; they share one render:

- **Contrast:** body and placeholder text at least 4.5:1; large text at least 3:1. On colored surfaces, tint secondary text from that hue or the foreground; never reach for gray.
- **Depth:** shadows carry an offset and a soft blur. A zero-offset colored halo is decoration, not depth.
- **Spacing:** tight groups, generous separation, more space above a heading than below it. Read the computed values; don't eyeball.
- **Type:** body measure 65-75ch; display max 6rem; tracking floor -0.04em; balanced headings; obvious scale and weight steps. Run the real copy at every breakpoint and fix what overflows.
- **Motion:** one authored moment, not scattered effects and not one identical entrance on every section. Exponential ease-out from an already-visible default. Reach past transform and opacity — blur, backdrop-filter, clip-path, mask, and shadow belong to the palette when they stay smooth.
- **States:** hover, disabled, loading, error, empty, plus real content, working controls, responsive composition, keyboard focus. A surface that only renders the happy path is not done.
- **Browser surfaces:** the parts you did not draw still carry the design. Text selection, the caret, custom scrollbars, focus rings, underline offset, and the numerals in tabular data all ship with browser defaults that belong to no design system. Theme them from the palette. This is the cheapest signal that a page was built rather than assembled, and the one models skip most reliably.
- **Copy:** the product's own language. Controls name their action; errors name the problem and the recovery.
- **Coverage:** every brief requirement present and findable within seconds.

### Absolute bans — the category's defaults, reached for only when the brief earns them

**Page scaffolds:**
- Same-size cards of icon plus heading plus text as the page structure. Cards are the lazy container; nested cards are always wrong.
- The hero-metric template: big number, small label, supporting stats, accent. This is the AI default landing page; it reads as assembled, not designed.
- A kicker or eyebrow above a heading. **This one is a ban, not a default: no brief earns it back.** The heading carries its own weight; delete the label and let the heading speak.
- Section numbers (01 / 02 / 03) unless the sequence itself carries information the reader needs.
- A modal for a task that needs neither interruption nor protected focus.

**Surface habits:**
- Gradient text. Emphasis comes from weight or size.
- Glass and blur as decoration. It earns its place only when the brief is genuinely glass/blur as material, not as a way to avoid choosing a background.
- Inter as the default font. Pick a different neutral first. Inter is acceptable when the user explicitly asks for a neutral/standard feel or the brief is public-sector/accessibility-first.
- Serifs as the default font for any project. "It feels creative/premium/editorial" is not a reason. Serif only when one of: the brand brief literally names a serif, or the aesthetic family is genuinely editorial/luxury/publication/heritage/vintage AND you can articulate why this specific serif fits.
- Fraunces and Instrument_Serif as defaults. These two are the LLM-favorite display serifs; they are banned as defaults.

**Emphasis discipline:**
- When you want to emphasize a word within a headline, use italic or bold of the SAME font. Do not inject a random serif word into a sans headline (or vice versa) just to add visual interest. Mixed-family emphasis is amateur.

**Color discipline:**
- One accent color per project, saturation under 80% by default. The rest neutrals.
- No pure black and no pure white — use off-black and off-white. Pure values kill depth.
- The AI purple/blue glow aesthetic is the default to reach past, not the default to use. No automatic purple button glows, no random neon gradients. Use neutral bases with high-contrast singular accents.
- Premium-consumer briefs (cookware, wellness, artisan, luxury, heritage craft, DTC home goods) default to warm beige/cream + brass/clay/oxblood/ochre + espresso/ink. This palette is banned as the default reach. Pick a different family: cold luxury (silver-grey + chrome + smoke), forest (deep green + bone + amber accent), black and tan, cobalt + cream, terracotta + slate, olive + brick + paper, or pure monochrome + single saturated pop.

**Layout discipline:**
- Centered hero / H1 sections are the default to reach past when the mode and variance allow asymmetry. Force split screen, left-aligned content / right-aligned asset, asymmetric whitespace, or scroll-pinned structures.
- No 3-column equal feature cards. The generic three-identical-cards row is banned. Use 2-column zig-zag, asymmetric grid, scroll-pinned, or horizontal-scroll alternative.
- Hero top padding max 6rem at desktop. More than that floats the hero content halfway down the viewport and reads as a layout bug.
- Hero stack: max 4 text elements — eyebrow OR brand strip OR neither (pick zero or one), headline (max 2 lines), subtext (max 20 words, max 4 lines), CTAs (1 primary + max 1 secondary). Banned in hero: tiny tagline below CTAs, trust micro-strip, pricing teaser, feature bullet list, social-proof avatar row.
- Eyebrow restraint: max 1 eyebrow per 3 sections. Hero counts as 1. Count instances of uppercase tracking micro-labels across all section components — if count exceeds ceil(sectionCount / 3), the output fails.
- Split-header ban: "left big headline + right small explainer paragraph" as a section header is banned as default. If you genuinely need both, stack them vertically (headline on top, body below, max-width 65ch).
- Zigzag alternation cap: max 2 consecutive sections with the same image+text-split layout. The 3rd consecutive one fails.
- Section-layout repetition: once you use a layout family for a section, that family appears at most ONCE on the page. A landing page with 8 sections uses at least 4 different layout families.

**No duplicate CTA intent:** no two CTAs with the same intent on one page ("Get in touch" + "Let's talk" both present = fail).

**Logo wall = logo only:** no industry/category labels printed below logos. Use real SVG logos (Simple Icons, devicon) or generated SVG marks, not plain text wordmarks.

**Quotes ≤ 3 lines** of body. Attribution: name + role + optionally company. Never name only. Use real typographic quotes or none at all — not straight ASCII quotes.

**No version footers** (v1.4.2, Build 0048) on marketing pages. No micro-meta sentences under eyebrows. No decoration text strip at hero bottom. No floating top-right sub-text in section headings. No scroll cues. No section-numbering eyebrows. No decorative dots. No photo-credit captions as decoration.

**Long lists need a different UI component, not a longer list.** Above 5 items, reach for a 2-column split, card grid with image+label, tabs/accordion if categorizable, horizontal scroll-snap pills, marquee for breadth-heavy lists, carousel, or a different page entirely. A 20-row publication table or a 30-row award list on a marketing page is the wrong layout.

**Spec sheets (cookware/hardware/apparel/artisan-goods briefs):** a long product specification table with a border on every row is the AI default and is banned. Use a 2-column card grid, scroll-snap horizontal pills, grouped chunks (3 logical clusters), or featured-vs-rest (3-4 hero specs as large display tiles, rest collapsed under "View full specifications").

**Page theme lock:** ONE theme per page (light, dark, or auto). Sections do not invert. No light-mode-warm-paper section sandwiched between dark sections or vice versa. Section-level background tints within the same family are fine; flipping to a different hue mid-page is broken.

**CTA button wrap ban:** button text MUST fit on one line at desktop. If a label like "VIEW SELECTED WORK" wraps to 2 or 3 lines, the button is broken. Fix by shortening the label (3 words max for primary CTAs, ideally 1-2) OR widening the button.

**Button contrast check:** before shipping any button, verify the button text is readable against the button background. White button + white text, transparent button against the page background with no border — all banned. Audit every CTA against WCAG AA (4.5:1 for body, 3:1 for large text 18px+).

**Form discipline:** label ABOVE input. Helper text optional but present in markup. Error text BELOW input. Standard spacing for input blocks. No placeholder-as-label. Ever.

**Motion claimed = motion shown:** if the brief asks for motion and the page is static, the output fails. Reach past transform and opacity — blur, backdrop-filter, clip-path, mask, shadow — when they stay smooth.

**Real images, real logos, real screenshots:** div-based fake screenshots are banned. A hand-built product preview rendered with div rectangles, fake task lists, fake dashboards, fake terminal windows is a tell. Use a real screenshot URL, generate one via an image tool, use a real component preview, or skip the preview entirely. Hero needs a real visual; text + gradient blob is a placeholder.

**No AI tells in content:** no "Jane Doe," no "Acme Corp," no "Quietly in use at leading companies" — these are placeholders that read as AI-generated. Use the product's real names or leave a labeled placeholder.

---

## The Anti-Pattern Detector Rules (rewritten)

Impeccable ships 61 deterministic rules run by the CLI and browser extension with no LLM and no API key. This skill captures the rule categories and the tells they catch. The full rule set with code is in the upstream detector; this is the craft-knowledge distillation.

### Typography tells
- Inter used as the only font on every surface without a stated reason.
- Serif font used as the default without a brand or aesthetic justification (and specifically Fraunces or Instrument_Serif as the default display serif).
- Mixed-family emphasis: a serif word injected into a sans headline (or vice versa) just to create visual interest.
- No obvious scale or weight steps between heading levels; headings feel same-sized.
- Body text wider than 75ch or display type over 6rem without a reason.
- Tracking too loose on headings (more than -0.04em) or too tight on body.
- Text overflows its container at a breakpoint and is not fixed.

### Color tells
- Purple-to-blue gradient as the default background or button treatment.
- Inter + slate-900/gray as the entire palette with no accent.
- Gray text on a colored background (tint from the hue or the foreground instead).
- More than one accent color competing across a page.
- Pure black (#000000) or pure white (#ffffff) as the only surface values.
- Premium-consumer brief using the default warm beige/cream + brass/clay/oxblood/espresso family.
- A colored button whose text is the same color as the background (white on white, etc.).

### Layout tells
- Three equal feature cards as the page structure.
- Same-size cards of icon + heading + text as the dominant page scaffold.
- Hero-metric template: big number, small label, supporting stats, accent.
- Kicker/eyebrow above every heading.
- Section numbers (01/02/03) on every section without a sequential reason.
- Centered hero on every page with no asymmetry.
- Zigzag image+text split on 3+ consecutive sections.
- Modal for a task that doesn't need interruption or protected focus.

### Structural tells
- Nested cards (a card inside a card).
- Cards used where spacing or borders would do.
- Div-based fake screenshots: hand-built product previews with div rectangles, fake task lists, fake dashboards, fake terminal windows.
- Plain-text wordmarks in a logo wall instead of real SVG logos.
- A page whose structure is interchangeable with an unrelated product — swap the logo and nothing else changes.
- No visual distinction between sections; the page reads as one long scroll of identical blocks.

### Content tells
- "Jane Doe," "Acme Corp," "Quietly in use at leading companies" — placeholder names and fabricated social proof.
- Quotes with no attribution or attribution that's name-only.
- Version footers (v1.4.2, Build 0048) on marketing pages.
- Micro-meta sentences under eyebrows ("Crafting the future of...").
- Decoration text strips at hero bottom (BRAND. MOTION. SPATIAL.).
- Photo-credit captions as decoration (Field study no. 12 · Ines Caetano).
- Fake-precise specs without justification (weight: 12.7oz, dimensions: 14.3 × 9.8 × 2.1).
- 20-row data tables or 30-row award lists on a marketing page.

### Motion tells
- Identical entrance animation on every section.
- Motion on every element with no authored moment.
- Ease-in or linear on entrance; no exponential ease-out from an already-visible default.
- Animated elements that don't stay smooth (layout thrash, forced reflow).
- Motion that conveys nothing — no state change, no hierarchy, no feedback, no loading, no reveal.

### Browser-surface tells (the cheapest signal of assembled vs. built)
- Default text selection color (blue on light) unchanged.
- Default caret color unchanged.
- Default scrollbar unchanged.
- Default focus rings unchanged (browser-default outline on a custom-styled control).
- Default underline offset on links unchanged.
- Tabular numerals in data tables using the browser default instead of tabular-nums.

---

## Critique — Dual-Assessment UX Review

Purpose: resolve one stable target, run two independent assessments, synthesize a design critique, persist a snapshot, ask what to improve next. The chat response is the primary deliverable; the snapshot is an archive for future commands.

### Hard invariants
- Assessment A (design review) and Assessment B (detector/browser evidence) are BOTH required.
- Assessment A and B MUST run as two isolated sub-agents when a sub-agent/Task tool is exposed. Inline is NOT permitted; it is a degraded run. Inline is allowed ONLY when no sub-agent tool exists or the user declined on a harness that asks.
- If you degrade for any reason, the report's first line MUST be a banner: `⚠️ DEGRADED: single-context (reason)`. A silent degraded critique is a failed critique.
- Assessment A must finish before detector findings enter the parent synthesis context. Detector output is deterministic but still anchors judgment.
- A skipped detector is a failed critique run unless the detector is missing or crashes after a real attempt.
- Viewable targets require browser inspection when available.
- Any local server started only for critique visualization must run in the background, have a recorded stop method, and be stopped before final reporting unless the user asks to keep it.
- Do not claim a user-visible overlay exists unless script injection succeeded and the detector ran in the page.
- The question is the LAST thing in the response. Write the entire report first, then ask; nothing follows the question. Prose emitted after a structured question is withheld until the user answers it.
- A run that ends with neither the targeted questions nor a literal `Questions skipped:` line is an incomplete run.

### Setup
1. Resolve the target to a concrete file path or URL. Prefer a source path over a dev-server URL when both identify the same surface; ports drift, paths do not.
2. Confirm the target slugs cleanly via the critique storage tool. Every later command accepts the resolved target directly and derives the same slug internally; never hand-write a slug. If slug confirmation exits non-zero, skip persistence and trend for this run but continue the critique.
3. Read the critique ignore file if it exists. Drop matching findings silently; it is the only prior-run input critique consumes.

### Assessment A — Design review
Evaluate the target against the visitor mode and the brief:
- **Hierarchy:** is the primary action or content obvious within seconds? Does the eye land where it should?
- **Clarity:** does the surface communicate what it is and what to do without explanation?
- **Emotional resonance:** does the surface feel like a designed thing or an assembled thing? Does it earn the visitor's attention?
- **Visitor success:** can the visitor accomplish the job the mode requires?
- **Consistency:** does the surface live inside the committed visual world, or does it feel pasted on?
- **States:** are loading, empty, error, success, disabled, and permission states designed, not absent?
- **Responsive:** does the surface hold up at the target sizes?

### Assessment B — Detector/browser evidence
Run the deterministic detector rules against the target. Each finding is evidence, not a verdict. Verify each finding in context — a rule firing on a deliberate brief choice is not a defect. Browser inspection confirms what the detector can't see (motion quality, interaction feel, real-content fit).

### Synthesis
Combine A and B into a single critique. Lead with the visitor-mode assessment; anchor with detector evidence; name the systemic patterns (not just one-off findings); end with the question. The question is the last thing.

---

## Audit — Five-Dimension Technical Scan

Run systematic technical quality checks. This is a code-level audit, not a design critique. Check what's measurable and verifiable in the implementation. Never fix issues — document them for other commands to address. Web only; native platforms route to the native audit reference.

### Five dimensions, each scored 0-4

**1. Accessibility (A11y)**
- Contrast: text contrast ratios below 4.5:1 (below 7:1 for AAA).
- Missing ARIA: interactive elements without proper roles, labels, or states.
- Keyboard navigation: missing focus indicators, illogical tab order, keyboard traps.
- Semantic HTML: improper heading hierarchy, missing landmarks, divs used as buttons.
- Alt text: missing or poor image descriptions.
- Score 0 = inaccessible (fails WCAG A), 1 = major gaps, 2 = partial, 3 = good (WCAG AA mostly met), 4 = excellent (AA fully met, approaches AAA).

**2. Performance**
- Asset size and format, render cost, bundle size, interaction latency, layout thrash, animation cost, lazy loading, resource hints.
- Score 0 = severe issues, 1 = major problems, 2 = partial, 3 = good, 4 = excellent (fast, lean, well-optimized).

**3. Theming & Consistency**
- Token usage: hard-coded colors in components where tokens exist.
- Visual drift: components that don't share the system's spacing, type, color, or motion.
- Component consistency: same button shape, same form-control vocabulary, same icon style across the surface.
- Score 0 = no system, 1 = major drift, 2 = partial, 3 = good, 4 = excellent (one coherent system).

**4. Responsive Design**
- Fixed widths that break on mobile.
- Touch targets below 44x44px.
- Horizontal scroll from content overflow on narrow viewports.
- Layouts that break when text size increases.
- Missing breakpoints or mobile/tablet variants.
- Score 0 = broken on mobile, 1 = major gaps, 2 = partial, 3 = good, 4 = excellent (holds up at all target sizes).

**5. Implementation Integrity (critical)**
- Run the detector and verify each finding in context.
- Look for repeated implementation shortcuts, design-system drift, misleading or decorative content, and structure that is interchangeable with an unrelated product.
- Score 0 = no integrity, 1 = major shortcuts, 2 = partial, 3 = good, 4 = excellent (clean, system-aligned, honest content).

### Report structure
- **Executive summary:** audit health score (total /20), rating band, total issues by severity (P0/P1/P2/P3), top 3-5 critical issues, recommended next steps.
- **Detailed findings by severity:**
  - P0 Blocking — prevents task completion. Fix immediately.
  - P1 Major — significant difficulty or WCAG AA violation. Fix before release.
  - P2 Minor — annoyance, workaround exists. Fix in next pass.
  - P3 Polish — nice-to-fix, no real user impact. Fix if time permits.
  - For each: name, location (component/file/line), category, impact (why it matters), standard if applicable, recommendation, and suggested command.
- **Patterns and systemic issues:** recurring problems that indicate systemic gaps (e.g., "hard-coded colors in 15+ components — should use design tokens," "touch targets consistently below 44px throughout mobile").
- **Recommended actions:** map findings to the most appropriate command from the 20-command list. End with polish as the final step if any fixes were recommended.

After presenting the summary, tell the user they can ask to run the recommended commands one at a time, all at once, or in any order.

### What audit never does
- Report issues without explaining impact.
- Provide generic recommendations — be specific and actionable.
- Skip positive findings — celebrate what works.
- Forget to prioritize — everything can't be P0.
- Report false positives without verification.

---

## Shape — Discovery to Brief

Plan UX/UI before writing code. Three phases.

### Phase 1: Discovery interview
Ask what the surface carries and what it must survive:
- What real content, evidence, data, and assets must the experience carry? What are realistic minimum, typical, and maximum ranges?
- Which states and transitions matter: first-run, empty, loading, error, success, permissions, overflow, expert use?
- What is the visitor mode, and what does success look like for this visitor on this surface?
- What must remain untouched (product truth, content, function, constraints, explicit brand commitments)?
- What would make a polished result feel wrong?

### Phase 2: Resolve the design direction
For new surfaces, brand expansion, or replacement, follow the new-work flow: establish visual authority, run a world workshop if the world is open, choose a concept. For an extension of an existing surface, inherit the world and resolve only the new purpose, content, hierarchy, states, interaction, and how the addition joins the surrounding experience. No concept tournament for an extension; no SURFACE.md change unless the user approves a durable system change.

### Phase 3: Write the brief
The brief is the artifact that hands off to build. It carries:
1. **Job and audience:** who arrives, their context, need, and visitor mode.
2. **Outcome and proof:** primary task/action, success, real evidence, product-specific truth.
3. **Selected direction:** visual authority, structural/interaction thesis, sequence, focal moment, implementation consequence.
4. **Scope and boundaries:** fidelity, breadth, interactivity, named target, what remains untouched, explicit anti-goals.
5. **States and ranges:** realistic content/data ranges and material states.
6. **Interaction and layout:** hierarchy, topology, responsiveness, affordances, feedback, transitions — intent, not CSS values.
7. **Constraints and open decisions:** platform, delivery, accessibility, localization, reusable components, and choices a builder must not invent.

The brief is confirmed before build starts. A builder who inherits a brief does not re-interview; they build against it.

---

## Init — Product Truth Capture

One-time per project. Captures durable product truth in PACT.md. Does NOT invent a visual world and does NOT write SURFACE.md.

### Step 1: Load current state
Use the PACT.md path resolved by the context loader. Update it instead of creating a competing authority. In a child app inheriting root context, confirm shared versus app-specific scope before writing.
- No PACT.md: explore, interview, and write it.
- PACT.md exists: ask what product knowledge is stale or missing; do not reopen confirmed fields without a reason.
- Legacy PACT.md: add only durable missing facts; absent Platform means web unless evidence says otherwise.
- Only SURFACE.md exists: leave it untouched and create PACT.md.
- Redesign/rebrand request: preserve confirmed product truth unless the user changes it. Visual replacement happens in new-work, not here.
Never silently overwrite an existing file or offer SURFACE.md during init.

### Step 2: Explore the project
Before asking, scan enough to avoid making the user repeat known facts: product docs and copy; package/config and app boundaries; features, workflows, routes, and roles; names, logos, legal/proof assets, and brand commitments; platform/accessibility signals; the dev command/entry when live mode applies. Treat repository evidence as a hypothesis, not user approval. Note visual maturity without documenting, extending, or replacing the world. Form a platform hypothesis: web, ios, android, or adaptive. Mobile web remains web; a native wrapper around a website does not make its design language native.

### Step 3: Interview for product truth
Ask the user directly to clarify what you cannot infer. Ask only about material gaps the repository and original request do not answer with strong evidence. Keep rounds to at most three focused questions and require one real answer or approval round before writing a new PACT.md. Confirm inferences. Whether anyone can answer is a mechanical test, not a judgment call.

### Step 4: Write PACT.md
Write the schema from the 3 Core Artifacts section above. Platform is the bare value (web, ios, android, adaptive). Preserve useful legacy headings. Copy the version comment verbatim including when updating an older file. New files go at the project root; otherwise update the resolved file.

### Step 5: Record workflow defaults
Record the image-generation availability answer and the build-path preference (comp or code) in the config, merging with keys already there. These are workflow settings, not product truth — they never join PACT.md. A value already recorded is a confirmed answer; on re-run, honor it in silence rather than asking again. Then configure live mode when useful: skip native or non-runnable projects and leave existing config untouched.

### Step 6: Wrap up or resume
- Empty or early project: ask naturally for the surface to be built, or use shape when the user wants a confirmed brief without implementation.
- Existing coherent interface without SURFACE.md: run document if the user wants the incumbent system recorded.
- Existing surface needing work: name the most relevant scoped command.
- Web project ready for visual iteration: run live when configured.
If init was invoked by another request, resume without rerunning the context loader.

---

## New Work — Creating or Replacing a Visual World

Use this flow for a new surface or a replacement visual identity. PACT.md owns product truth. SURFACE.md owns durable visual decisions. A surface brief keeps strategy that belongs to one route or artifact. Complete init first when PACT.md is missing; a missing SURFACE.md does not route back to init.

### 1. Decide what is already true
Read SURFACE.md, representative code, tokens, components, and assets.
- **Redesign:** preserve product truth, content, function, constraints, and explicit brand commitments; replace the old visual world rather than polishing it. The old look is evidence of what the subject is, not authority over what it becomes.
- **Established world:** inherit it. A missing SURFACE.md does not erase a coherent identity already in code; document that identity instead of inventing a replacement.
- **Incomplete brand:** preserve confirmed assets and recognizable traits, then expand the system with the user for this surface.
- **No visual authority:** create a new world with the user.
A section, component, feature, or state inside an established surface inherits that surface. Never turn a local addition into a new identity exercise.

### 2. Ask what will change the work
Ask one round of two or three related questions. Skip settled facts; a precise request may need only a compact confirmation.
- **Convert:** who must act, what they should believe, which real proof, content, or assets earn that belief.
- **Work:** the task, information, important states, frequency, constraints.
- **Comprehend:** the reader's question, source material, structure, wayfinding.
- **Experience:** what leads, how exploration unfolds, which interaction or transition matters.
Across modes, ask what success looks like, what must remain untouched, and what would make a polished result feel wrong. Never ask for CSS values or canned aesthetic lanes.

### 3. Choose the right amount of invention
- **Extend an existing surface:** inherit its world and composition. Resolve only the new purpose, content, hierarchy, states, interaction, and how the addition joins the surrounding experience. No concept tournament, and no SURFACE.md change unless the user approves a durable system change.
- **Create a whole surface inside an established world:** keep the visual system fixed. Derive five to seven materially different structures from the content, task, and user behavior, ordered by resonance. For a genuinely open whole page, screen, or flow, run the concept-seed tool — it deals three structures, the dice pick which three reach the user, breaking the ranking rut while the user keeps a real choice. Present them as full cards of equal salience, the dealt lead under a kicker. The user locks one. No canon card and no pick card at surface scope: the world is settled, so every card is a real option.
- **Replace a visual world:** the old world is evidence, not authority. Establish the new world with the user, document it in SURFACE.md, and build against it. Never split the difference into polish on the discarded look.

---

## Operate & Read Depth

### Operate mode (Work) — design serves the product

When the visitor is in a task: app UIs, admin dashboards, settings panels, data tables, tools, authenticated surfaces. The essentials live in the quality floor; this is extended depth.

**Color:** product defaults to Restrained. A single surface can earn Committed (a dashboard where one category color carries a report, an onboarding flow with a drenched welcome screen), but Restrained is the floor. One accent, saturation under 80%, the rest neutrals. A second neutral layer for sidebars, toolbars, and panels (slightly cooler or warmer than the content surface).

**Typography:** body measure 65-75ch; headings obvious scale and weight steps; tabular-nums for data. Run real copy at every breakpoint.

**Components:** skeleton states for loading, not spinners in the middle of content. Empty states that teach the interface, not "nothing here." Consistent affordances across the surface — same button shape, same form-control vocabulary, same icon style. Overlays escape their container.

**Motion:** 150-250ms on most transitions. Users are in flow; don't make them wait for choreography. Motion conveys state, not decoration — state change, feedback, loading, reveal: nothing else. No orchestrated page-load sequences. Product loads into a task; users don't want to watch it load.

**Product permissions:** the same visual vocabulary screen to screen is a virtue; delight is saved for moments, not pages.

### Read mode (Comprehend) — structure for comprehension

Docs, guides, long-form. Take the Read mode from the modes section plus these rules:
- Prose measure 65-75ch. Wider measure kills comprehension for long-form.
- Hierarchy through type scale and weight, not color or decoration.
- Navigation that orients the reader: table of contents, section anchors, clear back-paths.
- Wayfinding over visual novelty. A docs index is Read, not Convert, even if it belongs to a Convert product.
- Consistency across the documentation surface matters more than variety.

---

## Source Attribution

All craft knowledge in this skill is reverse-engineered from **pbakaus/impeccable** (github.com/pbakaus/impeccable), Apache 2.0 license, by Paul Bakaus. The upstream includes a Rust engine, a CLI (`npx impeccable`), a browser extension (popup, DevTools panel, sidebar), 16 agent-runtime provider directories, 61 deterministic detector rules, an oracle test harness, and 23 commands with dedicated reference files.

This skill is a V4TIME consolidation — restructured into one SKILL.md, renamed (craft-director vs impeccable), commands renamed (shape/init/document/extract/critique/audit/polish/distill/harden/onboard/animate/colorize/typeset/layout/delight/overdrive/clarify/adapt/optimize/live vs the upstream set), modes renamed (Convert/Work/Comprehend/Experience vs Persuade/Operate/Read/Experience), the 3 core artifacts renamed (PACT.md/SURFACE.md/surface brief vs PRODUCT.md/DESIGN.md/surface brief), and explanations rewritten for roughly half the content. Upstream credit and license are retained. For the full original — engine, detector code, live-mode browser iteration, per-runtime provider packs, and all reference files — install upstream via `npx impeccable install`.
