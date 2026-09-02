import { ArrowRight } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/60">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center" aria-label="Pruvia home">
          <img
            src="/pruvia-logo.png"
            alt="Pruvia"
            width={140}
            height={36}
            className="h-8 w-auto"
          />
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#how" className="hover:text-foreground transition">
            How it works
          </a>

          <a href="#curriculum" className="hover:text-foreground transition">
            Curriculum
          </a>

          <a href="#about" className="hover:text-foreground transition">
            About
          </a>
        </nav>

        <a
          href="#cta"
          className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition"
        >
          Join waitlist
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </header>
  );
}
