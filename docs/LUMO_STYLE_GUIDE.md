# Lumo Style Guide (reference)

Provided by Filo as a target aesthetic reference.

Theme: Granola.ai-inspired, Notion-like, **blue accent**, rounded components, subtle shadows, glassy touches.

## Principles
- Clean, whitespace-forward, low visual noise
- Soft roundness (pill buttons, rounded cards)
- Clear hierarchy + scannable information
- Thin borders, soft shadows, smooth transitions

## Colors
Primary (Notion blue):
- `--color-primary: #2383E2`
- `--color-primary-hover: #1C6BBF`
- `--color-primary-active: #15539C`
- `--color-primary-light: #D1E9FF`
- `--color-primary-subtle: #EBF5FF`

Neutrals (stone):
- `--color-bg-primary: #FFFFFF`
- `--color-bg-secondary: #FAFAF9` (stone-50)
- `--color-bg-tertiary: #F5F5F4` (stone-100)
- `--color-border-default: #E7E5E4` (stone-200)

Elevated cards:
- `--color-bg-elevated: rgba(255, 255, 255, 0.6)` (+ backdrop blur)

Feedback:
- success `#22C55E`, warning `#F59E0B`, error `#EF4444`, info `#3B82F6`

## Typography
Suggested stack:
- Sans: `General Sans`, `Plus Jakarta Sans`, `DM Sans`, system
- Mono: `JetBrains Mono`, `Fira Code`, system

Type scale: display-xl 72px → caption 12px, tight tracking for headlines.

## Spacing
8px base scale; define `--space-*` tokens.

## Container/Grid
- Containers: sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1440
- Grid helpers: 2-col, 3-col, auto-fit min 300px

## Radii
- Buttons/tabs/nav: pill (`--radius-full`)
- Cards: `--radius-xl`

## Shadows
- xs→2xl scale + focus glow ring `rgba(35, 131, 226, 0.3)`

## Components (snippets)

### Buttons
- Pill shape (`--radius-full`), subtle lift on hover, focus glow ring.
- Variants: primary / secondary (dark) / outline / ghost / icon.

### Navigation
- Fixed, centered pill nav with glass background + blur.
- Active link uses `--color-primary`.

### Cards
- Glass card: semi-transparent white + blur, soft border, larger radius, hover lift.
- Featured card: label pill ("Popular") via `::before`.

### Tabs
- Pills; active uses `--color-primary`.

### Inputs
- Rounded (lg by default; pill optional), `--shadow-glow` focus ring.

### Badges/Tags
- Small pill tokens; hover can use primary-light.

### Avatars
- Round, group overlap with 2px border.

### Motion
- 100/150/300ms durations; fade/slide/scale; hover-lift.

### Icons
- Lucide/Heroicons; outlined, 1.5px stroke.

## Notes
- Current Crewboard MVP is emerald-accent per earlier choice.
- We can switch to Notion-blue tokens once the end-to-end MVP flow is stable.
