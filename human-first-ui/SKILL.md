---
name: human-first-ui
description: 'Make web UIs look human-built, not like AI output.'
category: creative
---

# Human-First UI

Build interfaces that look like a person with taste made them — not a template dump, not an AI default. This skill encodes the design principles, anti-pattern checks, and tool workflows used when the user explicitly wants a UI that doesn't look AI-generated.

## When to use

- User says the UI "looks like it was made by ChatGPT" or "looks AI-generated"
- User wants a "minimal, premium, human" look
- User references Emil Kowalski, Impeccable, 21st.dev, webmxerz, or similar design-quality signals
- Building or reviewing any web UI where the look matters

## Core principles

### 1. No emoji icons
Emoji as icons is the #1 AI-generated tell. Use text labels, simple CSS shapes, or inline SVG. Emojis belong in content, not chrome.

### 2. No glow shadows on buttons
`box-shadow` with color glows (especially accent-colored) on interactive elements is a hallmark of AI-generated UI. Flat borders and hover state changes only.

### 3. No bounce / spring animations
Sliding dots, bouncing loaders, spring-scale hover effects — these are decoration, not function. Subtle hover transitions (120-150ms ease) are fine. Bounce is not.

### 4. No splash-screen welcome cards with icon tiles
A welcome screen should be simple text on the page, not a decorated card with icon tiles and hint boxes styled as feature cards.

### 5. Contrast first
On dark backgrounds, muted text still needs 4.5:1 contrast (WCAG AA). Common AI defaults like `#5a5a5a` on `#0d0d0d` fail badly. Test with Impeccable.

### 6. Body text floor: 14px minimum, 16px ideal
10-11px is for decorative micro-labels only (section headers, timestamps, footer status text with letter-spacing). Content-bearing text must be 12px+, and body text should be 14-16px.

### 7. Clear type hierarchy
Use fewer sizes with bigger gaps. Don't have 6 different font-size values when 3-4 well-separated steps would do. Aim for clear separation between label / secondary / body / heading sizes.

### 8. One accent color, warm preferred
A single warm accent (gold/amber) on a dark neutral background reads as intentional and premium. Purple/blue gradients are the AI default to avoid.

### 9. Mobile first
Design for the phone. Hamburger menus, overlay sidebars, large touch targets, readable text without zoom. Don't build desktop and squish it.

## Workflow

### Step 1: Check the skill library
Before building anything, check if `webmxerz` or `impeccable` is available:

```bash
# WebMXERZ (design intelligence: colors, typography, styles, UX patterns)
ls ~/tmp/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py 2>/dev/null && \
  python3 ~/tmp/webmxerz/src/webmxerz/scripts/search.py "<query>" --domain <style|typography|color|ux|product|...> -n 5

# If not cloned yet:
git clone https://github.com/nextlevelbuilder/webmxerz.git ~/tmp/webmxerz
```

**Preferred: use `--design-system` for a complete system in one pass** rather than per-domain searches:

```bash
# Full design system with design dials tuned for the project
python3 ~/tmp/webmxerz/src/webmxerz/scripts/search.py "<description>" \
  --design-system \
  --variance <1-10> \
  --motion <1-10> \
  --density <1-10> \
  -p <project-slug> \
  -n 5
```

**Persist for multi-page projects:**

```bash
# Save MASTER.md (and optionally a page override)
python3 ~/tmp/webmxerz/src/webmxerz/scripts/search.py "<query>" \
  --design-system -p <project> --persist -o <project-dir> [--page <page-name>]
```

Then when working on a specific page, check `design-system/<project>/pages/<page>.md` first — its rules override `design-system/<project>/MASTER.md`.

### Step 2: Search for design direction

```bash
# Find a style that matches what the user wants
python3 ~/tmp/webmxerz/src/webmxerz/scripts/search.py "<description>" --domain style -n 3

# Find typography
python3 ~/tmp/webmxerz/src/webmxerz/scripts/search.py "<mood>" --domain typography -n 3

# Find a color palette for the product type
python3 ~/tmp/webmxerz/src/webmxerz/scripts/search.py "<product type>" --domain color -n 3

# Find UX patterns
python3 ~/tmp/webmxerz/src/webmxerz/scripts/search.py "<pattern>" --domain ux -n 5
```

Adapt the results to the actual stack. If the project is plain HTML/CSS/JS (not React/Tailwind), extract the design principles (colors, fonts, spacing, patterns) and implement in plain CSS. Do NOT copy React component code.

### Step 3: Build with the principles

- Pick ONE style from the search results that matches the user's taste
- Pick ONE font pairing
- Pick ONE color palette (adapt accent to user preference)
- Implement in the project's actual stack
- Keep it minimal: spacing and typography do the work, not decoration

### Step 4: Lint with Impeccable

```bash
npx impeccable detect templates/ static/css/ 2>&1
```

Review each finding. Fix what's flagged. Exit code 0 = clean. Exit code 2 = still has findings.

### Step 5: Iterate with the user

Show the result. If the user says it still looks AI-generated or wrong, ask specifically what's off (a color, a size, a spacing, a component) and fix that one thing. Don't wholesale-redesign on vague feedback.

## Known pitfalls

- **Over-decorating to "fix" AI look:** Adding more decoration doesn't make it look human -- it makes it look decorated. Restraint is the signal.
- **Using webmxerz React code in a non-React project:** The skill's data (styles.csv, colors.csv, typography.csv, ux-guidelines.csv) is stack-agnostic and useful. Its React component examples are not. Extract principles, skip component code.
- **Impeccable as design review:** It catches technical anti-patterns (contrast, sizes, hierarchy). It does NOT judge taste, balance, or whether the overall aesthetic feels human. Use it as a lint pass, not a substitute for design judgment.
- **21st.dev components in non-React projects:** 21st.dev is a React + Tailwind registry. Its components won't drop into Flask/Jinja2/vanilla HTML projects. Browse for visual inspiration only.
- **Pinned color values from search results:** Search result palettes give hex values as starting points, not final answers. Adapt the accent color to what the user actually likes.
- **Porting a design system from another source (Lovable, Figma export, another project's CSS):** Always audit the muted/faint/low-contrast tokens (`--text-faint`, `muted-foreground`, secondary text) against WCAG AA on your actual background. Designers set these too low because they look subtle in a design tool -- on a real dark background they fail contrast checks for text below 14px. Raise muted text to at least `#8a8886` on dark backgrounds before shipping.
- **Lovable-built layouts as starting points, not replacements:** A Lovable layout gives you clean structure and a design system, but it won't have your project's feature extras (API slot editors, tool panels, voice toggles, session rename, memory tabs). Port the design, keep the features.

## Reference files

- `references/impeccable-findings.md` -- Impeccable scan results from the Sayip session (what was found, what was fixed, how to run)
- `references/webmxerz-quickref.md` -- quick reference for webmxerz search domains, flags, design dials, --persist, reasoning contract, and the Sayip-derived palette with contrast fixes
- `references/lovable-port-checklist.md` -- checklist for porting a Lovable-built layout into an existing project (clone, audit tokens, port structure, keep features, lint, test)

## Related skills

- `software-development:codebase-inspection` -- when you need to inspect what's already built before redesigning
- `lovable-port` -- class-level skill for porting Lovable-built layouts into existing Flask/vanilla projects
