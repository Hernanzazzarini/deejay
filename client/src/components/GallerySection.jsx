// ⚙️ Para usar tus fotos reales:
// 1. Poné las imágenes en /client/public/gallery/
// 2. Reemplazá las URLs con: src: '/gallery/foto1.jpg'

const PHOTOS = [
  { id: 1, src: 'https://res.cloudinary.com/dhayjfkli/image/upload/v1777148344/hernan_gjo5qq.jpg', span: 2 },
  { id: 2, src: 'https://res.cloudinary.com/dhayjfkli/image/upload/v1777154914/WhatsApp_Image_2026-04-25_at_15.41.01_xb6nql.jpg', span: 1 },
  { id: 3, src: 'https://res.cloudinary.com/dhayjfkli/image/upload/v1777154910/WhatsApp_Image_2026-04-25_at_15.40.57_fno8lz.jpg', span: 1 },
  { id: 4, src: 'https://res.cloudinary.com/dhayjfkli/image/upload/v1777154910/WhatsApp_Image_2026-04-25_at_15.41.02_1_wo0muz.jpg', span: 1 },
  { id: 5, src: 'https://res.cloudinary.com/dhayjfkli/image/upload/v1777154908/WhatsApp_Image_2026-04-25_at_15.41.00_wteipe.jpg', span: 2 },
  { id: 6, src: 'https://res.cloudinary.com/dhayjfkli/image/upload/v1777154899/WhatsApp_Image_2026-04-25_at_15.40.52_ic2fkt.jpg', span: 1 },
];

function PhotoCard({ photo }) {
  const colors = [
    'rgba(0,240,255,0.08)',
    'rgba(255,0,144,0.08)',
    'rgba(123,0,255,0.08)',
  ];
  const bg = colors[photo.id % 3];

  return (
    <div
      style={{
        gridColumn: `span ${photo.span}`,
        position: 'relative',
        aspectRatio: photo.span === 2 ? '2/1' : '1/1',
        background: `${bg}, var(--surface2)`,
        border: '1px solid var(--border)',
        borderRadius: '4px',
        overflow: 'hidden',
        transition: 'all 0.4s ease',
        cursor: 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(0,240,255,0.4)';
        e.currentTarget.style.transform = 'scale(1.01)';
        e.currentTarget.querySelector('.overlay').style.opacity = '1';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.querySelector('.overlay').style.opacity = '0';
      }}
    >
      {photo.src ? (
        <img
          src={photo.src}
          alt={photo.label}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
        }}>
          <span style={{ fontSize: '3rem', opacity: 0.3 }}>📷</span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: 'var(--text-muted)',
            letterSpacing: '2px',
          }}>TU FOTO ACÁ</span>
        </div>
      )}

      {/* Hover overlay */}
      <div
        className="overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '1rem',
          opacity: 0,
          transition: 'opacity 0.3s',
        }}
      >
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '2px',
          color: 'var(--accent)',
        }}>{photo.label}</p>
      </div>

      {/* Corner accent */}
      <div style={{
        position: 'absolute',
        top: '0.75rem',
        left: '0.75rem',
        width: '20px',
        height: '20px',
        borderTop: '1px solid rgba(0,240,255,0.4)',
        borderLeft: '1px solid rgba(0,240,255,0.4)',
      }} />
    </div>
  );
}

export default function GallerySection() {
  return (
    <section id="galeria" style={{ padding: '7rem 3rem', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '4px',
            color: 'var(--accent)',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}>// galería</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 4vw, 4rem)',
          }}>
            Momentos <span style={{ color: 'var(--accent2)' }}>en vivo</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
        }}>
          {PHOTOS.map(photo => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </div>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--text-muted)',
          marginTop: '1.5rem',
          letterSpacing: '2px',
        }}>
        
        </p>
      </div>
    </section>
  );
}
