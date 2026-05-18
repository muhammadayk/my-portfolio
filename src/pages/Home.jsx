
    import { useEffect, useRef, useState } from "react";
    import { Link } from "react-router-dom";
    import "../index.css";

/* ── DATA ─────────────────────────────────────────────── */
const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Work", path: "/work" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "Contact", path: "/contact" },
];

const SERVICES = [
  { num: "#01", label: "Brand Design" },
  { num: "#02", label: "Social Media Design" },
  { num: "#03", label: "Content Strategy" },
  { num: "#04", label: "Creative Direction" },
];

const CLIENTS = ["El-Khaleel", "Aptos Room", "Aptos Hausa", "Mkay Labs"];

const SHOWCASE = [
  { title: "Streetwear Drop",     category: "Brand Identity",  year: "2024", tags: ["Branding","Print"],    emoji: "🧥" },
  { title: "SoundWave App",       category: "Product Design",  year: "2024", tags: ["UI/UX","Mobile"],      emoji: "🎧" },
  { title: "Glow Skincare",       category: "Packaging",       year: "2023", tags: ["Packaging","Identity"], emoji: "🧴" },
  { title: "NovaTech Dashboard",  category: "Web Design",      year: "2023", tags: ["SaaS","Dashboard"],    emoji: "💻" },
  { title: "Urban Feast",         category: "App Design",      year: "2023", tags: ["Mobile","Food"],       emoji: "🍜" },
  { title: "Flux Motion Studio",  category: "Motion & Brand",  year: "2022", tags: ["Motion","Branding"],   emoji: "🎬" },
];

const SHOWCASE_GRADS = [
  "linear-gradient(135deg,#0a2020 0%,#003030 100%)",
  "linear-gradient(135deg,#0d1a1a 0%,#004848 60%)",
  "linear-gradient(135deg,#1a0a00 0%,#3d1400 100%)",
  "linear-gradient(135deg,#001818 0%,#003048 100%)",
  "linear-gradient(135deg,#1a0800 0%,#5a1e00 100%)",
  "linear-gradient(135deg,#001a1a 0%,#006060 100%)",
];

const TESTIMONIALS = [
  {
    name:"khaleel YK", role:"CEO, El-Khaleel", avatar:"KY", stars:5,
    quote:"Working with this team completely transformed our product. The attention to detail was beyond anything we expected. Our user retention jumped 40% post-launch.",
  },
  {
    name:"Ukashat Bala", role:"Founder, Aptos-Hausa", avatar:"UK", stars:5,
    quote:"From concept to delivery, the process was seamless. They understood our vision immediately and translated it into a design language that truly resonates with our audience.",
  },
  {
    name:"Muhammad YK", role:"Brand Director, Mkay-Labs", avatar:"MK", stars:5,
    quote:"The packaging redesign helped us land two major retail chains within three months. Bold, fresh, and exactly what we needed to stand out on the shelf.",
  },
];

const SOCIALS = [
  { name:"Twitter / X",  handle:"@0x_mkay",         icon:"𝕏",  url:"https://x.com/0x_mkay" },
  { name:"Instagram",    handle:"@mooh_kherleel",  icon:"◎",  url:"https://instagram.com/mooh_kherleel" },
  { name:"Dribbble",     handle:"0xmkay",          icon:"⊕",  url:"https://dribbble.com/0xmkay" },
  { name:"LinkedIn",     handle:"in/muhammadyusufkhalil",       icon:"in", url:"https://linkedin.com/in/muhammadyusufkhalil" },
  { name:"Behance",      handle:"mkay",          icon:"Bē", url:"https://behance.net/muhammadyusuf218" },
];

/* ── AVATAR — replace this path with your own image URL ── */
const AVATAR_SRC = "/avatar.png";


