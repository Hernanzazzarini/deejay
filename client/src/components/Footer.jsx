// ⚙️ Editá tus redes sociales
const SOCIAL = [
  { label: 'Instagram', url: 'https://instagram.com/tu_usuario', icon: '◈' },
  { label: 'Spotify', url: 'https://spotify.com/artist/tu_id', icon: '▶' },
  
];

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      padding: '4rem 3rem 2rem',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          marginBottom: '4rem',
          paddingBottom: '4rem',
          borderBottom: '1px solid var(--border)',
        }}>
          <div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '4rem',
              color: 'var(--accent)',
              textShadow: '0 0 30px rgba(0,240,255,0.3)',
              letterSpacing: '4px',
              marginBottom: '1rem',
            }}>HERNAN ZAZZARINI</h3>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              letterSpacing: '2px',
              lineHeight: 2,
            }}>
              DJ — Productor<br />
              Música Electrónica<br />
              REDUCCION--Cordoba-Argentina
            </p>
          </div>

          <div>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '3px',
              color: 'var(--accent2)',
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
            }}>Redes</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {SOCIAL.map(({ label, url, icon }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    letterSpacing: '2px',
                    color: 'var(--text-muted)',
                    transition: 'color 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  <span style={{ color: 'var(--accent)', fontSize: '0.5rem' }}>{icon}</span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            letterSpacing: '2px',
          }}>
            © {new Date().getFullYear()} Desarrollador Zazzarinih— Todos los derechos reservados
          </p>
          <a
            href="/admin"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              color: 'rgba(107,107,138,0.3)',
              letterSpacing: '2px',
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-muted)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(107,107,138,0.3)'}
          >
            admin
          </a>
        </div>
      </div>
    </footer>
  );
}
