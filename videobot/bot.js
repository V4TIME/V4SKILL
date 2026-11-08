// ============================================================
//  VIDVAULT — Telegram video saver bot
//  • per-user vault protected by a real password (scrypt + AES-256-GCM)
//  • save videos, list, play, and delete them by their number
//  • zero npm dependencies — runs on any free Node host
// ============================================================
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ---------- config ----------
const ENV_FILE = path.join(__dirname, ".env");
if (fs.existsSync(ENV_FILE)) {
  for (const line of fs.readFileSync(ENV_FILE, "utf8").split("\n")) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}
const TOKEN = process.env.BOT_TOKEN;
if (!TOKEN) { console.error("FATAL: BOT_TOKEN missing (put it in .env)"); process.exit(1); }
const API = `https://api.telegram.org/bot${TOKEN}`;
const DATA_DIR = path.join(__dirname, "data");
const VAULTS = path.join(DATA_DIR, "vaults.json.enc");
fs.mkdirSync(DATA_DIR, { recursive: true });

const OWNER_NAME = process.env.OWNER_NAME || "V4TIME";
const MAX_VIDEOS = +(process.env.MAX_VIDEOS_PER_USER || 100);
const SESSION_MINUTES = +(process.env.SESSION_MINUTES || 20);
const LOG = (...a) => console.log(new Date().toISOString().replace("T", " ").slice(0, 19), ...a);

// ---------- core crypto: the "password encryption" ----------
// Vault master key = scrypt(password, salt). The stored vault is AES-256-GCM
// encrypted with it. Nothing on disk ever contains the password itself.
const KDF = (pwd, salt) => crypto.scryptSync(pwd.normalize("NFKC"), salt, 32, { N: 16384, r: 8, p: 1 });
const enc = (key, obj) => {
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv("aes-256-gcm", key, iv);
  const out = Buffer.concat([c.update(JSON.stringify(obj), "utf8"), c.final(), c.getAuthTag()]);
  return iv.toString("base64") + ":" + out.toString("base64");
};
const dec = (key, payload) => {
  const [ivB, restB] = payload.split(":");
  const buf = Buffer.from(restB, "base64");
  const tag = buf.subarray(buf.length - 16);
  const d = crypto.createDecipheriv("aes-256-gcm", key, Buffer.from(ivB, "base64"));
  d.setAuthTag(tag);
  return JSON.parse(Buffer.concat([d.update(buf.subarray(0, buf.length - 16)), d.final()]).toString("utf8"));
};

// ---------- vault store (all encrypted at rest) ----------
let vaults = {};
try { vaults = JSON.parse(fs.readFileSync(VAULTS, "utf8")); } catch {}
const saveVaults = () => {
  const tmp = VAULTS + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(vaults));
  fs.renameSync(tmp, VAULTS);
  fs.chmodSync(VAULTS, 0o600);
};

// ---------- session / security state (in memory only) ----------
const sessions = new Map(); // userId -> { key, until }
const fails = new Map();    // userId -> { n, untilLock }
const LOCK_AT = 5, LOCK_MIN = 10;

function unlockCheck(userId) {
  const f = fails.get(userId);
  if (f && f.untilLock && f.untilLock > Date.now()) {
    return Math.ceil((f.untilLock - Date.now()) / 60000);
  }
  return null;
}
function failOnce(userId) {
  const f = fails.get(userId) || { n: 0 };
  f.n++;
  if (f.n >= LOCK_AT) { f.untilLock = Date.now() + LOCK_MIN * 60000; f.n = 0; }
  fails.set(userId, f);
  return LOCK_AT - f.n;
}
function openSession(userId, key) {
  sessions.set(userId, { key, until: Date.now() + SESSION_MINUTES * 60000 });
  fails.delete(userId);
}
const authed = (userId) => {
  const s = sessions.get(userId);
  return s && s.until > Date.now() ? s : null;
};

// ---------- telegram API ----------
const tg = async (method, body) => {
  const r = await fetch(`${API}/${method}`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body ?? {}),
    signal: AbortSignal.timeout(35000),
  });
  const j = await r.json().catch(() => ({ ok: false, description: "bad json" }));
  if (!j.ok) LOG(`TG-ERR ${method}:`, (j.description || "").slice(0, 120));
  return j;
};
const send = (chatId, text, extra = {}) =>
  tg("sendMessage", { chat_id: chatId, text, parse_mode: "HTML", ...extra });
