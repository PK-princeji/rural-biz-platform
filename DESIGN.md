# Design Brief: Rural Biz Platform

## Purpose
Modern, accessible rural entrepreneurship platform enabling farmers, fishermen, and livestock farmers to access business support, case management, and resources through a purpose-driven digital system.

## Tone & Differentiation
Confident and approachable. Conveys that rural businesses are legitimate enterprises worthy of professional tools. No patronizing language or condescending visuals. Clear hierarchy, warm accents, refined neutrals.

## Palette

| Token | Light | Dark | Purpose |
|-------|-------|------|---------|
| Primary | oklch(0.30 0.15 290) | oklch(0.75 0.12 290) | Dark blue; authority, trust, CTAs |
| Secondary (Accent) | oklch(0.65 0.15 140) | oklch(0.68 0.16 140) | Green; growth, agriculture, success states |
| Neutral BG | oklch(0.98 0 0) | oklch(0.12 0.01 260) | Clean, slightly warm whites and deep slates |
| Muted | oklch(0.92 0.02 260) | oklch(0.22 0.01 260) | Reduced emphasis, secondary information |
| Destructive | oklch(0.55 0.22 25) | oklch(0.65 0.19 22) | Alert, error states, deletion warnings |
| Border | oklch(0.88 0.03 260) | oklch(0.25 0.01 260) | Subtle dividers, input borders |

## Typography

| Layer | Font | Usage | Scale |
|-------|------|-------|-------|
| Display | DM Sans | Headlines, hero tagline, section titles | 2rem–3.5rem |
| Body | Figtree | Paragraph copy, form labels, card content | 0.875rem–1.125rem |
| Mono | Geist Mono | Case IDs, status codes, timestamps | 0.75rem–0.875rem |

## Shape Language
- Border radius: 12px (lg), 10px (md), 8px (sm) — approachable, not sharp
- Spacing density: 1rem baseline (16px); 0.5rem increments
- Minimal use of borders; rely on shadow and background color separation

## Structural Zones

| Zone | Background | Border | Shadow | Purpose |
|------|-----------|--------|---------|---------|
| Header | Primary (oklch(0.30...)) | None | subtle | Navigation, branding, auth |
| Hero | Gradient (primary→secondary) | None | elevated | Hero tagline, icons, CTA |
| Card | Card/muted | 1px subtle border | subtle | Content containers, case cards |
| Input | Input (light)/dark variant | border color | None | Form fields, focus=ring-accent |
| Modal | Popover (elevated bg) | border | elevated | Dialogs, overlays |
| Footer | Muted background | border-t | None | Contact, links, secondary info |

## Component Patterns

### Primary CTA
- Background: secondary (green), text: white
- Hover: darken chroma slightly (0.68 0.16 140 → 0.64 0.18 140)
- Focus: ring-accent with ring-offset-2

### Secondary CTA  
- Background: muted, text: primary, border: border
- Hover: bg-muted darken, transition-smooth

### Input Focus
- Ring: 2px accent (green) with offset
- No inline error color; use beneath-label error text

### Card Interactive
- Border: border-color, rounded-lg
- Hover: shadow-elevated, border-accent/50, transition-smooth
- Used for case cards, resource cards, dashboard items

## Motion Choreography
- `transition-smooth`: 0.3s cubic-bezier(0.4, 0, 0.2, 1) — default for interactive elements
- `fade-in`: 0.3s for content entry
- `slide-in-up`: 0.4s for modals, overlays
- `pulse-subtle`: 2s for loading/pending states
- No bouncing, no flashing — rural users prefer stability

## Responsive Breakpoints
- Mobile-first: base styles for sm (<640px)
- Tablet: md (≥768px) — expand cards to grid-cols-2
- Desktop: lg (≥1024px) — grid-cols-3, sidebar layouts
- Hero: full-width image on mobile, side-by-side on lg+

## Accessibility & Rural Context
- Minimum 16px body text (no small type for accessibility)
- High contrast text (WCAG AA+ on all backgrounds)
- Touch targets: 44px minimum on mobile
- Icons paired with text labels (icon-only buttons for expert users only)
- Dark mode optimized for evening use (rural work patterns)
- No motion heavy animations; accessibility > flashiness

## Signature Detail
**Rural sector icons** (farming, fishery, poultry, goat) as line-art illustrations in hero and navigation. Simple, respectful, non-stereotypical. Icons are tools, not decoration. Placed in header subnav and hero section for quick visual context of business type.

## Constraints & Anti-patterns
- ❌ No generic startup gradients or neon colors
- ❌ No large serif fonts in body (accessibility + rural context)
- ❌ No icon-only buttons without labels in critical flows
- ❌ No auto-playing video or distracting animations
- ❌ No assumptions about user tech literacy in microcopy
- ✅ Prefer explicit labels, clear feedback, confirmation dialogs
- ✅ Favor depth through layering (bg color, shadow, border) over pseudo-depth effects
