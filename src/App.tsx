import {
  ArrowLeft,
  ArrowRight,
  ArrowsOutSimple,
  InstagramLogo,
  List,
  Pause,
  Play,
  Phone,
  SpeakerSimpleHigh,
  SpeakerSimpleSlash,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react";
import { useEffect, useMemo, useRef, useState } from "react";

type Language = "en" | "fa";
type View = "studio" | "personal" | "about" | "services";
type Phase = "intro" | "transition" | "portfolio";
type Category = "all" | "acting" | "theatre" | "directing" | "visual" | "ai" | "photography" | "aerial";
type ProjectCategory = Exclude<Category, "all"> | "production" | "video" | "creative";
type Project = { id: string; number: string; category: ProjectCategory; media: string; poster?: string; kind?: "video"; position?: string };
const media = (file: string) => `${import.meta.env.BASE_URL}media/${file}`;

const copy = {
  en: {
    nav: { studio: "Studio", personal: "Personal Work", about: "About", services: "Services", contact: "Contact" },
    intro: {
      mark: "THEHYNO Studio",
      byline: "Creative Studio by Poriya Heydarinia",
      blurb: "A visual sample spanning moving image, photography, styling, direction and production.",
      who: "Poriya Heydarinia",
      personal: "Acting, theatre, directing and personal visual work remain a separate practice.",
      what: "What we do",
      whatBody: "Shape cinematic images and visual systems for brands, artists and culture.",
      disciplines: "Disciplines",
      disciplineList: "Creative direction · Production · Photography · Video · Styling · Posters",
      headlineA: "THEHYNO",
      headlineB: "CREATIVE STUDIO",
      headlineC: "PORIYA HEYDARINIA",
      enter: "Enter the work",
      skip: "Skip intro",
      footer: "Visual sample · selected material · bilingual edition",
      soundOn: "Enable sound",
      soundOff: "Mute sound",
    },
    portfolio: {
      studioEyebrow: "THEHYNO Studio / Selected work",
      personalEyebrow: "Poriya Heydarinia / Personal work",
      studioTitle: "Commercial image-making, shaped as a complete visual world.",
      personalTitle: "Performance, direction and experiments from a personal point of view.",
      selection: "Selection", open: "View work", close: "Close project", back: "Back to intro", browse: "Browse selection",
      all: "All", acting: "Acting", theatre: "Theatre", directing: "Directing", visual: "Personal Visual Work",
      ai: "AI-assisted", photography: "Photography", aerial: "Aerial", production: "Production", video: "Video",
      creative: "Creative Direction", next: "Next", previous: "Previous",
    },
    about: {
      eyebrow: "About / Contact",
      title: "Two practices. One evolving visual language.",
      studio: "THEHYNO Studio",
      studioBody: "The studio-facing portfolio brings together commercial image-making, production, photography, video, styling and creative direction.",
      poriya: "Poriya Heydarinia",
      poriyaBody: "The personal portfolio keeps acting, theatre and directing distinct, alongside experimental, AI-assisted, photographic and aerial work.",
      note: "This prototype uses a curated selection. Final project details, credits and contact information will be added for the complete release.",
      contact: "Contact details to be confirmed",
    },
    services: {
      eyebrow: "Services / Collaboration",
      title: "Make attention worth staying for.",
      intro: "From the first idea to a social-ready visual system, THEHYNO can shape the concept, image, production and rollout.",
      items: ["Creative direction & ideation", "Photography & filmmaking", "Production & styling", "AI Art & visual experiments", "Social media marketing", "Consulting & content systems"],
      cta: "Start a conversation",
      call: "Call directly",
      whatsapp: "Message on WhatsApp",
      instagram: "Open Instagram",
      note: "The Telegram link can be connected as soon as its username is confirmed.",
    },
  },
  fa: {
    nav: { studio: "استودیو", personal: "کارهای شخصی", about: "درباره", services: "خدمات", contact: "ارتباط" },
    intro: {
      mark: "استودیو دهینو",
      byline: "استودیوی خلاق پوریا حیدرینیا",
      blurb: "نمونه‌ای تصویری از تصویر متحرک، عکاسی، استایلینگ، کارگردانی خلاق و تولید.",
      who: "پوریا حیدرینیا",
      personal: "بازیگری، تئاتر، کارگردانی و تجربه‌های شخصی تصویری به‌عنوان مسیری مستقل ارائه می‌شوند.",
      what: "حوزه فعالیت",
      whatBody: "ساخت تصویرهای سینمایی و جهان‌های بصری برای برندها، هنرمندان و پروژه‌های فرهنگی.",
      disciplines: "تخصص‌ها",
      disciplineList: "کارگردانی خلاق · تولید · عکاسی · ویدیو · استایلینگ · پوستر",
      headlineA: "دهینو",
      headlineB: "استودیوی خلاق",
      headlineC: "پوریا حیدرینیا",
      enter: "ورود به آثار",
      skip: "رد کردن مقدمه",
      footer: "نمونه تصویری · گزیده آثار · نسخه دوزبانه",
      soundOn: "فعال‌کردن صدا",
      soundOff: "قطع صدا",
    },
    portfolio: {
      studioEyebrow: "استودیو دهینو / گزیده آثار",
      personalEyebrow: "پوریا حیدرینیا / کارهای شخصی",
      studioTitle: "تصویرسازی تجاری، در قالب یک جهان بصری کامل.",
      personalTitle: "اجرا، کارگردانی و تجربه‌هایی از یک نگاه شخصی.",
      selection: "گزیده", open: "مشاهده اثر", close: "بستن اثر", back: "بازگشت به مقدمه", browse: "مرور گزیده‌ها",
      all: "همه", acting: "بازیگری", theatre: "تئاتر", directing: "کارگردانی", visual: "کار تصویری شخصی",
      ai: "با کمک هوش مصنوعی", photography: "عکاسی", aerial: "تصویربرداری هوایی", production: "تولید",
      video: "ویدیو", creative: "کارگردانی خلاق", next: "بعدی", previous: "قبلی",
    },
    about: {
      eyebrow: "درباره / ارتباط",
      title: "دو مسیر؛ یک زبان بصری در حال شکل‌گیری.",
      studio: "استودیو دهینو",
      studioBody: "پورتفولیوی استودیو، تصویرسازی تجاری، تولید، عکاسی، ویدیو، استایلینگ و کارگردانی خلاق را کنار هم قرار می‌دهد.",
      poriya: "پوریا حیدرینیا",
      poriyaBody: "در پورتفولیوی شخصی، بازیگری، تئاتر و کارگردانی از یکدیگر جدا می‌مانند و تجربه‌های تصویری، هوش مصنوعی، عکاسی و آثار هوایی نیز مسیر خود را دارند.",
      note: "این نمونه از مجموعه‌ای محدود و ویرایش‌شده استفاده می‌کند. جزئیات آثار، عوامل و اطلاعات ارتباطی در نسخه کامل افزوده می‌شوند.",
      contact: "اطلاعات ارتباطی در نسخه نهایی تکمیل می‌شود",
    },
    services: {
      eyebrow: "خدمات / همکاری",
      title: "توجه را به ماندن تبدیل کنیم.",
      intro: "از ایده‌ی اولیه تا یک سیستم تصویری آماده‌ی انتشار در سوشال‌مدیا؛ دهینو می‌تواند کانسپت، تصویر، تولید و مسیر انتشار را شکل دهد.",
      items: ["کارگردانی خلاق و ایده‌پردازی", "عکاسی و فیلم‌سازی", "تولید و استایلینگ", "AI Art و تجربه‌های تصویری", "مارکتینگ سوشال‌مدیا", "مشاوره و سیستم‌سازی محتوا"],
      cta: "شروع گفتگو",
      call: "تماس مستقیم",
      whatsapp: "پیام در واتساپ",
      instagram: "مشاهده اینستاگرام",
      note: "لینک تلگرام پس از تأیید یوزرنیم به این بخش متصل می‌شود.",
    },
  },
} as const;

const contact = {
  display: "0912 005 9110",
  phone: "+989120059110",
  whatsapp: "https://wa.me/989120059110",
  instagram: "https://www.instagram.com/thehyno/",
};

const studioProjects: Project[] = [
  { id: "studio-01", number: "01", category: "production", media: media("studio-control.webp") },
  { id: "studio-02", number: "02", category: "video", media: media("studio-live.webp") },
  { id: "studio-03", number: "03", category: "creative", media: media("studio-camera.webp") },
  { id: "studio-04", number: "04", category: "photography", media: media("studio-portrait.webp") },
];

const personalProjects: Project[] = [
  { id: "personal-01", number: "01", category: "acting", media: media("poriya-close.webp"), position: "center 35%" },
  { id: "personal-02", number: "02", category: "theatre", media: media("poriya-stage.webp"), position: "center 52%" },
  { id: "personal-03", number: "03", category: "directing", media: media("poriya-formal.webp"), position: "center 35%" },
  { id: "personal-04", number: "04", category: "visual", media: media("poriya-motion-b.webp"), position: "center" },
  { id: "personal-05", number: "05", category: "ai", media: media("poriya-motion-a.webp"), position: "center" },
  { id: "personal-06", number: "06", category: "photography", media: media("poriya-snake.webp"), position: "center" },
  { id: "personal-07", number: "07", category: "aerial", media: media("aerial.mp4"), poster: media("aerial-poster.webp"), kind: "video" },
];

const categories: Category[] = ["all", "acting", "theatre", "directing", "visual", "ai", "photography", "aerial"];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  return reduced;
}

