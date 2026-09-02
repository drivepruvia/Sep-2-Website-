import { ArrowLeft, ArrowUpRight } from "lucide-react";
import "./taste.css";

export default function NotFoundPage() {
  return <div className="taste t-utility-page">
    <header className="t-nav t-wrap"><a href="/" aria-label="Pruvia home"><img className="t-logo" src="/pruvia-logo.png" alt="Pruvia" width="140" height="36" /></a><a className="t-nav-cta" href="/"><ArrowLeft size={17} /> Home</a></header>
    <main className="t-utility-main t-wrap"><section className="t-utility-card t-not-found">
      <p className="t-eyebrow">404 · Wrong turn</p><h1>This road doesn't go anywhere.</h1>
      <p className="t-utility-intro">The page may have moved, or the address might be off by a turn. Let's get you safely back on route.</p>
      <div className="t-utility-actions"><a href="/" className="t-download-link">Back to home <ArrowUpRight size={18} /></a><a href="/beta" className="t-secondary-link">Try the beta <ArrowUpRight size={18} /></a></div>
    </section></main>
    <footer className="t-utility-footer t-wrap">© {new Date().getFullYear()} Pruvia. Better practice. Together.</footer>
  </div>;
}
