---
name: Executive Monolith
colors:
  surface: '#051424'
  surface-dim: '#051424'
  surface-bright: '#2c3a4c'
  surface-container-lowest: '#010f1f'
  surface-container-low: '#0d1c2d'
  surface-container: '#122131'
  surface-container-high: '#1c2b3c'
  surface-container-highest: '#273647'
  on-surface: '#d4e4fa'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#bcc7de'
  on-secondary: '#263143'
  secondary-container: '#3e495d'
  on-secondary-container: '#aeb9d0'
  tertiary: '#ffb786'
  on-tertiary: '#502400'
  tertiary-container: '#df7412'
  on-tertiary-container: '#461f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#d8e3fb'
  secondary-fixed-dim: '#bcc7de'
  on-secondary-fixed: '#111c2d'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311400'
  on-tertiary-fixed-variant: '#723600'
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  label-caps:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  mono-data:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: -0.01em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style
The design system embodies an authoritative, high-performance environment tailored for executive-level decision-making and developer-centric precision. The brand personality is commanding, steady, and technically sophisticated.

The design style is **Minimalist-Corporate**, utilizing deep slate foundations to provide a sense of stability and permanence. It avoids unnecessary ornamentation, focusing instead on high-information density, exceptional legibility, and a rigorous adherence to a professional aesthetic. The emotional response should be one of complete control and silent power.

## Colors
This design system operates exclusively in a dark color mode to minimize eye strain during long-form data analysis. The canonical values live in the `colors` frontmatter; the tokens below are their primary roles.

- **Primary:** `primary` (`#adc6ff`) with `on-primary` (`#002e6a`) text is used for all calls to action, active states, highlights, and critical icons. Its deeper `primary-container` (`#4d8eff`) provides a saturated accent for emphasis. It provides a sharp, professional contrast against the dark background.
- **Surface:** Deep Slate tones form the container palette — `surface-container-lowest` (`#010f1f`), `surface-container-low` (`#0d1c2d`), `surface-container` (`#122131`), `surface-container-high` (`#1c2b3c`), `surface-container-highest` (`#273647`) — used to create subtle depth.
- **Neutral:** `on-surface-variant` (`#c2c6d6`) is used for secondary text, and `outline` (`#8c909f`) / `outline-variant` (`#424754`) for borders, maintaining a low-distraction environment.
- **Background:** `background` (`#051424`) with `on-background` (`#d4e4fa`) text provides the anchor for the entire interface.

## Typography
The system exclusively uses Geist for its technical precision and neutral character. 

Large display titles should use tighter letter spacing and heavy weights to command attention. Body text prioritizes standard weights for maximum readability. Use the `mono-data` style for data tables, technical metadata, and numerical values to keep a compact, technical cadence. Use the `label-caps` style for section headers and overlines to provide clear structural categorization without adding visual bulk.

## Layout & Spacing
The layout follows a strict **Fixed Grid** system for desktop (12 columns, 1200px max-width) to ensure an organized, executive presentation. 

- **Desktop:** 12 columns with 24px gutters. Content is centered with wide 40px margins.
- **Tablet:** 8 columns with 24px gutters.
- **Mobile:** 4 columns with 16px gutters and 16px side margins.

Horizontal spacing follows a 4px baseline. Components should generally use 16px or 24px of internal padding to maintain a spacious, premium feel. Vertical rhythm is driven by the 8px increment (sm, md, lg) to ensure consistent stacking of information modules.

## Elevation & Depth
This design system utilizes **Tonal Layering** rather than traditional shadows to define hierarchy. 

- **Level 0 (Background):** `background` `#051424`.
- **Level 1 (Cards/Containers):** `surface-container` `#122131`.
- **Level 2 (Modals/Popovers):** `surface-container-high` `#1c2b3c` with a 1px solid border of `outline-variant` `#424754`.

When depth is required, use a subtle 1px border or a very soft, low-opacity ambient glow (0 10px 30px rgba(0,0,0,0.5)). Interactivity is signaled through brightness shifts in the `primary` color rather than changes in physical elevation.

## Shapes
The shape language is **Soft (0.25rem)**. This subtle rounding removes the harshness of raw brutalism while maintaining a serious, architectural silhouette. 

- Standard components (Buttons, Inputs): 4px (0.25rem).
- Containers and Cards: 8px (0.5rem).
- Large Modal containers: 12px (0.75rem).

Avoid pill shapes and circular buttons unless they are dedicated icon-only actions; the intention is to maintain a professional, rectangular structural integrity throughout the UI.

## Components
- **Buttons:** Primary buttons use the `primary` (`#adc6ff`) fill with `on-primary` (`#002e6a`) text. Secondary buttons are ghost-style with an `outline` (`#8c909f`) border and `primary` text.
- **Inputs:** Transparent backgrounds with 1px `outline-variant` (`#424754`) borders. On focus, the border transitions to `primary` (`#adc6ff`) with a subtle 2px outer glow.
- **Chips:** Small, low-contrast `outline-variant` borders with semi-bold Geist labels. Active chips switch to `primary` with `on-primary` text.
- **Lists:** Clean rows separated by `outline-variant` 1px lines. Hover states should utilize a subtle background tint (`surface-container-high`).
- **Cards:** Defined by a `surface-container` (`#122131`) background and 1px `outline-variant` border. No drop shadows; hierarchy is achieved purely through color contrast.
- **Data Grids:** High-density layouts using the `mono-data` style for all numerical values. Header rows should use the `label-caps` typography style.