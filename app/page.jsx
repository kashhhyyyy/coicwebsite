"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu, X, ArrowRight, ArrowUp, Star, MapPin, Phone, Mail, Clock,
  ChevronDown, HardHat, Wrench, Hammer, Zap, Flame, PaintBucket,
  Truck, Building2, Users, Award, TrendingUp, CheckCircle2,
  Briefcase, GraduationCap, Handshake, Facebook, Instagram, Linkedin,
  Droplet, Square, Link2, Home as HomeIcon, Umbrella, Scissors, Blocks
} from "lucide-react";

/* ---------------------------------------------------------
   COIC — Construction Opportunity Institute of Cleveland
   Single-page site. Design language: the union punch-card /
   site-badge. Every card reads like a laminated trade credential
   — rounded corner "hole punch", a rivet, a stamped trade number
   (COIC issues each trade a two-digit local number, like a real
   trade-union local). Hazard-stripe hairlines mark transitions
   between shifts of content, the way tape marks a job-site zone.
--------------------------------------------------------- */

const COLORS = {
  black: "#0A0A0A",
  charcoal: "#1B1B1B",
  gray: "#2E2E2E",
  steel: "#4A6FA5",
  steelLight: "#7C9AC7",
  yellow: "#F4B400",
  white: "#FFFFFF",
  offwhite: "#F5F4F1",
};

const TRADES = [
  { n: "01", name: "Boilermaker", icon: Flame, blurb: "Fabricate and erect the steel vessels that power industry — boilers, tanks, and pressure systems." },
  { n: "02", name: "Bricklayer", icon: Blocks, blurb: "Lay brick, block, and stone to build the walls and facades that define a skyline." },
  { n: "03", name: "Carpenter", icon: Hammer, blurb: "Frame, form, and finish — the trade at the center of nearly every job site in Cleveland." },
  { n: "04", name: "Cement Mason", icon: Square, blurb: "Place and finish concrete flatwork, foundations, and architectural surfaces." },
  { n: "05", name: "Electrician", icon: Zap, blurb: "Wire the systems that power buildings, from rough-in to final connection." },
  { n: "06", name: "Glazier", icon: Square, blurb: "Install glass, curtain wall, and storefront systems on commercial builds." },
  { n: "07", name: "Iron Worker", icon: Link2, blurb: "Raise structural steel and tie rebar — the trade that gives a building its bones." },
  { n: "08", name: "Laborer", icon: HardHat, blurb: "The foundation trade: site prep, demolition, and support across every phase of a build." },
  { n: "09", name: "Pipefitter", icon: Wrench, blurb: "Install and maintain the piping systems that keep mechanical and process work running." },
  { n: "10", name: "Plasterer", icon: PaintBucket, blurb: "Apply plaster, stucco, and specialty finishes to interior and exterior surfaces." },
  { n: "11", name: "Plumber", icon: Droplet, blurb: "Design and install the water, gas, and drainage systems every building depends on." },
  { n: "12", name: "Roofer", icon: HomeIcon, blurb: "Install and repair the roofing systems that protect every structure below." },
  { n: "13", name: "Waterproofer", icon: Umbrella, blurb: "Seal foundations, roofs, and envelopes against water intrusion for the life of a building." },
  { n: "14", name: "Sheet Metal Worker", icon: Scissors, blurb: "Fabricate and install ductwork, HVAC systems, and architectural metal." },
  { n: "15", name: "Teamster", icon: Truck, blurb: "Move the materials and equipment that keep every job site running on schedule." },
];

const WHY = [
  { icon: TrendingUp, title: "High-paying careers", text: "Union construction trades routinely out-earn the average four-year degree, with none of the tuition debt." },
  { icon: HardHat, title: "Hands-on training", text: "You'll spend real hours on tools, not just in a classroom, before you ever step onto a job site." },
  { icon: Users, title: "Industry professionals", text: "Instructors are tradespeople who've worked the jobs they're teaching, in Cleveland's own market." },
  { icon: Handshake, title: "Union pathways", text: "COIC prepares you to compete for entry into local apprenticeship programs with confidence." },
  { icon: Briefcase, title: "Career coaching", text: "One-on-one support on resumes, interviews, and navigating the apprenticeship application process." },
  { icon: GraduationCap, title: "Employment opportunities", text: "Direct relationships with contractors and union locals actively hiring across Northeast Ohio." },
];

const BENEFITS = [
  "Tuition-free program", "Industry certifications", "Career coaching",
  "Hands-on training", "Union connections", "Job placement assistance",
];

