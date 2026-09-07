# brevity-card

Quick-reference card. One shot, no mode change.

## What it does

Prints a cheat sheet of all drytalk modes, sibling skills, deactivation triggers, and how to set the default mode via env var or config file. One-shot display — does not flip the active mode, write flag files, or persist anything. Use when you forget the slash commands.

## How to invoke

```
/brevity-card
```

Also triggers on "drytalk help", "what drytalk commands", "how do I use drytalk".

## Example output

```
Modes:
  /drytalk              full (default)
  /drytalk lite         lighter
  /drytalk ultra        extreme
  /drytalk wenyan       classical Chinese

Skills:
  /commit-shorthand       terse Conventional Commits
  /pr-shorthand       one-line PR comments
  /token-audit        session token savings

Deactivate:
  "stop drytalk" or "normal mode"
```

## See also

- [`SKILL.md`](./SKILL.md) — full reference card
- [Caveman README](../../README.md) — repo overview
