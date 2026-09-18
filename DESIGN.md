---
name: zip
description: Systems that sell. A free written website check, proven in a chrome-and-glass world on pure black.
colors:
  void: "#000000"
  ink-1: "#09090a"
  card: "#0d0d0f"
  card-hi: "#17171a"
  fg: "#fafafa"
  fg-2: "#a1a1a9"
  fg-3: "#85858d"
  fade: "#5c5c63"
  line: "rgb(255 255 255 / 0.09)"
  line-2: "rgb(255 255 255 / 0.16)"
  glass-tint: "rgb(255 255 255 / 0.07)"
  chrome-1: "#ffffff"
  chrome-2: "#d6d6dc"
  chrome-3: "#5c5c64"
  chrome-4: "#19191d"
  chrome-5: "#f5f5f7"
  chrome-6: "#8e8e96"
  live: "#30d158"
  dev: "#ffd60a"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(3.1rem, 13.4vw, 6rem)"
    fontWeight: 600
    lineHeight: 0.96
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.125rem, 8.6vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  figure:
    fontFamily: "Geist, ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: "2.75rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.045em"
    fontFeature: "\"tnum\""
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.022em"
  lede:
    fontFamily: "Geist, ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "-0.006em"
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.4
  micro:
    fontFamily: "Geist, ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.3
rounded:
  field: "12px"
  inset: "14px"
  tile: "18px"
  card: "22px"
  panel: "26px"
  pill: "999px"
spacing:
  tight: "10px"
  gap: "12px"
  stack: "20px"
  card-pad: "20px"
  card-pad-wide: "28px"
  block: "48px"
  block-wide: "64px"
  section: "80px"
  section-wide: "128px"
  shell-max: "1240px"
components:
  button-primary:
    backgroundColor: "{colors.fg}"
    textColor: "{colors.void}"
    rounded: "{rounded.pill}"
    typography: "{typography.body}"
    padding: "0 20px"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.chrome-1}"
    textColor: "{colors.void}"
  button-primary-lg:
    backgroundColor: "{colors.fg}"
    textColor: "{colors.void}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "52px"
  button-glass:
    backgroundColor: "{colors.glass-tint}"
    textColor: "{colors.fg}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "46px"
  button-sm:
    rounded: "{rounded.pill}"
    padding: "0 15px"
    height: "36px"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.fg}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
  chip:
    textColor: "{colors.fg-2}"
    rounded: "{rounded.pill}"
    typography: "{typography.label}"
    padding: "0 13px"
    height: "32px"
  badge:
    textColor: "{colors.fg-2}"
    rounded: "{rounded.pill}"
    typography: "{typography.label}"
    padding: "4px 14px 4px 4px"
  input:
    textColor: "{colors.fg}"
    rounded: "{rounded.field}"
    padding: "12px 16px"
  nav-capsule:
    textColor: "{colors.fg-2}"
    rounded: "{rounded.pill}"
    height: "56px"
  accordion-item:
    backgroundColor: "{colors.card-hi}"
    textColor: "{colors.fg}"
    rounded: "{rounded.tile}"
  accordion-item-open:
    backgroundColor: "{colors.fg}"
    textColor: "{colors.void}"
    rounded: "{rounded.tile}"
---

# Design System: zip

## Overview

**Creative North Star: "Polished Metal in the Dark"**

zip is a pure mono world: a black ground, near-white type, and one effect, chrome. Everything that proves the product (the free written check) sits on solid dark cards and reads as plain fact; everything that floats above the page (the nav capsule, the sticky WhatsApp capsule, the menu, secondary buttons, work-tile captions, the fact tiles) is liquid glass. Chrome, a banded polished-metal gradient, appears only where the brand speaks: the striped zip wordmark, the true numbers, and the last word of the hero headline as it fills.

The recurring motif is the 45° stripe from the zip logo. It fills the wordmark, the zipper curtain, the 404 numerals, and sets the angle the burger bars rotate to when the menu opens. Headings fade from grey into white line by line, so every section title reads as something arriving out of the dark. Density is low: one idea per section, generous vertical rhythm, a narrow 40rem heading column over wider evidence below.

The page earns trust with facts already written elsewhere on the page: no invented metrics, no client logos, no reviews, no prices, no people. Where a template would show numbers or logos, zip shows certificates, tools and four true facts.

