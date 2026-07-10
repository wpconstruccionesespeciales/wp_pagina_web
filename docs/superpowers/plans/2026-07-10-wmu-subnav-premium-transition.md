# WMU Subnav Premium Transition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the WMU page sub-navigation into a floating glassmorphic pill, smoothing the transition between the Hero and Process sections.

**Architecture:** Modify the CSS classes `.wmu-subnav` and `.wmu-subnav a` inside the styles block of `src/pages/WMU.jsx` to apply pill shape, transparent side space, top negative margin, glassmorphism, responsive alignment, and hover state transitions.

**Tech Stack:** React, CSS

---

### Task 1: Refactor WMU Sub-Navigation Styling

**Files:**
- Modify: `src/pages/WMU.jsx` (approx. lines 849-865)

- [ ] **Step 1: Replace subnav CSS with the premium floating glassmorphic pill style**

  In `src/pages/WMU.jsx`, locate the `.wmu-subnav` and `.wmu-subnav a` styling inside the `CSS` template literal and replace it with:

  ```css
  .wmu-subnav {
    position: sticky;
    top: 94px;
    z-index: 80;
    display: flex;
    justify-content: center;
    gap: 8px;
    padding: 6px 8px;
    margin: -22px auto 22px;
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
    border-radius: 99px;
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
  ```

- [ ] **Step 2: Add responsive adjustments for mobile screens**

  In `src/pages/WMU.jsx`, locate the `@media (max-width: 560px)` block and replace the `.wmu-subnav` overrides with:

  ```css
    .wmu-subnav {
      justify-content: flex-start;
      overflow-x: auto;
      border-radius: 20px;
      max-width: 92%;
      padding: 6px;
      margin: -16px auto 16px;
    }
    .wmu-subnav a {
      white-space: nowrap;
    }
  ```

- [ ] **Step 3: Run dev build to compile and verify no errors occur**

  Run: `npm run build` (or similar command) to ensure the file parses correctly and compiling succeeds.
  Expected: Successful compilation without errors.

- [ ] **Step 4: Commit changes to Git**

  Run:
  ```bash
  git add src/pages/WMU.jsx
  git commit -m "style(wmu): transform subnav into a floating glassmorphic pill"
  ```
