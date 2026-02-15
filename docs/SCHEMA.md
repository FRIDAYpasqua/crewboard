# Crewboard — Data model (MVP)

Assume Supabase Postgres + RLS.

## Tables

### users
Managed by Supabase Auth.

### projects
- id (uuid, pk)
- created_by (uuid -> auth.users)
- name (text)
- description (text, nullable)
- due_date (date/timestamptz, nullable)
- created_at, updated_at

### project_members
- project_id (uuid -> projects)
- user_id (uuid -> auth.users)
- role (text: owner|member)  // keep simple
- created_at
PK (project_id, user_id)

### invites
- id (uuid, pk)
- project_id
- created_by
- token (text, unique)
- expires_at (timestamptz)
- max_uses (int, nullable)
- used_count (int)
- created_at

### briefs
- id (uuid, pk)
- project_id
- uploaded_by
- source (text: pdf|paste)
- storage_path (text, nullable)
- extracted_text (text)
- created_at

### milestones
- id (uuid, pk)
- project_id
- title (text)
- description (text, nullable)
- due_date (date/timestamptz, nullable)
- sort_order (int)

### tasks
- id (uuid, pk)
- project_id
- milestone_id (uuid, nullable)
- title (text)
- description (text)
- status (text: backlog|todo|doing|done)
- owner_id (uuid, nullable)
- due_date (date/timestamptz, nullable)
- estimate_hours (numeric, nullable)
- created_by
- created_at, updated_at

### standups
- id (uuid, pk)
- project_id
- standup_date (date)
- created_at
Unique (project_id, standup_date)

### standup_responses
- id (uuid, pk)
- standup_id
- user_id
- did (text)
- next (text)
- blockers (text)
- created_at
Unique (standup_id, user_id)

### standup_summaries
- id (uuid, pk)
- standup_id
- summary_md (text)
- risks_json (jsonb)
- created_at

## Notes
- Keep roles minimal.
- Later: dependencies, comments, activity log.