function BackgroundMedia({ project, className = "" }: { project: Project; className?: string }) {
  if (project.kind === "video") {
    return <video className={`background-media ${className}`} src={project.media} poster={project.poster} autoPlay muted loop playsInline preload="metadata" />;
  }
  return <img className={`background-media ${className}`} src={project.media} alt="" style={{ objectPosition: project.position }} />;
}

export function App() {
  const appRef = useRef<HTMLElement>(null);
  const [language, setLanguage] = useState<Language>("en");
  const [phase, setPhase] = useState<Phase>("intro");
  const [view, setView] = useState<View>("studio");
  const [category, setCategory] = useState<Category>("all");
  const [selectedId, setSelectedId] = useState(studioProjects[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const [introPlaying, setIntroPlaying] = useState(true);
  const openingRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const t = copy[language];
  const projects = view === "studio" ? studioProjects : personalProjects;
  const visibleProjects = useMemo(
    () => (view === "personal" && category !== "all" ? personalProjects.filter((project) => project.category === category) : projects),
    [view, category, projects],
  );
  const selected = visibleProjects.find((project) => project.id === selectedId) ?? visibleProjects[0] ?? projects[0];

  useEffect(() => {
    if (!visibleProjects.some((project) => project.id === selectedId) && visibleProjects[0]) setSelectedId(visibleProjects[0].id);
  }, [visibleProjects, selectedId]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  }, [language]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); setProjectOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const enter = (skip = false) => {
    if (skip || reducedMotion) { setPhase("portfolio"); return; }
    setPhase("transition");
    window.setTimeout(() => setPhase("portfolio"), 2300);
  };

  const goToView = (next: View) => {
    setView(next);
    setCategory("all");
    setSelectedId(next === "studio" ? studioProjects[0].id : personalProjects[0].id);
    setProjectOpen(false);
    setMenuOpen(false);
    if (phase !== "portfolio") enter(true);
  };

  const togglePlayback = () => {
    const video = openingRef.current;
    if (!video) return;
    if (video.paused) { void video.play(); setIntroPlaying(true); }
    else { video.pause(); setIntroPlaying(false); }
  };

  const stepProject = (direction: number) => {
    const index = visibleProjects.findIndex((project) => project.id === selected.id);
    const next = visibleProjects[(index + direction + visibleProjects.length) % visibleProjects.length];
    if (next) setSelectedId(next.id);
  };

  const categoryLabel = (value: ProjectCategory) => String(t.portfolio[value]);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reducedMotion) return;
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;
    event.currentTarget.style.setProperty("--pointer-x", `${x * 14}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${y * 10}px`);
  };

  return (
    <main ref={appRef} className={`app phase-${phase}`} onPointerMove={handlePointerMove}>
      <section className="intro-screen" aria-hidden={phase !== "intro"}>
        <video ref={openingRef} className="intro-video" src={media("mindworld.mp4")} poster={media("mindworld-poster.webp")}
          autoPlay={!reducedMotion} muted={muted} loop playsInline preload="metadata"
          onPlay={() => setIntroPlaying(true)} onPause={() => setIntroPlaying(false)} />
        <div className="intro-tint" />
        <div className="intro-frame">
          <Header language={language} setLanguage={setLanguage} menuOpen={menuOpen} setMenuOpen={setMenuOpen} goToView={goToView} t={t} />
          <div className="meta-grid">
            <div className="meta-block brand-meta"><p className="meta-kicker">THEHYNO</p><h2>{t.intro.mark}</h2><p>{t.intro.blurb}</p><a className="intro-phone" href={`tel:${contact.phone}`}>{contact.display}</a></div>
            <div className="meta-block"><p className="meta-kicker">PORIYA</p><h2>{t.intro.who}</h2><p>{t.intro.personal}</p></div>
            <div className="meta-block"><p className="meta-label">{t.intro.what}</p><p>{t.intro.whatBody}</p></div>
            <div className="meta-block"><p className="meta-label">{t.intro.disciplines}</p><p>{t.intro.disciplineList}</p></div>
          </div>
          <div className="intro-bottom">
            <div><p className="intro-index">01 / 03</p><h1 className="intro-headline"><span>{t.intro.headlineA}</span><span className="display-serif">{t.intro.headlineB}</span><span>{t.intro.headlineC}</span></h1></div>
            <div className="intro-actions">
              <button className="primary-action" onClick={() => enter(false)}><span>{t.intro.enter}</span>{language === "fa" ? <ArrowLeft size={17} /> : <ArrowRight size={17} />}</button>
              <button className="text-action" onClick={() => enter(true)}>{t.intro.skip}</button>
            </div>
            <div className="intro-footer">
              <span>{t.intro.byline}</span><span>{t.intro.footer}</span>
              <div className="media-controls">
                <button onClick={togglePlayback} aria-label={introPlaying ? "Pause" : "Play"}>{introPlaying ? <Pause size={15} weight="fill" /> : <Play size={15} weight="fill" />}</button>
                <button onClick={() => setMuted((value) => !value)} aria-label={muted ? t.intro.soundOn : t.intro.soundOff}>{muted ? <SpeakerSimpleSlash size={16} /> : <SpeakerSimpleHigh size={16} />}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mind-transition" aria-hidden={phase !== "transition"}>
        <video src={media("opening.mp4")} poster={media("opening-poster.webp")} autoPlay muted loop playsInline preload="metadata" />
        <div className="transition-shade" />
        <div className="transition-copy"><span>THEHYNO / PORIYA</span><p>{language === "fa" ? "ورود به جهان تصویر" : "Entering the image world"}</p></div>
      </section>

      <section className="portfolio-screen" aria-hidden={phase !== "portfolio"}>
        {(view === "studio" || view === "personal") && selected && <BackgroundMedia key={selected.id} project={selected} />}
        <div className="portfolio-tint" />
        <div className="portfolio-frame">
          <Header language={language} setLanguage={setLanguage} menuOpen={menuOpen} setMenuOpen={setMenuOpen} goToView={goToView} t={t} />
          {view === "about" ? <AboutView t={t} language={language} goToView={goToView} /> : view === "services" ? <ServicesView t={t} /> : (
            <div className="portfolio-content">
              <div className="portfolio-heading"><p className="eyebrow">{view === "studio" ? t.portfolio.studioEyebrow : t.portfolio.personalEyebrow}</p><h1>{view === "studio" ? t.portfolio.studioTitle : t.portfolio.personalTitle}</h1></div>
              {view === "personal" && <div className="category-row" aria-label="Personal work categories">{categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)} aria-pressed={category === item}>{t.portfolio[item]}</button>)}</div>}
              <div className="selected-meta"><div><span>{t.portfolio.selection} {selected.number}</span><h2>{categoryLabel(selected.category)}</h2></div><button className="open-project" onClick={() => setProjectOpen(true)}><ArrowsOutSimple size={17} />{t.portfolio.open}</button></div>
              <div className="project-rail-wrap"><span className="rail-label">{t.portfolio.browse}</span><div className="project-rail">{visibleProjects.map((project) => (
                <button key={project.id} className={`project-thumb ${project.id === selected.id ? "active" : ""}`} onClick={() => setSelectedId(project.id)} aria-label={`${categoryLabel(project.category)} ${project.number}`}>
                  {project.kind === "video" ? <video src={project.media} poster={project.poster} muted loop playsInline preload="metadata" /> : <img src={project.media} alt="" style={{ objectPosition: project.position }} />}<span>{project.number}</span>
                </button>
              ))}</div></div>
              <button className="back-intro" onClick={() => setPhase("intro")}>{language === "fa" ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}{t.portfolio.back}</button>
            </div>
          )}
        </div>
      </section>

      <div className={`project-overlay ${projectOpen ? "open" : ""}`} aria-hidden={!projectOpen}>
        {selected && <BackgroundMedia key={`overlay-${selected.id}`} project={selected} className="overlay-media" />}
        <div className="overlay-tint" />
        <button className="overlay-close" onClick={() => setProjectOpen(false)} aria-label={t.portfolio.close}><X size={24} /></button>
        {selected && <div className="overlay-caption"><p>{view === "studio" ? "THEHYNO STUDIO" : "PORIYA HEYDARINIA"}</p><h2>{categoryLabel(selected.category)}</h2><span>{t.portfolio.selection} {selected.number}</span></div>}
        <div className="overlay-nav"><button onClick={() => stepProject(-1)}>{language === "fa" ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}{t.portfolio.previous}</button><button onClick={() => stepProject(1)}>{t.portfolio.next}{language === "fa" ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}</button></div>
      </div>
    </main>
  );
}

