# Webapp Minimal-Look Design System

Concrete design tokens, contrast values, and workflow for making Flask webapps that look hand-built rather than AI-generated.

## Concrete CSS design tokens (tested, Impeccable-clean)

```css
:root {
    --bg: #0d0d0d;
    --bg-elevated: #161616;
    --bg-surface: #1c1c1c;
    --bg-hover: #222222;
    --border: #2a2a2a;
    --border-hover: #3a3a3a;

    /* Text colors — all pass WCAG AA on dark bg */
    --text: #e8e8e8;           /* body text — 14.9:1 on #0d0d0d */
    --text-secondary: #b0b0b0; /* secondary — 5.6:1 on #0d0d0d */
    --text-muted: #888888;     /* metadata — 3.4:1 (decorative only, not body) */

    /* Accent — warm gold, functional only */
    --accent: #c0a060;
    --accent-hover: #d4b070;

    /* Semantic colors — WCAG AA on their backgrounds */
    --danger: #e05555;   /* error text on #0d0d0d: ~5.6:1 */
    --danger-bg: #e05555; /* danger button bg — white text on this is 4.5:1+ */
    --success: #50a060;

    /* Type scale — 3 sizes only, clear hierarchy */
    --text-xs: 10px;   /* decorative micro-labels ONLY (section headers, timestamps) */
    --text-sm: 12px;   /* secondary text, hints, labels */
    --text-base: 14px; /* body text — WCAG AA minimum floor */
    --text-lg: 17px;   /* h2 headings */
    --text-xl: 21px;   /* h1 / brand */

    --font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-mono: 'SF Mono', Menlo, Consolas, monospace;
    --radius: 4px;
    --transition: 120ms ease;
}
```

## Impeccable verification workflow

Impeccable is a CLI design linter (`npx impeccable detect`) that catches AI-generated UI tells. Run it against your templates and CSS after any UI work.

```bash
cd ~/sayip
npx --yes impeccable detect templates/ static/css/
```

**What it catches (the tells that make UI look AI-generated):**
- `[low-contrast]` — text below 4.5:1 contrast ratio
- `[tiny-text]` — body text below 12px
- `[undersized-ui-text]` — functional UI text below 11px
- `[flat-type-hierarchy]` — font sizes too close together (need 1.25x ratio between steps)

**Fix loop:** run detect → fix flagged issues → re-run until clean. Don't skip re-running — one fix can mask another.

**Important:** Impeccable is a *verifier*, not a designer. It tells you what's wrong, not what to build. Design the UI yourself; use Impeccable to catch slips.

## Anti-patterns that make a webapp look AI-generated

These are the concrete tells. If any appear in your CSS, strip them:

1. **Emojis in headers/labels/buttons** — `🤖`, `⚙`, `🎭`, `🔌`, `🧠`, `💬`, `🎤`. Replace with plain text. A human developer writing a utility tool does not put emojis in section headers.

2. **Accent glow / box-shadow on hover** — `box-shadow: 0 0 12px var(--accent-glow)`. Flat colors only. No glow effects.

3. **Bounce / pulse / slide-down animations** — `@keyframes bounce`, `@keyframes pulse`, `@keyframes slideDown`, `@keyframes fadeIn`. Zero motion design in a utility tool.

4. **Splash-screen welcome card with icons** — `.welcome-screen` with `welcome-icon` (48px emoji), `welcome-hints` grid of hint cards. Replace with a one-line placeholder in the input area, or a simple centered `h2 + p`.

5. **Decorative brand icon** — `.brand-icon` with an emoji next to the logo. Remove.

6. **Ribbons, badges, status dots in the header** — `.health-badge` with a pulsing dot. Make status purely functional (text color change), not decorative.

7. **Gradient backgrounds, glassmorphism, translucent overlays** — never in a minimal tool.

8. **Chat bubbles with large border-radius + gradient backgrounds** — use small radius (4px), flat colors, no gradients.

9. **More than 3 font sizes in active use** — pick 3 (body, secondary, label) and stick to them. More sizes = flat hierarchy = looks generated.

## Rule of thumb

Open the page in a browser and ask: "Would a human developer hand-write this CSS for a utility tool?" If the answer is no (because it has motion, glow, or emoji decoration), strip it. A normal tool looks like a terminal, a notes app, or a minimal chat — not like a landing page.

## Mobile responsiveness pattern (hamburger + slide-in sidebar)

For a Flask chat app with sidebar on mobile:

**HTML structure:**
```html
<header class="app-header">
    <button id="btn-hamburger" class="btn-hamburger">☰</button>
    <span class="brand-text">Sayip</span>
    <span id="current-chat-name" class="header-subtitle">New Chat</span>
    <div class="header-nav">...</div>
</header>
<div class="sidebar-overlay" id="sidebar-overlay"></div>
<div class="chat-layout">
    <aside class="chat-sidebar" id="chat-sidebar">...</aside>
    <main class="chat-main">...</main>
</div>
```

**CSS (mobile, max-width: 640px):**
```css
.chat-sidebar {
    position: fixed;
    top: 48px; left: 0; bottom: 0;
    width: 260px;
    z-index: 100;
    transform: translateX(-100%);
    transition: transform 200ms ease;
    box-shadow: 4px 0 16px rgba(0,0,0,0.4);
}
.chat-sidebar.open { transform: translateX(0); }
.sidebar-overlay {
    display: none;
    position: fixed; inset: 0; top: 48px;
    background: rgba(0,0,0,0.5);
    z-index: 99;
}
.sidebar-overlay.open { display: block; }
```

**JS:** toggle `.open` on both sidebar and overlay. Close sidebar when a session is selected or when overlay is tapped.

**Key points:**
- Sidebar is `position: fixed` on mobile, not `width: 200px` in the layout flow (that breaks the chat area)
- Overlay closes sidebar on outside tap
- `closeSidebarIfNeeded()` called after session selection and new chat creation
- Settings page also needs reduced padding on mobile (`.settings-main { padding: 10px }`, `.settings-section { padding: 10px }`)
