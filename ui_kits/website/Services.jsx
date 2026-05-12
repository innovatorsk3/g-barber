/* Services.jsx */

const SERVICE_IMG = [
  "../../assets/gallery/3.jpg", "../../assets/gallery/4.jpg",
  "../../assets/gallery/5.jpg", "../../assets/gallery/6.jpg",
  "../../assets/team/1.jpg",
];

const Services = ({ data }) => (
  <section className="section section-alt">
    <div className="container">
      <SectionHeader tag={data.tag} title={data.heading} body={data.description} center />
      <div className="g-svc-row">
        {data.categories.map((s, i) => (
          <Card key={s.title} className="card g-svc-card">
            <div className="g-svc-img" style={{backgroundImage: `url(${SERVICE_IMG[i] || SERVICE_IMG[0]})`}} />
            <div style={{padding: "14px 16px 18px"}}>
              <h3 className="t-h3" style={{marginBottom: 6, color: "var(--text-primary)"}}>{s.title}</h3>
              <p style={{fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 300, color: "var(--text-muted)", lineHeight: 1.7}}>{s.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
    <style>{`
      .g-svc-row { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; gap: 16px;
        padding: 0 var(--container-px) 24px; margin-top: clamp(1.5rem,4vw,3.5rem);
        scrollbar-width: none; }
      .g-svc-row::-webkit-scrollbar { display: none; }
      .g-svc-card { width: 80vw; max-width: 320px; flex-shrink: 0; scroll-snap-align: start; }
      .g-svc-img { aspect-ratio: 16/10; background-size: cover; background-position: center; }
      @media (min-width: 768px) {
        .g-svc-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; padding: 0 var(--container-px); overflow: visible; }
        .g-svc-card { width: 100%; max-width: none; }
      }
    `}</style>
  </section>
);

window.Services = Services;
