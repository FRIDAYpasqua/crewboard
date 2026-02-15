export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <header className="flex items-center justify-between">
          <div className="text-sm font-medium tracking-tight text-[var(--muted-foreground)]">
            Crewboard
          </div>
          <div className="text-sm text-[var(--muted-foreground)]">
            Notion-ish. Actually useful.
          </div>
        </header>

        <main className="mt-16">
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Turn a messy group project brief into a plan, a board, and a rhythm.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted-foreground)]">
            Built for university and high school teams. Upload the PDF brief, get
            milestones + tasks, run async standups, and stop shipping chaos.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-medium"
              style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
              href="#"
            >
              Create a project
            </a>
            <a
              className="inline-flex h-11 items-center justify-center rounded-md border px-5 text-sm font-medium"
              style={{ borderColor: "var(--border)" }}
              href="#"
            >
              See how it works
            </a>
          </div>

          <section className="mt-16 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Brief → Board",
                desc: "Upload the PDF. Crewboard extracts the brief and proposes tasks with acceptance criteria.",
              },
              {
                title: "Async standups",
                desc: "Daily check-ins that produce a team summary and update tasks. No meetings.",
              },
              {
                title: "Risk detection",
                desc: "Flags missing owners, slipping milestones, and blockers before the night-before panic.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-lg border bg-[color:var(--muted)] p-5"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="text-sm font-semibold">{f.title}</div>
                <div className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
                  {f.desc}
                </div>
              </div>
            ))}
          </section>

          <footer className="mt-16 border-t pt-8 text-sm text-[var(--muted-foreground)]" style={{ borderColor: "var(--border)" }}>
            Dark mode is automatic (system preference) for now.
          </footer>
        </main>
      </div>
    </div>
  );
}
