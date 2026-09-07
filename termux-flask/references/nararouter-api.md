# NaraRouter API Reference

Consolidated info about the NaraRouter AI gateway for use in Termux web apps.

## Overview

NaraRouter (router.bynara.id) is a unified AI gateway providing access to 53+ AI models through a single API. Free tier available. OpenAI-compatible and Anthropic-compatible endpoints.

**Website:** https://router.bynara.id/
**Docs:** https://router.bynara.id/docs

## API Key Format

Keys start with `sk-nry-` followed by a random secret.

Example: `sk-nry-N2UWCTYynqj_u67i6v9SdsUqbi6vyjMwJqLoQ71mTdc`

Keys are shown once at creation — copy immediately. Can be rotated or revoked from dashboard.

## Endpoints

All endpoints use the same API key (Bearer auth) under different paths.

### Chat Completions (OpenAI-compatible)

```
POST https://router.bynara.id/v1/chat/completions
Authorization: Bearer sk-nry-...
Content-Type: application/json

{
  "model": "agnes-2.5-flash",
  "messages": [{"role": "user", "content": "Hello"}],
  "max_tokens": 4096,
  "temperature": 0.7
}
```

Response format: standard OpenAI chat completions (`choices[0].message.content`).

### Messages (Anthropic-compatible)

```
POST https://router.bynara.id/v1/messages
Authorization: Bearer sk-nry-...
```

Anthropic Messages API format.

### Responses (OpenAI Responses API)

```
POST https://router.bynara.id/v1/responses
Authorization: Bearer sk-nry-...
```

Stateful Responses API — compatible with OpenAI Responses SDK.

### Models List

```
GET https://router.bynara.id/v1/models
Authorization: Bearer sk-nry-...
```

Returns list of models available to your plan. Not all 53 models are on every tier.

### Embeddings

```
POST https://router.bynara.id/v1/embeddings
```

OpenAI Embeddings format.

### Image Generation

```
POST https://api-images.bynara.id/v1/images/generations
```

Text-to-image generation.

### Image Editing

```
POST https://api-images.bynara.id/v1/images/edits
```

Image editing endpoint.

## Known Working Models (Free Tier)

| Model ID | Status | Notes |
|----------|--------|-------|
| `agnes-2.5-flash` | Works | Free tier, reliable |
| `agnes-2.0-flash` | Works | Free tier |
| `deepseek-v4-pro-0813-bynara` | Payment required | Needs top-up |
| `deepseek-v4-flash-free` | Plan doesnt include | Not on free tier |

**Always test before configuring.** Use `/v1/models` to check what your plan includes.

## Python Example (stdlib, no pip install needed)

```python
import urllib.request, json

API_KEY = "sk-nry-..."
BASE = "https://router.bynara.id/v1"

def chat_complete(model, messages, max_tokens=4096):
    url = f"{BASE}/chat/completions"
    payload = {
        "model": model,
        "messages": messages,
        "max_tokens": max_tokens,
        "temperature": 0.7,
    }
    data = json.dumps(payload).encode()
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }
    req = urllib.request.Request(url, data=data, headers=headers, method="POST")
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read())

# Usage
result = chat_complete("agnes-2.5-flash", [{"role": "user", "content": "What is 2+2?"}])
print(result["choices"][0]["message"]["content"])
```

## Response Times

Free-tier models can be slow (5-20 seconds for a response). This is normal for shared free-tier infrastructure. `agnes-2.5-flash` is generally faster than the pro models.

## Quotas

Daily token allowance applies. Free tier resets at 07:00 WIB (00:00 UTC). Rate limits per minute also apply. Check dashboard for current limits.

## Key Security Note

Keys are bearer tokens — anyone with the key can use your quota. Store securely. If a key is exposed, rotate it from the dashboard immediately.
