---
title: Local AI Web App in Termux
name: termux-flask
description: Build Flask AI apps in Termux with NaraRouter integration.
---

# Local AI Web App in Termux

Build and run a local web application on an Android device running Termux, integrating with AI APIs (especially NaraRouter) and optionally Hermes Agent as the reasoning backend.

## When to use

- User wants a local AI assistant/chat interface running on their phone
- Building a web app in Termux with Python/Flask
- Integrating multiple AI APIs with description-driven routing
- Adding voice mode via browser Web Speech API
- Managing sessions and memory across chats
- User pastes install instructions for a dev tool (binary release, Rust/cargo, npm/npx, pip) and says to install and use it — evaluate feasibility for the phone/Termux environment first, then install with permission

## Architecture pattern

```
Browser (Chrome on Android) → Flask backend (Termux) → AI API(s)
                                 ↓
                             Hermes Agent (optional, as brain)
```

**Key principle:** The web app is the interface layer. Hermes Agent (if used) is the brain. The Flask backend bridges them.

## Quick start

```bash
# In Termux
mkdir ~/sayip && cd ~/sayip
mkdir -p templates static/css static/js storage/sessions
```

```python
# app.py — minimal Flask starter
from flask import Flask, render_template, request, jsonify
from pathlib import Path
import json, time, uuid, os

app = Flask(__name__, template_folder="templates")
HERMES_HOME = Path(os.path.expanduser("~/.hermes"))
SAYIP_STORAGE = Path(os.path.expanduser("~/sayip/storage"))

@app.route("/")
def index():
    return render_template("chat.html")

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    # ... handle message, call API, return response

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
```

```bash
# Run
python3 app.py
# Open in Chrome: http://127.0.0.1:5000
```

## API integration patterns

### NaraRouter (primary recommendation)

NaraRouter is a unified AI gateway with 53+ models, free tier available.

**Key format:** `sk-nry-...` (starts with `sk-nry-`)

**Endpoints (all under same base URL + Bearer key):**

| Endpoint | Type | Use for |
|----------|------|---------|
| `https://router.bynara.id/v1/chat/completions` | OpenAI-compatible | Chat, general tasks |
| `https://router.bynara.id/v1/messages` | Anthropic-compatible | Anthropic-format requests |
| `https://router.bynara.id/v1/responses` | OpenAI Responses | Stateful responses API |
| `https://router.bynara.id/v1/embeddings` | OpenAI Embeddings | Vector embeddings |
| `https://router.bynara.id/v1/models` | LIST | Get available models for your plan |
| `https://api-images.bynara.id/v1/images/generations` | Image gen | Text-to-image |
| `https://api-images.bynara.id/v1/images/edits` | Image edit | Image editing |

**Test a key before using:**

```bash
curl -s -X POST https://router.bynara.id/v1/chat/completions \
  -H "Authorization: Bearer sk-nry-YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"agnes-2.5-flash","messages":[{"role":"user","content":"hi"}],"max_tokens":10}'
```

**Known working free-tier models:** `agnes-2.5-flash`, `agnes-2.0-flash`

**Check your plan's models:**

```bash
curl -s https://router.bynara.id/v1/models \
  -H "Authorization: Bearer sk-nry-YOUR_KEY" | python3 -c "import sys,json; [print(m['id']) for m in json.load(sys.stdin).get('data',[])]"
```

**IMPORTANT:** Not all 53 models are on every plan. `deepseek-v4-pro-0813-bynara` requires credits. `deepseek-v4-flash-free` may not be included. Always test before configuring.

### NVIDIA NIM API (`integrate.api.nvidia.com/v1`)

NVIDIA NIM provides 82+ models through a single OpenAI-compatible endpoint.\n**Base URL:** `https://integrate.api.nvidia.com/v1`\n**Endpoint:** `https://integrate.api.nvidia.com/v1/chat/completions`\n**Key format:** `nvapi-` (e.g. `nvapi-_qJeGmEP...`)\n\n**Test a key before using:**\n\n```bash\ncurl -s -X POST https://integrate.api.nvidia.com/v1/chat/completions \\\n  -H "Authorization: Bearer nvapi-..." \\\n  -H "Content-Type: application/json" \\\n  -H "Accept: text/event-stream" \\\n  -d '{"model":"nvidia/nemotron-3.5-lightning-30b-a3b","messages":[{"role":"user","content":"hi"}],"max_tokens":10,"stream":true}'\n```\n\n**Known working free-tier models (tested on Termux mobile network):**\n\n| Model ID | Key | Status | Notes |\n|----------|-----|--------|-------|\n| `nvidia/nemotron-3.5-lightning-30b-a3b` | `nvapi-...` | Works | Fast (~5-7s for simple), strong reasoning, supports thinking mode. Most reliable on mobile. |\n| `gpt-oss-20b` | `nvapi-...` | Works | OpenAI-compatible |\n| `deepseek-ai/deepseek-v4-pro-0813` | `nvapi-...` | Timeout risk | Works on desktop, frequently times out on mobile Termux network |\n| `moonshotai/kimi-k3` | `nvapi-...` | Timeout risk | Vision-capable, but times out on mobile network |\n\n**Key asymmetry warning:** Not all models are available on all keys. Key 1 (`nvapi-_qJeGmEP...`) has broader access. Key 2 (`nvapi-WDb7Rr...`) is more restricted — some models return 404. Always test a model with a specific key before configuring.\n\n**Dead key indicators:**\n- `401 Unauthorized` — key invalid/expired\n- `404 Not Found` on a model — model not on this account/key\n- Connection timeout (30s+) — API slow/unreachable from this network\n- Teamorouter `sk-teamo-...` keys → `insufficient_balance` on OpenAI endpoint (`https://api.teamorouter.com/v1`); model not supported on Anthropic endpoint (`https://api.teamorouter.com`). Dead. Provides `deepseek-v4-pro-free` model but unusable without balance.\n\nSee `references/nvidia-api.md` for full details: model-specific Python patterns (Nemotron thinking mode, DeepSeek non-streaming, Kimi vision multimodal), streaming `reasoning_content` extraction, thread-based hard timeout pattern for urllib, and vision payload format.

