# WebMXERZ — Consolidated Knowledge Reference

> Combined reference for the webmxerz skill: accessibility, touch/gesture, forms, feedback, performance, React optimization, JavaScript patterns, rendering, advanced patterns, color palettes, charts, animation, landing pages, icons, and product→style mappings. Read this when you need to understand WHY a design decision matters — not just WHAT the rule says.

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

Accessibility is what separates a product that works for everyone from one that silently locks out people using screen readers, keyboards, or other assistive tools. The rules below aren't optional polish — they're the difference between a usable product and a broken one for a significant portion of users. The source is WCAG 2.2 plus practical mobile and React Native experience.

### Icon Button Labels

An icon-only button announces as just "button" to a screen reader — the user has no idea what it does. This is a straight WCAG 4.1.2 failure: Name, Role, Value. Every interactive element must tell the user what it is and what it does. The fix is simple: give it a label. On iOS that's `accessibilityLabel`, Android uses `contentDescription`, React Native uses the same props, and the web uses `aria-label`. The pattern to follow: `<Pressable accessibilityLabel="Close"><XIcon /></Pressable>`. The pattern that fails: `<Pressable><XIcon /></Pressable>` — looks fine visually, is invisible to assistive tech. This is critical because it blocks basic interaction entirely.

### Form Control Labels — Why Two Labels?

Sighted users read the visible label to know what to type. Blind users hear the accessibility label to know the same thing. Placeholder text is not a label — it vanishes when the user starts typing, and assistive tech often announces it as placeholder content rather than as a field label. Forms are where conversion happens, so if a screen reader user can't understand your fields, they can't purchase, sign up, or submit anything. Good pattern: a visible `<Text>Email</Text>` paired with a `<TextInput accessibilityLabel="Email address" />`. Bad pattern: `<TextInput placeholder="Email" />` with nothing else — no accessible name, no visible label. This is critical because it blocks form completion.

### Role and Traits on Interactive Elements

Screen reader users navigate by role — "jump to next button", "list all links", "find all checkboxes". If your `View` handles touches but announces as a generic view, it's invisible to this navigation. The element has to say what it is. On iOS use `accessibilityRole` and `accessibilityTraits`, on Android use `role` and `className`, on the web use semantic HTML (`<button>`, `<a>`) or the `role` attribute. Good: `<Pressable accessibilityRole="button">Submit</Pressable>`. Bad: `<View onTouchStart={submit}>Submit</View>` — visually clickable, announced as nothing useful. High severity because role-based navigation is a primary way screen reader users move through an interface.

### Dynamic Updates and Live Regions

When content changes without a page reload — "Saving...", "Saved!", "Error: network failed" — screen readers have no automatic way to know something changed. The user keeps reading stale content. You have to announce the change. iOS uses `accessibilityLiveRegion` or `UIAccessibility.post(notification: .announcement, ...)`, Android uses `android:accessibilityLiveRegion="polite"`, and the web uses `aria-live="polite"` or `aria-live="assertive"`. Good: `<Text accessibilityLiveRegion="polite">{status}</Text>`. Bad: `<Text>{status}</Text>` — updates silently. Medium severity: this blocks understanding of async flows but doesn't block initial interaction.

### Decorative Icons Should Be Invisible

If every decorative icon gets announced — "Checkmark icon", "Star icon", "Heart icon" — the user has to wade through noise to reach actual content. Decorative means decorative: it adds visual flavor, no semantic meaning. Hide it from the accessibility tree. iOS: `accessibilityElementsHidden` or `isAccessibilityElement = false`. Android: `importantForAccessibility="no"`. React Native: `accessible={false}`, `importantForAccessibility="no"`. Web: `aria-hidden="true"`. Good: `<Icon accessible={false} importantForAccessibility="no" />`. Bad: `<Icon />` — screen reader announces an unlabeled image. Medium severity: it clutters the experience but doesn't block key flows.

### Dragging Needs a Non-Drag Path

Drag interactions are impossible for keyboard-only users, difficult for screen reader users, hard to discover because there's no visible affordance, and often fail on touch devices for people with tremors or motor limitations. WCAG 2.5.7 requires that any action achievable by dragging must also be achievable by a single pointer without dragging — typically a button. Good: a Move Up button alongside drag handles. Bad: a drag handle with no alternative. High severity because it blocks an entire interaction mode.

### Authentication Reuse

Forcing users to re-type credentials or the same data across a multi-step flow breaks password manager autofill, prevents paste (a common misguided rule in banking apps), makes passkeys useless, and creates friction that causes abandonment. Good: `textContentType="password" autoComplete="current-password"` with paste enabled. Bad: `onPaste={e => e.preventDefault()}` — blocks paste, breaks password managers entirely. Critical severity: this blocks authentication flows for many users.

---

## 2. Touch, Gesture & Navigation

### Touch Target Size

Touch targets must be at least 44×44pt on iOS, 48×48dp on Android, and 24×24 CSS px on the web (WCAG 2.5.8 minimum, with exceptions). The three platforms need different minimums because they have different pixel densities and different research behind what's comfortably tappable. A 16px icon inside a 32px touchable area fails the minimum — the touchable area itself must be padded, not just the visual icon. Use `Platform.select({ ios: 44, android: 48 })` and evaluate web separately against WCAG 2.5.8. Don't collapse all three platforms into one number — they're not equivalent. Critical: tiny targets cause mis-taps, rage clicks, and abandonment.

### Touch Spacing

Adjacent touch targets need at least 8dp of space between them. Without that space, a tap between two buttons hits both — the system has to guess which one you meant. The dead space gives the touch system room to disambiguate. Good: `<View style={{ gap: 8 }}><Button /><Button /></View>`. Bad: clustered buttons with no gap — they merge into an ambiguous tappable zone. Medium severity.

### Gesture Conflicts

Custom gestures must not break system scroll or back gestures. Users expect swipe-to-go-back on iOS and scroll on content areas. If your full-screen custom swipe captures that gesture, the user gets trapped — they can't navigate back, can't scroll content. This creates trapped users. Reserve horizontal swipes for carousels; don't put a `PanResponder` on the full screen. Don't nest a horizontal pager inside a vertical scroll view without coordination. High severity.

### Back Navigation Behavior

The back button is the most-used navigation action. If it exits the app, resets the stack, or loses form data, the user loses trust and has to redo work. State preservation matters especially for forms, scroll position, and partially completed flows. Good: `onPress={() => navigation.goBack()}` — let the navigation stack manage state. Bad: `BackHandler.exitApp()` on first press — that's an exit, not navigation. Critical.

### Bottom Tab Bar Limit

A bottom tab bar should have at most 5 primary items. More than 5 makes tabs crowded and unreadable. iOS HIG recommends 3-5 tabs; beyond that, move extras to "More" or Settings. Overloaded tab bars cause users to miss important destinations. Good: 3-5 tabs, extras in More/Settings. Bad: Home/Explore/Shop/Cart/Profile/Settings/More — 7 items crammed together. Medium severity.

### Modal Escape Path

A modal without a close button traps the user — they can't dismiss it without knowing how. WCAG 2.1.2 (No Trap) and basic usability both demand an escape path. Good: `<Modal><Button title="Close" onPress={onClose} /></Modal>` plus swipe-down where the platform expects it. Bad: `<Modal><View>{children}</View></Modal>` — no close affordance at all. High severity.

### Preserving Screen State on Return

Navigate away from a form with filled data, come back, and the form is empty — the user has to re-enter everything. Or scroll to the top of a long list when returning. This breaks navigation predictability. Good: `<Tab.Navigator screenOptions={{ unmountOnBlur: false }}>` — keeps components mounted. Bad: `<Tab.Screen options={{ unmountOnBlur: true }} />` — destroys and loses state. Medium severity.

---

## 3. Forms & Input UX

### Inline Validation Timing

