import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, ArrowUpRight, Play, Plus, Check, X, ShieldCheck, Heart } from 'lucide-react';
import driving from './assets/hero-driving-updated.png';
import betaHome from './assets/pruvia-beta-home.png';
import plan from './assets/pruvia-plan.png';
import coach from './assets/pruvia-coach.png';
import progress from './assets/pruvia-progress.png';
import { IOS_BETA_URL, ANDROID_BETA_URL } from './betaLinks';
import './taste.css';
gsap.registerPlugin(useGSAP, ScrollTrigger);
function BetaDownloads() {
    return <div className="t-downloads" role="group" aria-label="Try the Pruvia beta">
      <a className="t-download-link" href={IOS_BETA_URL}>Try on iPhone <ArrowUpRight size={18}/></a>
      <a className="t-download-link" href={ANDROID_BETA_URL}>Try on Android <ArrowUpRight size={18}/></a>
    </div>;
}
const feedbackMail = 'mailto:hello@pruvia.com?subject=Pruvia%20beta%20feedback';
const stages = [
    ['Foundations', 'Get comfortable before getting moving.', 'Cockpit setup, mirrors, smooth starts and stops.'],
    ['Neighborhood', 'Make the everyday feel familiar.', 'Lane position, signaling, four-way stops and parking.'],
    ['Arterials', 'Build confidence as the roads get busier.', 'Multi-lane traffic, left turns and speed control.'],
    ['Highway', 'Bring it all together at speed.', 'Merging, lane changes and defensive scanning.'],
    ['All conditions', 'Prepare for the roads ahead.', 'Night driving, rain and road-test rehearsal.'],
];
const practiceSteps = [
    { label: 'Before the drive', title: 'A plan before you turn the key.', body: 'Choose your practice time. See the activities, skills, and setting for the drive ahead.', image: plan, alt: 'Pruvia lesson plan with a 45-minute duration and a list of practice activities.' },
    { label: 'During the drive', title: 'Find the words. Keep it calm.', body: 'Simple coaching prompts help you explain the next move. Know what to say and what to watch for.', image: coach, alt: 'Pruvia right-turn lesson showing a Say this coaching prompt and observation checklist.' },
    { label: 'After the drive', title: 'See what’s coming together.', body: 'Review practice hours, follow skill progress, and see where to focus next time.', image: progress, alt: 'Pruvia progress screen showing practice hours, curriculum progress, and the next area of focus.' },
];
function ProductWalkthrough() {
    const scope = useRef<HTMLElement>(null);
    const [active, setActive] = useState(0);
    const stageTriggers = useRef<ScrollTrigger[]>([]);
    useGSAP(() => {
        const panels = gsap.utils.toArray<HTMLElement>('.t-walk-copy');
        const sticky = scope.current?.querySelector<HTMLElement>('.t-walk-sticky');
        const images = scope.current?.querySelector<HTMLElement>('.t-walk-images');
        const triggers = panels.map((panel, index) => ScrollTrigger.create({
            trigger: index === 2 ? panel.parentElement : panel.querySelector('.t-eyebrow'),
            start: () => {
                if (!sticky || !images || getComputedStyle(sticky).display === 'none') return 'top 35%';
                // Switch only when the stage label reaches the phone's top edge.
                const imageOffset = images.getBoundingClientRect().top - sticky.getBoundingClientRect().top;
                const phoneTop = parseFloat(getComputedStyle(sticky).top) + imageOffset;
                scope.current?.style.setProperty('--walk-final-top', `${phoneTop - 60}px`);
                return `top ${index === 2 ? phoneTop - 60 : phoneTop}px`;
            },
            end: 'bottom top',
            onEnter: () => setActive(index),
            onLeaveBack: () => setActive(Math.max(0, index - 1)),
        }));
        stageTriggers.current = triggers;
        return () => { stageTriggers.current = []; };
    }, { scope });
    function jumpTo(index: number) {
        const trigger = stageTriggers.current[index];
        if (!trigger) return;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: trigger.start + 1, behavior: reduced ? 'instant' : 'smooth' });
    }
    return <section ref={scope} id="features" className="t-product-story t-wrap">
      <div className="t-story-heading t-reveal"><h2>You’re a great driver.<br />Now be a great coach.</h2><p className="t-intro">Explore the Pruvia practice workflow.</p></div>
      <nav className="t-journey-nav" aria-label="Explore a practice drive">
        <div className="t-journey-track" aria-hidden="true"><span className="t-journey-fill"/></div>
        {['Before', 'During', 'After'].map((label, index) => <button key={label} type="button" aria-controls={`practice-${index}`} aria-current={active === index ? 'step' : undefined} onClick={() => jumpTo(index)}><span className="t-journey-dot">{index < active ? <Check size={14}/> : `0${index + 1}`}</span><span>{label}</span><ArrowRight size={16}/></button>)}
      </nav>
      <div className="t-walk-runway"><div className="t-walk-layout">
        <div className="t-walk-text">{practiceSteps.map((step, index) => <div className="t-walk-stage" key={step.label}><article id={`practice-${index}`} className={active === index ? 't-walk-copy is-active' : 't-walk-copy'} key={step.label}>
          <p className="t-eyebrow t-walk-enter"><span>0{index + 1}</span> {step.label}</p><h3 className="t-walk-enter">{step.title}</h3><p className="t-walk-enter">{step.body}</p>
          <div className="t-practice-cue t-walk-enter">
            <span>{['Your practice plan', 'Say this', 'Patterns from recent drives'][index]}</span>
            <p>{['45 minutes. A clear plan.', '“At the next intersection, turn right.”', '“Next time, practice slowing down before the turn.”'][index]}</p>
          </div>
          <figure className="t-walk-mobile"><img src={step.image} alt={step.alt} width="2005" height="4096" loading="lazy" onLoad={() => ScrollTrigger.refresh()}/></figure>
        </article></div>)}</div>
        <div className="t-walk-sticky" aria-hidden="true"><div className="t-walk-images">{practiceSteps.map((step, index) => <img key={step.label} className={active === index ? 'is-active' : ''} src={step.image} alt="" width="2005" height="4096" loading="lazy"/>)}</div><p className="t-screen-caption">{practiceSteps[active].label} <span>— Pruvia app preview</span></p></div>
      </div></div>
    </section>;
}
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
    return <section id="updates" className="t-signup t-wrap">
    <div><h2>Get updates.</h2><p>Get product news, beta updates, and new releases from Pruvia, delivered to your inbox.</p></div>
    <div className="t-form-area">
      {status === 'done' || status === 'delayed' ? <div className="t-success" role="status"><Check size={28}/><h3>{import.meta.env.DEV ? 'Preview complete.' : 'You’re subscribed.'}</h3><p>{import.meta.env.DEV ? 'This local preview does not save email subscriptions. The live site saves them through Netlify Forms.' : status === 'delayed' ? 'Your email was saved. Your welcome email is delayed, but you can explore the beta now.' : 'Thanks for joining us. Look out for your welcome email.'}</p><BetaDownloads /></div> : <form name="signupForm" method="POST" data-netlify="true" onSubmit={submit}>
        <input type="hidden" name="form-name" value="signupForm"/>
        <label htmlFor="taste-email">Your email address</label>
        <div className="t-form-line"><input id="taste-email" type="email" name="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"/><button aria-label="Get updates" disabled={status === 'sending'}>{status === 'sending' ? 'Subscribing…' : 'Get updates'}<ArrowRight size={20}/></button></div>
        {status === 'error' && <p role="alert">We couldn’t save your email. Please try again.</p>}
      </form>}
    </div>
  </section>;
}
export default function TasteLanding() {
    const root = useRef<HTMLDivElement>(null);
    const video = useRef<HTMLDialogElement>(null);
    const videoTrigger = useRef<HTMLButtonElement>(null);
    const [videoOpen, setVideoOpen] = useState(false);
    useGSAP(() => {
        const media = gsap.matchMedia();
        media.add('(prefers-reduced-motion: no-preference)', () => {
            gsap.from('.t-hero-enter', { y: 30, opacity: 0, duration: 0.85, stagger: 0.12, ease: 'power3.out', clearProps: 'all' });
            gsap.utils.toArray<HTMLElement>('.t-reveal').forEach(el => gsap.from(el, { y: 26, opacity: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true }, clearProps: 'all' }));
            gsap.fromTo('.t-photo img', { scale: 1.06, yPercent: -2 }, { scale: 1, yPercent: 2, ease: 'none', scrollTrigger: { trigger: '.t-photo', start: 'top bottom', end: 'bottom top', scrub: 0.7 } });
        }, root);
        return () => media.revert();
    }, { scope: root });
    function showVideo() { setVideoOpen(true); video.current?.showModal(); }
    function closeVideo() { video.current?.close(); setVideoOpen(false); videoTrigger.current?.focus(); }
    return <div ref={root} className="taste">
    <a href="#main-content" className="t-skip">Skip to content</a>
    <header className="t-nav t-wrap">
      <a href="/" aria-label="Pruvia home"><img className="t-logo" src="/pruvia-logo.png" alt="Pruvia" width="140" height="36"/></a>
      <a className="t-nav-cta" href="#updates">Get updates <ArrowUpRight size={17}/></a>
    </header>
    <main id="main-content">
      <section className="t-hero t-wrap t-product-hero">
        <div className="t-hero-content">
          <h1 className="t-hero-enter t-launch-title">The coaching app for parents <span>teaching their teen to drive.</span></h1>
          <p className="t-launch-slogan t-hero-enter">You’ve got the experience.<br />We’ve got the lesson plan.</p>
          <div className="t-actions t-hero-enter"><BetaDownloads /><button ref={videoTrigger} className="t-video-button" onClick={showVideo}><Play size={16}/> Watch the demo</button></div>
          <ul className="t-trust t-hero-enter" aria-label="Pruvia approach"><li><ShieldCheck size={20} strokeWidth={1.7} aria-hidden="true"/>DMV-aligned</li><li><Heart size={20} strokeWidth={1.7} aria-hidden="true"/>Built with driving instructors</li></ul>
        </div>
        <figure className="t-hero-product t-hero-enter"><div className="t-product-backdrop"/><img src={betaHome} alt="Pruvia home screen: your next practice drive, lesson plan, and driving progress in one place." width="1816" height="3760" fetchPriority="high"/><figcaption>Your next drive starts here.</figcaption></figure>
      </section>

      <ProductWalkthrough />
      <section id="about" className="t-about t-family-story t-wrap t-reveal"><h2 className="t-family-title">For the day they drive on their&nbsp;own.</h2><div className="t-about-body"><p>Every practice drive is a chance to pass on more than driving skills: good judgment, steady habits, and the confidence to make their own decisions. Pruvia helps you make that time together count.</p></div><div className="t-photo"><img src={driving} alt="A parent and teen sharing a practice drive, Pruvia brand illustration" width="1672" height="941" loading="lazy"/></div></section>

      <section id="curriculum" className="t-curriculum t-wrap"><div className="t-reveal"><h2>From the basics<br />to the road ahead.</h2><p className="t-intro">The learning path we’re building toward, from quiet parking lots to everyday roads. The beta starts with an early lesson; the full curriculum is still in development.</p></div><div className="t-stages">{stages.map(([name, title, body], i) => <details key={name} onToggle={() => ScrollTrigger.refresh()} name="curriculum" open={i === 0 ? true : undefined} className="t-reveal"><summary><span className="t-stage-index">{String(i + 1).padStart(2, '0')}</span><h3>{name}</h3><span className="t-stage-sub">{title}</span><Plus size={23}/></summary><p>{body}</p></details>)}</div></section>
      <section id="faq" className="t-faq t-wrap"><h2 className="t-reveal">Before we <br />hit the road.</h2><div>{[['Does this replace driving school?', 'No. Pruvia complements driving school by bringing structure to the practice you do together between lessons.'], ['Do I need to be a great driver to coach?', 'You don’t need to be a professional instructor. Pruvia helps you prepare for practice with a plan and clear coaching prompts.'], ['When can my family start?', 'You can try the beta now. Choose iPhone or Android below to open the beta invitation. No waitlist is required.'], ['How do I install the beta?', 'On iPhone, follow the TestFlight invitation. On Android, follow the Google Play testing link. Use either download option on this page.'], ['What is available in the beta?', 'The current release is an early lesson experience. This page shows the home screen and practice workflow; the full curriculum is still in development.'], ['Which states is this for?', 'Pruvia is being built for families in the U.S. Check the current beta for available content and your state’s DMV for licensing requirements.']].map(([q, a]) => <details key={q} onToggle={() => ScrollTrigger.refresh()}><summary>{q}<Plus size={20}/></summary><p>{a}</p>{q === 'When can my family start?' && <BetaDownloads />}</details>)}</div></section>
      <section id="cta" className="t-launch-cta t-wrap t-reveal"><h2>Ready for your next<br />practice drive?</h2><p>Bring a lesson plan to your next practice drive.</p><BetaDownloads /><a className="t-inline-link" href={feedbackMail}>Email feedback <ArrowUpRight size={16}/></a></section>
      <Signup />
    </main>
    <footer className="t-footer t-wrap">
      <div className="t-footer-grid">
        <div className="t-footer-brand"><a href="/" aria-label="Pruvia home"><img className="t-logo" src="/pruvia-logo.png" alt="Pruvia" width="140" height="36"/></a><p>Better practice. Together.</p></div>
        <nav className="t-footer-pages" aria-label="Footer navigation"><h2>Explore</h2><a href="#features">How it works</a><a href="#curriculum">Curriculum</a><a href="#about">Why Pruvia</a><a href="#faq">FAQ</a></nav>
        <div className="t-footer-contact"><h2>Get in touch</h2><a href="mailto:hello@pruvia.com">hello@pruvia.com <ArrowUpRight size={16}/></a><a href={feedbackMail}>Email feedback <ArrowUpRight size={16}/></a></div>
      </div>
      <div className="t-footer-bottom"><span>© {new Date().getFullYear()} Pruvia. All rights reserved.</span><div><a href="#">Privacy</a><a href="#">Terms</a></div></div>
    </footer>
    <dialog ref={video} className="t-dialog" onCancel={closeVideo} onClick={event => { if (event.target === event.currentTarget)
        closeVideo(); }} aria-label="Meet Pruvia introduction video"><button className="t-dialog-close" aria-label="Close video" onClick={closeVideo}><X /></button>{videoOpen && <iframe title="DrivePruvia introduction video" src="https://www.youtube.com/embed/qCk4ew6lGMQ?rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/>}</dialog>
  </div>;
}
