/* Hero.jsx */

const Hero = ({ data, onCta }) => (
  <section className="g-hero">
    <div className="g-hero-bg" style={{backgroundImage: `url(${data.backgroundImage.replace("/assets/", "../../assets/")})`}} />
    <div className="g-hero-overlay" />
    <div className="g-hero-content">
      <div className="g-hero-tag">✦ {data.tagline} ✦</div>
      <h1 className="t-display g-hero-h">
        <span style={{color: "var(--accent)"}}>G</span><span style={{color: "#fff"}}>{data.heading.slice(1)}</span>
      </h1>
      <p className="g-hero-desc">{data.description}</p>
      <div style={{marginTop: 28, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap"}}>
        <button className="btn btn-primary" onClick={onCta}>{data.ctaText}</button>
        <a className="btn btn-outline" style={{background:"rgba(255,255,255,0.06)",borderColor:"rgba(255,255,255,0.6)",color:"#fff"}} href="#pricing">XEM BẢNG GIÁ</a>
      </div>
    </div>
    <style>{`
      .g-hero { position: relative; min-height: 100svh; display: flex; flex-direction: column;
        justify-content: center; align-items: center; text-align: center;
        padding: 80px var(--container-px) 60px; overflow: hidden; }
      .g-hero-bg { position: absolute; inset: 0; background-size: cover; background-position: center 30%; }
      .g-hero-overlay { position: absolute; inset: 0;
        background: linear-gradient(180deg, rgba(250,248,245,0.85) 0%, rgba(250,248,245,0) 16%,
          rgba(10,8,6,0.38) 44%, rgba(10,8,6,0.76) 76%, #FAF8F5 100%); }
      .g-hero-content { position: relative; z-index: 2; max-width: 720px; padding-top: 18vh; }
      .g-hero-tag { font-family: var(--font-body); font-size: 0.8rem; letter-spacing: 0.4em; color: #fff;
        font-weight: 700; text-shadow: 0 2px 12px rgba(0,0,0,0.5); margin-bottom: 14px;
        animation: gFadeUp .7s var(--ease) both; }
      .g-hero-h { color: #fff; font-size: clamp(2rem, 6vw, 4.2rem); white-space: nowrap;
        text-shadow: 0 4px 20px rgba(0,0,0,0.4); margin-bottom: 18px;
        animation: gFadeUp .8s var(--ease) .2s both; }
      .g-hero-desc { font-family: var(--font-body); font-size: clamp(0.88rem, 2vw, 1.05rem);
        color: rgba(255,255,255,0.88); line-height: 1.75; max-width: 540px; margin: 0 auto;
        text-shadow: 0 1px 8px rgba(0,0,0,0.45);
        animation: gFadeUp .7s var(--ease) .38s both; }
      @keyframes gFadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
    `}</style>
  </section>
);

window.Hero = Hero;
