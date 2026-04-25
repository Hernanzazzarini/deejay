import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all' | 'unread'
  const navigate = useNavigate();

  const token = sessionStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/admin/messages', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        navigate('/admin');
        return;
      }
      const data = await res.json();
      setMessages(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const markRead = async (id) => {
    await fetch(`/api/admin/messages/${id}/read`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    });
    setMessages(ms => ms.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const deleteMsg = async (id) => {
    if (!confirm('¿Eliminar este mensaje?')) return;
    await fetch(`/api/admin/messages/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    setMessages(ms => ms.filter(m => m.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const handleSelect = (msg) => {
    setSelected(msg);
    if (!msg.read) markRead(msg.id);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const filtered = filter === 'unread' ? messages.filter(m => !m.read) : messages;
  const unreadCount = messages.filter(m => !m.read).length;

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('es-AR', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-mono)' }}>
      {/* Header */}
      <header style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            letterSpacing: '4px',
            color: 'var(--accent)',
          }}>NEXO</span>
          <span style={{
            fontSize: '0.6rem',
            letterSpacing: '3px',
            color: 'var(--text-muted)',
            paddingLeft: '1.5rem',
            borderLeft: '1px solid var(--border)',
          }}>PANEL ADMIN</span>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{
            fontSize: '0.65rem',
            letterSpacing: '2px',
            color: 'var(--accent2)',
          }}>
            {unreadCount > 0 ? `● ${unreadCount} sin leer` : '✓ Todo leído'}
          </span>
          <a href="/" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '2px' }}>
            Ver sitio →
          </a>
          <button
            onClick={handleLogout}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '2px',
              padding: '0.4rem 0.8rem',
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
              borderRadius: '2px',
              cursor: 'none',
            }}
          >
            Salir
          </button>
        </div>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '360px 1fr',
        height: 'calc(100vh - 57px)',
      }}>
        {/* List */}
        <div style={{
          borderRight: '1px solid var(--border)',
          overflowY: 'auto',
        }}>
          {/* Filter tabs */}
          <div style={{
            display: 'flex',
            gap: 0,
            borderBottom: '1px solid var(--border)',
            padding: '0.75rem 1rem',
            gap: '0.5rem',
          }}>
            {['all', 'unread'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '2px',
                  padding: '0.3rem 0.7rem',
                  background: filter === f ? 'var(--accent)' : 'transparent',
                  color: filter === f ? '#000' : 'var(--text-muted)',
                  border: `1px solid ${filter === f ? 'var(--accent)' : 'var(--border)'}`,
                  borderRadius: '2px',
                  cursor: 'none',
                  textTransform: 'uppercase',
                }}
              >
                {f === 'all' ? `Todos (${messages.length})` : `Sin leer (${unreadCount})`}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ padding: '2rem', color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '2px' }}>
              Cargando...
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: '2rem', color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '2px' }}>
              No hay mensajes
            </div>
          ) : (
            filtered.map(msg => (
              <div
                key={msg.id}
                onClick={() => handleSelect(msg)}
                style={{
                  padding: '1rem 1.2rem',
                  borderBottom: '1px solid var(--border)',
                  background: selected?.id === msg.id
                    ? 'rgba(0,240,255,0.06)'
                    : !msg.read ? 'rgba(255,0,144,0.04)' : 'transparent',
                  cursor: 'none',
                  transition: 'background 0.2s',
                  borderLeft: !msg.read ? '3px solid var(--accent2)' : '3px solid transparent',
                }}
                onMouseEnter={e => {
                  if (selected?.id !== msg.id) e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                }}
                onMouseLeave={e => {
                  if (selected?.id !== msg.id) {
                    e.currentTarget.style.background = !msg.read ? 'rgba(255,0,144,0.04)' : 'transparent';
                  }
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    color: !msg.read ? 'var(--text)' : 'var(--text-muted)',
                    fontWeight: !msg.read ? 700 : 400,
                  }}>{msg.name}</span>
                  {!msg.read && (
                    <span style={{
                      fontSize: '0.5rem',
                      color: 'var(--accent2)',
                      letterSpacing: '1px',
                    }}>NUEVO</span>
                  )}
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                  {msg.email}
                </div>
                <div style={{
                  fontSize: '0.65rem',
                  color: 'var(--text-muted)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {msg.message}
                </div>
                <div style={{ fontSize: '0.55rem', color: 'rgba(107,107,138,0.6)', marginTop: '0.5rem', letterSpacing: '1px' }}>
                  {formatDate(msg.date)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detail */}
        <div style={{ padding: '2rem', overflowY: 'auto' }}>
          {selected ? (
            <div style={{ maxWidth: '600px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '2rem',
                paddingBottom: '1.5rem',
                borderBottom: '1px solid var(--border)',
              }}>
                <div>
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.5rem',
                    color: 'var(--accent)',
                    letterSpacing: '2px',
                    lineHeight: 1,
                    marginBottom: '0.4rem',
                  }}>{selected.name}</h2>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>
                    {formatDate(selected.date)}
                  </p>
                </div>
                <button
                  onClick={() => deleteMsg(selected.id)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    letterSpacing: '2px',
                    padding: '0.4rem 0.8rem',
                    background: 'transparent',
                    border: '1px solid rgba(255,0,144,0.4)',
                    color: 'var(--accent2)',
                    borderRadius: '2px',
                    cursor: 'none',
                  }}
                >
                  ✕ Eliminar
                </button>
              </div>

              {/* Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                {[
                  { label: 'Email', val: selected.email },
                  { label: 'Teléfono', val: selected.phone || '—' },
                  { label: 'Tipo de evento', val: selected.eventType || '—' },
                  { label: 'Fecha del evento', val: selected.eventDate || '—' },
                ].map(({ label, val }) => (
                  <div key={label} style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '2px',
                    padding: '0.8rem 1rem',
                  }}>
                    <p style={{ fontSize: '0.55rem', color: 'var(--text-muted)', letterSpacing: '2px', marginBottom: '0.3rem' }}>
                      {label.toUpperCase()}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text)' }}>{val}</p>
                  </div>
                ))}
              </div>

              <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '2px',
                padding: '1.2rem',
              }}>
                <p style={{ fontSize: '0.55rem', color: 'var(--text-muted)', letterSpacing: '2px', marginBottom: '1rem' }}>
                  MENSAJE
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.8,
                  color: 'var(--text)',
                  fontFamily: 'var(--font-body)',
                }}>
                  {selected.message}
                </p>
              </div>

              <a
                href={`mailto:${selected.email}?subject=Re: Consulta DJ NEXO`}
                style={{
                  display: 'inline-block',
                  marginTop: '1.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '3px',
                  padding: '0.8rem 1.5rem',
                  background: 'var(--accent)',
                  color: '#000',
                  borderRadius: '2px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                ▶ Responder por email
              </a>
            </div>
          ) : (
            <div style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              gap: '1rem',
            }}>
              <span style={{ fontSize: '3rem', opacity: 0.2 }}>◉</span>
              <p style={{ fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase' }}>
                Seleccioná un mensaje
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
