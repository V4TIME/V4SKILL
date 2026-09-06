---
name: motion-craft-kit
version: 1.0.0
author: iart-ai (github.com/iart-ai/motion-skills) — consolidated & rewritten by V4TIME
license: MIT
platforms:
  - Claude Code
  - Cursor
  - Codex
  - any agent that reads SKILL.md
description: >
  One consolidated skill packing 51 motion-graphics workflows from 14 open-source
  packs (github.com/iart-ai/motion-skills, MIT) — short-form video, kinetic
  typography, data-driven charts, explainers, TikTok/Reels, WebGL/Three.js,
  Manim math animation, web motion (GSAP/Framer/Lottie/SVG), freelance business
  tools, and brand motion systems. Reorganized by workflow, explanations rewritten,
  order shuffled. Install any original pack separately via `npx skills add
  iart-ai/<pack>` or this skill for the full reference.
tags:
  - motion
  - animation
  - video
  - kinetic-typography
  - gsap
  - framer-motion
  - lottie
  - threejs
  - webgl
  - glsl
  - manim
  - remotion
  - after-effects
  - explainer-video
  - tiktok
  - reels
  - data-visualization
  - chart-animation
  - freelance
  - brand-motion
related_skills:
  - webmxerz
  - infographic-generator
  - design-tokens-spec
  - svg-arch-diagram
---

# Motion Craft Kit

> **Source:** github.com/iart-ai/motion-skills — 14 open-source packs, 51 skills, MIT license.
> This is a single consolidated reference. The original 14 packs install separately via
> `npx skills add iart-ai/<pack-name>` or as Claude Code plugins. This skill covers the
> full domain so you have the map in one place.

---

## INFO

| | |
|---|---|
| **Repository** | `iart-ai/motion-skills` (upstream, MIT) |
| **Consolidated by** | V4TIME — V4SKILL |
| **What it is** | 51 motion-graphics/animation/video skills for AI coding agents, reorganized |
| **Format** | Reference skill — reads like a handbook, one SKILL.md |
| **Install original packs** | `npx skills add iart-ai/tiktok-video-skills` etc. |
| **When to use** | Any request involving motion graphics, animation, video production, web motion, data viz, 3D/WebGL, math animation, or freelance motion business |

---

## Main Theme

**Teach an AI coding agent to produce motion graphics, animation, and video across the entire pipeline** — from a hook-driven TikTok clip to a WebGL shader background, from a narrated explainer to a brand motion system document. The collection covers 14 domains, each with its own installable pack, and shares a common structure: each skill is a self-contained `SKILL.md` + `references/` folder that teaches one workflow. Skills that produce a visual artifact ship a deliver-and-verify loop plus a small `scripts/` toolkit.

The throughline: **motion as craft, not magic.** Every pack is grounded in real production technique — timing/easing principles, frame-accurate cuts, beat sync, 60fps discipline, platform specs, accessibility — not just "make it animate."

---

## Main Key Themes

1. **Short-form vertical video is a distinct grammar.** Hooks, pattern interrupts, pacing, retention editing, word-timed captions, lower thirds, countdown timers — 9:16 is its own language, not just "video turned sideways."

2. **Data drives the motion.** Chart races, count-up tickers, animated infographics, wrapped-style recaps, ad creative batched from CSV — the motion is a function of the numbers, rendered exact on every frame.

3. **Kinetic typography is text-as-motion.** Character/word/line staggers, split-text reveals, variable-font weight transitions, text on a path, lyric/title cards — text doesn't sit still, it performs.

4. **Web motion lives or dies on 60fps and accessibility.** Animate only `transform`/`opacity`, kill layout thrash, respect `prefers-reduced-motion` with tiered degradation, page transitions in Next.js App Router, micro-interactions, SVG stroke draws, Lottie playback.

5. **3D/WebGL is a separate track.** GLSL fragment shaders, Three.js/R3F scenes, particle systems — GPU-bound, leak-conscious, deployed as backgrounds and effects, not as the whole product.

6. **Math animation is its own craft.** Manim CE — scenes, mobjects, LaTeX morphs, ValueTrackers, 3D moving camera — for 3Blue1Brown-style educational videos and equation visualizations.

