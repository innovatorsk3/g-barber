/* Gallery.jsx */

const Gallery = ({ data }) => (
  <section className="section section-light">
    <div className="container">
      <SectionHeader tag={data.tag} title={data.heading} body={data.description} center />
      <div className="g-gallery">
        {data.images.map((img, i) => (
          <div key={img.label} className="g-gallery-item" style={{backgroundImage: `url(${img.src.replace("/assets/", "../../assets/")})`}}>
            <span className="g-gallery-lbl">{img.label}</span>
          </div>
        ))}
      </div>
    </div>
    <style>{`
      .g-gallery { display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px;
        margin-top: clamp(1.5rem,4vw,3rem); }
      @media (min-width: 640px) { .g-gallery { grid-template-columns: repeat(3, 1fr); gap: 10px; } }
      .g-gallery-item { aspect-ratio: 1; background-size: cover; background-position: center;
        border-radius: var(--radius-sm); position: relative; overflow: hidden; cursor: pointer;
        transition: all 0.4s var(--ease); }
      .g-gallery-item::before { content: ""; position: absolute; inset: 0;
        background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.65) 100%);
        opacity: 0; transition: opacity 0.3s var(--ease); }
      .g-gallery-item:hover::before { opacity: 1; }
      .g-gallery-lbl { position: absolute; left: 14px; bottom: 12px; z-index: 2;
        color: #fff; font-family: var(--font-display); font-size: 16px; letter-spacing: 0.08em;
        opacity: 0; transform: translateY(8px); transition: all 0.3s var(--ease); }
      .g-gallery-item:hover .g-gallery-lbl { opacity: 1; transform: translateY(0); }
    `}</style>
  </section>
);

window.Gallery = Gallery;
