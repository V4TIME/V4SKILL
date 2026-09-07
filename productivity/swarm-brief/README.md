# swarm-brief

Decision guide. When to delegate to drytalk subagents instead of doing the work inline.

## What it does

Tells main thread when to spawn a drytalk-style subagent. Compact return
contracts can reduce repeated prose when results return to main context, but
effect depends on task, agent, and delegation count. This skill publishes no
universal reduction rate.

Three subagents:

| Subagent | Job | Use when |
|----------|-----|----------|
| `swarm-brief-investigator` | Locate code (read-only) | "Where is X defined / what calls Y / list uses of Z" |
| `swarm-brief-builder` | Surgical edit, 1-2 files | Scope is obvious, ≤2 files. Refuses 3+ file scope. |
| `swarm-brief-reviewer` | Diff/file review | One-line findings with severity emoji |

Use vanilla `Explore` or `Code Reviewer` when you want prose, architecture commentary, or rationale. Use main thread directly for one-line answers and 3+ file refactors.

This skill is a decision guide, not a slash command. It activates when the conversation mentions delegation.

## How to invoke

Triggers on phrases like "delegate to subagent", "use swarm-brief", "spawn investigator", "save context", "compressed agent output".

## Example chaining

Locate → fix → verify (most common):

1. `swarm-brief-investigator` returns site list (`path:line`, symbol, note)
2. Main thread picks 1-2 sites, hands paths to `swarm-brief-builder`
3. `swarm-brief-reviewer` audits the resulting diff

Parallel scout: spawn 2-3 `swarm-brief-investigator` calls in one message with different angles (defs, callers, tests). Aggregate in main.

## Model overrides

By default, `swarm-brief-reviewer` and `swarm-brief-investigator` pin `model: haiku` in their frontmatter; `swarm-brief-builder` has no `model:` line (uses the API session default). Set env vars in your shell before launching Claude Code to override per-agent:

| Env var | Agent |
|---|---|
| `SWARM_BRIEF_REVIEWER_MODEL` | `swarm-brief-reviewer` |
| `SWARM_BRIEF_BUILDER_MODEL` | `swarm-brief-builder` |
| `SWARM_BRIEF_INVESTIGATOR_MODEL` | `swarm-brief-investigator` |

Example: run reviewer on sonnet and keep others on default.

```sh
export SWARM_BRIEF_REVIEWER_MODEL=sonnet
```

Use the same model name strings you'd use in any Claude Code agent frontmatter (e.g. `haiku`, `sonnet`, `opus`).

Overrides patch only `model:` line in installed agent frontmatter; prompt body
stays untouched and continues receiving upstream updates. Only plugin installs
have local agent files to patch. Empty variables do nothing. Patch persists until
plugin update or reinstall.

## See also

- [`SKILL.md`](./SKILL.md): full decision matrix and output contracts
- [`agents/swarm-brief-investigator.md`](../../agents/swarm-brief-investigator.md)
- [`agents/swarm-brief-builder.md`](../../agents/swarm-brief-builder.md)
- [`agents/swarm-brief-reviewer.md`](../../agents/swarm-brief-reviewer.md)
- [Caveman README](../../README.md): repo overview
