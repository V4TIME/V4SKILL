---
name: systematic-agent
description: Enforces disciplined coding practices — inspect before changing, plan before executing, verify after modifying, diagnose before retrying. Use for every coding task.
version: 1.0.0
platforms: [linux]
metadata:
  hermes:
    category: software-development
    tags: [discipline, verification, debugging, planning, code-quality]
    requires_toolsets: [terminal]
---

# Systematic Agent — Disciplined Coding Practices

## When to Use

Every coding task, modification, debugging session, or implementation work. This skill is a baseline operating system for how to approach any code change — not an optional add-on.

Invoked automatically for all code-related tasks. If the user asks you to change, add, fix, or build code, follow this skill.

## Core Rules

### 1. Never assume facts about the project

Before touching any file, you must know what's actually there. Read the file. Check its current state. Don't rely on memory of what "should" be there — read it.

**Concrete actions:**
- `read_file` the file you're about to change, including surrounding context
- `search_files` for related code, imports, function callers, and references
- Check the server is running and endpoints respond before testing changes
- Verify configuration files actually contain what you think they contain

### 2. Inspect relevant files before changing anything

Don't patch blind. For every file you plan to edit:

1. Read the full file (or the relevant section with enough context)
2. Understand the current structure, imports, dependencies, and patterns
3. Identify what needs to change and why
4. Only then write the patch or edit

**When patching:** include enough surrounding context in `old_string` to make the match unique. A patch that matches multiple locations will apply to the wrong one.

**When reading large files:** use offset/limit to read incrementally. Don't try to load a 1600-line file in one call if you only need one function — but DO read the function you're changing in full, including its signature and all call sites.

### 3. Make a concise plan before execution

Before any non-trivial coding task, write a brief plan (3-7 bullet points) that answers:

- What files need to change
- What each change does (in one line per change)
- What order the changes should happen in
- What verification steps will confirm success

Example:
```
Plan:
1. Read app.py lines 762-770 — check _get_hermes_response signature
2. Add image_url: str = None param to signature
3. Add image_url=image_url to all 5 _call_api calls inside the function
4. Pass image_url from chat() to _get_hermes_response
5. Restart server, test with curl image payload
```

**Do not start coding until you've stated the plan.** If the plan is wrong, the code will be wrong.

### 4. Use tools to verify claims instead of guessing

Every claim about the codebase should be backed by tool output, not recollection.

| Claim | How to verify |
|-------|---------------|
| "File X has function Y" | `grep -n` or `read_file` the file |
| "The server is running" | `curl` the health endpoint |
| "The change works" | Run the actual test, don't assume |
| "The API key is configured" | Read `storage/apis.json` |
| "The CSS is loaded" | `curl` the static file, check HTTP status |
| "The patch applied correctly" | `grep` for the new text, or `read_file` the area |

**Never write a response that says "it should work" without having verified it actually does.**

### 5. After every significant modification, test or inspect the result

After any code change:

1. **Syntax check:** `python3 -c "import py_compile; py_compile.compile('app.py', doraise=True)"` — must pass before restarting
2. **Restart the server** if the change is in app.py
3. **Test the changed behavior:**
   - For API changes: `curl` the endpoint with a representative payload
   - For frontend changes: verify the static file is served (HTTP 200)
   - For config changes: read the config file to confirm
4. **Check the actual output** — not what you expected, what the tool returned

**A change is not done until you've seen the test result.** "I think it works" is not verification.

### 6. If something fails, diagnose the actual error before trying another approach

When a test fails or a patch doesn't apply:

1. **Read the actual error message** — copy it verbatim. Don't summarize it.
2. **Identify the root cause** — what specifically failed and why
3. **Form a hypothesis** about the fix
4. **Test the hypothesis with a tool** — don't just try another patch
5. **If the fix doesn't work, re-read the error** — it may have changed or you may have misread it

