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

## Repository audit — November 2026

A full audit of the repository (commit `ff85d36` plus the installer changes)
found **no malware, backdoor, API-key stealer, credential exfiltration, or
hidden remote-code execution**. Nothing malicious was removed because nothing
malicious was present.

Scope of the audit:

- **Every executable file:** 63 Python, 5 shell, and 3 JavaScript/MJS scripts,
  plus all `SKILL.md` and reference Markdown.
- **Network destinations:** only documented service endpoints appear
  (`googleapis.com`, `archive.org`, `r.jina.ai`, `export.arxiv.org`,
  `nominatim.openstreetmap.org`, `router.project-osrm.org`, `timeapi.io`,
  `github.com`, `fonts.googleapis.com`, `example.com`, `w3.org`, and
  `localhost`). No unknown collection hosts.
- **Credential access:** searches for `~/.ssh`, `~/.aws`, `~/.gnupg`, `~/.kube`,
  `~/.docker`, `.netrc`, `id_rsa`, keychains, `/etc/passwd`, and cloud/API token
  names. Every hit is documented, user-facing behavior (see below).
- **Dangerous APIs:** no `eval`, dynamic `exec`, `pickle.loads`,
  `marshal.loads`, `shell=True` subprocesses, or obfuscated/base64 payloads.
  The only `vm.runInNewContext` call is a unit test evaluating a fixed CSV
  example string.
- **Git history:** two commits, no deleted files, and no secret patterns in any
  revision. There are no binary blobs, symlinks, or hidden Unicode control
  characters in the tree.
- **Dependencies:** no `package.json`, lockfile, or install hooks. The only
  dependency installer is `productivity/google-workspace/scripts/setup.py`,
  which installs the official Google API client packages with `pip`/`uv`.

Sensitive-looking behavior that is intentional and local-only:

- `software-development/github/scripts/git-credential-token.py` reads the
  local `~/.git-credentials` file and prints a GitHub token to its caller so
  `gh`/`curl` auth works. It makes no network request and does not write the
  token anywhere else.
- `software-development/github/scripts/gh-env.sh` reads `GITHUB_TOKEN` from the
  environment or `~/.hermes/.env` for local CLI authentication.
- `productivity/memoshrink/scripts/compress.py` **refuses** to compress
  `.env`, `.ssh`, `.aws`, `.gnupg`, `.kube`, credential, key, and similar files
  rather than sending them to an LLM.
- `productivity/google-workspace/` stores OAuth tokens in the Hermes home and
  passes them only to the official `gws` CLI.
- `web/blocked-page-recovery/` contacts archive.org and archive.today for
  snapshots, and `r.jina.ai` only when `JINA_API_KEY` is set.
- Skills that install external CLIs sometimes document an upstream
  `curl … | bash` command. Those commands come from the vendor's own docs, not
  from this repository; review them as you would any vendor installer.