/* ── FADE IN HOOK ── */
function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function FadeIn({ children, delay = 0 }) {
  const ref = useFadeIn();
  return (
    <div ref={ref} className="fade-in" style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ── COMPONENT ── */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [sending, setSending] = useState(false);

async function handleContactSubmit(e) {
  e.preventDefault();

  setSending(true);

  const formData = new FormData(e.target);

  try {
    const res = await fetch("https://formspree.io/f/mdabyoan", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (res.ok) {
      setFormSent(true);
      e.target.reset();

      setTimeout(() => {
        setContactOpen(false);
        setFormSent(false);
      }, 2000);
    }
  } catch (err) {
    console.error(err);
  }

  setSending(false);
}
  return (
    <>
      <div className="port-root">

{contactOpen && (
  <div
    className="contact-modal-overlay"
    onClick={() => setContactOpen(false)}
  >
    <div
      className="contact-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="contact-close"
        onClick={() => setContactOpen(false)}
      >
        ✕
      </button>

      {!formSent ? (
        <>
          <h3 className="contact-title">
            Let’s build something sharp
          </h3>

          <form
            className="contact-form"
            onSubmit={handleContactSubmit}
          >
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
            />

            <textarea
              name="message"
              rows="5"
              placeholder="Tell me about your project"
              required
            />

            <button
              type="submit"
              className="btn-primary"
            >
              {sending ? "Sending..." : "Send message →"}
            </button>
          </form>
        </>
      ) : (
        <div className="contact-success">
          <div className="contact-success-icon">
            ✓
          </div>

          <h3 className="contact-title">
            Message sent
          </h3>

          <p className="contact-sub">
            Thanks for reaching out. I’ll get back to you shortly.
          </p>
        </div>
      )}
    </div>
  </div>
)}

        {/* NAV */}
       <nav className="nav">
  <span className="nav-logo">MKAY</span>

<ul className="nav-links">
  {NAV_LINKS.map(link => (
    <li key={link.name}>
      <Link to={link.path}>{link.name}</Link>
    </li>
  ))}
</ul>

<button
  className="nav-cta"
  onClick={() => {
    setFormSent(false);
    setContactOpen(true);
  }}>
  Get in touch →
</button>

  <button
    className="nav-menu"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    {menuOpen ? "✕" : "☰"}
  </button>

  {menuOpen && (
    <div className="mobile-menu">
  <ul className="mobile-links">
  {NAV_LINKS.map(link => (
    <li key={link.name}>
      <Link
        to={link.path}
        onClick={() => setMenuOpen(false)}
      >
        {link.name}
      </Link>
    </li>
  ))}
</ul>

  <button
    className="mobile-menu-cta"
    onClick={() => {
      setMenuOpen(false);
      setFormSent(false);
      setContactOpen(true);
    }}
  >
    Get in touch →
  </button>
</div>
  )}
</nav>

        {/* HERO */}
        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-inner">

            {/* Left text */}
            <div>
              <FadeIn>
                <p className="hero-eyebrow">Hey, I'm a</p>
                <h1 className="hero-title">
                  Creative<br />
                  <span>Designer</span>
                </h1>
                <div className="hero-chips">
                  <span className="hero-chip">Brand Design</span>
                  <span className="hero-chip">Social Media Design</span>
                  <span className="hero-chip">Content Strategy</span>
                </div>
              </FadeIn>
            </div>

            {/* Right — avatar image */}
            <div className="hero-img-col">
              <FadeIn delay={160}>
                <div className="hero-img-frame">
                  <img src={AVATAR_SRC} alt="Profile avatar" />
                  <div className="hero-badge">
                    <p className="hero-badge-label">Projects Delivered</p>
                    <p className="hero-badge-val">120+</p>
                  </div>
                </div>

                <div className="hero-tagline-card">
                  <p className="hero-tagline">Your Brand Should Feel Premium.</p>
                  <p className="hero-sub">From logo to language, I build brands that connect and convert.</p>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Services bar */}
          <div className="hero-services">
            {SERVICES.map((s, i) => (
              <div key={i}>
                <p className="svc-num">{s.num}</p>
                <p className="svc-label">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CLIENTS */}
        <div className="clients-bar">
          <p className="clients-label">Trusted by</p>
          <div className="clients-list">
            {CLIENTS.map(c => <span className="client-item" key={c}>{c}</span>)}
          </div>
        </div>

        {/* ABOUT */}
        <section className="about">
          <FadeIn>
            <p className="section-tag">Behind the Designs</p>
            <h2 className="about-title">Shaping Experiences That Make Life Simpler</h2>
          </FadeIn>
          <FadeIn delay={140}>
            <p className="about-desc">
              I'm a product designer focused on building clean, intuitive interfaces
              that solve real-world problems. From startups to global brands, I bring
              ideas to life with purpose and precision.
            </p>
            <div className="about-cta-row">
              <button
                className="btn-primary"
                onClick={() => {
                setFormSent(false);
                setContactOpen(true);
                }}
               >
                Get in touch →
              </button>
            </div>
          </FadeIn>
        </section>

        {/* PORTFOLIO SHOWCASE */}
        <section className="showcase">
          <FadeIn>
            <div className="showcase-header">
              <div>
                <p className="section-tag">Portfolio</p>
                <h2 className="section-title">Recent Work</h2>
              </div>
              <button className="btn-outline">View all →</button>
            </div>
          </FadeIn>
          <div className="sc-grid">
            {SHOWCASE.map((p, i) => (
              <FadeIn key={i} delay={i * 70}>
                <div className="sc-card">
                  <div className="sc-visual" style={{ background: SHOWCASE_GRADS[i] }}>
                    <span className="sc-emoji">{p.emoji}</span>
                  </div>
                  <div className="sc-info">
                    <p className="sc-cat">{p.category}</p>
                    <p className="sc-title">{p.title}</p>
                    <div className="sc-meta">
                      <div className="sc-tags">
                        {p.tags.map(t => <span className="sc-tag" key={t}>{t}</span>)}
                      </div>
                      <span className="sc-year">{p.year}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="testimonials">
          <div className="testi-inner">
            <FadeIn>
              <div className="testi-header">
                <p className="section-tag">Kind Words</p>
                <h2 className="section-title">What Clients Say</h2>
              </div>
            </FadeIn>
            <div className="testi-grid">
              {TESTIMONIALS.map((t, i) => (
                <FadeIn key={i} delay={i * 90}>
                  <div className="testi-card">
                    <div className="testi-stars">
                      {Array.from({ length: t.stars }).map((_, j) => (
                        <span className="testi-star" key={j}>★</span>
                      ))}
                    </div>
                    <p className="testi-quote">"{t.quote}"</p>
                    <div className="testi-author">
                      <div className="testi-avatar">{t.avatar}</div>
                      <div>
                        <p className="testi-name">{t.name}</p>
                        <p className="testi-role">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* SOCIALS */}
        <section className="socials">
          <FadeIn>
            <div className="socials-header">
              <p className="section-tag">Connect</p>
              <h2 className="section-title">Find Me Online</h2>
            </div>
          </FadeIn>
          <FadeIn delay={90}>
            <div className="socials-list">
              {SOCIALS.map((s, i) => (
                <a
                   className="social-row"
                   href={s.url}
                   key={i}
                   target="_blank"
                   rel="noopener noreferrer"
                >
                  <div className="social-left">
                    <div className="social-icon">{s.icon}</div>
                    <div>
                      <p className="social-name">{s.name}</p>
                      <p className="social-handle">{s.handle}</p>
                    </div>
                  </div>
                  <span className="social-arrow">↗</span>
                </a>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <span className="footer-logo">MKAY ✦</span>
          <span className="footer-note">© 2026 MKAY. All rights reserved.</span>
          <div className="footer-links">
            {SOCIALS.map(s => (
              <a
              href={s.url}
              className="footer-link"
              key={s.name}
              target="_blank"
              rel="noopener noreferrer"
              >{s.name}</a>
            ))}
          </div>
        </footer>

      </div>
    </>
  );
}