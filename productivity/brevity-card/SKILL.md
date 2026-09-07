---
name: brevity-card
description: >
  Quick-reference card for drytalk modes, skills and commands.
  Trigger: /brevity-card or "drytalk help".
tags: [drytalk, help, quick-ref, reference, modes, commands, card]
---

# Caveman Help

Display this reference card when invoked. One-shot — do NOT change mode, write flag files, or persist anything. Output in drytalk style.

## Modes

| Mode | Trigger | What change |
|------|---------|-------------|
| **Lite** | `/drytalk lite` | Drop filler. Keep sentence structure. |
| **Full** | `/drytalk` | Drop articles, filler, pleasantries, hedging. Fragments OK. Default. |
| **Ultra** | `/drytalk ultra` | Extreme compression. Bare fragments. Tables over prose. |
| **Wenyan-Lite** | `/drytalk wenyan-lite` | Classical Chinese style, light compression. |
| **Wenyan-Full** | `/drytalk wenyan` | Full 文言文. Maximum classical terseness. |
| **Wenyan-Ultra** | `/drytalk wenyan-ultra` | Extreme. Ancient scholar on a budget. |

Mode stick until changed or session end.

## Skills

| Skill | Trigger | What it do |
|-------|---------|-----------|
| **commit-shorthand** | `/commit-shorthand` | Terse commit messages. Conventional Commits. ≤50 char subject. |
| **pr-shorthand** | `/pr-shorthand` | One-line PR comments: `L42: bug: user null. Add guard.` |
| **memoshrink** | `/memoshrink <file>` | Compress .md files to drytalk prose. Saves ~46% input tokens. |
| **brevity-card** | `/brevity-card` | This card. |

## Deactivate

Say "stop drytalk" or "normal mode". Resume anytime with `/drytalk`.

## Language

Keep user's language by default. User write Portuguese → reply Portuguese drytalk. Compress the style, not the language. Technical terms, code, commands, commit types, and exact error strings stay verbatim unless user ask for translation.

## Configure Default Mode

Default mode = `full`. Change it:

**Environment variable** (highest priority):
```bash
export CAVEMAN_DEFAULT_MODE=ultra
```

**Config file** (`~/.config/drytalk/config.json`):
```json
{ "defaultMode": "lite" }
```

Set `"off"` to disable auto-activation on session start. User can still activate manually with `/drytalk`.

Resolution: env var > config file > `full`.

## More

Full docs: https://github.com/JuliusBrussee/caveman
