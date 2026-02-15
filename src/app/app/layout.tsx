import type { ReactNode } from "react";
import Link from "next/link";

function NavItem({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="block rounded-md px-3 py-2 text-sm text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
    >
      {children}
    </Link>
  );
}

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto flex max-w-6xl gap-6 px-6 py-8">
        <aside className="hidden w-60 shrink-0 sm:block">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold tracking-tight">Crewboard</div>
            <div
              className="h-2 w-2 rounded-full"
              style={{ background: "var(--accent)" }}
              aria-label="accent"
            />
          </div>

          <div className="mt-4 space-y-1">
            <NavItem href="/app">Home</NavItem>
            <NavItem href="/app/projects">Projects</NavItem>
          </div>

          <div className="mt-6 border-t pt-4" style={{ borderColor: "var(--border)" }}>
            <div className="px-3 text-xs font-medium uppercase tracking-wide text-[var(--muted-foreground)]">
              MVP
            </div>
            <div className="mt-2 space-y-1">
              <NavItem href="/app/projects/new">New project</NavItem>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="flex items-center justify-between rounded-lg border bg-[var(--muted)] px-4 py-3"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="text-sm font-medium text-[var(--muted-foreground)]">
              App
            </div>
            <div className="text-xs text-[var(--muted-foreground)]">
              Dark mode: system
            </div>
          </header>

          <main className="mt-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