Validate on blur or on submit, not on every keystroke. Validating as the user types causes visual jank (errors popping in and out as they type), cognitive overload (they see errors before they've finished thinking), and unnecessary performance cost (validation runs on every character). Wait until the user signals they're done with a field (blur) or until they submit. Give clear error messages near the problem field. Good: `onBlur={() => validateEmail(value)}`. Bad: `onChangeText={v => validateEmail(v)}` — validates every character. Medium severity.

### Keyboard Type Matching

The wrong keyboard forces manual work from the user. An email field with the default keyboard means the user must manually switch to numbers and symbols. A number field with an email keyboard has no number row. A search field with the default keyboard has no search key. Match the input type to the expected content — this is both usability and accessibility (the correct input mode gets announced to screen readers). Good: `<TextInput keyboardType="email-address" />` for email. Bad: `<TextInput keyboardType="default" />` for everything. Medium severity.

### Guiding Users Through Fields

After filling one field, the user should flow to the next without manually tapping. `onSubmitEditing` lets you focus the next field when the keyboard's Next/Done key is pressed. This matters especially on mobile where every tap is a physical action. Good: `onSubmitEditing={() => nextRef.current?.focus()}` — chains fields. Bad: no `onSubmitEditing` — user must tap the next field manually each time. Low severity: convenience, not a blocker.

### Password Visibility Toggle

Users make typos in passwords. Without a visibility toggle they must retype blindly, abandon sign-up flows when they can't see their input, and use weaker passwords because they can't verify what they typed. A Show/Hide toggle respects user intent while keeping the default secure (hidden). Good: `<TextInput secureTextEntry={secure} />` with a toggle button. Bad: `<TextInput secureTextEntry />` without a toggle — forces blind typing. Medium severity.

---

## 4. Feedback & State

### Loading Indicators

Show visible feedback during network operations — an ActivityIndicator or skeleton for operations taking longer than about 300ms. Without loading feedback, the user thinks the app froze. They tap again (duplicate request) or abandon. Visible feedback says "I heard you, working on it." The 300ms threshold comes from Nielsen's responsiveness research — below that, humans perceive it as instant. Good: `{loading ? <ActivityIndicator /> : <Button title="Save" />}`. Bad: `<Button title="Save" onPress={submit} />` with no loading state — the app appears frozen. High severity.

### Success Confirmation

Confirm successful actions with brief feedback — a toast, checkmark, or banner. Without confirmation the user doesn't know if their action worked. Did the save go through? Did the message send? A brief confirmation closes the feedback loop and builds trust. Good: `showToast('Saved successfully')` — brief, non-blocking. Bad: silently update state with no confirmation — the user is uncertain. Medium severity.

### Error Feedback Near the Problem

A red border alone says "something's wrong" but not what or how to fix it. An error message explains the problem and the solution. Input-level errors let the user fix the specific field; a summary banner helps when multiple errors exist. Good: `<TextInput />` followed by `<Text style={{color: 'red'}}>{error}</Text>`. Bad: `<TextInput style={{borderColor: 'red'}} />` — red border, no explanation. High severity.

---

## 5. Performance — Bundle, Server & Client

### Why Bundle Size Matters

Large bundles mean slow initial load (blocking first paint), higher data usage for mobile users, worse Core Web Vitals (LCP, FID, CLS), and reduced conversion on slow connections. The rules below from React/Next.js performance apply broadly to any React-based UI.

### Barrel Imports

Import directly from source files instead of barrel files to avoid loading unused modules. Barrel files (`index.ts` that re-exports everything) cause bundlers to include ALL exports, not just what you use. Importing directly from the source path lets tree-shaking eliminate unused code. Good: `import Check from 'lucide-react/dist/esm/icons/check'` — tree-shakeable. Bad: `import { Check } from 'lucide-react'` — pulls the entire library. Critical.

### Dynamic Imports for Heavy Components

Use `next/dynamic` to lazy-load large components not needed on initial render. Heavy components (code editors, rich text editors, data grids) can be 100KB+ of JS. If they're on the initial route but not visible until interaction, loading them upfront wastes bandwidth and delays first paint. Dynamic imports split them into separate chunks loaded on demand. Good: `const Monaco = dynamic(() => import('./monaco'), { ssr: false })`. Bad: `import { MonacoEditor } from './monaco-editor'` at top level — bundles unconditionally. Critical.

### Loading Features on Demand

If a feature is gated behind a toggle, onboarding step, or user choice, its code doesn't need to be in the initial bundle. Load it when the user enables the feature. Good: `useEffect(() => { if (enabled) import('./heavy.js') }, [enabled])`. Bad: `import { heavyData } from './heavy.js'` unconditionally. High severity.

### Preloading on Hover Intent

If a user hovers over an "Edit" button that opens a heavy editor, you have about 200ms of lead time before they click. Using that time to start loading means the editor is ready when they click — no spinner, no delay. Good: `onMouseEnter={() => import('./editor')}`. Bad: `onClick={() => import('./editor')}` — loads only after click, causes delay. Medium severity.

---

## 6. React/Next.js Re-render Optimization

### Don't Subscribe to State Used Only in Callbacks

`useSearchParams()` subscribes the component to URL changes. If you only use `params` inside a click handler (not in render), you're causing re-renders for changes that don't affect the UI. Read the value inside the callback instead. Good:

```jsx
const handleClick = () => {
  const params = new URLSearchParams(location.search)
  // use params
}
```

Bad:

```jsx
const params = useSearchParams()
const handleClick = () => { params.get('ref') }
```

— re-renders on every URL change. Medium severity.

### Memoized Components for Early Returns

When you have an early return (loading skeleton, error state), expensive computations before the return still run — they're wasted because the component returns before using them. Extract the expensive part into a `memo()` component that only renders when its data is ready. Good:

```jsx
const UserAvatar = memo(({ user }) => { ... })
if (loading) return <Skeleton />
// avatar only computes when user data is ready
```

Bad:

```jsx
const avatar = useMemo(() => compute(user))
if (loading) return <Skeleton />
```

— computation runs before the early return. Medium severity.

### Narrow Effect Dependencies to Primitives

`useEffect` re-runs when dependencies change. If you pass the whole `user` object, the effect re-runs every time any part of `user` changes — even if the effect only uses `user.id`. Narrow to primitives to avoid unnecessary effect re-runs. Good: `useEffect(() => { console.log(user.id) }, [user.id])`. Bad: `useEffect(() => { console.log(user.id) }, [user])` — re-runs on any user change. Low severity.

### Subscribe to Derived Booleans Instead of Continuous Values

`useWindowWidth()` returns a continuously-changing number. If you only care about whether the width is below 768px (a boolean), subscribing to the continuous value causes re-renders on every pixel change during resize. Derive the boolean from a more stable source, or subscribe to the derived boolean. Good: `const isMobile = useMediaQuery('(max-width: 767px)')`. Bad: `const width = useWindowWidth(); const isMobile = width < 768` — re-renders on every resize. Medium severity.

### Functional setState for Stable Callbacks

`setItems([...items, newItem])` captures `items` from the render scope. If the callback is used in a `setTimeout`, API callback, or detached event, `items` may be stale. The functional form `setItems(curr => [...curr, newItem])` always gets the current state, no stale closure. Good: `setItems(curr => [...curr, newItem])`. Bad: `setItems([...items, newItem])` — may use stale `items`. Medium severity.

### Lazy State Initialization

Pass a function to `useState` for expensive initial values. `useState(buildSearchIndex(items))` runs `buildSearchIndex` on every render — even when the state is already initialized. React only uses the function form on the first render. Good: `useState(() => buildSearchIndex(items))`. Bad: `useState(buildSearchIndex(items))` — runs every render. Medium severity.

### Mark Non-Urgent Updates as Transitions

`setScrollY(window.scrollY)` on every scroll event blocks the main thread. The UI can't respond to user input while processing scroll state updates. Wrapping in `startTransition` tells React this update is non-urgent — it can interrupt to handle user input first. Good: `startTransition(() => setScrollY(window.scrollY))`. Bad: `setScrollY(window.scrollY)` — blocks on every scroll event. Medium severity.

---

## 7. JavaScript Performance Patterns

These rules apply to any JavaScript UI — React, React Native, or vanilla JS. They focus on reducing unnecessary work.

### Batch CSS Changes via Classes

Every individual style change can trigger a reflow (layout recalculation). Browsers are smarter about class changes (they can batch), but individual style property writes are expensive. Changing one property at a time — `el.style.width = '100px'` then `el.style.height = '200px'` — causes two reflows. Using a class: one reflow. Good: `element.classList.add('highlighted')`. Bad: `el.style.width = '100px'; el.style.height='200px'` — two reflows. Medium severity.

### Build a Map for Repeated Lookups

`.find()` is O(n) — it scans the entire array each time. If you do this in a loop, you get O(n²). A Map gives O(1) lookup: `byId.get(id)` is instant regardless of array size. Good:

```js
const byId = new Map(users.map(u => [u.id, u]))
byId.get(id)
```

Bad: `users.find(u => u.id === order.userId)` in a loop — O(n) per call. Low-medium severity.

### Cache Property Access in Hot Paths

Accessing `obj.config.settings.value` inside a loop means three property lookups per iteration. If the loop runs 1000 times, that's 3000 lookups. Cache once before the loop: 3 lookups total. Good:

```js
const val = obj.config.settings.value
for (...) process(val)
```

Bad:

```js
for (...) process(obj.config.settings.value)
```

— 3 lookups per iteration. Low-medium severity.

### Cache Repeated Function Results

If a function like `slugify(name)` is called 100 times with the same input, it does 100 identical string operations. Caching the result gives instant return for repeat inputs. Good:

```js
const cache = new Map()
if (cache.has(x)) return cache.get(x)
const result = slugify(x)
cache.set(x, result)
return result
```

Bad: `slugify(name)` — called 100 times with the same input. Medium severity.

### Cache Storage API Reads in Memory

Storage API reads are synchronous and relatively slow (disk I/O in some browsers). Reading `localStorage.getItem('theme')` on every render is wasteful if the value doesn't change during the session. Read once, cache in a Map, return from cache. Good:

```js
if (!cache.has(key)) cache.set(key, localStorage.getItem(key))
return cache.get(key)
```

Bad: `localStorage.getItem('theme')` on every call. Low-medium severity.

### Combine Multiple Iterations into One Loop

`users.filter(admin); users.filter(tester); users.filter(inactive)` — three passes over the array. A single loop with conditional pushes does all three in one pass. Good:

```js
for (u of users) {
  if (u.isAdmin) admins.push(u)
  if (u.isTester) testers.push(u)
}
```

Bad: three separate filter calls — three full passes. Low-medium severity.

### Check Lengths Before Expensive Comparisons

If you're comparing two arrays and they have different lengths, they're NOT equal. No need to run the expensive comparison. Early return on length mismatch saves the full comparison. Good:

```js
if (a.length !== b.length) return true
// then compare
```

Bad: always run `a.sort().join() !== b.sort().join()` — even when lengths differ. Medium-high severity.

### Return Early When Result Is Determined

Processing all items when the first one fails is wasted work. If validating users and the first one has no email, return immediately — don't check the other 99. Good:

```js
for (u of users) {
  if (!u.email) return { error: 'Email required' }
}
```

Bad:

```js
let hasError
for (...) {
  if (!email) hasError = true
}
if (hasError) ...
```

— processes all before checking. Low-medium severity.

### Hoist Regular Expressions Out of Render

`new RegExp(pattern)` creates a new object every render. RegExp compilation is not free. If the pattern is constant, hoist it. If it's dynamic but repeated, memoize with `useMemo`. Good: `const EMAIL_RE = /^[^@]+@[^@]+$/` at module level. Bad: `const re = new RegExp(pattern)` inside component render. Low-medium severity.

### Use a Loop for Min/Max Instead of Sort

`arr.sort((a,b) => b-a)[0]` sorts the entire array just to find the largest element. Sorting is O(n log n). A single pass loop is O(n) — faster for large arrays. Good:

```js
let max = arr[0]
for (x of arr) if (x > max) max = x
```

Bad: `arr.sort((a,b) => b-a)[0]` — sorts everything. Low severity.

### Use Set/Map for Membership Checks

`array.includes(id)` is O(n) — scans the array. `set.has(id)` is O(1) — instant. If you're checking membership repeatedly, converting to a Set pays off immediately. Good: `const allowed = new Set(['a','b']); allowed.has(id)`. Bad: `const allowed = ['a','b']; allowed.includes(id)` for repeated checks. Low-medium severity.

### Use `toSorted()` Instead of `sort()`

`sort()` mutates the original array. If that array is referenced elsewhere (state, props, other components), the mutation causes bugs. `toSorted()` returns a new array, leaving the original intact — safer for React's immutable patterns. Good: `users.toSorted((a,b) => a.name.localeCompare(b.name))`. Bad: `users.sort((a,b) => a.name.localeCompare(b.name))` — mutates. Medium-high severity.

---

## 8. Rendering & DOM Optimization

### Wrap SVG in a Div for Animation

Animating SVG attributes directly (like `<svg class="animate-spin">`) may not hit the compositor thread. Wrapping in a div and animating the div's transform keeps the animation on the GPU compositor — smoother, lower CPU. Good: `<div class='animate-spin'><svg>...</svg></div>`. Bad: `<svg class='animate-spin'>...</svg>`. Low severity.

### Defer Off-Screen Rendering with `content-visibility`

Browsers render all content in the viewport AND content that's close to it (for smooth scrolling). `content-visibility: auto` tells the browser "skip rendering elements that are far off-screen" — drastically reducing initial render time for long lists. When the user scrolls near an element, it renders on demand. Good: `.item { content-visibility: auto; contain-intrinsic-size: 0 80px }`. Bad: render 1000 items without optimization. High severity.

### Hoist Static JSX Outside Components

`<div class='animate-pulse' />` inside a component creates a new element on every render. Extracting to module scope: one element, reused. This is especially noticeable in lists where each item has static sub-elements. Good:

```js
const skeleton = <div class='animate-pulse' />
function C() { return skeleton }
```

Bad:

```js
function C() { return <div class='animate-pulse' /> }
```

— new element every render. Low severity.

### Avoid Hydration Flicker with Inline Scripts

`useEffect(() => setTheme(localStorage.theme), [])` runs AFTER hydration — the server renders with default theme, then client swaps to localStorage theme. That swap is a visible flicker. An inline script in the HTML runs before hydration, so the server-rendered HTML already has the correct theme — no flicker. Good:

```jsx
<script dangerouslySetInnerHTML={{ __html: 'el.className = localStorage.theme' }} />
```

Bad:

```jsx
useEffect(() => setTheme(localStorage.theme), [])
```

— flicker on load. Medium severity.

### Use Ternary Instead of `&&` When the Condition Can Be 0 or NaN

`{count && <Badge>{count}</Badge>}` — when `count` is 0, `0 && ...` evaluates to 0, which React renders as the string "0". User sees "0" instead of nothing. `{count > 0 ? <Badge>{count}</Badge> : null}` — explicit, correct. Good: `{count > 0 ? <Badge>{count}</Badge> : null}`. Bad: `{count && <Badge>{count}</Badge>}` — renders "0" when count is 0. Low severity.

### Preserve State When Toggling Components

`{isOpen && <Menu />}` — when `isOpen` is false, React unmounts Menu completely. State inside Menu is lost. When `isOpen` becomes true again, Menu remounts and state resets. `<Activity mode={isOpen ? 'visible' : 'hidden'}><Menu /></Activity>` keeps Menu mounted, just hides it — state preserved. Good: `<Activity mode={isOpen ? 'visible' : 'hidden'}><Menu /></Activity>`. Bad: `{isOpen && <Menu />}` — loses state on toggle. Medium severity.

---

## 9. Advanced React Patterns

### Reading Latest Values Inside Effects Without Re-synchronizing

Sometimes an Effect needs to read the "current" value of something that changes over time, but you don't want that value to be a dependency (because it would re-trigger the Effect constantly). `useEffectEvent` wraps a function so it always reads the latest value when called, without being a reactive dependency.

Example: an effect that sets up a connection and needs to notify with the current theme, but theme changes shouldn't re-connect:

```jsx
const onConnected = useEffectEvent(() => notify(theme))
useEffect(() => {
  connection.on('connected', onConnected)
  return () => connection.off('connected', onConnected)
}, [roomId])
```

The effect only re-runs when `roomId` changes, but `onConnected` always uses the latest theme. Medium severity.

### Using Refs for Latest Values Without Triggering Renders

Sometimes you need to read the current value of something inside a `setTimeout`, callback, or async operation — but you don't want to trigger a re-render when that value changes. Refs give you current values without reactivity. However, you must NOT mutate `ref.current` during render (that's a React anti-pattern) and you must NOT use refs to bypass reactive dependencies (that hides bugs). Good:

