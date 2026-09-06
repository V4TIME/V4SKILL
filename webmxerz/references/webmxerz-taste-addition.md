## 16. Design Taste System — Three Dials (from taste-skill)

Before generating any UI, infer what the user actually wants. Most AI design output is bad because the model jumps to a default aesthetic instead of reading the room. Set three dials after the design read. Every layout, motion, and density decision below is gated by these.

### 16.A The Three Dials

- **DESIGN_VARIANCE: 8** — 1 = Perfect Symmetry, 10 = Artsy Chaos. Controls layout asymmetry, grid tension, whitespace drama.
- **MOTION_INTENSITY: 6** — 1 = Static, 10 = Cinematic / Physics. Controls scroll reveals, hover physics, micro-interactions.
- **VISUAL_DENSITY: 4** — 1 = Art Gallery / Airy, 10 = Cockpit / Packed Data. Controls section padding, card usage, typography spacing.

**Baseline:** 8 / 6 / 4. Use these unless the design read overrides them.

### 16.B Dial Inference

| Signal | VARIANCE | MOTION | DENSITY |
|---|---|---|---|
| "minimalist / clean / calm / editorial / Linear-style" | 5-6 | 3-4 | 2-3 |
| "premium consumer / Apple-y / luxury / brand" | 7-8 | 5-7 | 3-4 |
| "playful / wild / Dribbble / Awwwards / experimental / agency" | 9-10 | 8-10 | 3-4 |
| "landing page / portfolio / marketing site (default)" | 7-9 | 6-8 | 3-5 |
| "trust-first / public-sector / regulated / accessibility-critical" | 3-4 | 2-3 | 4-5 |
| "redesign - preserve" | match existing | +1 | match existing |
| "redesign - overhaul" | +2 | +2 | match existing |

### 16.C Before Any Code — One-Line Design Read

State in one line: **"Reading this as: \<page kind> for \<audience>, with a \<vibe> language, leaning toward \<design system or aesthetic family>."**

Examples:
- "Reading this as: B2B SaaS landing for technical buyers, with a Linear-style minimalist language, leaning toward Tailwind utilities + Geist + restrained motion."
- "Reading this as: solo designer portfolio for hiring managers, with an editorial / kinetic-type language, leaning toward native CSS + scroll-driven animation + custom typography."

If the brief is ambiguous, ask exactly **one** clarifying question — never a multi-question dump.

### 16.D Anti-Default Discipline

Do not default to: AI-purple gradients, centered hero over dark mesh, three equal feature cards, generic glassmorphism on everything, infinite-loop micro-animations everywhere, Inter + slate-900. These are the LLM defaults. Reach past them deliberately based on the design read.

---

## 17. Anti-Slop Directives (from taste-skill)

### 17.A Typography

- **AVOID Inter as default.** Pick Geist, Outfit, Cabinet Grotesk, Satoshi, or a brand-appropriate serif first. Override: Inter is acceptable when the user explicitly asks for a neutral/standard/Linear-style feel, or the brief is public-sector/accessibility-first.
- **Serif is very discouraged as the default font for any project.** "It feels creative / premium / editorial" is NOT a reason to reach for serif. Serif only acceptable when ONE of: brand brief literally names a serif font, OR aesthetic family is genuinely editorial/luxury/publication/manuscript/heritage/vintage AND you can articulate why this specific serif fits.
- **Specifically BANNED as defaults:** Fraunces and Instrument_Serif (the two LLM-favorite display serifs).
- **Emphasis rule:** When you want to emphasize a word within a headline, use **italic or bold of the SAME font**. Do NOT inject a random serif word into a sans headline (or vice versa) just to add visual interest. Mixed-family emphasis is amateur.
- **Italic descender clearance (mandatory):** When italic is used in display type and the word contains a descender letter (`y g j p q`), use `leading-[1.1]` minimum and add `pb-1` or `mb-1` reserve on the wrapping element.

### 17.B Color Calibration

