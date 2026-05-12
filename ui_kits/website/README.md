# G - Barbershop · Website UI Kit

The marketing website is the only product surface for the brand. This kit is a high-fidelity, pixel-near recreation of the production Next.js site in plain React + CSS, suitable for prototypes, redesigns, and one-off marketing pages.

## Files

- `index.html` — interactive click-through homepage (Hero → About → Services → Pricing → Team → Gallery → Branches → Footer), with a working mobile nav drawer and price-tab toggle.
- `App.jsx` — top-level composition.
- `Header.jsx` · `Footer.jsx` · `MobileNav.jsx` — chrome.
- `Hero.jsx` · `About.jsx` · `Services.jsx` · `Pricing.jsx` · `Team.jsx` · `Gallery.jsx` · `Branches.jsx` — sections.
- `primitives.jsx` — `Button`, `Tag`, `Card`, `AccentLine`, `SectionHeader`, `Icon`.

## Conventions

- Uses `../../colors_and_type.css` for tokens (no duplication).
- Mobile-first; breakpoints at `768px` upgrade to grids and lift hover affordances.
- All copy lives in `../../assets/data/home.json` (verbatim from the source).
- All imagery is read from `../../assets/` (logo, branches, gallery, team, price).
- Click-through behaviour: phone CTA opens a tel link, "Đặt lịch hẹn" scrolls to the contact panel, the mobile burger toggles a full-height drawer.

## Caveats

- Antd `Drawer`, `Carousel`, `Image.PreviewGroup` from the source are replaced with simple equivalents. The visual surface matches; the under-the-hood mechanics are simpler.
- Auto-scrolling mobile card rows are reduced to passive scroll-snap (no `setInterval` pacing).
- This is a recreation, not new design. Layouts, colours, type, copy, and image choices follow the source.
