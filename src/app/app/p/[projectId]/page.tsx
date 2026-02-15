import Link from "next/link";
import { mockDb } from "@/lib/mock/db";

export default function ProjectOverviewPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project = mockDb.getProject(params.projectId);

  if (!project) {
    return (
      <div className="rounded-lg border bg-[var(--muted)] p-5" style={{ borderColor: "var(--border)" }}>
        <div className="text-sm font-semibold">Project not found</div>
        <div className="mt-2 text-sm text-[var(--muted-foreground)]">
          This is mocked data right now.
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
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { href: `/app/p/${project.id}/brief`, title: "Brief", desc: "Upload or paste the project brief." },
          { href: `/app/p/${project.id}/board`, title: "Board", desc: "Tasks, owners, and status." },
          { href: `/app/p/${project.id}/standup`, title: "Standup", desc: "Daily check-in summary." },
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
