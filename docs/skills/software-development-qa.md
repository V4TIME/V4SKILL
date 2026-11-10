# Software Development & QA

[← Back to the skill catalog](../SKILLS.md) · [Main README](../../README.md)

**github (GitHub via gh CLI — PRs, Issues, Reviews, Repos, Auth)**
- **What it does:** Interacts with GitHub via the `gh` CLI — pull requests (create, view, checkout, merge), issues (create, list, search, close), code reviews (request review, view reviews, comment), repository management (create, clone, fork, view), authentication (`gh auth`), CI troubleshooting, and conventional commits.
- **Why use it:** When you need to automate GitHub workflows from Hermes — create PRs, review code, manage issues, check CI status, handle auth.
- **Main contents:** gh CLI usage, PR workflow (create PR, checkout PR, view PR, merge PR), issue management (create issue, list issues, search issues, close issues), code review (request review, view reviews, review output template), repo management (create repo, clone, fork, view repo settings), auth (`gh auth login`, `gh auth status`, gh-env.sh script, git-credential-token.py), CI troubleshooting, conventional commits reference, templates (bug-report.md, feature-request.md, pr-body-bugfix.md, pr-body-feature.md), references (auth, CI troubleshooting, code review, conventional commits, GitHub API cheatsheet, issue-to-PR, issues, PR workflow, repo management, review output template).
- **Keywords:** GitHub, gh CLI, PR, pull request, issues, code review, repos, auth, CI, git, conventional commits, GitHub API, repository management, fork, clone, merge, review, bug report, feature request.

**requesting-code-review (Pre-commit Review — Security Scan, Quality Gates, Auto-fix)**
- **What it does:** Performs pre-commit code review with security scanning, quality gates, and auto-fix suggestions. Integrates with GitHub for PR-based reviews and subagent-driven development for parallel review.
- **Why use it:** Before committing code, when you want a security scan, quality gate check, and auto-fix recommendations — catches vulnerabilities, style issues, and anti-patterns before they land.
- **Main contents:** Pre-commit review workflow, security scanning, quality gates, auto-fix suggestions, integration with subagent-driven development for parallel review, integration with test-driven development, GitHub PR review integration.
- **Keywords:** code review, pre-commit, security, quality, auto-fix, verification, gates, security scan, code quality, vulnerability detection, static analysis, before commit, PR review, subagent-driven development.

**simplify-code (Parallel 4-Agent Cleanup of Recent Code Changes)**
- **What it does:** Cleans up and simplifies recent code changes using a parallel 4-agent delegation pattern. Spawns multiple subagents to review, refactor, and clean up code in parallel.
- **Why use it:** After a batch of code changes, when you want to simplify, refactor, and clean up — parallel agents work on different aspects simultaneously.
- **Main contents:** Parallel 4-agent delegation pattern, code cleanup and simplification, refactoring, subagent coordination, integration with requesting-code-review and test-driven-development.
- **Keywords:** simplify, cleanup, refactor, delegation, subagent, parallel, code review, code simplification, refactoring, parallel agents, 4-agent pattern, code cleanup.

**codebase-inspection (Inspect Codebases with pygount — LOC, Languages, Ratios)**
- **What it does:** Inspects codebases using pygount to report lines of code (LOC), language breakdown, and code ratios. Gives a quantitative picture of a codebase's composition.
- **Why use it:** When you need to understand a codebase's size and language composition — how many lines in each language, what's the ratio of test code to production code, etc.
- **Main contents:** pygount usage, LOC counting, language detection, code ratio analysis, codebase metrics, repository analysis.
- **Keywords:** codebase, inspect, LOC, language, ratio, pygount, metrics, repository, code analysis, lines of code, language breakdown, code metrics, codebase composition.

**dogfood (Exploratory QA of Web Apps — Find Bugs, Evidence, Reports)**
- **What it does:** Performs exploratory QA testing of web applications — finds bugs, gathers evidence, and produces structured reports. Uses browser tools for web app exploration.
- **Why use it:** When you need to QA a web app — explore it like a user would, find bugs, document evidence, and produce a clear report.
- **Main contents:** Exploratory QA methodology, bug finding, evidence gathering, report generation, browser-based testing, issue taxonomy reference, dogfood report template.
- **Keywords:** QA, testing, browser, web, dogfood, bug, explore, evidence, report, exploratory testing, web app testing, bug report, quality assurance, user testing, issue taxonomy.

**systematic-debugging (4-Phase Root Cause Debugging — Understand Bugs Before Fixing)**
- **What it does:** A disciplined 4-phase debugging methodology — understand the bug fully before attempting to fix it. Prevents premature fixes and ensures root causes are identified.
- **Why use it:** When debugging complex issues — don't just try random fixes; follow a systematic process to understand the root cause first.
- **Main contents:** 4-phase debugging process, root cause analysis, problem understanding, investigation methodology, integration with test-driven-development and subagent-driven-development.
- **Keywords:** debug, root cause, 4-phase, troubleshooting, problem-solving, investigation, systematic debugging, bug fixing, debugging methodology, root cause analysis, diagnose.

**test-driven-development (TDD — Enforce RED-GREEN-REFACTOR, Tests Before Code)**
- **What it does:** Enforces Test-Driven Development (TDD) with the RED-GREEN-REFACTOR cycle — write tests first, watch them fail (RED), write minimal code to pass (GREEN), then refactor. Integrates with systematic-debugging and subagent-driven-development.
- **Why use it:** When you want to practice TDD — tests before code, red-green-refactor cycle, test-first development discipline.
- **Main contents:** TDD methodology, RED-GREEN-REFACTOR cycle, test-first development, integration with systematic-debugging, integration with subagent-driven-development, quality enforcement.
- **Keywords:** TDD, test, red-green-refactor, testing, development, quality, test-driven development, test first, unit testing, red green refactor, testing methodology.