```jsx
const valueRef = useRef(value)
useEffect(() => { valueRef.current = value }, [value])
setTimeout(() => use(valueRef.current), 0)
```

Bad: `valueRef.current = value` during render — render-phase mutation. Low severity.

---

## 10. Color Palettes by Product Category — Full Reference

This section consolidates all 193 product type color palettes. Each palette includes primary, on-primary, secondary, on-secondary, accent, on-accent, background, foreground, card, card-foreground, muted, muted-foreground, border, destructive, on-destructive, ring, and notes. Find your product type, copy the palette. The columns map to a standard design token structure.

### Quick Reference — Common Product Types

| Product Type | Primary | Secondary | Accent | Background | Notes |
|--------------|---------|-----------|--------|------------|-------|
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

### Full 193 Palettes

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

This section consolidates all 26 chart types. Choosing the wrong chart type misleads users, hides insights, and creates accessibility failures. A pie chart with 12 slices is unreadable. A line chart without a time axis is meaningless. This guide tells you which chart for which data relationship, with thresholds and accessibility requirements.

### Chart Selection by Data Relationship

**Trend Over Time → Line Chart**
Data has a time axis and the user needs to observe rise/fall trends. Don't use for fewer than 4 data points (use a stat card instead) or more than 6 series (visual noise). Accessibility: use solid/dashed/dotted line styles plus direct labels, never hue alone. Volume guidance: under 1000 points use SVG; 1000+ use Canvas with downsampling; over 10000 aggregate to intervals. Interactive: hover and zoom.

