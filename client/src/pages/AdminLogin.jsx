import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!password) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem('adminToken', data.token);
        navigate('/admin/panel');
      } else {
        setError('Contraseña incorrecta');
      }
    } catch {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-mono)',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '2rem',
      }}>
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          padding: '2.5rem',
        }}>
          <p style={{
            fontSize: '0.6rem',
            letterSpacing: '4px',
            color: 'var(--text-muted)',
            marginBottom: '0.5rem',
          }}>SISTEMA</p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.5rem',
            letterSpacing: '4px',
            color: 'var(--accent)',
            marginBottom: '2rem',
          }}>ADMIN</h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label style={{
              fontSize: '0.65rem',
              letterSpacing: '2px',
              color: 'var(--text-muted)',
            }}>CONTRASEÑA</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="••••••••"
              style={{
                background: 'var(--surface2)',
                border: `1px solid ${error ? 'var(--accent2)' : 'var(--border)'}`,
                borderRadius: '2px',
                padding: '0.85rem 1rem',
                color: 'var(--text)',
                fontFamily: 'var(--font-mono)',
                fontSize: '1rem',
                outline: 'none',
                letterSpacing: '4px',
              }}
            />

            {error && (
              <p style={{
                fontSize: '0.65rem',
                letterSpacing: '2px',
                color: 'var(--accent2)',
              }}>⚠ {error}</p>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '3px',
                padding: '0.85rem',
                background: 'var(--accent)',
                color: '#000',
                border: 'none',
                borderRadius: '2px',
                fontWeight: 700,
                cursor: 'none',
                marginTop: '0.5rem',
              }}
            >
              {loading ? '...' : '▶ INGRESAR'}
            </button>
          </div>

          <div style={{
            marginTop: '2rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border)',
          }}>
            <a href="/" style={{
              fontSize: '0.6rem',
              letterSpacing: '2px',
              color: 'var(--text-muted)',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--accent)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
            >
              ← Volver al sitio
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