7. **Editorial map animation is geography-as-storytelling.** Camera zooms, drawn-on routes, dropped pins, region highlights, the 12fps stutter — Vox-style, from Google Earth Studio or GeoJSON/SVG.

8. **Brand motion is a system, not a one-off.** Easing/timing tokens, motion libraries, logo rules, accessibility standards — authored once, referenced everywhere.

9. **Freelance motion is a business.** Briefs, pricing, revision caps, delivery specs, brand motion guidelines — the back-office that keeps a motion designer or studio solvent.

10. **Every visual skill ships a verify loop.** Freeze a frame, tile a contact sheet, probe the encoded MP4 — the agent confirms its own output before handing back. Web skills render standalone HTML; video skills render via Remotion or Manim.

---

## The 51 Skills — Consolidated, Reordered, Rewritten

Organized by workflow, not by original pack. Order is shuffled. Explanations for roughly half are rewritten from scratch; the rest are condensed from the original README descriptions.

---

### A. Short-Form Vertical Video (TikTok / Reels / Shorts)

#### 1. short-form-video
**What it does:** The structural grammar of vertical 9:16 video — hooks that survive the swipe, pattern interrupts that reset attention, pacing that holds retention, and repeatable template structures you can re-skin. Teaches the first-3-seconds problem as a design constraint, not a vague feeling.

**When it activates:** Making a Reel/TikTok/Shorts, building a reusable short-form template, editing for retention, fixing weak openers, tightening pacing, making a seamless loop.

#### 2. caption-animation
**What it does:** Word-timed karaoke-style captions from a transcript or voiceover — per-word pop timing, active-word highlight, safe-area placement so captions never collide with platform UI. Renders burn-in captions or gives you the timed word array to feed another renderer.

**When it activates:** Turning a voiceover into Hormozi-style word-by-word captions, burning subtitles onto a clip, adding animated captions to a Reel.

#### 3. countdown-video
**What it does:** Frame-accurate, drift-free countdown timers with digit flip/roll motion and a configurable duration — "starting soon" screens, launch/sale countdowns, animated counters that land on zero at the exact right frame. Solved against the drift problem that breaks most naive timer implementations.

**When it activates:** Building a countdown timer, "starting soon" screen, launch countdown, animated counter that must end on zero.

#### 4. lower-thirds
**What it does:** Clean, branded name/role lower thirds with staged enter/exit animation — templated so you can run a whole roster through the same look with different names. Includes safe-area placement and brand lock (colors, typeface, logo placement).

**When it activates:** Creating animated lower thirds, name tags, speaker overlays, broadcast-style titles across a list of people.

#### 5. text-message-animation
**What it does:** Animates a chat conversation — bubbles pop in one at a time, typing indicators pulse, send sounds land on the beat, the thread auto-scrolls — across iMessage/WhatsApp/SMS aesthetics, rendered from a messages array or CSV so one template produces endless videos.

**When it activates:** Making a fake text message video, iMessage story, WhatsApp/SMS conversation clip, chat reply animation, batching text-message videos from a CSV.

---

### B. Podcast / YouTube / Long-Form

#### 6. audiogram
**What it does:** Turns a podcast clip, voiceover, or quote into a captioned waveform video sized for Reels/TikTok/Shorts/feed posts — reactive waveform, optional progress bar, captions, square or vertical output. The audio-driven visual thread is the product, not a decoration.

**When it activates:** Making an audiogram, turning a podcast into a video, adding a moving waveform to a voiceover, exporting a podcast quote to social.

#### 7. youtube-intro-outro
**What it does:** Builds a 3–5s branded intro sting and a 20s end-screen outro that respects YouTube's clickable element zones (subscribe button, next-video card, etc.) as design constraints, not afterthoughts. Reusable template where only name/logo/colors/sting change per channel.

**When it activates:** Making a YouTube intro, channel bumper, logo sting, outro, end screen, end card with subscribe/next-video room.

---

### C. E-Commerce / Product

#### 8. product-demo-video
**What it does:** Turns static product/app screenshots into a polished animated demo — device frames, synthetic cursor + click, zoom-to-region, feature captions — so a flat screenshot becomes a walkthrough without a screen recorder. Frame-by-frame control over what the viewer sees and when.