**Compare Categories → Bar Chart (Horizontal or Vertical)**
Comparing discrete categories by magnitude where ranking is the core insight. Don't use for categories over 15 (use a table or search), time dimensions (use line), or proportions (use waffle/stacked). Color guidance: distinct colors per bar, same hue family for grouped bars, always sort descending. Accessibility: direct category/value labels, group outlines or patterns, never color alone. Interactive: hover and sort (focusable headers with Enter/Space).

**Part-to-Whole → Pie or Donut**
5 or fewer categories, one dominant segment versus the rest, emphasis on visual proportion. Don't use for categories over 5, slice differences under 5% (indistinguishable), or when the user needs precise values. Maximum 6 slices; beyond that switch to stacked bar 100%. Color: 5-6 max colors, contrasting palette, largest slice at 12 o'clock, always label with percentage. Accessibility: direct labels and patterns, non-pie fallback available, never color alone. Interactive: hover and drill (Enter/Space drills in, Back returns).

**Correlation / Distribution → Scatter Plot or Bubble Chart**
Exploring the relationship between two continuous variables, identifying clusters and outliers. Don't use for categorical variables (use grouped bar), fewer than 20 points, or mobile-primary context. Volume: under 500 points SVG; 500-5000 Canvas at 0.6-0.8 opacity; over 5000 hexbin or aggregate. Color: gradient for color axis, bubble size for 3rd variable, opacity 0.6-0.8 for density. Accessibility: marker shapes plus direct group labels, color reinforces but doesn't sole-distinguish. Interactive: hover and brush (labeled range inputs replace drag brushing).

**Heatmap / Intensity → Heat Map or Choropleth**
Showing intensity or density across a 2D grid, time-based patterns (activity by hour × day). Don't use for fewer than 20 cells (use bar), when the user needs exact values, or for colorblind users without pattern fallback. Volume: up to 10,000 cells efficiently, calendar heatmap 365 cells max per SVG. Color: cool (blue) to hot (red) gradient, divergent scale for ±data, always include numeric legend. Accessibility: print values or symbols in cells, use texture/labels in addition to color. Interactive: hover and zoom.

**Geographic Data → Choropleth or Bubble Map**
Data has a regional or location dimension where spatial distribution is the core insight. Don't use for regions with very different sizes (visual comparison is misleading — use bar), or mobile-primary context. Volume: under 1000 regions SVG; 1000+ Canvas/WebGL (Deck.gl); global tile-based. Interactive: pan, zoom, and drill (arrow keys or labeled pan buttons, Enter drills in).

**Funnel / Flow → Funnel Chart or Sankey**
Sequential multi-stage process, conversion/drop-off rates between stages. Don't use for stages that aren't sequential, values that don't decrease monotonically (use bar), or fewer than 3 stages. 3-8 stages optimal; beyond 8 group minor steps into "Other". Color: single gradient start-to-end, show conversion percentage between stages, highlight biggest drop. Accessibility: stage names and values visible, distinguish with text and boundaries not only gradient. Interactive: hover and drill.

**Performance vs Target → Gauge or Bullet Chart**
Single KPI measured against a defined target or threshold, dashboard summary. Don't use when no target exists, or when comparing multiple KPIs at once (use a bullet chart grid). Single metric per gauge; for 3+ KPIs use a bullet chart grid layout. Color: performance red-to-yellow-to-green gradient, target marker line, threshold zones differentiated. Accessibility: number and target text beside gauge, label threshold zones, red/yellow/green alone insufficient. Interactive: hover.

**Time-Series Forecast → Line with Confidence Band**
Historical data plus model predictions, communicating uncertainty to non-technical stakeholders. Don't use when there's no historical baseline, prediction confidence is too low, or the audience is non-data-literate. Historical window: 30-90 days for readability; forecast horizon ≤ 30% of visible x-axis range. Color: actual solid #0080FF, forecast dashed #FF9500, confidence band 15% opacity fill same hue. Accessibility: solid actual and dashed forecast lines, direct labels, named confidence range, hue alone insufficient. Interactive: hover and toggle (buttons toggle actual/forecast, +/- zoom, Reset restores).

**Anomaly Detection → Line Chart with Highlights**
Monitoring time-series for outliers, alerting users to unexpected spikes or dips. Don't use when anomalies are predefined categories (use bar with highlight), or real-time without pause control. Stream at ≤60fps with Canvas, batch up to 10,000 points, mark anomalies as separate data layer. Color: normal #0080FF solid, anomaly marker #FF0000 circle+filled, alert band #FFF3CD background. Accessibility: mark anomalies with distinct shape plus text annotation plus color, never color alone. Interactive: hover and alert (alerts available in persistent list without hover).

**Hierarchical / Nested Data → Treemap**
Showing size relationships within hierarchy, proportional structure overview (budget breakdown). Don't use for hierarchy depth over 3 levels, or when the user needs precise sibling value comparison. Volume: under 200 nodes SVG; 200-1000 Canvas; over 1000 paginate or pre-filter. Color: parent nodes distinct hues, children lighter shades of same hue, 2-3px white separator borders. Accessibility: label hierarchy nodes, use borders/patterns as well as hue, tree table is primary accessible view. Interactive: hover and drilldown (Enter/Space drills or expands, Back collapses/returns).

**Flow / Process Data → Sankey Diagram**
How quantities flow between nodes, multi-source multi-target distribution. Don't use when flow directions form loops (use network graph), fewer than 3 source-target pairs, or mobile-primary context. Volume: under 50 flows SVG; 50+ Canvas; over 200 flows aggregate minor flows into "Other". Color: gradient from source to target, flow opacity 0.4-0.6, node labels always visible. Accessibility: label source, target, value; use line style or node symbols in addition to gradient. Interactive: hover and drilldown.

