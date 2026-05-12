/* Shared chrome for G-Barbershop multi-page site.
   Globals: Header, Footer, BottomNav, primitives (Btn, Eyebrow, SectionLabel),
   icons (Phone, Pin, Clock, Arrow, ArrowUR, Menu, X, Home, Grid, Star, Check, Mail). */
const { useState, useEffect } = React;

const I = ({ size = 20, sw = 1.6, children, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" {...p}>{children}</svg>
);
const Phone   = (p) => <I {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z"/></I>;
const Pin     = (p) => <I {...p}><path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></I>;
const Clock   = (p) => <I {...p}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></I>;
const Arrow   = (p) => <I {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></I>;
const ArrowUR = (p) => <I {...p}><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></I>;
const Menu    = (p) => <I {...p}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></I>;
const X       = (p) => <I {...p}><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></I>;
const HomeIc  = (p) => <I {...p}><path d="M3 11l9-8 9 8"/><path d="M5 9.5V21h14V9.5"/></I>;
const Grid    = (p) => <I {...p}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></I>;
const Check   = (p) => <I {...p}><polyline points="20 6 9 17 4 12"/></I>;
const Mail    = (p) => <I {...p}><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2 7 12 13 22 7"/></I>;
const Star    = (p) => <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21l1.18-6.88-5-4.87 6.91-1.01z"/></svg>;
const Sparkle = (p) => <I {...p}><path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/></I>;

const NAV = [
  { label: "Trang Chủ",  href: "Home Redesign.html", key: "home" },
  { label: "Dịch Vụ",    href: "dich-vu.html",       key: "dichvu" },
  { label: "G-Store",    href: "store.html",         key: "store" },
  { label: "Academy",    href: "academy.html",       key: "academy" },
  { label: "Tuyển Dụng", href: "tuyen-dung.html",    key: "tuyendung" },
];

const Btn = ({ as: As = "button", variant = "primary", size = "md", icon, children, className = "", ...p }) => {
  const base = "inline-flex items-center justify-center gap-2 font-medium uppercase rounded-full transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] select-none";
  const sizes = { md: "h-12 px-7 text-[11px] tracking-[0.18em]", lg: "h-14 px-9 text-[12px] tracking-[0.2em]", sm: "h-10 px-5 text-[10px] tracking-[0.16em]" };
  const variants = {
    primary: "bg-brand text-white hover:bg-brand-700 hover:-translate-y-0.5 hover:shadow-brand-glow",
    outline: "border border-white/30 text-white hover:bg-white/5 hover:border-white hover:-translate-y-0.5",
    light:   "bg-white text-zinc-900 hover:bg-zinc-100 hover:-translate-y-0.5",
    ghost:   "text-zinc-300 hover:text-white",
  };
  return <As className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...p}>{icon}{children}</As>;
};

const Eyebrow = ({ children, dot = true }) => (
  <div className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-zinc-400">
    {dot && <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>}{children}
  </div>
);

const SectionLabel = ({ kicker, title, body, center }) => (
  <div className={`${center ? "text-center mx-auto" : ""} max-w-2xl`}>
    {kicker && <div className="mb-4"><Eyebrow>{kicker}</Eyebrow></div>}
    <h2 className="font-display font-medium leading-[1.05] text-[clamp(2rem,6vw,3.5rem)] text-zinc-50">{title}</h2>
    {body && <p className="mt-4 text-[0.95rem] leading-relaxed text-zinc-400">{body}</p>}
  </div>
);

const Header = ({ active, onCta }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 12);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-zinc-900/85 backdrop-blur-xl border-b border-white/5" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 h-16 sm:h-20">
          <button onClick={() => setOpen(true)} className="lg:hidden p-2 -ml-2 text-zinc-200 hover:text-white" aria-label="Menu"><Menu size={22}/></button>
          <a href="Home Redesign.html" className="flex items-center gap-2.5">
            <img src="assets/logo/logo_g.png" alt="G" className="h-10 sm:h-11 w-auto invert brightness-0"/>
            <span className="hidden sm:inline-flex font-display text-[20px] tracking-[0.06em]">
              <span className="text-brand font-semibold">G</span>
              <span className="text-zinc-300 font-normal"> · Barbershop</span>
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-9">
            {NAV.map(n => (
              <a key={n.key} href={n.href} className={`text-[11px] font-semibold tracking-[0.16em] uppercase ${active === n.key ? "text-brand" : "text-zinc-300 hover:text-white"}`}>{n.label}</a>
            ))}
          </nav>
          <a href="tel:0947947168" className="sm:hidden w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center" aria-label="Call"><Phone size={15}/></a>
          <Btn size="sm" variant="primary" className="hidden sm:inline-flex" onClick={onCta} icon={<Phone size={12}/>}>0947 947 168</Btn>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-[60] bg-zinc-950/96 backdrop-blur-md flex flex-col" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div className="flex items-center justify-between px-5 h-16">
            <img src="assets/logo/logo_g.png" alt="G" className="h-10 invert brightness-0"/>
            <button onClick={() => setOpen(false)} className="p-2 text-zinc-200" aria-label="Close"><X size={22}/></button>
          </div>
          <div className="flex-1 flex flex-col justify-center px-8 gap-1 pb-24">
            {NAV.map((n, i) => (
              <a key={n.key} href={n.href}
                 className={`font-display text-[32px] py-3 transition-colors flex items-baseline gap-4 ${active === n.key ? "text-brand" : "text-zinc-100 hover:text-brand"}`}>
                <span className="text-[10px] font-sans tracking-[0.28em] text-zinc-500">0{i+1}</span>{n.label}
              </a>
            ))}
            <div className="h-px my-6 bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>
            <Btn variant="primary" className="self-start" icon={<Phone size={12}/>} onClick={() => { setOpen(false); onCta?.(); }}>Đặt lịch hẹn</Btn>
            <div className="mt-8 text-[11px] uppercase tracking-[0.18em] text-zinc-500 leading-7">
              <p className="flex items-center gap-2"><Clock size={12}/> 8:00 – 21:00 · Thứ 2 – CN</p>
              <p className="flex items-center gap-2 mt-1"><Pin size={12}/> Dĩ An · TP.HCM</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Footer = () => (
  <footer className="bg-zinc-950 border-t border-white/5 px-5 sm:px-8 pt-16 pb-28 sm:pb-12">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5">
            <img src="assets/logo/logo_g.png" alt="" className="h-12 invert brightness-0"/>
            <span className="font-display text-2xl"><span className="text-brand font-semibold">G</span><span className="text-zinc-300"> · Barbershop</span></span>
          </div>
          <p className="mt-5 text-sm text-zinc-400 leading-relaxed max-w-sm">Đẳng cấp trong từng đường kéo. Phong cách nam tính, chuyên nghiệp. Sài Gòn &amp; Bình Dương.</p>
          <div className="mt-6 flex gap-2 flex-wrap">
            {["Facebook","Instagram","TikTok","YouTube"].map(s => (
              <a key={s} href="#" className="text-[11px] uppercase tracking-[0.12em] text-zinc-300 border border-white/10 hover:border-brand hover:text-white hover:bg-brand/10 rounded-full px-3.5 py-2 transition-all">{s}</a>
            ))}
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="text-[10px] uppercase tracking-[0.28em] text-brand font-semibold mb-5">Điều Hướng</div>
          <ul className="space-y-3 text-sm text-zinc-400">
            {NAV.map(n => <li key={n.key}><a href={n.href} className="hover:text-white">{n.label}</a></li>)}
          </ul>
        </div>
        <div className="md:col-span-4">
          <div className="text-[10px] uppercase tracking-[0.28em] text-brand font-semibold mb-5">Liên Hệ</div>
          <a href="tel:0947947168" className="font-display text-3xl text-white hover:text-brand transition-colors">0947 947 168</a>
          <p className="mt-2 text-sm text-zinc-400">gbarber.hcm@gmail.com</p>
          <p className="mt-4 text-sm text-zinc-400 flex items-center gap-2"><Clock size={13}/> 8:00 – 21:00 · Thứ 2 – CN</p>
          <p className="mt-1.5 text-sm text-zinc-400 flex items-center gap-2"><Pin size={13}/> Dĩ An &amp; Thủ Đức</p>
        </div>
      </div>
      <div className="h-px mt-10 bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>
      <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[11px] text-zinc-500 tracking-[0.06em]">© 2026 G - Barbershop. All rights reserved.</p>
        <p className="text-[11px] text-zinc-500">Made with <span className="text-brand">♥</span> in Việt Nam</p>
      </div>
    </div>
  </footer>
);

const BottomNav = ({ active, onCta }) => {
  const items = [
    { icon: HomeIc, label: "Home",    key: "home",   href: "Home Redesign.html" },
    { icon: Grid,   label: "Dịch Vụ", key: "dichvu", href: "dich-vu.html" },
    { icon: Pin,    label: "C.Nhánh", key: "branch", href: "Home Redesign.html#branches" },
  ];
  return (
    <nav className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-zinc-900/90 backdrop-blur-xl border-t border-white/10 px-3 pt-2 pb-[max(env(safe-area-inset-bottom),0.6rem)]">
      <div className="flex items-center justify-around relative">
        {items.map(it => (
          <a key={it.key} href={it.href} className={`flex flex-col items-center gap-1 px-3 py-1.5 ${active === it.key ? "text-brand" : "text-zinc-400"}`}>
            <it.icon size={20}/><span className="text-[9px] uppercase tracking-[0.1em] font-medium">{it.label}</span>
          </a>
        ))}
        <button onClick={onCta} aria-label="Call" className="absolute right-1 -top-5 w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center shadow-brand-glow ring-4 ring-zinc-900">
          <Phone size={16}/>
        </button>
      </div>
    </nav>
  );
};

const PageHero = ({ kicker, title, body, img }) => (
  <section className="relative pt-32 sm:pt-44 pb-16 sm:pb-24 px-5 sm:px-8 overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${img})`, filter: "grayscale(30%)" }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/75 to-zinc-900"></div>
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-brand/15 to-transparent mix-blend-screen"></div>
    </div>
    <div className="max-w-5xl mx-auto relative">
      <Eyebrow>{kicker}</Eyebrow>
      <h1 className="mt-5 font-display font-medium leading-[0.98] text-[clamp(2.4rem,8vw,5.2rem)] text-zinc-50">{title}</h1>
      {body && <p className="mt-5 max-w-xl text-zinc-300 text-base leading-relaxed">{body}</p>}
    </div>
  </section>
);

Object.assign(window, { useState, useEffect, Phone, Pin, Clock, Arrow, ArrowUR, Menu, X, HomeIc, Grid, Check, Mail, Star, Sparkle, Btn, Eyebrow, SectionLabel, Header, Footer, BottomNav, PageHero });
