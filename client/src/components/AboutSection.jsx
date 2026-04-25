const S = {
  section: {
    padding: '7rem 3rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '5rem',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  tag: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.7rem',
    letterSpacing: '4px',
    color: 'var(--accent2)',
    textTransform: 'uppercase',
    marginBottom: '1.5rem',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(3rem, 5vw, 5rem)',
    lineHeight: 1,
    marginBottom: '1.5rem',
  },
  body: {
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    color: 'var(--text-muted)',
    lineHeight: 1.9,
    marginBottom: '1rem',
  },
  visualBox: {
    position: 'relative',
    height: '420px',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    overflow: 'hidden',
    background: 'var(--surface)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    fontFamily: 'var(--font-display)',
    fontSize: '8rem',
    color: 'rgba(0,240,255,0.1)',
    position: 'absolute',
  },
  imgHint: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
    letterSpacing: '2px',
    textAlign: 'center',
    zIndex: 1,
  },
  skills: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '1.5rem',
  },
  skill: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.65rem',
    letterSpacing: '2px',
    padding: '0.4rem 0.8rem',
    border: '1px solid var(--border)',
    color: 'var(--accent)',
    borderRadius: '2px',
    textTransform: 'uppercase',
  },
};

export default function AboutSection() {
  return (
    <section style={{ background: 'var(--surface)', padding: '2rem 0' }}>
      <div style={S.section}>
        <div>
          <p style={S.tag}>// sobre mí</p>
          <h2 style={S.title}>
            No music<br />
            <span style={{ color: 'var(--accent)' }}>No life</span>
          </h2>
          <p style={S.body}>
            DJ y productor de música electrónica .
          </p>
          
          <div style={S.skills}>
            {['Progressive', 'Deep House', 'Ambient'].map(s => (
              <span key={s} style={S.skill}>{s}</span>
            ))}
          </div>
        </div>

        <div style={S.visualBox}>
          <div style={S.placeholder}>DJ</div>
          <div style={S.imgHint}>
            {/* Reemplazá con tu foto: */}
            <img src="https://res.cloudinary.com/dhayjfkli/image/upload/v1777148344/hernan_gjo5qq.jpg" style={{width:'100%',height:'100%',objectFit:'cover',position:'absolute',inset:0}} />
            <p>📷 Reemplazá este bloque</p>
            <p style={{ marginTop: '0.5rem' }}>con tu foto en <code>/public/foto-dj.jpg</code></p>
          </div>

          {/* Decorative corner */}
          <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            width: '30px',
            height: '30px',
            borderTop: '2px solid var(--accent2)',
            borderRight: '2px solid var(--accent2)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            width: '30px',
            height: '30px',
            borderBottom: '2px solid var(--accent)',
            borderLeft: '2px solid var(--accent)',
          }} />
        </div>
      </div>
    </section>
  );
}
