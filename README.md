# 🎧 DJ NEXO — Sitio Web Completo

Stack: **React + Vite** (frontend) + **Express.js** (backend)

## Estructura del proyecto

```
dj-web/
├── client/                  # React + Vite
│   ├── public/
│   │   └── gallery/        # 📷 Poné tus fotos acá
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── HeroSection.jsx
│       │   ├── AboutSection.jsx
│       │   ├── SpotifySection.jsx
│       │   ├── DatesSection.jsx
│       │   ├── GallerySection.jsx
│       │   └── Footer.jsx
│       └── pages/
│           ├── Home.jsx
│           ├── Contact.jsx
│           ├── AdminLogin.jsx
│           └── AdminPanel.jsx
├── server/
│   ├── index.js             # Express API
│   └── messages.json        # Base de datos (auto-generada)
└── package.json
```

## Instalación

```bash
# 1. Instalá dependencias
npm run install:all

# 2. Levantá ambos servidores juntos
npm install -g concurrently   # (una sola vez)
npm run dev

# O por separado:
npm run dev:server   # Terminal 1 → http://localhost:3001
npm run dev:client   # Terminal 2 → http://localhost:5173
```

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Home (Hero, Música, Fechas, Galería) |
| `/contacto` | Formulario de booking |
| `/admin` | Login del admin |
| `/admin/panel` | Panel privado con mensajes |

## ⚙️ Personalización rápida

### 1. Contraseña admin
Editá `server/index.js` línea 11:
```js
const ADMIN_PASSWORD = 'tu-nueva-contraseña';
```

### 2. Tu nombre de DJ
Buscá y reemplazá `NEXO` por tu nombre artístico en todos los archivos.

### 3. Spotify / SoundCloud
Editá `client/src/components/SpotifySection.jsx`:
```js
const SPOTIFY_TRACKS = [
  { type: 'track', id: 'TU_ID_DE_SPOTIFY', label: 'Mi track' },
  { type: 'playlist', id: 'TU_ID_DE_PLAYLIST', label: 'Mi playlist' },
];
```
Para obtener el ID: Spotify → Share → Copy Link → el ID es lo que está después de `/track/` o `/playlist/`

### 4. Fechas y eventos
Editá `client/src/components/DatesSection.jsx` → array `EVENTS`

### 5. Fotos de galería
1. Copiá tus fotos a `client/public/gallery/`
2. Editá `GallerySection.jsx` → cambiá `src: null` por `src: '/gallery/tu-foto.jpg'`

### 6. Foto de perfil (sección About)
Poné tu foto en `client/public/foto-dj.jpg` y descomentá el `<img>` en `AboutSection.jsx`

### 7. Redes sociales
Editá `client/src/components/Footer.jsx` → array `SOCIAL`

## API Endpoints (Express)

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/contact` | Envío del formulario |
| POST | `/api/admin/login` | Login admin |
| GET | `/api/admin/messages` | Ver todos los mensajes (protegido) |
| PATCH | `/api/admin/messages/:id/read` | Marcar como leído |
| DELETE | `/api/admin/messages/:id` | Eliminar mensaje |

## Producción (deploy)

Para deployar en producción:
1. Buildear el cliente: `npm run build`
2. Servir los archivos de `client/dist/` desde Express
3. O usar Vercel (frontend) + Railway/Render (backend)
