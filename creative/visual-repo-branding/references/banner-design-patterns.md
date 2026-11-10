# Banner Design Patterns

Reusable SVG patterns for GitHub README banners and repo logos. All examples are
self-contained: paste them into `assets/banner.svg` or `assets/logo.svg` and edit
the text, dimensions, and accent colors.

Keep the final SVG under ~200 KB. Prefer system font stacks so GitHub renders the
same file everywhere.

---

## 1. Banner anatomy

A reliable dark banner uses four layers:

1. **Background** — vertical or diagonal gradient (`#0d1117` → `#161b22`).
2. **Hero** — owner/repo name, 72–96 px monospace, with a soft glow.
3. **Info card** — right-aligned panel with 2–4 stats.
4. **Footer strip** — `·`-separated keywords, 10–12 px.

Recommended canvas: `1200 × 320` (3.75:1). GitHub scales it to the README width,
so text stays legible on mobile when the hero is at least 64 px.

---

## 2. Base banner template

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="320"
     viewBox="0 0 1200 320" role="img"
     aria-label="OWNER — SKILLS COLLECTION">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0d1117"/>
      <stop offset="1" stop-color="#161b22"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#58a6ff"/>
      <stop offset="1" stop-color="#bc8cff"/>
    </linearGradient>
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#21262d" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1200" height="320" rx="16" fill="url(#bg)"/>
  <rect width="1200" height="320" rx="16" fill="url(#grid)" opacity="0.35"/>
  <circle cx="40" cy="30" r="120" fill="#58a6ff" opacity="0.08"/>
  <circle cx="1160" cy="300" r="160" fill="#bc8cff" opacity="0.08"/>

  <!-- Hero -->
  <text x="64" y="132" font-family="ui-monospace, SFMono-Regular, Menlo, monospace"
        font-size="84" font-weight="700" fill="#58a6ff" filter="url(#glow)">OWNER</text>
  <text x="66" y="176" font-family="ui-monospace, SFMono-Regular, Menlo, monospace"
        font-size="15" letter-spacing="4" fill="#8b949e">SKILLS COLLECTION</text>

  <!-- Info card -->
  <rect x="820" y="72" width="316" height="152" rx="12"
        fill="#161b22" stroke="#30363d"/>
  <text x="848" y="118" font-family="ui-monospace, monospace" font-size="30"
        font-weight="700" fill="#e6edf3">73</text>
  <text x="848" y="138" font-family="ui-monospace, monospace" font-size="11"
        letter-spacing="2" fill="#8b949e">SKILLS</text>
  <text x="960" y="118" font-family="ui-monospace, monospace" font-size="30"
        font-weight="700" fill="#e6edf3">12</text>
  <text x="960" y="138" font-family="ui-monospace, monospace" font-size="11"
        letter-spacing="2" fill="#8b949e">CATEGORIES</text>
  <line x1="848" y1="160" x2="1108" y2="160" stroke="#21262d"/>
  <text x="848" y="192" font-family="ui-monospace, monospace" font-size="12"
        fill="#8b949e">Hermes Agent · Linux · macOS · Windows</text>

  <!-- Footer strip -->
  <text x="66" y="276" font-family="ui-monospace, monospace" font-size="11"
        letter-spacing="1" fill="#8b949e">
    coding agents · email · PDF · research · design · Apple · cloud · debugging
  </text>
</svg>
```

Replace `OWNER`, the subtitle, stats, and footer keywords. Keep `role="img"` and
`aria-label` so the banner is accessible and searchable.

---

## 3. Minimal banner variant

Use when the repo name is long or the README already has a strong header image.

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="200"
     viewBox="0 0 1200 200" role="img" aria-label="OWNER — TAGLINE">
  <defs>
    <linearGradient id="bg2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0d1117"/>
      <stop offset="1" stop-color="#1f2937"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="200" rx="16" fill="url(#bg2)"/>
  <rect x="48" y="48" width="6" height="104" rx="3" fill="#58a6ff"/>
  <text x="80" y="108" font-family="ui-monospace, monospace" font-size="56"
        font-weight="700" fill="#e6edf3">OWNER</text>
  <text x="82" y="142" font-family="ui-monospace, monospace" font-size="14"
        letter-spacing="3" fill="#8b949e">TAGLINE OR REPO DESCRIPTION</text>
</svg>
```

