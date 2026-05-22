# raunak's dev Portfolio

**A personal portfolio that refuses to be a portfolio.**

Most developer portfolios are the same thing: a headshot, a skills grid with progress bars that mean nothing, three project cards, a contact form. Mine is none of that. This is a live design system, an engineering teardown, a shape-shifting client showcase, and a writing platform for my own thinking — all in one site. The goal was simple and slightly unreasonable: build something that makes a recruiter stop scrolling and actually explore.

This is that thing.

---

## The Big Idea — Polymorphic Studio

The central concept of this portfolio is that I can build for *anyone* — a hospital, a fashion house, a literary journal, an electronics store, an AI research lab. But saying that is easy. Proving it is the interesting problem.

So instead of telling you, the site *shows* you.

There's a client mode switcher on the hero. Five options. When you pick one, the entire site changes its design language — fonts, color palette, spacing rhythm, motion character, ambient texture. Not a color theme toggle. A full identity shift. The background painting changes. The typography changes. The feeling changes.

More importantly: a section of the site renders a live, browser-native UI mockup for each client type. Not a screenshot. Not a Figma export. An actual React component, with real CSS, real SVG, real animations — built to look like a native product for that domain. Open DevTools. You'll find intentional, readable code all the way down.

That's the proof. An image could be faked. A live-rendered interface cannot.

---

## Features, and Why They Exist

### Physics-Based Cursor Trail

The custom cursor leaves a trail of particles that obey a simplified gravity and drag simulation — written entirely in a `requestAnimationFrame` loop with no external physics library. Each particle has its own velocity, mass, and decay rate. They collide loosely with large text elements.

**Why build this instead of using a library?** Because a senior engineer who looks at the source and sees `requestAnimationFrame`, a manual Euler integration loop, and a comment that says `// no library` understands something immediately. There's a difference between someone who *uses* tools and someone who understands what those tools are doing. This cursor is the fastest way to show which one I am.

---

### The Dissector — Live Engineering Teardown

This is the feature I'm most proud of, and it's probably the least common thing you'll find on any portfolio anywhere.

I picked one system I built that I think is genuinely interesting — the real-time anti-cheat engine from ContestHub — and I took it completely apart in public.

The Dissector page has two panels side by side. The left panel is an animated SVG diagram showing the entire data flow of the system: Browser Tab → Visibility API → Event Listener → Violation Counter → Grace Period Timer → Auto-Submit Trigger → Server JWT Validation. Each node lights up in sequence. Arrows animate via `stroke-dashoffset` transitions. The whole thing is scroll-driven or plays on a button click.

The right panel is a live syntax-highlighted code viewer. As each node in the SVG activates, the corresponding lines in the code panel sweep-highlight — a `clip-path` animation expanding over the relevant block, like a highlighter moving across a page.

Below both panels: my written reasoning. Why I used `visibilitychange` instead of `blur` (because `blur` fires when you alt-tab to your terminal — and in a contest, a terminal is exactly where cheating lives). Why 10 seconds and not instant. The edge case I had to handle around keyboard-shortcut tab switching versus browser chrome. Why server-side auto-submit was necessary, not just client-side disabling.

This is an engineering blog post that has a live demo embedded inside it. It's also the closest I can get to having a conversation with a recruiter about how I actually think.

---

### Polymorphic Client Showcases — Five Live UI Mockups

Each client mode renders a complete, domain-accurate interface mockup inside a browser chrome frame (realistic, minimal — just three dots and a fake URL bar). Here's what's inside each one:

**Doctor / Healthcare — MedFlow**
A patient appointment dashboard. Weekly calendar grid with animated appointment blocks that slide in staggered. A live SVG heart rate monitor — the line draws itself via `stroke-dashoffset`, loops, pauses, repeats. Patient sidebar with clean list layout. Color palette: clinical navy, trustworthy blue, crisp white. Font: Inter, because precision matters more than personality in a medical context. The whole thing is built on an 8px spacing grid. Nothing here is approximate.

**Fashion / Luxury — Maison**
Full-bleed split layout. Left half: large vertical editorial text in Cormorant Garamond at 0.4em letter-spacing. Right half: a CSS-painted gradient rectangle simulating a fashion photograph — warm amber bleeding into deep shadow. A horizontal product row that slowly drifts left on an infinite CSS animation, suggesting an endless collection. The entrance animation is a vertical wipe: left panel rises from below, right descends from above, they meet in the middle over 900ms. The logo is a geometric wordmark with an ultra-thin rule. Gold is used exactly once. That's why it works.

**Literary Magazine — The Margin**
A print-faithful editorial spread, built in CSS grid. Asymmetric columns (2fr 1fr), a thick 2px vertical rule dividing them, visible baseline grid lines via `repeating-linear-gradient`. Playfair Display at 72px, line-height 0.9, italic — the kind of type that takes up space because it has something to say. Text reveals via `clip-path` wipe animations — left to right, like ink spreading across paper. An SVG paper grain overlay using `feTurbulence` adds texture without weight.

**Electronics Shop — Electra**
Monospace everything. Space Mono throughout, because it signals precision — every character the same width, no typographic ambiguity. Product cards that "boot up" on mount: a green cursor blinks in the center, then the product name types itself character by character via a JS string interval, then the price, then a neon-bordered button fades in. A ticker at the top scrolls `NEW ARRIVALS ··· ARDUINO MEGA ··· ESP32 ···` in terminal green. The logo is a circuit trace forming the letter E — horizontal lines, vertical connectors, small square pads at junctions. Pure SVG, no images.

