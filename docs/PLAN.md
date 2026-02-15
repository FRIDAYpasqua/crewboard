# Crewboard — Plan (MVP)

## Product
Audience: university + high school student teams.
No teacher/admin view.

## Core loop
1) Student creates a project room
2) Invites team members
3) Uploads PDF brief (or paste text)
4) Crewboard produces: milestones + tasks + suggested roles (optional)
5) Team works off Kanban board
6) Daily async standup → summary + risk flags + task updates

## What makes it "agentic"
- Converts unstructured brief → structured plan + tasks.
- Repairs plan after standup updates (blocked/slipping scope).
- Proposes scope cuts when deadline is tight.

## MVP scope (ship fast)
### Must-have
- Auth
- Create room + invite link
- PDF upload to storage + text extraction
- LLM planning endpoint: brief → milestones + tasks
- Kanban board CRUD
- Standup prompts + responses
- Daily summary + simple risk detection

### Not in MVP
- Teacher view
- Real-time chat
- Complex permissions
- Multiple workspaces/orgs
- AI "auto-messaging" outside app (Discord/WhatsApp/email) — later

## Milestones
### M0 — Skeleton (day 1)
- Repo + CI
- Next.js app, Supabase connected
- Auth + basic layout

### M1 — Rooms + invites (day 2)
- Projects table, membership table
- Invite link flow

### M2 — Brief ingestion (day 3)
- PDF upload
- Text extraction

### M3 — Planning + board (day 4)
- LLM brief → tasks
- Kanban UI

### M4 — Standups (day 5)
- Standup form + responses
- LLM summary + risk flags

### M5 — Polish (day 6–7)
- Onboarding
- Better prompts + guardrails
- Basic tests

## Needed from Filo
- OpenAI API key (or provider choice)
- Supabase project creds