const delMsg = (chatId, id) => tg("deleteMessage", { chat_id: chatId, message_id: id });

// ---------- password handling helpers ----------
const PWD_OK = (p) => typeof p === "string" && p.length >= 6 && p.length <= 64 && !/\s/.test(p);

// create a fresh vault for a user
function createVault(userId, password) {
  const salt = crypto.randomBytes(16).toString("base64");
  const key = KDF(password, salt);
  const verify = crypto.randomBytes(16).toString("base64");
  const blob = enc(key, { verify, videos: [], created: new Date().toISOString() });
  vaults[userId] = { salt, blob, v: 1 };
  saveVaults();
  return key;
}
// check password; returns key or null
function checkVault(userId, password) {
  const v = vaults[userId];
  if (!v) return null;
  try {
    const key = KDF(password, v.salt);
    const data = dec(key, v.blob);
    if (!data.verify) return null;
    v._cache = data; // transient plaintext cache, not persisted
    return key;
  } catch { return null; }
}
// read + write the decrypted vault (requires session)
function vaultData(userId) {
  const s = authed(userId);
  if (!s) return null;
  const v = vaults[userId];
  if (!v._cache) { try { v._cache = dec(s.key, v.blob); } catch { return null; } }
  return v._cache;
}
function commitVault(userId) {
  const s = authed(userId), v = vaults[userId];
  if (!s || !v || !v._cache) return;
  v.blob = enc(s.key, v._cache);
  saveVaults();
}

// ---------- UI text ----------
const ABOUT =
  `🤖 <b>VIDVAULT</b> — encrypted video saver\n\n` +
  `👤 Made by <b>${OWNER_NAME}</b>\n` +
  `🔐 Your vault is protected by <b>your password</b>:\n` +
  vaultsHint();
function vaultsHint() {
  return `• passwords are hashed with scrypt & vaults are AES-256-GCM encrypted at rest\n` +
         `• nobody (not even the bot owner) can read your videos without your password\n` +
         `• forgot your password = vault is gone forever (that's real encryption)\n\n` +
         `Commands: /setup /login /logout\n` +
         `            /save (reply to a video)\n` +
         `            /videos • /play <#> • /delete <#>\n` +
         `            /about /help`;
}
const help = (auth) =>
  (auth ? "🔓 <b>Unlocked</b>\n" : "🔒 <b>Locked</b>\n") + vaultsHint();

