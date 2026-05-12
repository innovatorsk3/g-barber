/* About.jsx */

const About = ({ data }) => (
  <section className="section section-light">
    <div className="container">
      <div className="g-about-grid">
        <div className="g-about-img-wrap">
          <div className="g-about-img" style={{backgroundImage:"url(../../assets/team/2.jpg)"}} />
          <div className="g-about-badge">
            <div className="g-about-num">3</div>
            <div className="g-about-lbl">Chi Nhánh</div>
          </div>
        </div>
        <div>
          <SectionHeader tag={data.tag} title={data.heading} />
          <p className="t-body" style={{marginBottom:12}}>{data.description}</p>
          <p className="t-body">{data.description2}</p>
        </div>
      </div>
    </div>
    <style>{`
      .g-about-grid { display: grid; grid-template-columns: 1fr; gap: clamp(1.5rem,4vw,4rem); align-items: center; }
      @media (min-width: 768px) { .g-about-grid { grid-template-columns: 1fr 1fr; } }
      .g-about-img-wrap { position: relative; }
      .g-about-img { aspect-ratio: 4/3; border-radius: var(--radius-lg); border: 1px solid var(--border);
        background-size: cover; background-position: center; transition: transform 0.5s var(--ease); }
      .g-about-img:hover { transform: scale(1.02); }
      .g-about-badge { position: absolute; bottom: 16px; right: -4px; padding: 14px 22px;
        background: var(--bg-elevated); border: 1px solid var(--border); border-radius: var(--radius); }
      .g-about-num { font-family: var(--font-display); font-size: 32px; line-height: 1; color: var(--accent); font-weight: 600; }
      .g-about-lbl { font-family: var(--font-body); font-size: 9px; font-weight: 600; letter-spacing: 0.15em;
        text-transform: uppercase; color: var(--text-muted); }
    `}</style>
  </section>
);

window.About = About;
