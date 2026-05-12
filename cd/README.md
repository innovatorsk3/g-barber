# G - Barbershop Design System

A complete brand & UI system for **G - Barbershop**, a chain of three premium men's barbershops in Bình Dương and TP.HCM, Vietnam.

> *"TÓC ĐẸP TỪ TÂM"* — Beautiful hair, from the heart.
> Tagline (EN): *"From Heart to Hair."*

---

## 1. Brand at a glance

| | |
|---|---|
| **Name** | G - Barbershop |
| **Founded** | 2021 (Dĩ An, Bình Dương) |
| **Branches** | 3 — Lương Đình Của (Dĩ An), Linh Xuân (Thủ Đức), Nguyễn Hiền (Dĩ An) |
| **Hotline** | 0947 947 168 |
| **Email** | gbarber.hcm@gmail.com |
| **Hours** | 8:00 – 21:00, Mon – Sun |
| **Language** | Vietnamese (vi-VN) — primary. Most copy is Vietnamese. |
| **Visual mood** | Warm cream + deep charcoal, crimson accent, masculine, condensed-typographic, editorial |

**Positioning.** G - Barbershop is a mid-premium neighbourhood barbershop. It blends classic barbering (cạo mặt, hot towel) with modern men's hairdressing (Korean perm, side-part, color & bleach). The brand reads as *warm, masculine, professional but not corporate* — "chuyên nghiệp nhưng không hề công nghiệp" (professional but never industrial), as one of their testimonials puts it.

**Service mix.** Cuts & combos (40–60K VND), perms (250–600K), color & bleach (250–800K), straightening / side-press, grooming add-ons (shave, ear-cleaning, blackhead extraction).

---

## 2. Sources

Everything in this system was extracted from a single attached source.

- **Codebase** — `g-barber/` (mounted local folder, Next.js 16 / React 19 app)
  - `app/globals.css` — full design-token CSS (source of truth)
  - `app/layout.tsx` — font loading (Oswald + Inter via `next/font`)
  - `lib/constants/brand.ts` — brand constants
  - `data/home.json` — all marketing copy (also copied to `assets/data/home.json`)
  - `features/home/components/` — Hero, About, Services, Pricing, Team, Gallery, Branches
  - `features/about/components/AboutPageClient.tsx` — timeline / history
  - `shared/components/` — Header, Footer, MobileNav, HorizontalScrollCards
  - `public/assets/` — all photography (logo, branches, gallery, team, price card)
- **No Figma, no slide deck, no separate brand book** were provided. Copy and visual rules in this system are reverse-engineered directly from the codebase.

**Tech stack** (for context — *the design system does not require it*): Next.js 16, React 19, Ant Design v6, `@ant-design/icons`, `lucide-react`, Tailwind 4 (PostCSS only), Google Fonts (Oswald + Inter).

---

## 3. Index — what's in this folder

```
.
├── README.md                ← you are here
├── SKILL.md                 ← Agent Skill entry point (for Claude Code / agents)
├── colors_and_type.css      ← CSS custom properties + type primitives
├── assets/                  ← raw photography & logos copied from /public
│   ├── logo/                · logo_g.png · logo.jpg
│   ├── branches/            · cn1.jpg · cn2.jpg · cn3.jpg
│   ├── gallery/             · 3.jpg–6.jpg (haircut styles)
│   ├── team/                · 1.jpg · 2.jpg (lifestyle)
│   ├── price/               · price.jpg (the printable price card)
│   └── data/home.json       · all marketing copy (Vietnamese)
├── preview/                 ← cards rendered into the Design System tab
│   ├── colors-*.html
│   ├── type-*.html
│   ├── spacing-*.html
│   ├── components-*.html
│   └── brand-*.html
└── ui_kits/
    └── website/             ← marketing-site UI kit (the only product surface)
        ├── README.md
        ├── index.html       · interactive click-through homepage
        ├── tokens.css       · pulls in colors_and_type.css + layout helpers
        ├── Header.jsx · Footer.jsx · MobileNav.jsx
        ├── Hero.jsx · About.jsx · Services.jsx · Pricing.jsx
        ├── Team.jsx · Gallery.jsx · Branches.jsx
        └── primitives.jsx   · Button · Tag · Card · AccentLine · SectionHeader
```

---

## 4. Content fundamentals

### 4.1 Language & casing