**When it activates:** Making a product demo, app/SaaS walkthrough, feature-announcement video from screenshots, framing each screen in a browser window.

#### 9. promo-video
**What it does:** Punchy 6–15s sale spot — discount reveal, was→now price strike-through, promo code, countdown, CTA — batched across many products from a data table so one template renders N promos with prices pulled from the data. Built for Black Friday / flash sales where volume matters.

**When it activates:** Creating a sale/promo/discount-reveal/Black Friday/flash-sale video, batching promos across a CSV of offers.

#### 10. photo-slideshow
**What it does:** Turns a folder of photos into a finished video — per-photo Ken Burns motion, beat-synced transitions, mixed aspect ratios handled, captions on top. The photos aren't just cut; they move with intent.

**When it activates:** Turning photos into a slideshow/montage/recap video with music, Ken Burns motion synced to a track.

---

### D. Ads / Marketing

#### 11. ad-creative-video
**What it does:** One data-driven ad template × a CSV = N message-matched variants, exported to every placement aspect (9:16, 4:5, 1:1, 16:9) for A/B testing. The creative is parameterized so the hook, body, CTA, and offer all come from the data row.

**When it activates:** Making a video ad, batching ad variants from a data table for A/B testing, exporting one ad to multiple aspect ratios for Meta/TikTok/Reels/YouTube.

#### 12. launch-video
**What it does:** High-energy product launch / hype films — hook → tease → reveal → feature montage → end-card CTA, cut to the beat. The structure is a template; the energy is the variable you tune.

**When it activates:** Building a 30s product launch video, hype reel, beat-synced reveal, end-card CTA film.

#### 13. testimonial-video
**What it does:** Animated quote/review clips with staggered line reveals, key-phrase emphasis, fractional star ratings, and an author block — turns a list of customer reviews into one social-proof video each, brand-locked.

**When it activates:** Turning customer reviews into animated testimonial clips, quote videos with star ratings, social-proof video from a review list.

---

### E. Explainer / Educational

#### 14. explainer-video
**What it does:** Turns one message into a paced, narrated 30–90s short — script → storyboard → scene build → narration/caption sync → edit → polish. The full pipeline, not just a rendering step. Handles the script-to-screen gap that most motion tools skip.

**When it activates:** Making an explainer, how-it-works, onboarding, or concept video; turning a feature into a narrated how-it-works clip.

#### 15. wrapped-video
**What it does:** Builds "Spotify Wrapped"-style recaps — one template × a data table → many personalized 9:16 videos, each populated from a row. The template holds; the data varies per user.

**When it activates:** Building a Spotify Wrapped-style year-in-review video from a CSV of users, per-user stat videos.

#### 16. diagram-animation (rewritten)
**What it does:** Reveals diagrams and charts over time instead of flashing them whole — progressive node/edge reveals, flowing connectors that draw themselves, growing bars that climb, count-ups that tick. The viewer reads the diagram as it builds, not as a static image that suddenly exists. Handles architecture diagrams, flowcharts, and data charts the same way: staged disclosure.

**When it activates:** Animating a diagram, flowchart, architecture, or chart step by step; revealing node by node; growing bars and counting up numbers.

#### 17. whiteboard-animation (rewritten)
**What it does:** Draw-on "VideoScribe"-style explainers — a hand sketches illustrations and handwriting onto a board, stroke by stroke, paced to the narration. The reveal is the motion; the hand is the device. Not a substitute for good content, but the delivery mechanism that makes a basic illustration feel like a lesson unfolding.

**When it activates:** Making a whiteboard-style explainer, draw-on animation, hand-sketched illustrations paced to narration.

#### 18. isometric-animation (rewritten)
**What it does:** Isometric / 2.5D scenes — stacked layers, extruded blocks, exploded diagrams, isometric grids with staggered reveals and camera drift. Gives flat diagram-ness a third dimension without going full 3D; the camera drifts, the layers separate, the viewergets depth cues without a WebGL pipeline.

**When it activates:** Building isometric/2.5D scenes, stacked-layer diagrams, exploded views, isometric grids with staggered reveals and camera drift.

