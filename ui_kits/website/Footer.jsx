/* Footer.jsx */

const Footer = () => (
  <footer className="g-footer">
    <div className="container" style={{padding: "48px var(--container-px) 32px"}}>
      <div className="g-foot-grid">
        <div>
          <div className="g-foot-logo"><span style={{color:"var(--accent)"}}>G</span><span style={{color:"#fff"}}> - Barbershop</span></div>
          <p className="g-foot-tag">Đẳng cấp trong từng đường kéo.<br/>Phong cách nam tính, chuyên nghiệp.</p>
          <div className="g-foot-social">
            {["Facebook","Instagram","YouTube","TikTok"].map(s => (
              <a key={s} href="#" className="g-foot-social-btn">{s}</a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="g-foot-h">Menu</h4>
          <ul className="g-foot-links"><li><a href="#">Trang Chủ</a></li><li><a href="#">Về Chúng Tôi</a></li></ul>
        </div>
        <div>
          <h4 className="g-foot-h">Liên Hệ</h4>
          <div className="g-foot-contact">
            <a className="g-foot-phone" href="tel:0947947168">0947 947 168</a>
            <a className="g-foot-email" href="mailto:gbarber.hcm@gmail.com">gbarber.hcm@gmail.com</a>
            <p className="g-foot-info"><Icon name="clock" size={12}/> 8:00 – 21:00 · Thứ 2 – CN</p>
            <p className="g-foot-info"><Icon name="pin" size={12}/> Dĩ An, Bình Dương &amp; Thủ Đức, TP.HCM</p>
          </div>
        </div>
      </div>
      <div className="g-foot-bottom">
        <p>© 2026 G - Barbershop. All rights reserved.</p>
        <p>Made with <span style={{color:"var(--accent)"}}>♥</span> in Việt Nam</p>
      </div>
    </div>
    <style>{`
      .g-footer { background: var(--bg-dark); position: relative; }
      .g-foot-grid { display: grid; grid-template-columns: 1fr; gap: 32px; margin-bottom: 36px; }
      @media (min-width: 1024px) { .g-foot-grid { grid-template-columns: 2fr 1fr 1.5fr; gap: 60px; margin-bottom: 48px; } }
      .g-foot-logo { font-family: var(--font-display); font-size: 32px; font-weight: 600; margin-bottom: 16px; letter-spacing: 0.04em; }
      .g-foot-tag { font-size: 14px; color: rgba(255,255,255,0.75); line-height: 1.8; margin-bottom: 24px; max-width: 280px; }
      .g-foot-social { display: flex; flex-wrap: wrap; gap: 8px; }
      .g-foot-social-btn { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.8);
        border: 1px solid rgba(255,255,255,0.25); border-radius: var(--radius-sm); padding: 8px 14px;
        letter-spacing: 0.05em; transition: all 0.3s var(--ease); }
      .g-foot-social-btn:hover { color: #fff; border-color: var(--accent); background: rgba(185,28,28,0.15); transform: translateY(-2px); }
      .g-foot-h { font-size: 11px; font-weight: 600; letter-spacing: 0.2em; color: var(--accent);
        text-transform: uppercase; margin-bottom: 20px; font-family: var(--font-body); }
      .g-foot-links { display: flex; flex-direction: column; gap: 12px; }
      .g-foot-links a { font-size: 14px; color: rgba(255,255,255,0.78); }
      .g-foot-links a:hover { color: #fff; }
      .g-foot-contact { display: flex; flex-direction: column; gap: 14px; }
      .g-foot-phone { font-family: var(--font-display); font-size: 24px; color: #fff; letter-spacing: 0.05em; }
      .g-foot-phone:hover { color: var(--accent); }
      .g-foot-email { font-size: 13px; color: rgba(255,255,255,0.75); }
      .g-foot-info { font-size: 13px; color: rgba(255,255,255,0.75); display: flex; align-items: center; gap: 8px; }
      .g-foot-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;
        display: flex; flex-direction: column; gap: 4px; align-items: center; text-align: center; }
      @media (min-width: 640px) { .g-foot-bottom { flex-direction: row; justify-content: space-between; } }
      .g-foot-bottom p { font-size: 12px; color: rgba(255,255,255,0.55); letter-spacing: 0.05em; }
    `}</style>
  </footer>
);

window.Footer = Footer;