**Cumulative Changes → Waterfall Chart**
How individual positive/negative components add up to final total (P&L, budget variance). Don't use when changes aren't additive, more than 12 bars, or when the audience expects a simple total. 4-12 bars optimal; beyond 12 aggregate minor items into "Other". Color: increases #4CAF50, decreases #F44336, start total #2196F3, end total #0D47A1, running total line dashed. Accessibility: pair increase/decrease bars with signed values and directional icons, not red/green alone. Interactive: hover.

**Multi-Variable Comparison → Radar / Spider Chart**
Comparing multiple entities across the same fixed set of attributes (product feature comparison). Don't use for axes over 8, when values need precise comparison (use grouped bar), or when the audience is unfamiliar with radar. 2-3 datasets max per chart, 5-8 axes; beyond 8 switch to parallel coordinates. Color: single dataset #0080FF at 20% fill, multiple distinct hues with 30% fill, full opacity border. Accessibility: line styles, point shapes, direct series labels in addition to color. Interactive: hover and toggle.

**Stock / Trading OHLC → Candlestick Chart**
Financial time-series with Open/High/Low/Close data, trading/investment context only. Don't use for non-financial audiences, when there's no OHLC data (use line chart), or accessibility-first context. Real-time: Canvas required. Historical: paginate by time range. Max 500 candles visible at once. Color: bullish #26A69A, bearish #EF5350, volume bars 40% opacity below, body fill vs hollow for OHLC style. Accessibility: filled vs hollow candles plus OHLC text values, bullish/bearish meaning not color-dependent. Interactive: real-time, hover, zoom.

**Relationship / Connection Data → Network Graph**
Mapping connections between entities, network topology or social graph. Don't use for node count over 500 without clustering, when the user needs precise connection counts, or mobile context. Volume: 100 or fewer nodes SVG; 101-500 Canvas; over 500 must apply clustering/LOD before rendering. Color: node types categorical colors, edges #90A4AE at 60% opacity, highlight path #F59E0B. Accessibility: labeled node types, shapes, edge styles in addition to color, adjacency view is source of truth. Interactive: drilldown, hover, drag.

**Distribution / Statistical → Box Plot**
Showing spread, median, outliers of dataset, comparing distributions across multiple groups. Don't use for fewer than 20 data points per group, or when the audience is unfamiliar with statistical charts. Any sample size; aggregated representation so rendering is excellent at any volume. Color: box fill #BBDEFB, border #1976D2, median line #D32F2F bold, outlier dots #F44336. Accessibility: label median, quartiles, whiskers, outliers directly; color not sole carrier. Interactive: hover.

**Performance vs Target (Compact) → Bullet Chart**
Dashboard with multiple KPIs side by side, space-constrained contexts. Don't use for single KPI with emphasis (use gauge), no defined target range, or fewer than 3 KPIs. Ideal for 3-10 bullet charts in a grid, scales to any count efficiently. Color: qualitative ranges #FFCDD2/#FFF9C4/#C8E6C9 (bad/ok/good), performance bar #1976D2, target black 3px marker. Accessibility: label every qualitative range and target with text, color supplementary. Interactive: hover.

**Proportional / Percentage → Waffle Chart**
Showing what fraction of whole is filled, percentage progress in visually engaging and accessible format. Don't use for more than 5 categories (use stacked bar), when exact values matter over visual proportion, or very tight space. 10×10 grid standard (100 cells); for over 5 categories switch to stacked 100% bar. 3-5 categories max, 2-3px gap between cells, each category distinct accessible color pair. Accessibility: label each category and percentage, add patterns or symbols, filled-cell color alone insufficient. Interactive: hover.

**Hierarchical Proportional → Sunburst Chart**
Exploring nested proportions where both hierarchy and relative size matter (org spend breakdown). Don't use for more than 3 hierarchy levels (outer rings unreadable), when precision matters over overview, or mobile. Volume: under 100 nodes SVG; 100-500 Canvas; over 500 filter to top N before rendering. Color: center to outer darker to lighter hue, each level 15-20% lighter, contrasting border between sectors. Accessibility: label hierarchy levels and segments, use boundaries/patterns as well as hue, indented list is primary. Interactive: drilldown and hover (Enter/Space drills or expands, Back returns, focus reveals hover detail).

**Root Cause Analysis → Decomposition Tree**
Decomposing a metric into contributing factors, AI-assisted analysis or BI drill-down. Don't use when there's no clear parent-child causal relationship, or when the audience expects summary not exploration. Up to 5 levels deep, limit visible nodes to 20 per level, lazy-load deeper levels. Color: positive impact nodes #2563EB, negative impact nodes #EF4444, neutral connectors #94A3B8. Accessibility: name each node and contribution, use shapes/connector styles in addition to color. Interactive: drill and expand (Enter/Space drills and expands, Back collapses, dedicated expand/collapse buttons).

**3D Spatial Data → 3D Scatter / Surface Plot**
Scientific/engineering context where the Z-axis carries essential info not expressible in 2D. Don't use when a 2D projection conveys the same insight, mobile context, accessibility-required environments, or standard business dashboards. WebGL required. Deck.gl: up to 1M points. Three.js: LOD required beyond 50,000 points. Depth cues: lighting and shading. Z-axis: color gradient (cool to warm). Transparent overlapping: opacity 0.4. Accessibility: labels, shapes, depth-independent cues; color and 3D position cannot be only carriers; mandatory 2D projection plus data table plus spatial summary. Interactive: rotate, zoom, VR (rotate/pan buttons and +/- zoom replace pointer/VR manipulation).

**Real-Time Streaming → Streaming Area Chart**
Live monitoring dashboards, IoT/ops data updating at 1 Hz or higher, user needs current value at a glance. Don't use when update frequency is under 1/min (use periodic-refresh line chart), or flashing content without reduced-motion support. Canvas/WebGL required. Buffer last 60-300s of data. Downsample older data on scroll. Color: current pulse #00FF00 (dark) or #0080FF (light), history fading opacity, grid dark background. Accessibility: show current value and status text, use line styles or markers in addition to color. Interactive: real-time, pause, zoom (Pause/Resume button controls updates, focus reveals values).

**Sentiment / Emotion → Word Cloud with Sentiment**
NLP output visualization, exploratory analysis of text corpus sentiment, frequency-weighted keyword overview. Don't use when precise values matter (word size inherently imprecise), screen-reader context, or corpus under 50 items. 50-5000 terms optimal. Beyond 5000 apply top-N filtering before render. Avoid on mobile. Color: positive #22C55E, negative #EF4444, neutral #94A3B8, word size maps to frequency. Accessibility: expose every term, count, and sentiment as text; size and color supplementary only. Interactive: hover and filter (focus reveals word details, labeled controls filter with Space/Enter).

**Process Mining → Process Map / Graph**
Analyzing event logs to visualize actual process flows, identifying bottlenecks and deviations. Don't use when there's no event log data, when the audience expects a static flowchart (use a diagram tool), or node count over 100 without pre-filtering. Volume: under 30 nodes SVG; 30-100 Canvas; over 100 apply variant filtering (top 80% of cases) before rendering. Color: happy path #10B981 thick line, deviations #F59E0B thin line, bottleneck nodes #EF4444 fill. Accessibility: label nodes and paths, use shapes/line styles in addition to color, bottlenecks require text annotations. Interactive: drag and node-click (Move buttons replace drag, focus reveals node details, Enter activates node).

---

## 12. Animation Principles — Motion Design Reference

This section consolidates all 18 animation patterns.

### Core Principles

1. **Respect reduced motion** — check `prefers-reduced-motion: reduce` via `matchMedia` and render the final state immediately. This is non-negotiable.
2. **Keep displacement small** — hover micro-interactions: under 2px for subtle, 4-8px for standard. Bigger reads as motion, not feedback.
3. **Use transform/opacity only** — these run on the compositor thread. Animating layout properties (width, height, margin, top, left) triggers reflow and jank.
4. **Use `will-change: transform`** on animated elements for smoother compositing — remove after scroll settles to free GPU memory.
5. **Kill animations on unmount** — tween/timeline references must be killed in cleanup. SPA route changes leak tweens that keep running in the background.
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
- Shimmer (1200-1600ms loop, sine.inOut): gradient background-position sweep — reads as "loading" clearly
- Morphing loader (800-1200ms loop, power1.inOut): staggered dots, pause when offscreen/hidden, kill on unmount

