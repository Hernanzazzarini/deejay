// ⚙️ CONFIGURACIÓN: Reemplazá estos IDs con los tuyos de Spotify
// Para obtener el ID: abrí Spotify → Share → Copy Link
// El ID es la parte después de /track/, /album/, /playlist/
const SPOTIFY_TRACKS = [
  {
    type: 'track',
    id: '4iJyoBOLtHqaWYs3vyFtXS', // ejemplo - cambiarlo
    label: 'Track favorito',
  },
  {
    type: 'playlist',
    id: '37i9dQZF1DX6J5NfMJS675', // ejemplo - cambiarlo
    label: 'Playlist de sets',
  },
];

const S = {
  section: {
    padding: '7rem 3rem',
    background: 'var(--bg)',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '1rem',
    marginBottom: '3rem',
  },
  tag: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.7rem',
    letterSpacing: '4px',
    color: 'var(--accent)',
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2.5rem, 4vw, 4rem)',
    lineHeight: 1,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    overflow: 'hidden',
    transition: 'border-color 0.3s',
  },
  label: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.65rem',
    letterSpacing: '3px',
    color: 'var(--text-muted)',
    padding: '1rem 1rem 0.5rem',
    textTransform: 'uppercase',
  },
};

export default function SpotifySection() {
  return (
    <section id="music" style={{ background: 'var(--bg)', padding: '2rem 0' }}>
      <div style={S.section}>
        <div style={S.header}>
          <p style={S.tag}>// música</p>
          <h2 style={S.title}>
            Escuchá mis <span style={{ color: 'var(--accent2)' }}>tracks</span>
          </h2>
        </div>

        <div style={S.grid}>
          {SPOTIFY_TRACKS.map((item) => (
            <div key={item.id} style={S.card}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,240,255,0.4)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <p style={S.label}>▶ {item.label}</p>
              <iframe
                style={{ borderRadius: '0', border: 'none', display: 'block' }}
                src={`https://open.spotify.com/embed/playlist/3kuocs5XNiZeAJ3Y3Pfy84?utm_source=generator&theme=0`}
                width="100%"
                height={item.type === 'playlist' ? '352' : '152'}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={item.label}
              />
            </div>
          ))}

          
        </div>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--text-muted)',
          marginTop: '2rem',
          letterSpacing: '2px',
        }}>
          
        </p>
      </div>
    </section>
  );
}
