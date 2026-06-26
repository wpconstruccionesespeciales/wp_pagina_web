# WP Site Visual Homogenization Plan

> **Goal:** Bring `Privacidad`, `Terminos` and `Nosotros` pages to the same visual language as `Servicios` and `Sostenibilidad` (rounded-3xl, glows, modern tokens, sage gradient CTA, eyebrow style). Save as a single commit.

**Architecture:** Pure visual refactor — same content, same components, same data, just unified className system. Reference = `src/pages/Servicios.jsx` and `src/pages/Sostenibilidad.jsx`.

**Tech Stack:** React + Tailwind CSS, existing `tailwind.config.js` Material Design 3 tokens (`primary-fixed`, `primary-fixed-dim`, `tertiary-fixed`, `bg-geo-*` utilities).

**Design tokens to apply:**
- Section: `py-28 px-6 lg:px-16 overflow-hidden`
- Bg alternation: `bg-background` / `bg-surface-container-low` / `bg-gradient-to-br from-surface-container-low via-[#eaf2ed] to-surface-container-low`
- Decorative: `bg-primary-fixed/20 rounded-full blur-3xl`, `bg-tertiary-fixed/30 rounded-full blur-3xl`, `bg-geo-dots`, `bg-geo-corners`, `bg-geo-ring`, `bg-[radial-gradient(...)]`
- Eyebrow: `<div className="flex items-center gap-3 mb-4"><div className="w-12 h-px bg-primary/40"/><span className="text-primary text-xs font-extrabold tracking-[0.25em] uppercase">…</span></div>`
- H2: `font-headline text-4xl lg:text-5xl font-bold tracking-tighter text-primary mb-4 leading-tight`
- Subtitle: `text-on-surface-variant text-lg max-w-xl font-medium leading-relaxed`
- Card: `rounded-3xl bg-white border border-outline/10 hover:border-primary-fixed-dim hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden group`
- Hover glow inside card: `absolute -inset-10 bg-primary-fixed/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-full scale-75`
- Corner accents: `absolute top-0 left-0 w-5 h-5 border-t border-l border-primary/20 rounded-tl-xl`
- Icon container: `w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-fixed/40 to-primary-fixed/10 border border-primary/5 group-hover:scale-110 transition-transform duration-500`
- Primary CTA button: `bg-primary hover:bg-[#203728] text-white px-10 py-5 rounded-xl font-headline font-bold text-sm uppercase tracking-[0.15em] shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5`
- Final CTA section: gradient sage with centered icon block, dual CTA (primary button + text link)

**Files to modify (3):**
- `src/pages/Privacidad.jsx`
- `src/pages/Terminos.jsx`
- `src/pages/Nosotros.jsx`

**Out of scope (already modern):** Home page components (`Hero`, `WhyUs`, `AboutUs`, `Services`, `Features`, `SustainabilityBanner`, `Process`, `Comparison`, `Projects`, `Testimonial`, `FAQ`, `Contact`, `WhatsAppButton`) — they already use the modern design tokens (rounded-2xl/3xl, `bg-geo-*`, `bg-primary-fixed`, gradient-text, `bg-primary/8`).

**Verification:** Visual inspection by user. No automated tests.

---

## Task 1: Refactor `src/pages/Privacidad.jsx`

Apply new design system to all 5 sections. Keep:
- Same content
- Same `useInView` hook usage
- Same NavBar/Footer
- Same `document.title` and `window.scrollTo(0, 0)`
- `Footer` (no `showCTA` prop)

Structure target:
- Hero section: light bg with decorative glows, eyebrow "Protección de Datos", gradient-text title
- "Datos que Recopilamos": 2×2 grid of rounded-3xl cards with corner accents
- "Sus Derechos": 3-column grid of rounded-3xl cards
- "Uso de sus Datos": primary block with white/transparent sub-cards
- Final CTA: gradient sage with mail icon and dual CTA

## Task 2: Refactor `src/pages/Terminos.jsx`

Same approach. 5 sections.

Structure target:
- Hero: light bg with eyebrow "Contrato de Servicio"
- "Condiciones Generales": 4 vertical cards with icon+title+desc
- "Condiciones de Pago": 3-column step cards with numbered badge
- "Garantía y Responsabilidad": primary block with grid of sub-items
- Final CTA: gradient sage with verified_user icon

## Task 3: Refactor `src/pages/Nosotros.jsx`

The biggest one. 6 sections + custom `BeforeAfterSlider` + timeline + bento grid.

Structure target:
- Hero "¿Quiénes somos?": 2-col grid (text + image card) with decorative glows
- "Nuestra Historia" timeline: bg `surface-container-low`, decorative dots, vertical timeline (keep the timeline logic)
- "Metamorfosis Estructural": keep BeforeAfterSlider, add 4 stat cards below
- "Trae tu proyecto": bg `surface-container-low`, 2-col with features list + image grid
- "Versatilidad Estructural" bento: keep grid layout, modernize each cell to rounded-3xl with corner accents
- Final CTA: gradient sage with dual CTA

## Task 4: Single commit

```bash
git add src/pages/Privacidad.jsx src/pages/Terminos.jsx src/pages/Nosotros.jsx
git commit -m "refactor: unify WP pages visual language with Servicios/Sostenibilidad design system"
```

---

## Self-review

- **Spec coverage:** Each of the 3 pages has a dedicated task with structure target. ✓
- **Placeholder scan:** No "TBD"/"TODO" — concrete design tokens specified. ✓
- **Type consistency:** Same tokens (rounded-3xl, primary-fixed, etc.) used in all 3 pages. ✓
- **Risk:** `Nosotros.jsx` has complex `BeforeAfterSlider` and timeline — must preserve their logic, only refactor surrounding chrome. ✓