**idea-test-lab (Throwaway Experiments to Validate an Idea Before Build)**
- **What it does:** Runs throwaway experiments (spikes) to validate an idea before committing to a real build. Decomposes the idea into 2-5 independent feasibility questions, researches each, builds quick prototypes, and delivers verdicts (VALIDATED | PARTIAL | INVALIDATED). Adapted from GSD (Get Shit Done) project's spike workflow.
- **Why use it:** When you have an idea and want to validate feasibility before building — decompose into spikes, research, build quick prototypes, get honest verdicts.
- **Main contents:** Spike methodology (decompose → research → build → verdict loop), decomposition into 2-5 feasibility questions with Given/When/Then framing, spike types (standard — one approach, one question; comparison — same question, different approaches with letter suffixes), good vs bad spike questions, ordering by risk (most likely to kill the idea runs first), alignment for multi-spike ideas (present spike table, let user adjust), research per spike (brief it, surface competing approaches with tool/library pros/cons/status, pick one, skip for pure logic), build (one directory per spike, bias toward interactive output — CLI, HTML page, web server, unit test; depth over speed — test edge cases, follow surprises; avoid complex package management, build tools, Docker, env files, config — hardcode everything), verdict format (VALIDATED/PARTIAL/INVALIDATED with what worked, what didn't, surprises, recommendation), comparison spikes (head-to-head after building both), frontier mode (picking what to spike next — integration risks, data handoffs, gaps in vision, alternative approaches), output (create spikes/ directory, one dir per spike with README.md, keep code throwaway), GSD integration note (if gsd-spike shows up as sibling skill, prefer gsd-spike for full GSD workflow with persistent .planning/spikes/ state, MANIFEST tracking, Given/When/Then verdict format, commit patterns), attribution (adapted from gsd-build/get-shit-done by Lex Christopherson, MIT 2025).
- **Keywords:** spike, prototype, experiment, feasibility, throwaway, exploration, research, planning, MVP, proof-of-concept, idea validation, GSD, get-shit-done, feasibility study, prototype, before build, risk assessment.

**systematic-agent (Disciplined Coding — Inspect Before Change, Verify After)**
- **What it does:** The meta-skill enforcing disciplined coding practices on every task — inspect before making changes, verify after, and apply coding discipline rules consistently. Works alongside all other software development skills.
- **Why use it:** As a default overlay on any coding task — ensures every change is preceded by inspection and followed by verification, preventing careless edits.
- **Main contents:** Disciplined coding rules, inspect-before-change principle, verify-after principle, integration with spike experiments (rules still apply even for throwaway work), coding discipline user rules reference.
- **Keywords:** systematic, agent, coding, disciplined, inspect, plan, verify, diagnose, coding discipline, inspect before change, verify after, software engineering discipline, coding standards.

**node-inspect-debugger (Debug Node.js via --inspect + Chrome DevTools Protocol CLI)**
- **What it does:** Debugs Node.js applications via the `--inspect` flag and Chrome DevTools Protocol (CDP) CLI. Supports breakpoints, DAP (Debug Adapter Protocol), and remote debugging.
- **Why use it:** When you need to debug Node.js code — set breakpoints, step through execution, inspect variables, use Chrome DevTools for Node debugging.
- **Main contents:** Node.js --inspect flag, CDP debugging, breakpoints, DAP (Debug Adapter Protocol), remote debugging, integration with systematic-debugging and python-debugpy.
- **Keywords:** Node.js, debug, inspect, Chrome DevTools, CDP, breakpoints, DAP, Debug Adapter Protocol, Node.js debugging, remote debugging, JavaScript debugging, --inspect.

**python-debugpy (Debug Python via pdb REPL + debugpy Remote DAP)**
- **What it does:** Debugs Python code via pdb REPL and debugpy for remote DAP (Debug Adapter Protocol) debugging. Supports breakpoints, post-mortem debugging, and remote debugging sessions.
- **Why use it:** When you need to debug Python code — use pdb for interactive debugging, debugpy for remote/IDE-integrated debugging with breakpoints and variable inspection.
- **Main contents:** pdb REPL usage, debugpy remote debugging, DAP support, breakpoints, post-mortem debugging, remote debugging sessions, integration with systematic-debugging and node-inspect-debugger.
- **Keywords:** Python, debug, pdb, debugpy, breakpoints, DAP, Debug Adapter Protocol, post-mortem, remote debugging, Python debugging, interactive debugging.

**sdlc-review (Review Kanban Handoffs, Route Verified Outcomes)**
- **What it does:** Independently verifies work handed from a Kanban implementation run to the review lane, then approves, requests changes, or escalates — without taking over the implementer's work.
- **Why use it:** When a Kanban task moves to review and you need an evidence-based verdict on the deliverable before it ships.
- **Main contents:** When to use, prerequisites, review lenses, procedure (orient from the durable task record, verify the deliverable and its evidence), approve/request-changes/escalate routing, and ad-hoc review fan-out guidance. Requires the `kanban` toolset.
- **Keywords:** devops, kanban, review, handoff, quality, verification, route, SDLC, code review, operations.

---

[← Back to the skill catalog](../SKILLS.md)
