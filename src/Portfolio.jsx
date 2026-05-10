import { useEffect, useRef, useState } from "react";

/* ── DATA ─────────────────────────────────────────────── */
const NAV_LINKS = ["Home", "About", "Work", "Testimonials", "Contact"];

const SERVICES = [
  { num: "#01", label: "Brand Design" },
  { num: "#02", label: "Social Media Design" },
  { num: "#03", label: "Content Strategy" },
  { num: "#04", label: "Creative Direction" },
];

const CLIENTS = ["Supa Blox", "Hype Blox", "Frame Blox", "Ultra Blox"];

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
    name:"Sarah Chen", role:"CEO, NovaTech", avatar:"SC", stars:5,
    quote:"Working with this team completely transformed our product. The attention to detail was beyond anything we expected. Our user retention jumped 40% post-launch.",
  },
  {
    name:"Marcus Reed", role:"Founder, SoundWave", avatar:"MR", stars:5,
    quote:"From concept to delivery, the process was seamless. They understood our vision immediately and translated it into a design language that truly resonates with our audience.",
  },
  {
    name:"Amara Osei", role:"Brand Director, Glow", avatar:"AO", stars:5,
    quote:"The packaging redesign helped us land two major retail chains within three months. Bold, fresh, and exactly what we needed to stand out on the shelf.",
  },
];

const SOCIALS = [
  { name:"Twitter / X",  handle:"@mkay",         icon:"𝕏",  url:"#" },
  { name:"Instagram",    handle:"@mkay.design",  icon:"◎",  url:"#" },
  { name:"Dribbble",     handle:"mkay",          icon:"⊕",  url:"#" },
  { name:"LinkedIn",     handle:"in/mkay",       icon:"in", url:"#" },
  { name:"Behance",      handle:"mkay",          icon:"Bē", url:"#" },
];

/* ── AVATAR — replace this path with your own image URL ── */
const AVATAR_SRC = "/avatar.png";

/* ── STYLES ───────────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root{
  /* palette extracted from avatar */
  --teal-dark:   #001a1a;
  --teal-mid:    #004848;
  --teal-bright: #00a8a8;
  --teal-light:  #00c8c8;
  --orange:      #f07830;
  --orange-dark: #d84818;
  --orange-deep: #a81818;
  --off-white:   #c0d8d8;
  --navy:        #001830;

  --bg:    #010f0f;
  --bg-2:  #071414;
  --bg-3:  #0d1e1e;
  --border: rgba(0,168,168,0.12);
  --muted: rgba(192,216,216,0.45);
  --sub:   rgba(192,216,216,0.72);
}

body{
  background:var(--bg);
  color:var(--off-white);
  font-family:'Inter',sans-serif;
  font-weight:400;
  overflow-x:hidden;
  -webkit-font-smoothing:antialiased;
}

.port-root{min-height:100vh;background:var(--bg)}

/* ── NAV ── */
.nav{
  position:fixed;top:0;left:0;right:0;z-index:100;
  display:flex;align-items:center;justify-content:space-between;
  padding:1rem 4%;
  background:rgba(1,15,15,0.88);
  backdrop-filter:blur(18px);
  border-bottom:1px solid var(--border);
}
.nav-logo{
  font-size:1.05rem;font-weight:700;letter-spacing:-0.02em;
  color:#fff;
}
.nav-links{display:flex;gap:2rem;list-style:none}
.nav-links a{
  color:var(--muted);text-decoration:none;
  font-size:0.875rem;font-weight:400;transition:color .2s;
}
.nav-links a:hover{color:var(--teal-light)}
.nav-cta{
  display:flex;align-items:center;gap:.4rem;
  background:var(--orange);color:#fff;border:none;
  padding:.5rem 1.15rem;border-radius:99px;
  font-family:'Inter',sans-serif;font-size:.85rem;font-weight:500;
  cursor:pointer;transition:background .2s,transform .15s;
}
.nav-cta:hover{background:var(--orange-dark);transform:scale(1.03)}

.nav-menu{
  display:none;
  background:none;
  border:none;
  color:#fff;
  font-size:1.4rem;
  cursor:pointer;
}