**Key Characteristics:**
- Pure black ground (no second hue); greys step from #fafafa down to a large-text-only fade grey.
- Chrome is a material, not a colour: reserved for wordmark, figures and the filling word.
- Glass floats, cards sit: liquid glass only on what hovers above the page.
- Pills everywhere a control or label lives; soft 22px cards for content.
- A small glass-edged pill with a glowing dot (`.pill-eyebrow`, `ui/Eyebrow.tsx`) names each section above its headline. The craft floor bans eyebrows, but these are a template element the owner chose on 2026-09-18 (see `.impeccable/mocks/redesign-2026-09-18-picks.json`); keep them unless he says otherwise.
- 45° stripes as the brand's single recurring pattern.
- One motion moment: a CSS hero intro (and, first visit per session, a CSS zipper), plus press feedback.

## Colors

A strict monochrome ramp from black to near-white, with chrome as the only effect and two status dots as the only hue.

### Primary
- **Paper White** (fg): all primary type, the solid primary button, the open accordion item, the white "Free" tag inside badges, focus outlines and text selection. It is the brightest non-chrome surface and the only fill a primary action ever gets.

### Neutral
- **Void Black** (void): the page ground everywhere, and the text colour on white fills.
- **Ink** (ink-1): the one alternate section band (packages), one step off black, always paired with a hairline top border.
- **Card Black / Card Lift** (card, card-hi): the two ends of the solid card's vertical gradient; card-hi alone backs closed accordion rows and mock UI chips.
- **Quiet Grey** (fg-2): body copy, ledes, nav links at rest, chip and badge text.
- **Caption Grey** (fg-3): small captions, copyright, placeholder text. Passes AA on black and on cards; the floor for small text.
- **Fade Grey** (fade): the starting colour of the heading fade only. About 3:1 on black, so it is legal only inside display and headline sizes.
- **Hairline / Hairline Strong** (line, line-2): 1px borders on cards, sections, chips and the hero grid; the stronger one on chips, inputs and floating tiles.

### Tertiary (chrome material)
- **Chrome stops** (chrome-1 to chrome-6): the six stops of the SVG chrome on the zip wordmark and the zipper teeth. The CSS text chrome is a vertical banded gradient (bright, soft silver, a dark band at 50%, bright again, mid grey, white) recorded in the sidecar; it is used as a text-clip fill, never as a surface.

### Status
- **Live Green** (live) and **In-Build Yellow** (dev): 6px status dots on work tiles only, always with a text label beside them. Never used as accents.

### Named Rules
**The No Second Hue Rule.** Nothing on the page carries a brand colour. If a surface needs emphasis it gets white, chrome or glass; hue is reserved for the two status dots.

**The Chrome Is Earned Rule.** Chrome fills only the zip wordmark, true figures and the hero's filling word. A heading, button or icon never gets chrome.

**The Fade Floor Rule.** Fade grey appears only as the start of a heading gradient at 34px and up. Small text never goes below caption grey.

## Typography

**Display Font:** Geist (variable, via next/font, one file for all weights)
**Body Font:** Geist
**Label/Mono Font:** none; tabular figures come from Geist's `tnum` feature.

**Character:** One neutral grotesque carried by weight and tracking alone: 600 and tight negative tracking for everything that speaks, 400 at near-zero tracking for everything that explains.

### Hierarchy
- **Display** (600, clamp 3.1rem to 6rem, 0.96): the hero headline only, two set lines, each fading grey to white; the last word fills with chrome.
- **Headline** (600, clamp 2.125rem to 3.75rem, 1.02): section headings, always set as explicit lines (never width-wrapped) so the fade lands on the first letters of every line.
- **Figure** (600, 2.75rem to 3rem, 1, tabular): the true facts, in chrome; also the display-size phone number in contact (in white).
- **Title** (600, 1.125rem to 1.25rem, 1.2): card and step titles.
- **Lede** (400, 1.0625rem, 1.55, max 44ch): the one sentence under a heading, in quiet grey.
- **Body** (400, 0.9375rem to 1rem, 1.55): card and answer text, capped at 40 to 52ch.
- **Label** (400 or 500, 0.8125rem): chips, badges, captions, status text. Sentence case; the system has no uppercase tracked labels.

### Named Rules
**The Set Lines Rule.** Headings are authored as an array of lines, each its own fade. Never let the browser choose where a fading heading breaks.

