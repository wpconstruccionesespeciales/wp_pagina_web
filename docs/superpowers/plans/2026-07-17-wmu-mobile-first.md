# WMU Mobile-First Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `subagent-driven-development` (recommended) or inline execution to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `/wmu` feel intentionally designed on phones, removing overlaps and footer whitespace while preserving the premium WMU identity and desktop layout.

**Architecture:** Keep WMU in `src/pages/WMU.jsx`, but replace the most restrictive inline layout rules with semantic classes that can be controlled consistently at mobile breakpoints. Add one mobile-only bottom contact bar and use content-driven sizing for the hero, section navigation, cards, and footer. Preserve routes, content, images, and desktop behavior.

**Tech Stack:** React 19, React Router, Vite, CSS-in-JSX style block, existing inline styles and SVG icons.

---

### Task 1: Establish WMU responsive primitives and baseline measurements

**Files:**
- Modify: `src/pages/WMU.jsx:841-1028`

- [ ] **Step 1: Add reusable responsive classes to the WMU CSS block**

Add classes for `wmu-shell`, `wmu-container`, `wmu-section`, `wmu-actions`, and `wmu-mobile-only`. Keep this foundation neutral: the fixed CTA's bottom clearance belongs to Task 2, and section-specific spacing belongs to Task 3.

```css
.wmu-shell { width: 100%; min-width: 0; overflow-x: clip; }
.wmu-container { width: min(1200px, calc(100% - 32px)); margin-inline: auto; }
.wmu-section { min-width: 0; }
.wmu-actions { display: flex; flex-wrap: wrap; gap: 12px; }
.wmu-mobile-only { display: none; }

@media (max-width: 768px) {
  .wmu-actions > a { min-height: 48px; }
}

@media (max-width: 560px) {
  .wmu-container { width: min(100% - 32px, 520px); }
  .wmu-mobile-only { display: block; }
  .wmu-actions { flex-direction: column; }
  .wmu-actions > a { width: 100%; text-align: center; }
}
```

- [ ] **Step 2: Apply the shell and section classes without changing content**

Add `className="wmu-shell"` to the page root and add `wmu-section` to the top-level WMU sections. Keep existing inline styles and vertical rhythm as defaults until Tasks 2–4 add the component-specific mobile behavior.

- [ ] **Step 3: Run the existing static checks**

Run `npm run lint`.

Expected: ESLint completes without errors. If the current repository reports unrelated pre-existing warnings, record them and do not modify unrelated files.

- [ ] **Step 4: Commit the responsive foundation**

```bash
git add src/pages/WMU.jsx
git commit -m "style(wmu): add mobile responsive foundation"
```

### Task 2: Rebuild the mobile header, hero, and contact affordance

**Files:**
- Modify: `src/pages/WMU.jsx:112-230`
- Modify: `src/pages/WMU.jsx:841-1028`

- [ ] **Step 1: Make WMUNav safe at phone widths**

Give the nav a `wmu-nav` class, use a 68px mobile height, reduce horizontal padding to 16px, and add a direct WhatsApp icon action on the right. Keep the existing back link and logo routes intact. On narrow screens, hide the “Volver” text and constrain the logo to `max-width: 132px` so the three controls cannot collide.

- [ ] **Step 2: Add the mobile bottom contact bar**

Render a `wmu-mobile-contact` element after `WMUFooter` and before `FloatingWhatsApp`, linking to the existing `WA` constant. Style it as fixed, bottom-aligned, mobile-only, with `padding-bottom: env(safe-area-inset-bottom)`, a 48px touch target, and a high-contrast green CTA. Add enough page bottom padding from Task 1 so it never hides footer content.

- [ ] **Step 3: Reorder the mobile hero by classes**

Give the hero content wrapper `wmu-hero-inner`, the copy `wmu-hero-copy`, and the figure `wmu-hero-media`. At `max-width: 900px`, use one column with the copy first, then media; at `max-width: 560px`, set `min-height: auto`, `padding: 112px 16px 56px`, reduce the hex media to `min(82vw, 360px)`, and make the financing cue `width: 100%`.

- [ ] **Step 4: Make hero actions fit without clipping**

Apply `wmu-actions` to the hero button group. At 560px and below, stack the actions full width and allow the benefit chips and financing cue to wrap. Keep labels unchanged.

- [ ] **Step 5: Run lint and build**

Run `npm run lint` and `npm run build`.

Expected: both commands exit successfully and the generated build contains the WMU route.

- [ ] **Step 6: Commit navigation and hero changes**

```bash
git add src/pages/WMU.jsx
git commit -m "feat(wmu): optimize mobile hero navigation and contact"
```

### Task 3: Stabilize sticky subnav, grids, cards, and section spacing