const STEPS = [
  { label: "Apply", text: "Submit your application — no experience required, just a willingness to work." },
  { label: "Interview", text: "Meet with our team to talk goals, fit, and which trades interest you most." },
  { label: "Train", text: "Complete hands-on pre-apprenticeship training in the shop and classroom." },
  { label: "Graduate", text: "Earn your certifications and COIC completion credential." },
  { label: "Apprentice", text: "Enter a union apprenticeship and start earning while you learn." },
];

const STATS = [
  { end: 500, suffix: "+", label: "Graduates" },
  { end: 15, suffix: "+", label: "Construction trades" },
  { end: 90, suffix: "%", label: "Job placement" },
  { end: 100, suffix: "+", label: "Employer partners" },
];

const TESTIMONIALS = [
  { name: "Marcus T.", trade: "Ironworker Apprentice", quote: "COIC put tools in my hands the first week. Six months later I had an apprenticeship offer.", rating: 5 },
  { name: "Dana R.", trade: "Electrician Apprentice", quote: "The coaching made the difference — I walked into my union interview actually prepared.", rating: 5 },
  { name: "Julian P.", trade: "Pipefitter Apprentice", quote: "I came in with zero trade background. COIC's instructors met me exactly where I was.", rating: 5 },
];

const FAQS = [
  { q: "Do I need construction experience to apply?", a: "No. COIC is a pre-apprenticeship program built for people starting from zero. We teach the fundamentals from the ground up." },
  { q: "Is the program free?", a: "Yes — COIC is a tuition-free program. There's no cost to apply or attend." },
  { q: "How long is the program?", a: "COIC is a 6–8 week pre-apprenticeship program. Exact dates and hours are confirmed during your intake interview." },
  { q: "What happens after I graduate?", a: "Graduates are placed into union apprenticeship programs, with direct support connecting to employer partners across Cleveland." },
];

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#programs", label: "Programs" },
  { href: "#trades", label: "Trades" },
  { href: "#apply", label: "Apply" },
  { href: "#stories", label: "Success Stories" },
  { href: "#contact", label: "Contact" },
];

/* ---------- Logo, rebuilt as SVG from the uploaded badge ---------- */
function Logo({ size = 44, mono = false }) {
  const ink = mono ? COLORS.white : COLORS.black;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="COIC logo">
      <circle cx="60" cy="60" r="57" stroke={ink} strokeWidth="2" strokeDasharray="2 4" fill="none" />
      <circle cx="60" cy="60" r="49" stroke={ink} strokeWidth="1.5" fill="none" />
      <path id="topArc" d="M 18 60 A 42 42 0 0 1 102 60" fill="none" />
      <text fontSize="7.6" fontFamily="Poppins, sans-serif" fontWeight="700" letterSpacing="1.5" fill={ink}>
        <textPath href="#topArc" startOffset="50%" textAnchor="middle">CONSTRUCTION OPPORTUNITY</textPath>
      </text>
      <path id="botArc" d="M 24 78 A 42 42 0 0 0 96 78" fill="none" />
      <text fontSize="7.6" fontFamily="Poppins, sans-serif" fontWeight="700" letterSpacing="1.5" fill={ink}>
        <textPath href="#botArc" startOffset="50%" textAnchor="middle">INSTITUTE OF CLEVELAND</textPath>
      </text>
      {/* skyline */}
      <rect x="34" y="58" width="8" height="20" fill={ink} />
      <rect x="43" y="50" width="9" height="28" fill={ink} />
      <rect x="53" y="60" width="8" height="18" fill={ink} />
      <rect x="68" y="54" width="9" height="24" fill={ink} />
      <rect x="78" y="62" width="8" height="16" fill={ink} />
      {/* crane */}
      <line x1="60" y1="30" x2="60" y2="55" stroke={ink} strokeWidth="2" />
      <line x1="42" y1="34" x2="78" y2="34" stroke={ink} strokeWidth="2" />
      <line x1="60" y1="34" x2="60" y2="30" stroke={ink} strokeWidth="2" />
      <line x1="78" y1="34" x2="72" y2="48" stroke={ink} strokeWidth="1.5" />
      {/* hardhat + tools */}
      <path d="M46 88 a12 8 0 0 1 24 0 z" fill={ink} />
      <rect x="44" y="88" width="28" height="3" fill={ink} />
      <line x1="50" y1="98" x2="66" y2="82" stroke={ink} strokeWidth="2.5" />
      <line x1="50" y1="82" x2="66" y2="98" stroke={ink} strokeWidth="2.5" />
    </svg>
  );
}