.nav{
  position:fixed;
}

.nav-menu{
  display:none;
  background:none;
  border:none;
  color:#fff;
  font-size:1.4rem;
  cursor:pointer;
}

.mobile-menu{
  position:absolute;
  top:100%;
  left:0;
  right:0;
  background:rgba(1,15,15,.97);
  backdrop-filter:blur(18px);
  border-bottom:1px solid var(--border);
  padding:1rem 5% 1.25rem;
}

.mobile-links{
  list-style:none;
  display:flex;
  flex-direction:column;
  gap:1rem;
  margin-bottom:1rem;
}

.mobile-links a{
  color:var(--off-white);
  text-decoration:none;
  font-size:.95rem;
}

.mobile-cta{
  display:flex;
  width:100%;
  justify-content:center;
}
  
/* ── HERO ── */
.hero{
  min-height:100vh;
  display:grid;grid-template-rows:1fr auto;
  padding-top:4.5rem;
  position:relative;overflow:hidden;
  border-radius:0 0 24px 24px;
}
.hero-bg{
  position:absolute;inset:0;z-index:0;
  background:
    radial-gradient(ellipse 55% 90% at 62% 50%, #006060 0%, #003030 35%, #010f0f 68%),
    radial-gradient(ellipse 30% 40% at 30% 60%, #003048 0%, transparent 70%);
}

.hero-inner{
  position:relative;z-index:1;
  display:grid;
  grid-template-columns:1fr 1fr;
  align-items:center;
  gap:2rem;
  padding:4rem 4% 2rem;
}

/* left */
.hero-eyebrow{
  font-size:.9rem;font-weight:400;
  color:rgba(192,216,216,.7);
  margin-bottom:.5rem;letter-spacing:.01em;
  text-align: left;
  padding-left: 60px;
}
.hero-title{
  font-size:clamp(2.6rem,7vw,5.5rem);
  font-weight:700;
  line-height:.96;
  letter-spacing:-.045em;
  color:#fff;
  margin-bottom:1.5rem;
  text-align:left;
}
.hero-title span{color:var(--orange)}
.hero-chips{display:flex;gap:.5rem;flex-wrap:wrap}
.hero-chip{
  font-size:.72rem;font-weight:500;
  background:rgba(0,168,168,.1);
  border:1px solid rgba(0,168,168,.25);
  color:var(--teal-light);
  padding:.3rem .75rem;border-radius:99px;
  letter-spacing:.04em;text-transform:uppercase;
}

/* right — image col */
.hero-img-col{
  display:flex;
  flex-direction:column;
  align-items:center;
  position:relative;
}

.hero-img-frame{
  width:min(340px,90%); 
  aspect-ratio:3/4; 
  border-radius:22px; overflow:hidden; 
  position:relative; 
  border:1px solid rgba(0,168,168,.2); 
  box-shadow:0 0 80px rgba(0,168,168,.15), 0 40px 80px rgba(0,0,0,.6);
}

.hero-img-frame img{
  width:100%;
  height:100%;
  object-fit:contain;
  object-position:top center;
  display:block;
}

/* gradient fade at bottom to blend into page */
.hero-img-frame::after{
  content:'';
  position:absolute;
  inset:0;
  background:linear-gradient(to bottom, transparent 70%, var(--bg) 100%);
  pointer-events:none;
}

/* floating badge */
.hero-badge{
  position:absolute;bottom:20px;left:20px;z-index:2;
  background:rgba(1,15,15,.75);
  backdrop-filter:blur(10px);
  border:1px solid rgba(0,168,168,.25);
  border-radius:12px;
  padding:.55rem .9rem;
}
.hero-badge-label{font-size:.65rem;color:var(--muted);font-weight:400;margin-bottom:2px}
.hero-badge-val{font-size:1.1rem;font-weight:700;color:#fff;letter-spacing:-.02em}

/* floating tagline card — top right of image */
.hero-tagline-card{
  position:absolute;
  top:10px;right:50px;
  max-width:185px;
  background:rgba(1,15,15,.7);
  backdrop-filter:blur(10px);
  border:1px solid var(--border);
  border-radius:14px;
  padding:.9rem 1rem;
  z-index:2;
}
.hero-tagline{font-size:.95rem;font-weight:600;color:#fff;line-height:1.35;margin-bottom:.45rem}
.hero-sub{font-size:.75rem;color:var(--sub);line-height:1.65}

/* services bar */
.hero-services{
  position:relative;z-index:1;
  display:flex;gap:2rem;flex-wrap:wrap;
  padding:1.3rem 4%;
  border-top:1px solid rgba(0,168,168,.1);
  background:rgba(0,0,0,.2);
  backdrop-filter:blur(6px);
}
.svc-num{font-size:.65rem;color:var(--orange);font-weight:600;letter-spacing:.06em;margin-bottom:.2rem}
.svc-label{font-size:.8rem;color:var(--sub);font-weight:400}

/* ── CLIENTS ── */
.clients-bar{
  background:var(--bg-2);
  border-bottom:1px solid var(--border);
  padding:1.3rem 4%;
  display:flex;align-items:center;gap:3rem;
  overflow:hidden;
}
.clients-label{
  font-size:.65rem;color:var(--muted);font-weight:500;
  text-transform:uppercase;letter-spacing:.1em;
  white-space:nowrap;flex-shrink:0;max-width:78px;line-height:1.55;
}
.clients-list{display:flex;gap:2.5rem;align-items:center;flex:1;flex-wrap:wrap}
.client-item{
  font-size:.88rem;font-weight:600;
  color:rgba(192,216,216,.3);letter-spacing:-.01em;
  white-space:nowrap;transition:color .2s;cursor:default;
}
.client-item:hover{color:var(--teal-light)}

/* ── ABOUT ── */
.about{
  padding:6rem 4%;
  display:grid;grid-template-columns:1fr 1fr;
  gap:5rem;align-items:center;
  max-width:1200px;margin:0 auto;
}

.about > div:last-child{
  padding-top: 50px;
}

.section-tag{
  font-size:.68rem;color:var(--orange);font-weight:600;
  letter-spacing:.12em;text-transform:uppercase;margin-bottom:.9rem;
}
.about-title{
  font-size:clamp(1.7rem,3vw,2.5rem);font-weight:600;
  line-height:1.12;letter-spacing:-.03em;color:#fff;
}
.about-desc{
  font-size:1rem;font-weight:400;
  color:var(--sub);line-height:1.72;margin-bottom:2rem;
}
.about-cta-row{
  display:flex;
  justify-content:center;
  margin-top:1.4rem;
}
.about-cta-label{font-size:.75rem;color:var(--muted);line-height:1.5;max-width:120px}

.btn-primary{
  display:inline-flex;align-items:center;gap:.4rem;
  background:var(--orange);color:#fff;border:none;
  padding:.6rem 1.2rem;border-radius:99px;
  font-family:'Inter',sans-serif;font-size:.85rem;font-weight:500;
  cursor:pointer;transition:background .2s,transform .15s;white-space:nowrap;
}
.btn-primary:hover{background:var(--orange-dark);transform:scale(1.04)}

.btn-outline{
  display:inline-flex;align-items:center;gap:.4rem;
  background:transparent;
  color:var(--off-white);
  border:1px solid rgba(192,216,216,.18);
  padding:.6rem 1.2rem;border-radius:99px;
  font-family:'Inter',sans-serif;font-size:.85rem;font-weight:500;
  cursor:pointer;transition:border-color .2s,background .2s;
}
.btn-outline:hover{border-color:rgba(0,200,200,.4);background:rgba(0,168,168,.06)}

/* ── SHOWCASE ── */
.showcase{padding:2rem 4% 6rem;max-width:1200px;margin:0 auto}
.showcase-header{
  display:flex;align-items:flex-end;justify-content:space-between;
  margin-bottom:2.25rem;
}
.section-title{
  font-size:clamp(1.6rem,3vw,2.3rem);font-weight:600;
  letter-spacing:-.04em;color:#fff;margin-top:.45rem;
}
.sc-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:1rem;
}
.sc-card{
  border-radius:16px;overflow:hidden;
  background:var(--bg-3);
  border:1px solid var(--border);
  cursor:pointer;
  transition:transform .3s,border-color .3s,box-shadow .3s;
}
.sc-card:hover{
  transform:translateY(-5px);
  border-color:rgba(0,168,168,.35);
  box-shadow:0 12px 40px rgba(0,168,168,.08);
}
.sc-visual{
  height:190px;display:flex;align-items:center;justify-content:center;
  font-size:3.5rem;position:relative;overflow:hidden;
}
.sc-visual::after{
  content:'';position:absolute;inset:0;
  background:linear-gradient(to bottom,transparent 50%,rgba(0,0,0,.5));
}
.sc-emoji{position:relative;z-index:1}
.sc-info{padding:.9rem 1.1rem}
.sc-cat{
  font-size:.65rem;color:var(--orange);font-weight:600;
  letter-spacing:.1em;text-transform:uppercase;margin-bottom:.25rem;
}
.sc-title{
  font-size:.95rem;font-weight:600;color:#fff;
  letter-spacing:-.02em;margin-bottom:.6rem;
}
.sc-meta{display:flex;align-items:center;gap:.4rem}
.sc-tags{display:flex;gap:.3rem;flex-wrap:wrap}
.sc-tag{
  font-size:.62rem;font-weight:500;
  background:rgba(0,168,168,.07);
  border:1px solid rgba(0,168,168,.15);
  color:rgba(192,216,216,.55);
  padding:.18rem .48rem;border-radius:99px;
}
.sc-year{font-size:.62rem;color:var(--muted);margin-left:auto;flex-shrink:0}

/* ── TESTIMONIALS ── */
.testimonials{
  background:var(--bg-2);
  border-top:1px solid var(--border);
  border-bottom:1px solid var(--border);
  padding:6rem 4%;
}
.testi-inner{max-width:1200px;margin:0 auto}
.testi-header{margin-bottom:2.5rem}
.testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.1rem}
.testi-card{
  background:var(--bg-3);border:1px solid var(--border);
  border-radius:18px;padding:1.6rem;
  display:flex;flex-direction:column;gap:1.1rem;
  transition:border-color .25s,box-shadow .25s;
}
.testi-card:hover{
  border-color:rgba(0,168,168,.3);
  box-shadow:0 8px 32px rgba(0,168,168,.06);
}
.testi-stars{display:flex;gap:3px}
.testi-star{color:var(--orange);font-size:.8rem}
.testi-quote{
  font-size:.875rem;font-weight:400;
  color:rgba(192,216,216,.7);
  line-height:1.78;flex:1;font-style:italic;
}
.testi-author{display:flex;align-items:center;gap:.8rem}
.testi-avatar{
  width:38px;height:38px;border-radius:50%;
  background:var(--orange);
  display:flex;align-items:center;justify-content:center;
  font-size:.68rem;font-weight:700;color:#fff;flex-shrink:0;
}
.testi-name{font-size:.85rem;font-weight:600;color:#fff;margin-bottom:.1rem}
.testi-role{font-size:.72rem;color:var(--muted)}

/* ── SOCIALS ── */
.socials{padding:6rem 4%;max-width:1200px;margin:0 auto}
.socials-header{margin-bottom:2.5rem}
.socials-list{display:flex;flex-direction:column;gap:.65rem}
.social-row{
  display:flex;align-items:center;justify-content:space-between;
  padding:1.1rem 1.4rem;
  background:var(--bg-3);border:1px solid var(--border);
  border-radius:14px;
  text-decoration:none;color:inherit;
  transition:border-color .2s,background .2s,transform .2s;
}
.social-row:hover{
  border-color:rgba(0,168,168,.3);
  background:rgba(0,168,168,.04);
  transform:translateX(4px);
}
.social-left{display:flex;align-items:center;gap:.9rem}
.social-icon{
  width:42px;height:42px;border-radius:11px;
  background:rgba(0,168,168,.07);
  border:1px solid rgba(0,168,168,.15);
  display:flex;align-items:center;justify-content:center;
  font-size:.95rem;font-weight:700;
  color:rgba(192,216,216,.65);flex-shrink:0;
}
.social-name{font-size:.9rem;font-weight:500;color:#fff;margin-bottom:.1rem}
.social-handle{font-size:.75rem;color:var(--muted)}
.social-arrow{font-size:1rem;color:var(--muted);transition:color .2s}
.social-row:hover .social-arrow{color:var(--teal-light)}

/* ── FOOTER ── */
.footer{
  background:#000d0d;
  border-top:1px solid var(--border);
  padding:2.25rem 4%;
  display:flex;align-items:center;justify-content:space-between;
  flex-wrap:wrap;gap:1rem;
}
.footer-logo{font-size:.9rem;font-weight:600;letter-spacing:-.02em;color:rgba(192,216,216,.2)}
.footer-note{font-size:.72rem;color:rgba(192,216,216,.18)}
.footer-links{display:flex;gap:1.25rem}
.footer-link{
  font-size:.72rem;font-weight:500;
  color:rgba(192,216,216,.25);text-decoration:none;transition:color .2s;
}
.footer-link:hover{color:var(--teal-light)}

/* ── FADE IN ── */
.fade-in{
  opacity:0;transform:translateY(24px);
  transition:opacity .65s ease,transform .65s ease;
}
.fade-in.visible{opacity:1;transform:translateY(0)}

/* ── RESPONSIVE ── */
@media(max-width:960px){
  .nav{padding:1rem 5%}
  .nav-links{
  display:none;}
  .nav > .nav-cta{
  display:none;}
  .nav-menu{
  display:block;}
  .hero-inner{grid-template-columns:1fr;padding:3rem 5% 1.5rem;gap:2.5rem}
  .hero-img-col{order:-1}
  .hero-img-frame{width:min(280px,85%)}
  .hero-tagline-card{
  display:block;
  top:14px;
  right:12px;
  transform:none;
  max-width:145px;
  padding:.65rem .8rem;
  }
  .hero-services{padding:1.2rem 5%;gap:1.5rem}
  .clients-bar{padding:1.2rem 5%;gap:2rem;flex-wrap:wrap}
  .about{grid-template-columns:1fr;padding:4rem 5%;gap:2.5rem}
  .showcase{padding:2rem 5% 4rem}
  .sc-grid{grid-template-columns:repeat(2,1fr)}
  .testimonials{padding:4rem 5%}
  .testi-grid{grid-template-columns:1fr}
  .socials{padding:4rem 5%}
  .footer{padding:2rem 5%;flex-direction:column;align-items:flex-start}
}

@media(max-width:600px){
  .hero-title{font-size:2.6rem}
  .sc-grid{grid-template-columns:1fr}
  @media(max-width:600px){
  .about-cta-row{
    flex-direction:column;
    align-items:center;
    justify-content:center;}
  .clients-list{gap:1.5rem}
  .footer-links{flex-wrap:wrap;gap:.75rem}
  .hero-tagline-card{
  max-width:150px;
  font-size:.8rem;
}
}
`;

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
export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <style>{css}</style>
      <div className="port-root">

        {/* NAV */}
       <nav className="nav">
  <span className="nav-logo">MKAY</span>

  <ul className="nav-links">
    {NAV_LINKS.map(l => (
      <li key={l}><a href="#">{l}</a></li>
    ))}
  </ul>

  <button className="nav-cta">Get in touch →</button>

  <button
    className="nav-menu"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    {menuOpen ? "✕" : "☰"}
  </button>

  {menuOpen && (
    <div className="mobile-menu">
      <ul className="mobile-links">
        {NAV_LINKS.map(l => (
          <li key={l}>
            <a href="#" onClick={() => setMenuOpen(false)}>{l}</a>
          </li>
        ))}
      </ul>

      <button className="nav-cta mobile-cta">
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
              <button className="btn-primary">Get in touch →</button>
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
                <a className="social-row" href={s.url} key={i}>
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
          <span className="footer-note">© 2025 MKAY. All rights reserved.</span>
          <div className="footer-links">
            {SOCIALS.map(s => (
              <a href={s.url} className="footer-link" key={s.name}>{s.name}</a>
            ))}
          </div>
        </footer>

      </div>
    </>
  );
}