- **Primary language: Vietnamese.** All marketing copy ships in Vietnamese, including section labels (`Dịch Vụ`, `Đội Ngũ Barber`, `Các Chi Nhánh`). Diacritics are always preserved. Do **not** translate brand-side copy into English without explicit permission — the Vietnamese voice is part of the identity.
- **Display type is UPPERCASE** with wide letter-spacing (`0.04em – 0.06em`). Section titles, hero headlines, eyebrow tags — all SHOUT, but the condensed Oswald keeps it from feeling shouty. Body type is sentence case.
- **English appears only as condensed brand marks** (`G - BARBERSHOP`, `FROM HEART TO HAIR`) or as service vernacular ("SidePart", "Korean Perm", "Buddha Perm", "Cup Setting"). When English is used, it's usually capitalised like a proper noun.
- **The brand always types with the spaced hyphen: `G - Barbershop`** — never `G-Barbershop` or `GBarbershop`. The single capital `G` is often colour-accented in crimson while ` - Barbershop` stays neutral.

### 4.2 Voice & tone

The voice is **warm, second-person, slightly formal-respectful**, befitting Vietnamese service culture. It addresses customers as `bạn` ("you", informal-friendly), uses `chúng tôi` for "we", and reaches for phrases like `quý ông` ("gentlemen", formal-respectful) on the about page. It is:

- **Confident, not boastful.** "Chuyên nghiệp nhưng không hề công nghiệp" / *professional but never industrial.*
- **Warm & relational.** The hero literally says the shop is "không chỉ là tiệm cắt tóc mà còn là nơi gặp gỡ và cùng trò chuyện" (not just a salon, but a place to meet and chat).
- **Specific.** Prices are concrete (`60K`, `250K`, `650 – 800K`). Service names use the real industry vernacular (`Buddha Perm`, `Ép Side`).
- **Heart-led.** The brand name itself is wrapped in `TÓC ĐẸP TỪ TÂM` — *beautiful hair from the heart.* "Tâm" (heart, intent, conscience) is the operative virtue — it shows up in the team section heading "Tâm & Tài" (Heart & Talent).

### 4.3 Casing examples

| Surface | Pattern | Example |
|---|---|---|
| Hero tagline | UPPER, spaced, often with ✦ flourish | `✦ TÓC ĐẸP TỪ TÂM ✦` |
| Hero headline | UPPER, `G` colour-accented | `G - BARBERSHOP` |
| Section tag (eyebrow) | Title Case Vietnamese, crimson, tracked | `Đội Ngũ Barber` · `Bảng Giá` |
| Section heading | UPPER condensed | `DỊCH VỤ CỦA CHÚNG TÔI` |
| Body paragraph | Sentence case, normal punctuation | `G - Barbershop là chuỗi tiệm cắt tóc…` |
| Button label | UPPER, heavy tracking | `ĐẶT LỊCH HẸN` · `XEM BẢN ĐỒ` |
| Service item | Title Case, sometimes English-mixed | `Combo: Cắt-Xả-Tạo Kiểu` · `Korean Perm` |
| Price | Bold, K-suffixed, no decimals | `60K` · `350K` · `650 – 800K` |

### 4.4 Emoji & symbols

- **Decorative unicode is used sparingly and intentionally.** The hero tagline is bracketed by `✦` four-pointed stars. Testimonial blocks use a row of `★★★★★` rendered in `--accent-gold`. The CTA section uses `♥` ("Made with ♥ in Việt Nam").
- **The price card uses scissors/fire/palette emoji** (✂️ 🔥 🎨 💇 💆) as service-category icons in `home.json`. This is the **one** place the brand permits emoji-as-icon — and the UI kit replaces them with Lucide icons for the on-page experience. **In new designs, prefer Lucide icons over emoji** unless mirroring the data structure exactly. Flag any emoji-heavy direction as off-brand.
- **No flag emoji, no animals, no faces.** The vocabulary is grooming-domain only.

### 4.5 Tone do/don't

✅ "G - Barbershop kết hợp giữa phong cách cổ điển & hiện đại."
✅ "Đội ngũ thợ giàu kinh nghiệm và nhiệt tình."
✅ "Đẳng cấp trong từng đường kéo." (footer pull-quote)

❌ "Welcome to G - Barbershop!" (translates the voice out of Vietnamese)
❌ "✨ Best haircuts in town 🔥💯" (no emoji-stack hype)
❌ "Book now! Limited time!" (no urgency tactics; the brand sells craft, not deals)

---

## 5. Visual foundations

### 5.1 Palette

