---
name: token-audit
description: >
  Show real token usage and estimated savings for the current session, read
  from the session log. Trigger: /token-audit.
tags: [drytalk, stats, token, usage, savings, estimate, session, overhead]
---

This skill is delivered by `hooks/token-audit.js` (read by `hooks/drytalk-mode-tracker.js` on `/token-audit`). The model does not need to do anything when this skill fires — the hook returns `decision: "block"` with the formatted stats as the reason. The user sees the numbers immediately.

Output also includes `Est. rule overhead` and `Est. net` lines wherever a savings estimate exists with a known turn count. Rule overhead is the estimated per-turn INPUT-token cost of the injected drytalk rules (default 1,250 tokens/turn, override with `CAVEMAN_RULE_OVERHEAD_TOKENS`) times the turn count. Net is savings minus that overhead — when negative, the output says so plainly and suggests turning drytalk off for that workload, rather than hiding the net-negative regime behind a gross-savings number (see `docs/HONEST-NUMBERS.md`).