**Files:**
- Modify: `src/pages/WMU.jsx:234-801`
- Modify: `src/pages/WMU.jsx:913-1028`

- [ ] **Step 1: Remove mobile overlap from the section subnav**

Give the subnav a `wmu-subnav-shell` class and, below 560px, set `top: 68px`, `width: calc(100% - 24px)`, `max-width: none`, `margin: 0 auto`, `border-radius: 16px`, and `overflow-x: auto`. Add `scroll-padding-top: 84px` to the WMU page and use `scroll-margin-top: 84px` on the anchored sections.

- [ ] **Step 2: Make model and press layouts content-driven**

At 768px and below, force all section grids to one column except the compact model/press grids that have enough width for two columns. At 560px and below, make those grids one column and set card image heights through `aspect-ratio` rather than fixed minimum heights. Add `min-width: 0` to grid children to prevent long labels from expanding the viewport.

- [ ] **Step 3: Normalize mobile spacing on expansion, recognition, specs, and manifesto**

Use the `wmu-section` class to override the existing `clamp()` padding at phone widths to 56–64px vertical. Reduce decorative oversized letterforms and hide nonessential wire/grid decoration below 560px when it competes with copy. Keep all content and links present.

- [ ] **Step 4: Preserve accessible motion behavior**

Keep the existing `prefers-reduced-motion` rule and extend it to the hero/media transforms and card hover transforms so touch devices do not depend on hover state. Verify no motion rule changes layout height during scrolling.

- [ ] **Step 5: Commit the section layout changes**

```bash
git add src/pages/WMU.jsx
git commit -m "style(wmu): stabilize mobile section layouts"
```

### Task 4: Compact and rebalance the WMU footer

**Files:**
- Modify: `src/pages/WMU.jsx:808-834`
- Modify: `src/pages/WMU.jsx:1001-1028`

- [ ] **Step 1: Add semantic footer classes**

Add `wmu-footer`, `wmu-footer-grid`, `wmu-footer-contact`, `wmu-footer-social`, and `wmu-footer-bottom` classes to the existing footer markup while retaining all text, links, and social destinations.

- [ ] **Step 2: Define a compact mobile footer layout**

At 768px and below, use a single-column layout with `gap: 28px`, `margin-bottom: 32px`, and no artificial equal-height behavior. At 560px and below, reduce footer padding to `40px 0 24px`, set the contact block line-height to 1.55, let the social links wrap, and stack the bottom row with `align-items: flex-start`. Ensure the copyright copy can wrap naturally and does not force horizontal overflow.

- [ ] **Step 3: Verify the footer with the mobile contact bar present**

Confirm the footer has visible content through its final border and that the fixed CTA does not create an apparent blank strip. Keep only the intentional safe-area inset below the CTA.

- [ ] **Step 4: Commit the footer changes**

```bash
git add src/pages/WMU.jsx
git commit -m "style(wmu): compact mobile footer"
```

### Task 5: Responsive QA and regression verification

**Files:**
- Modify: `src/pages/WMU.jsx` only if QA identifies a confirmed issue.

- [ ] **Step 1: Run lint and production build**

Run `npm run lint` and `npm run build`.

Expected: both exit with code 0.

- [ ] **Step 2: Test the page at representative widths**

Run the Vite dev server with `npm run dev -- --host 0.0.0.0`, then inspect `/wmu` at 320px, 375px, 430px, 768px, 1024px, and 1440px viewport widths.

- [ ] **Step 3: Check the mobile acceptance criteria**

At 320–430px confirm: no horizontal scrollbar; header controls do not overlap; hero copy precedes the image; both hero actions are fully visible; subnav does not cover section content; cards have no clipped labels; the bottom CTA does not cover content; footer ends directly after its final row without a large blank area.

- [ ] **Step 4: Check interaction and accessibility**

Confirm all primary links remain keyboard focusable, the WhatsApp actions have accessible labels, anchor jumps leave headings visible below the fixed header, and reduced-motion mode disables transform-heavy reveals.

- [ ] **Step 5: Review the final diff and commit any QA fix**

Run `git diff --check` and `git status --short`. If a fix is required, make the smallest scoped change in `src/pages/WMU.jsx`, rerun lint/build, and commit:

```bash
git add src/pages/WMU.jsx
git commit -m "fix(wmu): resolve responsive QA findings"
```

## Self-review

- Scope is limited to the WMU landing page and its mobile presentation.
- Header, hero, subnav, section grids, persistent contact, footer, reduced motion, safe areas, and verification are each covered by a task.
- No placeholder requirements or undefined file names are used.
- Desktop behavior is preserved by applying new overrides only at responsive breakpoints unless a semantic class is shared.
