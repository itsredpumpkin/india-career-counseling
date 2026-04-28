# Design Brief — India Career Counseling

## Purpose & Context
Educational counseling platform targeting Indian students and parents to explore careers, courses, colleges, and career guidance with trust and inspiration.

## Tone & Differentiation
Bold, aspirational, inspiring. Culturally grounded with saffron and navy theme. Animated stat counters, gradient overlays, smooth transitions. Card-based modular design with visual rhythm through alternating backgrounds. Not corporate-sterile — vibrant, human, hopeful.

## Color Palette

| Token                | OKLCH Value        | Hex (approx) | Role                        |
| -------------------- | ------------------ | ------------ | --------------------------- |
| Primary (Saffron)    | 0.62 0.25 60       | #FF7700      | CTA buttons, highlights     |
| Secondary (Navy)     | 0.15 0.08 280      | #1A237E      | Headers, navigation, depth  |
| Accent (Orange)      | 0.68 0.22 50       | #FF9500      | Secondary actions           |
| Background (Cream)   | 0.98 0.01 80       | #FFFBF5      | Page background             |
| Card                 | 0.99 0 0           | #FFFFFF      | Content cards               |
| Muted                | 0.92 0.02 80       | #F5F0E8      | Dividers, subtle elements   |
| Foreground (Dark)    | 0.15 0.05 280      | #1A1F35      | Body text                   |
| Destructive          | 0.55 0.22 25       | #E53E3E      | Error states                |

## Typography

| Layer       | Font               | Size      | Weight | Usage                              |
| ----------- | ------------------ | --------- | ------ | ---------------------------------- |
| Display     | Plus Jakarta Sans  | 3.5rem    | 700    | Hero titles, page headers          |
| Heading 1   | Plus Jakarta Sans  | 2.25rem   | 700    | Section titles                     |
| Heading 2   | Plus Jakarta Sans  | 1.5rem    | 600    | Subsection titles                  |
| Body        | DM Sans            | 1rem      | 400    | Body copy, descriptions            |
| Body Small  | DM Sans            | 0.875rem  | 400    | Secondary text, captions           |
| Mono        | Geist Mono         | 0.875rem  | 400    | Code, data, stats                  |

## Elevation & Depth

| Element          | Shadow                    | Border | Background       |
| ---------------- | ------------------------- | ------ | ----------------- |
| Header           | None                      | Bottom | Navy secondary    |
| Card (default)   | subtle (1px 3px primary)  | 1px    | White card        |
| Card (hover)     | elevated (8px 16px)       | 1px    | White card        |
| Button Primary   | None                      | None   | Primary saffron   |
| Button Secondary | subtle                    | 1px    | Transparent       |
| Input            | None                      | 1px    | Muted background  |
| Popup/Modal      | elevated (8px 16px)       | None   | White card        |

## Structural Zones

| Zone          | Background          | Border        | Content Density | Notes                                |
| ------------- | ------------------- | ------------- | --------------- | ------------------------------------ |
| Header/Nav    | navy secondary      | Bottom: 2px   | High            | Logo, nav links, search, CTA        |
| Hero Section  | gradient primary    | None          | Medium          | Animated background, stat counters  |
| Content (odd) | cream background    | None          | Medium          | Cards, text, illustrations          |
| Content (even) | white card bg      | None          | Medium          | Alternating for visual rhythm       |
| Footer        | navy secondary      | Top: 1px      | High            | Links, social, copyright            |

## Spacing & Rhythm
- Gutter: 1rem (mobile), 2rem (desktop)
- Section padding: 3rem vertical, 2rem horizontal
- Card padding: 1.5rem
- Gap between cards: 1.5rem
- Type line-height: 1.6 (body), 1.3 (headings)

## Component Patterns
- Buttons: Primary (saffron bg, white text), Secondary (transparent, saffron border/text)
- Cards: white bg, subtle shadow, 8px border radius, hover → elevated shadow
- Inputs: muted bg, 1px border, focus ring: saffron
- Navigation: Navy bg, white links, saffron underline (active), hover fade-in
- Forms: Stacked layout, labels bold, validation via destructive color

## Motion & Animation

| Animation       | Duration | Easing    | Trigger         | Use Case                    |
| --------------- | -------- | --------- | --------------- | --------------------------- |
| fade-in         | 0.6s     | ease-out  | On page load    | Content reveal              |
| slide-in-left   | 0.6s     | ease-out  | Scroll/interact | Text, images entering       |
| slide-in-right  | 0.6s     | ease-out  | Scroll/interact | Images, aside content       |
| slide-in-up     | 0.6s     | ease-out  | Scroll/interact | Cards, modals               |
| counter-pulse   | 0.6s     | ease-out  | Stat animation  | Number counters (0 → target)|
| float           | 3s       | infinite  | Ambient         | Icons, decorative elements  |
| pulse-glow      | 2s       | infinite  | Hover state     | Active buttons, highlights  |

## Constraints
- No rainbow palettes; max 3–5 colors active on any screen
- No full-page gradients; use gradient overlay on hero only
- Mobile-first responsive (sm: 640px, md: 768px, lg: 1024px)
- WCAG AA+ contrast: all text ≥ 4.5:1 on backgrounds
- Animations respect `prefers-reduced-motion`
- Dark mode: navy bg, saffron/orange accents maintained

## Signature Detail
**Animated gradient hero** with overlaid stat counters that pulse on load, plus subtle floating decoration elements. Gives the site momentum and cultural resonance. Reflects India's tech aspirations and student energy.
