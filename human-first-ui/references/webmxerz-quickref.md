# WebMXERZ -- quick reference (2026-09-03)

Repo: `https://github.com/nextlevelbuilder/webmxerz`
Cloned to: `~/tmp/webmxerz/`
Entry point: `python3 src/webmxerz/scripts/search.py`

## Install (for future use)
```bash
git clone https://github.com/nextlevelbuilder/webmxerz.git ~/tmp/webmxerz
```
No npm install needed -- the search scripts are pure Python (BM25 + regex).

## Search domains

| Domain | What it returns | Rows | Example query |
|---|---|---|---|
| `style` | UI styles (minimalism, brutalism, glassmorphism...) + CSS keywords + AI prompt keywords | 89 | `"dark theme minimal chat app"` |
| `typography` | Font pairings with Google Fonts import URLs + CSS + Tailwind config | 75 | `"sans-serif font pairing dark mode clean"` |
| `color` | Color palettes by product type (primary, on-primary, accent, background, foreground, muted, border, destructive — full token set) | 193 | `"dark theme palette professional tool"` |
| `ux` | UX best practices and anti-patterns by platform | 120 | `"mobile chat interface layout patterns"` |
| `product` | Product type recommendations (SaaS, e-commerce, portfolio) with primary style + color focus | 193 | `"chat messaging assistant app"` |
| `landing` | Page structure and CTA strategies | 35 | |
| `chart` | Chart types and library recommendations | 26 | |
| `icons` | Icon recommendations with import code (Phosphor, Heroicons, Lucide) | 106 | |
| `react` | React/Next.js performance patterns | 45 | |
| `web` | App interface guidelines (iOS/Android/React Native) | 33 | |
| `google-fonts` | Individual Google Fonts lookup (1935 fonts, variable axes, popularity rank) | 1935 | |
| `gsap` | GSAP animation skeletons by intensity tier | 18 | |

## Flags

- `-n <max>` — limit results
- `--domain <domain>` — force a domain (auto-detect when omitted)
- `--stack <stack>` — stack-specific guidelines (html-tailwind, react, nextjs, vue, svelte, swiftui, flutter, shadcn, etc.)
- `--design-system` — **aggregates across domains in one pass**: product → style → color → typography → effects → avoid → checklist. Use this instead of per-domain searches when you want a complete design system, not piecemeal results.
- `--persist -p <project> [-o <dir>] [--page <name>]` — **saves the design system to disk** as `design-system/<project>/MASTER.md` (and optionally `pages/<page>.md` for page overrides). Future reads of that project use the persisted file. This is the master+overrides pattern for maintaining a coherent design system across multiple pages.

## Design dials (only with `--design-system`)

Three 1-10 sliders that bias the search rather than replace it. Leave any unset and it behaves as before.

| Dial | Range | What it does | Sayip value |
|---|---|---|---|
| `--variance` | 1=centered/minimal → 10=bold/asymmetric | Biases which style results come back | 2 (minimal, JARVIS feel) |
| `--motion` | 1=subtle → 10=complex | Attaches a matching GSAP snippet from motion.csv | 2 (subtle hover only) |
| `--density` | 1=spacious → 10=dense/dashboard | Overrides spacing-scale tokens | 3-4 (tool density, not dashboard cram) |

Example: `python3 search.py "dark premium assistant chat tool" --design-system -p Sayip --variance 2 --motion 2 --density 4 -n 5`

## `--persist` and the master+overrides pattern

`--persist` writes the design system to `design-system/<project-slug>/MASTER.md`. With `--page <name>`, it also writes `design-system/<project-slug>/pages/<page>.md`.

**Workflow:** When building or fixing a page, check `design-system/<project>/pages/<page>.md` first. If it exists, its rules override MASTER.md. Otherwise use MASTER.md. This keeps a multi-page project coherent without drift.

## Reasoning contract (`ui-reasoning.csv`)