**The Weight Carries It Rule.** Hierarchy comes from size, 600 weight and negative tracking (-0.04em at headline and up). No second family, no italics, no uppercase.

## Layout

Mobile first. A single centred shell (max 1240px, side padding clamp 20px to 40px) holds every section. Sections breathe at 80px vertical padding, 128px from 640px up; the heading block (pill label, headline, lede, 20px apart) is capped at 40rem, and evidence starts 48px below it (64px on desktop).

On mobile, grids collapse to one or two columns (the check bento is two columns with full-width cards); at 1024px they open to three or four. Two-column sections (process, FAQ) pin the heading column with a sticky top offset on desktop while the list scrolls. Tilted-tile compositions (work, facts) are absolutely placed in percentages on mobile so the scatter keeps its shape at every width, and fall into an even row on desktop.

The hero is a full 100svh: headline block left, the chrome striped zip dimmed at the bottom on mobile and at full strength on the right from 1024px. A faint 56px grid with a radial white glow sits behind the hero, facts and contact, masked to fade out.

Touch targets are at least 44px everywhere (buttons 46 to 52px, nav and menu rows 44px, accordion rows 56px). Hierarchy is verified at 360, 390 and 430px in real WebKit.

## Elevation & Depth

Two materials, two depth logics. Solid cards sit on the ground: a subtle vertical gradient, a hairline border and a 1px inner top highlight, no drop shadow. Glass floats: backdrop blur plus 180% saturation, a bright inner top edge, a faint lower inner edge, a 140° gradient rim, a soft radial sheen from the top left, and one soft dark drop shadow beneath. In Chromium an SVG displacement map adds edge refraction; Safari and iPhone get the frosted glass alone, which must stand on its own. With reduced transparency, glass becomes a solid #1d1d20.

### Shadow Vocabulary
- **Glass float** (`inset 0 1px 0 rgb(255 255 255/.42), inset 0 -1px 1px rgb(255 255 255/.1), inset 0 0 0 1px rgb(255 255 255/.07), 0 10px 28px -8px rgb(0 0 0/.55)`): every glass element.
- **Card edge** (`inset 0 1px 0 rgb(255 255 255/.06)`): solid cards only.
- **White lift** (`inset 0 -2px 0 rgb(0 0 0/.14), 0 10px 26px -10px rgb(255 255 255/.3)`): the primary button, a soft white glow under a white pill; grows on hover.
- **Tile drop** (`0 30px 50px -18px rgb(0 0 0/.9), inset 0 1px 0 rgb(255 255 255/.2)`): tilted work screenshots.

### Named Rules
**The Glass Floats Rule.** Glass is only for what hovers above the page: nav, sticky CTA, menu, secondary buttons, captions on tiles, fact tiles. Content cards are always solid.

**The Soft Shadows Only Rule.** Every drop shadow is blurred and pulled in with a negative spread. No hard offset shadows.

## Shapes

Round and continuous. Every control and label is a full pill (999px): buttons, nav capsule, sticky capsule, chips, badges, tags. Content containers step down in radius as they get smaller: menu panel 26px, cards and fact tiles 22px, work tiles and accordion rows 18px, tile captions and menu rows 14px, form fields 12px. Borders are always 1px hairlines of white at 9% or 16%.

The 45° stripe is the brand's geometry: the logo and the chrome zip are filled with 45° bars (bar = 54% of the pitch, pitch widened at small sizes so stripes do not blur into grey), the zipper curtain carries a faint 45° hatch, the 404 figure is masked with 45° stripes, and the burger bars rotate -45° to open.

## Components

### Buttons
Tactile pills, one white, one glass.
- **Shape:** full pill (999px), 46px tall; large 52px; small 36px (header only).
- **Primary:** Paper White fill, black text, 500 weight, white lift shadow. One per view is the WhatsApp check.
- **Glass (secondary):** transparent glass with white text and a trailing arrow; tint rises to 12% white on hover.
- **Hover / Focus / Active:** hover only on fine pointers (primary goes to pure white with a bigger glow); press scales to 0.97 in 160ms; focus is a 2px white outline offset 3px.

### Chips and Badge
- **Chip:** pill, 32px, hairline-strong border, quiet grey label text. Used in mock UIs.
- **Badge:** the hero's pill with a solid white inner tag ("Free") followed by grey text. White inner tags also mark the free first step in the process.

