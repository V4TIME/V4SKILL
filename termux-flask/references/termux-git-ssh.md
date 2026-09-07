# Termux Git + SSH connectivity troubleshooting

Patterns observed on Termux (Android) when setting up Git + SSH for GitHub backup.
Environment-specific — verify before treating as universal.

## Git installed but `which git` returns nothing

On Termux, `pkg install git` may report "already newest version" while
`which git` finds nothing. This is usually a PATH refresh issue after install
or the shell session not picking up the new binary location.

**Fix:** try `git --version` directly (bypasses PATH lookup), or start a new
shell session. If still missing: `pkg install git` again, then `hash -r` or
restart the terminal.

## SSH to GitHub port 22 blocked

Some networks (mobile carriers, certain WiFi) block outbound port 22.
GitHub provides an SSH endpoint on port 443 as a fallback:

    ssh -T -p 443 git@ssh.github.com

If that works, configure `~/.ssh/config`:

    Host github.com
        HostName ssh.github.com
        Port 443
        StrictHostKeyChecking no
        IdentityFile ~/.ssh/id_ed25519_sayip
        User git

Then `ssh git@github.com` routes through 443 automatically.

**Always test before relying on it** — not all networks that block 22 allow 443
SSH, and some MFA/2FA setups change the auth flow.

## SSH key for GitHub

```bash
ssh-keygen -t ed25519 -C "sayip-backup@termux" -f ~/.ssh/id_ed25519_sayip -N "" -q
cat ~/.ssh/id_ed25519_sayip.pub   # copy this to GitHub Settings → SSH keys
```

## Repo not found via SSH

If `git ls-remote git@github.com:USER/REPO.git` returns "Repository not found":
the repo does not exist yet, or the SSH key is not added to the right account.
Create the repo on GitHub first (website or API with a PAT), then push.

## `gh` CLI unavailable on Termux

The `gh` CLI (`cli/cli` GitHub releases) is not reliably installable on Termux
Android. The official `.deb` releases target `linux/amd64` or `linux/arm64` —
on Termux aarch64 the downloaded `.deb` is often a "Not Found" stub (9 bytes),
and `dpkg` extraction fails. Do not block on installing `gh`; treat it as
optional, not required.

When `gh` is absent AND no `GITHUB_TOKEN` is configured in `~/.hermes/.env`:

- **Creating a repo** requires the web UI: go to `https://github.com/new`,
  name it, leave it empty (no README/.gitignore/LICENSE), click Create.
  Then push the local repo to `git@github.com:USER/REPO.git` over SSH.
- **All other GitHub operations** fall back to `curl` + the GitHub REST API,
  but the API requires a `GITHUB_TOKEN` (personal access token) in the
  `Authorization: token $GITHUB_TOKEN` header. Without a token, the API
  returns `401 Requires authentication`. The SSH key alone authenticates git
  push/pull but does NOT authorize the REST API.
- **Setup order when starting fresh on Termux:**
  1. Generate SSH key → add to GitHub Settings → SSH keys (covered above).
  2. Create the repo via web UI (or install `gh` on a desktop and run
     `gh repo create` from there).
  3. Locally: `git init && git add -A && git commit -m "..." && git remote add
     origin git@github.com:USER/REPO.git && git push -u origin main`.
  4. Optionally, get a GitHub PAT at `https://github.com/settings/tokens` and
     add `GITHUB_TOKEN=ghp_...` to `~/.hermes/.env` for API access (issues,
     PRs, releases, repo metadata via `curl`).

**Do not recommend `pip install gh` or `apt install gh` on Termux** — there is
no pip package for `gh`, and the apt repository may not carry it. If `gh` is
needed for a workflow that truly cannot be done via `curl` + SSH (e.g. managing
GitHub Actions secrets, which require encrypted API calls), flag it as a
desktop-only operation and recommend the user run it from a non-Termux machine.
