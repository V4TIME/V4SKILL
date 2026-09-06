# Coding Discipline — User-Enumerated Rules

## Source

User explicitly enumerated these 7 rules during a session on 2026-09-03.
They are the baseline operating procedure for ALL coding tasks in this project.
They are encoded in the parent SKILL.md (systematic-agent) and this reference
captures the verbatim rules + the context in which they were given.

## Verbatim Rules (from user)

> For every coding task:
> - Never assume facts about the project.
> - Inspect relevant files before changing anything.
> - Make a concise plan before execution.
> - Use tools to verify claims instead of guessing.
> - After every significant modification, test or inspect the result.
> - If something fails, diagnose the actual error before trying another approach.
> - Do not say a task is complete until the result has been verified.

## Context

These rules came in response to a user complaint that the agent was taking too
long / not being systematic. The user pointed to the Hermes Agent docs on memory
and skills as reference for how skills should work, and also referenced
`https://github.com/addyosmani/agent-skills` as an example of structured
workflow skills.

The user explicitly said: "thats called ai hallucnation you have to use a tool
to fix it or u gonna repeat that kinda problem again" — i.e., reading the same
code over and over without acting is a failure mode, and the fix is to use tools
to verify rather than guess.

## Hermes Skill System Reference

- Skills live in `~/.hermes/skills/` — source of truth, editable by curator
- Format: `SKILL.md` with YAML frontmatter (name, description, version, platforms,
  metadata.hermes.tags, metadata.hermes.requires_toolsets, etc.)
- Progressive disclosure: `skills_list()` → `skill_view(name)` → `skill_view(name, path)`
- A skill is in play only during the session turn(s) it is loaded via `skill_view()`
- Skills are NOT continuously active background processes
- Protected skills (DO NOT edit): bundled, hub-installed, external_dirs, PINNED,
  USER-OWNED (hand-written, installed by URL, or created by a foreground agent)
- For user-owned skills that are wrong/outdated: recommend `hermes curator adopt <name>`

Reference URLs (canonical):
- Memory: `https://raw.githubusercontent.com/mikesmarcos/hermes-agent-NousResearch/main/website/docs/user-guide/features/memory.md`
- Skills: `https://raw.githubusercontent.com/mikesmarcos/hermes-agent-NousResearch/main/website/docs/user-guide/features/skills.md`
- Agent skills (example pack): `https://github.com/addyosmani/agent-skills`

## webmxerz Usage Pattern (from this session)

- The `webmxerz` skill was consulted earlier in this session for design
  guidance (color palette, typography, UX principles) and applied to `style.css`
- It is a reference skill loaded on demand via `skill_view("webmxerz")` —
  it is NOT a continuously active background process
- When doing UI work, invoke it for design guidance; when doing the code changes
  that implement the design, this systematic-agent skill governs the HOW

## Anti-Pattern the User Called Out

"Tracing the same lines repeatedly without acting" = AI hallucination loop.
The fix: use `read_file`/`grep`/`terminal` to get ground truth, then act.
If you've read a function 3 times and haven't edited it, you're stuck —
state what's blocking you or make the change.
