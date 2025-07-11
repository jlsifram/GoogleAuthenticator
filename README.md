# Sistema de Login con Google OAuth

Una aplicación web completa con autenticación Google OAuth, construida con React y Express.js.

## Características

- ✅ Autenticación Google OAuth 2.0
- ✅ Dashboard de usuario protegido
- ✅ Gestión de sesiones segura
- ✅ Diseño moderno con Tailwind CSS
- ✅ TypeScript en frontend y backend
- ✅ API RESTful con Express.js

## Tecnologías

### Frontend
- React 18 con TypeScript
- Wouter para routing
- shadcn/ui para componentes
- Tailwind CSS para estilos
- TanStack Query para estado del servidor

### Backend
- Express.js con TypeScript
- Passport.js para autenticación
- Google OAuth 2.0 Strategy
- Sesiones con express-session
- Drizzle ORM para base de datos

## Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd google-oauth-login
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
Crear archivo `.env` en la raíz:
```env
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret
SESSION_SECRET=una_clave_secreta_aleatoria
NODE_ENV=development
```

4. **Configurar Google OAuth**
- Ve a [Google Cloud Console](https://console.cloud.google.com)
- Crea un proyecto nuevo o selecciona uno existente
- Activa la Google+ API
- Crea credenciales OAuth 2.0
- Agrega URLs autorizadas:
  - Origen: `http://localhost:5000`
  - Callback: `http://localhost:5000/api/auth/google/callback`

5. **Ejecutar la aplicación**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5000`

## Estructura del Proyecto

```
├── client/          # Frontend React
│   ├── src/
│   │   ├── components/  # Componentes UI
│   │   ├── pages/      # Páginas de la aplicación
│   │   ├── lib/        # Utilidades y configuración
│   │   └── hooks/      # Hooks personalizados
│   └── index.html
├── server/          # Backend Express
│   ├── index.ts     # Servidor principal
│   ├── routes.ts    # Rutas de autenticación
│   ├── storage.ts   # Almacenamiento en memoria
│   └── vite.ts      # Configuración de Vite
├── shared/          # Código compartido
│   └── schema.ts    # Esquemas de base de datos
└── package.json
```

## Rutas de la API

- `GET /api/auth/google` - Iniciar login con Google
- `GET /api/auth/google/callback` - Callback de Google OAuth
- `GET /api/auth/user` - Obtener usuario actual
- `POST /api/auth/logout` - Cerrar sesión
- `GET /api/dashboard/profile` - Datos del dashboard (protegido)

## Funcionalidades

### Página de Login
- Botón de autenticación con Google
- Manejo de errores de autenticación
- Redirección automática después del login

### Dashboard
- Información del perfil del usuario
- Estado de verificación del email
- Información de la sesión activa
- Botón de logout

### Demo
- Versión de demostración sin restricciones
- Simulación del flujo completo de autenticación

## Despliegue

Para producción, asegúrate de:

1. Configurar `NODE_ENV=production`
2. Usar HTTPS en las URLs de callback
3. Configurar un secreto de sesión seguro
4. Actualizar las URLs autorizadas en Google Cloud Console

## Licencia

MIT