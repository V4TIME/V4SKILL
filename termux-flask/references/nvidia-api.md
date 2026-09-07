# NVIDIA NIM API Reference

Consolidated info about NVIDIA NIM API for use in Termux Flask web apps.

## Overview

NVIDIA NIM (integrate.api.nvidia.com) provides access to 82+ models including
Nemotron, DeepSeek, GPT-OSS, Llama, Mistral, Kimi, and others through a
single OpenAI-compatible endpoint.

**Base URL:** `https://integrate.api.nvidia.com/v1`
**Endpoint:** `https://integrate.api.nvidia.com/v1/chat/completions`
**Key format:** `nvapi-` followed by a long secret

## API Key Format

Keys start with `nvapi-` (e.g. `nvapi-_qJeGmEP...` or `nvapi-WDb7RrC...`).
Two keys may be available on one account with different model access levels.

**IMPORTANT — key asymmetry:** Not all models are available on all keys.
Key 1 (`nvapi-_qJeGmEP...`) has broader model access. Key 2
(`nvapi-WDb7Rr...`) is more restricted — some models return 404
(not on account). Always test a model with a key before configuring it.

## Endpoints

All model calls go through one OpenAI-compatible endpoint:

```
POST https://integrate.api.nvidia.com/v1/chat/completions
Authorization: Bearer nvapi-...
Content-Type: application/json

# For streaming, also set:
Accept: text/event-stream
```

### Streaming

For streaming responses, set `stream: true` in the payload AND include
`Accept: text/event-stream` in headers. The response is SSE-formatted
Server-Sent Events.

### Non-streaming

Set `stream: false` (or omit). Response is a single JSON object.

## Streaming Response Format (SSE)

Each chunk is a JSON line. The key fields in `chunk.choices[0].delta`:

- `reasoning_content` — the model's chain-of-thought / reasoning text
  (may be absent for some models or prompts)
- `content` — the actual response text being streamed

**Extraction pattern (Python, stdlib urllib — parse raw SSE lines):**

```python
# Each line from the SSE stream looks like:
# data: {"id":"...","object":"chat.completion.chunk",...}

import json
for line in sse_lines:
    if not line:
        continue
    # Strip "data: " prefix
    if line.startswith("data: "):
        line = line[6:]
    if line.strip() == "[DONE]":
        break
    chunk = json.loads(line)
    delta = chunk.get("choices", [{}])[0].get("delta", {})
    reasoning = getattr(delta, "reasoning_content", None) or delta.get("reasoning_content")
    content = delta.get("content")
    if reasoning:
        # Process reasoning chunk (e.g. print, buffer, emit as SSE)
        print(reasoning, end="")
    if content is not None:
        # Process content chunk
        print(content, end="")
```

**Extraction pattern (OpenAI client — cleaner):**

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key="nvapi-..."
)

completion = client.chat.completions.create(
    model="nvidia/nemotron-3.5-lightning-30b-a3b",
    messages=[{"role": "user", "content": "hello"}],
    stream=True,
    max_tokens=16384,
)

for chunk in completion:
    if not chunk.choices:
        continue
    reasoning = getattr(chunk.choices[0].delta, "reasoning_content", None)
    if reasoning:
        print(reasoning, end="")
    if chunk.choices[0].delta.content is not None:
        print(chunk.choices[0].delta.content, end="")
```

## Model-Specific Patterns

### Nemotron 3.5 Lightning 30B (`nvidia/nemotron-3.5-lightning-30b-a3b`)

**Verified working on free tier.** Strong at math, coding, reasoning.
Supports thinking mode.

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key="nvapi-..."
)

completion = client.chat.completions.create(
    model="nvidia/nemotron-3.5-lightning-30b-a3b",
    messages=[{"role": "user", "content": "Write a limerick about GPU computing."}],
    temperature=1,
    top_p=0.95,
    max_tokens=16384,
    extra_body={
        "chat_template_kwargs": {"enable_thinking": True},
        "reasoning_budget": 16384
    },
    stream=True
)

for chunk in completion:
    if not chunk.choices:
        continue
    reasoning = getattr(chunk.choices[0].delta, "reasoning_content", None)
    if reasoning:
        print(reasoning, end="")
    if chunk.choices[0].delta.content is not None:
        print(chunk.choices[0].delta.content, end="")
```