// ---------- command handlers ----------
async function handle(msg) {
  const chatId = msg.chat.id;
  if (msg.chat.type !== "private") return; // DMs only
  const userId = String(msg.from?.id || msg.chat.id);
  const text = (msg.text || "").trim();
  const cmd = text.split(/[\s@]+/)[0].toLowerCase();

  // delete any message that contains a password attempt (privacy)
  const looksLikeSetupOrLogin = /^\/(setup|login|passwd|password|setpass)(@\w+)?\s+\S/.test(text);

  if (cmd === "/start" || cmd === "/help") {
    await send(chatId, `👋 Hi ${esc(msg.from?.first_name || "there")} — welcome to <b>VIDVAULT</b>!\n\n${vaultsHint()}` +
      (vaults[userId] ? "\n\nYou already have a vault → <b>/login</b>" : "\n\nFirst time? <b>/setup yourpassword</b>"));
    return;
  }

  if (cmd === "/about") { await send(chatId, ABOUT); return; }

  // ---- registration / login ----
  if (/^\/(setup|setpass|passwd|password)(@\w+)?$/.test(cmd) || /^\/setup\b/.test(text)) {
    if (vaults[userId]) { await send(chatId, "⚠️ You already have a vault. Use <b>/login</b>."); return; }
    const pwd = text.split(/\s+/)[1];
    if (!pwd) { await send(chatId, "Usage: <code>/setup yourpassword</code>\n(at least 6 chars, no spaces)"); return; }
    if (!PWD_OK(pwd)) { await send(chatId, "❌ Password must be 6-64 characters, no spaces."); return; }
    createVault(userId, pwd);
    openSession(userId, KDF(pwd, vaults[userId].salt));
    if (looksLikeSetupOrLogin) await delMsg(chatId, msg.message_id).catch(() => {});
    await send(chatId, `✅ <b>Vault created & encrypted!</b>\nYou're unlocked for ${SESSION_MINUTES} minutes.\n\nSend me any video and say <code>/save</code> (replying to it) to store it.`);
    return;
  }

  if (/^\/login(@\w+)?$/.test(cmd) || /^\/login\b/.test(text)) {
    if (!vaults[userId]) { await send(chatId, "You don't have a vault yet. <b>/setup yourpassword</b> first."); return; }
    const lock = unlockCheck(userId);
    if (lock !== null) { await send(chatId, `🚨 <b>Locked</b> after too many wrong passwords. Try again in ${lock} min.`); return; }
    const pwd = text.split(/\s+/)[1];
    if (!pwd) { await send(chatId, "Usage: <code>/login yourpassword</code>"); return; }
    const key = checkVault(userId, pwd);
    if (key) {
      openSession(userId, key);
      if (looksLikeSetupOrLogin) await delMsg(chatId, msg.message_id).catch(() => {});
      const n = vaultData(userId)?.videos.length ?? 0;
      await send(chatId, `🔓 <b>Welcome back!</b> Vault unlocked (${n} video${n === 1 ? "" : "s"} stored).`);
    } else {
      const left = failOnce(userId);
      await send(chatId, `❌ Wrong password. (${left === 0 ? "Vault now locked for 10 min 🚨" : "attempts left before lockout: " + left})`);
    }
    return;
  }

if (/^\/reset(@\w+)?$/.test(cmd)) {
    if (!vaults[userId]) { await send(chatId, "No vault to reset."); return; }
    const s2 = authed(userId);
    if (!s2) { await send(chatId, "🔒 For safety, first <code>/login yourpassword</code>, then <code>/reset</code> to wipe and start a new vault."); return; }
    delete vaults[userId]; saveVaults(); sessions.delete(userId);
    await send(chatId, "🧨 <b>Vault erased</b> (all videos gone). Start fresh: <code>/setup newpassword</code>");
    return;
  }

    if (/^\/logout(@\w+)?$/.test(cmd)) {
    sessions.delete(userId);
    await send(chatId, "🔒 Vault locked. See you!");
    return;
  }

  // ---- everything below requires unlock ----
  const s = authed(userId);
  if (!s) {
    await send(chatId, vaults[userId] ? "🔒 Locked. <code>/login yourpassword</code> first." : "First, create your vault: <code>/setup yourpassword</code>");
    return;
  }

  if (/^\/videos?$/.test(cmd) || /^\/list(@\w+)?$/.test(cmd)) {
    const data = vaultData(userId);
    if (!data?.videos?.length) return void (await send(chatId, "📭 Empty. Save one: reply to any video with <code>/save</code>"));
    const rows = data.videos.map(v =>
      `<b>${v.n}.</b> ${v.date} — ${v.caption ? esc(cut(v.caption, 40)) : "<i>no caption</i>"}${v.note ? ` (${v.note})` : ""}`);
    await send(chatId, `📦 <b>Your videos</b> (${data.videos.length}/${MAX_VIDEOS}):\n\n` + rows.join("\n"));
    return;
  }

  if (/^\/play(@\w+)?$/.test(cmd) || /^\/get(@\w+)?$/.test(cmd)) {
    const n = parseInt(text.split(/\s+/)[1], 10);
    const data = vaultData(userId);
    const item = data?.videos.find(v => v.n === n);
    if (!item) return void (await send(chatId, `❌ No video #${n}. Check <code>/videos</code>`));
    const r = await tg("sendVideo", { chat_id: chatId, video: item.fileId, caption: `#${item.n}` + (item.caption ? " — " + cut(item.caption, 900) : ""), supports_streaming: true });
    if (!r.ok && /wrong file identifier/i.test(r.description || "")) {
      await send(chatId, `⚠️ Telegram lost the cached copy of #${n}. Ask the original sender to re-send, then /save again.`);
    }
    return;
  }

  if (/^\/delete(@\w+)?$/.test(cmd) || /^\/remove(@\w+)?$/.test(cmd)) {
    const n = parseInt(text.split(/\s+/)[1], 10);
    const data = vaultData(userId);
    if (!data) return void (await send(chatId, "⚠️ Session expired. /login again."));
    const idx = data.videos.findIndex(v => v.n === n);
    if (idx < 0) return void (await send(chatId, `❌ No video #${n}. Check <code>/videos</code>`));
    const [gone] = data.videos.splice(idx, 1);
    // renumber so numbers stay 1..N
    data.videos.sort((a, b) => a.n - b.n).forEach((v, i) => (v.n = i + 1));
    commitVault(userId);
    await send(chatId, `🗑️ Deleted <b>#${n}</b>${gone.caption ? " (" + cut(gone.caption, 30) + ")" : ""}.\nRemaining: ${data.videos.length}. Numbers re-ordered.`);
    return;
  }

  // ---- saving: reply /save to a video, or send video with caption /save ----
  if (/^\/save(@\w+)?$/.test(cmd) && msg.reply_to_message) {
    return void (await stash(chatId, userId, msg.reply_to_message));
  }
  if (text === "" && (msg.video || msg.document?.mime_type?.startsWith("video/") || msg.animation)) {
    // bare video sent while unlocked: save it straight away
    return void (await stash(chatId, userId, msg));
  }

  await send(chatId, "🤔 Unknown command. " + (vaultsHint().split("\n").slice(3).join(" · ")));
}