#### 19. manim (rewritten)
**What it does:** Builds math/physics/CS animations in Python with Manim Community Edition — Scenes & Mobjects, animation primitives, LaTeX/MathTex equation morphs, graphs & updaters (ValueTracker), 3D & moving camera, CLI rendering to MP4/GIF with a render-a-frame-first verify loop. The 3Blue1Brown toolchain, made available to an agent that can write the scene code.

**When it activates:** Making a math animation, animating an equation, using Manim, making a 3Blue1Brown-style video, plotting and animating a function, morphing one formula into another, rendering a 3D surface with an orbiting camera.

---

### F. Kinetic Typography

#### 20. kinetic-typography
**What it does:** Animates text across CSS, GSAP SplitText, Framer Motion, and Remotion — character/word/line staggers, split-text reveals, variable-font weight transitions, text on a path, lyric/title cards. Text is the motion subject, not a label sitting on top of something else.

**When it activates:** Animating a headline, making a kinetic typography video, creating an animated title card, split-text reveal, staggering text by character/word/line, making a lyric or caption video, animating a variable font weight, putting text on a path.

---

### G. Web Animation

#### 21. gsap-web
**What it does:** Code-driven web motion with GSAP — timelines, ScrollTrigger, SplitText, Flip, and Lenis smooth-scroll sync. The industry-standard timeline tool wired into a web page, not a closed plugin.

**When it activates:** Building scroll-driven, hero, or text-reveal animations on the web with GSAP; pinning a hero section that scrubs a timeline to scroll.

#### 22. 60fps-animation (rewritten)
**What it does:** Teaches the performance discipline that separates smooth motion from jank — animate only `transform` and `opacity`, kill layout thrash (no animating `width`/`height`/`top`/`left`), understand the compositor vs. main thread split, and measure with DevTools. The goal: 60fps on the devices your audience actually has, not 60fps on a dev laptop.

**When it activates:** A CSS animation feels janky and you want smooth 60fps; debugging which properties are forcing layout; understanding why a hover animation stutters.

#### 23. page-transition-animation (rewritten)
**What it does:** Enter/exit page transitions in the Next.js App Router — the mechanics of `AnimatePresence`, the exit animation fix that trips everyone up, route-change coordination, and when transitions help vs. when they're a welcome-page gimmick. Handles the App Router's client-component boundaries honestly.

**When it activates:** Adding page transitions in a Next.js App Router app; the exit animation never firing; coordinating route changes with motion.

#### 24. accessible-animation (rewritten)
**What it does:** Tiered `prefers-reduced-motion` handling that degrades gracefully instead of nuking all motion — distinguishes ambient background motion (can go away entirely) from functional motion (can simplify), from essential motion (must stay). The point: accessibility is a design constraint that produces better motion, not a checkbox that strips everything.

**When it activates:** Making animations respect `prefers-reduced-motion` without removing everything; understanding which motions are essential vs. decorative; WCAG compliance for motion.

#### 25. micro-interaction (rewritten)
**What it does:** Hover/press feedback, toggles, toasts, drawers, and list/layout motion with Framer Motion and CSS — the small motions that signal state change to the user. Sized and timed so they feel responsive, not theatrical. Distinguishes feedback motion (quick, confirming) from delighter motion (slower, atmospheric).

**When it activates:** Building hover/press feedback, toggles, toasts, drawers, list/layout motion; adding Framer Motion micro-interactions; deciding what should animate and what shouldn't.

#### 26. glassmorphism (rewritten)
**What it does:** Frosted-glass / Apple "Liquid Glass" UI — backdrop-filter panels, edge highlights, refraction effects, and animated specular sweeps, with reduced-transparency fallbacks for systems that can't or won't blur. The effect reproduced honestly, not as a `backdrop-filter: blur()` one-liner.

**When it activates:** Building frosted-glass/Apple Liquid Glass UI; backdrop-filter panels; animated specular sweeps; reduced-transparency fallbacks.

#### 27. svg-animation (rewritten)
**What it does:** SVG motion — stroke draw-on (the path draws itself), path morphing (one shape becomes another), motion-along-path (an element travels a path), and animated icons/gradients/filters. SVG is vector motion; the DOM is the timeline.

**When it activates:** Animating an SVG logo to draw itself on; path morphing; motion-along-path; animated icons/gradients/filters in SVG.