function Header({ language, setLanguage, menuOpen, setMenuOpen, goToView, t }: {
  language: Language; setLanguage: (value: Language) => void; menuOpen: boolean; setMenuOpen: (value: boolean) => void;
  goToView: (view: View) => void; t: typeof copy.en | typeof copy.fa;
}) {
  return <>
    <header className="site-header">
      <button className="wordmark" onClick={() => goToView("studio")} aria-label="THEHYNO Studio home"><strong>THEHYNO</strong><span>STUDIO</span></button>
      <nav className="desktop-nav" aria-label="Main navigation"><button onClick={() => goToView("studio")}>{t.nav.studio}</button><button onClick={() => goToView("personal")}>{t.nav.personal}</button><button onClick={() => goToView("about")}>{t.nav.about}</button><button onClick={() => goToView("services")}>{t.nav.services}</button><button onClick={() => goToView("services")}>{t.nav.contact}</button></nav>
      <div className="header-tools"><a className="instagram-link" href={contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram @thehyno"><InstagramLogo size={15} weight="bold" /><span>@thehyno</span></a><a className="phone-link" href={`tel:${contact.phone}`} aria-label={`${t.nav.contact} ${contact.display}`}><Phone size={15} weight="bold" /><span>{contact.display}</span></a><div className="language-switch" aria-label="Language"><button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button><span>/</span><button className={language === "fa" ? "active" : ""} onClick={() => setLanguage("fa")}>FA</button></div><button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><List size={24} /></button></div>
    </header>
    <div className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
      <div className="mobile-menu-head"><span>THEHYNO / STUDIO</span><button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={26} /></button></div>
      <nav>{(["studio", "personal", "about", "services"] as View[]).map((item, index) => <button key={item} style={{ transitionDelay: menuOpen ? `${100 + index * 70}ms` : "0ms" }} onClick={() => goToView(item)}><span>0{index + 1}</span>{t.nav[item]}</button>)}</nav>
      <p>Creative Studio by Poriya Heydarinia</p>
    </div>
  </>;
}

function ServicesView({ t }: { t: typeof copy.en | typeof copy.fa }) {
  const whatsappMessage = encodeURIComponent("Hello THEHYNO Studio — I’d like to talk about a collaboration.");
  return <div className="services-view">
    <div className="services-heading"><p className="eyebrow">{t.services.eyebrow}</p><h1>{t.services.title}</h1><p>{t.services.intro}</p></div>
    <div className="services-grid">{t.services.items.map((item, index) => <div key={item}><span>0{index + 1}</span><h2>{item}</h2></div>)}</div>
    <div className="contact-bar">
      <div><span>{t.services.cta}</span><strong>{contact.display}</strong></div>
      <div className="contact-actions">
        <a href={`tel:${contact.phone}`}><Phone size={19} weight="bold" /><span>{t.services.call}</span></a>
        <a href={`${contact.whatsapp}?text=${whatsappMessage}`} target="_blank" rel="noreferrer"><WhatsappLogo size={20} weight="fill" /><span>{t.services.whatsapp}</span></a>
        <a href={contact.instagram} target="_blank" rel="noreferrer"><InstagramLogo size={20} weight="bold" /><span>{t.services.instagram}</span></a>
      </div>
      <a className="qr-link" href={contact.instagram} target="_blank" rel="noreferrer" aria-label="Scan or open Instagram @thehyno"><img src={media("thehyno-qr.png")} alt="Instagram QR code for THEHYNO" /></a>
      <p>{t.services.note}</p>
    </div>
  </div>;
}

function AboutView({ t, language, goToView }: { t: typeof copy.en | typeof copy.fa; language: Language; goToView: (view: View) => void }) {
  return <div className="about-view">
    <div className="about-heading"><p className="eyebrow">{t.about.eyebrow}</p><h1>{t.about.title}</h1></div>
    <div className="about-columns">
      <article><span>01</span><h2>{t.about.studio}</h2><p>{t.about.studioBody}</p><button onClick={() => goToView("studio")}>{t.nav.studio}{language === "fa" ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}</button></article>
      <article><span>02</span><h2>{t.about.poriya}</h2><p>{t.about.poriyaBody}</p><button onClick={() => goToView("personal")}>{t.nav.personal}{language === "fa" ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}</button></article>
    </div>
    <div className="about-note"><p>{t.about.note}</p><span>{t.about.contact}</span></div>
  </div>;
}