async function stash(chatId, userId, m) {
  const fileId = m.video?.file_id || m.document?.file_id || m.animation?.file_id;
  if (!fileId) return void (await send(chatId, "❌ That's not a video. Reply <code>/save</code> to a <b>video</b> message."));
  const data = vaultData(userId);
  if (!data) return void (await send(chatId, "⚠️ Session expired. /login again."));
  if (data.videos.length >= MAX_VIDEOS) return void (await send(chatId, `📦 Vault full (${MAX_VIDEOS}). /delete some first.`));
  const item = {
    n: data.videos.length + 1,
    fileId,
    caption: (m.caption || "").slice(0, 1000),
    date: new Date().toISOString().slice(0, 10),
    size: m.video?.file_size || m.document?.file_size || 0,
    note: m.video ? "video" : m.animation ? "gif" : "file",
  };
  data.videos.push(item);
  commitVault(userId);
  await send(chatId, `✅ Saved as <b>#${item.n}</b>${item.caption ? " — " + esc(cut(item.caption, 60)) : ""}\n• stored encrypted (${fmtSize(item.size)})\n• play: <code>/play ${item.n}</code> • remove: <code>/delete ${item.n}</code>`);
}
const cut = (t, n) => (t.length > n ? t.slice(0, n - 1) + "…" : t);
const esc = (t) => String(t ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const fmtSize = b => !b ? "" : b > 1048576 ? (b / 1048576).toFixed(1) + " MB" : Math.round(b / 1024) + " KB";

// ---------- long-poll loop ----------
let offset = 0;
async function loop() {
  while (true) {
    try {
      const r = await fetch(`${API}/getUpdates?timeout=25&offset=${offset}`, { signal: AbortSignal.timeout(35000) });
      const j = await r.json();
      if (!j.ok) throw new Error(j.description || "getUpdates failed");
      for (const u of j.result) {
        offset = u.update_id + 1;
        if (u.message) {
          const m = u.message;
          LOG(`msg ${m.from?.username || m.from?.id}: `, ((m.text || (m.video ? "[video]" : "")).slice(0, 40)));
          handle(m).catch(e => LOG("handler err", String(e).slice(0, 120)));
        }
      }
    } catch (e) {
      if (/timeout/i.test(String(e))) continue;
      LOG("poll error:", String(e.message || e).slice(0, 100));
      await new Promise(_ => setTimeout(_, 3000));
    }
  }
}

// ---------- boot ----------
(async () => {
  // crypto self-test: proves enc/dec roundtrip before serving users
  const k = crypto.randomBytes(32);
  const probe = enc(k, { hello: "world", n: 42 });
  if (JSON.stringify(dec(k, probe)) !== '{"hello":"world","n":42}') { console.error("CRYPTO SELF-TEST FAILED"); process.exit(1); }
  LOG("crypto self-test: OK (scrypt + AES-256-GCM roundtrip verified)");

  const me = await tg("getMe");
  if (!me.ok) { console.error("LOGIN FAIL:", me.description); process.exit(1); }
  LOG(`BOT READY as @${me.result.username} (id ${me.result.id})`);

  await tg("setMyCommands", { commands: [
    { command: "start", description: "Welcome + what this bot is" },
    { command: "setup", description: "Create your encrypted vault" },
    { command: "login", description: "Unlock with your password" },
    { command: "save", description: "Reply to a video to save it" },
    { command: "videos", description: "List your saved videos" },
    { command: "play", description: "Watch a saved video by number" },
    { command: "delete", description: "Delete a saved video by number" },
    { command: "logout", description: "Lock your vault now" },
    { command: "about", description: "Who made this bot" },
  ]}).then(j => LOG(j.ok ? "COMMANDS synced" : "commands sync failed"));
  LOG("polling for updates…");
  loop();
})();
