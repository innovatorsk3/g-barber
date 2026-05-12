/* Team.jsx — dark section with grayscale-to-color portraits + testimonial carousel */

const Team = ({ data }) => {
  const [active, setActive] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % data.testimonials.length), 5000);
    return () => clearInterval(t);
  }, [data.testimonials.length]);
  return (
    <section className="section section-dark dark-section">
      <div className="container">
        <SectionHeader tag={data.tag} title={data.heading} body={data.description} center />
        <div className="g-team-grid">
          {data.members.map((m, i) => (
            <Card key={m.name} className="card g-team-card">
              <div className="g-team-img" style={{backgroundImage: `url(${m.image})`}} />
              <div style={{padding: "12px 10px 16px", textAlign: "center"}}>
                <p style={{fontFamily:"var(--font-display)",fontWeight:600,fontSize:15,color:"rgba(255,255,255,0.92)",marginBottom:2,letterSpacing:"0.04em"}}>{m.name}</p>
                <p style={{fontFamily:"var(--font-body)",fontSize:9,fontWeight:500,color:"var(--accent)",letterSpacing:"0.08em",textTransform:"uppercase"}}>{m.role}</p>
              </div>
            </Card>
          ))}
        </div>
        <div className="g-testi">
          <div className="g-stars">★ ★ ★ ★ ★</div>
          <p className="g-testi-text">&ldquo;{data.testimonials[active].text}&rdquo;</p>
          <p className="g-testi-name">— {data.testimonials[active].name}</p>
          <div className="g-testi-dots">
            {data.testimonials.map((_, i) => (
              <button key={i} className={`g-testi-dot ${i===active?"active":""}`} onClick={()=>setActive(i)} aria-label={`Testimonial ${i+1}`} />
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .g-team-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;
          margin-top: clamp(1.5rem,4vw,3rem); padding: 0 var(--container-px); }
        @media (min-width: 768px) { .g-team-grid { grid-template-columns: repeat(4, 1fr); gap: 20px; padding: 0; } }
        .g-team-card { background: #1E1A17; border-color: rgba(255,255,255,0.08); box-shadow: 0 4px 24px rgba(0,0,0,0.4); }
        .g-team-card:hover { border-color: rgba(185,28,28,0.4); }
        .g-team-img { aspect-ratio: 3/4; background-size: cover; background-position: center;
          filter: grayscale(50%); transition: filter 0.5s var(--ease), transform 0.5s var(--ease); }
        .g-team-card:hover .g-team-img { filter: grayscale(0%); transform: scale(1.04); }
        .g-testi { margin-top: clamp(2rem,4vw,4rem); max-width: 560px; margin-left: auto; margin-right: auto; text-align: center; }
        .g-stars { color: var(--accent-gold); font-size: 16px; letter-spacing: 4px; margin-bottom: 12px; }
        .g-testi-text { font-family: var(--font-display); font-size: clamp(1rem,2.5vw,1.25rem); font-style: italic;
          color: rgba(255,255,255,0.88); line-height: 1.65; margin-bottom: 14px; }
        .g-testi-name { font-family: var(--font-body); font-size: 0.75rem; font-weight: 600;
          letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.42); }
        .g-testi-dots { display: flex; justify-content: center; gap: 6px; margin-top: 16px; }
        .g-testi-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.25);
          border: none; padding: 0; transition: all 0.3s var(--ease); }
        .g-testi-dot.active { width: 22px; border-radius: 3px; background: var(--accent); }
      `}</style>
    </section>
  );
};

window.Team = Team;
