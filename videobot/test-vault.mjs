// standalone replication of bot.js crypto+vault to prove the security model
import crypto from "crypto";
const KDF = (pwd, salt) => crypto.scryptSync(pwd.normalize("NFKC"), salt, 32, { N: 16384, r: 8, p: 1 });
const enc = (key, obj) => { const iv = crypto.randomBytes(12); const c = crypto.createCipheriv("aes-256-gcm", key, iv); return iv.toString("base64") + ":" + Buffer.concat([c.update(JSON.stringify(obj),"utf8"), c.final(), c.getAuthTag()]).toString("base64"); };
const dec = (key, payload) => { const [i, r] = payload.split(":"); const buf = Buffer.from(r, "base64"); const d = crypto.createDecipheriv("aes-256-gcm", key, Buffer.from(i, "base64")); d.setAuthTag(buf.subarray(buf.length - 16)); return JSON.parse(Buffer.concat([d.update(buf.subarray(0, buf.length-16)), d.final()]).toString()); };

const salt = crypto.randomBytes(16).toString("base64");
const key = KDF("MyStr0ng-Pass", salt);
const blob = enc(key, { verify: "x", videos: [{n:1,title:"clip"},{n:2,title:"save"}] });

const right = dec(KDF("MyStr0ng-Pass", salt), blob);
const wrongFails = (() => { try { dec(KDF("wrongpass", salt), blob); return "DECRYPTED (BAD!)"; } catch { return "blocked (auth tag fail)"; } })();
console.log("correct password ->", JSON.stringify(right.videos.map(v=>`#${v.n} ${v.title}`)));
console.log("wrong password   ->", wrongFails);
console.log("raw vault on disk looks like ->", blob.slice(0, 60) + "… (no readable password/video content)");
