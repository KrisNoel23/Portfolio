# CLAUDE.md — Portfolio Project Brain

## What this project is

Single-page React + Vite + TypeScript portfolio with a FastAPI/PostgreSQL backend.
Deployed on Netlify (frontend) + Render (backend).

## Core rule: Minimum intervention only

- DO NOT refactor working code
- DO NOT restructure folders or rename files
- DO NOT change the design system (colors, fonts, spacing tokens)
- DO NOT touch backend logic unless explicitly asked
- DO NOT install new libraries without asking first
- If a change touches more than the requested scope, STOP and ask

## Tech stack (do not deviate)

- React 18 + Vite 5, TypeScript (strict)
- Vanilla CSS with custom properties — NO Tailwind, NO CSS-in-JS
- No animation libraries — CSS + requestAnimationFrame + React state only
- Fonts: Syne (body), Space Mono (mono)

## Design tokens (never change these)

- --bg: #0d0d0f
- --accent: #ff6b35 (orange)
- --accent2: #7c3aed (purple)
- --accent3: #06d6a0 (mint)
- --text: #e8e8f0
- --muted: #7070a0

## Active work: Borrowing features from inspiration portfolio

Inspiration: https://portfolio-2026-elopes.vercel.app/
Goal: Same design, new functionality. Port features one at a time.

### Approved features to add (in order):

1. Marquee skill strip — pure CSS keyframe, replaces or augments static skill grid
2. Grayscale → color on profile photo hover — CSS only
3. Glass-morphism NavBar — backdrop-filter: blur(12px) + bg opacity tweak
4. Nav link underline ::after animation — CSS only
5. Project card thumbnail grayscale → color on hover — CSS only
6. /projects route + homepage CTA — full project catalog page
   - Add React Router DOM to the project
   - New /projects page with dual filter UI (by type + by tech tag)
   - Style with existing CSS vars — no new design tokens
   - Homepage Projects section gets a "View All Projects" CTA linking to /projects
   - Backend: extend /api/projects response to include `type` and `tags` fields
   - Use existing /api/projects endpoint — no external DB
   - Filter logic lives in frontend state, not backend query params

### Rules for porting features:

- Implement one feature at a time
- Match the behavior, not the code — rewrite in vanilla CSS (no Tailwind)
- Do not copy Elias's component structure — fit into existing component architecture
- /projectCatalog must use existing backend /api/projects endpoint, not Supabase

## Folder structure (do not change)

frontend/src/
components/ # App, NavBar, Hero, About, Skills, Projects, Contact, Footer, Cursor, SectionUI
assets/ # profile.jpeg, moodio.png, patch.png
types/ # index.ts
index.css # Global styles + CSS variables
main.tsx
backend/
main.py

## What's working — do not touch

- Typewriter effect (Hero)
- Custom cursor (Cursor.tsx) — dot + ring, requestAnimationFrame
- Scroll reveal — Intersection Observer, .visible class
- Noise texture overlay
- Contact form → FastAPI → Gmail SMTP
- Projects fetch from /api/projects
