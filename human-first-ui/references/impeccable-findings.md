# Impeccable findings -- Sayip CSS (2026-09-03)

Scan: `npx impeccable detect templates/ static/css/` against Sayip v1 (emoji-heavy, glow shadows, bounce animations, splash welcome card).

## Anti-patterns found and fixed

### 1. Low contrast (WCAG AA fail)
- **Before:** `--text-secondary: #888888`, `--text-muted: #5a5a5a` on dark bg (#0d0d0d / #161616) -> 2.6-2.8:1 ratio
- **After:** `#b0b0b0` (secondary), `#888888` (muted) -> 4.5:1+ on dark bg
- **Lesson:** On dark backgrounds, muted text must still hit 4.5:1. `#5a5a5a` is a common AI default that fails.

### 2. Tiny text (below 12px floor)
- **Before:** 10-11px used everywhere (hints, metadata, tool panel, footer, badges)
- **After:** Type scale introduced: `--text-xs: 10px` (decorative labels only), `--text-sm: 12px`, `--text-base: 14px` (body floor), `--text-lg: 16px` (mobile body), `--text-xl: 20px` (h2), `--text-2xl: 24px` (h1/brand)
- **Rule:** Body text minimum 14px (16px ideal). 10-11px is for decorative micro-labels only (e.g. "Chats" sidebar header, timestamps, footer status).

### 3. Flat type hierarchy
- **Before:** Sizes 10, 11, 12, 13, 14, 15px -- ratio 1.5:1 at best, no clear steps
- **After:** 4 clear steps: xs(10) -> sm(12) -> base(14) -> lg(16) -> xl(20) -> 2xl(24). Ratio ~1.33-1.43 between steps, well-separated.
- **Rule:** Use fewer sizes with bigger gaps. Don't have 6 different font-size values when 3 would do.

### 4. Danger color contrast
- **Before:** `#c05050` -> 3.7:1 on #1c1c1c (fail), hover `#ffffff on #c05050` -> also fail
- **After:** `#EF4444` -> passes WCAG AA on dark bg
- **Lesson:** Red on dark needs to be brighter than you think.

### 5. Decorative labels under 11px
- **Before:** "Chats" sidebar header, "Tool Activity" panel header, form labels at 10-11px flagged as undersized-ui-text
- **After:** Section headers and decorative labels at `--text-xs: 10px` explicitly marked as non-content. Impeccable still flags them but the rule exception is: if it's a decorative uppercase label with letter-spacing (not content-bearing), 10px is acceptable. Content-bearing text (body, buttons, inputs) must be 12px+.

## How to run
```bash
cd /path/to/project
npx impeccable detect templates/ static/css/   # scan HTML + CSS
npx impeccable detect static/js/               # scan JS-generated markup too
```

Exit code 0 = clean. Exit code 2 = findings (review each).

## What Impeccable does NOT catch
- Whether the overall aesthetic looks AI-generated (it catches technical tells, not taste)
- Whether font choices feel right (it checks sizes/contrast, not pairing quality)
- Visual balance, whitespace rhythm, component proportions

Use Impeccable as a lint pass, not a design review. For taste, reference Emil Kowalski's principles and the webmxerz database.
