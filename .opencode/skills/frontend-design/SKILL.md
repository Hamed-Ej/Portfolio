---
name: frontend-design
description: Create distinctive production-grade frontend interfaces for Next.js + Tailwind brutalist sites. Guides token system (oklch), typography, motion, a11y, and anti-slop checks for this portfolio.
license: MIT
compatibility: opencode
---

# Frontend Design Skill — ejbari.me

Use for any UI work in this repo (Next 16 App Router, Tailwind 4, JetBrains Mono, monochrome brutalist).

## Design System for this Project

**Palette — Restrained monochrome (tinted Oklch, no pure #000/#fff):**
- `--background: oklch(0.985 0.002 0)` (#fafafa) / `.dark oklch(0.145 0 0)` (#0a0a0a)
- `--foreground: oklch(0.145 0 0)` / `.dark oklch(0.985 0.002 0)`
- `--gray-50..900` scale inverted for dark via CSS variables, mapped via `@theme inline`
- Accent: none — hover inverts `bg-foreground text-background` as signature
- Contrast: `text-gray-400` `#9ca3af` fails AA on light → use `gray-500`+ for body, `gray-400` only for labels

**Typography:**
- Display: JetBrains Mono variable (`--font-mono`), `tracking-tighter font-black`, `text-7xl/md:text-9xl` hero
- Body: same mono, `leading-relaxed`, `text-gray-500 dark:text-gray-400`
- Keep `tracking-widest uppercase text-xs` for labels, no second family

**Layout:**
- Max `5xl mx-auto px-6`, hairline `border-gray-200 dark:border-gray-800`, `backdrop-blur-md bg-background/80` nav, no radius, dense grid, whitespace over chrome
- Signature: reveal stagger `0.12` + inverted hover on cards

**Motion:**
- Framer Motion `LazyMotion domAnimation` or CSS `@keyframes` — respects `prefers-reduced-motion`
- 200ms hover, 300ms page transition, one orchestrated stagger per page

**Quality floor:**
- `suppressHydrationWarning` + blocking theme script, `aria-label`, focus-visible, responsive, `next/image` with sizes

## When to use

- New pages/components (`/blog`, `/admin`), theme work, any visual polish

## Hard rules

- No purple/cream defaults, no Inter/Roboto, no extra accent color
- Semantic tokens (`bg-background`) not scattered `dark:` overrides unless needed
- `@theme inline` not `@theme` (v4 dark mode gotcha)
