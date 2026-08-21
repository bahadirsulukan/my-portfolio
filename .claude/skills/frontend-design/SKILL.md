---
description: Frontend design system and taste rules for Bahadir Sulukan's portfolio. Reference this whenever building or editing UI components, layouts, animations, or styles.
---

# Frontend Design Skill — Bahadir Sulukan Portfolio

## Identity
- **Theme:** Midnight Black + Gold (luxury, premium, dark-mode first)
- **Vibe:** Senior engineer meets creative technologist — clean, sharp, not over-designed
- **Stack:** Next.js App Router · TypeScript · Tailwind CSS v4 · GSAP ScrollTrigger · React Three Fiber

---

## Color Tokens
Never use random hex codes. Always use these tokens:

| Token | Value | Use |
|---|---|---|
| `--background` | `#080808` | Page background |
| `--foreground` | `#F0EAD6` | Primary text (warm white) |
| `--gold` | `#C9A84C` | Primary accent, borders, icons |
| `--gold-bright` | `#FFD700` | Highlights, glow effects |
| `--surface-1` | `#0C0C0C` | Card backgrounds |
| `--surface-2` | `#111111` | Nested surfaces |
| `--surface-3` | `#1A1A1A` | Tags, pills |
| `--muted` | `#666666` | Secondary text |
| `--subtle` | `#555555` | Eyebrow labels |
| `--border` | `rgba(201,168,76,0.18)` | Default card borders |
| `--border-hover` | `rgba(201,168,76,0.5)` | Hover state borders |
| `--green-accent` | `#4ADE80` | Success, "verified", positive states |

**Gold gradient (use for headings & CTAs):**
```
linear-gradient(135deg, #C9A84C 0%, #FFD700 50%, #C9A84C 100%)
```
Apply with: `background: goldGrad; WebkitBackgroundClip: text; WebkitTextFillColor: transparent`

---

## Typography Scale

| Role | Size | Weight | Color |
|---|---|---|---|
| Hero name | `clamp(52px, 9vw, 96px)` | 900 | gold gradient |
| Section heading (h2) | `36px` | 800 | `#F0EAD6` with gold highlight word |
| Card heading (h3) | `20–28px` | 700 | `#F0EAD6` |
| Body text | `15–17px` | 400 | `#777` |
| Small body | `13–14px` | 400 | `#666` |
| Eyebrow label | `11px` | 600 | `#555`, `letter-spacing: 0.4em`, `text-transform: uppercase` |
| Code / mono | `13–14px` | 400 | use `font-family: monospace` |
| Tag / pill | `11–13px` | 600 | `#C9A84C` |

**Font stack:** Geist Sans (primary) · Geist Mono (code/monospace) · system-ui fallback

---

## Spacing System (8px base grid)

Use multiples of 8 for all spacing:
- `4px` — micro gap (icon padding)
- `8px` — xs (tag gap, inner padding)
- `12–16px` — sm (card inner gap)
- `24–28px` — md (section inner spacing)
- `32–40px` — lg (card padding)
- `60–80px` — xl (between major sections)

**Section gap variable:** `sectionGap = "80px"` — use for `marginTop` between all major sections.

---

## Component Patterns

### Cards
```tsx
background: "#0C0C0C"
border: "1px solid rgba(201,168,76,0.18)"
borderRadius: "16–20px"
padding: "28–40px"
transition: "all 0.3s ease"
// hover:
borderColor: "rgba(201,168,76,0.5)"
transform: "translateY(-6px)"
boxShadow: "0 20px 50px rgba(201,168,76,0.08)"
```

### Buttons — Primary (gold filled)
```tsx
background: "linear-gradient(135deg, #C9A84C, #FFD700)"
color: "#000"
fontWeight: 700
fontSize: "12px"
letterSpacing: "0.15em"
textTransform: "uppercase"
borderRadius: "3px"
padding: "14px 32px"
// hover: boxShadow "0 8px 30px rgba(201,168,76,0.3)", translateY(-2px)
```

