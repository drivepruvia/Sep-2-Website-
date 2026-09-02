import { useState } from "react";
import {
  ShieldCheck,
  Heart,
  ArrowRight,
  Compass,
  Target,
  Users,
} from "lucide-react";
import featureRoutes from "./assets/feature-routes.jpg";
import featureChecklist from "./assets/feature-checklist.jpg";
import featureCoaching from "./assets/feature-coaching.jpg";
import featurePlan from "./assets/feature-plan.jpg";

import Navbar from "./components/Nav";
import Footer from "./components/Footer";
import BetaPage from "./BetaPage";
import NotFoundPage from "./NotFoundPage";

// Replace this URL to change the video displayed in the homepage hero.
const HERO_VIDEO_URL = "https://www.youtube.com/embed/9TGRKb7kiMg?rel=0";

function Landing() {
  return (
    <div className="bg-background text-foreground">
      <Hero />
      <LogosStrip />
      <Problem />
      <HowItWorks />
      <FeatureTabs />
      <Vision />
      <Curriculum />
      <Testimonials />
      <FAQ />
      <CTA />
    </div>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Now accepting early families
          </span>
          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl text-primary">
            Teach your teen to drive — without the guesswork.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            Pruvia turns the 50+ hours parents already spend in the
            passenger seat into a structured coaching plan. Lesson by lesson,
            road by road, until they're truly ready.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition shadow-[var(--shadow-glow)]"
            >
              Get early access <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-secondary transition"
            >
              See how it works
            </a>
          </div>
          <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent" /> DMV-aligned
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-accent" /> Built with driving instructors
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative">
            <div className="absolute -inset-6 bg-accent/20 blur-3xl rounded-full" />
            <div className="relative aspect-video overflow-hidden rounded-3xl border border-border bg-primary shadow-[var(--shadow-soft)]">
              <iframe
                src={HERO_VIDEO_URL}
                title="DrivePruvia introduction video"
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- LOGOS ---------- */
function LogosStrip() {
  return (
    <section className="border-y border-border/60 bg-secondary/50">
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-sm text-muted-foreground">
        <span className="uppercase tracking-[0.2em] text-xs">As featured in</span>
        {["Parents Weekly", "AutoSafe", "DriveLab", "TeenWheel", "Mom & Road"].map(
          (n) => (
            <span key={n} className="font-semibold text-base opacity-70 tracking-tight">
              {n}
            </span>
          ),
        )}
      </div>
    </section>
  );
}

/* ---------- PROBLEM ---------- */
function Problem() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
            The problem
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl text-primary">
            Driving school ends. <br /> The hard part begins.
          </h2>
        </div>
        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            Most states require 50+ hours of supervised practice — and almost
            all of it falls on the parent. But parents aren't given a plan,
            just a logbook.
          </p>
          <p>
            The result: rushed lessons, skipped fundamentals, and teens who
            pass the test but freeze on the freeway.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              ["50+", "hours of practice required"],
              ["1 in 3", "crashes in the first year"],
              ["72%", "of parents feel unprepared"],
            ].map(([n, l]) => (
              <div
                key={n}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="text-3xl font-extrabold tracking-tight text-primary">{n}</div>
                <div className="text-xs text-muted-foreground mt-2">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- HOW IT WORKS ---------- */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Tell us where they are",
      body: "A quick assessment shows what your teen already knows and what to tackle first.",
    },
    {
      n: "02",
      title: "Follow the weekly plan",
      body: "Each week unlocks a focused 30-minute lesson with a route, talking points, and what to watch for.",
    },
    {
      n: "03",
      title: "Log & adjust",
      body: "Tap to log skills. The plan adapts to their progress — and prepares them for the road test.",
    },
  ];

  return (
    <section id="how" className="bg-secondary/50 border-y border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
            How it works
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl text-primary">
            Coaching, made simple.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            A three-step rhythm, designed with certified driving instructors and
            parents who've been through it.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div
              key={s.n}
              className="rounded-3xl bg-card border border-border p-8 hover:shadow-[var(--shadow-soft)] transition"
            >
              <div className="text-accent text-sm font-bold tracking-[0.15em]">{s.n}</div>
              <h3 className="mt-4 text-2xl text-primary">{s.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FEATURE TABS ---------- */
function FeatureTabs() {
  const tabs = [
    {
      key: "routes",
      label: "Guided routes",
      title: "Pre-mapped routes, picked for your teen's level.",
      body:
        "Every route is graded by difficulty and built around the skill your teen is practicing this week — empty lots, neighborhoods, arterials, highways.",
      img: featureRoutes,
      alt: "Pruvia app showing a graded neighborhood practice route",
    },
    {
      key: "checklist",
      label: "Skill checklist",
      title: "Track every maneuver — in one place.",
      body:
        "Parking, merging, blind spots, night driving. Tap to log a skill and watch the readiness bar climb week over week.",
      img: featureChecklist,
      alt: "Pruvia app showing a driving skill checklist with progress",
    },
    {
      key: "coaching",
      label: "Safety coaching",
      title: "The right words, exactly when you need them.",
      body:
        "In-the-moment scripts so you stay calm and your teen stays focused — no yelling, no awkward silence.",
      img: featureCoaching,
      alt: "Pruvia app showing a real-time coaching script card",
    },
    {
      key: "plan",
      label: "Adaptive plan",
      title: "A plan that learns with them.",
      body:
        "Pruvia re-orders next week's lessons based on what your teen mastered — and what still needs work before the road test.",
      img: featurePlan,
      alt: "Pruvia app showing a weekly adaptive lesson plan",
    },
  ];
  const [active, setActive] = useState(tabs[0].key);
  const current = tabs.find((t) => t.key === active)!;

  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-28">
      <div className="max-w-2xl">
        <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
          What's inside
        </span>
        <h2 className="mt-4 text-4xl md:text-5xl text-primary">
          A coaching toolkit built for the passenger seat.
        </h2>
      </div>

      {/* Tab bar */}
      <div className="mt-10 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              active === t.key
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Showcase */}
      <div className="mt-8 rounded-[2rem] border border-border bg-primary text-primary-foreground overflow-hidden shadow-[var(--shadow-soft)]">
        <div className="grid lg:grid-cols-2 gap-0">
          <div className="p-10 md:p-14 flex flex-col justify-center">
            <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
              {current.label}
            </div>
            <h3 className="mt-4 text-3xl md:text-4xl">{current.title}</h3>
            <p className="mt-5 text-primary-foreground/70 leading-relaxed max-w-md">
              {current.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  aria-label={t.label}
                  className={`h-1.5 rounded-full transition-all ${
                    active === t.key ? "w-10 bg-accent" : "w-6 bg-primary-foreground/20"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="relative bg-[oklch(0.14_0.04_260)] flex items-center justify-center p-8 md:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,oklch(0.52_0.27_264/0.25),transparent_60%)]" />
            <img
              key={current.key}
              src={current.img}
              alt={current.alt}
              width={1280}
              height={960}
              loading="lazy"
              className="relative max-h-[520px] w-auto object-contain animate-in fade-in duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- BRAND VISION ---------- */
function Vision() {
  const pillars = [
    {
      icon: Compass,
      title: "Structure",
      body: "Replace the empty logbook with a plan that any parent can follow.",
    },
    {
      icon: Target,
      title: "Mastery",
      body: "Treat driving as a craft — built skill by skill, not hour by hour.",
    },
    {
      icon: Users,
      title: "Together",
      body: "Make the passenger seat a place of coaching, not anxiety.",
    },
  ];

  return (
    <section id="about" className="bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] bg-accent/25 blur-[120px] rounded-full" />
      <div className="absolute -bottom-32 -right-20 w-[28rem] h-[28rem] bg-accent/15 blur-[120px] rounded-full" />
      <div className="mx-auto max-w-6xl px-6 py-28 relative">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
              Our vision
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl">
              Every new driver deserves a confident coach.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-primary-foreground/80 leading-relaxed text-lg">
            <p>
              The most important driving lessons don't happen at the school —
              they happen with a parent, in the family car, on the roads they'll
              actually drive every day.
            </p>
            <p>
              Pruvia exists to give those parents the structure, the language,
              and the calm they need to turn 50 quiet hours into a generation of
              safer drivers.
            </p>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-5">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-3xl border border-primary-foreground/10 bg-primary-foreground/[0.04] p-8 backdrop-blur-sm"
            >
              <div className="w-11 h-11 rounded-xl bg-accent/20 text-accent grid place-items-center">
                <p.icon className="w-5 h-5" />
              </div>
              <h3 className="mt-6 text-2xl">{p.title}</h3>
              <p className="mt-3 text-primary-foreground/70 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CURRICULUM ---------- */
function Curriculum() {
  const weeks = [
    ["Weeks 1–2", "Foundations", "Cockpit, mirrors, smooth starts & stops in empty lots."],
    ["Weeks 3–5", "Neighborhood", "Lane discipline, signaling, four-way stops, parking."],
    ["Weeks 6–8", "Arterials", "Multi-lane traffic, left turns across traffic, speed control."],
    ["Weeks 9–11", "Highway", "Merging, lane changes, blind spots, defensive scanning."],
    ["Weeks 12+", "All conditions", "Night, rain, heavy traffic, road-test rehearsal."],
  ];
  return (
    <section id="curriculum" className="bg-secondary/50 border-y border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
            The curriculum
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl text-primary">
            12 weeks from permit to road-ready.
          </h2>
        </div>
        <div className="mt-14 divide-y divide-border border-y border-border">
          {weeks.map(([w, t, d]) => (
            <div
              key={w}
              className="py-6 grid md:grid-cols-12 gap-4 items-baseline"
            >
              <div className="md:col-span-3 text-accent text-sm tracking-[0.15em] font-semibold">{w}</div>
              <div className="md:col-span-3 text-2xl text-primary">{t}</div>
              <div className="md:col-span-6 text-muted-foreground leading-relaxed">
                {d}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- TESTIMONIALS ---------- */
function Testimonials() {
  const quotes = [
    {
      q: "I finally had a plan. By week 6 my daughter was handling the freeway — I would have skipped that entirely on my own.",
      a: "— Sara M., parent of a 16-year-old",
    },
    {
      q: "The scripts kept me from yelling. That alone is worth it.",
      a: "— Daniel R., parent of a 17-year-old",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid md:grid-cols-2 gap-8">
        {quotes.map((t) => (
          <figure
            key={t.a}
            className="rounded-3xl border border-border bg-card p-10"
          >
            <blockquote className="text-2xl text-primary leading-snug font-semibold tracking-tight">
              "{t.q}"
            </blockquote>
            <figcaption className="mt-6 text-sm text-muted-foreground">
              {t.a}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const faqs = [
    [
      "Does this replace driving school?",
      "No — it complements it. Driving school teaches the basics; Pruvia structures the 50+ hours of practice that come after.",
    ],
    [
      "Do I need to be a great driver to coach?",
      "If you've been driving safely for a few years, you're qualified. We give you the words and the plan.",
    ],
    [
      "When can my family start?",
      "We're onboarding early families now. Join the waitlist and we'll reach out within a week.",
    ],
    [
      "Which states is this for?",
      "The curriculum is DMV-aligned and works across the U.S. State-specific test prep is included.",
    ],
  ];
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
      <h2 className="text-4xl md:text-5xl text-primary text-center">
        Questions, answered.
      </h2>
      <div className="mt-12 divide-y divide-border border-y border-border">
        {faqs.map(([q, a]) => (
          <details key={q} className="group py-6">
            <summary className="flex justify-between items-center cursor-pointer list-none">
              <span className="text-xl text-primary font-semibold tracking-tight">{q}</span>
              <span className="text-accent text-2xl group-open:rotate-45 transition">
                +
              </span>
            </summary>
            <p className="mt-3 text-muted-foreground leading-relaxed">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */


function CTA() {
  const [email, setEmail] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const [welcomeEmailDelayed, setWelcomeEmailDelayed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  if (isSubmitting) {
    return;
  }

  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    return;
  }

  setIsSubmitting(true);
  setWelcomeEmailDelayed(false);

  try {
    if (!import.meta.env.DEV) {
      // Save submission to Netlify Forms in production.
      const formResponse = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          "form-name": "signupForm",
          email: trimmedEmail,
        }).toString(),
      });

      if (!formResponse.ok) {
        throw new Error("Netlify form submission failed");
      }
    }

    // The waitlist submission is the source of truth. A temporary outage at
    // the email provider must not tell someone their successful signup failed.
    try {
      const welcomeResponse = await fetch("/.netlify/functions/send-welcome", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: trimmedEmail,
        }),
      });

      if (!welcomeResponse.ok) {
        setWelcomeEmailDelayed(true);
        console.error("Welcome email failed", {
          status: welcomeResponse.status,
        });
      }
    } catch (emailError) {
      setWelcomeEmailDelayed(true);
      console.error("Welcome email request failed", emailError);
    }

    setEmail("");
    setShowThankYou(true);
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
}

  return (
    <>
      <section id="cta" className="mx-auto max-w-5xl px-6 pb-24">
        <div className="rounded-[2rem] bg-primary text-primary-foreground p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-accent/40 blur-3xl rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/20 blur-3xl rounded-full" />

          <h2 className="relative text-4xl md:text-5xl leading-tight">
            Be the calm voice in the passenger seat.
          </h2>

          <p className="relative mt-4 text-primary-foreground/80 max-w-xl mx-auto">
            Join the waitlist and we'll send your first lesson the day we open.
          </p>

          <form
            name="signupForm"
            method="POST"
            data-netlify="true"
            onSubmit={handleSubmit}
            className="relative mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input type="hidden" name="form-name" value="signupForm" />

            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="parent@email.com"
              className="flex-1 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 px-5 py-3 text-sm placeholder:text-primary-foreground/50 focus:outline-none focus:border-accent"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-accent text-accent-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition"
            >
              {isSubmitting ? "Joining..." : "Join waitlist"}
            </button>
          </form>
        </div>
      </section>

      {showThankYou && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="relative max-w-xl rounded-3xl bg-white p-10 text-slate-900 shadow-xl">
            <button
              type="button"
              onClick={() => setShowThankYou(false)}
              className="absolute right-6 top-4 text-4xl leading-none text-slate-500 hover:text-slate-900"
            >
              ×
            </button>

            <h2 className="mb-4 text-4xl font-bold">
              You're on the list!
            </h2>

            <p className="mb-6 text-lg">
              Thank you for signing up for DrivePruvia. We'll keep you updated
              as we build tools to help teen drivers stay safe and confident on
              the road.
            </p>

            {welcomeEmailDelayed && (
              <p className="mb-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
                Your signup was saved, but your welcome email is delayed. We’ll
                follow up once email service is available again.
              </p>
            )}

            <p className="mb-3 text-lg">Want to help shape DrivePruvia?</p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="https://outlook.office.com/book/TeenDriverParentDicoveryInterviews@gtvault.onmicrosoft.com/?ismsaljsauthenabled"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500"
              >
                Book a 25 Minute Call
              </a>

              <a
                href="/beta"
                className="inline-flex justify-center rounded-xl border border-blue-600 px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
              >
                Try the Beta
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function App() {
  const pathname = window.location.pathname.replace(/\/+$/, "");

  if (pathname === "/email-preview") {
    return (
      <iframe
        src="/email-preview.html"
        title="Welcome email preview"
        className="h-screen w-full border-0"
      />
    );
  }

  if (pathname === "/beta") {
    return <BetaPage />;
  }

  if (pathname !== "") {
    return <NotFoundPage />;
  }

  return (
    <>
      <Navbar />
      <Landing />
      <Footer />
    </>
  );
}
