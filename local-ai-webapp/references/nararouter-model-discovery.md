---
name: nararouter-model-discovery
description: Find which NaraRouter models actually work on your plan — parallel testing workflow and known results.
---
# NaraRouter Model Discovery

When you get a NaraRouter API key, not all 53+ listed models work on your plan. Some need top-up, some need a publisher, some are on different tiers. This reference captures the workflow to find what actually works, and results from one session's testing.

## Workflow: find working models

1. **List all models your key can see:**
   ```bash
   curl -s https://router.bynara.id/v1/models \
     -H "Authorization: Bearer sk-nry-YOUR_KEY" \
     | python3 -c "import sys,json; [print(m['id']) for m in json.load(sys.stdin).get('data',[])]"
   ```

2. **Test each candidate in parallel** — sequential testing is too slow (each test takes 3-12s). Use ThreadPoolExecutor:
   ```python
   import json, urllib.request, concurrent.futures, time

   KEY = "sk-nry-YOUR_KEY"
   URL = "https://router.bynara.id/v1/chat/completions"
   models_to_test = ["agnes-2.5-flash", "agnes-2.0-flash", "stepfun-3.7-flash", "claude-sonnet-5", ...]

   def test(model):
       try:
           req = urllib.request.Request(
               URL,
               data=json.dumps({"model": model, "messages":[{"role":"user","content":"hi"}],"max_tokens":5}).encode(),
               headers={"Content-Type":"application/json","Authorization":f"Bearer {KEY}"},
               method="POST",
           )
           with urllib.request.urlopen(req, timeout=10) as r:
               body = json.loads(r.read())
               if "choices" in body:
                   return (model, "WORKS", body.get("model","?"), body["choices"][0]["message"]["content"][:60])
               else:
                   return (model, "DEAD", body.get("error",{}).get("message","?")[:80], "")
       except Exception as e:
           return (model, "ERROR", str(e)[:80], "")

   with concurrent.futures.ThreadPoolExecutor(max_workers=10) as ex:
       for result in ex.map(test, models_to_test):
           print(f"  {result[0]:30s} {result[1]:8s} {result[2]}")
   ```

3. **Interpret results:**
   - `WORKS` — model is on your plan, key is valid for it
   - `Insufficient credits` — model needs top-up or different tier
   - `No publisher available` — model needs a publisher gateway (common for Claude models)
   - `Your plan does not include` — model not on your current plan
   - `The requested model does not exist` — typo or model was removed
   - Timeout / 502 — model may be overloaded or temporarily unavailable

## Known results (session 2026-09-02, free tier)

### Working (no top-up needed)
- `agnes-2.5-flash` — default, fastest (~3.2s), correct answers, Agnes identity
- `agnes-2.0-flash` — faster in quality test (~3.1s), also Agnes
- `stepfun-3.7-flash` — works, slower (~7.5s), verbose
- `laguna-s-2.1` — works sometimes, unreliable (502/timeout)
- `minimax-m3-free` — works sometimes, unreliable (timeout)

### Need top-up or different plan
- `deepseek-v4-pro`, `deepseek-v4-pro-0813-bynara` — Insufficient credits
- `deepseek-v4-flash-free` — Plan does not include
- `claude-sonnet-5`, `claude-opus-4.8`, `claude-opus-4.7` — No publisher available
- `claude-fable-5`, `claude-fable-5.1` — Insufficient credits
- `gpt-5.4`, `gpt-5.5`, `gpt-5.6-terra/luna/sol` — Insufficient credits
- `grok-4.6` — Insufficient credits
- `glm-5.3`, `glm-5.2`, `glm-5.3-flash`, `glm-5.3-free` — Insufficient credits
- `qwen3.7-max`, `qwen3.8-max`, `qwen3.7-plus`, `qwen3.7-flash` — Insufficient credits
- `kimi-k3`, `kimi-k2.7-code` — Insufficient credits
- `muse-spark-1.2`, `muse-spark-1.1` — Insufficient credits
- `mimo-v2.5`, `mimo-v2.5-pro-ultraspeed`, `mimo-v2.5-promo` — Insufficient credits or does not exist
- Image models (`nano-banana-pro`, `grok-imagine`, `agnes-image-2.1-flash`) — Need top-up

## Tips

- **Test before configuring.** Don't add a model to your app config until you've confirmed it works with curl. The model list shows 55 models but your plan may only include 2-5 of them.
- **Default to agnes-2.5-flash.** It's the fastest working model on the free tier and gives correct answers.
- **Free tier is limited.** If you need Claude, GPT-5, DeepSeek Pro, Qwen Max, or image generation, you need to top up. There's no workaround.
- **Endpoint matters.** NaraRouter supports multiple endpoint formats:
  - `/v1/chat/completions` (OpenAI-compatible) — primary, use this
  - `/v1/messages` (Anthropic-compatible)
  - `/v1/responses` (OpenAI Responses API)
  - `/v1/embeddings` (embeddings)
  - `/v1/models` (list models — GET, no body)
  - `https://api-images.bynara.id/v1/images/generations` (image gen)
  - `https://api-images.bynara.id/v1/images/edits` (image edit)
- **Key format:** starts with `sk-nry-`. The `/v1/models` endpoint requires the same Bearer key.