A **warm-cream + charcoal** base with a single **crimson accent** (`#b91c1c`) doing all the heavy semantic lifting. A muted **gold** (`#C49A2A`) exists for ratings/stars only. There is no green, no blue — every interactive cue, every eyebrow tag, every hover state goes through one of these two warm hues.

- `--bg-primary  #FAF8F5` — page background (warm off-white, never pure #FFF on top-level)
- `--bg-secondary #F3EEE8` — alternating sections (slightly deeper cream)
- `--bg-card     #FFFFFF` — cards float pure white above the cream
- `--bg-dark     #0F0E0D` — the "Team" section and footer; near-black with warm undertone
- `--accent      #b91c1c` — buttons, eyebrow text, link underlines, dot indicators
- `--accent-gold #C49A2A` — star ratings, occasional inflection (very limited use)
- `--text-primary #1C1410` — *not* black; warm-bias dark brown
- `--border      #E8E3DC` — soft warm-cream borders

> Rule: never introduce a cool hue. Even greys are warm-biased. Even whites are creams.

### 5.2 Type

- **Display: Oswald** — semi-condensed, geometric, weights 500/600 — set in `UPPERCASE` with `letter-spacing: 0.04em–0.06em`. All headlines, hero, section titles, brand mark.
- **Body: Inter** — weights 400/600/700 — for paragraphs, button labels, captions. Line-height `1.7` for body, `1.65` for testimonial italics.
- **Scale:** fluid `clamp()` everywhere — never fixed px on display type. Body floats `0.88rem – 1.1rem`, H2 floats `1.75rem – 3rem`, hero display goes up to `7rem`.

> Substitution note: Both Oswald and Inter are loaded **live from Google Fonts** in `colors_and_type.css`. No font files are committed (the source uses `next/font` which downloads them at build). If you self-host, drop the woff2s into `fonts/` and update the `@import`. — Flagged to user.

### 5.3 Spacing

- **Section padding:** `var(--section-py)` = `clamp(3rem, 8vw, 7rem)` — generous editorial breathing room.
- **Container:** `max-width: 1200px`, centred, with responsive horizontal padding `16 → 24 → 40 → 60px` at breakpoints `0 / 640 / 768 / 1280`.
- **Grid gaps:** `12px` (mobile) → `16–24px` (tablet) → `20–28px` (desktop). Never tight; the brand reads luxe because it breathes.
- **Card padding:** `12–22px` clamp; tighter on mobile, expansive on desktop.

### 5.4 Radius

- `--radius-sm  6px` — chips, micro pills.
- `--radius    10px` — default cards, image wells.
- `--radius-lg 16px` — hero images, large promotional wells, the closing-statement panel.
- `--radius-full` — **all primary buttons are full-radius pills.** This is a strong signature; do not flatten buttons to square.

### 5.5 Borders

- Default border is `1px solid var(--border) (#E8E3DC)` — barely there.
- On card hover: border shifts to `rgba(185,28,28,0.28)` (transparent crimson) plus a `box-shadow` ring of the same hue — this is the signature *card-comes-forward* effect.
- Dark sections use `border: 1px solid rgba(255,255,255,0.08)` instead.
- **No double borders, no neon outlines, no dashed/dotted.** Always 1px solid.

### 5.6 Shadows

A three-tier system, all warm-tinted (never neutral 0,0,0 except at very low opacity):

- `--shadow-sm` `0 2px 8px rgba(0,0,0,0.03)` — resting card on mobile.
- `--shadow`    `0 4px 16px rgba(0,0,0,0.05)` — resting card on desktop.
- `--shadow-md` `0 10px 40px rgba(0,0,0,0.1)` — pricing-image well, prominent panels.
- `--shadow-lg` `0 22px 54px rgba(26,26,24,0.12), 0 0 0 1px rgba(185,28,28,0.1)` — hovered card (with the crimson ring).
- `--shadow-cta`  `0 8px 28px rgba(185,28,28,0.4)` — primary button hover-lift glow (crimson-tinted).
- `--shadow-dark` `0 4px 24px rgba(0,0,0,0.4)` — cards in dark sections.

> Inner shadows are not used. Box-shadow doubles as the "ring" technique on hovered cards.

### 5.7 Backgrounds & imagery

- **Photography:** warm, slightly desaturated, naturally-lit. Skin tones lean amber. Team photos start at `filter: grayscale(50%)` and *colour up* on hover — a beloved signature of the codebase.
- **No gradients-as-fill.** Gradients are *only* used as overlay-fades for hero text legibility (`linear-gradient(180deg, …)` from `rgba(10,8,6,0.76)` down to `#FAF8F5`).
- **Noise overlay.** A near-invisible SVG fractal-noise (`opacity: 0.02`) sits over hero/about backgrounds on desktop only (disabled on mobile to spare GPU). It's the subtle texture you only notice when it's removed.
- **Full-bleed hero images** are the dominant pattern: page-top hero, about-page hero. Use `object-position: center 30%` for portrait subjects so faces land in the safe zone.
- **No hand-drawn illustrations. No SVG mascots. No flat-vector character art.** Imagery is photographic only.
- **No repeating patterns.** Texture comes from the noise overlay alone.

### 5.8 Borders that aren't borders

A **`.accent-line`** — a `40 × 2px` solid crimson bar — sits below section eyebrows like a print-magazine kicker. Use it as the connective tissue between an eyebrow tag, the H2, and the body. It's the system's most repeated decoration.

### 5.9 Animation

- **Easing:** one curve everywhere — `cubic-bezier(0.4, 0, 0.2, 1)` (Material-style ease-in-out, slightly bottom-weighted). Exposed as `var(--ease)`.
- **Duration:** `0.3s` for hovers/state, `0.6–0.8s` for entry transitions, `30s+` for marquees.
- **Entry pattern:** `fadeInUp` — `opacity 0 + translateY(24px) → 1, 0` — staggered with `.delay-1 … .delay-5` (`0.1s, 0.2s, 0.35s, 0.5s, 0.6s`).
- **Scroll reveal:** `IntersectionObserver` flips a `.visible` class on `.reveal.will-hide`; first visible state opacities up over `0.75s`. Children stagger with `.reveal-delay-1 … .reveal-delay-6` (`0.08s × n`).
- **No bounces, no springs, no overshoot.** One bouncy keyframe exists on the "3 Branches" badge and that's the only one. Don't add more.
- **No parallax. No scroll-jacking.** Just reveal + hover + a single 30s marquee for a "trusted by" bar.

### 5.10 Hover & press states

- **Cards:** `translateY(-6px)` + crimson-tinted shadow ring on hover (desktop only). On mobile `:active` → `scale(0.98)`.
- **Primary button:** `translateY(-2px)` + `box-shadow: 0 8px 28px rgba(185,28,28,0.4)`. Background darkens `#b91c1c → #991b1b`.
- **Outline button:** background washes to `rgba(185,28,28,0.08)` on hover.
- **Nav link:** colour shifts to `--accent` and an underline grows `width: 0 → 100%` from the left in `0.35s`.
- **Press:** `transform: scale(0.97)` on buttons; `scale(0.98)` on cards.
- **Touch devices:** hover lifts are disabled via `@media (hover: none)` — the press scale is what carries the feedback.

### 5.11 Transparency & blur

- **Header (desktop):** `background: rgba(250,248,245,0.92); backdrop-filter: blur(20px) saturate(160%)`. Mobile gets a solid 0.98-cream instead (blur is GPU-expensive on low-end phones — the codebase makes this trade explicit).
- **Bottom mobile nav:** `rgba(255,255,255,0.97) + blur(20px) saturate(160%)`.
- **Branch-image chip overlays:** `rgba(255,255,255,0.92) + backdrop-filter: blur(4px)` — used for the small "CS 1" branch label tags.

### 5.12 Cards — the canonical spec

```
background: #FFFFFF
border: 1px solid #E8E3DC
border-radius: 10px
box-shadow (resting, desktop): 0 4px 16px rgba(0,0,0,0.05)
box-shadow (hover, desktop):   0 22px 54px rgba(26,26,24,0.12), 0 0 0 1px rgba(185,28,28,0.1)
transform (hover): translateY(-6px)
transition: 0.4s var(--ease)
```

Dark-section variant: `background #1E1A17`, border `rgba(255,255,255,0.08)`, shadow `0 4px 24px rgba(0,0,0,0.4)`.

### 5.13 Layout rules

- **One fixed element only:** the header (always on top, 64–80px tall). The bottom mobile nav is fixed when present.
- **Mobile-first**, with carefully named breakpoints used consistently in the codebase: `640 / 768 / 1024 / 1280`.
- **Horizontal scroll-snap on mobile** for any list of cards (services, team, branches). Desktop swaps that for a CSS grid. The mobile experience always includes a row of dot indicators **and** a one-time "Vuốt xem thêm" (swipe for more) hint chip.
- **Mobile section padding** is reduced (`clamp(2.5rem, 6vw, 4rem)`) because content-visibility is enabled on off-screen sections (`content-visibility: auto`) for perf.

---

## 6. Iconography

See the dedicated section in the visual foundations above — and use the cheatsheet:

- **Source:** Ant Design Icons (`@ant-design/icons`) is the primary in-app icon set. `lucide-react` is loaded but I didn't find it used anywhere in the surveyed components — it's available as a fallback. Both are line icons, ~1.5–2px stroke, geometric.
- **Common Antd icons in use:** `PhoneOutlined`, `MenuOutlined`, `CloseOutlined`, `EnvironmentOutlined`, `ClockCircleOutlined`, `ArrowRightOutlined`, `HomeOutlined`, `UserOutlined`. Roughly all `*Outlined` variants — the brand never uses `*Filled` Antd icons.
- **Stroke style:** outline only. ~1.5–2px effective stroke. Square-rounded terminals.
- **Color usage:** icons inherit `currentColor`. They appear in `--text-primary`, `--text-secondary`, or `--accent` — never both at once on one icon.
- **No icon font** is shipped with the brand (Antd ships its own icon set as React components). No SVG sprite. No custom-drawn icons.
- **Emoji as iconography:** allowed only in the price card data structure (✂️ 🔥 🎨 💇 💆) where each marks a service category. Replace with Lucide / Antd icons in any in-page rendering — the data uses emoji to be portable, but the design isn't supposed to render them.
- **Unicode decorations:** `✦` (hero tagline frame), `★` (star ratings, gold), `♥` (footer signoff), `&ldquo; &rdquo;` (smart quotes on testimonials), `·` (interpunct between meta items, e.g. phone · hours).

> For new agents: prefer `lucide-react` (it's already a dependency) for any **new** icons you introduce — it has a fuller modern set than Antd's icon library. Use Antd icons only to match patterns that already exist (`PhoneOutlined`, `EnvironmentOutlined`, etc.).

---

## 7. UI kits

There is **one product surface**: the marketing website (`g-barber.com`-style Next.js app). There is no mobile app, no admin dashboard, no docs site. The single UI kit at `ui_kits/website/` covers it end to end.

- **What's included:** Header, Footer, MobileNav, Hero, AboutSection, ServicesSection, PricingSection, TeamSection, GallerySection, BranchesSection, plus primitives (Button, Tag, Card, AccentLine, SectionHeader).
- **What's omitted:** the live AntD-powered Drawer (mobile menu), Image preview lightbox, and Carousel auto-scroll logic — those are AntD components in the source. The UI kit re-creates static, cosmetic versions of the same surfaces in plain React + CSS.

See `ui_kits/website/README.md` for usage and the click-through `index.html` for the live demo.

---

## 8. Quick start for new artifacts

```html
<link rel="stylesheet" href="colors_and_type.css">
<style>
  body { background: var(--bg-primary); color: var(--text-primary); font-family: var(--font-body); }
  .btn-primary {
    background: var(--accent); color: var(--bg-primary);
    border: none; border-radius: var(--radius-full);
    height: 48px; padding: 0 28px;
    font: 700 0.7rem/1 var(--font-body);
    letter-spacing: 0.15em; text-transform: uppercase;
    transition: all var(--transition);
  }
  .btn-primary:hover { background: var(--accent-hover); transform: translateY(-2px); box-shadow: var(--shadow-cta); }
</style>
```

---

## 9. Open questions / caveats

- **No font files committed.** Oswald + Inter are CDN-loaded via Google Fonts. Flag if self-hosting is needed for offline / production.
- **Team photos and the about-section "barbershop" hero are Unsplash stock URLs** in the source — not licensed brand photography. They should be replaced before going to production. Local-saved branch photos (`/assets/branches/cn{1-3}.jpg`) *are* on-brand and were copied here.
- **No logo SVG** was found in the source — only `logo_g.png` (the G monogram) and `logo.jpg`. Ask the brand for a vector logo for print/large applications.
- **No tablet-or-larger app screens** — the site is mobile-first and stops scaling at `1200px`. Above that, content stays centred in the container.
- **Brand voice in English** is essentially untested. The two English phrases that exist ("FROM HEART TO HAIR", "Made with ♥ in Việt Nam") are taglines, not running copy.