- **Max 1 accent color.** Saturation < 80% by default.
- **THE LILA RULE:** The "AI Purple / Blue glow" aesthetic is discouraged as a default. No automatic purple button glows, no random neon gradients. Use neutral bases (Zinc / Slate / Stone) with high-contrast singular accents (Emerald, Electric Blue, Deep Rose, Burnt Orange).
- **One palette per project.** Do not fluctuate between warm and cool grays within the same project.
- **COLOR CONSISTENCY LOCK (mandatory):** Once an accent color is chosen for a page, it is used on the WHOLE page.
- **PREMIUM-CONSUMER PALETTE BAN (mandatory):** For premium-consumer briefs (cookware, wellness, artisan, luxury, heritage craft, DTC home goods), the LLM default is warm beige/cream + brass/clay/oxblood/ochre + espresso/ink dark text. This palette is BANNED as the default reach. Default alternatives: Cold Luxury (silver-grey + chrome + smoke), Forest (deep green + bone + amber accent), Black and Tan, Cobalt + Cream, Terracotta + Slate, Olive + Brick + Paper, Pure monochrome + single saturated pop.
- **No pure `#000000` and no pure `#ffffff`** — use off-black (zinc-950) and off-white. Pure values kill depth.

### 17.C Layout Diversification

- **ANTI-CENTER BIAS:** Centered Hero / H1 sections are avoided when `DESIGN_VARIANCE > 4`. Force split screen (50/50), left-aligned content / right-aligned asset, asymmetric white-space, or scroll-pinned structures.
- **NO 3-column equal feature cards.** The generic "three identical cards horizontally" feature row is banned. Use 2-column zig-zag, asymmetric grid, scroll-pinned, or horizontal-scroll alternative.
- **HERO TOP PADDING CAP (mandatory):** Hero top padding max `pt-24` (approx 6rem) at desktop. More than that means the hero content floats halfway down the viewport and reads as a layout bug.
- **HERO STACK DISCIPLINE (max 4 text elements):** Hero = single moment, not a feature list. Allowed: 1) Eyebrow OR brand strip OR neither — pick zero or one, 2) Headline (max 2 lines), 3) Subtext (max 20 words, max 4 lines), 4) CTAs (1 primary + max 1 secondary). BANNED in hero: tiny tagline below CTAs, trust micro-strip, pricing teaser, feature bullet list, social-proof avatar row.
- **EYEBROW RESTRAINT (mandatory, #1 violated rule):** Maximum 1 eyebrow per 3 sections. Hero counts as 1. So a page with 9 sections may use at most 3 eyebrows total. If section A has an eyebrow, the next 2 sections cannot have one. **Pre-Flight Check is mechanical:** count instances of `uppercase tracking` across all section components. If count > ceil(sectionCount / 3), the output fails.
- **SPLIT-HEADER BAN (mandatory):** The pattern "left big headline + right small explainer paragraph" as a section header is **banned as default.** Sections should have ONE focused message. If you genuinely need both, stack them vertically (headline on top, body below, max-width 65ch).
- **ZIGZAG ALTERNATION CAP (mandatory):** Alternating "left-image + right-text" then "left-text + right-image" zigzag layout = banal. Max 2 sections in a row with this pattern. The 3rd consecutive one is a Pre-Flight Fail.
- **Section-Layout-Repetition Ban:** Once you use a layout family for a section, that family can appear at most ONCE on the page. A landing page with 8 sections must use at least 4 different layout families.

### 17.D Materiality, Shadows, Cards

- Use cards ONLY when elevation communicates real hierarchy. Otherwise group with `border-t`, `divide-y`, or negative space.
- When a shadow is used, tint it to the background hue. No pure-black drop shadows on light backgrounds.
- **SHAPE CONSISTENCY LOCK (mandatory):** Pick ONE corner-radius scale for the page and stick to it. Options: all-sharp (radius 0), all-soft (radius 12-16px), all-pill (full radius for interactive). Mixed systems are allowed only when there is a documented rule and that rule is followed everywhere.

### 17.E Interactive UI States

LLMs default to "static successful state only." Always implement full cycles:
- **Loading:** Skeletal loaders matching the final layout's shape. Avoid generic circular spinners.
- **Empty States:** Beautifully composed; indicate how to populate.
- **Error States:** Clear, inline (forms), or contextual (toasts only for transient).
- **Tactile Feedback:** On `:active`, use `-translate-y-[1px]` or `scale-[0.98]` to simulate a physical push.
- **BUTTON CONTRAST CHECK (mandatory, a11y):** Before shipping any button, verify the button text is readable against the button background. White button + white text, transparent button against the page background with no border → all banned. Audit every CTA: contrast ratio WCAG AA min (4.5:1 for body, 3:1 for large text 18px+).
- **CTA BUTTON WRAP BAN (mandatory):** Button text MUST fit on one line at desktop. If a label like "VIEW SELECTED WORK" wraps to 2 or 3 lines, the button is broken. Fix by EITHER shortening the label (3 words max for primary CTAs, ideally 1-2) OR widening the button.

### 17.F Data & Form Patterns

- Label ABOVE input. Helper text optional but present in markup. Error text BELOW input. Standard `gap-2` for input blocks.
- **NO placeholder-as-label. Ever.**
- **Long lists need a different UI component, not a longer list.** Default `<ul>` with bullets / `divide-y` rows is the lazy choice. If > 5 items, reach for: 2-column split with grouped items, card grid with image + label per item, tabs / accordion if categorisable, horizontal scroll-snap pills, carousel for breadth-heavy lists, marquee for lots-of-things.

### 17.G Content Density

- **Default content shape per section:** short headline (8 words max) + short sub-paragraph (25 words max) + one visual asset OR one CTA.
- **No data-dump sections.** A 20-row publication table, a 30-row award list, a giant pricing matrix on a marketing page = wrong layout. Use: top 3-5 highlights + "View full list" link, marquee/carousel for breadth, or a different page entirely.
- **Spec sheets specifically (the Marrow-cookware pattern):** A long product specification table with `border-b` on every row is the AI default for cookware/hardware/apparel/artisan-goods briefs. BANNED. Concrete alternatives: 2-col card grid, scroll-snap horizontal pills, grouped chunks (3 logical clusters), featured-vs-rest (3-4 hero specs as large display tiles, rest collapsed under "View full specifications").

### 17.H Page Theme Lock (Light / Dark Mode Consistency)

- The page has ONE theme. Sections do not invert. If the page is dark mode, ALL sections are dark mode. No light-mode-warm-paper section sandwiched between dark sections (or vice versa).
- Default behaviour: pick light, dark, or auto (`prefers-color-scheme`) at the page level and lock it. Section-level background tints within the same theme family are fine; flipping to `bg-amber-50` in the middle of a `bg-zinc-950` page is broken.

### 17.I Quotes & Testimonials

- **Max 3 lines** of quote body. Never 6. If the original quote is longer → cut it.
- Attribution: name + role + (optionally) company. Never name only ("- Sarah").
- Quote marks: use real typographic quotes (" ") or none at all. Not straight ASCII (" ").

### 17.J Image & Visual Asset Strategy

- **Priority order for visual assets:** 1) Image-generation tool first — if ANY image-gen tool is available, MUST use it to create section-specific assets. 2) Real web images second — `https://picsum.photos/seed/{descriptive-seed}/{w}/{h}` for placeholder photography, actual stock or brand URLs, open-license sources if explicitly allowed. 3) Last resort: tell the user — leave clearly-labeled placeholder slots.
- **Real company logos for social proof:** When the brief calls for a "Trusted by / Used by / Customers" logo wall, do NOT default to plain text wordmarks. Use real SVG logos: Simple Icons, devicon for tech-stack logos, or generate a simple monogram as inline SVG matching the page style.
- **Div-based fake screenshots are banned.** A "hand-built product preview" rendered with `<div>` rectangles, fake task lists, fake dashboards, fake terminal windows is a Tell. Use a real screenshot URL, generate one via image tool, use a real component preview, or skip the preview entirely.
- **Hero needs a real visual.** Text + gradient blob is not a hero — it's a placeholder.