### API dispatch engine

When you have multiple APIs configured, build a dispatcher that:
1. Classifies the task (math, coding, science, general)
2. Picks the best API based on description text
3. Calls it, returns result
4. Falls back to other APIs if the first fails

See `references/nararouter-api.md` for integration details.

### Use stdlib `urllib`, not `requests`

In Termux, `pip install requests` can time out on large downloads. Use Python's stdlib `urllib` instead — it's always available and handles JSON APIs fine:

```python
import urllib.request, json

def call_api(url, payload, api_key):
    data = json.dumps(payload).encode()
    headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
    req = urllib.request.Request(url, data=data, headers=headers, method="POST")
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read())
```

## Design preferences (user-specific)

**Minimal, professional, non-AI-generated look:**
- Dark theme, tight spacing, no gradients, no decorative shadows
- Monospace fonts where appropriate (code, API keys, timestamps)
- Plain rectangles for chat bubbles — no rounded corners unless functional
- Sidebar = plain list, no icons unless meaningful
- Search for reference implementations rather than generating designs from scratch
- When in doubt, strip features rather than add them

**Concrete anti-patterns — these make a webapp look AI-generated, strip them:**
- Emojis in every header/tile/button (`🤖`, `⚙`, `🎭`, `🔌`, `🧠`, `💬`, `🎤`) — remove. Plain text labels only.
- Accent glow / box-shadow on hover (`box-shadow: 0 0 12px var(--accent-glow)`) — remove. Flat colors only.
- Bounce / pulse / slide-down keyframe animations (`@keyframes bounce`, `@keyframes pulse`, `@keyframes slideDown`) — remove. No motion design.
- Splash-screen welcome card with icons (`.welcome-screen` with `welcome-icon`, `welcome-hints` grid) — replace with a one-line prompt placeholder in the input area.
- Decorative brand icon next to the logo (`.brand-icon` with emoji) — remove.
- Ribbons, badges, status dots decorating the header (`.health-badge`, `.health-dot`) — remove or make purely functional.
- Gradient backgrounds, glassmorphism, translucent overlays — never.

**Rule of thumb:** open the page in a browser and ask "would a human developer hand-write this CSS for a utility tool?" If the answer is no (because it has motion, glow, or emoji decoration), strip it. A normal tool looks like a terminal, a notes app, or a minimal chat — not like a landing page.

**Voice mode:**
- Use Web Speech API (`SpeechRecognition` + `SpeechSynthesis`) — free, browser-built-in
- Toggle button to switch text/voice mode
- In voice mode: mic listens continuously, speech→text→send, response→speak
- Voice quality is limited to what Chrome on Android provides — don't promise "Ultron voice"

**Workflow preferences (user-specific)

**Ask before installing packages:** Before running `pip install` or `apt install`, ask the user first. This is non-negotiable.

**Show progress continuously:** If a task takes more than a few minutes, show intermediate results. Don't disappear for long stretches without output. If stuck on something, say so and what you're trying.

**No security lectures:** The user understands API key risks. Do not lecture about key security, exposure, or best practices unless explicitly asked. They provided their own explanation when relevant.

**Prefer working solutions over perfect architecture:** Get something running first. The NaraRouter key test showed this — test the key, find a working model, configure it. Don't over-plan.

**Storage is volatile — back up to GitHub early:** On Termux/Android, app storage (`~/sayip/storage/`) can be wiped on server restart, Termux restart, or device reboot. After setting up API keys and config, push the project to a GitHub repo over SSH immediately so config can be recovered. In-session, do not assume `storage/` survives a restart — re-check it after any restart. The SSH-over-port-443 trick (see `references/termux-git-ssh.md`) is often needed because mobile networks block port 22.