/* ---------- Scroll-reveal hook ---------- */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(.2,.7,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------- Hazard divider ---------- */
function HazardDivider({ flip = false }) {
  return (
    <div
      style={{
        height: 10,
        width: "100%",
        backgroundImage: `repeating-linear-gradient(${flip ? "-45deg" : "45deg"}, ${COLORS.yellow} 0 18px, ${COLORS.black} 18px 36px)`,
      }}
      aria-hidden="true"
    />
  );
}

/* ---------- Animated counter ---------- */
function Counter({ end, suffix, duration = 1600 }) {
  const [ref, visible] = useReveal();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = null;
    let raf;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(end * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [visible, end, duration]);
  return (
    <div ref={ref} style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "clamp(2.4rem,5vw,3.6rem)", color: COLORS.yellow, lineHeight: 1 }}>
      {val}{suffix}
    </div>
  );
}

/* ---------- Trade / credential card ---------- */
function TradeCard({ trade }) {
  const Icon = trade.icon;
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className="trade-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity .5s ease, transform .5s ease, border-color .25s ease",
      }}
    >
      <div className="trade-card-hole" />
      <div className="trade-card-num">LOCAL&nbsp;{trade.n}</div>
      <div className="trade-card-icon"><Icon size={26} color={COLORS.yellow} strokeWidth={1.8} /></div>
      <h3 className="trade-card-title">{trade.name}</h3>
      <p className="trade-card-blurb">{trade.blurb}</p>
      <a href="#apply" className="trade-card-link">
        Learn more <ArrowRight size={14} />
      </a>
      <div className="trade-card-rivet" />
    </div>
  );
}

