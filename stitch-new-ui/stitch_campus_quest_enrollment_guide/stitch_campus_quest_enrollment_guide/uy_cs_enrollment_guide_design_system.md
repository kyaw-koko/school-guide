---
name: "UY CS Enrollment Guide — Design System"
description: "Clean, minimal academic mobile-first design system for the University of Yangon Computer Science Enrollment Guide, supporting Burmese Unicode legibility and high-contrast campus navigation."
---

## Overview

The **UY CS Enrollment Guide** design system is built for undergraduate students at the University of Yangon navigating enrollment day on their phones. It pairs a **Minimal Academic** aesthetic—crisp white cards, slate-50 surfaces, and generous whitespace—with high-contrast functional cues so students walking between Science Building and ULB can scan instructions, fill forms, and check off steps one-handed.

The visual tone is calm, trustworthy, and structured:
- **Primary Blue** anchors active campus quest actions and live form highlights.
- **Indigo Accent** distinguishes home preparation and form pre-fill tools.
- **Amber** is reserved for the persistent top academic-year disclaimer banner.
- **Dark Slate** anchors the sticky collapsible quest tracker header so it stays legible in bright outdoor sunlight.
- **Red** is strictly semantic: missing required form fields and the critical **UAB Pay Only** alert box.

## Colors

```yaml
colors:
  amber-bg: "#FEF3C7"
  amber-border: "#F59E0B"
  amber-text: "#92400E"
  indigo-accent: "#4F46E5"
  indigo-soft: "#EEF2FF"
  blue-primary: "#2563EB"
  blue-soft: "#EFF6FF"
  blue-ink: "#1D4ED8"
  success: "#15803D"
  success-container: "#DCFCE7"
  on-success-container: "#14532D"
  paper: "#FFFDF7"
  paper-border: "#94A3B8"
  light:
    primary: "#004AC6"
    on-primary: "#FFFFFF"
    primary-container: "#2563EB"
    on-primary-container: "#FFFFFF"
    secondary: "#4B41E1"
    on-secondary: "#FFFFFF"
    secondary-container: "#EEF2FF"
    on-secondary-container: "#312E81"
    tertiary: "#824500"
    on-tertiary: "#FFFFFF"
    tertiary-container: "#FEF3C7"
    on-tertiary-container: "#92400E"
    error: "#BA1A1A"
    on-error: "#FFFFFF"
    error-container: "#FEE2E2"
    on-error-container: "#991B1B"
    background: "#F8FAFC"
    on-background: "#0F172A"
    surface: "#FFFFFF"
    surface-dim: "#F1F5F9"
    surface-bright: "#FFFFFF"
    surface-container-lowest: "#FFFFFF"
    surface-container-low: "#F8FAFC"
    surface-container: "#F1F5F9"
    surface-container-high: "#E2E8F0"
    surface-container-highest: "#CBD5E1"
    on-surface: "#0F172A"
    surface-variant: "#E2E8F0"
    on-surface-variant: "#475569"
    outline: "#94A3B8"
    outline-variant: "#E2E8F0"
    inverse-surface: "#0F172A"
    inverse-on-surface: "#F8FAFC"
    inverse-primary: "#93C5FD"
    shadow: "#0F172A"
    scrim: "#0F172A"
  dark:
    primary: "#B4C5FF"
    on-primary: "#002A78"
    primary-container: "#2563EB"
    on-primary-container: "#FFFFFF"
    secondary: "#C3C0FF"
    on-secondary: "#1D00A5"
    secondary-container: "#3626CE"
    on-secondary-container: "#E0E7FF"
    tertiary: "#FFB77D"
    on-tertiary: "#4D2600"
    tertiary-container: "#78350F"
    on-tertiary-container: "#FEF3C7"
    error: "#FFB4AB"
    on-error: "#690005"
    error-container: "#93000A"
    on-error-container: "#FFDAD6"
    background: "#0F172A"
    on-background: "#F8FAFC"
    surface: "#0F172A"
    surface-dim: "#020617"
    surface-bright: "#1E293B"
    surface-container-lowest: "#020617"
    surface-container-low: "#0F172A"
    surface-container: "#1E293B"
    surface-container-high: "#334155"
    surface-container-highest: "#475569"
    on-surface: "#F8FAFC"
    surface-variant: "#334155"
    on-surface-variant: "#CBD5E1"
    outline: "#64748B"
    outline-variant: "#334155"
    inverse-surface: "#F8FAFC"
    inverse-on-surface: "#0F172A"
    inverse-primary: "#004AC6"
    shadow: "#000000"
    scrim: "#000000"
```

## Typography