---

## 4. Logo template

Square logos work best at `200 × 200`. Leave 16 px of padding so the mark does
not touch the edges when GitHub rounds the avatar.

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"
     viewBox="0 0 200 200" role="img" aria-label="OWNER logo">
  <defs>
    <linearGradient id="logoBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#161b22"/>
      <stop offset="1" stop-color="#0d1117"/>
    </linearGradient>
    <linearGradient id="logoFg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#58a6ff"/>
      <stop offset="1" stop-color="#bc8cff"/>
    </linearGradient>
  </defs>
  <circle cx="100" cy="100" r="96" fill="url(#logoBg)" stroke="#30363d" stroke-width="2"/>
  <path d="M100 44 148 72v56l-48 28-48-28V72z" fill="none"
        stroke="url(#logoFg)" stroke-width="8" stroke-linejoin="round"/>
  <path d="M76 78l24 44 24-44" fill="none" stroke="#e6edf3"
        stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

Swap the inner `<path>` for a letter, monogram, or simple geometric mark. Keep
the mark within a 120 × 120 box centered at `(100, 100)`.

---

## 5. Color palettes

All palettes assume a dark background. Check contrast for text at 4.5:1 or
better; decorative shapes can go lower.

| Palette | Background | Primary | Secondary | Muted | Border |
|---|---|---|---|---|---|
| GitHub dark (default) | `#0d1117` → `#161b22` | `#58a6ff` | `#bc8cff` | `#8b949e` | `#30363d` |
| Terminal green | `#0b0f0c` → `#101a12` | `#3fb950` | `#7ee787` | `#8b949e` | `#1f6f3f` |
| Warm ember | `#120d0b` → `#1c1310` | `#f0883e` | `#ffa657` | `#c9a38f` | `#3d2a22` |
| Ocean | `#081018` → `#0d1b2a` | `#2f81f7` | `#56d4dd` | `#8b949e` | `#1f3a5f` |
| Mono | `#0d1117` → `#161b22` | `#e6edf3` | `#8b949e` | `#6e7681` | `#30363d` |

Use the primary for the hero and the secondary for one accent shape only.
More than two accents makes the banner look noisy at README scale.

---

## 6. Embedding

Place the files at the repo root:

```
assets/
├── banner.svg
└── logo.svg
```

Embed at the top of `README.md`:

```markdown
<p align="center">
  <img src="assets/banner.svg" width="100%" alt="OWNER — SKILLS COLLECTION" />
</p>
```

For the logo inside a heading or card:

```markdown
<img src="assets/logo.svg" width="96" alt="OWNER logo" align="right" />
```

Use relative paths, not raw URLs. Raw URLs break when the default branch is
renamed and bypass GitHub's image proxy.

---

## 7. Verification checklist

- [ ] `banner.svg` and `logo.svg` are at `assets/` in the default branch.
- [ ] `xmllint --noout assets/banner.svg assets/logo.svg` reports no errors.
- [ ] Both files are under 200 KB.
- [ ] No spaces in filenames; use hyphens.
- [ ] `alt` text is present and descriptive.
- [ ] Banner renders full-width on the repo page at mobile and desktop widths.
- [ ] Hero text is at least 64 px and keywords at least 10 px.
- [ ] Colors pass 4.5:1 contrast for text.
- [ ] After pushing, wait 30 s–2 min if GitHub returns a transient 404.

Quick local validation:

```bash
xmllint --noout assets/banner.svg assets/logo.svg
du -h assets/banner.svg assets/logo.svg
```
