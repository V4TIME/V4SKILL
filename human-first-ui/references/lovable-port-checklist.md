# Lovable port checklist — porting a Lovable-built layout into an existing project

Use when the user has a repo built by Lovable (or any external builder) and wants its design adopted into the current project.

## 1. Clone the Lovable repo

```bash
GIT_SSH_COMMAND="ssh -o Port=443 -o StrictHostKeyChecking=no -i ~/.ssh/id_ed25519_sayip" \
  git clone git@github.com:V4TIME/<repo>.git ~/tmp/<repo>
```

If port 22 is blocked (common on mobile networks), SSH over port 443. HTTPS alternative:
```bash
git clone https://github.com/V4TIME/<repo>.git ~/tmp/<repo>
```

## 2. Read the portable output, not the framework source

Lovable repos typically have:
- `public/` — plain HTML/CSS/JS output (PORTABLE — this is what you port)
- `src/` — React/Tailwind/Vite source (NOT portable to Flask/vanilla — skip it)

Focus on `public/`. If there's no `public/` and only `src/`, the repo is framework-locked and you can only extract design principles, not copy structure.

## 3. Audit the design tokens before porting

Read the CSS file(s) and check every color token against WCAG AA on your actual background:

| Token to check | Common problem | Fix |
|---|---|---|
| `--text-faint` / `muted-foreground` / secondary text | Often `#6a6866` or similar — 2.6:1 on dark, fails AA | Raise to `#8a8886` or lighter |
| Danger red on dark | Often too dark to pass at small sizes | Use brighter red like `#EF4444` or `#B4544A` |
| Placeholder text | Often same as muted — too faint | Keep placeholders fainter than body but not as faint as muted |

Run Impeccable after porting to catch what you missed:
```bash
npx impeccable detect templates/ static/css/ 2>&1
```

## 4. Port the structure, not the framework

**For Flask + vanilla HTML/CSS/JS (Sayip's stack):**
- Copy the HTML structure from Lovable's `public/*.html` into `templates/*.html` as Jinja2 templates
- Copy the CSS design system (tokens, layout, components) into `static/css/style.css`
- Port the JS logic from `public/*.js` into `static/js/*.js`, adapting API paths to match your backend (`/api/...` routes)
- Keep the Google Fonts link if it's Inter or another suitable font

**What NOT to copy:**
- React component files (`.tsx`, `.jsx`)
- Tailwind config (unless you're also using Tailwind)
- Vite/build config
- Framework-specific hooks or context providers

## 5. Keep existing features the Lovable layout doesn't have

A Lovable layout is a starting point. Before deleting anything from your current project, inventory what the Lovable version lacks:

| Feature | Lovable job-desk | Sayip needs | Action |
|---|---|---|---|
| API key + description slot editor | No — only name + toggle + read-only note | Yes — user requirement | Keep Sayip's slot editor UI, style it with Lovable tokens |
| Tool activity panel | No | Yes | Keep, style with Lovable tokens |
| Voice toggle in chat | Has `voice.js` but not wired into chat.html/chat.js | Yes — wired | Port the wiring from current Sayip |
| Session rename | No — only delete | Yes | Keep, style with Lovable tokens |
| Memory tabs (MEMORY.md / USER.md) | No — simple add/remove | Yes | Keep, style with Lovable tokens |
| Multi-model dispatch | N/A (frontend doesn't control this) | Yes — backend | Already in app.py, untouched by UI port |

**Rule:** If you're not sure whether to keep something, keep it. The Lovable layout is the visual refresh, not a feature audit.

## 6. Adapt API paths

Lovable's JS will call its own backend endpoints. Replace with your backend's routes:

| Lovable likely calls | Sayip's backend has |
|---|---|
| `/api/sessions` (GET/POST) | `/api/sessions` |
| `/api/sessions/<id>` (GET/DELETE) | `/api/sessions/<id>` |
| `/api/chat` (POST) | `/api/chat` |
| `/api/character` (GET/POST) | `/api/character` |
| `/api/apis` (GET/POST) | `/api/apis` |
| `/api/memory` (GET/POST/DELETE) | `/api/memory` |
| `/api/health` (GET) | `/api/health` |

Verify each endpoint exists and returns the shape the JS expects. If the shapes differ, adapt the JS — not the backend.

## 7. Test

```bash
# Health
curl -s http://127.0.0.1:5000/api/health

# Create a session
curl -s -X POST http://127.0.0.1:5000/api/sessions -H 'Content-Type: application/json' -d '{"title":"test"}'

# Send a message
curl -s -X POST http://127.0.0.1:5000/api/chat \
  -H 'Content-Type: application/json' \
  -d '{"session_id":"<id>","message":"hello"}'

# Check settings page loads
curl -s http://127.0.0.1:5000/settings | grep -c 'api-slot\|section\|character'
```

Open in browser on the phone: `http://127.0.0.1:5000`

## 8. Commit

```bash
cd ~/sayip
git add static/css/style.css static/js/*.js templates/*.html
git commit -m "Port Lovable design system from V4TIME/<repo>

- Adopt color tokens, layout structure, component styles from Lovable
- Keep existing Sayip features: API slot editor, tool panel, voice toggle,
  session rename, memory tabs
- Fix muted-text contrast per WCAG AA (--text-faint raised to #8a8886)
- Mobile responsive: hamburger menu, overlay sidebar, 100dvh"
git push
```

## Common pitfalls

- **Copying `src/` instead of `public/`:** The framework source is locked to React/Tailwind/Vite. Only `public/` is portable.
- **Deleting features to match Lovable:** Lovable's layout is minimal by design — it doesn't have your project's features. Port the look, not the feature set.
- **Not auditing muted text:** Lovable's `--text-faint` is often too dark. Check it.
- **Breaking API paths:** Lovable's JS calls its own backend. Update paths to match yours.
- **Forgetting mobile:** Lovable's layout usually includes mobile styles. Make sure they survive the port.
