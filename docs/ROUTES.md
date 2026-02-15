# Crewboard — Routes / API (MVP)

## Pages (Next.js App Router)
- `/` landing
- `/login`
- `/app` (projects list)
- `/app/projects/new`
- `/app/p/[projectId]` overview
- `/app/p/[projectId]/board`
- `/app/p/[projectId]/brief`
- `/app/p/[projectId]/standup`
- `/invite/[token]` join project

## API routes (server actions / route handlers)
- `POST /api/projects` create project
- `POST /api/invites` create invite token
- `POST /api/invites/accept` accept invite
- `POST /api/briefs/upload` presign + store
- `POST /api/briefs/extract` extract text from PDF
- `POST /api/plan` LLM: brief → milestones + tasks
- `POST /api/tasks` create/update tasks
- `POST /api/standups/:projectId/run` create today's standup (idempotent)
- `POST /api/standups/:standupId/respond`
- `POST /api/standups/:standupId/summarize` LLM summary + risk flags

## Background jobs
- Daily standup creation & reminders (in-app notifications first).
- Later: email/discord notifications.