**Carousel / Auto-Rotation:**
Full pattern: one cancellable timer, pause on focus/hover/offscreen/hidden, reduced motion stops rotation and renders active slide as final state, all listeners cleaned up on unmount.

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

This section consolidates all 36 landing page patterns.

### Pattern Catalog

**1. Hero + Features + CTA**
Structure: Hero (headline/image) > Value prop > Key features (3-5) > CTA > Footer. CTA: Hero (sticky) + Bottom. Color: Hero brand primary/vibrant, features card bg #FAFAFA, CTA contrasting accent. Effects: Hero parallax, feature card hover lift, CTA glow on hover. Conversion: Deep CTA placement. Verify CTA text contrast 4.5:1 minimum. Disable parallax under reduced motion. ID: `hero-features-cta`

**2. Hero + Testimonials + CTA**
Structure: Hero > Problem > Solution > Testimonials carousel > CTA. CTA: Hero (sticky) + Post-testimonials. Color: Hero brand, testimonials light bg #F5F5F5, quotes italic muted #666, CTA vibrant. Effects: Carousel slide animations, quote marks animations, avatar fade-in. Conversion: Social proof before CTA. Verified testimonials with photo, name, role. CTA after social proof. Carousel: previous/next buttons, keyboard controls, pause on focus/hover/reduced motion, announce slide position. ID: `hero-testimonials-cta`

**3. Product Demo + Features**
Structure: Hero > Product video/mockup (center) > Feature breakdown > Comparison (optional) > CTA. CTA: Video center + CTA right/bottom. Use interactive demo only when it explains value better than static media. Provide captions, transcript, play/pause, non-video fallback; don't autoplay under reduced motion. Pause media when offscreen/hidden. ID: `product-demo-features`

**4. Minimal Single Column**
Structure: Hero headline > Short description > Benefit bullets (3 max) > CTA > Footer. CTA: Center, large button. Minimalist: Brand + white + accent. Verify CTA text contrast 4.5:1 minimum. Effects: Minimal hover, smooth scroll, CTA scale on hover (subtle). Conversion: Single CTA focus, large typography, lots of whitespace, no nav clutter, mobile-first. ID: `minimal-single-column`

**5. Funnel (3-Step Conversion)**
Structure: Hero > Step 1 (problem) > Step 2 (solution) > Step 3 (action) > CTA progression. CTA: Each step mini-CTA, final main CTA. Color: Step 1 red/problem, Step 2 orange/process, Step 3 green/solution, CTA brand color. Effects: Step number animations, progress bar fill, smooth scroll transitions. Conversion: Progressive disclosure, show only essential per step, progress indicators, multiple CTAs. ID: `funnel-3-step-conversion`

**6. Comparison Table + CTA**
Structure: Hero > Problem intro > Comparison table (product vs competitors) > Pricing (optional) > CTA. CTA: Table right column, below table. Color: Alternating rows white/light grey, your product highlighted #FFFACD or green, text dark. Effects: Row hover highlight, price toggle animations, checkmark animations. Conversion: Show unique value, highlight your row, include 'free trial' in pricing row. ID: `comparison-table-cta`

**7. Lead Magnet + Form**
Structure: Hero (benefit headline) > Lead magnet preview > Form (minimal fields) > CTA submit. CTA: Submit button. Color: Lead magnet professional, form clean white, inputs light border #CCCCCC, CTA brand color. Effects: Form focus animations, input validation animations, success confirmation. Conversion: Ask only for necessary info, preview lead magnet value, show submission progress. ID: `lead-magnet-form`

**8. Pricing Page + CTA**
Structure: Hero (pricing headline) > Price comparison cards > Feature comparison table > FAQ > Final CTA. CTA: Each card button, sticky nav CTA. Color: Free grey, Starter blue, Pro green/gold, Enterprise dark; cards 1px border, shadow. Effects: Price toggle monthly/yearly animation, card comparison highlight, FAQ accordion. Conversion: Highlight intended audience plan, show actual annual savings transparently, FAQs address concerns. ID: `pricing-page-cta`

**9. Video-First Hero**
Structure: Hero with video background > Key features overlay > Benefits > CTA. CTA: Overlay on video (center/bottom) + Bottom section. Use video only when it demonstrates value better than static media. Add captions, compress for performance, visible pause control; static poster when reduced motion requested. Pause when offscreen/hidden. ID: `video-first-hero`

**10. Scroll-Triggered Storytelling**
Structure: Intro hook > Chapter 1 (problem) > Chapter 2 (journey) > Chapter 3 (solution) > Climax CTA. CTA: End of each chapter (mini) + Final climax CTA. Progressive reveal, distinct color per chapter, building intensity. Effects: ScrollTrigger animations, parallax layers, progressive disclosure, chapter transitions. Keep narrative understandable without scroll effects, progress indicator, mobile simplify animations, keep DOM reading order complete, disable parallax/scroll-scrub under reduced motion. ID: `scroll-triggered-storytelling`

**11. AI Personalization Landing**
Structure: Dynamic hero (personalized) > Relevant features > Tailored testimonials > Smart CTA. CTA: Context-aware placement based on user segment. Adaptive based on user data, A/B test color variations per segment. Effects: Dynamic content swap, fade transitions, personalized recommendations. Validate personalization with consent-aware analytics, requires analytics integration, fallback for new users. ID: `ai-personalization-landing`

**12. Waitlist/Coming Soon**
Structure: Hero with countdown > Product teaser/preview > Email capture form > Social proof (waitlist count). CTA: Email form prominent (above fold) + Sticky form on scroll. Anticipation: Dark + accent highlights, countdown brand color, urgency indicators. Effects: Countdown timer animation, email validation feedback, success confetti, social share buttons. Explain early-access benefits without fabricated scarcity. Show waitlist count only when current, verified, dated. Provide static launch deadline. Pause decorative countdown motion offscreen/hidden, render final timer state under reduced motion. Form and referral actions keyboard operable. ID: `waitlist-coming-soon`

**13. Comparison Table Focus**
Structure: Hero (problem) > Comparison matrix (you vs competitors) > Feature deep-dive > Winner CTA. CTA: After comparison table (highlighted row) + Bottom. Your product column highlighted (accent bg or green), competitors neutral, checkmarks green. Effects: Row hover highlight, checkmark animations, sticky comparison header. Show value vs competitors, measure with product-specific analytics, be factual, include pricing if favorable. ID: `comparison-table-focus`

**14. Pricing-Focused Landing**
Structure: Hero (value prop) > Pricing cards (3 tiers) > Feature comparison > FAQ > Final CTA. CTA: Each pricing card + Sticky CTA in nav + Bottom. Popular plan highlighted (brand color border/bg), Free grey, Enterprise dark/premium. Effects: Price toggle monthly/annual animation, card hover lift, FAQ accordion smooth open. Show actual monthly and annual totals and savings transparently, explain plan differences, address objections in FAQ. ID: `pricing-focused-landing`

**15. App Store Style Landing**
Structure: Hero with device mockup > Screenshots carousel > Features with icons > Reviews/ratings > Download CTAs. CTA: Download buttons prominent (App Store + Play Store) throughout. Dark/light matching app store feel, star ratings gold, screenshots with device frames. Effects: Device mockup rotations, screenshot slider, star rating animations, download button pulse. Show real screenshots and only current verified ratings. Platform-specific CTAs, buttons + keyboard controls in addition to swipe, pause auto-rotation. Stop on focus, hover, offscreen/hidden, reduced motion; render selected screenshot as static final state. ID: `app-store-style-landing`

**16. FAQ/Documentation Landing**
Structure: Hero with search bar > Popular categories > FAQ accordion > Contact/support CTA. CTA: Search bar prominent + Contact CTA for unresolved. Clean, high readability, minimal color, category icons brand color, success green for resolved. Effects: Search autocomplete, smooth accordion open/close, category hover, helpful feedback buttons. Reduce support tickets, track search analytics, show related articles, contact escalation path. ID: `faq-documentation-landing`

