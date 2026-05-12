/* primitives.jsx — Button · Tag · Card · AccentLine · SectionHeader · Icon */

const Button = ({ variant = "primary", size = "md", icon, children, ...p }) => (
  <button className={`btn btn-${variant} ${size === "sm" ? "btn-sm" : ""}`} {...p}>
    {icon ? <span style={{display:"inline-flex"}}>{icon}</span> : null}
    {children}
  </button>
);

const Tag = ({ dark, children, style }) => (
  <span className={`tag ${dark ? "tag-dark" : ""}`} style={style}>{children}</span>
);

const AccentLine = ({ center, style }) => (
  <span className={center ? "accent-line-center" : "accent-line"} style={style} />
);

const Card = ({ children, style, ...p }) => (
  <div className="card" style={style} {...p}>{children}</div>
);

const SectionHeader = ({ tag, title, body, center }) => (
  <div className={`section-header ${center ? "text-center" : ""}`} style={center ? {maxWidth: 560, margin: "0 auto"} : {}}>
    {tag && <Tag style={center ? {margin: "0 auto 12px"} : {marginBottom: 12}}>{tag}</Tag>}
    <AccentLine center={center} />
    <h2 className="t-h2" style={{marginTop: 14}}>{title}</h2>
    {body && <p className="t-body" style={{marginTop: 10}}>{body}</p>}
  </div>
);

const Icon = ({ name, size = 18, stroke = 1.8, style }) => {
  const paths = {
    phone:  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z"/>,
    pin:    <><path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></>,
    clock:  <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,
    menu:   <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    close:  <><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></>,
    arrowR: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    home:   <><path d="M3 11l9-8 9 8"/><path d="M5 9.5V21h14V9.5"/></>,
    user:   <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    arrowU: <><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={style}>
      {paths[name]}
    </svg>
  );
};

Object.assign(window, { Button, Tag, AccentLine, Card, SectionHeader, Icon });