**Voice mode must be tested end-to-end before declaring it done:** Web Speech API wiring in `chat.js` (`setupVoice`, `startListening`, `speakText`) is not the same as voice mode working. Test by actually speaking into the phone mic and hearing the response spoken back. Chrome on Android is the target browser — that's what matters, not desktop Chrome.

## Debugging

**Port 5000 already in use:**

```bash
fuser -k 5000/tcp  # Kill whatever is on port 5000
# Or use ss to check:
ss -tlnp | grep 5000
```

**Flask app won't start / crashes:**
- Check syntax: `python3 -c "import py_compile; py_compile.compile('app.py', doraise=True)"`
- Check if port is free before starting
- Run with `timeout 15 python3 app.py` to see startup output without blocking

**API returns 401/403/payment_required:**
- The key may be invalid, expired, or the model isn't on your plan
- Test the key directly with curl before configuring it in the app
- Check `/v1/models` to see which models your plan actually includes

**Pip install timeouts:**
- Termux on mobile can have slow/unreliable network for large packages
- Use stdlib alternatives when possible (urllib instead of requests)
- If you must install, use `pip3 install --timeout 30 <package>` to fail fast

**Force-killed background Flask processes leave port held briefly:**
- After `pkill -9 -f "[p]ython3 app.py"`, wait 2-3s before restarting.
- If you get "Address already in use", the old process hasn't fully released the socket yet — wait longer.

**Before restarting the Flask server to pick up code changes, kill the old process first:**
- Pattern: `pkill -9 -f "[p]ython3 app.py" && sleep 3 && cd ~/sayip && python3 app.py &`
- Skipping the kill causes "Address already in use" and the new instance won't start.
- Always verify with `curl -s --max-time 3 http://127.0.0.1:5000/api/health` after restart.

**When user reports the webapp is broken / JS bugged / not working, diagnose in this order:**
1. Confirm the server is running: `curl -s --max-time 3 http://127.0.0.1:5000/api/health`
2. Check that static files serve 200: `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:5000/static/style.css` (and app.js, chat.js, voice.js, settings.js)
3. Check what HTML the server actually serves: `curl -s http://127.0.0.1:5000/ | grep -E 'static/|style.css|app.js|chat.js|voice.js'` — confirms the paths in the HTML match what Flask serves
4. If static files return 404 but HTML links show relative paths like `style.css` instead of `/static/style.css`, that's the bug — patch both templates to use `/static/` prefix
5. Read the JS files and check every `document.querySelector` / `getElementById` / `.querySelector` call against what the HTML actually contains — a missing element crashes the whole script
6. Check for null-reference crashes: `el("hamburger")` on a page that doesn't have a hamburger element, `messagesEl.querySelector(".wrap")` when `.wrap` doesn't exist, `document.querySelector(".composer .wrap")` when `.composer` doesn't exist — these all crash the IIFE and take down the entire page's JS
7. Guard element lookups: `var el = document.querySelector(selector); if (!el) return;` before using the result

**Verify frontend fixes after any HTML/template edit by checking what the server actually serves:**
- A curl to the page URL and grep for the static path (`/static/style.css`, `/static/js/app.js`) confirms the fix landed.
- A curl directly to the static file URL with `-o /dev/null -w '%{http_code}'` confirms it serves 200.
- Do not assume an HTML edit is live until both checks pass against the running server.

**The most common "everything JS bugged" cause on this project:**
- HTML templates using relative static paths (`style.css`, `app.js`, `chat.js`) instead of Flask's `/static/` prefix (`/static/style.css`, `/static/js/app.js`, `/static/js/chat.js`).
- The browser requests `http://127.0.0.1:5000/style.css` → 404. No CSS, no JS loaded → page is unstyled and non-functional.
- Fix: patch both `templates/chat.html` and `templates/settings.html` to use `/static/` prefix on all `<link>` and `<script>` tags.

## Files layout

```
~/sayip/
├── app.py                  # Flask backend
├── requirements.txt        # Python deps (keep minimal — Flask only if possible)
├── storage/
│   ├── apis.json           # API key configs + descriptions
│   ├── memory.json         # Optional: app-level memory
│   └── sessions/           # Per-chat session data
└── templates/
    ├── chat.html           # Chat interface
    └── settings.html       # API config, character, memory
```

## References

- [NaraRouter API details](references/nararouter-api.md) — endpoints, models, key format, known working configs
- [Termux Git + SSH troubleshooting](references/termux-git-ssh.md) — port 22 blocked, SSH over 443, repo setup
- [NaraRouter model discovery](references/nararouter-model-discovery.md) — parallel testing workflow, known free-tier results
- [Evaluating and installing dev tools on Termux](references/evaluating-dev-tools.md) — workflow for when the user pastes install instructions for an external tool (CodeGraph, RTK/headroom, etc.): check feasibility, ask permission, install, verify, use
