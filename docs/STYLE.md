# Crewboard — Style Guide (v0)

Target vibe: **Notion-ish** (clean, calm, "document" feel) with a Kanban/productivity UI.

## Principles
- Neutral surfaces, minimal chrome.
- Typography-forward: content first.
- Subtle borders and separators; avoid heavy shadows.
- Color is for meaning (status, danger, success), not decoration.
- Dark mode is first-class (no "inverted mess").

## Stack
- Tailwind CSS
- shadcn/ui components (Radix primitives)

## Theme
- Use CSS variables (shadcn default) for light/dark.
- Base palette: neutral (zinc/slate).
- Single accent color (TBD by Filo).

## Typography
- Font: `Inter` (default) or `Geist` (optional upgrade).
- Headings: slightly heavier weight, tight leading.
- Body: 14–15px base, 1.5 line height.

## Layout
- Max content width for docs-like pages: 900–1100px.
- Board pages can go full width.
- Left nav: minimal, collapsible.

## Components (MVP)
- AppShell (top bar + left nav)
- Project card list
- Kanban columns + draggable-ish cards (later; MVP can be click-to-move)
- Brief upload panel (dropzone)
- Standup form + summary panel

## Colors
- Status (tasks):
  - backlog: neutral
  - todo: blue-ish indicator
  - doing: amber indicator
  - done: green indicator
  - blocked (optional): red indicator

## Interaction
- Primary actions: top-right, consistent placement.
- Forms: inline help text, sensible defaults.
- Empty states: short, instructive, no cringe.

## Open Questions
- Accent color selection (indigo/emerald/cyan/amber)
- Font choice (Inter vs Geist)
