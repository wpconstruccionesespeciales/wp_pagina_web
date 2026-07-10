# Design Spec: WMU Subnav Premium Transition

This design document outlines the visual refactoring of the internal sub-navigation bar on the WMU (modular architecture) page. The goal is to smooth the transition between the Hero and Process sections, removing the harsh horizontal divider and replacing it with a premium, floating glassmorphic pill.

## Context & Problem Statement

Recently, an internal sub-navigation (`wmu-subnav`) was added below the `HeroSection` of the WMU page. While useful for navigation, its current design:
- Spans the full width of the screen.
- Has solid horizontal border lines (`border-block: 1px solid rgba(255,255,255,.08)`).
- Has a dark solid background (`rgba(12,18,16,.9)`).

This acts as a visual barrier, breaking the atmospheric flow from the dark bottom fade of the Hero section to the dark top fade of the Process section. It creates a "sandwich" layout instead of a seamless scroll experience.

## Proposed Design: Floating Glassmorphic Pill

To restore visual continuity and elevate the premium aesthetic, we will:
1. **Change Layout to Pill Shape**: Shrink the subnav width to `max-content` and center it on the screen (`margin: 0 auto`).
2. **Apply Rounded Corners**: Apply a pill-like border radius (`border-radius: 99px`) to both the container and its hover states.
3. **Enhance Glassmorphism**: Soften the background to `rgba(12, 18, 16, 0.65)` and use a complete thin border (`1px solid rgba(255, 255, 255, 0.08)`) with a subtle drop shadow (`box-shadow`) to make it float elegantly.
4. **Smooth Positioning (Overlay rest / Floating sticky)**:
   - When **resting** (at static position), use a negative top margin (e.g. `margin: -22px auto 22px`) to float it cleanly over the black boundary of the Hero and Process sections, allowing their backgrounds to merge seamlessly on the sides.
   - When **sticky**, position it with a slight top offset (e.g. `top: 94px`) so it floats just below the main navigation bar (height `82px`), creating a beautiful parallax-like gap showing the content scrolling underneath.

---

## Proposed CSS changes in [WMU.jsx](file:///c:/Users/Gime/Desktop/wp_pagina_web/src/pages/WMU.jsx)

### Original CSS
```css
  .wmu-subnav {
    position: sticky; top: 82px; z-index: 80;
    display: flex; justify-content: center; gap: 6px;
    padding: 10px 16px;
    background: rgba(12,18,16,.9);
    border-block: 1px solid rgba(255,255,255,.08);
    backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  }
  .wmu-subnav a {
    padding: 9px 14px; border-radius: 10px;
    color: rgba(243,245,244,.68); text-decoration: none;
    font-family: "Nunito Sans", sans-serif; font-size: 12px; font-weight: 800;
    transition: color .2s ease, background-color .2s ease, transform .15s ease;
  }
  .wmu-subnav a:hover { color: #F3F5F4; background: rgba(53,195,107,.12); }
  .wmu-subnav a:active { transform: scale(.97); }
```

### New Premium CSS
```css
  .wmu-subnav {
    position: sticky;
    top: 94px; /* Floating gap below the main navbar (82px) */
    z-index: 80;
    display: flex;
    justify-content: center;
    gap: 8px;
    padding: 6px 8px;
    margin: -22px auto 22px; /* Float overlapping the black fade zone */
    width: max-content;
    max-width: 90%;
    background: rgba(12, 18, 16, 0.65);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 99px;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.05);
    transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  }
  .wmu-subnav a {
    padding: 8px 16px;
    border-radius: 99px; /* Coherent rounded links */
    color: rgba(243, 245, 244, 0.72);
    text-decoration: none;
    font-family: "Nunito Sans", sans-serif;
    font-size: 12px;
    font-weight: 800;
    transition: color .2s ease, background-color .2s ease, transform .15s ease;
  }
  .wmu-subnav a:hover {
    color: #F3F5F4;
    background: rgba(53, 195, 107, 0.14);
  }
  .wmu-subnav a:active {
    transform: scale(.96);
  }
  
  /* Responsive Adjustments */
  @media (max-width: 560px) {
    .wmu-subnav {
      justify-content: flex-start;
      overflow-x: auto;
      border-radius: 20px; /* Softer radius when scrollable horizontally */
      max-width: 92%;
      padding: 6px;
      margin: -16px auto 16px;
    }
    .wmu-subnav a {
      white-space: nowrap;
    }
  }
```

## Verification Plan

### Manual Verification
1. Open the WMU page.
2. Confirm the subnav is centered and styled as a floating pill.
3. Verify that the sides of the subnav are transparent, allowing the bottom of the Hero section and the top of the Process section to merge seamlessly.
4. Scroll down:
   - Verify that the subnav sticks below the main header with a clean ~12px gap.
   - Verify that the text remains perfectly legible due to the backdrop blur and semi-transparent dark green-black background.
   - Check the hover states on the subnav links to ensure they use a pill shape.
5. Resize screen to mobile width:
   - Verify that the pill handles horizontal scroll correctly and adapts its border-radius/margins.
