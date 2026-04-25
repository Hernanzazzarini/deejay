import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function WaveformCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const bars = 80;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barW = canvas.width / bars;
      const cx = canvas.height / 2;

      for (let i = 0; i < bars; i++) {
        const x = i * barW;
        const freq1 = Math.sin(i * 0.15 + time * 2) * 0.5 + 0.5;
        const freq2 = Math.sin(i * 0.08 + time * 1.3 + 1) * 0.3 + 0.3;
        const freq3 = Math.sin(i * 0.25 + time * 0.8 + 2) * 0.2 + 0.2;
        const h = (freq1 + freq2 + freq3) * cx * 0.85;

        const grad = ctx.createLinearGradient(x, cx - h, x, cx + h);
        grad.addColorStop(0, 'rgba(255, 0, 144, 0.9)');
        grad.addColorStop(0.5, 'rgba(0, 240, 255, 0.8)');
        grad.addColorStop(1, 'rgba(123, 0, 255, 0.9)');

        ctx.fillStyle = grad;
        ctx.fillRect(x + 1, cx - h, barW - 2, h * 2);
      }
      time += 0.008;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '120px',
        opacity: 0.6,
      }}
    />
  );
}

export default function HeroSection() {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse at 20% 50%, rgba(123,0,255,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(0,240,255,0.1) 0%, transparent 50%)',
    }}>
      {/* Grid background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,240,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,240,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Scan line */}
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.3), transparent)',
        animation: 'scan 4s linear infinite',
        zIndex: 1,
      }} />

      <div style={{
        position: 'relative',
        zIndex: 2,
        padding: '0 3rem',
        maxWidth: '900px',
        marginTop: '70px',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          letterSpacing: '4px',
          color: 'var(--accent)',
          marginBottom: '1.5rem',
          opacity: 0,
          animation: 'fadeUp 0.6s ease 0.2s forwards',
        }}>
          ▶ ELECTRONIC MUSIC / PROGRESSIVE
        </p>

        {/* Glitch title */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(5rem, 15vw, 13rem)',
          lineHeight: 0.9,
          letterSpacing: '-2px',
          color: 'var(--text)',
          position: 'relative',
          opacity: 0,
          animation: 'fadeUp 0.6s ease 0.4s forwards',
        }}>
          <span style={{ display: 'block' }}>DJ</span>
          <span style={{
            display: 'block',
            color: 'var(--accent)',
            textShadow: '0 0 30px rgba(0,240,255,0.5)',
          }}>Z@zz</span>
        </h1>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.9rem',
          color: 'var(--text-muted)',
          marginTop: '2rem',
          maxWidth: '500px',
          lineHeight: 1.7,
          opacity: 0,
          animation: 'fadeUp 0.6s ease 0.6s forwards',
        }}>
          Productor-Dj de musica electronica,<br />
          Proximamente musica disponible.
        </p>

        <div style={{
          display: 'flex',
          gap: '1rem',
          marginTop: '2.5rem',
          opacity: 0,
          animation: 'fadeUp 0.6s ease 0.8s forwards',
        }}>
          <Link to="/contacto">
            <button style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              padding: '1rem 2.5rem',
              background: 'var(--accent)',
              color: '#000',
              border: 'none',
              borderRadius: '2px',
              fontWeight: 700,
              animation: 'pulse-glow 2s ease infinite',
              cursor: 'none',
              transition: 'transform 0.2s',
            }}
              onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.target.style.transform = 'scale(1)'}
            >
              Contratar
            </button>
          </Link>
          <a href="#music">
            <button style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              padding: '1rem 2.5rem',
              background: 'transparent',
              color: 'var(--text)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '2px',
              cursor: 'none',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => {
                e.target.style.borderColor = 'var(--accent)';
                e.target.style.color = 'var(--accent)';
              }}
              onMouseLeave={e => {
                e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                e.target.style.color = 'var(--text)';
              }}
            >
              Escuchar
            </button>
          </a>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex',
          gap: '3rem',
          marginTop: '4rem',
          opacity: 0,
          animation: 'fadeUp 0.6s ease 1s forwards',
        }}>
          {[
            { num: 'MUSIC', label: 'En linea' },
            { num: 'eventos', label: 'GENERALES' },
            
          ].map(({ num, label }) => (
            <div key={label}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.5rem',
                color: 'var(--accent)',
                lineHeight: 1,
              }}>{num}</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--text-muted)',
                letterSpacing: '2px',
                marginTop: '0.3rem',
              }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Vertical text */}
      <div style={{
        position: 'absolute',
        right: '2rem',
        top: '50%',
        transform: 'translateY(-50%) rotate(90deg)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        letterSpacing: '4px',
        color: 'var(--text-muted)',
        whiteSpace: 'nowrap',
      }}>
        SCROLL DOWN ▼
      </div>

      <WaveformCanvas />
    </section>
  );
}
