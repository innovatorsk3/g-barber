/* Pricing.jsx — table view (not the static jpg) for a more useful prototype */

const Pricing = ({ data }) => {
  const [tab, setTab] = React.useState(0);
  const cat = data.categories[tab];
  return (
    <section id="pricing" className="section section-light">
      <div className="container">
        <SectionHeader tag={data.tag} title={data.heading} body={data.description} center />
        <div className="g-price-tabs">
          {data.categories.map((c, i) => (
            <button key={c.name} className={`g-price-tab ${i===tab?"active":""}`} onClick={()=>setTab(i)}>
              {c.name}
            </button>
          ))}
        </div>
        <div className="g-price-card">
          <div className="g-price-head">
            <h3 className="t-h3" style={{textTransform: "uppercase", color: "var(--text-primary)"}}>{cat.name}</h3>
            <span className="g-price-from">{cat.items.length} dịch vụ</span>
          </div>
          {cat.items.map(it => (
            <div className="g-price-row" key={it.service}>
              <span className="g-price-svc">{it.service}</span>
              <span className="g-price-val">{it.price}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .g-price-tabs { display: flex; gap: 8px; overflow-x: auto; padding: 0 0 12px;
          margin: clamp(1.5rem,4vw,3rem) 0 18px; scrollbar-width: none; }
        .g-price-tabs::-webkit-scrollbar { display: none; }
        .g-price-tab { background: transparent; border: 1px solid var(--border); border-radius: var(--radius-full);
          padding: 9px 18px; font-family: var(--font-body); font-size: 0.65rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-secondary);
          white-space: nowrap; transition: all var(--transition); flex-shrink: 0; }
        .g-price-tab:hover { color: var(--accent); border-color: rgba(185,28,28,0.3); }
        .g-price-tab.active { background: var(--accent); border-color: var(--accent); color: #fff; }
        .g-price-card { background: #fff; border: 1px solid var(--border); border-radius: var(--radius-lg);
          overflow: hidden; max-width: 800px; margin: 0 auto; box-shadow: var(--shadow-md); }
        .g-price-head { padding: 18px 24px; border-bottom: 1px solid var(--border); display: flex;
          align-items: center; justify-content: space-between; background: var(--bg-secondary); }
        .g-price-from { font-family: "JetBrains Mono", monospace; font-size: 11px; color: var(--text-muted); letter-spacing: 0.05em; }
        .g-price-row { padding: 13px 24px; border-bottom: 1px dashed var(--border); display: flex; align-items: center; justify-content: space-between; }
        .g-price-row:last-child { border-bottom: none; }
        .g-price-svc { font-family: var(--font-body); font-size: 14px; color: var(--text-secondary); }
        .g-price-val { font-family: var(--font-display); font-weight: 600; font-size: 16px; letter-spacing: 0.04em; color: var(--accent); }
      `}</style>
    </section>
  );
};

window.Pricing = Pricing;
