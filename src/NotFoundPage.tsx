import { ArrowLeft, Compass, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <header className="relative z-10 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <a href="/" aria-label="Pruvia home">
            <img
              src="/pruvia-logo.png"
              alt="Pruvia"
              width={140}
              height={36}
              className="h-8 w-auto"
            />
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold transition hover:bg-secondary"
          >
            <Home className="h-4 w-4" />
            Home
          </a>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 items-center px-6 py-16">
        <div className="grid w-full items-center gap-14 lg:grid-cols-2">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Wrong turn
            </span>
            <p className="mt-6 text-7xl font-black tracking-[-0.07em] text-accent sm:text-8xl">
              404
            </p>
            <h1 className="mt-3 text-4xl text-primary sm:text-5xl">
              This road doesn't go anywhere.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
              The page may have moved, or the address might be off by a turn.
              Let's get you safely back on route.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-glow)] transition hover:opacity-90"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </a>
              <a
                href="/beta"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition hover:bg-secondary"
              >
                Try the beta
              </a>
            </div>
          </div>

          <div className="relative mx-auto flex h-80 w-full max-w-md items-center justify-center sm:h-96">
            <div className="absolute inset-8 rounded-full bg-accent/10 blur-2xl" />
            <div className="relative flex h-64 w-64 rotate-3 flex-col items-center justify-center rounded-[3rem] border-8 border-white bg-primary text-center shadow-[var(--shadow-soft)] sm:h-72 sm:w-72">
              <Compass className="h-14 w-14 text-accent" strokeWidth={1.8} />
              <span className="mt-4 text-5xl font-black tracking-[-0.06em] text-white">
                404
              </span>
              <span className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground/65">
                Recalculating
              </span>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-border/60 px-6 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Pruvia. Safe roads start with confident coaching.
      </footer>
    </div>
  );
}
