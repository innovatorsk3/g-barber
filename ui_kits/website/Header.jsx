/* Header.jsx + MobileNav drawer */

const Header = ({ active = "home", onNav, phone = "0947 947 168" }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <header className="g-header">
        <button className="g-burger" onClick={() => setOpen(true)} aria-label="Menu">
          <Icon name="menu" size={20} />
        </button>
        <a className="g-logo" href="#" onClick={(e)=>{e.preventDefault(); onNav?.("home");}}>
          <img src="../../assets/logo/logo_g.png" alt="" />
          <span className="g-word"><span className="g-g">G</span><span className="g-rest"> - BARBERSHOP</span></span>
        </a>
        <nav className="g-nav">
          <a href="#" className={active==="home"?"active":""} onClick={(e)=>{e.preventDefault(); onNav?.("home");}}>Trang Chủ</a>
          <a href="#" className={active==="about"?"active":""} onClick={(e)=>{e.preventDefault(); onNav?.("about");}}>Về Chúng Tôi</a>
        </nav>
        <a className="g-cta" href={`tel:${phone.replace(/\s/g,"")}`}>
          <Icon name="phone" size={14} /> {phone}
        </a>
        <a className="g-phone-mob" href={`tel:${phone.replace(/\s/g,"")}`} aria-label="Call"><Icon name="phone" size={14} /></a>
      </header>
      {open && (
        <div className="g-drawer" onClick={(e)=> e.target.classList.contains("g-drawer") && setOpen(false)}>
          <div className="g-drawer-inner">
            <button className="g-drawer-close" onClick={()=>setOpen(false)} aria-label="Close"><Icon name="close" size={20}/></button>
            <img src="../../assets/logo/logo_g.png" alt="" style={{height:90, marginBottom:24}}/>
            <a href="#" className="g-drawer-link" onClick={(e)=>{e.preventDefault(); onNav?.("home"); setOpen(false);}}>Trang Chủ</a>
            <a href="#" className="g-drawer-link" onClick={(e)=>{e.preventDefault(); onNav?.("about"); setOpen(false);}}>Về Chúng Tôi</a>
            <a className="btn btn-primary" href={`tel:${phone.replace(/\s/g,"")}`} style={{marginTop:18, width:280, maxWidth:"100%"}}>
              <Icon name="phone" size={14}/> {phone}
            </a>
            <div className="g-drawer-info"><p>8:00 – 21:00 · Thứ 2 – CN</p><p>Dĩ An, Bình Dương &amp; Thủ Đức, TP.HCM</p></div>
          </div>
        </div>
      )}
      <style>{`
        .g-header { position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          height: 64px; display: flex; align-items: center; justify-content: space-between;
          padding: 0 var(--container-px);
          background: rgba(250,248,245,0.98); border-bottom: 1px solid var(--border);
          transition: all 0.4s var(--ease);
        }
        @media (min-width: 768px) { .g-header { height: 72px; background: rgba(250,248,245,0.92); backdrop-filter: blur(20px) saturate(160%); } }
        @media (min-width: 1024px) { .g-header { height: 80px; } }
        .g-burger { background: none; border: none; color: var(--text-primary); width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center; border-radius: var(--radius-sm); }
        .g-logo { position: absolute; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 10px; height: 100%; }
        .g-logo img { height: 75%; }
        .g-word { display: none; font-family: var(--font-display); font-size: 1.05rem; letter-spacing: 0.08em; }
        .g-g { color: var(--accent); font-size: 1.25rem; font-weight: 600; }
        .g-rest { color: var(--text-muted); font-weight: 400; }
        .g-nav { display: none; gap: 40px; }
        .g-nav a { font-family: var(--font-body); font-size: 0.8rem; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--text-secondary); position: relative; padding: 6px 0; }
        .g-nav a::after { content:""; position:absolute; bottom:0; left:0; width:0; height:1.5px; background: var(--accent); transition: width .35s var(--ease); }
        .g-nav a:hover, .g-nav a.active { color: var(--accent); }
        .g-nav a:hover::after, .g-nav a.active::after { width: 100%; }
        .g-cta { display: none; align-items: center; gap: 8px; height: 44px; padding: 0 22px;
          background: var(--accent); color: #fff; border-radius: var(--radius-full);
          font-family: var(--font-body); font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; }
        .g-cta:hover { background: var(--accent-hover); transform: translateY(-2px); box-shadow: var(--shadow-cta); }
        .g-phone-mob { background: var(--accent); color: #fff; width: 38px; height: 38px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; }
        @media (min-width: 1024px) {
          .g-burger, .g-phone-mob { display: none !important; }
          .g-logo { position: static; transform: none; }
          .g-word { display: inline-flex; align-items: center; }
          .g-nav, .g-cta { display: flex; }
        }
        .g-drawer { position: fixed; inset: 0; z-index: 200; background: rgba(255,255,255,0.98); backdrop-filter: blur(24px);
          display: flex; align-items: center; justify-content: center; animation: gfade .25s var(--ease); }
        .g-drawer-inner { display: flex; flex-direction: column; align-items: center; gap: 24px; padding: 24px;
          width: 100%; max-width: 360px; position: relative; }
        .g-drawer-close { position: absolute; top: 8px; right: 12px; background: none; border: none; color: var(--text-primary); padding: 8px; }
        .g-drawer-link { font-family: var(--font-display); font-size: 28px; font-weight: 500;
          color: var(--text-primary); letter-spacing: 0.05em; }
        .g-drawer-link:hover { color: var(--accent); }
        .g-drawer-info { text-align: center; margin-top: 12px; }
        .g-drawer-info p { font-size: 11px; color: var(--text-muted); line-height: 1.8; letter-spacing: 0.04em; }
        @keyframes gfade { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </>
  );
};

window.Header = Header;