---

## 18. EM-DASH BAN (the single most-violated Tell — from taste-skill)

**Em-dash (`—`) is COMPLETELY banned.** It is the LLM's signature stylistic crutch and it is the #1 visual Tell in production tests. There is no "limited use" allowance, no "natural language frequency" allowance, no "in body copy is fine" allowance. None.

- **Banned in headlines.** Use a period or a comma.
- **Banned in eyebrows / labels / pills / button text / image captions / nav items.** Replace with line breaks, columns, or hairlines.
- **Banned in body copy.** Restructure the sentence: two sentences with a period, OR a comma, OR parentheses, OR a colon.
- **Banned in quote attribution.** Use a normal hyphen with spaces (` - `) or a line break + smaller-weight name.
- **Banned in en-dash form too (`–`) when used as a separator.** Date ranges (`2018-2026`) use a hyphen. Number ranges (`€40-80k`) use a hyphen.

The ONLY permitted dash characters on the page are:
- Regular hyphen `-` (for compound words, ranges, line dividers in markup)
- Minus sign in math (`-5°C`)

If your output contains a single `—` or `–` anywhere visible to the user, the output fails the Pre-Flight Check and must be rewritten.

This rule is non-negotiable. The agent has historically ignored em-dash limits when phrased as "use sparingly." The phrasing here is binary: zero em-dashes.