**Anti-patterns to avoid:**
- Applying three different patches in a row without checking if any worked
- Guessing the fix based on the error type rather than reading the error text
- Changing unrelated code when the error is in one specific location
- Restarting the server without fixing the syntax error that prevents it from starting

### 7. Do not say a task is complete until the result has been verified

A task is complete only when:

- The code change is written and syntax-checked ✓
- The server is running with the new code ✓
- The changed behavior produces the expected result (verified by tool output) ✓
- You can point to the specific test/command/output that proves it ✓

**Never declare "done" based on the patch applying successfully.** A patch can apply to the wrong location, introduce a syntax error, or not actually fix the problem. The patch applying is step 1 of verification, not the end.

## Procedure

### For any code change:

1. **Read** — inspect the file(s) you'll change. Know the current state.
2. **Plan** — write 3-7 bullets: what changes, in what order, how to verify.
3. **Change** — make the edits. One atomic change at a time for multi-file work.
4. **Syntax check** — `py_compile` or equivalent. Fix errors before proceeding.
5. **Restart** — if the running server needs the new code.
6. **Test** — curl, run, or inspect. Verify the actual behavior matches intent.
7. **Report** — state what changed, what the test showed, and whether it's verified.

### For debugging:

1. **Reproduce** — get the actual error output. Copy it verbatim.
2. **Locate** — find where in the code the error originates. `grep`, `read_file`, stack trace.
3. **Understand** — read the failing code in full. Don't guess what it does — read it.
4. **Hypothesize** — what specific change would fix this specific error?
5. **Fix** — make the minimal change that addresses the root cause.
6. **Verify** — re-run the failing test. Confirm the error is gone AND nothing else broke.
7. **If still failing** — go back to step 1. The error may have changed. Re-read it.

### For multi-step tasks:

- Do one step at a time. Verify each step before moving to the next.
- If step 3 depends on step 2 being correct, verify step 2 first.
- Don't batch unverified changes — if step 2 is wrong, step 3's "fix" will also be wrong.

## Pitfalls

- **Reading the same lines repeatedly without acting.** If you've read a function 3 times and haven't edited it, you're stuck. Either make the change or state what's blocking you.
- **Guessing the file contents.** Always read the file. Memory of what "was there" is not reliable after multiple patches.
- **Skipping the syntax check.** A patch can apply cleanly and still break syntax. Always verify.
- **Testing without restarting.** If app.py changed, the running server has the old code. Restart before testing.
- **Declaring done on patch success.** "Patch applied" ≠ "task complete." Verify the behavior.
- **Not reading error messages.** The error text tells you what failed. Read it. Don't infer from the error type alone.
- **Over-patching.** Apply the minimal change that fixes the specific problem. Don't rewrite entire functions when one line is wrong.

## Verification Checklist

Before reporting a coding task complete, confirm each item:

- [ ] File(s) read before changing (know current state)
- [ ] Plan written (what changes, in what order)
- [ ] Syntax check passes (`py_compile` or equivalent)
- [ ] Server restarted if app.py changed
- [ ] Test executed (curl, run, or inspect) — actual output seen
- [ ] Output matches expected behavior
- [ ] No new errors introduced

## How This Skill Interacts with Others

- This is a **baseline** skill — it applies to ALL coding work regardless of which other skill is active
- When `test-driven-development` is active, TDD is the testing method; this skill governs the overall discipline
- When `systematic-debugging` is active, debugging has its own detailed procedure; this skill's rule 6 still applies
- When `spike` is active (throwaway experiment), the "inspect before change" and "verify after" rules still apply — spikes can be messy but not careless
- When `human-first-ui` or `webmxerz` are active for design work, this skill governs the code changes that implement the design — design skills inform WHAT to build, this skill governs HOW to build it safely
- Skills are loaded on demand via `skill_view(name)` — they are NOT continuously active background processes. A skill is in play only during the session turn(s) it is loaded. Design-assist skills (webmxerz, human-first-ui) are consulted for specific UI tasks; this skill remains the baseline for the code work that implements the design.
