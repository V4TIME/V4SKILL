---
name: webmxerz
description: >-
  UI/UX design-system engine: BM25 search over style, color, chart, landing, typography, icon and
  UX datasets, plus full design-system generation with variance/motion/density dials and persisted
  master overrides.
version: 1.0.0
author: V4TIME
license: MIT
platforms: [linux, macos, windows]
homepage: "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill"
credits: "Next Level Builder (ui-ux-pro-max)"
metadata:
  hermes:
    tags:
      - ui
      - ux
      - design-system
      - web-design
      - color
      - typography
      - charts
      - landing-page
      - accessibility
      - react
      - tailwind
      - bm25
      - design-tokens
      - style-guide
      - search
      - nextjs
    category: creative-media
    related_skills: [claude-design, craft-director, design-tokens-spec, popular-web-designs, human-first-ui]
tags:
  - ui
  - ux
  - design-system
  - web-design
  - color
  - typography
  - charts
  - landing-page
  - accessibility
  - react
  - tailwind
  - bm25
  - design-tokens
  - style-guide
  - search
  - nextjs
prerequisites:
  commands: [python3]
---

# WebMXERZ Skill

A local, deterministic UI/UX knowledge base plus a BM25 search engine. Given a
plain-language query (for example `"SaaS dashboard"` or `"fintech landing page"`),
it retrieves matching styles, color palettes, chart types, landing-page
patterns, typography pairings, icon guidance, motion snippets, and UX rules, and
can assemble a complete design-system recommendation.

Everything runs offline with the standard library — no API keys, no network.

## When to Use

- Designing or redesigning a page, component, dashboard, or mobile screen and
  you need concrete style/color/typography/chart guidance.
- You want a consistent design system (not ad-hoc choices) with explicit
  variance, motion, and density decisions.
- Auditing an existing UI against accessibility, touch, form, feedback, and
  performance rules.
- You need product-type → style mapping (e.g. what palette and landing pattern
  fit a fintech, health, or e-commerce product).

## Skip When

- The task is backend-only, API/database design, or infrastructure work.
- The change does not affect how something looks, feels, moves, or is interacted with.

## Quick Start

Run search against the local datasets:

```bash
cd webmxerz/scripts

# Free-text search across all domains
python3 search.py "minimal premium fintech dashboard"

# Restrict to a domain
python3 search.py "fintech dashboard" --domain color

# Stack-specific guidance (react, nextjs, vue, svelte, astro, tailwind, etc.)
python3 search.py "form validation" --stack react

# Generate a full design system (ASCII or markdown)
python3 search.py "SaaS dashboard" --design-system --project-name "Acme" --format markdown

# Tune the design dials (1-10)
python3 search.py "SaaS dashboard" --design-system --variance 8 --motion 9 --density 7

# Persist a master design system + a page-specific override
python3 search.py "SaaS dashboard" --design-system --persist \
  --project-name "Acme" --output-dir /path/to/project --page dashboard
```

## Domains

`style`, `color`, `chart`, `landing`, `product`, `ux`, `typography`,
`google-fonts`, `icons`, `gsap`, `react`, `web`.

## Stacks (optional dataset)

`react`, `nextjs`, `vue`, `svelte`, `astro`, `swiftui`, `react-native`,
`flutter`, `nuxtjs`, `nuxt-ui`, `html-tailwind`, `shadcn`, `jetpack-compose`,
`threejs`, `angular`, `laravel`, `javafx`, `wpf`, `winui`, `avalonia`, `uno`, `uwp`.

`--stack` reads `data/stacks/<name>.csv`. All 22 stack datasets are bundled in
this repository, so stack-specific search and domain search both work out of the
box.

## Design Dials

Only valid with `--design-system`:

- `--variance 1-10` — 1 = centered/minimal, 10 = bold/asymmetric.
- `--motion 1-10` — 1 = subtle, 10 = complex; attaches a matching GSAP snippet.
- `--density 1-10` — 1 = spacious, 10 = dense/dashboard; overrides spacing scale.

## Persistence (Master + Overrides)

- `--persist` writes `design-system/<project-slug>/MASTER.md`.
- `--page <name>` writes a page override under `design-system/<project-slug>/pages/`.
- `--output-dir <project-root>` sets where `design-system/` is created — always
  pass it explicitly.
- `--force` overwrites an existing `MASTER.md`; without it, persistence is
  skipped so prior decisions are not lost.

## Data Integrity

Validate the bundled domain CSVs (stdlib only, suitable for CI):

```bash
cd webmxerz/scripts
python3 validate_data.py
```

The validator also checks `data/stacks/` and the catalog JSON files
(`google-font-licenses.json`, `phosphor-icons-upstream.json`,
`catalog-summary.json`, `data-provenance.json`). All of those datasets are
bundled, so the validator runs a full check and should print `OK`.

The stdlib-only regression suite covers tokenization, search, design-system
generation, data contracts, RTL support, and IME handling:

```bash
cd webmxerz/scripts
python3 -m unittest discover -s tests
```

## Files

- `scripts/search.py` — CLI entry point (BM25 search, design-system generation).
- `scripts/design_system.py` — aggregation + reasoning engine.
- `scripts/core.py` — search primitives and data loading.
- `scripts/reasoning_contract.py` — decision-rule parsing.
- `scripts/validate_data.py` — dataset integrity guardrail.
- `scripts/tests/` — stdlib `unittest` regression suite (153 tests).
- `data/*.csv` — style, color, chart, landing, product, motion, UX, typography,
  icon, Google Fonts, and consolidated knowledge datasets.
- `references/webmxerz-knowledge.md` — deep "why" reference (accessibility,
  touch, forms, performance, React, rendering, color, charts, motion, landing,
  icons, product mappings).
- `templates/webmxerz-quickref.md` — prioritized rule quick reference.
- `templates/webmxerz-content.md` — content/voice guidance.

## Notes

- Read `references/webmxerz-knowledge.md` when you need the reasoning behind a
  rule, not just the rule.
- The `templates/webmxerz-quickref.md` file is bilingual (Chinese/English); it is
  a lookup table, not a script input.
- Output is deterministic for a given query and dataset, so results can be
  committed as design decisions.