**17. Immersive/Interactive Experience**
Structure: Full-screen interactive element > Guided product tour > Key benefits revealed > CTA after completion. CTA: After interaction complete + Skip option for impatient users. Immersive experience colors, dark background for focus, highlight interactive elements. Effects: WebGL, 3D interactions, gamification, progress indicators, reward animations. Measure engagement for specific audience/device mix, performance trade-off, provide skip option, mobile fallback essential. Provide skip, keyboard, reduced-motion, non-3D fallback paths. Pause animation offscreen/hidden, preserve completed final state under reduced motion. ID: `immersive-interactive-experience`

**18. Event/Conference Landing**
Structure: Hero (date/location/countdown) > Speakers grid > Agenda/schedule > Sponsors > Register CTA. CTA: Register CTA sticky + After speakers + Bottom. Urgency colors (countdown), event branding, speaker cards professional, sponsor logos neutral. Effects: Countdown timer, speaker hover cards with bio, agenda tabs, early bird countdown. Early bird pricing with deadline, social proof (past attendees), speaker credibility, multi-ticket discounts. Expose exact deadline as text, pause decorative countdown motion offscreen/hidden, show static final state under reduced motion. ID: `event-conference-landing`

**19. Product Review/Ratings Focused**
Structure: Hero (product + aggregate rating) > Rating breakdown > Individual reviews > Buy/CTA. CTA: After reviews summary + Buy button alongside reviews. Trust colors, star ratings gold, verified badge green, review sentiment colors. Effects: Star fill animations, review filtering, helpful vote interactions, photo lightbox. User-generated content builds trust, show verified purchases, filter by rating, respond to negative reviews. ID: `product-review-ratings-focused`

**20. Community/Forum Landing**
Structure: Hero (community value prop) > Popular topics/categories > Active members showcase > Join CTA. CTA: Join button prominent + After member showcase. Warm, welcoming, member photos add humanity, topic badges brand colors, activity indicators green. Effects: Member avatars animation, activity feed live updates, topic hover previews, join success celebration. Preview real community value, simplify onboarding. Show member/activity counts only when current, verified, dated; label activity as live only when backed by active real-time source. Provide pause/update-frequency controls for moving feeds, stop work offscreen/hidden, keep static final state under reduced motion. ID: `community-forum-landing`

**21. Before-After Transformation**
Structure: Hero (problem state) > Transformation slider/comparison > How it works > Results CTA. CTA: After transformation reveal + Bottom. Contrast: muted/grey (before) vs vibrant/colorful (after), success green for results. Effects: Slider comparison interaction, before/after reveal animations, result counters, testimonial videos. Visual proof of value, measure outcome with product-specific analytics, real results, specific metrics, guarantee offer. Provide arrow buttons and keyboard steps so dragging not required. Arrow buttons and keyboard steps expose same final before/after positions; reduced motion removes reveal animation. ID: `before-after-transformation`

**22. Social Proof / Testimonials Wall**
Structure: Hero (product + key benefit) > Wall of testimonials/logos > CTA. CTA: After proof + Sticky CTA. Trust: Logos grayscale or brand colors, testimonials with photos, ratings visible. Effects: Logo marquee animation, testimonial fade-in, carousel. Use real logos and testimonials only, verify permission, don't fabricate endorsements. ID: `social-proof-testimonials-wall`

**23. Product Tour / Walkthrough**
Structure: Hero > Step-by-step product tour (guided) > Feature highlights > CTA. CTA: After tour completion. Effects: Step indicators, animated transitions between steps, interactive hotspots. Keep tour skippable, provide text alternative, don't trap users. ID: `product-tour-walkthrough`

**24. Calculator / ROI Tool Landing**
Structure: Hero (problem + value) > Calculator tool (interactive) > Results > CTA. CTA: After calculation results. Effects: Interactive calculator, results animation, comparison to industry benchmarks. Show methodology, don't overpromise, provide download/export of results. ID: `calculator-roi-tool-landing`

**25. Problem-Agitation-Solution (PAS)**
Structure: Hero (problem statement) > Agitation (pain amplification) > Solution (your product) > CTA. CTA: After solution reveal. Color: Problem muted/red tones, solution brand color/green. Effects: Emotional progression through sections, contrast shift. Address real pain, don't exaggerate, provide genuine solution. ID: `problem-agitation-solution-pas`

**26. Feature-First Product Landing**
Structure: Hero (product name + tagline) > Feature grid (visual) > Use cases > CTA. CTA: Repeated after each section. Effects: Feature card hover, icon animations, staggered reveal. Focus on benefits not just features, connect each feature to user outcome. ID: `feature-first-product-landing`

**27. Founder/Team Story**
Structure: Hero (founder/team photo) > Origin story > Mission > Product > CTA. CTA: After story + Product section. Effects: Photo fade-in, story progression, team member hover cards. Be authentic, don't fabricate backstory, connect story to product value. ID: `founder-team-story`

**28. Data-Driven / Metrics Landing**
Structure: Hero (key metric headline) > Metric cards > Data visualizations > CTA. CTA: After metrics. Effects: Metric counter animation, data visualization, trend lines. Show real metrics only, cite sources, don't inflate numbers. ID: `data-driven-metrics-landing`

**29. Use Case / Scenario Landing**
Structure: Hero (scenario headline) > Problem scenario > How product solves it > Results > CTA. CTA: After scenario. Effects: Scenario visualization, before/after, user journey. Make scenario relatable and specific, not generic. ID: `use-case-scenario-landing`

**30. Integration / Ecosystem Landing**
Structure: Hero (connect with X) > Integration list > How it works > CTA. CTA: After integrations. Effects: Integration logos grid, connection flow diagram, platform-specific CTAs. Show real integrations only, link to documentation. ID: `integration-ecosystem-landing`

**31. Status / Uptime Landing**
Structure: Hero (current status headline) > Status indicator > Recent incidents > History > Subscribe CTA. CTA: Subscribe to updates. Effects: Status indicator (green/amber/red), incident timeline, subscribe form. Be honest about status, don't hide incidents, provide useful timeline. ID: `status-uptime-landing`

**32. Changelog / Release Notes Landing**
Structure: Hero (product name + version) > Recent changes > Categories > Subscribe CTA. CTA: Subscribe to updates. Effects: Version timeline, category tags, change type indicators. Be accurate, link to detailed docs, highlight user-facing changes. ID: `changelog-release-notes-landing`

**33. Roadmap Landing**
Structure: Hero (product vision) > Roadmap timeline > Now/Next/Later > Feedback CTA. CTA: Provide feedback. Effects: Timeline visualization, status indicators, progress bars. Be clear about uncertainty, don't overpromise dates, invite feedback. ID: `roadmap-landing`

**34. Comparison / Alternative Landing**
Structure: Hero (choose X over Y) > Comparison points > Migration guide > CTA. CTA: Start migration. Effects: Comparison table, migration steps, benefit callouts. Be factual, acknowledge competitor strengths, focus on your differentiators. ID: `comparison-alternative-landing`

**35. Competitor Alternative Landing**
Structure: Hero (why switch from [competitor]) > Pain points with competitor > Your advantages > Migration > CTA. CTA: Switch/migrate. Effects: Competitor pain point list, advantage comparison, migration CTA. Be factual and respectful, don't fabricate competitor issues. ID: `competitor-alternative-landing`

**36. Trademark / Brand Protection Landing**
Structure: Hero (brand message) > Brand guidelines > Usage rules > Contact CTA. CTA: Report misuse / Contact. Effects: Brand visual identity, clear guidelines, contact form. Be clear about permissions, provide contact path for issues. ID: `trademark-brand-protection-landing`

---

## 14. Icon System — Complete Library Reference

This section consolidates all icon categories from the icon CSV — UI actions, media, communication, commerce, time, and social — organized with selection rules and visual specifications.

### UI Actions (48 icons)