**AI Lab — Axiom**
A model inference dashboard. Three stat metrics across the top: PARAMETERS / CONTEXT / LATENCY. A central animated SVG showing tokens flowing left to right through a transformer block — thin connecting lines with dashed `stroke-dashoffset` animations running along them continuously. A fake code block with real syntax highlighting via colored spans — purple for keywords, white for strings, grey for comments. An output panel where text streams in word by word at 80ms intervals, simulating LLM streaming. Fifty or so tiny CSS dots form a faint star field behind everything. A deep navy-to-black background with a single indigo radial glow.

Every one of these mockups is inspectable. The CSS is intentional. The structure is real. That's the point.

---

### Skill Constellation — Canvas-Based Dependency Graph

No progress bars. No icon grids. No "Proficiency: ████████░░ 80%."

Instead, the skills section renders a floating node graph on a plain `<canvas>` element — no D3, no external graph library. Each skill is a node. Related skills are connected by thin lines. The five clusters (Frontend, Backend, Security, DevOps, AI) are positioned spatially so their grouping is immediately readable.

Every node floats gently on a sine wave offset, timed with `requestAnimationFrame`. Each node has a slightly different frequency and phase so they never move in sync — it looks organic rather than mechanical.

Hover over a node: it expands and shows a one-line context note (what I used it for, specifically). Click it: all its connections highlight. The accent color of the active client theme bleeds into the node and connection colors. The graph breathes differently in Doctor mode than it does in AI Lab mode.

The whole thing runs at 60fps. No jank. Every optimization decision in the source has a `// PERFORMANCE:` comment explaining the tradeoff.

---

### Atmospheric CSS Backgrounds — No Images

Every background in this site is painted in pure CSS — layered `radial-gradient` with carefully positioned ellipses, `feTurbulence` SVG filters for grain and texture, and `backdrop-filter` for glass effects. There are no background images. No WebP files. Nothing to fetch.

This matters for two reasons. First: the site loads instantly regardless of connection. Second: it means the background is *alive* — it responds to theme changes via CSS custom property transitions, cross-fading between the clinical mist of Doctor mode and the amber warmth of Literary mode without a single image swap.

The technique is a set of three or four overlapping radial gradients at different positions and opacities, composited together with the `background` shorthand. The result looks like a painted depth field. Mountains, atmosphere, light sources — suggested, not depicted.

---

### Live CSS Variable Editor

A small panel — accessible via a button in the corner, not shoved in your face — lets visitors modify the site's core CSS custom properties in real time. Change `--accent-color`, `--font-heading`, `--spacing-base`. Watch the site react.

This is a demonstration of how the design system is built. Every visual decision traces back to a token. Nothing is hardcoded. The editor is a few controlled inputs bound to `document.documentElement.style.setProperty`. It's genuinely simple to build, but the *reason* to build it is to show that the design system underneath is real — not a collection of one-off styles that happen to look consistent.

---

### Scroll-Linked Everything — Lenis + Framer Motion

Lenis handles scroll normalisation — it intercepts native scroll events and replaces them with a lerped (linearly interpolated) version, giving scroll a physical inertia feel. The scroll feels like it has weight and resistance, not like dragging a scrollbar.

Framer Motion's `useScroll` and `useTransform` hooks attach to the Lenis scroll position and drive every major animation: section reveals, parallax offsets on the hero background layers, the timeline in the projects section, text that scales subtly as you approach it.

The result is that scrolling through the site doesn't feel like *reading*. It feels like moving through a space.

---

### Open Graph Image — Dynamic, On-Brand

When someone shares the portfolio link on LinkedIn or Twitter, the preview image isn't a browser screenshot. It's a custom-generated OG image built with `@vercel/og` — rendered server-side at the `/api/og` edge function. It uses the same fonts and color palette as the site, displays my name in Cormorant Garamond at large scale, and includes a one-line tagline. It looks like a deliberate design decision rather than a default.

---

## The Tech, Briefly

**Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Lenis

**State:** Zustand for theme management — the active client mode lives in a global store, and components subscribe to it. CSS custom properties are injected onto `:root` on every store update.

**Rendering:** A mix of SSR (for SEO-critical pages) and client components (for anything interactive). The skill graph, the Dissector, and the client showcases are all `"use client"` — they need the DOM.

**Backend:** No traditional backend. Vercel Edge Functions for the OG image route. No database. Contact form routes through a lightweight Edge Function to an email API.

**Fonts:** Cormorant Garamond (display), DM Sans (body), DM Mono (code and UI labels) — all loaded via `next/font/google` for zero layout shift.

**Performance targets:** LCP under 1.8s, CLS under 0.05, INP under 100ms. Verified on Vercel's Analytics.

---

## On the Design Philosophy

I want to say something about *why* this portfolio is built the way it is, because I think it matters.

Most developer portfolios communicate technical competence. That's necessary but not sufficient. What they rarely communicate is design *judgment* — the ability to look at a brief, understand the domain, the audience, the emotional register the client lives in, and translate that into visual decisions.

The Polymorphic showcase exists because I wanted to demonstrate that judgment directly, not describe it. The Dissector exists because I think the most interesting thing about a piece of engineering isn't what it does — it's the sequence of decisions that led there, including the wrong turns. The physics cursor exists because I wanted at least one thing on the page that can't be explained by "they copied a tutorial."

Design and engineering are both translation work. You take something complex and make it legible without making it simple. That's the whole job, whether the medium is code, type, or prose.

---

## About

**Raunak Prasad** — Full-stack developer, B.Tech Biotechnology, NIT Durgapur.

`prog.raunak@gmail.com` · [GitHub](https://github.com/raunakkk) · [LinkedIn](https://linkedin.com/in/raunak-prasad-og)

---

*Built with Next.js. Deployed on Vercel. No templates were harmed in the making of this site.*
