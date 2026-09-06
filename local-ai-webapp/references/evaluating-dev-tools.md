# Evaluating and Installing Dev Tools on Termux Phone

When the user pastes install instructions for an external dev tool (CodeGraph, RTK/headroom, ui-ux-pro-max-skill, etc.) and says "install this and use it", follow this workflow.

## Step 1: Read what the tool is

Before installing, understand what you're dealing with:
- What language/ecosystem? (Rust binary, Node.js, Python package, shell script)
- What does it do? (CLI tool, MCP server, code indexer, output compressor)
- Does it have a Hermes/hermes-agent integration?
- What's the install method? (curl|sh standalone binary, cargo install, npx, pip, brew)

## Step 2: Check what's available on the device

On Termux/Android, check before assuming anything:

```bash
# Check for required runtimes
command -v node npm npx cargo curl sh python3  # which exist

# Check architecture (Termux on Galaxy M35 = aarch64)
uname -m  # aarch64

# Check disk space
df -h ~ | tail -1  # need enough free

# Check RAM
free -h | head -2  # needed for the tool

# Check if a package is already installed
pkg list-installed 2>/dev/null | grep -i "node\|rust\|cargo"
```

## Step 3: Evaluate feasibility

For each install method:

| Method | Feasibility on Termux aarch64 | Notes |
|--------|-------------------------------|-------|
| Standalone Linux binary (curl|sh) | Usually yes — if it has a linux-arm64 release | Check GitHub releases for `*-linux-arm64.tar.gz` or similar |
| `cargo install <crate>` | Yes if Rust/cargo already installed | Termux has rust 1.98+ available via `pkg install rust` |
| `npx <package>` / `npm` | Yes if Node.js installed | Termux has node via `pkg install nodejs` |
| `pip install <package>` | Sometimes — can time out on mobile | Prefer stdlib alternatives; if needed, `pip3 install --timeout 30` |
| `brew install` | No — Homebrew doesn't work on Android/Termux | |

## Step 4: Ask the user before installing

User explicitly instructed: "Ask me before installimg like this everytime its a important skill."

Present findings and ask:
- "Tool X is a [description]. It's installable on your device via [method]. [Size/PKG requirements]. Want me to install it?"
- If it needs a package the user doesn't have: "Needs [package]. Want me to install that first?"

## Step 5: Install

Once the user says yes:

For standalone binary (e.g. CodeGraph):
```bash
curl -fsSL https://raw.githubusercontent.com/<owner>/<repo>/main/install.sh | sh
# Or download the specific asset:
curl -L -o /tmp/tool.tar.gz https://github.com/<owner>/<repo>/releases/download/<tag>/<asset>
tar -xzf /tmp/tool.tar.gz -C ~/.local/bin/
```

For Rust/cargo (e.g. RTK/headroom):
```bash
cargo install <crate>
# RTK specifically: cargo install rtk
```

For npm/npx:
```bash
npm install -g <package>
# or run once without installing: npx <package> <command>
```

For Python/pip:
```bash
pip3 install --timeout 30 <package>
```

## Step 6: Verify and wire up

```bash
# Check it installed
command -v <tool>
<tool> --version  # or similar

# If the tool has a Hermes/hermes-agent integration, follow its instructions
# e.g. for RTK: rtk init --agent hermes
# e.g. for CodeGraph: codegraph install  (wires into Hermes Agent)

# Test with a simple command
<tool> <simple-test-command>
```

## Known tools the user has expressed interest in

| Tool | What it does | Install method | Hermes integration |
|------|-------------|----------------|-------------------|
| **CodeGraph** (colbymchenry/codegraph) | Code indexer/graph for agents; wires into Claude Code, Cursor, Codex, opencode, Hermes Agent, Gemini CLI, Antigravity, Copilot | Standalone binary (curl|sh) or npm | `codegraph install` wires into Hermes Agent |
| **RTK / headroom** (headroomlabs-ai/headroom) | Compresses shell command output before it reaches the LLM; reduces bash tokens by up to 90% | `cargo install rtk` or pip wheel | `rtk init --agent hermes` for Hermes plugin |
| **WebMXERZ** (nextlevelbuilder/webmxerz) | Design reference skill: BM25 search over 13 CSV databases (style, color, typography, icons, motion, UX, etc.) + `--design-system` mode | Clone repo; Python 3 script | Installed as Hermes skill at `~/.hermes/skills/webmxerz/` |
| **systematic-agent skill** | Engineering discipline: read before touch, inspect before change, plan before execute, verify with tools not guesses, test after modification, diagnose actual error, don't declare done until verified | Created at `~/.hermes/skills/systematic-agent/SKILL.md` | N/A (Hermes-side skill) |

## Step 7: After installing, actually use it per the user's instructions

The user said "install this and use according to its instructions." After installing:
1. Read the tool's docs (README, `--help`, web docs)
2. Follow the tool's own workflow (e.g. CodeGraph: `codegraph init` in the project dir; RTK: `rtk init --agent hermes` then use rtk-prefixed commands)
3. Show the user the result — don't just install and stop

## Pitfalls

- **Don't assume a tool works just because the install script succeeded.** Test it.
- **Don't assume the tool's Hermes integration is the same as other agents.** CodeGraph and RTK both list Hermes Agent as a supported agent — but the integration method (plugin API, hook, wrapper) may differ. Follow the tool's Hermes-specific instructions.
- **Termux aarch64 can't run x86_64 Linux binaries.** Check the release assets for `linux-arm64` not `linux-x64`.
- **Mobile network can make large downloads slow.** A 58MB binary download may take a while on 4G/5G. Set a generous timeout or run in background.
- **The user only has a phone — no PC.** Any tool that requires a desktop browser, GUI, or desktop-only feature won't work.
- **Some tools assume a desktop/dev-machine environment.** CodeGraph's UI (`codegraph ui`) opens a browser at localhost — that works on the phone's Chrome. RTK's hook rewrites shell commands — that works in Termux's bash.

## What to do when the user says "install X and use it"

1. Read what X is (web_extract the repo README if needed)
2. Check device feasibility (command -v, uname -m, df, free)
3. Identify the install method and whether it needs extra packages
4. Present findings + ask user for permission
5. On yes: install, verify, wire up per tool's instructions
6. Use the tool on the current task as the user directed