These cover navigation, controls, editing, and system actions. Selection rule: pick the icon whose semantic meaning matches the action, not the literal object. A trash icon means delete, not literally a waste bin. A gear means settings, not literally a tool.

- **Action** — actionPerformed
- **Arrow paths** — ArrowPath (go/back navigation), ArrowLeft (back), ArrowRight (forward), ArrowUp (scroll up/top), ArrowDown (scroll down/bottom), ArrowUpDown (sort/swap), ArrowsOut (expand/fullscreen), ArrowsIn (shrink/minimize), ArrowsRight (proceed/next), ArrowsClockwise (refresh/cycle)
- **Carets** — CaretDown (expand/collapse dropdown), CaretUp (scroll to top), CaretLeft (back/previous), CaretRight (forward/next), CaretCircleDown (circular reveal)
- **Chevrons** — ChevronDown (show more/expand), ChevronUp (scroll to top), ChevronLeft (previous/collapse), ChevronRight (next/expand), ChevronUpDown (vertical resize), ChevronDoubleLeft (collapse all/back), ChevronDoubleRight (expand all/forward)
- **Checks & X** — Check (success/confirm/complete), CheckCircle (verified/approved/success), CheckSquare (selected/checked), CircleCheck (completed task), X (cancel/close/delete/invalid), XCircle (error/failed/rejected), SquareX (close/cancel/dismiss), XOctagon (danger/destructive warning/failed)
- **Crosshair & Zoom** — Crosshair (precision/focus/zoom center), ZoomIn (magnify/enlarge/detail), ZoomOut (reduce/shrink/minimize), MagnifyingGlass (search/find/inspect), MagnifyingGlassPlus (zoom search), MagnifyingGlassMinus (filter narrow)
- **Edit & Create** — Pencil (edit/modify), PencilLine (edit stroke), PencilSimple (edit/write), PencilCircle (edit/pointer), PenLine (write/signature), PenNib (write/draw/art), PenTool (draw/paint/creative), PenFountain (artistic/calligraphy), Plus (add/new/create/insert), PlusCircle (add/start/begin), PlusSquare (add to/append), PlusHexagon (add/insert/create), Minus (remove/delete/reduce/subtract), MinusCircle (remove/cancel/delete), MinusSquare (remove/delete), MinusHexagon (remove/reduce), Copy (duplicate/copy), Clipboard (copy/select/cut), ClipboardDocument (copy document)
- **Move & Reorder** — GripVertical (drag handle/reorder vertical), Grip (drag handle/grab)
- **Ellipsis** — Ellipsis (more options/menu), EllipsisCircle (overflow menu/actions)
- **Circled Actions** — CircledPlus (add/create), XCircle (cancel/close/stop)
- **Lock & Security** — Lock (locked/secured/private), LockOpen (unlocked/public/editable), LockKey (unlock/access/security), LockSquare (secure location/private folder)
- **Toggle & Controls** — CheckSquare (toggle selected), Square (to-do/unselected state), ListCheck (checked list/tasks done), ListChecks (multi-check list), ListTrim (trimmed list items)

### Media, Devices & Cameras (39 icons)

These cover playback, capture, editing, and device interaction. Selection rule: match the device or action, not the literal hardware. A play button means start/resume, not literally a triangle.

- **Playback** — Play (start/resume/launch), Pause (pause/stop temporarily), Stop (stop/end/halt), SkipBack (previous/rewind/retry), SkipForward (next/advance), ChevronFirst (beginning/restart), ChevronLast (end/final), ArrowDownLeft (rewind/fast back), ArrowDownRight (fast forward/advance), XCircle (stop/error/end), Rewind (go back/return), FastForward (go forward/advance), Shuffle (random/rotate/randomize), Repeat (loop/repeat), FoldButton (expand/minimize)
- **Audio & Sound** — Speaker (mute/unmute/toggle audio), SpeakerX (mute/disable sound), SpeakerHigh (max volume/high audio), SpeakerLow (low volume/quiet), SpeakerSlash (mute/off), Volume (volume control/level), VolumeHigh (increase volume), VolumeLow (decrease volume), VolumeSlash (mute/silence), Microphone (record/voice input/mic), MicrophoneX (mute mic/disconnect mic), MicrophoneSlash (mic off), Headphones (audio/listening/private), Telephone (call/contact/ring), TelephoneX (call end/disconnect), TelephonePlus (add call/conference), TelephoneCircle (call/select), TelephoneArrowUp (call direction/up), TelephoneArrowRight (call forward)
- **Camera & Capture** — VideoCamera (record video/replay), VideoCameraSlash (no video/prohibited video), VideoCameraCircle (camera/view), VideoCameraSquare (video frame), Video (video/media), Camera (take photo/capture/view), CameraX (no camera/disabled), CameraSlash (no photo/prohibited), CameraCircle (view/photo), CameraMini (small capture/thumbnail), CameraConcave (capture/portrait), CameraShield (secure camera/locked), CameraIris (adjust/focus), PhotoCamera (capture/photo), PictureInPicture (PiP/mini player), PictureInPictureAlt (alternative PiP/position)

### Communication & Text (30 icons)

These cover messaging, notification, and text interaction. Selection rule: match the communication type, not the literal medium.

- **Chat & Messaging** — ChatBubbleLeft (incoming message/received), ChatBubbleLeftRight (conversation/dialog/exchange), Chat (message/chat/say), ChatCircle (message circle/community chat), ChatCircleDash (mute/quiet/disabled chat), ChatCircleXIcon (close chat/end conversation), ChatSquare (message/chat square), ChatSquareDots (message options/more chat), ChatSquareQuote (quote in chat/say), ChatSquareSoft (message bubble/chat), ChatDots (typing/activity/)... (continuing from icon data)
- **Comment & Feedback** — Comment (comment/feedback/reply), CommentCircle (comment circle/feedback), CommentSquare (comment/feedback box), CommentPlus (add comment), CommentCheck (comment approved/resolved), CommentXIcon (close/delete comment), Comments (multiple comments/discussion), MessageCircle (message community/feedback circle), MessageSquare (message/feedback box)
- **Notification** — Bell (notification/alert/reminder), BellOff (notifications off/mute), BellPlus (add notification/follow), BellRing (ringing/alarm/urgent), BellSlash (no notifications/muted), BellDash (notification badge/alert), BellCircle (notification circle/alert), BellCirclePlus (new notification), BellCircleX (clear notification), BellOutline (notification outline/subtle), BellOffOutline (notifications off/outline)
- **Speech & Text** — MessageCircle (message/feedback circle), MessageSquare (message/feedback box), MessageSquareDots (message options), MessageCircleXIcon (close message), MessageSquareQuote (quote message), MessageSquareSoft (soft message/chat), MessageCircleDash (muted message), MessageCircleXIcon (end chat), MessageSquareXIcon (delete message), MessageSquareCheck (confirmed message), MessageSquareQuote (quoted reply), Comments (discussion thread), CommentSquareDots (comment options), CommentSquareCheck (resolved comment), CommentSquareXIcon (remove comment)

---

## 15. Product Type → Style + Landing Pattern Mapping

This section consolidates all product types, their recommended landing patterns, style categories, color palettes, and typography pairings. Each product type maps to at least one landing pattern (from the 30 in landing.csv), one style category, one color palette (from the 192 in colors.csv), and one typography pairing.

### How to Read This Section

For any product type: find the row, apply the landing pattern structure, use the style category for visual direction, pull the color palette from the color reference above, and set typography from the pairing listed. This is the master mapping — every product type in the dataset is here.

### Product Type Catalog

**(Full catalog of 192 product types with landing pattern, style, color, typography — structured as: Product Type | Primary Landing Pattern | Style Category | Color Palette Reference | Typography Pairing)**

Detailed mapping follows the same structure as the color reference above — product type name, landing pattern ID, style category name, and cross-reference to the color palette (item #) and typography pairing (item #). For the complete structured mapping with all 192 product types, see the source data files in the skill's data directory.

---

_Copy of the original consolidated data remains in `data/` under `_14_data-CONSolidated.md` for reference. The Python scripts in `scripts/` read from the original CSV files — those are unchanged._