**Key options:**
- `extra_body.chat_template_kwargs.enable_thinking`: True/False
- `extra_body.reasoning_budget`: token budget for reasoning (e.g. 16384)
- `stream`: True for token-by-token output
- `temperature`: 1, `top_p`: 0.95 are good defaults

### DeepSeek V4 Pro 0813 (`deepseek-ai/deepseek-v4-pro-0813`)

**Note:** Times out frequently on mobile/phone networks even though it
works on desktop. Use with caution on Termux.

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key="nvapi-..."
)

completion = client.chat.completions.create(
    model="deepseek-ai/deepseek-v4-pro-0813",
    messages=[{"role": "user", "content": "Write a limerick."}],
    temperature=1,
    top_p=0.95,
    max_tokens=16384,
    seed=42,
    extra_body={"chat_template_kwargs": {"thinking": False}},
    stream=False
)

print(completion.choices[0].message.content)
```

**Key options:**
- `extra_body.chat_template_kwargs.thinking`: False (disable thinking for this model)
- `seed`: set for reproducibility
- `stream`: False recommended (non-streaming is more reliable for this model)

### Kimi K3 / Moonshot (`moonshotai/kimi-k3`)

**Vision-capable model.** Can analyze images when given an `image_url`
content block. Note: times out on mobile networks — test before relying on it.

```python
import requests

invoke_url = "https://integrate.api.nvidia.com/v1/chat/completions"
stream = True

headers = {
    "Authorization": "Bearer nvapi-...",
    "Accept": "text/event-stream" if stream else "application/json",
}

payload = {
    "messages": [
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "What is in this image?"
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "https://assets.ngc.nvidia.com/products/api-catalog/phi-3-5-vision/example1b.jpg"
                    }
                }
            ]
        }
    ],
    "model": "moonshotai/kimi-k3",
    "max_tokens": 16384,
    "seed": 0,
    "stream": stream,
    "temperature": 1,
    "reasoning_effort": "max"
}

response = requests.post(invoke_url, headers=headers, json=payload, stream=stream)
if stream:
    for line in response.iter_lines():
        if line:
            print(line.decode("utf-8"))
else:
    print(response.json())
```

**Key points for vision:**
- `content` is an ARRAY of objects (not a string) — each with `type` field
- `type: "text"` for the prompt text
- `type: "image_url"` with `image_url.url` for the image
- Image URL can be a public URL or a data URL (`data:image/jpeg;base64,...`)
- `reasoning_effort: "max"` enables maximum reasoning for this model
- **Uses `requests` library** — not stdlib urllib (requests has better streaming support)

### GPT-OSS 20B (`gpt-oss-20b`)

**Verified working on free tier.** OpenAI-compatible.

## Known Working Models (Free Tier, tested on mobile Termux network)

| Model ID | Key | Status | Notes |
|----------|-----|--------|-------|
| `nvidia/nemotron-3.5-lightning-30b-a3b` | Key 1 + Key 2 | Works | Fast (~5-7s for simple), strong reasoning, supports thinking mode |
| `gpt-oss-20b` | Key 1 | Works | OpenAI-compatible |
| `deepseek-ai/deepseek-v4-pro-0813` | Key 1 | Timeout risk | Works on desktop, frequently times out on mobile Termux network |
| `moonshotai/kimi-k3` | Key 2 | Timeout risk | Vision-capable, but times out on mobile network |
| `mistral-large` | Key 2 | 404 | Not on this account |
| `deepseek-coder` | Key 2 | 404 | Not on this account |

**Always test before configuring.** Model availability varies by key and by
network conditions (mobile vs desktop).

## Dead Key Indicators

When testing an NVIDIA key, these responses indicate problems:

- `401 Unauthorized` — key is invalid or expired
- `404 Not Found` on a specific model — model not available on this account/key
- Connection timeout (30s+) with no response — API is slow or unreachable
  from this network; try a different model or key

## Response Times (mobile Termux network)

- Simple greeting: ~5-7 seconds
- Short factual answer: ~5-10 seconds  
- Math/coding with reasoning: 15-30+ seconds, may time out
- **Mobile networks are more prone to timeouts than desktop** — a model
  that works on desktop may time out on Termux/phone

## Pitfalls

### `extra_body` is DeepSeek-only — Nemotron rejects it (HTTP 400)

**This is the most common NVIDIA integration bug.** The `extra_body` parameter
with `chat_template_kwargs` is accepted by DeepSeek models but **REJECTED by
Nemotron** with:

```
HTTP 400: {"error": {"message": "Validation: Unsupported parameter(s): `extra_body`..."}}
```

**Wrong (breaks Nemotron):**
```python
payload = {
    "model": "nvidia/nemotron-3.5-lightning-30b-a3b",
    # ...
    "extra_body": {
        "chat_template_kwargs": {"enable_thinking": True},
        "reasoning_budget": 16384,
    }
}
```

**Correct — only send extra_body for DeepSeek models:**
```python
payload = {...}
if "deepseek" in model.lower():
    payload["extra_body"] = {
        "chat_template_kwargs": {"thinking": False},
    }