#### 28. lottie-animation
**What it does:** Integrate, control, theme, and export Lottie/dotLottie across web, iOS, Android, and React Native — playback control, theming after export, format interop, and the boundary between what Lottie is good for (small, authored, repeatable animations) and what it isn't (data-driven motion, heavy scenes).

**When it activates:** Integrating Lottie playback; controlling/animating a Lottie asset; exporting to dotLottie; theming a Lottie after export.

#### 29. ascii-animation (rewritten)
**What it does:** Generative ASCII fields and image/video/3D-to-ASCII conversion for terminals, canvas, and Three.js — character-set selection, luminance mapping, frame generation, and the aesthetic decisions that make ASCII read as style rather than a cheap effect. The terminal-native motion format.

**When it activates:** Building generative ASCII fields; converting image/video/3D to ASCII for terminal, canvas, or Three.js; ASCII animation as a visual style.

---

### H. Data Animation / Infographic

#### 30. chart-animation
**What it does:** Turns a dataset into an animated chart — bar chart race, line/area reveal, count-up tickers, and batch render one template across many CSVs. The numbers are exact on every frame; the motion is the story.

**When it activates:** Making a bar chart race, turning a CSV into a video, animating a chart over time, an animated counter or number ticker, a growing line/area chart, batch-rendering a chart template across many datasets.

#### 31. animated-infographic (rewritten)
**What it does:** Builds a designed infographic — icons, key numbers, connectors — and reveals it in a staggered cascade so the viewer reads it as a sequence, not a poster. The motion is the reading order made visible. Handles stat-card scenes and "by the numbers" explainers the same way.

**When it activates:** Building an animated infographic, stat-card scene, "by the numbers" explainer; revealing icons, key numbers, and connectors in a staggered cascade.

#### 32. presentation-video (rewritten)
**What it does:** Rebuilds a slide deck as a narrated, auto-advancing video with build reveals timed to the voiceover — each slide advances when the narration hits its beat, builds reveal as the voiceover lands on a point. Converts a static deck into a watchable video without re-authoring the content.

**When it activates:** Converting a pitch deck or slide outline into a narrated video where each slide tracks its voiceover; auto-advancing slides with build reveals.

---

### I. WebGL / 3D

#### 33. shader-glsl
**What it does:** Writes GLSL fragment shaders — gradients, noise/fbm, SDFs, domain warping, image transitions, and Three.js ShaderMaterial wiring. GPU-bound visual computation, expressed as a function from pixel to color over time.

**When it activates:** Writing a fragment shader, setting up a ShaderMaterial, building a generative GPU background, animated gradient, noise-based texture, SDF shape, domain-warped transition.

#### 34. threejs-animation (rewritten)
**What it does:** Builds web 3D motion — scenes, camera moves, GLTF clip blending, instancing, scroll-linked 3D, React Three Fiber, and leak-free GPU disposal (dispose geometries/materials/textures when a scene unmounts, or the tab leaks). The 3D render pipeline, not just "put a model on the page."

**When it activates:** Animating a Three.js/R3F scene, blending GLTF clips, scrolling-linked 3D, chasing a WebGL memory leak, instancing for performance.

#### 35. particle-system (rewritten)
**What it does:** Drives emergent motion — confetti/snow/smoke/sparks, flow fields, curl noise, connected-dot networks, and GPU `Points` shaders for large counts. The motion is the behavior of many small things following rules, not a scripted path. Scales from dozens to thousands of particles without collapsing to a single main-thread loop.

**When it activates:** Building a particle, confetti, snow, smoke, sparks, flow-field, or constellation effect; connected-dot networks; GPU particle shaders.

---

### J. Map Animation

#### 36. map-animation
**What it does:** Animates maps — camera zoom/orbit/pan, pins, drawn-on routes, region highlights, and labels — via Google Earth Studio → After Effects or code-renderable GeoJSON/SVG vector maps driven from a coordinates array. The geography is the canvas; the camera is the motion.

**When it activates:** Making a Vox-style map animation, adding map graphics to an explainer, animating a map zoom, panning/orbiting a camera over a map, drawing a route, dropping pins, highlighting a country/region, using Google Earth Studio, turning coordinates into a data-driven map sequence.

