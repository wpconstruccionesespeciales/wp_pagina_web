# WMU mobile-first redesign

## Goal

Deliver a polished mobile experience for `/wmu` that preserves WMU's premium editorial identity while making contact and model discovery easy on small screens. The mobile layout must eliminate overlaps, accidental overflow, oversized empty areas, and desktop spacing inherited by mobile.

## Scope

- Mobile behavior for the WMU landing page in `src/pages/WMU.jsx`.
- Shared WMU navigation, subnavigation, floating/persistent contact actions, section spacing, cards, and WMU footer.
- Preserve the desktop visual direction and existing content, routes, links, imagery, and animations unless a change is required for responsive correctness.
- Do not redesign unrelated WP pages or replace the WMU content model.

## Experience design

### Header and navigation

- Use a compact mobile header around 64–68px tall.
- Keep the WP mark centered, reduce the back affordance to a compact icon/label treatment, and expose a direct WhatsApp action.
- Ensure all fixed header content respects horizontal safe padding and never collides with the logo.
- Maintain a high-contrast scrolled state and avoid fixed elements covering the first meaningful hero content.

### Hero

- Use a mobile-only one-column composition with the value proposition and primary CTA before the supporting render.
- Replace rigid viewport-height behavior with content-driven sizing and controlled vertical padding.
- Make primary and secondary actions reachable with a thumb; buttons may stack and should not overflow.
- Keep the financing cue readable and allow it to wrap naturally.

### Section navigation

- Keep the section navigation sticky only within a stable, non-overlapping layout.
- Make it horizontally scrollable on narrow screens, with visible touch targets and no negative margins that cause overlap or blank gaps.
- Use scroll offsets compatible with the fixed header.

### Content sections

- Stack grids intentionally below tablet widths instead of forcing desktop proportions.
- Normalize mobile section padding and gaps through a small WMU spacing system.
- Keep model and press cards readable, with image ratios that avoid excessive vertical gaps.
- Preserve motion on touch-safe interactions and honor reduced-motion preferences.
- Keep CTA groups full-width or two-up only when both labels fit comfortably.

### Persistent contact

- Add a compact mobile-only bottom contact bar for the main WhatsApp/cotización action.
- Respect `env(safe-area-inset-bottom)` and add page bottom padding so the bar never obscures content.
- Keep the existing floating WhatsApp affordance for larger screens; avoid duplicating competing actions on mobile.

### Footer

- Replace the desktop three-column assumption with a compact mobile stack.
- Group contact, hours, and social links with deliberate spacing and no empty column height.
- Keep the legal/copyright row readable and allow it to wrap without creating a large trailing void.

## Technical approach

- Introduce semantic WMU class names for responsive layout primitives where inline styles currently prevent reliable breakpoint control.
- Add a mobile breakpoint strategy around 560px, 768px, and 900px only where behavior actually changes.
- Use `min()`, `max()`, `clamp()`, and content-based sizing instead of fixed mobile heights.
- Keep decorative layers `pointer-events: none`, prevent horizontal overflow, and validate fixed/sticky stacking contexts.
- Avoid changing route structure or asset paths.

## Verification

- Run lint and production build.
- Test `/wmu` at narrow phone, large phone, tablet, and desktop widths.
- Check for horizontal scrolling, overlapping fixed/sticky elements, clipped buttons, unreadable text, and footer trailing whitespace.
- Verify reduced motion and safe-area padding behavior.
- Confirm desktop layout remains visually equivalent except for fixes that are intentionally shared.