### Cards / Containers
- **Corner Style:** 22px.
- **Background:** vertical gradient card-hi to card, hairline border, card-edge highlight, clipped.
- **Internal Padding:** 20px, 28px from 640px.
- **Bento:** the check is a bento of cards each holding a small illustrative mini UI (search pill in glass, a filling ring, a tilted booking path) with no names or scores of anyone's work.

### Inputs / Fields
- **Style:** 12px radius, hairline-strong border, 4% white fill, 16px text, caption-grey placeholder.
- **Focus:** border turns Paper White; no glow.
- **Error:** message in white under the field.

### Navigation
A floating glass capsule, 56px tall, 12px below the safe area, max 1100px, darker tint (18,18,20 at 50%) and 14px blur. Mobile shows the logo and a three-bar burger; the menu grows from the burger's corner as a glass panel (scale 0.94 and blur to sharp). From 768px: centred links in quiet grey (white on hover), language switch, small primary button. On mobile the header CTA is hidden because the sticky capsule carries the same action.

### Sticky CTA (mobile)
A glass capsule under the thumb: label plus a white circular chat button. It arrives after the hero leaves, as material (blur, scale and lift resolve together), and steps aside whenever another block with the same action is on screen.

### Accordion (FAQ)
Rows of 18px radius on card-hi at 60% with a hairline; the open row turns solid Paper White with black text. Height opens via grid rows, never animated height; the plus rotates to minus.

### Package Cards
Three cards, never priced. **Website** and **Growth** are dark cards (parts that work on their own); **System** sits in the middle as the one white card (the paper-white gradient over a solid `#f2f2f5` base, lifted 20px on desktop, first on mobile) because it joins both. Each card: title, one-line promise, module pills with icons (the System's pills are "zipped" by a strip of alternating teeth, `.zipline`), a tick list (the System's list opens with "Everything in Website and Growth, plus:"), a quiet foot line and its own WhatsApp button whose prefilled message names the package.

### Tilted Tiles (signature)
Work screenshots (9:16, 18px) and fact tiles (glass, 22px) sit in a perspective scatter tilted about 14 to 22° on X and -3 to -14° on Z. Hover (fine pointer) or tap straightens and lifts a tile; captions ride on a glass strip inside the tile. Facts carry one chrome figure each.

### Chrome Zip and Zipper (signature)
The zip wordmark drawn in SVG code (never an image), filled with 45° chrome bars and crossed once by a sheen. It sits in the hero and, oversized and cropped at the bottom, closes the footer. On the first visit per session (or with `?zip`), a pure-CSS zipper curtain opens over the hero in about 1.8s while real text is already painted beneath it; skipped under reduced motion.

## Do's and Don'ts

### Do:
- **Do** keep the ground pure black (#000) and the palette mono; emphasis is white, chrome or glass.
- **Do** set section headings as explicit lines with the grey-to-white fade, at headline size or larger.
- **Do** reserve chrome for the zip wordmark, true figures and the hero's filling word.
- **Do** put glass only on floating controls and captions; make it look finished as frosted glass alone, since Safari and iPhone never get the refraction.
- **Do** use full pills for every button, chip, badge and floating capsule; 22px for cards.
- **Do** keep touch targets at 44px or more and verify at 360, 390 and 430px in real WebKit.
- **Do** run hero intros in CSS keyframes, with the headline starting at 15% opacity so LCP counts it from the first frame; under reduced motion, fade only and keep everything visible.
- **Do** keep scroll native (CSS `scroll-behavior: smooth` for anchors, switched off under reduced motion).
- **Do** mirror every home-page change onto /hr through the shared Copy type; a surface exists in both languages or neither.
- **Do** show facts that are already true and written elsewhere: certificates, tools, counts derived from real lists.

### Don't:
- **Don't** show a price, cost figure or amount anywhere.
- **Don't** add reviews, ratings with counts, invented metrics or client logos; leave the slot empty until a real one exists.
- **Don't** show people: no team members, portraits or CV on company pages. The location shown is Zagreb.
- **Don't** introduce a second hue or a brand accent colour.
- **Don't** use glass on content cards, or chrome on headings, buttons or icons.
- **Don't** use hard offset shadows; every shadow is soft with negative spread.
- **Don't** use GSAP on the hero or any smooth-scroll library.
- **Don't** use fade grey for text smaller than a headline.
- **Don't** render the chrome zip as an image; it is SVG code.
