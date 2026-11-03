# Security Policy

## What this repository is

V4SKILL is a collection of **agent skills** — Markdown files (`SKILL.md`) plus
supporting scripts and references that an AI agent such as Hermes Agent loads
and follows. Skills are not passive documentation: loading a skill can cause an
agent to run shell commands, read files, call APIs, and act on your behalf.

Treat every skill as executable instructions. Review before you install.

## Reporting a vulnerability

If you find a security issue in this repository — for example a skill that
exfiltrates data, a malicious shell command, a hardcoded secret, a prompt
injection, or a script with unsafe defaults — please report it privately:

- Open a **private** security advisory on GitHub:
  <https://github.com/V4TIME/V4SKILL/security/advisories/new>
- Or contact the maintainer (`@V4TIME`) directly.

Please do **not** open a public issue for security problems. Include the
skill path, a description, and reproduction steps if possible.

## Scope and risk notes

- Skills under `autonomous-ai-agents/` may instruct an agent to run coding CLIs
  with sandbox bypass flags (for example `--dangerously-bypass-approvals-and-sandbox`).
  Only use these in disposable, isolated environments.
- Skills under `email/` and `productivity/` may handle credentials and private
  data. Use scoped tokens and least-privilege accounts.
- Some skills are adapted from external projects and are covered by their own
  licenses and security posture. Check each `SKILL.md`.
- Scripts in this repository are provided as-is. Read a script before running it.

## Hardening recommendations for users

1. Pin to a commit or tag instead of tracking `main` when possible.
2. Keep credentials in environment variables or a secret manager, never in
   skill files or the repository.
3. Run agent tooling in a sandbox or container, especially when a skill asks for
   broad filesystem, network, or desktop-automation access.
4. Review `git diff` after pulling updates before letting an agent load new skills.

## Supported versions

The latest commit on `main` is the only supported version. Security fixes are
applied there.
