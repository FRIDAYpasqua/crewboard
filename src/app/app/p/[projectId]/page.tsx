import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function ProjectOverviewPage({
  params,
}: {
  params: { projectId: string };
}) {
  const supabase = createSupabaseServerClient();
  const { data: project, error } = await supabase
    .from("projects")
    .select("id,name,description,due_date")
    .eq("id", params.projectId)
    .single();

  if (error || !project) {
    return (
      <div
        className="rounded-lg border bg-[var(--muted)] p-5"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="text-sm font-semibold">Project not found</div>
        <div className="mt-2 text-sm text-[var(--muted-foreground)]">
          {error?.message ?? "Unknown error"}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-medium uppercase tracking-wide text-[var(--muted-foreground)]">
          Project
        </div>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          {project.name}
        </h1>
        {project.description ? (
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            {project.description}
          </p>
        ) : null}
        {project.due_date ? (
          <p className="mt-2 text-xs text-[var(--muted-foreground)]">
            Due: {project.due_date}
          </p>
        ) : null}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          {
            href: `/app/p/${project.id}/brief`,
            title: "Brief",
            desc: "Paste the brief and generate tasks.",
          },
          {
            href: `/app/p/${project.id}/board`,
            title: "Board",
            desc: "Tasks, owners, and status.",
          },
          {
            href: `/app/p/${project.id}/standup`,
            title: "Standup",
            desc: "Daily check-in summary.",
          },
        ].map((c) => (
          <Link
            key={c.title}
            href={c.href}
            className="rounded-lg border bg-[var(--muted)] p-4 hover:bg-[color:var(--muted)]"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="text-sm font-semibold">{c.title}</div>
            <div className="mt-2 text-sm text-[var(--muted-foreground)]">
              {c.desc}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