```

| Model | `extra_body`? | `enable_thinking`? | `reasoning_budget`? |
|-------|---------------|-------------------|---------------------|
| `nvidia/nemotron-3.5-lightning-30b-a3b` | NO — rejected | N/A (thinking built-in) | N/A |
| `deepseek-ai/deepseek-v4-pro-0813` | YES | `{"thinking": False}` | No |
| `gpt-oss-20b` | NO | N/A | N/A |
| `moonshotai/kimi-k3` | NO | Use `reasoning_effort: "max"` instead | No |

**Rule:** Before adding `extra_body`, check whether the specific model accepts it.
When in doubt, leave it out — most NVIDIA models work fine without it.

### Thread-based hard timeout (not `socket.setdefaulttimeout`)

### stdlib urllib (no install needed)

```python
import urllib.request, json, threading

def call_nvidia_sync(url, payload, api_key, timeout=30):
    """Synchronous call with thread-based hard timeout."""
    result_holder = {}

    def _do_call():
        try:
            data_bytes = json.dumps(payload).encode("utf-8")
            headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": f"Bearer {api_key}",
            }
            req = urllib.request.Request(url, data=data_bytes, headers=headers, method="POST")
            with urllib.request.urlopen(req, timeout=timeout - 2) as resp:
                body = resp.read().decode("utf-8")
                result_holder["data"] = json.loads(body)
                result_holder["error"] = None
        except urllib.error.HTTPError as e:
            body = e.read().decode("utf-8", errors="replace")
            result_holder["error"] = f"HTTP {e.code}: {body[:300]}"
            result_holder["data"] = None
        except Exception as e:
            result_holder["error"] = str(e)[:200]
            result_holder["data"] = None

    t = threading.Thread(target=_do_call)
    t.daemon = True
    t.start()
    t.join(timeout=timeout)

    if t.is_alive():
        return {"status": "timeout", "error": f"Timed out after {timeout}s"}
    if result_holder.get("error"):
        return {"status": "error", "error": result_holder["error"]}
    return {"status": "success", "data": result_holder["data"]}
```

**Why thread-based timeout:** `urlopen(req, timeout=X)` inside a thread with
`t.join(timeout=Y)` prevents the Flask worker from blocking indefinitely.
The `timeout-2` inside urlopen gives the socket a 2-second buffer before the
thread join timeout fires. This pattern is more reliable than `socket.setdefaulttimeout`
(which pollutes global socket state across requests).

### requests library (needs pip install)

Better for streaming (iter_lines) and simpler APIs, but requires
`pip3 install requests` which can time out on mobile networks.

```python
import requests

response = requests.post(
    "https://integrate.api.nvidia.com/v1/chat/completions",
    headers={
        "Authorization": f"Bearer {api_key}",
        "Accept": "text/event-stream",
    },
    json=payload,
    stream=True,
    timeout=30
)

for line in response.iter_lines():
    if line:
        print(line.decode("utf-8"))
```

## Quotas and Rate Limits

- Free tier has daily token allowances that reset at 00:00 UTC
- Rate limits apply per minute
- Multiple keys can be used to increase available quota (each key is
  independent)
- If one key is rate-limited, try another key or model

## Network Notes (Termux on mobile)

- Mobile networks (4G/5G) have higher latency and more packet loss than
  desktop broadband — API calls take longer and time out more often
- A model that responds in 5s on desktop may take 20-30s or time out on
  a phone
- If a request consistently times out, try: a simpler model, a shorter
  prompt, or a different API key
- NVIDIA's `nemotron-3.5-lightning-30b-a3b` is the most reliable model
  on mobile Termux networks among those tested