To render both English academic labels and Burmese Unicode (`မြန်မာစာ`) cleanly without clipping stacked diacritics and vowels (`အပေါ်/အောက် အသတ်များ`), headlines use **Inter** (with browser fallback to **Noto Sans Myanmar**), body copy uses **Noto Sans Myanmar** with generous line heights (`1.6–1.75x`), and roll numbers or registration codes use **Source Code Pro**.

```yaml
typography:
  display-lg:
    fontFamily: "Inter"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 44px
    letterSpacing: -0.5px
  display-lg-mobile:
    fontFamily: "Inter"
    fontSize: 26px
    fontWeight: 700
    lineHeight: 36px
    letterSpacing: -0.25px
  headline-lg:
    fontFamily: "Inter"
    fontSize: 22px
    fontWeight: 700
    lineHeight: 32px
    letterSpacing: -0.2px
  headline-md:
    fontFamily: "Inter"
    fontSize: 18px
    fontWeight: 700
    lineHeight: 28px
    letterSpacing: -0.1px
  title-lg:
    fontFamily: "Noto Sans Myanmar"
    fontSize: 17px
    fontWeight: 700
    lineHeight: 28px
  title-md:
    fontFamily: "Noto Sans Myanmar"
    fontSize: 15px
    fontWeight: 600
    lineHeight: 24px
  body-lg:
    fontFamily: "Noto Sans Myanmar"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 26px
  body-md:
    fontFamily: "Noto Sans Myanmar"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 24px
  body-sm:
    fontFamily: "Noto Sans Myanmar"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 20px
  label-lg:
    fontFamily: "Inter"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 20px
  label-md:
    fontFamily: "Inter"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 18px
  mono-sm:
    fontFamily: "Source Code Pro"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 18px
```

## Layout & Spacing

Mobile-first single-column layout (`max-w-md mx-auto`) with 16px horizontal page margins and a strict 4px/8px spacing grid. Generous vertical padding (`py-1.5` / `py-2`) is applied to Burmese text containers to protect tall diacritics.

```yaml
spacing:
  gutter-xs: 4px
  gutter-sm: 8px
  gutter-md: 12px
  gutter-lg: 16px
  gutter-xl: 24px
  section: 24px
  page-margin: 16px
```

## Elevation & Depth

Hierarchy is established primarily through surface contrast (`surface` white cards on `background` slate-50) paired with crisp `1px` `outline-variant` borders and subtle ambient shadows (`shadow-sm`) on primary interactive cards. Sticky headers use solid dark slate (`inverse-surface`) without backdrop blur for maximum outdoor readability.

## Shapes

Friendly, approachable `rounded-2xl` (`16px`) outer cards, `rounded-xl` (`12px`) inner action blocks and alerts, `rounded-lg` (`8px`) inputs and buttons, and `rounded-full` (`9999px`) year selector pills and status badges.

```yaml
rounded:
  sm: 6px
  DEFAULT: 8px
  md: 12px
  lg: 16px
  xl: 20px
  full: 9999px
```

## Motion & Micro-interaction

Fast, crisp state transitions (`120ms` ease-out) for checkboxes, tab switches, and pill toggles. Collapsible quest drawer expands smoothly (`200ms`). Respect `prefers-reduced-motion`.

```yaml
motion:
  state-change:
    duration: 120ms
    delay: 0ms
    timingFunction: ease-out
  surface-enter:
    duration: 200ms
    delay: 0ms
    timingFunction: cubic-bezier(0.2, 0, 0, 1)
```

## Voice & Content Strategy

- **Bilingual Clarity:** Burmese Unicode (`မြန်မာစာ`) is the primary instructional language, paired with concise English academic/technical labels (`CURRENT QUEST 1/4`, `UAB Pay Only`, `ULB`, `Main Gate`) where students use them on campus.
- **Direct & Actionable:** Every sub-quest starts with a concrete action verb and includes exact building names (`သိပ္ပံဆောင်`, `ULB`).
- **Critical Rules Emphasized:** Never omit the Science Building library clearance note or the UAB Pay Only payment restriction.

## Components

Component implementations live as individual HTML sticker sheet files in
`components/`. Each file contains the canonical, styled HTML components with
`<!-- COMPONENT: name -->` comment markers. Read each file before use.

- **Alert** → `@components/alert.html` — `alert-info`
- **Button** → `@components/button.html` — `button-primary`, `button-icon`, `button-with-icon`
- **Card** → `@components/card.html` — `card-elevated`, `card-action`, `card-interactive`, `card-interactive-2`
- **Input Field** → `@components/input-field.html` — `input-field-text`, `input-field-icon`
- **Tabs** → `@components/tabs.html` — `tabs-horizontal`, `tabs-with-icon`
