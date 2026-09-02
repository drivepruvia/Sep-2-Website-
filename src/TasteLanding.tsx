import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, ArrowUpRight, Play, Plus, Check, Menu, X } from 'lucide-react';
import driving from './assets/hero-driving.jpg';
import routes from './assets/feature-routes.jpg';
import checklist from './assets/feature-checklist.jpg';
import coaching from './assets/feature-coaching.jpg';
import plan from './assets/feature-plan.jpg';
import './taste.css';
gsap.registerPlugin(useGSAP, ScrollTrigger);
const features = [
    { name: 'Guided routes', title: 'A little less “where next?”', text: 'Practice with a purpose. Routes match the skill you’re working on, from quiet neighborhoods to busier roads.', image: routes, alt: 'Existing Pruvia route concept showing a neighborhood practice loop' },
    { name: 'Skill checklist', title: 'See what’s getting better.', text: 'Keep parking, turns, lane changes, and the next thing to practice together in one place.', image: checklist, alt: 'Existing Pruvia driving skills checklist concept' },
    { name: 'Safety coaching', title: 'Find the words. Keep the calm.', text: 'Simple coaching prompts help you explain what to look for and what to try on the next drive.', image: coaching, alt: 'Existing Pruvia coaching prompt concept' },
    { name: 'Adaptive plan', title: 'Their pace. A clearer plan.', text: 'Build on the skills they’re comfortable with, and make room for the ones that need another drive.', image: plan, alt: 'Existing Pruvia practice plan concept' },
];
const stages = [
    ['Foundations', 'Get comfortable before getting moving.', 'Cockpit setup, mirrors, smooth starts and stops.'],
    ['Neighborhood', 'Make the everyday feel familiar.', 'Lane position, signaling, four-way stops and parking.'],
    ['Arterials', 'Build confidence as the roads get busier.', 'Multi-lane traffic, left turns and speed control.'],
    ['Highway', 'Bring it all together at speed.', 'Merging, lane changes and defensive scanning.'],
    ['All conditions', 'Prepare for the roads ahead.', 'Night driving, rain and road-test rehearsal.'],
];
function Signup() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'delayed' | 'error'>('idle');
    const busy = useRef(false);
    async function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (busy.current || !email.trim())
            return;
        busy.current = true;
        setStatus('sending');
        try {
            if (!import.meta.env.DEV) {
                const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ 'form-name': 'signupForm', email: email.trim() }).toString() });
                if (!response.ok)
                    throw new Error('Form submission failed');
            }
            let delivered = false;
            try {
                const response = await fetch('/.netlify/functions/send-welcome', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email.trim() }) });
                delivered = response.ok;
            }
            catch { /* A saved signup still succeeds when email delivery is unavailable. */ }
            setEmail('');
            setStatus(delivered ? 'done' : 'delayed');
        }
        catch {
            setStatus('error');
        }
        finally {
            busy.current = false;
        }
    }
    return <section id="cta" className="t-signup t-wrap">
    <div className="t-reveal"><p className="t-eyebrow">For the next drive. And the ones after.</p><h2>A calmer start<br />begins with you.</h2><p>Join the waitlist for updates as we build Pruvia with early families.</p></div>
    <div className="t-form-area">
      {status === 'done' || status === 'delayed' ? <div className="t-success" role="status"><Check size={28}/><h3>{import.meta.env.DEV ? 'Preview complete.' : 'You’re on the list.'}</h3><p>{import.meta.env.DEV ? 'This local preview does not save waitlist submissions. The live site saves them through Netlify Forms.' : status === 'delayed' ? 'Your signup was saved. Your welcome email is delayed, but you can explore the beta now.' : 'Thanks for joining us. Look out for your welcome email.'}</p><a className="t-button" href="/beta">Try the Beta <ArrowUpRight size={18}/></a></div> : <form name="signupForm" method="POST" data-netlify="true" onSubmit={submit}>
        <input type="hidden" name="form-name" value="signupForm"/>
        <label htmlFor="taste-email">Your email address</label>
        <div className="t-form-line"><input id="taste-email" type="email" name="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"/><button aria-label="Join waitlist" disabled={status === 'sending'}>{status === 'sending' ? 'Joining…' : 'Join waitlist'}<ArrowRight size={20}/></button></div>
        {status === 'error' && <p role="alert">We couldn’t save your email. Please try again.</p>}
      </form>}
    </div>
  </section>;
}
export default function TasteLanding() {
    const root = useRef<HTMLDivElement>(null);
    const feature = useRef<HTMLDivElement>(null);
    const video = useRef<HTMLDialogElement>(null);
    const videoTrigger = useRef<HTMLButtonElement>(null);
    const [active, setActive] = useState(0);
    const [menu, setMenu] = useState(false);
    const [videoOpen, setVideoOpen] = useState(false);
    const current = features[active];
    useGSAP(() => {
        const media = gsap.matchMedia();
        media.add('(prefers-reduced-motion: no-preference)', () => {
            gsap.from('.t-hero-enter', { y: 30, opacity: 0, duration: 0.85, stagger: 0.12, ease: 'power3.out', clearProps: 'all' });
            gsap.utils.toArray<HTMLElement>('.t-reveal').forEach(el => gsap.from(el, { y: 26, opacity: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true }, clearProps: 'all' }));
            gsap.fromTo('.t-photo img', { scale: 1.06, yPercent: -2 }, { scale: 1, yPercent: 2, ease: 'none', scrollTrigger: { trigger: '.t-photo', start: 'top bottom', end: 'bottom top', scrub: 0.7 } });
        }, root);
        return () => media.revert();
    }, { scope: root });
    useGSAP(() => {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
            gsap.from(feature.current, { opacity: 0.35, y: 10, duration: 0.4, clearProps: 'all' });
    }, { scope: root, dependencies: [active], revertOnUpdate: true });
    function showVideo() { setVideoOpen(true); video.current?.showModal(); }
    function closeVideo() { video.current?.close(); setVideoOpen(false); videoTrigger.current?.focus(); }
    return <div ref={root} className="taste">
    <a href="#main-content" className="t-skip">Skip to content</a>
    <header className="t-nav t-wrap">
      <a href="/" aria-label="Pruvia home"><img className="t-logo" src="/pruvia-logo.png" alt="Pruvia" width="140" height="36"/></a>
      <nav className={menu ? 't-links is-open' : 't-links'} aria-label="Main navigation">{[['#how', 'How it works'], ['#curriculum', 'Curriculum'], ['#about', 'About']].map(([href, label]) => <a key={href} href={href} onClick={() => setMenu(false)}>{label}</a>)}</nav>
      <a className="t-nav-cta" href="#cta">Join waitlist <ArrowUpRight size={17}/></a>
      <button className="t-menu" aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
    </header>
    <main id="main-content">
      <section className="t-hero t-wrap">
        <p className="t-eyebrow t-hero-enter">A clearer way to coach a new driver</p>
        <h1 className="t-hero-enter">Their open road.<br /><span>Your steady hand.</span></h1>
        <div className="t-hero-bottom t-hero-enter"><p>Turn practice drives into progress.<br />A guided coaching plan for you and your teen.</p><div className="t-actions"><a className="t-button" href="#cta">Get early access <ArrowUpRight size={20}/></a><button ref={videoTrigger} className="t-video-button" onClick={showVideo}><Play size={16}/> Meet Pruvia</button></div></div>
        <div className="t-photo t-hero-enter"><img src={driving} alt="A parent and teen sharing a practice drive, Pruvia brand illustration" width="1920" height="1080" fetchPriority="high"/></div>
      </section>
      <section id="about" className="t-about t-wrap t-reveal"><p className="t-about-lead">You know how to drive.<br /><span>Teaching it is a different journey.</span></p><div className="t-about-body"><p>The practice between driving lessons matters. But a logbook doesn’t tell you what to teach, where to go, or what to say.</p><p>Pruvia gives the passenger seat a plan. So you can spend less time figuring it out and more time moving forward, together.</p></div></section>
      <section id="how" className="t-how t-wrap"><div className="t-reveal"><h2>One drive at a time.</h2><p className="t-intro">A simple rhythm for building confidence together.</p></div><div className="t-steps">{[['Find your starting point', 'Start with what your teen knows. Make a plan for what comes next.'], ['Head out with a plan', 'Know the skill, the route, and the words to use before you leave.'], ['Reflect. Then build on it.', 'Log what went well and what needs another go. Let the next drive build on this one.']].map(([title, text], i) => <article className="t-step t-reveal" key={title}><span className="t-step-number" aria-hidden="true">{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
      <section id="features" className="t-features t-wrap"><div className="t-feature-heading t-reveal"><p className="t-eyebrow">Built for the passenger seat</p><h2>A little guidance.<br />A lot more confidence.</h2></div><div className="t-feature-grid"><div className="t-feature-options" aria-label="Explore Pruvia features">{features.map((item, i) => <button key={item.name} aria-expanded={i === active} aria-controls="feature-preview" className={i === active ? 'is-active' : ''} onClick={() => setActive(i)}><span className="t-option-title">{item.name}<ArrowUpRight size={22}/></span>{i === active && <span className="t-option-text">{item.title}<small>{item.text}</small></span>}</button>)}</div><div id="feature-preview" className="t-feature-preview" ref={feature}><img src={current.image} alt={current.alt} width="1024" height="1024" loading="lazy" onLoad={() => ScrollTrigger.refresh()}/><p>Product concept / {current.name}</p></div></div></section>
      <section id="curriculum" className="t-curriculum t-wrap"><div className="t-reveal"><h2>Small steps.<br />Bigger possibilities.</h2><p className="t-intro">From the first quiet parking lot to the roads they’ll drive every day.</p></div><div className="t-stages">{stages.map(([name, title, body], i) => <details key={name} onToggle={() => ScrollTrigger.refresh()} name="curriculum" open={i === 0 ? true : undefined} className="t-reveal"><summary><span className="t-stage-index">{String(i + 1).padStart(2, '0')}</span><h3>{name}</h3><span className="t-stage-sub">{title}</span><Plus size={23}/></summary><p>{body}</p></details>)}</div></section>
      <section id="faq" className="t-faq t-wrap"><h2 className="t-reveal">Before we <br />hit the road.</h2><div>{[['Does this replace driving school?', 'No. Pruvia complements driving school by bringing structure to the practice you do together between lessons.'], ['Do I need to be a great driver to coach?', 'You don’t need to be a professional instructor. Pruvia helps you prepare for practice with a plan and clear coaching prompts.'], ['When can my family start?', 'We’re testing an early beta. Join the waitlist for updates, or visit the beta page to explore the current release.'], ['Which states is this for?', 'Pruvia is being built for families in the U.S. Check the current beta for available content and your state’s DMV for licensing requirements.']].map(([q, a]) => <details key={q} onToggle={() => ScrollTrigger.refresh()}><summary>{q}<Plus size={20}/></summary><p>{a}</p>{q === 'When can my family start?' && <a className="t-inline-link" href="/beta">Explore the beta <ArrowUpRight size={16}/></a>}</details>)}</div></section>
      <Signup />
    </main>
    <footer className="t-footer t-wrap"><div className="t-footer-top"><a href="/" aria-label="Pruvia home"><img className="t-logo" src="/pruvia-logo.png" alt="Pruvia" width="140" height="36"/></a><p>Better practice. Together.</p><a href="mailto:hello@pruvia.com">hello@pruvia.com <ArrowUpRight size={16}/></a></div><div className="t-footer-links"><a href="#how">How it works</a><a href="#features">Features</a><a href="#curriculum">Curriculum</a><a href="#about">About</a><a href="#faq">FAQ</a><a href="/book-email">Chat with us <ArrowUpRight size={14}/></a></div><div className="t-footer-bottom"><span>© {new Date().getFullYear()} Pruvia. All rights reserved.</span><div><a href="#">Privacy</a><a href="#">Terms</a></div></div></footer>
    <dialog ref={video} className="t-dialog" onCancel={closeVideo} onClick={event => { if (event.target === event.currentTarget)
        closeVideo(); }} aria-label="Meet Pruvia introduction video"><button className="t-dialog-close" aria-label="Close video" onClick={closeVideo}><X /></button>{videoOpen && <iframe title="DrivePruvia introduction video" src="https://www.youtube.com/embed/9TGRKb7kiMg?rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/>}</dialog>
  </div>;
}
