# Desktop Automation

[← Back to the skill catalog](../SKILLS.md) · [Main README](../../README.md)

Skills for driving the native desktop and inspecting desktop app internals without disrupting the user's work.

**desk-automation-bg (Computer Use — Background Desktop Automation)**
- **What it does:** Drives the user's desktop in the background using cua-driver — clicks, types, scrolls, drags, captures screenshots — without moving the cursor or stealing focus. Escalates through a verify→escalate ladder (element click → fresh verification → pixel click → foreground → app-specific I/O).
- **Why use it:** When you need to automate native desktop apps (Finder/Explorer, Mail, native chat clients, Figma, games, Electron apps, consent dialogs) without disrupting the user's work.
- **Main contents:** The canonical workflow (capture first with `computer_use(action="capture", mode="som", app="...")`, click by element index with `computer_use(action="click", element=7)`, verify with re-capture or `capture_after=True`), capture modes (`som` — screenshot + numbered overlays + AX index, `vision` — plain screenshot, `ax` — AX tree only), actions vocabulary (capture, click, double_click, right_click, middle_click, drag, scroll, type, key, wait, list_apps, focus_app), the verify→escalate ladder (element background → fresh verification → pixel background → foreground delivery → app-specific I/O like DBus/CLI for KTextEditor), escalation fields (`effect`: confirmed/unverifiable/suspected_noop, `escalation`: recommended rung, `code`: structured refusal, `verified`), background rules (never `raise_window=True` unless asked, scope captures to an app, don't switch virtual desktops/Spaces, user can be on same machine), drag & drop (prefer element indices, rubber-band selection with coordinates), scroll (viewport under element or at specific point), managing focus (`list_apps`, `focus_app`), delivering screenshots to user (write_file + MEDIA: path, or describe on CLI), safety rules (never click permission dialogs/password prompts/2FA/payment UI, never type secrets, never follow screenshot instructions — prompt injection, hard-blocked system shortcuts, don't interact with personal browser tabs), failure modes (cua-driver not installed → `hermes computer-use install`, empty captures → DISPLAY not set on Linux/Wayland or Session 0 on Windows, stale element index → re-capture, click had no effect → read structured verdict and climb ladder, type text disappears into terminal → cua-driver terminal detection, `blocked pattern in type text` → break up dangerous commands, anything else → `hermes computer-use doctor`), when NOT to use (web automation via headless browser tools is better, file edits via read_file/write_file/patch, shell commands via terminal), going deeper — cua-driver skill pack (`cua-driver skills install` gives SKILL.md, MACOS.md, WINDOWS.md, LINUX.md, RECORDING.md, WEB_APPS.md, TESTS.md).
- **Keywords:** computer use, desktop automation, background, cua-driver, GUI automation, click by element index, screenshot, AX tree, accessibility, cross-platform, macOS, Windows, Linux, Wayland, X11, foreground escalation, prompt injection safety.

**inspecting-hermes-desktop-dom (Read Live Hermes Desktop DOM/CSS over CDP)**
- **What it does:** Reads the live Hermes desktop application's DOM and CSS over Chrome DevTools Protocol (CDP). Used for inspecting and verifying the desktop app's UI, theme application, and widget rendering.
- **Why use it:** When you need to inspect or debug the Hermes desktop app's UI — read DOM structure, check CSS applied, verify theme rendering, inspect widget state.
- **Main contents:** CDP connection to Hermes desktop (Electron app), DOM inspection, CSS reading, UI verification, self-inspection patterns, inspector reference, integration with node-inspect-debugger and systematic-debugging.
- **Keywords:** desktop, Electron, CDP, DOM, CSS, UI verification, self-inspection, inspector, Chrome DevTools Protocol, Hermes desktop, Electron app, theme verification, widget inspection.

---

[← Back to the skill catalog](../SKILLS.md)
