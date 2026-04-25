import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    padding: '0 2rem',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'all 0.3s ease',
  },
  navScrolled: {
    background: 'rgba(3, 3, 5, 0.95)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(0, 240, 255, 0.1)',
  },
  logo: {
    fontFamily: 'var(--font-display)',
    fontSize: '2rem',
    letterSpacing: '4px',
    color: 'var(--accent)',
    textShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
  },
  links: {
    display: 'flex',
    gap: '2.5rem',
    listStyle: 'none',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    letterSpacing: '2px',
  },
  link: {
    color: 'var(--text-muted)',
    transition: 'color 0.2s',
    textTransform: 'uppercase',
  },
  linkActive: {
    color: 'var(--accent)',
  },
  contactBtn: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.7rem',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    padding: '0.5rem 1.2rem',
    border: '1px solid var(--accent2)',
    color: 'var(--accent2)',
    background: 'transparent',
    borderRadius: '2px',
    transition: 'all 0.2s',
    cursor: 'none',
  },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navStyle = { ...styles.nav, ...(scrolled ? styles.navScrolled : {}) };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={navStyle}>
      <Link to="/" style={styles.logo}>djz@zza</Link>
      <ul style={styles.links}>
        {[
          { path: '/', label: 'Inicio' },
          { path: '/#music', label: 'Música' },
          
          { path: '/#galeria', label: 'Galería' },
        ].map(({ path, label }) => (
          <li key={path}>
            <a
              href={path}
              style={{
                ...styles.link,
                ...(isActive(path) ? styles.linkActive : {}),
              }}
              onMouseEnter={e => e.target.style.color = 'var(--accent)'}
              onMouseLeave={e => e.target.style.color = isActive(path) ? 'var(--accent)' : 'var(--text-muted)'}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      <Link to="/contacto">
        <button
          style={styles.contactBtn}
          onMouseEnter={e => {
            e.target.style.background = 'var(--accent2)';
            e.target.style.color = '#000';
          }}
          onMouseLeave={e => {
            e.target.style.background = 'transparent';
            e.target.style.color = 'var(--accent2)';
          }}
        >
          Booking
        </button>
      </Link>
    </nav>
  );
}
