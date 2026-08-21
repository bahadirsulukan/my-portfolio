# Portfolio — Claude Code Instructions

## Project
Bahadir Sulukan's personal portfolio at bahadirsulukan.com
- **Framework:** Next.js 16 App Router, TypeScript, Tailwind CSS v4
- **Animations:** GSAP + ScrollTrigger (primary), Framer Motion (for 21st.dev components)
- **3D:** React Three Fiber + Three.js (robot in Hero section)
- **Dev server:** `npm run dev` → http://localhost:3000

## Design System
**Always reference:** `.claude/skills/frontend-design/SKILL.md` before writing any UI code.
This file contains all color tokens, spacing, typography, component patterns, and animation rules.
Do NOT deviate from the design system — no random hex codes, no new colors, no freestyle font sizes.

## Key Architecture
- All code lives in `app/page.tsx` (single-file architecture)
- Components: `IntroScreen`, `Navbar`, `Reveal`, `StaggerReveal`, `SectionHeading`, `TimelineSection`, `Hero`, `CloudOrbit`, `AnimCounter`, `GitHubContributions`, `Card`, `Languages`, `Home`
- `globals.css` contains only base styles (smooth scroll, scrollbar, selection, focus-visible, prefers-reduced-motion reset)
- GSAP registered once at module level: `if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger)`
- Canvas/Three.js must be guarded with `mounted` state to prevent SSR crash

## Animation Rules
- Use `<Reveal>` for single elements, `<StaggerReveal>` for grids/lists
- Use `<SectionHeading>` for all section eyebrow+title pairs
- Always check `prefers-reduced-motion` before GSAP animations
- Always return cleanup: `gsap.killTweensOf(el); trigger.kill()`

## 21st.dev Components
When integrating components from 21st.dev:
1. Replace all colors with portfolio tokens (see SKILL.md)
2. Swap Framer Motion animations → GSAP `<Reveal>`/`<StaggerReveal>` wrappers
3. Keep markup structure, adapt to TypeScript
