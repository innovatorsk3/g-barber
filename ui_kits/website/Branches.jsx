/* Branches.jsx */

const Branches = ({ data }) => (
  <section className="section section-alt">
    <div className="container">
      <SectionHeader tag={data.tag} title={data.heading} body={data.description} center />
      <div className="g-branches">
        {data.items.map((b, i) => (
          <Card key={b.id} className="card g-branch-card">
            <div className="g-branch-img" style={{backgroundImage: `url(../../assets/branches/cn${i+1}.jpg)`}}>
              <span className="g-branch-chip">CS {i+1}</span>
            </div>
            <div className="g-branch-body">
              <h3 className="g-branch-name">{b.name}</h3>
              <p className="g-branch-addr"><Icon name="pin" size={14} style={{marginTop:3,flexShrink:0}}/> {b.address}</p>
              <div className="g-branch-meta">
                <a className="g-branch-phone" href={`tel:${b.phone.replace(/\s/g,"")}`}><Icon name="phone" size={13}/> {b.phone}</a>
                <span className="g-branch-hours"><Icon name="clock" size={12}/> {b.hours}</span>
              </div>
              <a className="g-branch-map" href={b.mapUrl} target="_blank" rel="noopener noreferrer">XEM BẢN ĐỒ <Icon name="arrowR" size={12}/></a>
            </div>
          </Card>
        ))}
      </div>
    </div>
    <style>{`
      .g-branches { display: grid; grid-template-columns: 1fr; gap: 20px;
        margin-top: clamp(1.5rem,4vw,3rem); }
      @media (min-width: 768px) { .g-branches { grid-template-columns: repeat(3, 1fr); gap: 24px; } }
      .g-branch-card { padding: 0; display: flex; flex-direction: column; }
      .g-branch-img { position: relative; height: 160px; background-size: cover; background-position: center; }
      .g-branch-chip { position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.92);
        backdrop-filter: blur(4px); padding: 3px 10px; border-radius: var(--radius-full);
        font-size: 10px; font-weight: 700; letter-spacing: 0.05em; color: var(--text-primary); }
      .g-branch-body { padding: 18px; display: flex; flex-direction: column; gap: 8px; }
      .g-branch-name { font-family: var(--font-body); font-size: 15px; font-weight: 700; color: var(--text-primary); line-height: 1.3; }
      .g-branch-addr { font-family: var(--font-body); font-size: 12px; color: var(--text-secondary);
        line-height: 1.6; display: flex; align-items: flex-start; gap: 6px; }
      .g-branch-meta { padding-top: 10px; border-top: 1px solid var(--border); display: flex;
        align-items: center; justify-content: space-between; }
      .g-branch-phone { font-size: 13px; font-weight: 700; color: var(--text-primary); display: flex; align-items: center; gap: 5px; }
      .g-branch-hours { font-size: 10px; color: var(--text-muted); font-weight: 500; display: flex; align-items: center; gap: 4px; }
      .g-branch-map { font-size: 10px; font-weight: 700; color: var(--accent); letter-spacing: 0.05em;
        text-transform: uppercase; display: flex; align-items: center; gap: 4px; margin-top: 4px; }
      .g-branch-map:hover { color: var(--accent-hover); }
    `}</style>
  </section>
);

window.Branches = Branches;