---

## 19. Pre-Flight Check — Mechanical QA Matrix (from taste-skill)

Run this matrix before outputting code. This is the last filter. **THIS IS NOT OPTIONAL. Run every box. If any box fails, the output is not done.**

- [ ] **Brief inference** declared (one-line design read)?
- [ ] **Dial values** explicit and reasoned from the brief, not silently using baseline?
- [ ] **Design system** chosen from Section 2 if applicable, or aesthetic labeled honestly?
- [ ] **ZERO em-dashes (`—`) anywhere on the page.** Headlines, eyebrows, pills, body, quotes, attribution, captions, buttons, alt text. Zero. (Section 18 — non-negotiable.)
- [ ] **Page Theme Lock**: ONE theme (light, dark, or auto) for the whole page. No section flips to inverted mode mid-page.
- [ ] **Color Consistency Lock**: one accent color used identically across all sections?
- [ ] **Shape Consistency Lock**: one corner-radius system applied consistently?
- [ ] **Button Contrast Check**: every CTA text is readable against its background (no white-on-white, WCAG AA 4.5:1)?
- [ ] **CTA Button Wrap**: no CTA label wraps to 2+ lines at desktop?
- [ ] **Form Contrast Check**: form inputs, placeholders, focus rings, labels all pass WCAG AA against the section background?
- [ ] **Serif discipline**: if a serif is used, it is NOT Fraunces or Instrument_Serif (or it is, with explicit brand justification)? Different serif from your previous project?
- [ ] **Premium-consumer palette check**: if the brief is premium-consumer (cookware / wellness / artisan / luxury), the palette is NOT the AI-default beige+brass+oxblood+espresso family? Different family from your previous premium-consumer project?
- [ ] **Italic descender clearance**: every italic word with `y g j p q` has `leading-[1.1]` min + `pb-1` reserve?
- [ ] **Hero fits the viewport**: headline ≤ 2 lines, subtext ≤ 20 words AND ≤ 4 lines, CTA visible without scroll, font scale planned around image?
- [ ] **Hero top padding**: max `pt-24` at desktop, hero content does not float halfway down the viewport?
- [ ] **Hero stack discipline**: max 4 text elements in hero (eyebrow OR brand strip, headline, subtext, CTAs)? No tiny tagline below CTAs, no trust micro-strip in hero?
- [ ] **EYEBROW COUNT (mechanical)**: count instances of `uppercase tracking` micro-labels above section headlines across all components. Count ≤ ceil(sectionCount / 3)? Hero counts as 1.
- [ ] **Split-Header Ban**: no "left big headline + right small explainer paragraph" pattern as a section header (vertical stack instead)?
- [ ] **Zigzag Alternation Cap**: no 3+ consecutive sections with the same image+text-split layout?
- [ ] **No Duplicate CTA Intent**: no two CTAs with the same intent ("Get in touch" + "Let's talk" both on page = Fail)?
- [ ] **Logo wall = logo only**: no industry / category labels printed below logos?
- [ ] **Bento Background Diversity**: at least 2-3 bento cells have real visual variation (image, gradient, pattern), not all white-on-white text cards?
- [ ] **"Used by / Trusted by" logo wall** lives UNDER the hero, not inside it, uses REAL SVG logos (Simple Icons / devicon) or generated SVG marks, NOT plain text wordmarks?
- [ ] **Copy Self-Audit**: every visible string re-read, no grammatically-broken or AI-hallucinated phrases shipped?
- [ ] **Motion motivated**: every animation can be justified in one sentence (hierarchy / storytelling / feedback / state transition), no GSAP-for-show?
- [ ] **Marquee max-one-per-page**: no two horizontal marquees on the same page?
- [ ] **Navigation on ONE line** at desktop, height ≤ 80px?
- [ ] **Section-Layout-Repetition** check: no two sections share the same layout family (at least 4 different families across 8 sections)?
- [ ] **Bento has rhythm AND exact cell count** (N items → N cells, no empty cells in middle or at end)?
- [ ] **Long lists use the right UI component** (not default `<ul>` with `divide-y` for > 5 items)?
- [ ] **Real images used** (gen-tool first, then Picsum-seed, then explicit placeholder slots) — NO div-based fake screenshots, NO hand-rolled decorative SVGs, NO pure-text minimalism?
- [ ] **No pills/labels overlaid on images** (no `Plate · Brand`, no `Field notes - journal`)?
- [ ] **No photo-credit captions as decoration** (`Field study no. 12 · Ines Caetano`)?
- [ ] **No version footers** (`v1.4.2`, `Build 0048`) on marketing pages?
- [ ] **No micro-meta-sentences** under eyebrows?
- [ ] **No decoration text strip at hero bottom** (`BRAND. MOTION. SPATIAL.`)?
- [ ] **No floating top-right sub-text** in section headings?
- [ ] **No scoring/progress bars with filled background tracks** as comparison visuals?
- [ ] **No locale / city-name / time / weather strips** unless brief is genuinely globally-distributed or place-focused?
- [ ] **No scroll cues** (`Scroll`, `↓ scroll`, `Scroll to explore`)?
- [ ] **No version labels in hero** (V0.6, BETA, INVITEONLY) unless the brief is a launch?
- [ ] **No section-numbering eyebrows** (`00 / INDEX`, `001 · Capabilities`, `06 · how it works`)?
- [ ] **No decorative dots** (zero by default, only for real semantic state)?
- [ ] **No `border-t` + `border-b` on every row** of long lists / spec tables?
- [ ] **Content density** sane: no 20-row data tables, no fake-precise specs without justification, ≤ 25-word sub-paragraphs by default?
- [ ] **Quotes ≤ 3 lines** of body, attribution clean (no em-dash)?
- [ ] **Motion claimed = motion shown**: if `MOTION_INTENSITY > 4`, page actually animates, not just claimed?
- [ ] **Reduced motion** wrapped for everything `MOTION_INTENSITY > 3`?
- [ ] **Dark mode** tokens defined and tested in both modes?
- [ ] **Mobile collapse** explicit (`w-full`, `px-4`, `max-w-7xl mx-auto`) for high-variance layouts?
- [ ] **Viewport stability**: `min-h-[100dvh]`, never `h-screen`?
- [ ] **`useEffect` animations** have strict cleanup functions?
- [ ] **Empty / loading / error** states provided?
- [ ] **Cards omitted** in favor of spacing where possible?
- [ ] **Icons** from an allowed library only (Phosphor / HugeIcons / Radix / Tabler), no hand-rolled SVG paths?
- [ ] **Motion** isolated in client-leaf components with `'use client'` at the top, memoized?
- [ ] **No AI Tells** from Section 17 (Inter as default, AI-purple, three-equal cards, Jane Doe, Acme, "Quietly in use at")?
- [ ] **Core Web Vitals** plausibly hit (LCP < 2.5s, INP < 200ms, CLS < 0.1)?
- [ ] **One design system** per project (no Material + shadcn mixed)?

If a single checkbox cannot be honestly ticked, the page is not done. Fix it before delivering.

---

_Source: Leonxlnx/taste-skill (MIT License), github.com/Leonxlnx/taste-skill. Condensed from the full 1206-line SKILL.md — captures the Three Dials system, anti-slop directives, em-dash ban, and pre-flight QA matrix. For the complete original including canonical code skeletons (Sticky-Stack, Horizontal-Pan, RevealStagger), block library schema, and redesign protocol, see the upstream repo._