---

### K. Motion Design Fundamentals

#### 37. animation-principles (rewritten)
**What it does:** Tech-agnostic timing, easing, and the 12 principles for natural-feeling motion — squash and stretch, anticipation, staging, straight-ahead vs. pose-to-pose, follow-through, slow in/out, arcs, secondary action, timing, exaggeration, solid drawing, appeal. The theory that applies whether you're in After Effects, GSAP, Manim, or a shader.

**When it activates:** Any motion work where the timing feels off; understanding why a motion feels mechanical; applying easing that reads as physical, not arbitrary.

#### 38. shot-composition (rewritten)
**What it does:** Grids, safe areas, focal hierarchy, and 2D/3D camera framing across aspect ratios — how to place elements so the eye goes where you want, across 9:16, 1:1, 16:9, and everything in between. Safe areas matter because platform UI eats the edges; focal hierarchy matters because motion without a focal point is noise.

**When it activates:** Framing a shot for a specific aspect ratio; placing elements for focal hierarchy; respecting safe areas across platforms.

#### 39. motion-art-direction (rewritten)
**What it does:** Senior creative direction for motion — motion language, tone, pacing, hierarchy, and restraint. The decision layer above individual animations: what should move, how fast, with what energy, and what should stay still. The skill that prevents a motion design from feeling like everything is always animating.

**When it activates:** Setting the motion language for a brand/product; deciding pacing and tone; establishing hierarchy and restraint in a motion system.

#### 40. after-effects (rewritten)
**What it does:** After Effects expressions, rigging, export recipes, performance triage, and project hygiene — the AE workflow for an agent that can write expressions and understand the render pipeline. Not a substitute for an AE artist, but the knowledge layer that lets an agent operate inside AE projects.

**When it activates:** Writing AE expressions, rigging a composition, exporting from AE, triaging AE performance, maintaining AE project hygiene.

#### 41. beat-sync-editing (rewritten)
**What it does:** Cut to the beat — editing rhythm, transitions timed to the downbeat, retiming clips to land on the grid, speed ramps that accelerate/decelerate with the energy of the track. The motion is slave to the music; the music dictates the cut points.

**When it activates:** Cutting video to the beat; timing transitions to the downbeat; retiming clips; adding speed ramps that follow the music's energy.

#### 42. remotion-video (rewritten)
**What it does:** Programmatic, data-driven video in React rendered to MP4/GIF via CLI or renderer — the video-as-code tool. Scenes are React components, props are data, the render is a build step. Handles the data-driven video use case where the motion is a function of a row in a table.

**When it activates:** Building programmatic video in React; rendering video to MP4/GIF from a React component; data-driven video where each render varies by data.

#### 43. logo-animation (rewritten)
**What it does:** Logo reveals, stingers, splash screens, and loaders for web, video, and app — the logo as a motion asset, not a static mark. Covers reveal timing, easing, hold duration, and the different constraints of web (loopable, small) vs. video (one-shot, beat-synced) vs. app (fast, subtle).

**When it activates:** Animating a logo reveal, building a stinger, splash screen, or loader; adapting a logo animation across web/video/app contexts.

---

### L. Freelance / Business

#### 44. creative-brief (rewritten)
**What it does:** Turns a fuzzy client ask ("make it pop," "we need something cool") into a structured, sign-off-ready motion brief plus the exact clarifying questions to send back before a single frame is built. The brief is the gate — no work starts without one, because vague asks produce vague motion.

**When it activates:** Starting a motion project and needing to scope/brief it; a client request is too vague to act on; turning a vague ask into something you can quote and execute against.

#### 45. motion-pricing (rewritten)
**What it does:** Picks a pricing model, runs the day-rate math, accounts for cost drivers (revisions, usage, rush, complexity), and outputs a clean line-itemed quote. The quote is the contract precursor; it's built to be defensible, not just a number.

**When it activates:** Quoting a motion project; running day-rate math; accounting for revisions/usage/rush/complexity; producing a line-itemed quote.

#### 46. client-revisions
**What it does:** Caps revision rounds, writes SOW language, translates vague feedback ("make it pop" again) into actionable direction, and declines out-of-scope work as a change order. The revision process is a managed conversation, not an infinite free-look window.

