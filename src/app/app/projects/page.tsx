import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function ProjectsPage() {
  const supabase = createSupabaseServerClient();
  const { data: projects, error } = await supabase
    .from("projects")
    .select("id,name,description,due_date,created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div
        className="rounded-lg border bg-[var(--muted)] p-5"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="text-sm font-semibold">Failed to load projects</div>
        <div className="mt-2 text-sm text-[var(--muted-foreground)]">
          {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Rooms for each group project.
          </p>
        </div>
        <Link
          href="/app/projects/new"
          className="inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium"
          style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
        >
          New project
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {(projects ?? []).map((p) => (
          <Link
            key={p.id}
            href={`/app/p/${p.id}`}
            className="rounded-lg border bg-[var(--muted)] p-4 hover:bg-[color:var(--muted)]"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="text-sm font-semibold">{p.name}</div>
            {p.description ? (
              <div className="mt-2 text-sm text-[var(--muted-foreground)]">
                {p.description}
              </div>
            ) : null}
            {p.due_date ? (
              <div className="mt-3 text-xs text-[var(--muted-foreground)]">
                Due: {p.due_date}
              </div>
            ) : null}
          </Link>
        ))}

        {projects && projects.length === 0 ? (
          <div
            className="rounded-lg border bg-[var(--muted)] p-4 text-sm text-[var(--muted-foreground)]"
            style={{ borderColor: "var(--border)" }}
          >
            No projects yet. Create one.
          </div>
        ) : null}
      </div>
    </div>
  );
}
