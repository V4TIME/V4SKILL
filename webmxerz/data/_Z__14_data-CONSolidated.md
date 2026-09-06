# UI/UX Pro-Max — Consolidated Knowledge Reference

> A unified reference combining all 6 data files from UI/UX Pro-Max into one searchable document. Organized by topic with reasoning explanations for each rule, not just listings. Use this when you need to understand WHY a design decision matters, not just WHAT the rule is.

---

## TABLE OF CONTENTS

1. [Accessibility Rules — Deep Reference](#1-accessibility-rules--deep-reference)
2. [Touch, Gesture & Navigation](#2-touch-gesture--navigation)
3. [Forms & Input UX](#3-forms--input-ux)
4. [Feedback & State](#4-feedback--state)
5. [Performance — Bundle, Server & Client](#5-performance--bundle-server--client)
6. [React/Next.js Re-render Optimization](#6-reactnextjs-re-render-optimization)
7. [JavaScript Performance Patterns](#7-javascript-performance-patterns)
8. [Rendering & DOM Optimization](#8-rendering--dom-optimization)
9. [Advanced React Patterns](#9-advanced-react-patterns)
10. [Color Palettes by Product Category — Full Reference](#10-color-palettes-by-product-category--full-reference)
11. [Chart Types — Complete Selection Guide](#11-chart-types--complete-selection-guide)
12. [Animation Principles — Motion Design Reference](#12-animation-principles--motion-design-reference)
13. [Landing Page Patterns — Full Catalog](#13-landing-page-patterns--full-catalog)
14. [Icon System — Complete Library Reference](#14-icon-system--complete-library-reference)
15. [Product Type → Style + Landing Pattern Mapping](#15-product-type--style--landing-pattern-mapping)

---

## 1. Accessibility Rules — Deep Reference

### Why accessibility matters in UI/UX

Accessibility (a11y) isn't a checkbox — it's the difference between a product that works for 100% of users and one that silently excludes people using screen readers, keyboard navigation, or assistive technologies. The rules below come from WCAG 2.2 guidelines and practical mobile/React Native experience.

---

### Icon Button Labels (Rule 1)

**The rule:** Icon-only buttons must expose an accessible label.

**Why:** Screen readers announce what they can access. An icon button with no label is announced as "button" — the user has no idea what it does. This is a WCAG 4.1.2 (Name, Role, Value) failure.

**Platform context:** iOS uses `accessibilityLabel`, Android uses `contentDescription`, React Native uses the same props. Web uses `aria-label`.

**Good:** `<Pressable accessibilityLabel="Close"><XIcon /></Pressable>`
**Bad:** `<Pressable><XIcon /></Pressable>`

**Severity: Critical.** This blocks fundamental interaction.

---

### Form Control Labels (Rule 2)

**The rule:** All inputs must have a visible label AND an accessibility label.

**Why two labels?** The visible label is for sighted users — it tells them what to enter. The accessibility label is for screen readers — it tells blind users what the field is. Placeholder text is NOT a label: it disappears when the user types, and it's often announced as placeholder text rather than a field label.

**Why this matters:** Forms are where most conversion happens. If a screen reader user can't understand your form fields, they can't complete purchases, sign up, or submit data.

**Good:**
```jsx
<View>
  <Text>Email</Text>
  <TextInput accessibilityLabel="Email address" />
</View>
```
**Bad:** `<TextInput placeholder="Email" />` — placeholder-only, no label.

**Severity: Critical.**

---

### Role & Traits (Rule 3)

**The rule:** Interactive elements must expose correct roles and traits.

**Why:** A screen reader user navigates by role — "jump to next button", "list all links". If your `View` handles touches but is announced as a generic view, it's invisible to role-based navigation. The element needs to say "I am a button" or "I am a link".

**Platform specifics:**
- iOS: `accessibilityRole` and `accessibilityTraits`
- Android: `role`, `className`
- Web: `role` attribute, or use semantic HTML (`<button>`, `<a>`)

**Good:** `<Pressable accessibilityRole="button">Submit</Pressable>`
**Bad:** `<View onTouchStart={submit}>Submit</View>` — looks clickable, sounds like a view.

**Severity: High.**

---

### Dynamic Updates / Live Regions (Rule 4)

**The rule:** Async status updates should be announced to screen readers.

**Why:** When content changes without a page reload (e.g., "Saving...", "Saved!", "Error: network failed"), screen readers have no way to know something changed unless you tell them. Without a live region, the user keeps reading stale content.

**Platform specifics:**
- iOS: `accessibilityLiveRegion` or `UIAccessibility.post(notification: .announcement, ...)`
- Android: `android:accessibilityLiveRegion="polite"`
- Web: `aria-live="polite"` or `aria-live="assertive"`

**Good:** `<Text accessibilityLiveRegion="polite">{status}</Text>`
**Bad:** `<Text>{status}</Text>` — updates silently.

**Severity: Medium.** Blocks understanding of async flows but doesn't block initial interaction.

---

### Decorative Icons (Rule 5)

**The rule:** Decorative icons should be hidden from screen readers.

**Why:** If every decorative icon is announced ("Checkmark icon", "Star icon", "Heart icon"), the user has to wade through noise to get to real content. Decorative means decorative — it adds visual flavor but no semantic meaning.

**Platform specifics:**
- iOS: `accessibilityElementsHidden` or `isAccessibilityElement = false`
- Android: `importantForAccessibility="no"`
- React Native: `accessible={false}`, `importantForAccessibility="no"`
- Web: `aria-hidden="true"`

**Good:** `<Icon accessible={false} importantForAccessibility="no" />`
**Bad:** `<Icon />` — screen reader announces it as an unlabeled image.

**Severity: Medium.** Clutters the experience but doesn't block key flows.

---

### Dragging Alternatives (Rule 31 — new from app-interface.csv)

**The rule:** Drag and reorder operations need a non-drag path — buttons or menus.

**Why:** Drag interactions are:
- Impossible for keyboard-only users
- Difficult for screen reader users
- Hard to discover (no visible affordance)
- Often fail on touch devices with tremors or motor limitations

WCAG 2.5.7 (Dragging Alternatives) requires that any action achievable by dragging must also be achievable by a single pointer without dragging — typically buttons.

**Good:** `<Button title="Move up" onPress={() => moveItem(index, index - 1)} />` alongside drag handles
**Bad:** `<DragHandle />` only — no alternative path.

**Severity: High.**

---

### Authentication Reuse (Rule 32 — new from app-interface.csv)

**The rule:** Authentication and multi-step flows should reuse prior values — support password managers, passkeys, paste, and prefilled confirmed values.

**Why:** Forcing users to re-type credentials or the same data in a multi-step flow:
- Breaks password manager autofill
- Prevents paste (common in banking apps with misguided "no paste" rules)
- Makes passkeys useless
- Creates friction that causes abandonment

**Good:** `textContentType="password" autoComplete="current-password"` with paste enabled
**Bad:** `onPaste={e => e.preventDefault()}` — blocks paste, breaks password managers.

**Severity: Critical.** This blocks authentication flows entirely for many users.

---

## 2. Touch, Gesture & Navigation

### Touch Target Size (Rule 6)

**The rule:** Touch targets must be at least 44pt on iOS, 48dp on Android, and 24 CSS px on web (WCAG 2.5.8 minimum with exceptions).

**Why different sizes?** Different platforms have different physical pixel densities and different research on what's tappable:
- iOS Human Interface Guidelines: 44×44pt minimum
- Android Material Design: 48×48dp minimum
- WCAG 2.5.8 (web): 24×24 CSS px minimum (with exceptions for inline links, spacing, etc.)

**Critical reasoning:** A 16px icon in a 32px touch target FAILS the minimum. The touchable area must be padded, not the visual icon.

**Do:** `Platform.select({ ios: 44, android: 48 })` — evaluate web separately against WCAG 2.5.8
**Don't:** Collapse iOS 44pt, Android 48dp, and web 24 CSS px into one cross-platform number — they're not equivalent.

**Severity: Critical.** Tiny targets cause mis-taps, rage clicks, and abandonment.

---

### Touch Spacing (Rule 7)

**The rule:** Adjacent touch targets need at least 8dp spacing.

**Why:** Without spacing, a tap between two buttons hits both — the system has to arbitrate which one you meant. 8dp of dead space gives the touch system room to disambiguate.

**Do:** `<View style={{ gap: 8 }}><Button /><Button /></View>`
**Don't:** Cluster many buttons with no gap — they merge into an ambiguous tappable zone.

**Severity: Medium.**

---

### Gesture Conflicts (Rule 8)

**The rule:** Custom gestures must not break system scroll/back gestures.

**Why:** Users expect swipe-to-go-back on iOS, scroll on content areas. If your full-screen custom swipe captures the gesture, the user gets stuck — they can't navigate back, can't scroll content. This creates trapped users.

**Do:** Reserve horizontal swipes for carousels; don't put a `PanResponder` on the full screen.
**Don't:** HorizontalPager inside a vertical ScrollView without coordination — or PanResponder on full screen blocking back.

**Severity: High.**

---

### Back Behavior (Rule 9)

**The rule:** Back navigation should be predictable and preserve state.

**Why:** The back button is the most-used navigation action. If it exits the app, resets the stack, or loses form data, the user loses trust and has to re-do work. State preservation matters especially for forms, scroll position, and partially-completed flows.

**Do:** `onPress={() => navigation.goBack()}` — let the navigation stack manage state
**Don't:** `BackHandler.exitApp()` on first press — that's an exit, not a back.

**Severity: Critical.**

---

### Bottom Tabs (Rule 10)

**The rule:** Bottom tab bar should have at most 5 primary items.

**Why:** More than 5 items makes tabs crowded and unreadable. iOS HIG recommends 3-5 tabs. Beyond that, move extras to "More" or Settings. Overloaded tab bars cause users to miss important destinations.

**Do:** 3-5 tabs, move extras to More/Settings
**Don't:** Home/Explore/Shop/Cart/Profile/Settings/More — 7 items crammed.

**Severity: Medium.**

---

### Modal Escape (Rule 11)

**The rule:** Modals/sheets must have clear close actions.

**Why:** A modal without a close button traps the user. They can't dismiss it without knowing how. WCAG 2.1.2 (No Trap) and general usability both demand an escape path.

**Do:** `<Modal><Button title="Close" onPress={onClose} /></Modal>` + swipe-down where platform expects it
**Don't:** `<Modal><View>{children}</View></Modal>` — no close affordance.

**Severity: High.**

---

### Preserve Screen State (Rule 12)

**The rule:** Returning to a screen should restore scroll and form state.

**Why:** Navigate away from a form with filled data, come back, and the form is empty — the user has to re-enter everything. Or scroll to the top of a long list when returning. This breaks navigation predictability.

**Do:** `<Tab.Navigator screenOptions={{ unmountOnBlur: false }}>` — keep components mounted
**Don't:** `<Tab.Screen options={{ unmountOnBlur: true }} />` — destroys and loses state.

**Severity: Medium.**

---

## 3. Forms & Input UX

### Inline Validation (Rule 16)

**The rule:** Validate inputs on blur or submit with clear messaging — not on every keystroke.

**Why:** Validating on every keystroke causes:
- Visual jank (errors popping in and out as user types)
- Cognitive overload (user sees errors before they've finished thinking)
- Performance cost (validation runs on every character)

Validate when the user signals they're done with a field (blur) or when they submit. Give clear error messages near the problem field.

**Do:** `onBlur={() => validateEmail(value)}` — validate when user leaves field
**Don't:** `onChangeText={v => validateEmail(v)}` — validates every character.

**Severity: Medium.**

---

### Keyboard Type (Rule 17)

**The rule:** Use appropriate `keyboardType` and `returnKeyType`.

**Why:** The wrong keyboard forces the user to do manual work:
- Email field with default keyboard → user must switch to numbers/symbols manually
- Number field with email keyboard → no number row
- Search field with default keyboard → no search key

Match the input type to the expected content. This is both usability and accessibility (correct input mode announced to screen readers).

**Do:** `<TextInput keyboardType="email-address" />` for email fields
**Don't:** `<TextInput keyboardType="default" />` for everything.

**Severity: Medium.**

---

### Auto Focus & Next (Rule 18)

**The rule:** Guide users through form fields with Next/Done flows using `onSubmitEditing`.

**Why:** After filling one field, the user should flow to the next without manually tapping. `onSubmitEditing` lets you focus the next field when the keyboard's Next/Done key is pressed. This is especially important on mobile where every tap is a physical action.

**Do:** `onSubmitEditing={() => nextRef.current?.focus()}` — chains fields
**Don't:** No `onSubmitEditing` — user must tap next field manually each time.

**Severity: Low.** Convenience improvement, not a blocker.

---

### Password Visibility (Rule 19)

**The rule:** Allow toggling password visibility securely.

**Why:** Users make typos in passwords. Without a visibility toggle:
- They must retype blindly
- They abandon sign-up flows when they can't see their input
- They use weaker passwords because they can't verify what they typed

A Show/Hide toggle respects user intent while keeping the default secure (hidden).

**Do:** `<TextInput secureTextEntry={secure} />` with toggle button
**Don't:** `<TextInput secureTextEntry />` without toggle — forces blind typing.

**Severity: Medium.**

---

### Form Control Labels (Rule 2 — restated in forms context)

Already covered in Accessibility. Forms are where label failures hurt most — a mislabeled form field means the user ( sighted or not ) doesn't know what to enter, and the submission fails.

---

## 4. Feedback & State

### Loading Indicators (Rule 13)

**The rule:** Show visible feedback during network operations — ActivityIndicator or skeleton for operations >300ms.

**Why:** Without loading feedback, the user thinks the app froze. They tap again (duplicate request), or abandon. Visible feedback says "I heard you, working on it." The 300ms threshold is from Nielsen's responsiveness research — below that, humans perceive it as instant.

**Do:** `{loading ? <ActivityIndicator /> : <Button title="Save" />}` — shows progress
**Don't:** `<Button title="Save" onPress={submit} />` with no loading state — app appears frozen.

**Severity: High.**

---

### Success Feedback (Rule 14)

**The rule:** Confirm successful actions with brief feedback — toast, checkmark, or banner.

**Why:** Without confirmation, the user doesn't know if their action worked. Did the save go through? Did the message send? A brief confirmation closes the feedback loop and builds trust.

**Do:** `showToast('Saved successfully')` — brief, non-blocking
**Don't:** Silently update state with no confirmation — user is uncertain.

**Severity: Medium.**

---

### Error Feedback (Rule 15)

**The rule:** Show clear error messages near the problem — input-level error + summary banner.

**Why:** A red border alone says "something's wrong" but not what or how to fix it. An error message explains the problem and the solution. Input-level errors let the user fix the specific field; a summary banner helps when multiple errors exist.

**Do:**
```jsx
<TextInput />
<Text style={{color: 'red'}}>{error}</Text>
```
**Don't:** `<TextInput style={{borderColor: 'red'}} />` — red border, no explanation.

**Severity: High.**

---

### Preserve Screen State (Rule 12 — cross-reference)

Already covered in Navigation. Form state preservation is part of this — returning to a screen with filled form data should show that data, not reset.

---

## 5. Performance — Bundle, Server & Client

### Bundle Size Optimization

**Why bundle size matters:** Large bundles mean:
- Slow initial load (blocking first paint)
- Higher data usage for mobile users
- Worse Core Web Vitals (LCP, FID, CLS)
- Reduced conversion on slow connections

These rules from React/Next.js performance apply broadly to any React-based UI.

---

### Barrel Imports (Rule 7)

**The rule:** Import directly from source files instead of barrel files to avoid loading unused modules.

**Why:** Barrel files (`index.ts` that re-exports everything) cause bundlers to include ALL exports, not just what you use. Importing directly from the source path lets tree-shaking eliminate unused code.

**Do:** `import Check from 'lucide-react/dist/esm/icons/check'` — tree-shakeable
**Don't:** `import { Check } from 'lucide-react'` — pulls entire library.

**Severity: Critical.**

---

### Dynamic Imports (Rule 8)

**The rule:** Use `next/dynamic` to lazy-load large components not needed on initial render.

**Why:** Heavy components (code editors, rich text editors, data grids) can be 100KB+ of JS. If they're on the initial route but not visible until interaction, loading them upfront wastes bandwidth and delays first paint. Dynamic imports split them into separate chunks loaded on demand.

**Do:** `const Monaco = dynamic(() => import('./monaco'), { ssr: false })` — loads when needed
**Don't:** `import { MonacoEditor } from './monaco-editor'` at top level — bundles unconditionally.

**Severity: Critical.**

---

### Dynamic Loading for Conditional Features (Rule 9)

**The rule:** Load large data or modules only when a feature is activated.

**Why:** If a feature is gated behind a toggle, onboarding step, or user choice, its code doesn't need to be in the initial bundle. Load it when the user enables the feature.

**Do:** `useEffect(() => { if (enabled) import('./heavy.js') }, [enabled])`
**Don't:** `import { heavyData } from './heavy.js'` unconditionally.

**Severity: High.**

---

### Preload on Intent (Rule 11)

**The rule:** Preload heavy bundles on hover/focus before they're needed.

**Why:** If a user hovers over an "Edit" button that opens a heavy editor, you have ~200ms of lead time before they click. Using that time to start loading means the editor is ready when they click — no spinner, no delay.

**Do:** `onMouseEnter={() => import('./editor')}` — preload on hover
**Don't:** `onClick={() => import('./editor')}` — loads only after click, causes delay.

**Severity: Medium.**

---

## 6. React/Next.js Re-render Optimization

### State Read in Callbacks (Rule 18)

**The rule:** Don't subscribe to state only used in callbacks — read it on-demand.

**Why:** `useSearchParams()` subscribes the component to URL changes. If you only use `params` inside a click handler (not in render), you're causing re-renders for changes that don't affect the UI. Read the value inside the callback instead.

**Do:**
```jsx
const handleClick = () => {
  const params = new URLSearchParams(location.search)
  // use params
}
```
**Don't:**
```jsx
const params = useSearchParams()
const handleClick = () => { params.get('ref') }
```
— re-renders on every URL change.

**Severity: Medium.**

---

### Memoized Components (Rule 19)

**The rule:** Extract expensive work into memoized components for early returns.

**Why:** When you have an early return (loading skeleton, error state), expensive computations before the return still run — they're wasted because the component returns before using them. Extract the expensive part into a `memo()` component that only renders when its data is ready.

**Do:**
```jsx
const UserAvatar = memo(({ user }) => { ... })
if (loading) return <Skeleton />
// avatar only computes when user data is ready
```
**Don't:**
```jsx
const avatar = useMemo(() => compute(user))
if (loading) return <Skeleton />
```
— computation runs before the early return.

**Severity: Medium.**

---

### Narrow Dependencies (Rule 20)

**The rule:** Specify primitive dependencies in effects instead of object references.

**Why:** `useEffect` re-runs when dependencies change. If you pass the whole `user` object, the effect re-runs every time any part of `user` changes — even if the effect only uses `user.id`. Narrow to primitives to avoid unnecessary effect re-runs.

**Do:** `useEffect(() => { console.log(user.id) }, [user.id])` — only when id changes
**Don't:** `useEffect(() => { console.log(user.id) }, [user])` — re-runs on any user change.

**Severity: Low.**

---

### Derived State (Rule 21)

**The rule:** Subscribe to derived booleans instead of continuous values.

**Why:** `useWindowWidth()` returns a continuously-changing number. If you only care about whether the width is below 768px (a boolean), subscribing to the continuous value causes re-renders on every pixel change during resize. Derive the boolean from a more stable source, or subscribe to the derived boolean.

**Do:** `const isMobile = useMediaQuery('(max-width: 767px)')` — only changes at breakpoint
**Don't:** `const width = useWindowWidth(); const isMobile = width < 768` — re-renders on every resize.

**Severity: Medium.**

---

### Functional setState (Rule 22)

**The rule:** Use functional setState updates for stable callbacks and to avoid stale closures.

**Why:** `setItems([...items, newItem])` captures `items` from the render scope. If the callback is used in a setTimeout, API callback, or detached event, `items` may be stale. The functional form `setItems(curr => [...curr, newItem])` always gets the current state, no stale closure.

**Do:** `setItems(curr => [...curr, newItem])` — always current
**Don't:** `setItems([...items, newItem])` — may use stale `items`.

**Severity: Medium.**

---

### Lazy State Initialization (Rule 23)

**The rule:** Pass a function to `useState` for expensive initial values.

**Why:** `useState(buildSearchIndex(items))` runs `buildSearchIndex` on every render — even when the state is already initialized. React only uses the function form on the first render. The function form: `useState(() => buildSearchIndex(items))` runs once.

**Do:** `useState(() => buildSearchIndex(items))` — runs once
**Don't:** `useState(buildSearchIndex(items))` — runs every render.

**Severity: Medium.**

---

### Transitions for Non-Urgent Updates (Rule 24)

**The rule:** Mark frequent non-urgent state updates as transitions with `startTransition`.

**Why:** `setScrollY(window.scrollY)` on every scroll event blocks the main thread. The UI can't respond to user input while processing scroll state updates. Wrapping in `startTransition` tells React this update is non-urgent — it can interrupt to handle user input first.

**Do:** `startTransition(() => setScrollY(window.scrollY))` — non-blocking
**Don't:** `setScrollY(window.scrollY)` — blocks on every scroll event.

**Severity: Medium.**

---

## 7. JavaScript Performance Patterns

These rules apply to any JavaScript UI — React, React Native, or vanilla JS. They focus on reducing unnecessary work.

### Batching DOM/CSS Changes (Rule 32)

**The rule:** Group CSS changes via classes or cssText to minimize reflows.

**Why:** Every individual style change can trigger a reflow (layout recalculation). Browsers are smarter about class changes (they can batch), but individual style property writes are expensive. Changing one property at a time: `el.style.width = '100px'` then `el.style.height = '200px'` causes two reflows. Using a class: one reflow.

**Do:** `element.classList.add('highlighted')` — single class change
**Don't:** `el.style.width = '100px'; el.style.height='200px'` — two reflows.

**Severity: Medium.**

---

### Index Map Lookup (Rule 33)

**The rule:** Build a Map for repeated lookups instead of multiple `.find()` calls.

**Why:** `.find()` is O(n) — it scans the entire array each time. If you do this in a loop, you get O(n²). A Map gives O(1) lookup: `byId.get(id)` is instant regardless of array size.

**Do:**
```js
const byId = new Map(users.map(u => [u.id, u]))
byId.get(id)
```
**Don't:** `users.find(u => u.id === order.userId)` in a loop — O(n) per call.

**Severity: Low-Medium.**

---

### Cache Property Access (Rule 34)

**The rule:** Cache object property lookups in hot paths.

**Why:** Accessing `obj.config.settings.value` inside a loop means three property lookups per iteration. If the loop runs 1000 times, that's 3000 lookups. Cache once before the loop: 3 lookups total.

**Do:**
```js
const val = obj.config.settings.value
for (...) process(val)
```
**Don't:**
```js
for (...) process(obj.config.settings.value)
```
— 3 lookups per iteration.

**Severity: Low-Medium.**

---

### Cache Function Results (Rule 35)

**The rule:** Use a module-level Map to cache repeated function results.

**Why:** If a function like `slugify(name)` is called 100 times with the same input, it does 100 identical string operations. Caching the result gives instant return for repeat inputs.

**Do:**
```js
const cache = new Map()
if (cache.has(x)) return cache.get(x)
const result = slugify(x)
cache.set(x, result)
return result
```
**Don't:** `slugify(name)` — called 100 times with same input.

**Severity: Medium.**

---

### Cache Storage API Reads (Rule 36)

**The rule:** Cache localStorage/sessionStorage reads in memory.

**Why:** Storage API reads are synchronous and relatively slow (disk I/O in some browsers). Reading `localStorage.getItem('theme')` on every render is wasteful if the value doesn't change during the session. Read once, cache in a Map, return from cache.

**Do:**
```js
if (!cache.has(key)) cache.set(key, localStorage.getItem(key))
return cache.get(key)
```
**Don't:** `localStorage.getItem('theme')` on every call.

**Severity: Low-Medium.**

---

### Combine Iterations (Rule 37)

**The rule:** Combine multiple filter/map operations into a single loop.

**Why:** `users.filter(admin); users.filter(tester); users.filter(inactive)` — three passes over the array. A single loop with conditional pushes does all three in one pass.

**Do:**
```js
for (u of users) {
  if (u.isAdmin) admins.push(u)
  if (u.isTester) testers.push(u)
}
```
**Don't:** Three separate filter calls — three full passes.

**Severity: Low-Medium.**

---

### Length Check First (Rule 38)

**The rule:** Check array lengths before expensive comparisons.

**Why:** If you're comparing two arrays and they have different lengths, they're NOT equal. No need to run the expensive comparison. Early return on length mismatch saves the full comparison.

**Do:**
```js
if (a.length !== b.length) return true
// then compare
```
**Don't:** Always run `a.sort().join() !== b.sort().join()` — even when lengths differ.

**Severity: Medium-High.**

---

### Early Return (Rule 39)

**The rule:** Return early when result is determined to skip remaining processing.

**Why:** Processing all items when the first one fails is wasted work. If validating users and the first one has no email, return immediately — don't check the other 99.

**Do:**
```js
for (u of users) {
  if (!u.email) return { error: 'Email required' }
}
```
**Don't:**
```js
let hasError
for (...) {
  if (!email) hasError = true
}
if (hasError) ...
```
— processes all before checking.

**Severity: Low-Medium.**

---

### Hoist RegExp (Rule 39)

**The rule:** Don't create RegExp inside render — hoist to module scope or memoize.

**Why:** `new RegExp(pattern)` creates a new object every render. RegExp compilation is not free. If the pattern is constant, hoist it. If it's dynamic but repeated, memoize with `useMemo`.

**Do:** `const EMAIL_RE = /^[^@]+@[^@]+$/` at module level
**Don't:** `const re = new RegExp(pattern)` inside component render.

**Severity: Low-Medium.**

---

### Loop Min/Max (Rule 40)

**The rule:** Use a loop for min/max instead of sort — O(n) vs O(n log n).

**Why:** `arr.sort((a,b) => b-a)[0]` sorts the entire array just to find the largest element. Sorting is O(n log n). A single pass loop is O(n) — faster for large arrays.

**Do:**
```js
let max = arr[0]
for (x of arr) if (x > max) max = x
```
**Don't:** `arr.sort((a,b) => b-a)[0]` — sorts everything.

**Severity: Low.**

---

### Set/Map Lookups (Rule 41)

**The rule:** Use Set/Map for O(1) lookups instead of array `.includes()`.

**Why:** `array.includes(id)` is O(n) — scans the array. `set.has(id)` is O(1) — instant. If you're checking membership repeatedly, converting to a Set pays off immediately.

**Do:** `const allowed = new Set(['a','b']); allowed.has(id)`
**Don't:** `const allowed = ['a','b']; allowed.includes(id)` for repeated checks.

**Severity: Low-Medium.**

---

### Immutable Sort (Rule 42)

**The rule:** Use `toSorted()` instead of `sort()` to avoid mutating arrays.

**Why:** `sort()` mutates the original array. If that array is referenced elsewhere (state, props, other components), the mutation causes bugs. `toSorted()` returns a new array, leaving the original intact — safer for React's immutable patterns.

**Do:** `users.toSorted((a,b) => a.name.localeCompare(b.name))`
**Don't:** `users.sort((a,b) => a.name.localeCompare(b.name))` — mutates.

**Severity: Medium-High.**

---

## 8. Rendering & DOM Optimization

### SVG Animation Wrapper (Rule 25)

**The rule:** Wrap SVG in a div and animate the wrapper for hardware acceleration.

**Why:** Animating SVG attributes directly (like `<svg class="animate-spin">`) may not hit the compositor thread. Wrapping in a div and animating the div's transform keeps the animation on the GPU compositor — smoother, lower CPU.

**Do:** `<div class='animate-spin'><svg>...</svg></div>`
**Don't:** `<svg class='animate-spin'>...</svg>`

**Severity: Low.**

---

### Content Visibility (Rule 26)

**The rule:** Apply `content-visibility: auto` to defer off-screen rendering.

**Why:** Browsers render all content in the viewport AND content that's close to it (for smooth scrolling). `content-visibility: auto` tells the browser "skip rendering elements that are far off-screen" — drastically reducing initial render time for long lists. When the user scrolls near an element, it renders on demand.

**Do:** `.item { content-visibility: auto; contain-intrinsic-size: 0 80px }`
**Don't:** Render 1000 items without optimization.

**Severity: High.**

---

### Hoist Static JSX (Rule 27)

**The rule:** Extract static JSX outside components to avoid re-creation.

**Why:** `<div class='animate-pulse' />` inside a component creates a new element on every render. Extracting to module scope: one element, reused. This is especially noticeable in lists where each item has static sub-elements.

**Do:**
```js
const skeleton = <div class='animate-pulse' />
function C() { return skeleton }
```
**Don't:**
```js
function C() { return <div class='animate-pulse' /> }
```
— new element every render.

**Severity: Low.**

---

### Hydration No Flicker (Rule 28)

**The rule:** Use inline script to set client-only data before hydration.

**Why:** `useEffect(() => setTheme(localStorage.theme), [])` runs AFTER hydration — the server renders with default theme, then client swaps to localStorage theme. That swap is a visible flicker. An inline script in the HTML runs before hydration, so the server-rendered HTML already has the correct theme — no flicker.

**Do:**
```jsx
<script dangerouslySetInnerHTML={{ __html: 'el.className = localStorage.theme' }} />
```
**Don't:**
```jsx
useEffect(() => setTheme(localStorage.theme), [])
```
— flicker on load.

**Severity: Medium.**

---

### Conditional Render with Ternary (Rule 29)

**The rule:** Use ternary instead of `&&` when the condition can be 0 or NaN.

**Why:** `{count && <Badge>{count}</Badge>}` — when `count` is 0, `0 && ...` evaluates to 0, which React renders as the string "0". User sees "0" instead of nothing. `{count > 0 ? <Badge>{count}</Badge> : null}` — explicit, correct.

**Do:** `{count > 0 ? <Badge>{count}</Badge> : null}`
**Don't:** `{count && <Badge>{count}</Badge>}` — renders "0" when count is 0.

**Severity: Low.**

---

### Activity Component (Rule 30)

**The rule:** Use Activity component to preserve state/DOM for toggled components.

**Why:** `{isOpen && <Menu />}` — when `isOpen` is false, React unmounts Menu completely. State inside Menu is lost. When `isOpen` becomes true again, Menu remounts and state resets. `<Activity mode={isOpen ? 'visible' : 'hidden'}><Menu /></Activity>` keeps Menu mounted, just hides it — state preserved.

**Do:** `<Activity mode={isOpen ? 'visible' : 'hidden'}><Menu /></Activity>`
**Don't:** `{isOpen && <Menu />}` — loses state on toggle.

**Severity: Medium.**

---

## 9. Advanced React Patterns

### Effect Events (Rule 43)

**The rule:** Use `useEffectEvent` to read non-reactive latest values inside Effects without re-synchronizing.

**Why:** Sometimes an Effect needs to read the "current" value of something that changes over time, but you don't want that value to be a dependency (because it would re-trigger the Effect constantly). `useEffectEvent` wraps a function so it always reads the latest value when called, without being a reactive dependency.

**Example:** An effect that sets up a connection and needs to notify with the current theme, but theme changes shouldn't re-connect:
```jsx
const onConnected = useEffectEvent(() => notify(theme))
useEffect(() => {
  connection.on('connected', onConnected)
  return () => connection.off('connected', onConnected)
}, [roomId])
```
The effect only re-runs when `roomId` changes, but `onConnected` always uses the latest theme.

**Severity: Medium.**

---

### Latest Value Refs (Rule 44)

**The rule:** Use refs only when a latest value must be read without causing a render.

**Why:** Sometimes you need to read the current value of something inside a setTimeout, callback, or async operation — but you don't want to trigger a re-render when that value changes. Refs give you current values without reactivity. However, you must NOT mutate `ref.current` during render (that's a React anti-pattern) and you must NOT use refs to bypass reactive dependencies (that hides bugs).

**Do:**
```jsx
const valueRef = useRef(value)
useEffect(() => { valueRef.current = value }, [value])
setTimeout(() => use(valueRef.current), 0)
```
**Don't:** `valueRef.current = value` during render — render-phase mutation.

**Severity: Low.**

---

## 10. Color Palettes by Product Category — Full Reference

This section consolidates all 193 product type color palettes from `colors.csv`. Each palette includes primary, on-primary, secondary, on-secondary, accent, on-accent, background, foreground, card, card-foreground, muted, muted-foreground, border, destructive, on-destructive, ring, and notes.

**How to use:** Find your product type, copy the palette. The columns map to a standard design token structure.

### Quick Reference — Common Product Types

| Product Type | Primary | Secondary | Accent | Background | Notes |
|-------------|---------|-----------|--------|------------|-------|
| SaaS (General) | #2563EB | #3B82F6 | #EA580C | #F8FAFC | Trust blue + orange CTA |
| Micro SaaS | #6366F1 | #818CF8 | #059669 | #F5F3FF | Indigo primary + emerald CTA |
| E-commerce | #059669 | #10B981 | #EA580C | #ECFDF5 | Success green + urgency orange |
| E-commerce Luxury | #1C1917 | #44403C | #A16207 | #FAFAF9 | Premium dark + gold accent |
| B2B Service | #0F172A | #334155 | #0369A1 | #F8FAFC | Professional navy + blue CTA |
| Financial Dashboard | #0F172A | #1E293B | #22C55E | #020617 | Dark bg + green positive |
| Analytics Dashboard | #1E40AF | #3B82F6 | #D97706 | #F8FAFC | Blue data + amber highlights |
| Healthcare App | #0891B2 | #22D3EE | #059669 | #ECFEFF | Calm cyan + health green |
| Educational App | #4F46E5 | #818CF8 | #EA580C | #EEF2FF | Playful indigo + energetic orange |
| Creative Agency | #EC4899 | #F472B6 | #0891B2 | #FDF2F8 | Bold pink + cyan accent |
| Portfolio/Personal | #18181B | #3F3F46 | #2563EB | #FAFAFA | Monochrome + blue accent |
| Gaming | #7C3AED | #A78BFA | #F43F5E | #0F0F23 | Neon purple + rose action |
| Government/Public Service | #0F172A | #334155 | #0369A1 | #F8FAFC | High contrast navy + blue |
| Fintech/Crypto | #F59E0B | #FBBF24 | #8B5CF6 | #0F172A | Gold trust + purple tech |
| Social Media App | #E11D48 | #FB7185 | #2563EB | #FFF1F2 | Vibrant rose + engagement blue |
| Productivity Tool | #0D9488 | #14B8A6 | #EA580C | #F0FDFA | Teal focus + action orange |
| Design System/Component Library | #4F46E5 | #6366F1 | #EA580C | #EEF2FF | Indigo brand + doc hierarchy |
| AI/Chatbot Platform | #7C3AED | #A78BFA | #0891B2 | #FAF5FF | AI purple + cyan interactions |
| NFT/Web3 Platform | #8B5CF6 | #A78BFA | #FBBF24 | #0F0F23 | Purple tech + gold value |
| Developer Tool / IDE | #1E293B | #334155 | #22C55E | #0F172A | Code dark + run green |

### Full 193 Palettes (condensed)

For the complete palette reference with all token values, see the original `colors.csv` in the skill's data directory. Below is the condensed list with product type, primary, accent, and background.

1. SaaS (General) — Primary: #2563EB, Accent: #EA580C, BG: #F8FAFC
2. Micro SaaS — Primary: #6366F1, Accent: #059669, BG: #F5F3FF
3. E-commerce — Primary: #059669, Accent: #EA580C, BG: #ECFDF5
4. E-commerce Luxury — Primary: #1C1917, Accent: #A16207, BG: #FAFAF9
5. B2B Service — Primary: #0F172A, Accent: #0369A1, BG: #F8FAFC
6. Financial Dashboard — Primary: #0F172A, Accent: #22C55E, BG: #020617
7. Analytics Dashboard — Primary: #1E40AF, Accent: #D97706, BG: #F8FAFC
8. Healthcare App — Primary: #0891B2, Accent: #059669, BG: #ECFEFF
9. Educational App — Primary: #4F46E5, Accent: #EA580C, BG: #EEF2FF
10. Creative Agency — Primary: #EC4899, Accent: #0891B2, BG: #FDF2F8
11. Portfolio/Personal — Primary: #18181B, Accent: #2563EB, BG: #FAFAFA
12. Gaming — Primary: #7C3AED, Accent: #F43F5E, BG: #0F0F23
13. Government/Public Service — Primary: #0F172A, Accent: #0369A1, BG: #F8FAFC
14. Fintech/Crypto — Primary: #F59E0B, Accent: #8B5CF6, BG: #0F172A
15. Social Media App — Primary: #E11D48, Accent: #2563EB, BG: #FFF1F2
16. Productivity Tool — Primary: #0D9488, Accent: #EA580C, BG: #F0FDFA
17. Design System/Component Library — Primary: #4F46E5, Accent: #EA580C, BG: #EEF2FF
18. AI/Chatbot Platform — Primary: #7C3AED, Accent: #0891B2, BG: #FAF5FF
19. NFT/Web3 Platform — Primary: #8B5CF6, Accent: #FBBF24, BG: #0F0F23
20. Creator Economy Platform — Primary: #EC4899, Accent: #EA580C, BG: #FDF2F8
21. Remote Work/Collaboration Tool — Primary: #6366F1, Accent: #059669, BG: #F5F3FF
22. Mental Health App — Primary: #8B5CF6, Accent: #059669, BG: #FAF5FF
23. Pet Tech App — Primary: #F97316, Accent: #2563EB, BG: #FFF7ED
24. Smart Home/IoT Dashboard — Primary: #1E293B, Accent: #22C55E, BG: #0F172A
25. EV/Charging Ecosystem — Primary: #0891B2, Accent: #16A34A, BG: #ECFEFF
26. Subscription Box Service — Primary: #D946EF, Accent: #EA580C, BG: #FDF4FF
27. Podcast Platform — Primary: #1E1B4B, Accent: #F97316, BG: #0F0F23
28. Dating App — Primary: #E11D48, Accent: #EA580C, BG: #FFF1F2
29. Micro-Credentials/Badges Platform — Primary: #0369A1, Accent: #A16207, BG: #F0F9FF
30. Knowledge Base/Documentation — Primary: #475569, Accent: #2563EB, BG: #F8FAFC
31. Hyperlocal Services — Primary: #059669, Accent: #EA580C, BG: #ECFDF5
32. Beauty/Spa/Wellness Service — Primary: #EC4899, Accent: #8B5CF6, BG: #FDF2F8
33. Luxury/Premium Brand — Primary: #1C1917, Accent: #A16207, BG: #FAFAF9
34. Restaurant/Food Service — Primary: #DC2626, Accent: #A16207, BG: #FEF2F2
35. Fitness/Gym App — Primary: #F97316, Accent: #22C55E, BG: #1F2937
36. Real Estate/Property — Primary: #0F766E, Accent: #0369A1, BG: #F0FDFA
37. Travel/Tourism Agency — Primary: #0EA5E9, Accent: #EA580C, BG: #F0F9FF
38. Hotel/Hospitality — Primary: #1E3A8A, Accent: #A16207, BG: #F8FAFC
39. Wedding/Event Planning — Primary: #DB2777, Accent: #A16207, BG: #FDF2F8
40. Legal Services — Primary: #1E3A8A, Accent: #B45309, BG: #F8FAFC
41. Insurance Platform — Primary: #0369A1, Accent: #16A34A, BG: #F0F9FF
42. Banking/Traditional Finance — Primary: #0F172A, Accent: #A16207, BG: #F8FAFC
43. Online Course/E-learning — Primary: #0D9488, Accent: #EA580C, BG: #F0FDFA
44. Non-profit/Charity — Primary: #0891B2, Accent: #EA580C, BG: #ECFEFF
45. Music Streaming — Primary: #1E1B4B, Accent: #22C55E, BG: #0F0F23
46. Video Streaming/OTT — Primary: #0F0F23, Accent: #E11D48, BG: #000000
47. Job Board/Recruitment — Primary: #0369A1, Accent: #16A34A, BG: #F0F9FF
48. Marketplace (P2P) — Primary: #7C3AED, Accent: #16A34A, BG: #FAF5FF
49. Logistics/Delivery — Primary: #2563EB, Accent: #EA580C, BG: #EFF6FF
50. Agriculture/Farm Tech — Primary: #15803D, Accent: #A16207, BG: #F0FDF4
51. Construction/Architecture — Primary: #64748B, Accent: #EA580C, BG: #F8FAFC
52. Automotive/Car Dealership — Primary: #1E293B, Accent: #DC2626, BG: #F8FAFC
53. Photography Studio — Primary: #18181B, Accent: #F8FAFC, BG: #000000
54. Coworking Space — Primary: #F59E0B, Accent: #2563EB, BG: #FFFBEB
55. Home Services (Plumber/Electrician) — Primary: #1E40AF, Accent: #EA580C, BG: #EFF6FF
56. Childcare/Daycare — Primary: #F472B6, Accent: #16A34A, BG: #FDF2F8
57. Senior Care/Elderly — Primary: #0369A1, Accent: #16A34A, BG: #F0F9FF
58. Medical Clinic — Primary: #0891B2, Accent: #16A34A, BG: #F0FDFA
59. Pharmacy/Drug Store — Primary: #15803D, Accent: #0369A1, BG: #F0FDF4
60. Dental Practice — Primary: #0EA5E9, Accent: #0EA5E9, BG: #F0F9FF
61. Veterinary Clinic — Primary: #0D9488, Accent: #EA580C, BG: #F0FDFA
62. Florist/Plant Shop — Primary: #15803D, Accent: #EC4899, BG: #F0FDF4
63. Bakery/Cafe — Primary: #92400E, Accent: #92400E, BG: #FEF3C7
64. Brewery/Winery — Primary: #7C2D12, Accent: #A16207, BG: #FEF2F2
65. Airline — Primary: #1E3A8A, Accent: #EA580C, BG: #EFF6FF
66. News/Media Platform — Primary: #DC2626, Accent: #1E40AF, BG: #FEF2F2
67. Magazine/Blog — Primary: #18181B, Accent: #EC4899, BG: #FAFAFA
68. Freelancer Platform — Primary: #6366F1, Accent: #16A34A, BG: #EEF2FF
69. Marketing Agency — Primary: #EC4899, Accent: #0891B2, BG: #FDF2F8
70. Event Management — Primary: #7C3AED, Accent: #EA580C, BG: #FAF5FF
71. Membership/Community — Primary: #7C3AED, Accent: #16A34A, BG: #FAF5FF
72. Newsletter Platform — Primary: #0369A1, Accent: #EA580C, BG: #F0F9FF
73. Digital Products/Downloads — Primary: #6366F1, Accent: #16A34A, BG: #EEF2FF
74. Church/Religious Organization — Primary: #7C3AED, Accent: #A16207, BG: #FAF5FF
75. Sports Team/Club — Primary: #DC2626, Accent: #DC2626, BG: #FEF2F2
76. Museum/Gallery — Primary: #18181B, Accent: #18181B, BG: #FAFAFA
77. Theater/Cinema — Primary: #1E1B4B, Accent: #CA8A04, BG: #0F0F23
78. Language Learning App — Primary: #4F46E5, Accent: #16A34A, BG: #EEF2FF
79. Coding Bootcamp — Primary: #0F172A, Accent: #22C55E, BG: #020617
80. Cybersecurity Platform — Primary: #00FF41, Accent: #FF3333, BG: #000000
81. Developer Tool / IDE — Primary: #1E293B, Accent: #22C55E, BG: #0F172A
82. Biotech / Life Sciences — Primary: #0EA5E9, Accent: #059669, BG: #F0F9FF
83. Space Tech / Aerospace — Primary: #F8FAFC, Accent: #3B82F6, BG: #0B0B10
84. Architecture / Interior — Primary: #171717, Accent: #A16207, BG: #FFFFFF
85. Quantum Computing Interface — Primary: #00FFFF, Accent: #FF00FF, BG: #050510
86. Biohacking / Longevity App — Primary: #FF4D4D, Accent: #059669, BG: #F5F5F7
87. Autonomous Drone Fleet Manager — Primary: #00FF41, Accent: #FF3333, BG: #0D1117
88. Generative Art Platform — Primary: #18181B, Accent: #EC4899, BG: #FAFAFA
89. Spatial Computing OS / App — Primary: #FFFFFF, Accent: #FFFFFF, BG: #888888
90. Sustainable Energy / Climate Tech — Primary: #059669, Accent: #059669, BG: #ECFDF5
91. Personal Finance Tracker — Primary: #1E40AF, Accent: #059669, BG: #0F172A
92. Chat & Messaging App — Primary: #2563EB, Accent: #059669, BG: #FFFFFF
93. Notes & Writing App — Primary: #78716C, Accent: #D97706, BG: #FFFBEB
94. Habit Tracker — Primary: #D97706, Accent: #059669, BG: #FFFBEB
95. Food Delivery / On-Demand — Primary: #EA580C, Accent: #2563EB, BG: #FFF7ED
96. Ride Hailing / Transportation — Primary: #1E293B, Accent: #2563EB, BG: #0F172A
97. Recipe & Cooking App — Primary: #9A3412, Accent: #059669, BG: #FFFBEB
98. Meditation & Mindfulness — Primary: #7C3AED, Accent: #059669, BG: #FAF5FF
99. Weather App — Primary: #0284C7, Accent: #F59E0B, BG: #F0F9FF
100. Diary & Journal App — Primary: #92400E, Accent: #6366F1, BG: #FFFBEB
101. CRM & Client Management — Primary: #2563EB, Accent: #059669, BG: #F8FAFC
102. Inventory & Stock Management — Primary: #334155, Accent: #059669, BG: #F8FAFC
103. Flashcard & Study Tool — Primary: #7C3AED, Accent: #059669, BG: #FAF5FF
104. Booking & Appointment App — Primary: #0284C7, Accent: #059669, BG: #F0F9FF
105. Invoice & Billing Tool — Primary: #1E3A5F, Accent: #059669, BG: #F8FAFC
106. Grocery & Shopping List — Primary: #059669, Accent: #D97706, BG: #ECFDF5
107. Timer & Pomodoro — Primary: #DC2626, Accent: #059669, BG: #0F172A
108. Parenting & Baby Tracker — Primary: #EC4899, Accent: #0284C7, BG: #FDF2F8
109. Scanner & Document Manager — Primary: #1E293B, Accent: #2563EB, BG: #F8FAFC
110. Calendar & Scheduling App — Primary: #2563EB, Accent: #059669, BG: #F8FAFC
111. Password Manager — Primary: #1E3A5F, Accent: #059669, BG: #0F172A
112. Expense Splitter / Bill Split — Primary: #059669, Accent: #DC2626, BG: #F8FAFC
113. Voice Recorder & Memo — Primary: #DC2626, Accent: #2563EB, BG: #FFFFFF
114. Bookmark & Read-Later — Primary: #D97706, Accent: #2563EB, BG: #FFFBEB
115. Translator App — Primary: #2563EB, Accent: #EA580C, BG: #F8FAFC
116. Calculator & Unit Converter — Primary: #EA580C, Accent: #2563EB, BG: #1C1917
117. Alarm & World Clock — Primary: #D97706, Accent: #6366F1, BG: #0F172A
118. File Manager & Transfer — Primary: #2563EB, Accent: #D97706, BG: #F8FAFC
119. Email Client — Primary: #2563EB, Accent: #DC2626, BG: #FFFFFF
120. Casual Puzzle Game — Primary: #EC4899, Accent: #F59E0B, BG: #FDF2F8
121. Trivia & Quiz Game — Primary: #2563EB, Accent: #F59E0B, BG: #EFF6FF
122. Card & Board Game — Primary: #15803D, Accent: #D97706, BG: #0F172A
123. Idle & Clicker Game — Primary: #D97706, Accent: #7C3AED, BG: #FFFBEB
124. Word & Crossword Game — Primary: #15803D, Accent: #D97706, BG: #FFFFFF
125. Arcade & Retro Game — Primary: #DC2626, Accent: #22C55E, BG: #0F172A
126. Photo Editor & Filters — Primary: #7C3AED, Accent: #0891B2, BG: #0F172A
127. Short Video Editor — Primary: #EC4899, Accent: #2563EB, BG: #0F172A
128. Drawing & Sketching Canvas — Primary: #7C3AED, Accent: #0891B2, BG: #1C1917
129. Music Creation & Beat Maker — Primary: #7C3AED, Accent: #22C55E, BG: #0F172A
130. Meme & Sticker Maker — Primary: #EC4899, Accent: #F59E0B, BG: #FFFFFF
131. AI Photo & Avatar Generator — Primary: #7C3AED, Accent: #EC4899, BG: #FAF5FF
132. Link-in-Bio Page Builder — Primary: #2563EB, Accent: #EC4899, BG: #FFFFFF
133. Wardrobe & Outfit Planner — Primary: #BE185D, Accent: #D97706, BG: #FDF2F8
134. Plant Care Tracker — Primary: #15803D, Accent: #D97706, BG: #F0FDF4
135. Book & Reading Tracker — Primary: #78716C, Accent: #D97706, BG: #FFFBEB
136. Couple & Relationship App — Primary: #BE185D, Accent: #DC2626, BG: #FDF2F8
137. Family Calendar & Chores — Primary: #2563EB, Accent: #D97706, BG: #F8FAFC
138. Mood Tracker — Primary: #7C3AED, Accent: #D97706, BG: #FAF5FF
139. Gift & Wishlist — Primary: #DC2626, Accent: #EC4899, BG: #FFF1F2
140. Running & Cycling GPS — Primary: #EA580C, Accent: #059669, BG: #0F172A
141. Yoga & Stretching Guide — Primary: #6B7280, Accent: #0891B2, BG: #F5F5F0
142. Sleep Tracker — Primary: #4338CA, Accent: #7C3AED, BG: #0F172A
143. Calorie & Nutrition Counter — Primary: #059669, Accent: #EA580C, BG: #ECFDF5
144. Period & Cycle Tracker — Primary: #BE185D, Accent: #7C3AED, BG: #FDF2F8
145. Medication & Pill Reminder — Primary: #0284C7, Accent: #DC2626, BG: #F0F9FF
146. Water & Hydration Reminder — Primary: #0284C7, Accent: #0891B2, BG: #F0F9FF
147. Fasting & Intermittent Timer — Primary: #6366F1, Accent: #059669, BG: #0F172A
148. Anonymous Community / Confession — Primary: #475569, Accent: #0891B2, BG: #0F172A
149. Local Events & Discovery — Primary: #EA580C, Accent: #2563EB, BG: #FFF7ED
150. Study Together / Virtual Coworking — Primary: #2563EB, Accent: #059669, BG: #F8FAFC
151. Coding Challenge & Practice — Primary: #22C55E, Accent: #D97706, BG: #0F172A
152. Kids Learning (ABC & Math) — Primary: #2563EB, Accent: #EC4899, BG: #EFF6FF
153. Music Instrument Learning — Primary: #DC2626, Accent: #D97706, BG: #FFFBEB
154. Parking Finder — Primary: #2563EB, Accent: #059669, BG: #F0F9FF
155. Public Transit Guide — Primary: #2563EB, Accent: #EA580C, BG: #F8FAFC
156. Road Trip Planner — Primary: #EA580C, Accent: #0891B2, BG: #FFF7ED
157. VPN & Privacy Tool — Primary: #1E3A5F, Accent: #22C55E, BG: #0F172A
158. Emergency SOS & Safety — Primary: #DC2626, Accent: #2563EB, BG: #FFF1F2
159. Wallpaper & Theme App — Primary: #7C3AED, Accent: #EC4899, BG: #FAF5FF
160. White Noise & Ambient Sound — Primary: #475569, Accent: #4338CA, BG: #0F172A
161. Home Decoration & Interior Design — Primary: #78716C, Accent: #D97706, BG: #FAF5F2
162. Academic Journal / Scholarly Publishing — Primary: #1E3A5F, Accent: #B45309, BG: #F8FAFC
163. API Developer Portal — Primary: #0F172A, Accent: #22C55E, BG: #020617
164. Forum / Discussion Board — Primary: #475569, Accent: #2563EB, BG: #F8FAFC
165. Directory / Listing Site — Primary: #059669, Accent: #D97706, BG: #ECFDF5
166. Status Page / Incident Management — Primary: #16A34A, Accent: #DC2626, BG: #F0FDF4
167. Wiki / Encyclopedia — Primary: #1E3A8A, Accent: #7C3AED, BG: #F8FAFC
168. Auction Platform — Primary: #0F172A, Accent: #16A34A, BG: #020617
169. Changelog / Release Notes — Primary: #475569, Accent: #059669, BG: #F8FAFC
170. Citizen Science Platform — Primary: #15803D, Accent: #D97706, BG: #F0FDF4
171. Classifieds / Buy-Sell — Primary: #2563EB, Accent: #16A34A, BG: #EFF6FF
172. Conference / Symposium Landing Page — Primary: #1E3A5F, Accent: #A16207, BG: #F8FAFC
173. Crowdfunding Platform — Primary: #D97706, Accent: #16A34A, BG: #FFFBEB
174. Digital Signage / Kiosk — Primary: #0F172A, Accent: #EF4444, BG: #020617
175. E-signature / Document Workflow — Primary: #1E3A5F, Accent: #16A34A, BG: #F8FAFC
176. Feature Flag / Config Management — Primary: #0F172A, Accent: #16A34A, BG: #020617
177. Government Portal / Civic Services — Primary: #1E40AF, Accent: #16A34A, BG: #EFF6FF
178. Grant / Funding Portal — Primary: #1E3A5F, Accent: #16A34A, BG: #F8FAFC
179. LMS (Learning Management System) — Primary: #0D9488, Accent: #D97706, BG: #F0FDFA
180. No-code / Low-code Builder — Primary: #7C3AED, Accent: #EC4899, BG: #FAF5FF
181. Open Source Project Landing — Primary: #0F172A, Accent: #A16207, BG: #020617
182. Patient Portal / Health Records — Primary: #0284C7, Accent: #16A34A, BG: #F0F9FF
183. Patent / IP Database — Primary: #475569, Accent: #A16207, BG: #F8FAFC
184. Q&A Community Platform — Primary: #2563EB, Accent: #D97706, BG: #F8FAFC
185. Research Lab / University Department — Primary: #1E3A5F, Accent: #A16207, BG: #F8FAFC
186. Resume / CV Builder — Primary: #1E3A5F, Accent: #16A34A, BG: #F8FAFC
187. Review Platform — Primary: #F59E0B, Accent: #16A34A, BG: #FFFBEB
188. RPA / Automation Dashboard — Primary: #0F172A, Accent: #16A34A, BG: #020617
189. Survey / Form Builder — Primary: #0D9488, Accent: #D97706, BG: #F0FDFA
190. Telemedicine Platform — Primary: #0891B2, Accent: #16A34A, BG: #F0FDFA
191. Testimonial & Social Proof Widget — Primary: #7C3AED, Accent: #F59E0B, BG: #FAF5FF
192. Ticketing / Box Office — Primary: #0F172A, Accent: #16A34A, BG: #020617

---

## 11. Chart Types — Complete Selection Guide

This section consolidates all 26 chart types from `charts.csv` into a practical selection guide.

### Why chart selection matters

Choosing the wrong chart type misleads users, hides insights, and creates accessibility failures. A pie chart with 12 slices is unreadable. A line chart without a time axis is meaningless. This guide tells you which chart for which data relationship, with thresholds and accessibility requirements.

---

### Chart Selection by Data Relationship

**Trend Over Time → Line Chart**
- Data has a time axis, user needs to observe rise/fall trends
- Don't use for: fewer than 4 data points (use stat card), more than 6 series (visual noise)
- Accessibility: use solid/dashed/dotted line styles + direct labels, never hue alone
- Volume: <1000 pts: SVG; ≥1000 pts: Canvas + downsampling; >10000: aggregate to intervals
- Interactive: Hover + Zoom

**Compare Categories → Bar Chart (Horizontal or Vertical)**
- Comparing discrete categories by magnitude, ranking is core insight
- Don't use for: categories > 15 (use table or search), time dimension (use line), proportions (use waffle/stacked)
- Color guidance: distinct colors per bar, same hue family for grouped bars, always sort descending
- Accessibility: direct category/value labels, group outlines or patterns, never color alone
- Interactive: Hover + Sort (focusable headers with Enter/Space)

**Part-to-Whole → Pie or Donut**
- ≤5 categories, one dominant segment vs rest, emphasis on visual proportion
- Don't use for: categories > 5, slice differences < 5% (indistinguishable), user needs precise values
- Max 6 slices; beyond that switch to stacked bar 100%
- Color: 5-6 max colors, contrasting palette, largest slice at 12 o'clock, always label with %
- Accessibility: direct labels and patterns, non-pie fallback available, never color alone
- Interactive: Hover + Drill (Enter/Space drills in, Back returns)

**Correlation / Distribution → Scatter Plot or Bubble Chart**
- Exploring relationship between two continuous variables, identifying clusters/outliers
- Don't use for: categorical variables (use grouped bar), fewer than 20 points, mobile-primary context
- Volume: <500 pts: SVG; 500–5000: Canvas at 0.6-0.8 opacity; >5000: hexbin or aggregate
- Color: gradient for color axis, bubble size for 3rd variable, opacity 0.6-0.8 for density
- Accessibility: marker shapes + direct group labels, color reinforces but doesn't sole-distinguish
- Interactive: Hover + Brush (labeled range inputs replace drag brushing)

**Heatmap / Intensity → Heat Map or Choropleth**
- Showing intensity/density across 2D grid, time-based patterns (activity by hour × day)
- Don't use for: fewer than 20 cells (use bar), user needs exact values, colorblind users without pattern fallback
- Volume: up to 10,000 cells efficiently, calendar heatmap: 365 cells max per SVG
- Color: cool (blue) to hot (red) gradient, divergent scale for ±data, always include numeric legend
- Accessibility: print values or symbols in cells, use texture/labels in addition to color
- Interactive: Hover + Zoom

**Geographic Data → Choropleth or Bubble Map**
- Data has regional/location dimension, spatial distribution is core insight
- Don't use for: regions with very different sizes (visual comparison misleading — use bar), mobile-primary
- Volume: <1000 regions: SVG; ≥1000: Canvas/WebGL (Deck.gl); global: tile-based
- Interactive: Pan + Zoom + Drill (arrow keys or labeled pan buttons, Enter drills in)

**Funnel / Flow → Funnel Chart or Sankey**
- Sequential multi-stage process, conversion/drop-off rates between stages
- Don't use for: stages aren't sequential, values don't decrease monotonically (use bar), fewer than 3 stages
- 3-8 stages optimal; beyond 8 group minor steps into 'Other'
- Color: single gradient start→end, show conversion % between stages, highlight biggest drop
- Accessibility: stage names and values visible, distinguish with text and boundaries not only gradient
- Interactive: Hover + Drill

**Performance vs Target → Gauge or Bullet Chart**
- Single KPI measured against defined target or threshold, dashboard summary
- Don't use for: no target exists, comparing multiple KPIs at once (use bullet chart grid)
- Single metric per gauge; for 3+ KPIs use bullet chart grid layout
- Color: performance red→yellow→green gradient, target marker line, threshold zones differentiated
- Accessibility: number and target text beside gauge, label threshold zones, red/yellow/green alone insufficient
- Interactive: Hover

**Time-Series Forecast → Line with Confidence Band**
- Historical data + model predictions, communicating uncertainty to non-technical stakeholders
- Don't use for: no historical baseline, prediction confidence too low, non-data-literate audience
- Historical window: 30-90 days for readability; forecast horizon ≤ 30% of visible x-axis range
- Color: actual solid #0080FF, forecast dashed #FF9500, confidence band 15% opacity fill same hue
- Accessibility: solid actual + dashed forecast lines, direct labels, named confidence range, hue alone insufficient
- Interactive: Hover + Toggle (buttons toggle actual/forecast, +/- zoom, Reset restores)

**Anomaly Detection → Line Chart with Highlights**
- Monitoring time-series for outliers, alerting users to unexpected spikes/dips
- Don't use for: anomalies are predefined categories (use bar with highlight), real-time without pause control
- Stream at ≤60fps with Canvas, batch: up to 10,000 pts, mark anomalies as separate data layer
- Color: normal #0080FF solid, anomaly marker #FF0000 circle+filled, alert band #FFF3CD background
- Accessibility: mark anomalies with distinct shape + text annotation + color, never color alone
- Interactive: Hover + Alert (alerts available in persistent list without hover)

**Hierarchical / Nested Data → Treemap**
- Showing size relationships within hierarchy, proportional structure overview (budget breakdown)
- Don't use for: hierarchy depth > 3 levels, user needs precise sibling value comparison
- Volume: <200 nodes: SVG; 200-1000: Canvas; >1000: paginate or pre-filter
- Color: parent nodes distinct hues, children lighter shades of same hue, 2-3px white separator borders
- Accessibility: label hierarchy nodes, use borders/patterns as well as hue, tree table is primary accessible view
- Interactive: Hover + Drilldown (Enter/Space drills or expands, Back collapses/returns)

**Flow / Process Data → Sankey Diagram**
- How quantities flow between nodes, multi-source multi-target distribution
- Don't use for: flow directions form loops (use network graph), fewer than 3 source-target pairs, mobile-primary
- Volume: <50 flows: SVG; ≥50: Canvas; >200 flows: aggregate minor flows into 'Other'
- Color: gradient from source to target, flow opacity 0.4-0.6, node labels always visible
- Accessibility: label source, target, value; use line style or node symbols in addition to gradient
- Interactive: Hover + Drilldown

**Cumulative Changes → Waterfall Chart**
- How individual positive/negative components add up to final total (P&L, budget variance)
- Don't use for: changes aren't additive, more than 12 bars, audience expects simple total
- 4-12 bars optimal; beyond 12 aggregate minor items into 'Other'
- Color: increases #4CAF50, decreases #F44336, start total #2196F3, end total #0D47A1, running total line dashed
- Accessibility: pair increase/decrease bars with signed values and directional icons, not red/green alone
- Interactive: Hover

**Multi-Variable Comparison → Radar / Spider Chart**
- Comparing multiple entities across same fixed set of attributes (product feature comparison)
- Don't use for: axes > 8, values need precise comparison (use grouped bar), audience unfamiliar with radar
- 2-3 datasets max per chart, 5-8 axes; beyond 8 switch to parallel coordinates
- Color: single dataset #0080FF at 20% fill, multiple distinct hues with 30% fill, full opacity border
- Accessibility: line styles, point shapes, direct series labels in addition to color
- Interactive: Hover + Toggle

**Stock / Trading OHLC → Candlestick Chart**
- Financial time-series with Open/High/Low/Close data, trading/investment context only
- Don't use for: non-financial audience, no OHLC data (use line chart), accessibility-first context
- Real-time: Canvas required. Historical: paginate by time range. Max 500 candles visible at once
- Color: bullish #26A69A, bearish #EF5350, volume bars 40% opacity below, body fill vs hollow for OHLC style
- Accessibility: filled vs hollow candles + OHLC text values, bullish/bearish meaning not color-dependent
- Interactive: Real-time + Hover + Zoom

**Relationship / Connection Data → Network Graph**
- Mapping connections between entities, network topology or social graph
- Don't use for: node count > 500 without clustering, user needs precise connection counts, mobile context
- Volume: ≤100 nodes: SVG; 101-500: Canvas; >500: must apply clustering/LOD before rendering
- Color: node types categorical colors, edges #90A4AE at 60% opacity, highlight path #F59E0B
- Accessibility: labeled node types, shapes, edge styles in addition to color, adjacency view is source of truth
- Interactive: Drilldown + Hover + Drag

**Distribution / Statistical → Box Plot**
- Showing spread, median, outliers of dataset, comparing distributions across multiple groups
- Don't use for: fewer than 20 data points per group, audience unfamiliar with statistical charts
- Any sample size; aggregated representation so rendering is excellent at any volume
- Color: box fill #BBDEFB, border #1976D2, median line #D32F2F bold, outlier dots #F44336
- Accessibility: label median, quartiles, whiskers, outliers directly; color not sole carrier
- Interactive: Hover

**Performance vs Target (Compact) → Bullet Chart**
- Dashboard with multiple KPIs side by side, space-constrained contexts
- Don't use for: single KPI with emphasis (use gauge), no defined target range, fewer than 3 KPIs
- Ideal for 3-10 bullet charts in a grid, scales to any count efficiently
- Color: qualitative ranges #FFCDD2/#FFF9C4/#C8E6C9 (bad/ok/good), performance bar #1976D2, target black 3px marker
- Accessibility: label every qualitative range and target with text, color supplementary
- Interactive: Hover

**Proportional / Percentage → Waffle Chart**
- Showing what fraction of whole is filled, percentage progress in visually engaging and accessible format
- Don't use for: more than 5 categories (use stacked bar), exact values matter over visual proportion, very tight space
- 10×10 grid standard (100 cells); for > 5 categories switch to stacked 100% bar
- 3-5 categories max, 2-3px gap between cells, each category distinct accessible color pair
- Accessibility: label each category and percentage, add patterns or symbols, filled-cell color alone insufficient
- Interactive: Hover

**Hierarchical Proportional → Sunburst Chart**
- Exploring nested proportions where both hierarchy and relative size matter (org spend breakdown)
- Don't use for: more than 3 hierarchy levels (outer rings unreadable), precision matters over overview, mobile
- Volume: <100 nodes: SVG; 100-500: Canvas; >500: filter to top N before rendering
- Color: center to outer darker to lighter hue, each level 15-20% lighter, contrasting border between sectors
- Accessibility: label hierarchy levels and segments, use boundaries/patterns as well as hue, indented list is primary
- Interactive: Drilldown + Hover (Enter/Space drills or expands, Back returns, focus reveals hover detail)

**Root Cause Analysis → Decomposition Tree**
- Decomposing a metric into contributing factors, AI-assisted analysis or BI drill-down
- Don't use for: no clear parent-child causal relationship, audience expects summary not exploration
- Up to 5 levels deep, limit visible nodes to 20 per level, lazy-load deeper levels
- Color: positive impact nodes #2563EB, negative impact nodes #EF4444, neutral connectors #94A3B8
- Accessibility: name each node and contribution, use shapes/connector styles in addition to color
- Interactive: Drill + Expand (Enter/Space drills and expands, Back collapses, dedicated expand/collapse buttons)

**3D Spatial Data → 3D Scatter / Surface Plot**
- Scientific/engineering context where Z-axis carries essential info not expressible in 2D
- Don't use for: 2D projection conveys same insight, mobile context, accessibility-required environments, standard business dashboards
- WebGL required. Deck.gl: up to 1M points. Three.js: LOD required beyond 50,000 pts
- Depth cues: lighting and shading. Z-axis: color gradient (cool → warm). Transparent overlapping: opacity 0.4
- Accessibility: labels, shapes, depth-independent cues; color and 3D position cannot be only carriers; mandatory 2D projection + data table + spatial summary
- Interactive: Rotate + Zoom + VR (rotate/pan buttons and +/- zoom replace pointer/VR manipulation)

**Real-Time Streaming → Streaming Area Chart**
- Live monitoring dashboards, IoT/ops data updating at ≥1 Hz, user needs current value at glance
- Don't use for: update frequency < 1/min (use periodic-refresh line chart), flashing content without reduced-motion support
- Canvas/WebGL required. Buffer last 60-300s of data. Downsample older data on scroll
- Color: current pulse #00FF00 (dark) or #0080FF (light), history fading opacity, grid dark background
- Accessibility: show current value and status text, use line styles or markers in addition to color
- Interactive: Real-time + Pause + Zoom (Pause/Resume button controls updates, focus reveals values)

**Sentiment / Emotion → Word Cloud with Sentiment**
- NLP output visualization, exploratory analysis of text corpus sentiment, frequency-weighted keyword overview
- Don't use for: precise values matter (word size inherently imprecise), screen-reader context, corpus < 50 items
- 50-5000 terms optimal. Beyond 5000: apply top-N filtering before render. Avoid on mobile
- Color: positive #22C55E, negative #EF4444, neutral #94A3B8, word size maps to frequency
- Accessibility: expose every term, count, and sentiment as text; size and color supplementary only
- Interactive: Hover + Filter (focus reveals word details, labeled controls filter with Space/Enter)

**Process Mining → Process Map / Graph**
- Analyzing event logs to visualize actual process flows, identifying bottlenecks and deviations
- Don't use for: no event log data, audience expects static flowchart (use diagram tool), node count > 100 without pre-filtering
- Volume: <30 nodes: SVG; 30-100: Canvas; >100: apply variant filtering (top 80% of cases) before rendering
- Color: happy path #10B981 thick line, deviations #F59E0B thin line, bottleneck nodes #EF4444 fill
- Accessibility: label nodes and paths, use shapes/line styles in addition to color, bottlenecks require text annotations
- Interactive: Drag + Node-Click (Move buttons replace drag, focus reveals node details, Enter activates node)

---

## 12. Animation Principles — Motion Design Reference

This section consolidates all 18 animation patterns from `motion.csv`.

### Core Principles

1. **Respect reduced motion** — check `prefers-reduced-motion: reduce` via `matchMedia` and render final state immediately. This is non-negotiable.
2. **Keep displacement small** — hover micro-interactions: under 2px for subtle, 4-8px for standard. Bigger reads as motion, not feedback.
3. **Use transform/opacity only** — these run on the compositor thread. Animating layout properties (width, height, margin, top, left) triggers reflow and jank.
4. **Use `will-change: transform`** on animated elements for smoother compositing — remove after scroll settles to free GPU memory.
5. **Kill animations on unmount** — tween/ timeline references must be killed in cleanup. SPA route changes leak tweens that keep running in the background.
6. **Pause offscreen/hidden** — use IntersectionObserver and `visibilitychange` to pause animations when their container is offscreen or the tab is hidden. This saves CPU on background tabs.
7. **Clean up timers** — auto-rotation timers must be cancellable, with all listeners removed on unmount.
8. **Asymmetric page transitions** — exit animation should resolve faster than entrance so back/forward navigation feels snappy.

### Animation by Type

**Hover Micro-interactions:**
- Subtle (150-200ms, power1.out): y: -1, opacity: 0.9 — button press feedback
- Standard (200-300ms, power2.out): y: -4, scale: 1.02, boxShadow lift — card hover
- Complex (300-500ms, elastic.out): magnetic effect, cursor follow — focal elements only (1-2 per screen)

**Scroll Reveal:**
- Subtle (300-400ms, power1.out): fade in, y: 12px — gentle content appearance
- Standard (400-600ms, power2.out, stagger 0.08): slide up, staggered section reveal
- Complex (scrub-driven, pinned): scrollytelling — pinning, scrubbed timeline, parallax layers

**Stagger Lists:**
- Subtle (250-350ms, power1.out, stagger 0.03): list items fade and rise gently
- Standard (300-450ms, back.out(1.4), stagger 0.06): grid/bento cards with natural wave stagger
- Complex (400-700ms, expo.out, SplitText): text reveal with character split — headlines only (under 8 words)

**Page Transitions:**
- Subtle (200-300ms, power1.inOut): fade between routes, preload destination before exit finishes
- Standard (400-600ms, power2.inOut): slide/overlay wipe, keep overlay at layout root
- Complex (500-800ms, expo.inOut, Flip plugin): shared element hero transition — one element pair per navigation

**Parallax Scroll:**
- Subtle (linear scrub): single background layer, yPercent 5-15 — small depth
- Standard (linear scrub, multiple layers): multi-layer depth, layer speed varies (background slowest, foreground fastest)

**Loading / Skeleton:**
- Shimmer (1200-1600ms loop, sine.inOut): gradient background-position sweep — reads as 'loading' clearly
- Morphing loader (800-1200ms loop, power1.inOut): staggered dots, pause when offscreen/hidden, kill on unmount

**Carousel / Auto-Rotation:**
- Full pattern: one cancellable timer, pause on focus/hover/offscreen/hidden, reduced motion stops rotation and renders active slide as final state, all listeners cleaned up on unmount

### GSAP Integration Notes

- Register plugins once: `gsap.registerPlugin(ScrollTrigger, SplitText, Flip)`
- Use `gsap.matchMedia('(prefers-reduced-motion: reduce)')` to wrap motion and render final state for reduced-motion users
- Use `gsap.quickTo(el, 'y')` for cards with many hover targets to avoid re-creating tweens
- Use `useGSAP(() => { ... }, { scope: containerRef })` from @gsap/react for auto-cleanup in React
- `toggleActions: 'play none none reverse'` avoids re-triggering on every scroll direction change
- `grid: 'auto'` lets GSAP infer rows/columns from CSS grid for natural wave stagger
- `from: 'center'` for bento-grid layout draws eye inward first
- `scroller: false` and `markers: false` in production — markers is dev-only

---

## 13. Landing Page Patterns — Full Catalog

This section consolidates all 36 landing page patterns from `landing.csv`.

### Pattern Catalog

**1. Hero + Features + CTA**
- Structure: Hero (headline/image) > Value prop > Key features (3-5) > CTA > Footer
- CTA: Hero (sticky) + Bottom
- Color: Hero brand primary/vibrant, features card bg #FAFAFA, CTA contrasting accent
- Effects: Hero parallax, feature card hover lift, CTA glow on hover
- Conversion: Deep CTA placement. Verify CTA text contrast ≥4.5:1 (7:1 only for AAA explicit target). Disable parallax under reduced motion.
- ID: `hero-features-cta`

**2. Hero + Testimonials + CTA**
- Structure: Hero > Problem > Solution > Testimonials carousel > CTA
- CTA: Hero (sticky) + Post-testimonials
- Color: Hero brand, testimonials light bg #F5F5F5, quotes italic muted #666, CTA vibrant
- Effects: Carousel slide animations, quote marks animations, avatar fade-in
- Conversion: Social proof before CTA. Verified testimonials with photo, name, role. CTA after social proof. Carousel: previous/next buttons, keyboard controls, pause on focus/hover/reduced motion, announce slide position.
- ID: `hero-testimonials-cta`

**3. Product Demo + Features**
- Structure: Hero > Product video/mockup (center) > Feature breakdown > Comparison (optional) > CTA
- CTA: Video center + CTA right/bottom
- Use interactive demo only when it explains value better than static media. Provide captions, transcript, play/pause, non-video fallback; don't autoplay under reduced motion. Pause media when offscreen/hidden.
- ID: `product-demo-features`

**4. Minimal Single Column**
- Structure: Hero headline > Short description > Benefit bullets (3 max) > CTA > Footer
- CTA: Center, large button
- Minimalist: Brand + white + accent. Verify CTA text contrast ≥4.5:1 minimum.
- Effects: Minimal hover, smooth scroll, CTA scale on hover (subtle)
- Conversion: Single CTA focus, large typography, lots of whitespace, no nav clutter, mobile-first
- ID: `minimal-single-column`

**5. Funnel (3-Step Conversion)**
- Structure: Hero > Step 1 (problem) > Step 2 (solution) > Step 3 (action) > CTA progression
- CTA: Each step mini-CTA, final main CTA
- Color: Step 1 red/problem, Step 2 orange/process, Step 3 green/solution, CTA brand color
- Effects: Step number animations, progress bar fill, smooth scroll transitions
- Conversion: Progressive disclosure, show only essential per step, progress indicators, multiple CTAs
- ID: `funnel-3-step-conversion`

**6. Comparison Table + CTA**
- Structure: Hero > Problem intro > Comparison table (product vs competitors) > Pricing (optional) > CTA
- CTA: Table right column, below table
- Color: Alternating rows white/light grey, your product highlighted #FFFACD or green, text dark
- Effects: Row hover highlight, price toggle animations, checkmark animations
- Conversion: Show unique value, highlight your row, include 'free trial' in pricing row
- ID: `comparison-table-cta`

**7. Lead Magnet + Form**
- Structure: Hero (benefit headline) > Lead magnet preview > Form (minimal fields) > CTA submit
- CTA: Submit button
- Color: Lead magnet professional, form clean white, inputs light border #CCCCCC, CTA brand color
- Effects: Form focus animations, input validation animations, success confirmation
- Conversion: Ask only for necessary info, preview lead magnet value, show submission progress
- ID: `lead-magnet-form`

**8. Pricing Page + CTA**
- Structure: Hero (pricing headline) > Price comparison cards > Feature comparison table > FAQ > Final CTA
- CTA: Each card button, sticky nav CTA
- Color: Free grey, Starter blue, Pro green/gold, Enterprise dark; cards 1px border, shadow
- Effects: Price toggle monthly/yearly animation, card comparison highlight, FAQ accordion
- Conversion: Highlight intended audience plan, show actual annual savings transparently, FAQs address concerns
- ID: `pricing-page-cta`

**9. Video-First Hero**
- Structure: Hero with video background > Key features overlay > Benefits > CTA
- CTA: Overlay on video (center/bottom) + Bottom section
- Use video only when it demonstrates value better than static media. Add captions, compress for performance, visible pause control; static poster when reduced motion requested. Pause when offscreen/hidden.
- ID: `video-first-hero`

**10. Scroll-Triggered Storytelling**
- Structure: Intro hook > Chapter 1 (problem) > Chapter 2 (journey) > Chapter 3 (solution) > Climax CTA
- CTA: End of each chapter (mini) + Final climax CTA
- Progressive reveal, distinct color per chapter, building intensity
- Effects: ScrollTrigger animations, parallax layers, progressive disclosure, chapter transitions
- Keep narrative understandable without scroll effects, progress indicator, mobile simplify animations, keep DOM reading order complete, disable parallax/scroll-scrub under reduced motion.
- ID: `scroll-triggered-storytelling`

**11. AI Personalization Landing**
- Structure: Dynamic hero (personalized) > Relevant features > Tailored testimonials > Smart CTA
- CTA: Context-aware placement based on user segment
- Adaptive based on user data, A/B test color variations per segment
- Effects: Dynamic content swap, fade transitions, personalized recommendations
- Validate personalization with consent-aware analytics, requires analytics integration, fallback for new users
- ID: `ai-personalization-landing`

**12. Waitlist/Coming Soon**
- Structure: Hero with countdown > Product teaser/preview > Email capture form > Social proof (waitlist count)
- CTA: Email form prominent (above fold) + Sticky form on scroll
- Anticipation: Dark + accent highlights, countdown brand color, urgency indicators
- Effects: Countdown timer animation, email validation feedback, success confetti, social share buttons
- Explain early-access benefits without fabricated scarcity. Show waitlist count only when current, verified, dated. Provide static launch deadline. Pause decorative countdown motion offscreen/hidden, render final timer state under reduced motion. Form and referral actions keyboard operable.
- ID: `waitlist-coming-soon`

**13. Comparison Table Focus**
- Structure: Hero (problem) > Comparison matrix (you vs competitors) > Feature deep-dive > Winner CTA
- CTA: After comparison table (highlighted row) + Bottom
- Your product column highlighted (accent bg or green), competitors neutral, checkmarks green
- Effects: Row hover highlight, checkmark animations, sticky comparison header
- Show value vs competitors, measure with product-specific analytics, be factual, include pricing if favorable
- ID: `comparison-table-focus`

**14. Pricing-Focused Landing**
- Structure: Hero (value prop) > Pricing cards (3 tiers) > Feature comparison > FAQ > Final CTA
- CTA: Each pricing card + Sticky CTA in nav + Bottom
- Popular plan highlighted (brand color border/bg), Free grey, Enterprise dark/premium
- Effects: Price toggle monthly/annual animation, card hover lift, FAQ accordion smooth open
- Show actual monthly and annual totals and savings transparently, explain plan differences, address objections in FAQ
- ID: `pricing-focused-landing`

**15. App Store Style Landing**
- Structure: Hero with device mockup > Screenshots carousel > Features with icons > Reviews/ratings > Download CTAs
- CTA: Download buttons prominent (App Store + Play Store) throughout
- Dark/light matching app store feel, star ratings gold, screenshots with device frames
- Effects: Device mockup rotations, screenshot slider, star rating animations, download button pulse
- Show real screenshots and only current verified ratings. Platform-specific CTAs, buttons + keyboard controls in addition to swipe, pause auto-rotation. Stop on focus, hover, offscreen/hidden, reduced motion; render selected screenshot as static final state.
- ID: `app-store-style-landing`

**16. FAQ/Documentation Landing**
- Structure: Hero with search bar > Popular categories > FAQ accordion > Contact/support CTA
- CTA: Search bar prominent + Contact CTA for unresolved
- Clean, high readability, minimal color, category icons brand color, success green for resolved
- Effects: Search autocomplete, smooth accordion open/close, category hover, helpful feedback buttons
- Reduce support tickets, track search analytics, show related articles, contact escalation path
- ID: `faq-documentation-landing`

**17. Immersive/Interactive Experience**
- Structure: Full-screen interactive element > Guided product tour > Key benefits revealed > CTA after completion
- CTA: After interaction complete + Skip option for impatient users
- Immersive experience colors, dark background for focus, highlight interactive elements
- Effects: WebGL, 3D interactions, gamification, progress indicators, reward animations
- Measure engagement for specific audience/device mix, performance trade-off, provide skip option, mobile fallback essential. Provide skip, keyboard, reduced-motion, non-3D fallback paths. Pause animation offscreen/hidden, preserve completed final state under reduced motion.
- ID: `immersive-interactive-experience`

**18. Event/Conference Landing**
- Structure: Hero (date/location/countdown) > Speakers grid > Agenda/schedule > Sponsors > Register CTA
- CTA: Register CTA sticky + After speakers + Bottom
- Urgency colors (countdown), event branding, speaker cards professional, sponsor logos neutral
- Effects: Countdown timer, speaker hover cards with bio, agenda tabs, early bird countdown
- Early bird pricing with deadline, social proof (past attendees), speaker credibility, multi-ticket discounts. Expose exact deadline as text, pause decorative countdown motion offscreen/hidden, show static final state under reduced motion.
- ID: `event-conference-landing`

**19. Product Review/Ratings Focused**
- Structure: Hero (product + aggregate rating) > Rating breakdown > Individual reviews > Buy/CTA
- CTA: After reviews summary + Buy button alongside reviews
- Trust colors, star ratings gold, verified badge green, review sentiment colors
- Effects: Star fill animations, review filtering, helpful vote interactions, photo lightbox
- User-generated content builds trust, show verified purchases, filter by rating, respond to negative reviews
- ID: `product-review-ratings-focused`

**20. Community/Forum Landing**
- Structure: Hero (community value prop) > Popular topics/categories > Active members showcase > Join CTA
- CTA: Join button prominent + After member showcase
- Warm, welcoming, member photos add humanity, topic badges brand colors, activity indicators green
- Effects: Member avatars animation, activity feed live updates, topic hover previews, join success celebration
- Preview real community value, simplify onboarding. Show member/activity counts only when current, verified, dated; label activity as live only when backed by active real-time source. Provide pause/update-frequency controls for moving feeds, stop work offscreen/hidden, keep static final state under reduced motion.
- ID: `community-forum-landing`

**21. Before-After Transformation**
- Structure: Hero (problem state) > Transformation slider/comparison > How it works > Results CTA
- CTA: After transformation reveal + Bottom
- Contrast: muted/grey (before) vs vibrant/colorful (after), success green for results
- Effects: Slider comparison interaction, before/after reveal animations, result counters, testimonial videos
- Visual proof of value, measure outcome with product-specific analytics, real results, specific metrics, guarantee offer. Provide arrow buttons and keyboard steps so dragging not required. Arrow buttons and keyboard steps expose same final before/after positions; reduced motion removes reveal animation.
- ID: `before-after-transformation`

**22. Marketplace / Directory**
- Structure: Hero (Search focused) > Categories > Featured Listings > Trust/Safety > CTA (Become a host/seller)
- CTA: Hero Search Bar + Navbar 'List your item'
- Search high contrast, categories visual icons, trust blue/green
- Effects: Search autocomplete animation, map hover pins, card carousel
- Search is primary CTA, reduce friction with useful suggestions. For featured-listing carousels: previous/next + play/pause buttons, full keyboard access, single-pointer alternative to swiping; stop rotation on focus, hover, offscreen/hidden, reduced motion; render selected listing as static final state.
- ID: `marketplace-directory`

**23. Newsletter / Content First**
- Structure: Hero (Value Prop + Form) > Recent Issues/Archives > Social Proof (Subscriber count) > About Author
- CTA: Hero inline form + Sticky header form
- Minimalist, paper-like background, text focus, accent color for Subscribe
- Effects: Text highlight animations, typewriter effect, subtle fade-in
- Keep form to fields actually required, link to sample issue. Show subscriber count only when current, verified, dated; otherwise use qualitative social proof.
- ID: `newsletter-content-first`

**24. Webinar Registration**
- Structure: Hero (Topic + Timer + Form) > What you'll learn > Speaker Bio > Urgency/Bonuses > Form (again)
- CTA: Hero (Right side form) + Bottom anchor
- Urgency red/orange, professional blue/navy, form high contrast white
- Effects: Countdown timer, speaker avatar float, urgent ticker
- State event time and timezone in text. Claim limited seats or live status only when current capacity or stream state verified and timestamped. Provide pause/hide controls for urgency ticker, stop it offscreen/hidden, keep controls keyboard operable, render static final state under reduced motion.
- ID: `webinar-registration`

**25. Enterprise Gateway**
- Structure: Hero (Video/Mission) > Solutions by Industry > Solutions by Role > Client Logos > Contact Sales
- CTA: Contact Sales (Primary) + Login (Secondary)
- Corporate navy/grey, high integrity, conservative accents
- Effects: Slow video background, logo carousel, tab switching for industries
- Path selection (I am a...), mega menu navigation, trust signals prominent. Provide pause/stop for video and rotating logos; stop on focus and reduced motion. Logo carousel controls keyboard operable; pause moving media offscreen/hidden, render static final state under reduced motion.
- ID: `enterprise-gateway`

**26. Portfolio Grid**
- Structure: Hero (Name/Role) > Project Grid (Masonry) > About/Philosophy > Contact
- CTA: Project Card Hover + Footer Contact
- Neutral background (let work shine), text black/white, accent minimal
- Effects: Image lazy load reveal, hover overlay info, lightbox view
- Visuals first, filter by category, fast loading essential
- ID: `portfolio-grid`

**27. Horizontal Scroll Journey**
- Structure: Intro (Vertical) > The Journey (Horizontal Track) > Detail Reveal > Vertical Footer
- CTA: Floating Sticky CTA or End of Horizontal Track
- Continuous palette transition, chapter colors, progress bar #000000
- Effects: Scroll-jacking (careful), parallax layers, horizontal slide, progress indicator
- Immersive product discovery, high engagement, keep navigation visible. Preserve normal vertical navigation path, disable scroll-jacking under reduced motion. Pause effects offscreen/hidden, render every chapter in final vertical reading state under reduced motion.
- ID: `horizontal-scroll-journey`

**28. Bento Grid Showcase**
- Structure: Hero > Bento Grid (Key Features) > Detail Cards > Tech Specs > CTA
- CTA: Floating Action Button or Bottom of Grid
- Card backgrounds #F5F5F7 or Glass, icons vibrant brand colors, text dark
- Effects: Hover card scale (1.02), video inside cards, tilt effect, staggered reveal
- Scannable value props, high information density without clutter, mobile stack. Keep cards usable without hover, suppress tilt/stagger/video motion under reduced motion. Pause card media offscreen/hidden, render cards in final readable state under reduced motion.
- ID: `bento-grid-showcase`

**29. Interactive 3D Configurator**
- Structure: Hero (Configurator) > Feature Highlight (synced) > Price/Specs > Purchase
- CTA: Inside Configurator UI + Sticky Bottom Bar
- Neutral studio background, product realistic materials, UI minimal overlay
- Effects: Real-time rendering, material swap animation, camera rotate/zoom, light reflection
- Let users inspect product details before purchase. Provide buttons and keyboard controls for rotate/zoom plus 2D/specification fallback. Named rotate/zoom buttons and keyboard controls replace drag gestures; pause rendering offscreen/hidden, preserve chosen configuration as reduced-motion final state.
- ID: `interactive-3d-configurator`

**30. AI-Driven Dynamic Landing**
- Structure: Prompt/Input Hero > Generated Result Preview > How it Works > Value Prop
- CTA: Input Field (Hero) + 'Try it' Buttons
- Adaptive to user input, dark mode for compute feel, neon accents
- Effects: Typing text effects, shimmering generation loaders, morphing layouts
- Immediate value demonstration, 'Show, don't tell', low friction start. Disable typing, shimmer, morphing effects when reduced motion requested. Pause loaders offscreen/hidden, render generated content in final state under reduced motion.
- ID: `ai-driven-dynamic-landing`

**31. Feature-Rich Showcase**
- Structure: Hero (value prop) > Feature grid/cards (4-6) > Use cases or benefits > Social proof or logos > CTA
- CTA: Hero (sticky) + After features + Bottom
- Brand primary + card bg #FAFAFA, feature icons accent, CTA contrasting
- Effects: Feature card hover lift, scroll reveal, icon micro-interactions
- Clear feature hierarchy, one key message per card, strong CTA repetition
- ID: `feature-rich-showcase`

**32. Hero-Centric Design**
- Structure: Full-bleed Hero (headline + visual) > Single value prop strip > Key benefit or proof > Primary CTA
- CTA: Hero dominant (center/bottom) + Sticky nav CTA
- Hero high-impact visual, minimal text. Verify CTA label text against button fill at 4.5:1 minimum (7:1 only for explicit AAA normal-text target)
- Effects: Hero parallax or video, CTA pulse on scroll, minimal chrome
- One primary CTA, let hero dominate initial viewport without hiding next content cue. Use static hero and non-pulsing CTA when reduced motion requested; provide video controls. Pause hero media offscreen/hidden, keep final hero message and CTA static under reduced motion.
- ID: `hero-centric-design`

**33. Trust & Authority + Conversion**
- Structure: Hero (mission/credibility) > Proof (logos, certs, stats) > Solution overview > Clear CTA path
- CTA: Contact Sales / Get Quote (primary) + Nav
- Navy/grey corporate, trust blue, accent for CTA only
- Effects: Logo carousel, stat counters, testimonial strip
- Security badges, case studies, transparent pricing, low-friction form. Provide pause/stop and stop logo carousel on focus, hover, reduced motion. Previous/next controls provide keyboard equivalent; pause offscreen/hidden, render static logo set under reduced motion.
- ID: `trust-authority-conversion`

**34. Real-Time / Operations Landing**
- Structure: Hero (product + live preview or status) > Key metrics/indicators > How it works > CTA (Start trial / Contact)
- CTA: Primary CTA in nav + After metrics
- Dark or neutral, status colors (green/amber/red), data-dense but scannable
- Effects: Live data ticker, status pulse, minimal decoration
- Offer demo or sandbox, show trust signals. Label telemetry as live only when backed by current source, with update time and stale state. Provide pause/hide or update-frequency controls for tickers/previews, stop offscreen/hidden work, support keyboard controls, render static final snapshot under reduced motion.
- ID: `real-time-operations-landing`

---

## 14. Icon System — Complete Library Reference

This section consolidates all 101 icons from `icons.csv`.

### Icon Library: Phosphor (Primary) + Heroicons (Fallback)

**Philosophy:** Context is chosen by use:
- If decorative beside visible text → set `aria-hidden="true"`
- If meaningful without equivalent visible text → provide a text alternative
- If inside an interactive control → give the control an accessible name and expose applicable state (e.g., `aria-pressed`, `aria-expanded`)

**Semantic precision:** Prefer the most semantically precise Phosphor icon, even if outside this curated subset. Use Heroicons only as a consistent fallback. Keep one visual family per surface.

### Icon Categories

**Navigation (9 icons):**
| Icon | Keywords | Usage |
|------|----------|-------|
| List | hamburger menu, navigation toggle, bars | Mobile nav drawer toggle sidebar |
| ArrowLeft | back, previous, return, navigate | Back button, breadcrumb |
| ArrowRight | next, forward, continue, navigate | Forward button, next step CTA |
| CaretDown | dropdown, expand, accordion, select | Dropdown toggle, accordion header |
| CaretUp | collapse, close, accordion, minimize | Accordion collapse |
| House | homepage, main, dashboard, start | Home navigation |
| X | close, cancel, dismiss, remove, exit | Modal close, dismiss button |
| ArrowSquareOut | open new tab, external link | External link indicator |
| Sidebar | panel, drawer, navigation menu | Sidebar panel |

**Action (10 icons):**
| Icon | Keywords | Usage |
|------|----------|-------|
| Plus | add, create, new, insert | Add button, create new item |
| Minus | remove, subtract, decrease, delete | Remove item, quantity decrease |
| Trash | delete, remove, discard, bin | Delete action, destructive |
| PencilSimple | pencil, modify, change, update | Edit button, modify content |
| FloppyDisk | disk, store, persist, save | Save button, persist changes |
| DownloadSimple | export, save file, download | Download file, export |
| UploadSimple | import, file, attach, upload | Upload file, import |
| Copy | duplicate, clipboard, paste | Copy to clipboard |
| Share | social, distribute, send | Share button, social |
| MagnifyingGlass | find, lookup, filter, query | Search input bar |

**Additional Actions (3 icons):**
| Icon | Keywords | Usage |
|------|----------|-------|
| Funnel | sort, refine, narrow options | Filter dropdown, sort |
| Gear | gear, cog, preferences, config | Settings page, configuration |

**Status (8 icons):**
| Icon | Keywords | Usage |
|------|----------|-------|
| Check | success, done, complete, verified | Success state, checkmark |
| CheckCircle | success, verified, approved, complete | Success badge, verified |
| XCircle | error, failed, cancel, rejected | Error state, failed |
| Warning | warning, caution, attention, danger | Warning message, caution |
| WarningCircle | info, notice, information, help | Info notice, alert |
| Info | information, help, tooltip, details | Information tooltip, help |
| CircleNotch | loading, spinner, processing, wait | Loading state, spinner |
| Clock | time, schedule, pending, wait | Pending, time, schedule |

**Communication (5 icons):**
| Icon | Keywords | Usage |
|------|----------|-------|
| Envelope | email, message, inbox, letter | Email, contact, inbox |
| ChatCircle | chat, comment, bubble, conversation | Chat, comment, message |
| Phone | call, mobile, telephone, contact | Phone, contact, call |
| PaperPlaneTilt | submit, dispatch, message, airplane | Send message, submit |
| Bell | notification, alert, ring, reminder | Notification, bell, alert |

**User (5 icons):**
| Icon | Keywords | Usage |
|------|----------|-------|
| User | profile, account, person, avatar | User profile, account |
| Users | team, group, people, members | Team, group, members |
| UserPlus | add, invite, new member | Add user, invite |
| SignIn | signin, authenticate, enter | Login, signin |
| SignOut | signout, exit, leave, logout | Logout, signout |

**Media (7 icons):**
| Icon | Keywords | Usage |
|------|----------|-------|
| Image | photo, picture, gallery, thumbnail | Image, photo, gallery |
| Video | movie, film, play, record | Video player, media |
| Play | start, video, audio, media | Play button, video, audio |
| Pause | stop, halt, video, audio | Pause button, media |
| SpeakerHigh | sound, audio, speaker, music | Volume, audio, sound |
| Microphone | microphone, record, voice, audio | Microphone, voice record |
| Camera | photo, capture, snapshot, picture | Camera, photo capture |

**Commerce (6 icons):**
| Icon | Keywords | Usage |
|------|----------|-------|
| ShoppingCart | cart, checkout, basket, buy | Shopping cart, e-commerce |
| ShoppingBag | purchase, buy, store, bag | Shopping bag, purchase |
| CreditCard | payment, card, checkout, stripe | Payment, credit card |
| CurrencyDollar | money, price, currency, cost | Price, money, currency |
| Tag | label, price, discount, sale | Price tag, label |
| Gift | present, reward, bonus, offer | Gift, reward, offer |

**Data (6 icons):**
| Icon | Keywords | Usage |
|------|----------|-------|
| ChartBar | analytics, statistics, graph, metrics | Bar chart, analytics |
| ChartPie | statistics, distribution, breakdown | Pie chart, distribution |
| TrendUp | growth, increase, positive trend | Growth trend, positive |
| TrendDown | decline, decrease, negative trend | Decline trend, negative |
| Pulse | activity, heartbeat, monitor, live | Activity monitor, pulse |
| Database | storage, server, data, backend | Database, storage |

**Files (7 icons):**
| Icon | Keywords | Usage |
|------|----------|-------|
| File | document, page, paper, doc | File, document |
| FileText | document, text, page, article | Text document, article |
| Folder | directory, organize, group files | Folder, directory |
| FolderOpen | expanded, browse, files, view | Open folder, browse |
| Paperclip | attachment, attach, file, link | Attachment, paperclip |
| Link | url, hyperlink, chain, connect | Link, URL, hyperlink |
| Clipboard | paste, copy, buffer, notes | Clipboard, paste |

**Layout (6 icons):**
| Icon | Keywords | Usage |
|------|----------|-------|
| GridFour | tiles, gallery, layout, dashboard | Grid layout, gallery |
| ListBullets | rows, table, lines, items | List view, rows |
| Columns | layout, split, dual, sidebar | Column layout, split |
| ArrowsOut | fullscreen, expand, enlarge, zoom | Fullscreen, maximize |
| ArrowsIn | reduce, shrink, collapse, exit | Minimize, reduce |

**Social (6 icons):**
| Icon | Keywords | Usage |
|------|----------|-------|
| Heart | like, love, favorite, wishlist | Like, favorite, love |
| Star | rating, review, favorite, bookmark | Star rating, favorite |
| ThumbsUp | like, approve, agree, positive | Like, approve, thumb |
| ThumbsDown | dislike, disapprove, disagree, negative | Dislike, disapprove |
| Bookmark | save, later, favorite, mark | Bookmark, save |
| Flag | report, mark, important, highlight | Flag, report |

**Device (5 icons):**
| Icon | Keywords | Usage |
|------|----------|-------|
| DeviceMobile | mobile, phone, device, touch | Mobile, smartphone |
| DeviceTablet | ipad, device, touch, screen | Tablet, device |
| Monitor | desktop, screen, computer, display | Desktop, monitor |
| Laptop | notebook, computer, portable, device | Laptop, computer |
| Printer | print, document, output, paper | Printer, print |

**Security (6 icons):**
| Icon | Keywords | Usage |
|------|----------|-------|
| Lock | secure, password, protected, private | Lock, secure |
| LockOpen | open, access, unsecure, public | Unlock, open |
| Shield | protection, security, safe, guard | Shield, protection |
| Key | password, access, unlock, login | Key, password |
| Eye | view, show, visible, password | Show password, view |
| EyeSlash | hide, invisible, password, hidden | Hide password |

**Location (4 icons):**
| Icon | Keywords | Usage |
|------|----------|-------|
| MapPin | location, marker, place, address | Location pin, marker |
| MapTrifold | map, directions, navigate, geography, location | Map, directions |
| Compass | compass, direction, pointer, arrow | Navigation, compass |
| Globe | world, international, global, web | Globe, world |

**Time (4 icons):**
| Icon | Keywords | Usage |
|------|----------|-------|
| Calendar | date, schedule, event, appointment | Calendar, date |
| ArrowsClockwise | reload, sync, update, refresh | Refresh, reload |
| ArrowCounterClockwise | undo, back, revert, history | Undo, revert |
| ArrowClockwise | redo, forward, repeat, history | Redo, forward |

**Development (4 icons):**
| Icon | Keywords | Usage |
|------|----------|-------|
| Code | develop, programming, syntax, html | Code, development |
| Terminal | console, cli, command, shell | Terminal, console |
| GitBranch | version control, branch, merge | Git branch |
| GithubLogo | repository, code, open source | GitHub repository |

**Style Config Systems (5 icon systems):**

These are meta-icon definitions — they define how icons should be styled for specific brand aesthetics, not individual icon shapes.

| System | Style | Color | Weight | Key Rule |
|--------|-------|-------|--------|----------|
| Bold Typography | Editorial mono label, weight regular, size 20-32 | Accent #FF3D00 | Regular | Icons MUST be paired with Mono-stack text label (JetBrains Mono). Standalone icons only for standard nav (e.g., Back arrow). |
| Cyberpunk | Neon, glow, HUD, angular, dark | Accent #00FF88 (Matrix Green) | Regular | Wrap every icon in View with shadowColor: accent / shadowOpacity: 0.6 / shadowRadius: 8 for neon glow. borderRadius: 0 on wrapper. Always pair with data label in JetBrains Mono. |
| Academia | Brass, ornate, thin, scholarly, warm muted | Brass #C9A962 | Thin | No sharp geometric or tech-inspired icons. Prefer book, scroll, key, quill-type metaphors. Wrap in circular View with 1px brass border. Avoid neon or saturated colored icons. All icon-only nav must have accessibilityLabel. |
| Web3 Bitcoin | Neon orange, holographic, blurview, glow, fintech | Bitcoin Orange #F7931A | Regular | Wrap icons in circular BlurView (intensity: 20) with 1px borderColor: #F7931A border (Holographic Node effect). shadowColor: #F7931A / shadowOpacity: 0.4 / shadowRadius: 8. Prefer finance/data icons (TrendUp, Wallet, Shield, Layers). All data icons use JetBrains Mono label. |

---

## 15. Product Type → Style + Landing Pattern Mapping

This section maps all 192 product types from `products.csv` to their recommended style, secondary style, landing page pattern, dashboard style (if applicable), and key considerations.

**How to use:** Find your product type, follow the recommendations. The "Key Considerations" column tells you what matters most for that product type — use this to prioritize design decisions.

### Product Type Reference (condensed)

| # | Product Type | Primary Style | Secondary Styles | Landing Pattern | Key Considerations |
|---|-------------|---------------|------------------|-----------------|-------------------|
| 1 | SaaS (General) | Glassmorphism + Flat Design | Soft UI Evolution, Minimalism & Swiss Style | Hero + Features + CTA | Balance modern feel with clarity. Focus on CTAs. |
| 2 | Micro SaaS | Flat Design + Vibrant & Block-based | Motion-Driven, Micro-interactions | Minimal & Direct + Demo | Keep simple, show product quickly. Speed is key. |
| 3 | E-commerce | Vibrant & Block-based | Aurora UI, Motion-Driven | Feature-Rich Showcase | Engagement & conversions. High visual hierarchy. |
| 4 | E-commerce Luxury | Liquid Glass + Glassmorphism | 3D & Hyperrealism, Aurora UI | Feature-Rich Showcase | Elegance & sophistication. Premium materials. |
| 5 | B2B Service | Accessible & Ethical + Minimalism & Swiss Style | Bento Box Grid, Micro-interactions | Feature-Rich Showcase | Credibility essential. Clear ROI messaging. |
| 6 | Financial Dashboard | Dark Mode (OLED) + Data-Dense Dashboard | Minimalism & Swiss Style, Accessible & Ethical | N/A - Dashboard focused | High contrast, real-time updates, accuracy paramount. |
| 7 | Analytics Dashboard | Data-Dense Dashboard + Heat Map | Minimalism & Swiss Style, Dark Mode (OLED) | N/A - Analytics focused | Clarity > aesthetics. Color-coded data priority. |
| 8 | Healthcare App | Neumorphism + Accessible & Ethical | Soft UI Evolution, Claymorphism | Social Proof-Focused | Accessibility mandatory. Calming aesthetic. |
| 9 | Educational App | Claymorphism + Micro-interactions | Vibrant & Block-based, Flat Design | Storytelling-Driven | Engagement & ease of use. Age-appropriate design. |
| 10 | Creative Agency | Brutalism + Motion-Driven | Retro-Futurism, Editorial Grid/Magazine | Storytelling-Driven | Differentiation key. Wow-factor necessary. |
| 11 | Portfolio/Personal | Motion-Driven + Minimalism & Swiss Style | Brutalism, Aurora UI | Storytelling-Driven | Showcase work. Personality shine through. |
| 12 | Gaming | 3D & Hyperrealism + Retro-Futurism | Motion-Driven, Vibrant & Block-based | Feature-Rich Showcase | Immersion priority. Performance critical. |
| 13 | Government/Public Service | Accessible & Ethical + Minimalism & Swiss Style | Flat Design, Inclusive Design | Minimal & Direct | WCAG AAA mandatory. Trust paramount. |
| 14 | Fintech/Crypto | Glassmorphism + Dark Mode (OLED) | Retro-Futurism, Motion-Driven | Conversion-Optimized | Security perception. Real-time data critical. |
| 15 | Social Media App | Vibrant & Block-based + Motion-Driven | Aurora UI, Micro-interactions | Feature-Rich Showcase | Engagement & retention. Addictive design ethics. |
| 16 | Productivity Tool | Flat Design + Micro-interactions | Minimalism & Swiss Style, Soft UI Evolution | Interactive Product Demo | Ease of use. Speed & efficiency focus. |
| 17 | Design System/Component Library | Minimalism & Swiss Style + Accessible & Ethical | Flat Design, Zero Interface | Feature-Rich Showcase | Consistency. Developer-first approach. |
| 18 | AI/Chatbot Platform | AI-Native UI + Minimalism & Swiss Style | Zero Interface, Glassmorphism | Interactive Product Demo | Conversational UI. Streaming text. Context awareness. Minimal chrome. |
| 19 | NFT/Web3 Platform | Cyberpunk UI + Glassmorphism | Aurora UI, 3D & Hyperrealism | Feature-Rich Showcase | Wallet integration. Transaction feedback. Gas fees display. Dark mode essential. |
| 20 | Creator Economy Platform | Vibrant & Block-based + Bento Box Grid | Motion-Driven, Aurora UI | Social Proof-Focused | Creator profiles. Monetization display. Engagement metrics. Social proof. |
| 21 | Remote Work/Collaboration Tool | Soft UI Evolution + Minimalism & Swiss Style | Glassmorphism, Micro-interactions | Feature-Rich Showcase | Real-time collaboration. Status indicators. Video integration. Notification management. |
| 22 | Mental Health App | Neumorphism + Accessible & Ethical | Claymorphism, Soft UI Evolution | Social Proof-Focused | Calming aesthetics. Privacy-first. Crisis resources. Progress tracking. Accessibility mandatory. |
| 23 | Pet Tech App | Claymorphism + Vibrant & Block-based | Micro-interactions, Flat Design | Storytelling-Driven | Pet profiles. Health tracking. Playful UI. Photo galleries. Vet integration. |
| 24 | Smart Home/IoT Dashboard | Glassmorphism + Dark Mode (OLED) | Minimalism & Swiss Style, AI-Native UI | Interactive Product Demo | Device status. Real-time controls. Energy monitoring. Automation rules. Quick actions. |
| 25 | EV/Charging Ecosystem | Minimalism & Swiss Style + Aurora UI | Glassmorphism, Organic Biophilic | Hero-Centric Design | Charging station maps. Range estimation. Cost calculation. Environmental impact. |
| 26 | Subscription Box Service | Vibrant & Block-based + Motion-Driven | Claymorphism, Aurora UI | Feature-Rich Showcase | Unboxing experience. Personalization quiz. Subscription management. Product reveals. |
| 27 | Podcast Platform | Dark Mode (OLED) + Minimalism & Swiss Style | Motion-Driven, Vibrant & Block-based | Storytelling-Driven | Audio player UX. Episode discovery. Creator tools. Analytics for podcasters. |
| 28 | Dating App | Vibrant & Block-based + Motion-Driven | Aurora UI, Glassmorphism | Social Proof-Focused | Profile cards. Swipe interactions. Match animations. Safety features. Video chat. |
| 29 | Micro-Credentials/Badges Platform | Minimalism & Swiss Style + Flat Design | Accessible & Ethical, Swiss Modernism 2.0 | Trust & Authority | Credential verification. Badge display. Progress tracking. Issuer trust. LinkedIn integration. |
| 30 | Knowledge Base/Documentation | Minimalism & Swiss Style + Accessible & Ethical | Swiss Modernism 2.0, Flat Design | FAQ/Documentation | Search-first. Clear navigation. Code highlighting. Version switching. Feedback system. |
| 31 | Hyperlocal Services | Minimalism & Swiss Style + Vibrant & Block-based | Micro-interactions, Flat Design | Conversion-Optimized | Map integration. Service categories. Provider profiles. Booking system. Reviews. |
| 32 | Beauty/Spa/Wellness Service | Soft UI Evolution + Neumorphism | Glassmorphism, Minimalism & Swiss Style | Hero-Centric Design + Social Proof | Calming aesthetic. Booking system. Service menu. Before/after gallery. Testimonials. Relaxing imagery. |
| 33 | Luxury/Premium Brand | Liquid Glass + Glassmorphism | Minimalism & Swiss Style, 3D & Hyperrealism | Storytelling-Driven + Feature-Rich | Elegance paramount. Premium imagery. Storytelling. High-quality visuals. Exclusive feel. |
| 34 | Restaurant/Food Service | Vibrant & Block-based + Motion-Driven | Claymorphism, Flat Design | Hero-Centric Design + Conversion | Menu display. Online ordering. Reservation system. Food photography. Location/hours prominent. |
| 35 | Fitness/Gym App | Vibrant & Block-based + Dark Mode (OLED) | Motion-Driven, Neumorphism | Feature-Rich Showcase | Progress tracking. Workout plans. Community features. Achievements. Motivational design. |
| 36 | Real Estate/Property | Glassmorphism + Minimalism & Swiss Style | Motion-Driven, 3D & Hyperrealism | Hero-Centric Design + Feature-Rich | Property listings. Virtual tours. Map integration. Agent profiles. Mortgage calculator. High-quality imagery. |
| 37 | Travel/Tourism Agency | Aurora UI + Motion-Driven | Vibrant & Block-based, Glassmorphism | Storytelling-Driven + Hero-Centric | Destination showcase. Booking system. Itinerary builder. Reviews. Inspiration galleries. Mobile-first. |
| 38 | Hotel/Hospitality | Liquid Glass + Minimalism & Swiss Style | Glassmorphism, Soft UI Evolution | Hero-Centric Design + Social Proof | Room booking. Amenities showcase. Location maps. Guest reviews. Seasonal pricing. Luxury imagery. |
| 39 | Wedding/Event Planning | Soft UI Evolution + Aurora UI | Glassmorphism, Motion-Driven | Storytelling-Driven + Social Proof | Portfolio gallery. Vendor directory. Planning tools. Timeline. Budget tracker. Romantic aesthetic. |
| 40 | Legal Services | Accessible & Ethical + Minimalism & Swiss Style | Accessible & Ethical, Swiss Modernism 2.0 | Trust & Authority + Minimal | Credibility paramount. Practice areas. Attorney profiles. Case results. Contact forms. Professional imagery. |
| 41 | Insurance Platform | Minimalism & Swiss Style + Flat Design | Accessible & Ethical, Minimalism & Swiss Style | Conversion-Optimized + Trust | Quote calculator. Policy comparison. Claims process. Trust signals. Clear pricing. Security badges. |
| 42 | Banking/Traditional Finance | Minimalism & Swiss Style + Accessible & Ethical | Swiss Modernism 2.0, Dark Mode (OLED) | Trust & Authority + Feature-Rich | Security-first. Account overview. Transaction history. Mobile banking. Accessibility critical. Trust paramount. |
| 43 | Online Course/E-learning | Claymorphism + Vibrant & Block-based | Motion-Driven, Flat Design | Feature-Rich Showcase + Social Proof | Course catalog. Progress tracking. Video player. Quizzes. Certificates. Community forums. Gamification. |
| 44 | Non-profit/Charity | Accessible & Ethical + Organic Biophilic | Minimalism & Swiss Style, Editorial Grid/Magazine | Storytelling-Driven + Trust | Impact stories. Donation flow. Transparency reports. Volunteer signup. Event calendar. Emotional connection. |
| 45 | Music Streaming | Dark Mode (OLED) + Vibrant & Block-based | Motion-Driven, Aurora UI | Feature-Rich Showcase | Audio player. Playlist management. Artist pages. Personalization. Social features. Waveform visualizations. |
| 46 | Video Streaming/OTT | Dark Mode (OLED) + Motion-Driven | Glassmorphism, Vibrant & Block-based | Hero-Centric Design + Feature-Rich | Video player. Content discovery. Watchlist. Continue watching. Personalized recommendations. Thumbnail-heavy. |
| 47 | Job Board/Recruitment | Flat Design + Minimalism & Swiss Style | Vibrant & Block-based, Accessible & Ethical | Conversion-Optimized + Feature-Rich | Job listings. Search/filter. Company profiles. Application tracking. Resume upload. Salary insights. |
| 48 | Marketplace (P2P) | Vibrant & Block-based + Flat Design | Micro-interactions, Bento Box Grid | Feature-Rich Showcase + Social Proof | Seller/buyer profiles. Listings. Reviews/ratings. Secure payment. Messaging. Search/filter. Trust badges. |
| 49 | Logistics/Delivery | Minimalism & Swiss Style + Flat Design | Dark Mode (OLED), Micro-interactions | Feature-Rich Showcase + Conversion | Real-time tracking. Delivery scheduling. Route optimization. Driver management. Status updates. Map integration. |
| 50 | Agriculture/Farm Tech | Organic Biophilic + Flat Design | Minimalism & Swiss Style, Accessible & Ethical | Feature-Rich Showcase + Trust | Crop monitoring. Weather data. IoT sensors. Yield tracking. Market prices. Sustainable imagery. |
| 51 | Construction/Architecture | Minimalism & Swiss Style + 3D & Hyperrealism | Brutalism, Swiss Modernism 2.0 | Hero-Centric Design + Feature-Rich | Project portfolio. 3D renders. Timeline. Material specs. Team collaboration. Blueprint aesthetic. |
| 52 | Automotive/Car Dealership | Motion-Driven + 3D & Hyperrealism | Dark Mode (OLED), Glassmorphism | Hero-Centric Design + Feature-Rich | Vehicle showcase. 360° views. Comparison tools. Financing calculator. Test drive booking. High-quality imagery. |
| 53 | Photography Studio | Motion-Driven + Minimalism & Swiss Style | Aurora UI, Glassmorphism | Storytelling-Driven + Hero-Centric | Portfolio gallery. Before/after. Service packages. Booking system. Client galleries. Full-bleed imagery. |
| 54 | Coworking Space | Vibrant & Block-based + Glassmorphism | Minimalism & Swiss Style, Motion-Driven | Hero-Centric Design + Feature-Rich | Space tour. Membership plans. Booking system. Amenities. Community events. Virtual tour. |
| 55 | Home Services (Plumber/Electrician) | Flat Design + Accessible & Ethical | Minimalism & Swiss Style, Accessible & Ethical | Conversion-Optimized + Trust | Service list. Emergency contact. Booking. Price transparency. Certifications. Local trust signals. |
| 56 | Childcare/Daycare | Claymorphism + Vibrant & Block-based | Soft UI Evolution, Accessible & Ethical | Social Proof-Focused + Trust | Programs. Staff profiles. Safety certifications. Parent portal. Activity updates. Cheerful imagery. |
| 57 | Senior Care/Elderly | Accessible & Ethical + Soft UI Evolution | Minimalism & Swiss Style, Neumorphism | Trust & Authority + Social Proof | Care services. Staff qualifications. Facility tour. Family portal. Large touch targets. High contrast. Accessibility-first. |
| 58 | Medical Clinic | Accessible & Ethical + Minimalism & Swiss Style | Neumorphism, Soft UI Evolution | Trust & Authority + Conversion | Services. Doctor profiles. Online booking. Patient portal. Insurance info. HIPAA compliant. Trust signals. |
| 59 | Pharmacy/Drug Store | Flat Design + Accessible & Ethical | Minimalism & Swiss Style, Soft UI Evolution | Conversion-Optimized + Trust | Product catalog. Prescription upload. Refill reminders. Health info. Store locator. Safety certifications. |
| 60 | Dental Practice | Soft UI Evolution + Minimalism & Swiss Style | Accessible & Ethical, Inclusive Design | Social Proof-Focused + Conversion | Services. Dentist profiles. Before/after. Online booking. Insurance. Patient testimonials. Friendly imagery. |
| 61 | Veterinary Clinic | Claymorphism + Accessible & Ethical | Soft UI Evolution, Flat Design | Social Proof-Focused + Trust | Pet services. Vet profiles. Online booking. Pet portal. Emergency info. Friendly animal imagery. |
| 62 | Florist/Plant Shop | Organic Biophilic + Vibrant & Block-based | Aurora UI, Motion-Driven | Hero-Centric Design + Conversion | Product catalog. Occasion categories. Delivery scheduling. Care guides. Seasonal collections. Beautiful imagery. |
| 63 | Bakery/Cafe | Vibrant & Block-based + Soft UI Evolution | Claymorphism, Motion-Driven | Hero-Centric Design + Conversion | Menu display. Online ordering. Location/hours. Catering. Seasonal specials. Appetizing photography. |
| 64 | Brewery/Winery | Motion-Driven + Vintage Analog/Retro Film | Dark Mode (OLED), Organic Biophilic | Storytelling-Driven + Hero-Centric | Product showcase. Story/heritage. Tasting notes. Events. Club membership. Artisanal imagery. |
| 65 | Airline | Minimalism & Swiss Style + Glassmorphism | Motion-Driven, Accessible & Ethical | Conversion-Optimized + Feature-Rich | Flight search. Booking. Check-in. Boarding pass. Loyalty program. Route maps. Mobile-first. |
| 66 | News/Media Platform | Minimalism & Swiss Style + Flat Design | Dark Mode (OLED), Accessible & Ethical | Hero-Centric Design + Feature-Rich | Article layout. Breaking news. Categories. Search. Subscription. Mobile reading. Fast loading. |
| 67 | Magazine/Blog | Swiss Modernism 2.0 + Motion-Driven | Minimalism & Swiss Style, Aurora UI | Storytelling-Driven + Hero-Centric | Article showcase. Category navigation. Author profiles. Newsletter signup. Related content. Typography-focused. |
| 68 | Freelancer Platform | Flat Design + Minimalism & Swiss Style | Vibrant & Block-based, Micro-interactions | Feature-Rich Showcase + Conversion | Profile creation. Portfolio. Skill matching. Messaging. Payment. Reviews. Project management. |
| 69 | Marketing Agency | Brutalism + Motion-Driven | Vibrant & Block-based, Aurora UI | Storytelling-Driven + Feature-Rich | Portfolio. Case studies. Services. Team. Creative showcase. Results-focused. Bold aesthetic. |
| 70 | Event Management | Vibrant & Block-based + Motion-Driven | Glassmorphism, Aurora UI | Hero-Centric Design + Feature-Rich | Event showcase. Registration. Agenda. Speakers. Sponsors. Ticket sales. Countdown timer. |
| 71 | Membership/Community | Vibrant & Block-based + Soft UI Evolution | Bento Box Grid, Micro-interactions | Social Proof-Focused + Conversion | Member benefits. Pricing tiers. Community showcase. Events. Member directory. Exclusive content. |
| 72 | Newsletter Platform | Minimalism & Swiss Style + Flat Design | Swiss Modernism 2.0, Accessible & Ethical | Minimal & Direct + Conversion | Subscribe form. Archive. About. Social proof. Sample content. Simple conversion. |
| 73 | Digital Products/Downloads | Vibrant & Block-based + Motion-Driven | Glassmorphism, Bento Box Grid | Feature-Rich Showcase + Conversion | Product showcase. Preview. Pricing. Instant delivery. License management. Customer reviews. |
| 74 | Church/Religious Organization | Accessible & Ethical + Soft UI Evolution | Minimalism & Swiss Style, Inclusive Design | Hero-Centric Design + Social Proof | Service times. Events. Sermons. Community. Giving. Location. Welcoming imagery. |
| 75 | Sports Team/Club | Vibrant & Block-based + Motion-Driven | Dark Mode (OLED), 3D & Hyperrealism | Hero-Centric Design + Feature-Rich | Schedule. Roster. News. Tickets. Merchandise. Fan engagement. Action imagery. |
| 76 | Museum/Gallery | Minimalism & Swiss Style + Motion-Driven | Swiss Modernism 2.0, 3D & Hyperrealism | Storytelling-Driven + Feature-Rich | Exhibitions. Collections. Tickets. Events. Virtual tours. Educational content. Art-focused design. |
| 77 | Theater/Cinema | Dark Mode (OLED) + Motion-Driven | Vibrant & Block-based, Glassmorphism | Hero-Centric Design + Conversion | Showtimes. Seat selection. Trailers. Coming soon. Membership. Dramatic imagery. |
| 78 | Language Learning App | Claymorphism + Vibrant & Block-based | Micro-interactions, Flat Design | Feature-Rich Showcase + Social Proof | Lesson structure. Progress tracking. Gamification. Speaking practice. Community. Achievement badges. |
| 79 | Coding Bootcamp | Dark Mode (OLED) + Minimalism & Swiss Style | Cyberpunk UI, Flat Design | Feature-Rich Showcase + Social Proof | Curriculum. Projects. Career outcomes. Alumni. Pricing. Application. Terminal aesthetic. |
| 80 | Cybersecurity Platform | Cyberpunk UI + Dark Mode (OLED) | Neubrutalism, Minimalism & Swiss Style | Trust & Authority + Real-Time | Data density. Threat visualization. Dark mode default. |
| 81 | Developer Tool / IDE | Dark Mode (OLED) + Minimalism & Swiss Style | Flat Design, Bento Box Grid | Minimal & Direct + Documentation | Keyboard shortcuts. Syntax highlighting. Fast performance. |
| 82 | Biotech / Life Sciences | Glassmorphism + Biomimetic/Organic 2.0 | Minimalism & Swiss Style, Organic Biophilic | Storytelling-Driven + Research | Data accuracy. Cleanliness. Complex data viz. |
| 83 | Space Tech / Aerospace | HUD/Sci-Fi FUI + Dark Mode (OLED) | Glassmorphism, 3D & Hyperrealism | Immersive Experience + Hero | High-tech feel. Precision. Telemetry data. |
| 84 | Architecture / Interior | Exaggerated Minimalism + 3D & Hyperrealism | Swiss Modernism 2.0, Parallax Storytelling | Portfolio Grid + Visuals | High-res images. Typography. Space. |
| 85 | Quantum Computing Interface | HUD/Sci-Fi FUI + Dark Mode (OLED) | Glassmorphism, Spatial UI (VisionOS) | Immersive/Interactive Experience | Visualize complexity. Qubit states. Probability clouds. High-tech trust. |
| 86 | Biohacking / Longevity App | Biomimetic/Organic 2.0 | Minimalism & Swiss Style, Dark Mode (OLED) | Data-Dense + Storytelling | Personal data privacy. Scientific credibility. Biological visualizations. |
| 87 | Autonomous Drone Fleet Manager | HUD/Sci-Fi FUI | Real-Time Monitoring, Spatial UI (VisionOS) | Real-Time Monitor | Real-time telemetry. 3D spatial awareness. Latency indicators. Safety alerts. |
| 88 | Generative Art Platform | Minimalism & Swiss Style + Gen Z Chaos/Maximalism | Bento Box Grid, Dark Mode (OLED) | Bento Grid Showcase | Content is king. Fast loading. Creator attribution. Minting flow. |
| 89 | Spatial Computing OS / App | Spatial UI (VisionOS) | Glassmorphism, 3D & Hyperrealism | Immersive/Interactive Experience | Gaze/Pinch interaction. Depth hierarchy. Environment awareness. |
| 90 | Sustainable Energy / Climate Tech | Organic Biophilic + E-Ink/Paper | Data-Dense Dashboard, Swiss Modernism 2.0 | Interactive Demo + Data | Data transparency. Impact visualization. Low-carbon web design. |
| 91 | Personal Finance Tracker | Glassmorphism + Dark Mode (OLED) | Minimalism & Swiss Style, Flat Design | Interactive Product Demo | Category pie/donut charts. Monthly trend lines. Budget progress bars. Transaction list with swipe actions. Receipt camera. Currency formatting. Recurring entries. |
| 92 | Chat & Messaging App | Minimalism & Swiss Style + Micro-interactions | Glassmorphism, Flat Design | Feature-Rich Showcase + Demo | Bubble UI (left/right alignment). Typing indicators. Read receipts. Image/file preview. Emoji reactions. Group avatars. Online status dots. Swipe-to-reply. |
| 93 | Notes & Writing App | Minimalism & Swiss Style + Flat Design | Swiss Modernism 2.0, Soft UI Evolution | Minimal & Direct | WYSIWYG or Markdown toggle. Folder/tag organization. Full-text search. Cloud sync. Typography-first. Distraction-free zen mode. Slash-command palette. |
| 94 | Habit Tracker | Claymorphism + Vibrant & Block-based | Micro-interactions, Flat Design | Social Proof-Focused + Demo | Streak calendar heatmap. Daily check-in interaction. Gamification (badges/levels/fire). Reminder push. Progress ring charts. Weekly/monthly stats. Motivational micro-copy. |
| 95 | Food Delivery / On-Demand | Vibrant & Block-based + Motion-Driven | Glassmorphism, Flat Design | Hero-Centric Design + Feature-Rich | Restaurant cards with ratings. Menu category horizontal scroll. Cart bottom sheet. Real-time map tracking + driver ETA. Order status stepper. Rating post-delivery. |
| 96 | Ride Hailing / Transportation | Minimalism & Swiss Style + Glassmorphism | Dark Mode (OLED), Motion-Driven | Conversion-Optimized + Demo | Map-centric full-screen UI. Pickup/dropoff pins + route polyline. Driver card (photo/rating/vehicle). Fare estimate. Trip timer. Safety SOS button. Payment sheet. |
| 97 | Recipe & Cooking App | Claymorphism + Vibrant & Block-based | Soft UI Evolution, Organic Biophilic | Hero-Centric Design + Feature-Rich | Step-by-step with checkable instructions. Ingredient list with serving adjuster. Built-in timer per step. Cooking mode (screen-awake + large text). Save/bookmark. Share. |
| 98 | Meditation & Mindfulness | Neumorphism + Soft UI Evolution | Aurora UI, Glassmorphism | Storytelling-Driven + Social Proof | Breathing circle animation. Session duration picker. Ambient sound mixer. Streak/consistency tracking. Guided audio player. Sleep timer. Minimal chrome. Slow easing transitions only. |
| 99 | Weather App | Glassmorphism + Aurora UI | Motion-Driven, Minimalism & Swiss Style | Hero-Centric Design | Location auto-detect. Hourly horizontal scroll + daily/weekly list. Animated weather icons. Air quality index. UV/wind/humidity chips. Radar map overlay. Widget-friendly layout. |
| 100 | Diary & Journal App | Soft UI Evolution + Minimalism & Swiss Style | Neumorphism, Sketch Hand-Drawn (Mobile) | Storytelling-Driven | Calendar month-view entry. Mood tag selector (emoji/color). Photo/voice attachment. Writing prompts. Privacy lock (FaceID/PIN). Search across entries. Export to PDF. |
| 101 | CRM & Client Management | Flat Design + Minimalism & Swiss Style | Soft UI Evolution, Micro-interactions | Feature-Rich Showcase + Demo | Contact card list with avatar. Pipeline kanban board. Activity timeline. Quick-log (call/email/meeting). Deal amount + probability. Tag/segment filter. Mobile quick-actions. |
| 102 | Inventory & Stock Management | Flat Design + Minimalism & Swiss Style | Dark Mode (OLED), Accessible & Ethical | Feature-Rich Showcase | Product list/grid with thumbnails. Barcode/QR scanner. Stock level badges. Low-stock alert banner. Category/location filter. Batch edit. Reorder trigger. Audit log. |
| 103 | Flashcard & Study Tool | Claymorphism + Micro-interactions | Vibrant & Block-based, Flat Design | Feature-Rich Showcase + Demo | 3D card flip animation. Spaced repetition algorithm. Deck browser. Session progress bar. Streak tracking. Timed quiz mode. Share/import decks. Rich text + image cards. |
| 104 | Booking & Appointment App | Soft UI Evolution + Flat Design | Minimalism & Swiss Style, Micro-interactions | Conversion-Optimized | Calendar strip or month picker. Available time-slot grid. Service + staff selector. Confirmation summary. Reminder push. Reschedule/cancel flow. Two-sided (provider ↔ client). |
| 105 | Invoice & Billing Tool | Minimalism & Swiss Style + Flat Design | Swiss Modernism 2.0, Accessible & Ethical | Conversion-Optimized + Trust | Invoice template with line items. Tax/discount calculation. Status badges (Draft/Sent/Paid/Overdue). PDF export + share. Payment link generation. Client address book. Recurring invoices. |
| 106 | Grocery & Shopping List | Flat Design + Vibrant & Block-based | Claymorphism, Micro-interactions | Minimal & Direct + Demo | Category-grouped list. Tap-to-check interaction (with strikethrough). Quantity stepper. Share list with family. Store aisle sorting. Barcode scan to add. Frequently bought suggestions. |
| 107 | Timer & Pomodoro | Minimalism & Swiss Style + Neumorphism | Dark Mode (OLED), Micro-interactions | Minimal & Direct | Large centered countdown digits. Circular progress ring. Session/break auto-switch. Session history log. Custom interval settings. Sound + haptic alerts. Focus stats chart. |
| 108 | Parenting & Baby Tracker | Claymorphism + Soft UI Evolution | Vibrant & Block-based, Accessible & Ethical | Social Proof-Focused + Trust | Feed/sleep/diaper quick-log buttons. Growth percentile chart. Milestone timeline with photos. Multiple child profiles. Partner invite + shared access. Pediatric reference. One-handed operation. |
| 109 | Scanner & Document Manager | Minimalism & Swiss Style + Flat Design | Dark Mode (OLED), Accessible & Ethical | Feature-Rich Showcase + Demo | Camera capture with auto-edge detection. Crop/rotate/enhance. OCR text extraction overlay. PDF multi-page creation. Folder tree organization. Cloud sync. Share/export. Batch scan mode. |
| 110 | Calendar & Scheduling App | Flat Design + Micro-interactions | Minimalism & Swiss Style, Soft UI Evolution | Feature-Rich Showcase + Demo | Event color coding. Week/month/day views. Recurring events. Conflict detection. Multi-calendar sync. |
| 111 | Password Manager | Minimalism & Swiss Style + Accessible & Ethical | Dark Mode (OLED), Swiss Modernism 2.0 | Trust & Authority + Feature-Rich | Security-first. Zero-knowledge architecture. Biometric unlock. Breach alert dashboard. Password generator. |
| 112 | Expense Splitter / Bill Split | Flat Design + Vibrant & Block-based | Minimalism & Swiss Style, Micro-interactions | Minimal & Direct + Demo | Group expense tracking. Debt simplification algorithm. Payment reminders. Multi-currency. Receipt photo import. |
| 113 | Voice Recorder & Memo | Minimalism & Swiss Style + AI-Native UI | Flat Design, Dark Mode (OLED) | Interactive Product Demo + Minimal | Waveform display. Background recording. Auto-transcription (AI). Tag/organize. Cloud sync. |
| 114 | Bookmark & Read-Later | Minimalism & Swiss Style + Flat Design | Editorial Grid/Magazine, Swiss Modernism 2.0 | Minimal & Direct + Demo | Fast save via share sheet. Article distraction-free view. Tags and collections. Offline sync. Reading progress. |
| 115 | Translator App | Flat Design + AI-Native UI | Minimalism & Swiss Style, Micro-interactions | Feature-Rich Showcase + Interactive Demo | Real-time camera translation (OCR). Voice input and output. Offline mode. Conversation mode. Phrasebook. |
| 116 | Calculator & Unit Converter | Neumorphism + Minimalism & Swiss Style | Flat Design, Dark Mode (OLED) | Minimal & Direct | Scientific mode toggle. Live currency rates. Calculation history. Widget support. Gesture input. |
| 117 | Alarm & World Clock | Dark Mode (OLED) + Minimalism & Swiss Style | Neumorphism, Flat Design | Minimal & Direct | Gentle wake (gradual volume). Timezone visualizer. Sleep tracking integration. Smart alarm skip. Bedtime mode. |
| 118 | File Manager & Transfer | Flat Design + Minimalism & Swiss Style | Accessible & Ethical, Dark Mode (OLED) | Feature-Rich Showcase + Demo | Folder tree navigation. File type preview. Wireless P2P transfer. Cloud integration. Compress and extract. |
| 119 | Email Client | Flat Design + Minimalism & Swiss Style | Micro-interactions, Soft UI Evolution | Feature-Rich Showcase + Demo | Unified inbox. Swipe actions (archive/delete/snooze). Priority sorting. Smart reply. Unsubscribe tool. |
| 120 | Casual Puzzle Game | Claymorphism + Vibrant & Block-based | Micro-interactions, Motion-Driven | Feature-Rich Showcase + Social Proof | Satisfying match/clear animations. Progressive difficulty. Daily challenges. No-skip tutorials. Offline play. |
| 121 | Trivia & Quiz Game | Vibrant & Block-based + Micro-interactions | Claymorphism, Flat Design | Feature-Rich Showcase + Social Proof | Timer pressure UX. Category selection. Streak system. Real-time multiplayer. Daily quiz mode. |
| 122 | Card & Board Game | 3D & Hyperrealism + Flat Design | Motion-Driven, Dark Mode (OLED) | Feature-Rich Showcase | Real-time or async multiplayer. Game state sync. Tutorial mode. Match history. ELO rating system. |
| 123 | Idle & Clicker Game | Vibrant & Block-based + Motion-Driven | Claymorphism, 3D & Hyperrealism | Feature-Rich Showcase | Offline progress calculation. Satisfying number animations. Upgrade tree clarity. Prestige system. Optional ads. |
| 124 | Word & Crossword Game | Minimalism & Swiss Style + Flat Design | Swiss Modernism 2.0, Micro-interactions | Minimal & Direct + Demo | Daily challenge with shareable results. Physical keyboard feel. Difficulty levels. Dictionary hints. Streak stats. |
| 125 | Arcade & Retro Game | Pixel Art + Retro-Futurism | Vibrant & Block-based, Motion-Driven | Feature-Rich Showcase + Hero-Centric | Instant play with no login. Game Center leaderboards. Haptic feedback on collision. Offline. Controller support. |
| 126 | Photo Editor & Filters | Minimalism & Swiss Style + Dark Mode (OLED) | Motion-Driven, Flat Design | Feature-Rich Showcase + Interactive Demo | Non-destructive editing. Filter preview carousel. Histogram. RAW support. Batch export. Social share direct. |
| 127 | Short Video Editor | Dark Mode (OLED) + Motion-Driven | Vibrant & Block-based, Glassmorphism | Feature-Rich Showcase + Hero-Centric | Multi-track timeline. Licensed music library. Text overlays. Auto-captions. Export 9:16/16:9/1:1. |
| 128 | Drawing & Sketching Canvas | Minimalism & Swiss Style + Dark Mode (OLED) | Anti-Polish/Raw Aesthetic, Motion-Driven | Interactive Product Demo + Storytelling | Pressure sensitivity. Infinite canvas (pan/zoom). Layer management. Undo history. Export PNG/PSD/SVG. |
| 129 | Music Creation & Beat Maker | Dark Mode (OLED) + Motion-Driven | Cyberpunk UI, Glassmorphism | Interactive Product Demo + Storytelling | Touch piano and drum pad. Loop browser. MIDI support. Export MP3/WAV. Low-latency audio engine. |
| 130 | Meme & Sticker Maker | Vibrant & Block-based + Flat Design | Gen Z Chaos/Maximalism, Claymorphism | Feature-Rich Showcase + Social Proof | Template library. Caption text overlay. Font variety. Reaction sticker packs. Share to all platforms. Fast creation. |
| 131 | AI Photo & Avatar Generator | AI-Native UI + Aurora UI | Glassmorphism, Minimalism & Swiss Style | Feature-Rich Showcase + Social Proof | Style selection. Multiple output variations. Privacy policy prominent. Fast generation. Credits/subscription system. |
| 132 | Link-in-Bio Page Builder | Vibrant & Block-based + Bento Box Grid | Minimalism & Swiss Style, Glassmorphism | Conversion-Optimized + Social Proof | Drag-drop builder. Theme templates. Click analytics. Custom domain. Social icon integration. QR code export. |
| 133 | Wardrobe & Outfit Planner | Minimalism & Swiss Style + Motion-Driven | Aurora UI, Soft UI Evolution | Storytelling-Driven + Feature-Rich | Photo catalog of clothes. AI outfit suggestions. Calendar integration. Capsule wardrobe. Season filtering. |
| 134 | Plant Care Tracker | Organic Biophilic + Soft UI Evolution | Claymorphism, Flat Design | Storytelling-Driven + Social Proof | Plant database with care guides. Watering reminders. Growth photo timeline. AI health diagnosis. Collection sharing. |
| 135 | Book & Reading Tracker | Swiss Modernism 2.0 + Minimalism & Swiss Style | E-Ink/Paper, Soft UI Evolution | Social Proof-Focused + Feature-Rich | Barcode scan to add. Progress percentage. Annual reading goal. Notes and quotes. Friends activity. Genre stats. |
| 136 | Couple & Relationship App | Aurora UI + Soft UI Evolution | Claymorphism, Glassmorphism | Storytelling-Driven + Social Proof | Shared timeline. Anniversary countdowns. Secret chat. Photo albums. Love language quiz. Date night ideas. |
| 137 | Family Calendar & Chores | Flat Design + Claymorphism | Accessible & Ethical, Vibrant & Block-based | Feature-Rich Showcase + Social Proof | Member color coding. Chore assignment rotation. Recurring events. Shared shopping list. Allowance tracking. |
| 138 | Mood Tracker | Soft UI Evolution + Minimalism & Swiss Style | Aurora UI, Neumorphism | Storytelling-Driven + Social Proof | One-tap daily check-in. Emotion wheel selector. Mood calendar heatmap. Pattern insights. Export and share. |
| 139 | Gift & Wishlist | Vibrant & Block-based + Soft UI Evolution | Claymorphism, Flat Design | Minimal & Direct + Conversion | Add from any URL. Price range filter. Reserved-by-others system. Occasion calendar. Collaborative list. Surprise mode. |
| 140 | Running & Cycling GPS | Dark Mode (OLED) + Vibrant & Block-based | Motion-Driven, Glassmorphism | Feature-Rich Showcase + Social Proof | Live GPS tracking. Route map. Auto-pause detection. Segment leaderboards. Training zones. Social feed. Garmin sync. |
| 141 | Yoga & Stretching Guide | Organic Biophilic + Soft UI Evolution | Neumorphism, Minimalism & Swiss Style | Storytelling-Driven + Social Proof | Pose library with illustrations. Guided sessions with audio. Breathing exercises. Progress calendar. Beginner to advanced. |
| 142 | Sleep Tracker | Dark Mode (OLED) + Neumorphism | Glassmorphism, Minimalism & Swiss Style | Feature-Rich Showcase + Social Proof | Sleep cycle detection. Smart alarm wakes at light sleep. Snore detection. Weekly trends. Apple Health integration. |
| 143 | Calorie & Nutrition Counter | Flat Design + Vibrant & Block-based | Minimalism & Swiss Style, Claymorphism | Feature-Rich Showcase + Social Proof | Barcode scanner food log. Large database. Macro goals. Restaurant lookup. Recipe builder. AI photo food logging. |
| 144 | Period & Cycle Tracker | Soft UI Evolution + Aurora UI | Accessible & Ethical, Claymorphism | Social Proof-Focused + Trust | Cycle prediction. Symptom logging. Fertility window. Personalized insights. Privacy-first. Partner sharing option. |
| 145 | Medication & Pill Reminder | Accessible & Ethical + Flat Design | Minimalism & Swiss Style, Soft UI Evolution | Trust & Authority + Feature-Rich | Multi-medication schedule. Caregiver sharing. Refill reminders. Drug interaction warnings. Large touch targets. |
| 146 | Water & Hydration Reminder | Claymorphism + Vibrant & Block-based | Flat Design, Micro-interactions | Minimal & Direct + Demo | Tap to log quickly. Animated fill visualization. Custom reminders. Goal by weight/weather. Streak system. Widget. |
| 147 | Fasting & Intermittent Timer | Minimalism & Swiss Style + Dark Mode (OLED) | Neumorphism, Flat Design | Feature-Rich Showcase + Social Proof | Protocol selector (16:8, 18:6, OMAD). Circular countdown timer. Fasting history log. Tips during fast. Electrolytes. |
| 148 | Anonymous Community / Confession | Dark Mode (OLED) + Minimalism & Swiss Style | Glassmorphism, Soft UI Evolution | Social Proof-Focused + Feature-Rich | Anonymous posting with moderation. Safety reporting. Reaction system. Trending topics. Mental health resources link. |
| 149 | Local Events & Discovery | Vibrant & Block-based + Motion-Driven | Glassmorphism, Flat Design | Hero-Centric Design + Feature-Rich | Location-based discovery. Category filters. RSVP flow. Map view. Friend attendance. Organizer tools. Reminders. |
| 150 | Study Together / Virtual Coworking | Minimalism & Swiss Style + Soft UI Evolution | Flat Design, Dark Mode (OLED) | Social Proof-Focused + Feature-Rich | Live study rooms with video/avatar presence. Shared focus timer. Ambient music. Goals sharing. Streak accountability. |
| 151 | Coding Challenge & Practice | Dark Mode (OLED) + Cyberpunk UI | Minimalism & Swiss Style, Flat Design | Feature-Rich Showcase + Social Proof | Code editor with syntax highlight. Multiple languages. Hint system. Solution explanation. Company tags. Contest mode. |
| 152 | Kids Learning (ABC & Math) | Claymorphism + Vibrant & Block-based | Micro-interactions, Flat Design | Social Proof-Focused + Trust | Age-appropriate UI for 2-8. No ads. No dark patterns. Curriculum aligned. Parent progress reports. Reward system. |
| 153 | Music Instrument Learning | Vibrant & Block-based + Motion-Driven | Dark Mode (OLED), Soft UI Evolution | Interactive Product Demo + Social Proof | Interactive instrument on-screen. Sheet music display. Song library. Slow-tempo practice. Recording and playback. Teacher mode. |
| 154 | Parking Finder | Minimalism & Swiss Style + Glassmorphism | Flat Design, Micro-interactions | Conversion-Optimized + Feature-Rich | Real-time availability. In-app navigation. Payment integration. Parking timer alert. Favorite spots. Street vs garage. |
| 155 | Public Transit Guide | Flat Design + Accessible & Ethical | Minimalism & Swiss Style, Motion-Driven | Feature-Rich Showcase + Interactive Demo | Real-time arrivals. Offline maps. Disruption alerts. Multi-modal routing. Fare calculation. Accessibility features. |
| 156 | Road Trip Planner | Aurora UI + Organic Biophilic | Motion-Driven, Vibrant & Block-based | Storytelling-Driven + Hero-Centric | Route planning with stops. Point-of-interest discovery. Gas/food/hotel along route. Offline maps. Trip sharing. |
| 157 | VPN & Privacy Tool | Minimalism & Swiss Style + Dark Mode (OLED) | Cyberpunk UI, Accessible & Ethical | Trust & Authority + Conversion-Optimized | One-tap connect. Server selection by country. No-log policy prominent. Speed indicator. Kill switch. Protocol choice. |
| 158 | Emergency SOS & Safety | Accessible & Ethical + Flat Design | Dark Mode (OLED), Minimalism & Swiss Style | Trust & Authority + Social Proof | One-tap SOS. Emergency contacts auto-notify. Live location sharing. Fake call feature. Safe walk mode. Local emergency numbers. |
| 159 | Wallpaper & Theme App | Vibrant & Block-based + Aurora UI | Glassmorphism, Motion-Driven | Feature-Rich Showcase + Social Proof | Category browsing. Preview on device. Daily wallpaper auto-set. Widget matching. Creator uploads. Resolution auto-fit. |
| 160 | White Noise & Ambient Sound | Minimalism & Swiss Style + Dark Mode (OLED) | Neumorphism, Organic Biophilic | Minimal & Direct + Social Proof | Sound mixer with multiple simultaneous layers. Sleep timer with fade. Custom soundscapes. Offline. Background audio. |
| 161 | Home Decoration & Interior Design | Minimalism & Swiss Style + 3D Product Preview | Organic Biophilic, Aurora UI | Storytelling-Driven + Feature-Rich | AR room visualization. Style quiz. Product catalog with purchase links. 3D room planner. Mood board. Before/after. |
| 162 | Academic Journal / Scholarly Publishing | Swiss Modernism 2.0 + Minimalism & Swiss Style | Editorial Grid/Magazine, Accessible & Ethical | Content-Index + Search | Prioritize readability (serif body text). Clear article hierarchy. Abstract/DOI prominence. WCAG AAA. Minimal visual noise. Trust signals: ISSN, indexing badges. |
| 163 | API Developer Portal | Accessible & Ethical + Minimalism & Swiss Style | Glassmorphism, Dark Mode (OLED) | Quick Start + Interactive Docs | Endpoint discoverability. Copy-paste code samples. Auth flow clarity. Version switching. Interactive playground. Rate limit visibility. |
| 164 | Forum / Discussion Board | Dark Mode (OLED) + Minimalism & Swiss Style | Flat Design, Vibrant & Block-based | Feed + Thread View | Thread list with pagination. Rich text editor. Quote/mention system. Upvote/downvote. User badges. Moderation tools. |
| 165 | Directory / Listing Site | Flat Design + Vibrant & Block-based | Minimalism & Swiss Style, Bento Box Grid | Filter-Heavy Grid + Map | Category tree. Multi-filter sidebar. Map/list toggle. Verified badges. Reviews. Claim listing flow. |
| 166 | Status Page / Incident Management | Data-Dense Dashboard + Real-Time Monitoring | Minimalism & Swiss Style, Dark Mode (OLED) | Timeline + Severity Indicators | Service status matrix. Incident timeline. Severity badges. Maintenance schedule. SLA uptime history. Email/SMS subscribe. |
| 167 | Wiki / Encyclopedia | Minimalism & Swiss Style + Flat Design | Swiss Modernism 2.0, Accessible & Ethical | Search-First + Hierarchical Navigation | Full-text search bar. Table of contents sidebar. Edit history. Inter-page linking. Mobile responsive. Print-friendly. |
| 168 | Auction Platform | Dark Mode (OLED) + Motion-Driven | Vibrant & Block-based, Real-Time Monitoring | Live Auction Feed + Countdown | Real-time bid updates. Countdown timer urgency. Auto-bid ceiling. Outbid notifications. Bid history. Reserve price indicator. |
| 169 | Changelog / Release Notes | Minimalism & Swiss Style + Flat Design | Swiss Modernism 2.0, Editorial Grid/Magazine | Timeline + Version List | Chronological release feed. Semver badges. Breaking change warnings. Copy-paste install commands. Subscribe to feed. Search by version. |
| 170 | Citizen Science Platform | Organic Biophilic + Vibrant & Block-based | Claymorphism, Motion-Driven | Storytelling-Driven + Social Proof | Project cards with impact metrics. Contribution tracker. Beginner-friendly onboarding. Data quality feedback loop. Leaderboards. Community forums. |
| 171 | Classifieds / Buy-Sell | Flat Design + Vibrant & Block-based | Minimalism & Swiss Style, Bento Box Grid | Filter-Heavy Grid + Map | Category tree. Photo-first listing cards. Price negotiation. Location radius filter. Saved searches. Seller reputation. Flag/report. |
| 172 | Conference / Symposium Landing Page | Swiss Modernism 2.0 + Minimalism & Swiss Style | Editorial Grid/Magazine, Accessible & Ethical | Hero + Agenda + CFP | Speaker grid. Multi-track agenda. CFP deadline countdown. Venue map. Sponsor tiers. Early-bird pricing. Proceedings download. |
| 173 | Crowdfunding Platform | Vibrant & Block-based + Motion-Driven | Claymorphism, Editorial Grid/Magazine | Storytelling-Driven + Social Proof | Funding progress bar with % goal. Reward tier selector. Backer count. Countdown timer. Updates feed. Creator profile. Risk/disclaimer section. |
| 174 | Digital Signage / Kiosk | Minimalism & Swiss Style + Dark Mode (OLED) | Flat Design, Motion-Driven | Full-Screen Immersive | Full-screen single-purpose layout. Touch targets ≥56px. Auto-rotate content. Offline fallback. Brightness-aware color palette. No scroll. |
| 175 | E-signature / Document Workflow | Accessible & Ethical + Minimalism & Swiss Style | Accessible & Ethical, Flat Design | Feature-Rich Showcase + Conversion | Document preview with annotation. Signature placement UI. Multi-signer workflow. Audit trail. Compliance badges. Mobile signing. Expiry reminders. |
| 176 | Feature Flag / Config Management | Dark Mode (OLED) + Data-Dense Dashboard | Minimalism & Swiss Style, Accessible & Ethical | Feature List + Toggle Panel | Feature list with on/off toggles. Percentage rollout slider. Environment selector (prod/staging). User targeting rules. Kill switch. Audit log. |
| 177 | Government Portal / Civic Services | Accessible & Ethical + Inclusive Design | Flat Design, Inclusive Design | Service Directory + Search | Multilingual toggle. Service A-Z index. Form wizard with save-progress. Document upload. Appointment booking. Status tracker. WCAG AAA. Plain language. |
| 178 | Grant / Funding Portal | Accessible & Ethical + Minimalism & Swiss Style | Accessible & Ethical, Swiss Modernism 2.0 | Opportunity Grid + Search | Funding opportunity cards. Eligibility checker. Deadline countdown. Application form wizard. Document checklist. Review status tracker. Award announcement feed. |
| 179 | LMS (Learning Management System) | Flat Design + Accessible & Ethical | Minimalism & Swiss Style, Vibrant & Block-based | Dashboard + Course Grid | Dashboard with enrolled courses. Assignment deadlines. Gradebook view. Discussion forums. File upload. Calendar integration. Mobile offline sync. |
| 180 | No-code / Low-code Builder | Vibrant & Block-based + Bento Box Grid | Motion-Driven, Glassmorphism | Interactive Product Demo | Drag-drop canvas. Component library sidebar. Logic flow visual editor. Preview pane. Template gallery. Publish button. Version history. |
| 181 | Open Source Project Landing | Dark Mode (OLED) + Minimalism & Swiss Style | Accessible & Ethical, Flat Design | Hero + Install + Contribute | Star/fork count badges. Install command (copy-paste). Language breakdown bar. Top contributors grid. Sponsor CTA. Documentation link. Issue/pr status. |
| 182 | Patient Portal / Health Records | Minimalism & Swiss Style + Accessible & Ethical | Minimalism & Swiss Style, Flat Design | Health Summary Dashboard | Labs and results timeline. Medication list with refill. Appointment scheduling. Message care team. Immunization records. Allergy alerts. Family access proxy. |
| 183 | Patent / IP Database | Swiss Modernism 2.0 + Minimalism & Swiss Style | Editorial Grid/Magazine, Data-Dense Dashboard | Search-First + Results Grid | Full-text patent search. Classification tree. Citation graph. Prior art comparison. Patent family view. PDF download. Legal status tracker. |
| 184 | Q&A Community Platform | Minimalism & Swiss Style + Flat Design | Dark Mode (OLED), Accessible & Ethical | Feed + Thread View | Question list with vote count. Rich code blocks. Tag filter. Reputation system. Accepted answer highlight. Comment threads. Bookmark/save. |
| 185 | Research Lab / University Department | Swiss Modernism 2.0 + Minimalism & Swiss Style | Editorial Grid/Magazine, Accessible & Ethical | Overview + People + Publications | PI bio and research focus. Current members grid. Publication list with links. Open positions. Lab facilities photos. Funding acknowledgments. |
| 186 | Resume / CV Builder | Minimalism & Swiss Style + Flat Design | Swiss Modernism 2.0, Accessible & Ethical | Interactive Product Demo + CTA | Template picker. Section-by-section editor. Real-time preview. ATS score indicator. PDF export. Cover letter generator. Import from LinkedIn. |
| 187 | Review Platform | Flat Design + Vibrant & Block-based | Accessible & Ethical, Minimalism & Swiss Style | Hero + Rating Summary + Review Feed | Star rating summary with distribution. Verified purchase badge. Photo/video reviews. Helpful/upvote. Filter by rating. Response from business. Sort by recency. |
| 188 | RPA / Automation Dashboard | Dark Mode (OLED) + Data-Dense Dashboard | Minimalism & Swiss Style, Accessible & Ethical | Bot Fleet Dashboard | Bot status grid (running/idle/failed). Queue depth. Process flow visualization. Exception handling alert. ROI metrics. Bot scheduling calendar. Audit trail. |
| 189 | Survey / Form Builder | Minimalism & Swiss Style + Micro-interactions | Claymorphism, Flat Design | Interactive Product Demo | Drag-drop form builder. Question type library. Conditional logic visualizer. Theme picker. Response dashboard with charts. Export CSV. Share link/QR/embed. |
| 190 | Telemedicine Platform | Neumorphism + Accessible & Ethical | Minimalism & Swiss Style, Soft UI Evolution | Trust & Authority + Conversion | Video call UI with screen share. Appointment queue. Symptom intake form. Prescription e-delivery. Waiting room with ETA. Post-visit summary. Insurance verification. |
| 191 | Testimonial & Social Proof Widget | Vibrant & Block-based + Flat Design | Motion-Driven, Minimalism & Swiss Style | Wall-of-Love Grid | Testimonial cards with photo. Star ratings. Video testimonials. Case study summaries. Filter by industry/product. Embeddable widget code. Auto-rotate carousel. |
| 192 | Ticketing / Box Office | Vibrant & Block-based + Motion-Driven | Dark Mode (OLED), Glassmorphism | Event Grid + Seat Map | Event cards with date/venue. Interactive seat map. Cart with countdown. QR code ticket. Will-call pickup. Group discounts. Refund policy. |

---

## Final Notes

This consolidated file combines:

- **app-interface.csv** (32 rules) — UI/UX app interface rules with do/don't/code examples/severity
- **charts.csv** (26 chart types) — complete chart selection guide with accessibility grades
- **colors.csv** (193 product palettes) — full color token palette for every product type
- **icons.csv** (101 icons + 5 style systems) — complete icon library reference
- **landing.csv** (36 landing patterns) — complete landing page pattern catalog
- **motion.csv** (18 animation patterns) — motion design reference with GSAP snippets
- **react-performance.csv** (44 React/Next.js rules) — performance optimization reference
- **products.csv** (192 product types) — complete product type → style/landing pattern mapping

The reasoning and explanations throughout show WHY each rule exists, not just WHAT the rule is. This makes the reference useful for decision-making, not just lookup.

To keep this file updated as the source data changes, re-run the consolidation process. The source files in `/data/` can be shuffled/renamed/reorganized — this file captures their content independently.