**When it activates:** A client request is too vague; feedback is mounting and scope is creeping past agreed rounds; needing to write a change-order email; capping revision rounds in a SOW.

#### 47. video-delivery-specs (rewritten)
**What it does:** Per-platform spec sheets, a cutdown matrix (one master → N platform cuts), caption/accessibility notes, and a pre-delivery QC checklist — the delivery bundle that makes sure what you rendered is what the platform actually wants. Avoids the "I rendered it at 1080p but TikTok wanted 1080x1920 and now it's letterboxed" problem.

**When it activates:** Exporting finished motion to social, broadcast, OOH, or web; needing platform specs for Instagram Reels, TikTok, broadcast; building a cutdown matrix; running a pre-delivery QC.

#### 48. brand-motion-guidelines (rewritten)
**What it does:** Authors a brand motion system with easing/timing tokens, a motion library, logo rules, and accessibility standards — the document that makes motion consistent across a brand instead of ad hoc per designer. The motion equivalent of a brand guidelines doc, but for movement.

**When it activates:** A brand or product needs a documented, consistent motion language; authoring brand motion guidelines with named easing and duration tokens.

---

### M. Additional Skills (condensed from source)

#### 49. text-message-video — (covered above as text-message-animation, pack: text-message-video-skills)

#### 50. map-animation — (covered above, pack: map-animation-skills)

#### 51. freelance-motion bundle — (covered above as skills 44–48, pack: freelance-motion-skills)

---

## Tools / Engines Referenced

| Tool | Used by |
|---|---|
| GSAP (timelines, ScrollTrigger, SplitText, Flip) | gsap-web, kinetic-typography |
| Framer Motion | micro-interaction, kinetic-typography, page-transition-animation |
| Lottie / dotLottie | lottie-animation |
| Lenis smooth-scroll | gsap-web |
| SVG (stroke draw, path morph, motion-along-path) | svg-animation |
| Three.js / React Three Fiber | threejs-animation, shader-glsl |
| GLSL fragment shaders | shader-glsl |
| Manim Community Edition (Python) | manim |
| Remotion (React → MP4/GIF) | remotion-video, explainer-video, wrapped-video, data packs |
| After Effects (expressions, rigging, export) | after-effects, beat-sync-editing, map-animation |
| Google Earth Studio | map-animation |
| GeoJSON / SVG vector maps | map-animation |
| HTML/CSS/JS (standalone web render) | web-animation packs, kinetic-typography |

---

## Deliver-and-Verify Loop

Skills that produce a visual artifact ship a small verification toolkit:

- **Freeze a frame** — grab a still from the rendered output to visually inspect.
- **Tile a contact sheet** — compose multiple frames into one sheet for batch review.
- **Probe the encoded MP4** — check resolution, duration, framerate, file size against spec.
- **Web skills** — render a standalone HTML and verify in-browser (motion fires, no console errors, 60fps on target devices).
- **Video skills** — render via Remotion or Manim, verify output against the brief's dimensions/duration/spec.

The agent confirms its own output before handing back — this is not optional for visual skills.

---

## Source Attribution

All 51 skills originate from **iart-ai/motion-skills** (github.com/iart-ai/motion-skills), MIT license. The original 14 packs install separately:

```
npx skills add iart-ai/tiktok-video-skills
npx skills add iart-ai/youtube-video-skills
npx skills add iart-ai/ecommerce-video-skills
npx skills add iart-ai/ad-video-skills
npx skills add iart-ai/explainer-video-skills
npx skills add iart-ai/text-message-video-skills
npx skills add iart-ai/kinetic-typography-skills
npx skills add iart-ai/web-animation-skills
npx skills add iart-ai/data-animation-skills
npx skills add iart-ai/webgl-animation-skills
npx skills add iart-ai/manim-skills
npx skills add iart-ai/motion-design-skills
npx skills add iart-ai/map-animation-skills
npx skills add iart-ai/freelance-motion-skills
```

This consolidated skill is a V4TIME organization of that content — reordered, explanations rewritten for roughly half the skills, presented as a single reference document. Upstream credit and license are retained. For the original per-pack SKILL.md files and scripts/ toolkits, install the individual packs.
