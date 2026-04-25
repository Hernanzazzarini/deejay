import { useState } from 'react';

const EVENT_TYPES = [
  'Club Night',
  'Festival',
  'Evento privado',
  'Casamiento',
  'Cumpleaños',
  'Corporativo',
  'Otro',
];

const inputStyle = {
  width: '100%',
  background: 'var(--surface2)',
  border: '1px solid var(--border)',
  borderRadius: '2px',
  padding: '0.85rem 1rem',
  color: 'var(--text)',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.8rem',
  outline: 'none',
  transition: 'border-color 0.2s',
};

function Field({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        letterSpacing: '2px',
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
      }}>{label}</label>
      {children}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', eventType: '', eventDate: '', message: '',
  });
  const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setStatus('error-fields');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', eventType: '', eventDate: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const dynInput = (name) => ({
    ...inputStyle,
    borderColor: focused === name ? 'var(--accent)' : 'var(--border)',
  });

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '70px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 3rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: '6rem',
          alignItems: 'start',
        }}>
          {/* Left info */}
          <div>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '4px',
              color: 'var(--accent2)',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}>// booking</p>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 5vw, 5.5rem)',
              lineHeight: 0.95,
              marginBottom: '2rem',
            }}>
              Formulario<br />
              <span style={{ color: 'var(--accent)' }}>de contacto</span>
            </h1>

            <p style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--text-muted)',
              lineHeight: 1.9,
              fontSize: '0.95rem',
              marginBottom: '3rem',
            }}>
              Completá el formulario y me comunico con vos a la brevedad.
              
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { icon: '◉', title: 'Tiempo de respuesta', desc: '24-48 horas hábiles' },
                
              ].map(({ icon, title, desc }) => (
                <div key={title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--accent)',
                    fontSize: '1rem',
                    marginTop: '2px',
                  }}>{icon}</span>
                  <div>
                    <p style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      letterSpacing: '1px',
                      marginBottom: '0.2rem',
                    }}>{title}</p>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      color: 'var(--text-muted)',
                    }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            padding: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '3px',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '1rem',
              marginBottom: '0.5rem',
            }}>FORMULARIO DE CONTACTO</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Field label="Nombre *">
                <input
                  type="text"
                  name="name"
                  placeholder="Tu nombre"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  style={dynInput('name')}
                />
              </Field>

              <Field label="Email *">
                <input
                  type="email"
                  name="email"
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  style={dynInput('email')}
                />
              </Field>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Field label="Teléfono">
                <input
                  type="tel"
                  name="phone"
                  placeholder="+54 9 ..."
                  value={form.phone}
                  onChange={handleChange}
                  onFocus={() => setFocused('phone')}
                  onBlur={() => setFocused(null)}
                  style={dynInput('phone')}
                />
              </Field>

              <Field label="Fecha del evento">
                <input
                  type="date"
                  name="eventDate"
                  value={form.eventDate}
                  onChange={handleChange}
                  onFocus={() => setFocused('eventDate')}
                  onBlur={() => setFocused(null)}
                  style={{ ...dynInput('eventDate'), colorScheme: 'dark' }}
                />
              </Field>
            </div>

            <Field label="Tipo de evento">
              <select
                name="eventType"
                value={form.eventType}
                onChange={handleChange}
                onFocus={() => setFocused('eventType')}
                onBlur={() => setFocused(null)}
                style={{ ...dynInput('eventType'), cursor: 'none' }}
              >
                <option value="">Seleccioná una opción</option>
                {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>

            <Field label="Mensaje *">
              <textarea
                name="message"
                placeholder="Contame sobre tu evento: lugar, capacidad, horario, estilo de música..."
                value={form.message}
                onChange={handleChange}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                rows={5}
                style={{ ...dynInput('message'), resize: 'vertical' }}
              />
            </Field>

            {/* Status messages */}
            {status === 'success' && (
              <div style={{
                background: 'rgba(0,240,255,0.08)',
                border: '1px solid rgba(0,240,255,0.3)',
                borderRadius: '2px',
                padding: '1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--accent)',
                letterSpacing: '1px',
              }}>
                ✓ Mensaje enviado. Te respondo pronto!
              </div>
            )}

            {(status === 'error' || status === 'error-fields') && (
              <div style={{
                background: 'rgba(255,0,144,0.08)',
                border: '1px solid rgba(255,0,144,0.3)',
                borderRadius: '2px',
                padding: '1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--accent2)',
                letterSpacing: '1px',
              }}>
                {status === 'error-fields'
                  ? '⚠ Completá nombre, email y mensaje.'
                  : '⚠ Error al enviar. Intentá de nuevo.'}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={status === 'loading'}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                padding: '1rem 2rem',
                background: status === 'loading' ? 'rgba(0,240,255,0.3)' : 'var(--accent)',
                color: '#000',
                border: 'none',
                borderRadius: '2px',
                fontWeight: 700,
                cursor: status === 'loading' ? 'default' : 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { if (status !== 'loading') e.target.style.transform = 'scale(1.02)'; }}
              onMouseLeave={e => e.target.style.transform = 'scale(1)'}
            >
              {status === 'loading' ? '■ Enviando...' : '▶ Enviar consulta'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