The skill has 34 condition signals in `ui-reasoning.csv` that encode design decisions as `if_<condition>` rules. These are queryable via `--domain ui-reasoning` or surfaced through `--design-system`. Known signals include: `if_luxury`, `if_mobile`, `if_dashboard`, `if_data_dense`, `if_form_heavy`, `if_cart`, `if_saas`, `if_portfolio`, `if_ecommerce`, `if_admin_tool`, `if_dark_mode`, `if_light_mode`, `if_high_contrast`, `if_low_contrast`, `if_typography_focused`, `if_icon_heavy`, `if_animation_heavy`, `if_minimal`, `if_brutalist`, `if_glassmorphism`, `if_rounded`, `if_sharp`, `if_old_browser_support`, `if_high_traffic`, `if_data_visualization`, `if_multilingual`, `if_accessibility_focused`, `if_performance_critical`, `if_small_screen`, `if_large_screen`, `if_touch_first`, `if_mouse_first`, `if_brand_consistency`, `if_quick_launch`.

Use these when you need to make a design decision programmatically: query the relevant signal and follow its `Decision_Rules` column.

## What this session used

### style -> minimalism-and-swiss-style
- Clean, simple, spacious, functional, white space, high contrast, geometric, sans-serif, grid-based
- Primary colors: monochromatic, black/white
- Effects: subtle hover (200-250ms), smooth transitions, sharp shadows if any, clear type hierarchy, fast loading
- Best for: enterprise apps, dashboards, documentation sites, SaaS platforms, professional tools
- CSS keywords: `display: grid, gap: 2rem, font-family: sans-serif, color: #000 or #FFF, max-width: 1200px, clean borders, no box-shadow unless necessary`
- Design system vars: `--spacing: 2rem, --border-radius: 0px, --font-weight: 400-700, --shadow: none, --accent-color: single primary only`

### typography -> Modern Dark Cinema (Inter System)
- Heading: Inter 700 (-1.5 tracking) Display 48pt; Inter 600 (-0.5 tracking) H1 32pt / H2 24pt
- Body: Inter 400 16pt; Inter 500 uppercase +1.2 tracking for labels/mono
- Mood: dark, cinematic, technical, precision, clean, premium, developer, professional
- Best for: developer tools, fintech/trading, AI dashboards, streaming platforms, high-end productivity apps
- Google Fonts: `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap`

### color -> Developer Tool / IDE palette (adapted)
- Background: #0F172A
- Foreground/text: #E2E8F0 (or #F8FAFC)
- Card/surface: #1B2336
- Muted: #272F42
- Muted foreground: #94A3B8
- Border: #475569
- Accent: #22C55E (green -- but user preferred warm gold #C0A060 for Sayip)
- Destructive: #EF4444

### color -> Ticketing/Box Office (Lovable job-desk palette, per-product matched)
- Primary: #2563EB
- On Primary: #FFFFFF
- Secondary: #64748B
- On Secondary: #F1F5F9
- Accent: #F59E0B
- On Accent: #FFFFFF
- Background: #0F172A
- Foreground: #F8FAFC
- Card: #1E293B
- Card Foreground: #F1F5F9
- Muted: #475569
- Muted Foreground: #94A3B8
- Border: #334155
- Destructive: #EF4444
- On Destructive: #FFFFFF
- Ring: #3B82F6
- Notes: dark navy palette for pro/business tool feel

