# PRD — Cris du Cœur (crisduncoeur.org)

## Problem Statement
Award-worthy charity/NGO marketing site inspired by World Vision Canada, but editorial and distinctive. Full-bleed rotating hero, impact stats, video testimonial, financial transparency block, numbered manifesto, news grid, final donation CTA. Warm, human, transparent tone.

## User Choices (2025-12)
- Brand accent: RED (#D62828)
- Content: demo/placeholder (realistic French)
- Payment: NONE (donation buttons visual only → toast)
- Backend: NONE (static frontend-only site)
- Language: French

## Architecture
- Frontend only: React 19 + Tailwind + framer-motion + lenis (smooth scroll) + react-fast-marquee + sonner (toast). No backend, no DB.
- Fonts: Cabinet Grotesk (headings) + Satoshi (body) via Fontshare.
- Sections in `src/components/sections/`, demo data in `src/data/content.js`.

## Implemented (2025-12)
- Kinetic full-bleed hero: 3 rotating images, masked line-by-line headline reveal, parallax, per-slide CTA, slide dots.
- Impact section with animated count-up stats (89% / 1.5M / 100%).
- Video testimonial block (YouTube embed on play) + blockquote.
- Financial transparency block + "Voir le rapport annuel" link.
- Numbered manifesto (4 chapters) on dark section with hover interactions.
- Slow editorial marquee (outline text).
- 3-column editorial news grid with hover image scale.
- Final donation CTA: frequency toggle + amount selector + success toast (no real payment).
- Responsive navbar with mobile menu; dark footer with socials/contact.
- Verified via testing_agent_v3: 26/27 checks pass (only a harness timing note, no app bug).

## Backlog
- P1: Real donation payment (Stripe) if desired.
- P1: Backend for dynamic news/newsletter/contact.
- P2: Bilingual FR/EN toggle.
- P2: Real annual report PDF + individual story pages.
