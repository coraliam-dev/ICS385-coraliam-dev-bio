# HW12-C: Term Project 3 — Starter React Marketing UI

## Week 12 Goal

The Week 12 objective is to start building the React marketing UI layer on top of the backend/domain work completed in prior weeks. The focus this week is component structure, prop-driven content, and responsive layout design (mobile and desktop), not API integration.

## PRD-Driven Design Decisions

Before implementation, the page layout was planned from the PRD to keep the user experience and visitor segment clear. The PRD guided:

- section order (`Header` → `HeroSection` → `AboutSection` → `AmenitiesSection` → `CTASection` → `Footer`)
- property messaging and target audience language
- component boundaries for easier Week 13 extension (charts/API integration)

## What Was Built (Week 12)

- React functional components in separate files under `src/components/`
- Hardcoded property object in `App.jsx`, passed down as props
- Amenities rendered dynamically with `.map()`
- Mobile-first responsive UI using Flexbox/Grid
- Accessible image alt text and high-contrast text styling

## Reflection (AI Attribution)

This week I built a starter React marketing page for a Hawaiian hospitality property using reusable components and prop-based data flow. I made layout decisions from the PRD first so the structure would support future work, then implemented the required sections and responsive styling for readability on smaller screens. I used AI assistance (GitHub Copilot) to help scaffold component files, draft content wording, and generate initial CSS patterns, and I then reviewed and adjusted the code to ensure it matched assignment requirements and my project direction.

## Reviewer Quick Start

1. Install dependencies:
   - `npm install`
2. Start dev server:
   - `npm run dev`
3. (Optional) Verify production build:
   - `npm run build`

## Submission Checklist

- Push code to `week12/term-project/` in GitHub
- Submit commit URL in Lamakn
- Add screenshot of rendered marketing page in `docs/`
- Keep README updated incrementally with current-week goals and decisions