### UX patterns extracted (from ux-guidelines.csv, all severity-rated)
- **Input Labels** (High): Every input needs a visible label. Don't use placeholder as only label. Do: `<label>Email</label><input>`. Don't: `placeholder='Email'` only
- **Input Affordance** (Medium): Inputs should look interactive. Do: border/background on inputs. Don't: borderless inputs
- **Mobile Keyboards** (Medium): Use `inputmode` attribute. Don't: default keyboard for everything
- **Error Placement** (High): Each invalid field needs inline error connected with `aria-describedby`
- **Mobile First** (Medium): Start with mobile styles, then add breakpoints. Don't: desktop-first causing mobile issues. Good: default mobile + `md: lg: xl:`. Bad: desktop default + max-width queries
- **Sticky Navigation** (Medium): Fixed nav should not obscure content. Do: add padding-top to body equal to nav height
- **Keyboard Navigation** (High): Complete keyboard nav, visible focus on every operable control, tab order aligned with visual order
- **Document Language** (Low): Set `lang` attribute on `<html>`
- **Descriptive Page Titles** (Medium): Each page needs descriptive `<title>`
- **Touch Targets** (High): All interactive elements need min 44x44px touch target
- **Motion Sensitivity** (Medium): Respect `prefers-reduced-motion`

### Icons (from icons.csv, Phosphor library)
- **Hamburger/sidebar toggle**: `List` icon (Navigation category, interactive role)
- **Settings**: `Gear` icon (Action category, meaningful role)
- **Chat/message**: `ChatCircle` icon (Communication category, meaningful role)
- **Sidebar panel**: `Sidebar` icon (Layout category)
- All Phosphor outline style. Rule: if decorative beside visible text → `aria-hidden="true"`. If meaningful without visible text → provide text alternative. If inside interactive control → give it accessible name + state
- Icon + label required for Bold Typography Mobile style

### Motion (from motion.csv)
- **Subtle hover micro-interaction**: 150-200ms, power1.out easing. GSAP: `gsap.to(el, { y: -1, opacity: 0.9, duration: 0.15, ease: 'power1.out' })`. Keep displacement under 2px. Runs on transform/opacity only — compositor thread. Use `matchMedia('(prefers-reduced-motion: reduce)')` to skip
- **Scroll reveal (subtle)**: 300-400ms, power1.out. `gsap.from(el, { opacity: 0, y: 12, duration: 0.35, ease: 'power1.out', scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' } })`
- Design dial mapping: motion=1-3 = Subtle, 4-7 = Standard, 8-10 = Complex

## Sayip-specific palette used (Lovable-derived, contrast-fixed)

Lovable's `public/sayip/style.css` gave us the base tokens. We fixed the low-contrast `--text-faint` value using wcag contrast rules:

| Token | Lovable original | Fixed value | Why |
|---|---|---|---|
| `--bg` | `#0b0b0c` | `#0b0b0c` | fine |
| `--panel` | `#111113` | `#111113` | fine |
| `--panel-2` | `#151517` | `#151517` | fine |
| `--line` | `#232326` | `#232326` | fine |
| `--line-soft` | `#1b1b1e` | `#1b1b1e` | fine |
| `--text` | `#e8e6e3` | `#e8e6e3` | fine |
| `--text-dim` | `#9a9896` | `#9a9896` | fine (14px+ passes) |
| `--text-faint` | `#6a6866` | **`#8a8886`** | original was ~2.6:1 on dark bg, below WCAG AA. Raised to pass at 12px+ |
| `--accent` | `#c2a878` | `#c2a878` | fine (warm gold, good contrast on dark) |
| `--danger` | `#b4544a` | `#b4544a` | fine on dark bg at 14px+ |

**Lesson:** When porting a design system from another source, always check `--text-faint`/`muted-foreground`-equivalent tokens against WCAG AA. Designers frequently set these too low because they look subtle in a design tool — but on a real dark background they fail contrast checks for any text below 14px.

## Notes
- The skill is React/Tailwind-oriented. For plain HTML/CSS/JS stacks (like Sayip's Flask + vanilla), extract the design principles (colors, typography, spacing, patterns) and implement in plain CSS -- don't copy React component code.
- 21st.dev is a React component registry -- browse for inspiration but don't try to drop components into a non-React project.
- Impeccable and webmxerz are complementary: Impeccable finds technical problems, webmxerz gives design direction.
- **When porting a Lovable layout into an existing project**, see the `lovable-port` skill for the full workflow.
