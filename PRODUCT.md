# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Owners of small businesses, mostly hospitality on the Croatian coast (konobas, boat tours,
apartments, salons), who do not have time to judge a website themselves. They arrive cold,
usually on a phone, often from a private page `/p/<slug>` sent after a first message.

## Product Purpose
zip builds websites, booking paths and Google listings that bring bookings, and keeps them
running. The site's one job is to get an owner to ask for the free written check.

## Positioning
"The check" comes first: a free written check of the owner's website, Google listing and
booking path — three findings, in writing, no pitch. Free first, then teach, then charge.

## Capabilities and Constraints
- Three packages without amounts (2026-09-18): **Website** (site + booking + Google profile +
  analytics) and **Growth** (SEO, Google and Meta ads, copy, monthly report) are parts that work
  on their own; **System** joins both with AI and automation (assistant, automatic replies,
  booking reminders, review requests, translations, one inbox for enquiries, automatic monthly
  report) plus monthly care. The direction is automated systems that run for the client.
- **No price, no figure of cost anywhere on the site** (decision 2026-09-14).
- First contact: WhatsApp with a prepared message. Also phone, e-mail, a Cal.com call picker
  (`/api/slots`) and an e-mail form (Formspree).
- English site at `/`, the same page in Croatian at `/hr` (one `Copy` type, both must match).
- `/work` (all projects), `/p/[slug]` (private prospect pages, noindex, Croatian).
- Next.js 16, Tailwind v4, deployed from `main` to donebyzip.com. Push only on Petar's word.

## Brand Commitments
- The brand is **zip**, lowercase, logo filled with 45° stripes (`ZipLogo.tsx`).
- **The site presents the company only** (Petar, 2026-09-18): no team members, no portrait,
  no personal CV. The site speaks as "we".
- Location shown: **Zagreb, Croatia** (Petar, 2026-09-18).
- Never call itself a "marketing agency" on the page.
- Hero headline stays "Systems that sell." with the last word filling.

## Evidence on Hand
- Four real projects with screenshots in `public/work/` (`src/data/work.ts`).
- 12 certificates (Google Ads, Analytics, HubSpot), listed in `src/data/site.ts`.
- **No client reviews and no result numbers exist.** Never invent them; the reviews section
  stays out until a real one arrives with permission.

## Product Principles
- Prove with what is true: facts already in writing beat claims.
- One action per screen: the free check.
- Mobile first; the owner decides on a phone.
- Speed is part of the product: CSS over libraries, code over heavy imagery.