### Buttons — Secondary (ghost/outline)
```tsx
border: "1px solid #C9A84C"
color: "#C9A84C"
background: "transparent"
// hover: background "#C9A84C", color "#000"
```

### Tags / Pills
```tsx
padding: "4–7px 10–16px"
background: "rgba(201,168,76,0.05–0.1)"
border: "1px solid rgba(201,168,76,0.2–0.3)"
borderRadius: "4–20px"
fontSize: "11–13px"
color: "#C9A84C"
```

### Eyebrow + Heading pattern (use `SectionHeading` component)
```tsx
<SectionHeading
  eyebrow="Section Label"   // uppercase, tracked, muted
  title="Main "             // leave space before highlight word
  highlight="Title"         // this word gets gold gradient
/>
```

---

## Animation Rules (GSAP ScrollTrigger)

**Always check `prefers-reduced-motion` before any animation:**
```ts
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
```

**Scroll reveal (use `<Reveal>` component):**
- Entry: `y: 44, opacity: 0` → `y: 0, opacity: 1`
- Duration: `0.72s`, ease: `power3.out`
- Trigger: `start: "top 88%"`

**Stagger grids (use `<StaggerReveal>` component):**
- Same entry values, `stagger: 0.09s`, duration `0.65s`
- Trigger: `start: "top 85%"`

**Hero text (on intro complete):**
- `gsap.fromTo` with `stagger: 0.09s, delay: 0.15s`

**Timeline line-draw:**
- `scaleY: 0 → 1`, `transformOrigin: "top center"`, `duration: 1.1s`

**Never use:** raw CSS `animation` for scroll effects. Use GSAP + ScrollTrigger exclusively.

**Always add cleanup:**
```ts
return () => { gsap.killTweensOf(el); trigger.kill(); };
```

---

## Layout Principles

1. **Max width:** `1280px`, centered, `padding: 0 32px`
2. **Two-column layouts:** use `display: grid; gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))"` — NOT `lg:grid-cols-2` alone (unreliable in inline styles)
3. **Always mobile-first:** test at 375px, 768px, 1280px
4. **Radial gold glow** behind key sections: `radial-gradient(ellipse 70% 60% at 60% 50%, rgba(201,168,76,0.07), transparent)`
5. **Subtle grid background:** `linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px)` at `70–80px` grid size, `opacity: 0.04`

---

## Anti-Patterns — Never Do These

- ❌ Random font sizes not in the type scale
- ❌ Pure white (#ffffff) text — use `#F0EAD6` (warm white)
- ❌ Blue/purple accent colors — gold only
- ❌ Generic box shadows without gold tint
- ❌ CSS animations for scroll effects (use GSAP)
- ❌ Heavy borders or outlines that compete with the gold system
- ❌ Centered body text blocks wider than 480–520px
- ❌ Mixing border-radius values randomly — cards use 16–20px, tags 4–20px, buttons 3–8px
- ❌ `opacity: 1` on decorative elements — keep glow/grid at 0.04–0.12

---

## Section Structure (reference)

```
Hero (id="about")          — 3D robot + typewriter + text entrance
About/Skills (id="projects") — Card grid: Technical Stack + Languages
Projects (id="projects-section") — StaggerReveal 2-col card grid
Experience (id="experience")  — TimelineSection with line-draw
GitHub (id="github")       — GitHubContributions calendar
Cloud & DevOps             — SectionHeading + 2-col: CloudOrbit + Stats/Cert
Music + Story (id="music") — StaggerReveal 2-col
Contact (id="contact")     — Centered CTA panel
```

---

## 21st.dev Integration Pattern

When pulling a component from 21st.dev:
1. Keep their markup structure, discard their color/font variables
2. Replace all colors with portfolio color tokens above
3. Add GSAP ScrollTrigger via `<Reveal>` or `<StaggerReveal>` wrapper
4. Ensure `prefers-reduced-motion` is respected
5. Remove any Framer Motion deps — use GSAP instead
