VIDVAULT — Telegram video saver bot (encrypted)
================================================

WHAT IT IS
  A DM-only Telegram bot. Each user creates a vault protected by their own
  password. Videos are saved by number: /save, /videos, /play <#>, /delete <#>.
  Everything about a vault (including video references and captions) is
  AES-256-GCM encrypted with a key derived from the user's password (scrypt).
  The password itself is NEVER stored anywhere.

SECURITY MODEL
  • setup    : vault = { salt, ciphertext }  — password proof-of-knowledge
  • login    : wrong password = GCM auth-tag failure, blocked
  • lockout  : 5 wrong attempts -> 10 minute lock
  • sessions : unlocked for 20 min per login (configurable)
  • privacy  : any message containing /setup or /login + a password is
               auto-deleted, and raw passwords are never logged
  • at rest  : data/vaults.json.enc is gibberish without the password
  • /reset   : wipes a vault so a forgotten password can start over
               (requires being logged in first, so it can't be abused)

COMMANDS
  /start          personalized welcome
  /setup <pw>     create vault (first time)
  /login <pw>     unlock
  /logout         lock now
  save            reply /save to any video (or just send the video unlocked)
  /videos         numbered list
  /play <#>       watch a saved video
  /delete <#>     delete a saved video (numbers re-order after delete)
  /reset          erase vault (start over)
  /about          who made the bot (OWNER_NAME)
  /help           quick help

FILES
  bot.js        — the whole bot, zero npm dependencies (Node >= 18)
  .env          — BOT_TOKEN, OWNER_NAME, options (chmod 600)
  package.json  — for hosts that need it
  render.yaml   — Render.com free-tier blueprint
  data/         — encrypted vault storage (created at runtime)

RUN ANYWHERE (it only needs Node 18+ and outbound HTTPS)
  local dev : node bot.js
  Render    : push this folder to a GitHub repo → New → Blueprint →
              paste render.yaml → set BOT_TOKEN secret → Deploy. Free plan.
  Railway   : new project → deploy from repo → add BOT_TOKEN var → start.
  Any VPS/CI hobby tier works too — no database, no domain needed.

IMPORTANT
  • "Telegram beta server" is not a hosting service — Telegram runs bot
    messages, but the bot's code must live somewhere. Free cloud hosts
    (Render/Railway free tiers) are the no-phone options.
  • If this token was ever pasted into a chat, reset it with @BotFather
    (/revoke) and put the fresh one in .env of the deployed copy.
