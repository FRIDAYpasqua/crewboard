-- Crewboard demo MVP schema (NO RLS / NO AUTH). Apply in Supabase SQL Editor.

-- Projects
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Briefs (text extracted or pasted)
create table if not exists public.briefs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  source text not null check (source in ('pdf','paste')),
  storage_path text,
  extracted_text text not null,
  created_at timestamptz not null default now()
);

-- Tasks
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  description text not null default '',
  status text not null default 'todo' check (status in ('backlog','todo','doing','done')),
  owner text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Standups
create table if not exists public.standups (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  standup_date date not null,
  created_at timestamptz not null default now(),
  unique (project_id, standup_date)
);

create table if not exists public.standup_responses (
  id uuid primary key default gen_random_uuid(),
  standup_id uuid not null references public.standups(id) on delete cascade,
  name text not null,
  did text not null,
  next text not null,
  blockers text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.standup_summaries (
  id uuid primary key default gen_random_uuid(),
  standup_id uuid not null references public.standups(id) on delete cascade,
  summary_md text not null,
  risks_json jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  unique (standup_id)
);

-- updated_at triggers
create or replace function public.set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_projects_updated_at on public.projects;
create trigger trg_projects_updated_at before update on public.projects
for each row execute function public.set_updated_at();

drop trigger if exists trg_tasks_updated_at on public.tasks;
create trigger trg_tasks_updated_at before update on public.tasks
for each row execute function public.set_updated_at();
