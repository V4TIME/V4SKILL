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
