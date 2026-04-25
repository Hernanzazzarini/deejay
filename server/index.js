import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;
const DB_FILE = join(__dirname, 'messages.json');
const ADMIN_PASSWORD = 'dj2024admin'; // Cambiá esta contraseña

app.use(cors());
app.use(express.json());

// Init DB file if not exists
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

const readMessages = () => {
  const data = fs.readFileSync(DB_FILE, 'utf-8');
  return JSON.parse(data);
};

const saveMessages = (messages) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(messages, null, 2));
};

// POST /api/contact - Submit contact form
app.post('/api/contact', (req, res) => {
  const { name, email, phone, eventType, eventDate, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Campos requeridos incompletos' });
  }

  const newMessage = {
    id: Date.now(),
    name,
    email,
    phone: phone || '',
    eventType: eventType || '',
    eventDate: eventDate || '',
    message,
    date: new Date().toISOString(),
    read: false,
  };

  const messages = readMessages();
  messages.unshift(newMessage);
  saveMessages(messages);

  res.json({ success: true, message: 'Consulta enviada con éxito' });
});

// POST /api/admin/login - Admin login
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true, token: 'admin-authenticated' });
  } else {
    res.status(401).json({ error: 'Contraseña incorrecta' });
  }
});

// GET /api/admin/messages - Get all messages (protected)
app.get('/api/admin/messages', (req, res) => {
  const token = req.headers.authorization;
  if (token !== 'Bearer admin-authenticated') {
    return res.status(401).json({ error: 'No autorizado' });
  }
  const messages = readMessages();
  res.json(messages);
});

// PATCH /api/admin/messages/:id/read - Mark as read
app.patch('/api/admin/messages/:id/read', (req, res) => {
  const token = req.headers.authorization;
  if (token !== 'Bearer admin-authenticated') {
    return res.status(401).json({ error: 'No autorizado' });
  }
  const messages = readMessages();
  const msg = messages.find((m) => m.id === parseInt(req.params.id));
  if (msg) {
    msg.read = true;
    saveMessages(messages);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Mensaje no encontrado' });
  }
});

// DELETE /api/admin/messages/:id - Delete message
app.delete('/api/admin/messages/:id', (req, res) => {
  const token = req.headers.authorization;
  if (token !== 'Bearer admin-authenticated') {
    return res.status(401).json({ error: 'No autorizado' });
  }
  let messages = readMessages();
  messages = messages.filter((m) => m.id !== parseInt(req.params.id));
  saveMessages(messages);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
