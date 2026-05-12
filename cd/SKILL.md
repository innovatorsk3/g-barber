---
name: g-barbershop-design
description: Use this skill to generate well-branded interfaces and assets for G - Barbershop, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick references
- `colors_and_type.css` — drop into any new artifact for tokens + typography
- `assets/` — logos, photography (logos, branches, gallery), copy at `assets/data/home.json`
- `ui_kits/website/` — full marketing-site recreation (componentised React)
- `preview/*.html` — small swatches/specimens covering the system surface-by-surface

## Brand quick facts
- **Voice:** Vietnamese, warm, second-person, slightly formal-respectful. Never translate brand copy to English unless asked. Phrases like "TÓC ĐẸP TỪ TÂM" and "Tâm & Tài" are non-negotiable.
- **Palette:** warm cream `#FAF8F5`, charcoal `#1C1410`, crimson `#b91c1c` (the one accent), gold `#C49A2A` (stars only).
- **Type:** Oswald display UPPERCASE + Inter body. Display always tracks 0.04–0.06em.
- **Buttons:** full-radius pills, UPPERCASE 0.15em tracking, 48px tall, primary crimson with crimson-tinted shadow on hover.
- **Cards:** 10px radius, 1px `#E8E3DC` border, soft shadow at rest, lifts 6px on hover with a crimson 1px ring + 54px shadow.
- **Imagery:** warm-light photography only — no illustrations, no flat vectors, no gradients-as-fill.
- **Icons:** Antd `*Outlined` set in use; `lucide-react` available as fallback. ~1.8px stroke, line style.