/* =========================================================
   MAIN APP
========================================================= */
export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowTop(window.scrollY > 700);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((href) => {
    setNavOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.message.trim()) e.message = "Tell us a little about yourself.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submitForm = (ev) => {
    ev.preventDefault();
    if (!validate()) { setFormStatus(null); return; }
    setFormStatus("sent");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: COLORS.white, color: COLORS.black, overflowX: "hidden" }}>
      <GlobalStyle />

      {/* NAV */}
      <header className={`coic-nav ${scrolled ? "coic-nav--scrolled" : ""}`}>
        <div className="coic-nav-inner">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo("#home"); }} className="coic-nav-brand">
            <Logo size={38} />
            <span className="coic-nav-brand-text">
              COIC<span className="coic-nav-brand-sub">Cleveland</span>
            </span>
          </a>
          <nav className="coic-nav-links">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}>
                {l.label}
              </a>
            ))}
          </nav>
          <a href="#apply" onClick={(e) => { e.preventDefault(); scrollTo("#apply"); }} className="coic-btn coic-btn--yellow coic-nav-cta">
            Apply Now
          </a>
          <button className="coic-nav-toggle" onClick={() => setNavOpen((v) => !v)} aria-label="Toggle menu">
            {navOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
        {navOpen && (
          <div className="coic-nav-mobile">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}>
                {l.label}
              </a>
            ))}
            <a href="#apply" onClick={(e) => { e.preventDefault(); scrollTo("#apply"); }} className="coic-btn coic-btn--yellow" style={{ marginTop: 12 }}>
              Apply Now
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="coic-hero">
        <div className="coic-hero-overlay" />
        <div className="coic-hero-content">
          <Reveal>
            <div className="coic-hero-logo"><Logo size={104} mono /></div>
          </Reveal>
          <Reveal delay={100}>
            <p className="coic-eyebrow coic-eyebrow--light">Pre-Apprenticeship Program · Cleveland, OH</p>
          </Reveal>
          <Reveal delay={180}>
            <h1 className="coic-h1">
              Build Your Future in the <span style={{ color: COLORS.yellow }}>Construction Trades</span>
            </h1>
          </Reveal>
          <Reveal delay={280}>
            <p className="coic-hero-sub">
              Prepare for a high-paying union apprenticeship through the Construction Opportunity Institute of Cleveland.
            </p>
          </Reveal>
          <Reveal delay={380}>
            <div className="coic-hero-actions">
              <a href="#apply" onClick={(e) => { e.preventDefault(); scrollTo("#apply"); }} className="coic-btn coic-btn--yellow coic-btn--lg">
                Apply Now <ArrowRight size={18} />
              </a>
              <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo("#about"); }} className="coic-btn coic-btn--outline coic-btn--lg">
                Learn More
              </a>
            </div>
          </Reveal>
        </div>
        <button className="coic-scroll-cue" onClick={() => scrollTo("#about")} aria-label="Scroll down">
          <ChevronDown size={22} />
        </button>
      </section>

      <HazardDivider />

      {/* ABOUT */}
      <section id="about" className="coic-section">
        <div className="coic-container coic-about-grid">
          <Reveal>
            <div>
              <p className="coic-eyebrow">About COIC</p>
              <h2 className="coic-h2">Real training. Real trades. A real path in.</h2>
              <p className="coic-body">
                The Construction Opportunity Institute of Cleveland exists for one reason: to move people from
                zero construction experience to a union apprenticeship offer. We run a hands-on pre-apprenticeship
                built around workforce development, career readiness, and direct relationships with Cleveland's
                trade unions and contractors.
              </p>
              <p className="coic-body">
                You won't sit through lectures about construction — you'll do construction, guided by
                instructors who've spent careers on the tools, so you walk into your union interview already
                speaking the language of the job site.
              </p>
            </div>
          </Reveal>
          <div className="coic-about-features">
            {[
              { icon: Building2, label: "Workforce development" },
              { icon: Handshake, label: "Union apprenticeship prep" },
              { icon: HardHat, label: "Hands-on learning" },
              { icon: GraduationCap, label: "Career readiness" },
              { icon: Users, label: "Industry partnerships" },
            ].map((f, i) => (
              <Reveal key={f.label} delay={i * 80}>
                <div className="coic-about-feature">
                  <f.icon size={20} color={COLORS.steel} />
                  <span>{f.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="coic-section coic-section--dark">
        <div className="coic-container">
          <Reveal>
            <p className="coic-eyebrow coic-eyebrow--light">Why COIC</p>
            <h2 className="coic-h2 coic-h2--light">A program built around the outcome, not the classroom</h2>
          </Reveal>
          <div className="coic-why-grid">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 70}>
                <div className="coic-why-card">
                  <w.icon size={24} color={COLORS.yellow} />
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRADES */}
      <section id="trades" className="coic-section">
        <div className="coic-container">
          <Reveal>
            <p className="coic-eyebrow">Trades We Prepare You For</p>
            <h2 className="coic-h2">Fifteen trades. One application.</h2>
            <p className="coic-body" style={{ maxWidth: 640 }}>
              Every card below is a real union trade with real apprenticeship pipelines in Cleveland. Explore
              them, then apply to the track that fits.
            </p>
          </Reveal>
          <div className="coic-trades-grid">
            {TRADES.map((t) => <TradeCard key={t.name} trade={t} />)}
          </div>
        </div>
      </section>

      <HazardDivider flip />

      {/* PROGRAM TIMELINE */}
      <section id="programs" className="coic-section">
        <div className="coic-container">
          <Reveal>
            <p className="coic-eyebrow">Program Overview</p>
            <h2 className="coic-h2">Five steps from application to apprenticeship</h2>
          </Reveal>
          <div className="coic-timeline">
            {STEPS.map((s, i) => (
              <Reveal key={s.label} delay={i * 90}>
                <div className="coic-timeline-step">
                  <div className="coic-timeline-marker">{i + 1}</div>
                  <h3>{s.label}</h3>
                  <p>{s.text}</p>
                  {i < STEPS.length - 1 && <div className="coic-timeline-connector" />}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="coic-section coic-section--steel">
        <div className="coic-container">
          <Reveal>
            <p className="coic-eyebrow coic-eyebrow--light">What You Get</p>
            <h2 className="coic-h2 coic-h2--light">Support built in from day one</h2>
          </Reveal>
          <div className="coic-benefits-grid">
            {BENEFITS.map((b, i) => (
              <Reveal key={b} delay={i * 60}>
                <div className="coic-benefit-chip">
                  <CheckCircle2 size={18} color={COLORS.yellow} />
                  <span>{b}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section id="stories" className="coic-section">
        <div className="coic-container">
          <Reveal>
            <p className="coic-eyebrow">Success Stories</p>
            <h2 className="coic-h2">Graduates who are now on the job</h2>
          </Reveal>
          <div className="coic-testimonial-grid">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 90}>
                <div className="coic-testimonial-card">
                  <div className="coic-testimonial-avatar">{t.name.split(" ").map((p) => p[0]).join("")}</div>
                  <div className="coic-testimonial-stars">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} size={15} fill={COLORS.yellow} color={COLORS.yellow} />
                    ))}
                  </div>
                  <p className="coic-testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
                  <p className="coic-testimonial-name">{t.name}</p>
                  <p className="coic-testimonial-trade">{t.trade}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="coic-section coic-section--black">
        <div className="coic-container coic-stats-grid">
          {STATS.map((s) => (
            <div key={s.label} className="coic-stat">
              <Counter end={s.end} suffix={s.suffix} />
              <p>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="coic-section">
        <div className="coic-container" style={{ maxWidth: 780 }}>
          <Reveal>
            <p className="coic-eyebrow">Questions</p>
            <h2 className="coic-h2">Frequently asked</h2>
          </Reveal>
          <div className="coic-faq">
            {FAQS.map((f, i) => (
              <div key={f.q} className="coic-faq-item">
                <button className="coic-faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                  <span>{f.q}</span>
                  <ChevronDown size={18} style={{ transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform .25s ease" }} />
                </button>
                <div className="coic-faq-a" style={{ maxHeight: openFaq === i ? 200 : 0 }}>
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / APPLY */}
      <section id="apply" className="coic-cta">
        <div className="coic-cta-inner">
          <Reveal>
            <h2 className="coic-h2 coic-h2--light" style={{ marginBottom: 8 }}>Ready to build your future?</h2>
            <p className="coic-hero-sub" style={{ marginBottom: 28 }}>
              Apply today and begin your journey toward a rewarding career in the construction industry.
            </p>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }} className="coic-btn coic-btn--yellow coic-btn--lg">
              Apply Now <ArrowRight size={18} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="coic-section">
        <div className="coic-container coic-contact-grid">
          <Reveal>
            <div>
              <p className="coic-eyebrow">Contact</p>
              <h2 className="coic-h2">Start your application</h2>
              <div className="coic-contact-details">
                <div><MapPin size={18} color={COLORS.steel} /><span>16102 Chagrin Blvd #107, Cleveland, OH 44120</span></div>
                <div><Users size={18} color={COLORS.steel} /><span>Norman Edwards, Program Contact</span></div>
                <div><Phone size={18} color={COLORS.steel} /><span>216-355-0535</span></div>
                <div><Mail size={18} color={COLORS.steel} /><span>normankedwards@gmail.com</span></div>
                <div><Clock size={18} color={COLORS.steel} /><span>Mon–Fri, 8:00 AM – 5:00 PM</span></div>
                <div><Building2 size={18} color={COLORS.steel} /><span>thecoic.com</span></div>
              </div>
              <div className="coic-social">
                <Facebook size={18} /><Instagram size={18} /><Linkedin size={18} />
              </div>
              <div className="coic-map-placeholder">Map</div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <form className="coic-form" onSubmit={submitForm} noValidate>
              <label>
                Name
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={errors.name ? "coic-input-error" : ""}
                />
                {errors.name && <span className="coic-error-text">{errors.name}</span>}
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={errors.email ? "coic-input-error" : ""}
                />
                {errors.email && <span className="coic-error-text">{errors.email}</span>}
              </label>
              <label>
                Which trade interests you?
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={errors.message ? "coic-input-error" : ""}
                />
                {errors.message && <span className="coic-error-text">{errors.message}</span>}
              </label>
              <button type="submit" className="coic-btn coic-btn--yellow" style={{ width: "100%", justifyContent: "center" }}>
                Submit Application
              </button>
              {formStatus === "sent" && (
                <p className="coic-form-success"><CheckCircle2 size={16} /> Thanks — we'll be in touch shortly.</p>
              )}
            </form>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="coic-footer">
        <div className="coic-container coic-footer-grid">
          <div>
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo("#home"); }} className="coic-nav-brand">
              <Logo size={34} mono />
              <span className="coic-nav-brand-text coic-nav-brand-text--light">
                COIC<span className="coic-nav-brand-sub">Cleveland</span>
              </span>
            </a>
            <p className="coic-footer-tagline">Construction Opportunity Institute of Cleveland</p>
            <p className="coic-footer-tagline" style={{ marginTop: 4 }}>thecoic.com</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}>{l.label}</a>
            ))}
          </div>
          <div>
            <h4>Programs</h4>
            <a href="#programs" onClick={(e) => { e.preventDefault(); scrollTo("#programs"); }}>Pre-Apprenticeship</a>
            <a href="#trades" onClick={(e) => { e.preventDefault(); scrollTo("#trades"); }}>Trades</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
          </div>
          <div>
            <h4>Follow</h4>
            <div className="coic-social coic-social--footer">
              <Facebook size={18} /><Instagram size={18} /><Linkedin size={18} />
            </div>
          </div>
        </div>
        <div className="coic-footer-bottom">
          © {new Date().getFullYear()} Construction Opportunity Institute of Cleveland. All rights reserved.
        </div>
      </footer>

      {showTop && (
        <button className="coic-back-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}

/* ---------- Global styles ---------- */
function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');

      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      h1, h2, h3, h4 { font-family: 'Poppins', sans-serif; margin: 0; }
      p { margin: 0; }
      a { text-decoration: none; color: inherit; }
      button { font-family: 'Inter', sans-serif; cursor: pointer; border: none; background: none; }

      .coic-container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
      .coic-section { padding: 88px 0; }
      .coic-section--dark { background: ${COLORS.black}; color: ${COLORS.white}; }
      .coic-section--steel { background: ${COLORS.steel}; color: ${COLORS.white}; }
      .coic-section--black { background: ${COLORS.charcoal}; color: ${COLORS.white}; }

      .coic-eyebrow { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: ${COLORS.steel}; margin-bottom: 12px; }
      .coic-eyebrow--light { color: ${COLORS.yellow}; }
      .coic-h1 { font-size: clamp(2.4rem, 6vw, 4.2rem); font-weight: 800; color: ${COLORS.white}; line-height: 1.05; max-width: 820px; margin: 0 auto 18px; }
      .coic-h2 { font-size: clamp(1.7rem, 3.4vw, 2.5rem); font-weight: 800; margin-bottom: 20px; max-width: 640px; }
      .coic-h2--light { color: ${COLORS.white}; }
      .coic-body { font-size: 1.02rem; line-height: 1.7; color: #3a3a3a; margin-bottom: 16px; max-width: 560px; }
      .coic-hero-sub { font-size: 1.15rem; color: #e8e8e8; max-width: 560px; margin: 0 auto; line-height: 1.6; }

      /* Buttons */
      .coic-btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 26px; border-radius: 4px; font-weight: 600; font-size: 0.95rem; transition: transform .18s ease, box-shadow .18s ease, background .18s ease; }
      .coic-btn:hover { transform: translateY(-2px); }
      .coic-btn--yellow { background: ${COLORS.yellow}; color: ${COLORS.black}; }
      .coic-btn--yellow:hover { box-shadow: 0 8px 22px rgba(244,180,0,0.35); }
      .coic-btn--outline { background: transparent; color: ${COLORS.white}; border: 1.5px solid rgba(255,255,255,0.6); }
      .coic-btn--outline:hover { background: rgba(255,255,255,0.1); }
      .coic-btn--lg { padding: 16px 32px; font-size: 1rem; }

      /* Nav */
      .coic-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: transparent; transition: background .3s ease, box-shadow .3s ease, padding .3s ease; padding: 18px 0; }
      .coic-nav--scrolled { background: rgba(10,10,10,0.94); box-shadow: 0 2px 18px rgba(0,0,0,0.25); padding: 10px 0; backdrop-filter: blur(6px); }
      .coic-nav-inner { max-width: 1180px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; }
      .coic-nav-brand { display: flex; align-items: center; gap: 10px; }
      .coic-nav-brand-text { font-family: 'Poppins', sans-serif; font-weight: 800; font-size: 1.1rem; color: ${COLORS.white}; letter-spacing: 0.5px; display: flex; flex-direction: column; line-height: 1.1; }
      .coic-nav-brand-text--light { color: ${COLORS.white}; }
      .coic-nav-brand-sub { font-family: 'Inter', sans-serif; font-weight: 500; font-size: 0.6rem; letter-spacing: 2px; text-transform: uppercase; color: ${COLORS.yellow}; }
      .coic-nav-links { display: flex; gap: 28px; }
      .coic-nav-links a { color: ${COLORS.white}; font-weight: 500; font-size: 0.92rem; position: relative; padding-bottom: 4px; }
      .coic-nav-links a::after { content: ""; position: absolute; left: 0; bottom: 0; height: 2px; width: 0; background: ${COLORS.yellow}; transition: width .25s ease; }
      .coic-nav-links a:hover::after { width: 100%; }
      .coic-nav-cta { display: inline-flex; }
      .coic-nav-toggle { display: none; color: ${COLORS.white}; }
      .coic-nav-mobile { display: none; }

      @media (max-width: 920px) {
        .coic-nav-links, .coic-nav-cta { display: none; }
        .coic-nav-toggle { display: block; }
        .coic-nav-mobile { display: flex; flex-direction: column; gap: 16px; padding: 20px 24px 26px; background: rgba(10,10,10,0.98); }
        .coic-nav-mobile a { color: ${COLORS.white}; font-weight: 500; }
      }

      /* Hero */
      .coic-hero { position: relative; min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; background: linear-gradient(160deg, #111 0%, #1c1c1c 55%, #23303f 100%); overflow: hidden; }
      .coic-hero::before { content: ""; position: absolute; inset: 0; background-image: repeating-linear-gradient(45deg, rgba(244,180,0,0.05) 0 2px, transparent 2px 40px); }
      .coic-hero-overlay { position: absolute; inset: 0; background: radial-gradient(ellipse at center, rgba(0,0,0,0.1), rgba(0,0,0,0.65)); }
      .coic-hero-content { position: relative; z-index: 2; padding: 0 24px; display: flex; flex-direction: column; align-items: center; }
      .coic-hero-logo { margin-bottom: 20px; filter: drop-shadow(0 2px 10px rgba(0,0,0,0.4)); }
      .coic-hero-actions { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; margin-top: 8px; }
      .coic-scroll-cue { position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); color: ${COLORS.yellow}; animation: coic-bounce 2s infinite; z-index: 2; }
      @keyframes coic-bounce { 0%,100% { transform: translate(-50%,0); } 50% { transform: translate(-50%,8px); } }

      /* About */
      .coic-about-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 56px; align-items: start; }
      .coic-about-features { display: flex; flex-direction: column; gap: 14px; }
      .coic-about-feature { display: flex; align-items: center; gap: 12px; padding: 16px 18px; border: 1px solid #eee; border-left: 3px solid ${COLORS.steel}; border-radius: 4px; font-weight: 500; }
      @media (max-width: 860px) { .coic-about-grid { grid-template-columns: 1fr; } }

      /* Why */
      .coic-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; margin-top: 36px; }
      .coic-why-card { background: ${COLORS.charcoal}; border: 1px solid #2c2c2c; border-radius: 6px; padding: 26px 22px; transition: border-color .2s ease, transform .2s ease; }
      .coic-why-card:hover { border-color: ${COLORS.yellow}; transform: translateY(-4px); }
      .coic-why-card h3 { font-size: 1.05rem; margin: 14px 0 8px; }
      .coic-why-card p { font-size: 0.92rem; color: #b8b8b8; line-height: 1.55; }
      @media (max-width: 860px) { .coic-why-grid { grid-template-columns: 1fr 1fr; } }
      @media (max-width: 560px) { .coic-why-grid { grid-template-columns: 1fr; } }

      /* Trades */
      .coic-trades-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 36px; }
      .trade-card { position: relative; background: ${COLORS.offwhite}; border: 1.5px solid #e2e0d8; border-radius: 10px; padding: 26px 22px 22px; }
      .trade-card:hover { border-color: ${COLORS.yellow}; }
      .trade-card-hole { position: absolute; top: 14px; right: 14px; width: 14px; height: 14px; border-radius: 50%; background: ${COLORS.white}; border: 1.5px solid #d8d6cc; }
      .trade-card-num { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; color: ${COLORS.steel}; margin-bottom: 14px; }
      .trade-card-icon { width: 46px; height: 46px; border-radius: 8px; background: ${COLORS.black}; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }
      .trade-card-title { font-size: 1.08rem; margin-bottom: 8px; }
      .trade-card-blurb { font-size: 0.9rem; color: #555; line-height: 1.55; margin-bottom: 16px; }
      .trade-card-link { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; font-size: 0.88rem; color: ${COLORS.black}; border-bottom: 1.5px solid ${COLORS.yellow}; padding-bottom: 2px; }
      .trade-card-rivet { position: absolute; bottom: 14px; right: 16px; width: 8px; height: 8px; border-radius: 50%; background: #d8d6cc; }
      @media (max-width: 900px) { .coic-trades-grid { grid-template-columns: 1fr 1fr; } }
      @media (max-width: 560px) { .coic-trades-grid { grid-template-columns: 1fr; } }

      /* Timeline */
      .coic-timeline { display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; margin-top: 44px; }
      .coic-timeline-step { position: relative; text-align: center; padding: 0 8px; }
      .coic-timeline-marker { width: 52px; height: 52px; border-radius: 50%; background: ${COLORS.black}; color: ${COLORS.yellow}; font-family: 'Poppins', sans-serif; font-weight: 800; font-size: 1.1rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; border: 3px solid ${COLORS.yellow}; }
      .coic-timeline-step h3 { font-size: 1rem; margin-bottom: 6px; }
      .coic-timeline-step p { font-size: 0.85rem; color: #666; line-height: 1.5; }
      .coic-timeline-connector { position: absolute; top: 26px; left: calc(50% + 40px); width: calc(100% - 40px); height: 2px; background: repeating-linear-gradient(90deg, ${COLORS.yellow} 0 6px, transparent 6px 12px); }
      @media (max-width: 900px) { .coic-timeline { grid-template-columns: 1fr 1fr; } .coic-timeline-connector { display: none; } }
      @media (max-width: 560px) { .coic-timeline { grid-template-columns: 1fr; } }

      /* Benefits */
      .coic-benefits-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 36px; }
      .coic-benefit-chip { display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.1); padding: 16px 18px; border-radius: 6px; font-weight: 500; }
      @media (max-width: 760px) { .coic-benefits-grid { grid-template-columns: 1fr 1fr; } }
      @media (max-width: 480px) { .coic-benefits-grid { grid-template-columns: 1fr; } }

      /* Testimonials */
      .coic-testimonial-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; margin-top: 36px; }
      .coic-testimonial-card { background: ${COLORS.offwhite}; border-radius: 8px; padding: 28px 24px; border-top: 4px solid ${COLORS.yellow}; }
      .coic-testimonial-avatar { width: 44px; height: 44px; border-radius: 50%; background: ${COLORS.steel}; color: white; display: flex; align-items: center; justify-content: center; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 14px; }
      .coic-testimonial-stars { display: flex; gap: 2px; margin-bottom: 12px; }
      .coic-testimonial-quote { font-size: 0.96rem; line-height: 1.6; color: #333; margin-bottom: 16px; }
      .coic-testimonial-name { font-weight: 700; font-size: 0.92rem; }
      .coic-testimonial-trade { font-size: 0.82rem; color: ${COLORS.steel}; }
      @media (max-width: 860px) { .coic-testimonial-grid { grid-template-columns: 1fr; } }

      /* Stats */
      .coic-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; text-align: center; }
      .coic-stat p { color: #ccc; margin-top: 8px; font-weight: 500; letter-spacing: 0.5px; }
      @media (max-width: 760px) { .coic-stats-grid { grid-template-columns: 1fr 1fr; row-gap: 36px; } }

      /* FAQ */
      .coic-faq-item { border-bottom: 1px solid #e5e5e5; }
      .coic-faq-q { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 20px 4px; font-weight: 600; font-size: 1rem; text-align: left; }
      .coic-faq-a { overflow: hidden; transition: max-height .3s ease; }
      .coic-faq-a p { padding: 0 4px 20px; color: #555; line-height: 1.6; font-size: 0.94rem; }

      /* CTA */
      .coic-cta { background: linear-gradient(120deg, ${COLORS.black}, #1e2a38); padding: 90px 24px; text-align: center; position: relative; }
      .coic-cta::before { content: ""; position: absolute; top:0; left:0; right:0; height: 6px; background: repeating-linear-gradient(45deg, ${COLORS.yellow} 0 14px, ${COLORS.black} 14px 28px); }
      .coic-cta-inner { max-width: 640px; margin: 0 auto; }

      /* Contact */
      .coic-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; }
      .coic-contact-details { display: flex; flex-direction: column; gap: 14px; margin: 22px 0; }
      .coic-contact-details div { display: flex; align-items: center; gap: 12px; font-size: 0.96rem; color: #333; }
      .coic-social { display: flex; gap: 14px; color: ${COLORS.steel}; margin-bottom: 22px; }
      .coic-social--footer { color: #999; }
      .coic-map-placeholder { height: 160px; border-radius: 6px; background: repeating-linear-gradient(45deg, #eee 0 10px, #f5f5f5 10px 20px); display: flex; align-items: center; justify-content: center; color: #999; font-weight: 600; letter-spacing: 1px; }
      .coic-form { display: flex; flex-direction: column; gap: 16px; background: ${COLORS.offwhite}; padding: 30px; border-radius: 8px; border: 1px solid #eee; }
      .coic-form label { display: flex; flex-direction: column; gap: 6px; font-size: 0.88rem; font-weight: 600; color: #333; }
      .coic-form input, .coic-form textarea { font-family: 'Inter', sans-serif; padding: 12px 14px; border-radius: 4px; border: 1.5px solid #ddd; font-size: 0.94rem; resize: vertical; }
      .coic-form input:focus, .coic-form textarea:focus { outline: none; border-color: ${COLORS.steel}; }
      .coic-input-error { border-color: #d64545 !important; }
      .coic-error-text { color: #d64545; font-weight: 500; font-size: 0.8rem; }
      .coic-form-success { display: flex; align-items: center; gap: 6px; color: #2f8a4a; font-weight: 600; font-size: 0.9rem; }
      @media (max-width: 860px) { .coic-contact-grid { grid-template-columns: 1fr; } }

      /* Footer */
      .coic-footer { background: ${COLORS.black}; color: #ccc; padding: 64px 0 0; }
      .coic-footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 40px; padding-bottom: 40px; border-bottom: 1px solid #262626; }
      .coic-footer-grid h4 { color: ${COLORS.white}; font-size: 0.9rem; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 16px; }
      .coic-footer-grid a { display: block; color: #aaa; font-size: 0.9rem; margin-bottom: 10px; }
      .coic-footer-grid a:hover { color: ${COLORS.yellow}; }
      .coic-footer-tagline { font-size: 0.85rem; color: #888; margin-top: 12px; max-width: 220px; }
      .coic-footer-bottom { text-align: center; padding: 22px 24px; font-size: 0.8rem; color: #777; }
      @media (max-width: 760px) { .coic-footer-grid { grid-template-columns: 1fr 1fr; } }

      /* Back to top */
      .coic-back-top { position: fixed; bottom: 26px; right: 26px; width: 46px; height: 46px; border-radius: 50%; background: ${COLORS.yellow}; color: ${COLORS.black}; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 18px rgba(0,0,0,0.3); z-index: 90; transition: transform .2s ease; }
      .coic-back-top:hover { transform: translateY(-3px); }
    `}</style>
  );
}
