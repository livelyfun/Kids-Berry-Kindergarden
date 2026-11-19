# Kids Berry Kindergarten School — Frontend Website

A warm, responsive, CMS-ready **Next.js (App Router) + TypeScript + Tailwind CSS** frontend website for **Kids Berry Kindergarten School** (Montessori Implemented Pre-school + Daycare) in **Pichara, Biratnagar-11, Nepal**.

## Scope (Phase 1 — Frontend Only)
- Pure static frontend with clean component separation
- Strongly typed CMS-ready data layer (`src/types/cms.ts` and `src/data/site-data.ts`)
- No database, CMS backend, or server-side form submission yet (contact/inquiry forms are interactive frontend UI previews)

## Pages Built
1. **Home (`/`)** — Strong hero section, school intro, key highlights (Montessori, Daycare, Safe CCTV environment, Weekly Food Provided + daily hot milk & fruits), timings overview (`9:00 AM – 3:00 PM` & `3:00 PM – 5:00 PM`), age programs, parent testimonials, and Contact / WhatsApp CTA.
2. **About Us (`/about`)** — School story & Montessori philosophy, core values, campus snapshot, and educator team.
3. **Programs (`/programs`)** — Regular Class (`9:00 AM – 3:00 PM`), Daycare (`9:00 AM – 5:00 PM`), After-Class Care (`3:00 PM – 5:00 PM`), age groups (`Playgroup`–`Senior KG`), 5 Montessori pillars, and full daily routine.
4. **Facilities (`/facilities`)** — CCTV-monitored safety, nutritious food provided (Sunday–Friday weekly menu + daily hot milk & fresh fruits), clean classrooms & play areas, daycare facilities, after-school care, and RO water / hygiene standards.
5. **Gallery (`/gallery`)** — Filterable classroom, play area, art, and festival photo gallery with lightbox modal.
6. **Admissions (`/admissions`)** — Enrollment steps, age guidelines, document checklist, FAQs, and inquiry preview UI.
7. **Contact (`/contact`)** — Pichara, Biratnagar-11 address, school & after-care timings, phone & email cards, Google Maps embed, Facebook & Instagram links, prominent WhatsApp button, and quick message preview UI.

## Running Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.
