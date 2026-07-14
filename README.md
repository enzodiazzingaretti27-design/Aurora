# Cecilia — Hospedajes

Sitio web para las dos casas de Cecilia. Página principal (`/`) con las dos propiedades, y una landing cinemática dedicada a cada una (`/aurora`, `/segunda-casa`).

Construido con:

- **Next.js App Router**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Lenis smooth scrolling**
- **Selector de idioma (en/es/pt)**

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir:

```text
http://localhost:3000
```

## Estructura

- `src/app/page.tsx` — hub con las dos propiedades.
- `src/app/[property]/page.tsx` — ruta dinámica que renderiza la landing de cada propiedad.
- `src/components/PropertyLanding.tsx` — la plantilla visual compartida (secciones, animaciones, selector de idioma).
- `src/data/properties/aurora.ts` — contenido real de Aurora (Mendoza).
- `src/data/properties/segunda-casa.ts` — contenido **placeholder/temporal** de la segunda casa (marcado con TODO). Reemplazar fotos, textos y ubicación cuando estén disponibles.
- `src/data/properties/index.ts` — registro de propiedades. Agregar una propiedad nueva es: crear su archivo de datos con el mismo shape (`PropertyData` en `src/types/property.ts`) y sumarlo acá.

## Editar contenido de una propiedad

Todo el contenido visible (textos en los 3 idiomas, imágenes, suites, ubicación) vive en el archivo de datos de esa propiedad dentro de `src/data/properties/`. No hace falta tocar el componente visual para cambiar textos o fotos.

**Importante:** cada propiedad tiene un campo `whatsappNumber` (solo dígitos, con código de país) que alimenta el formulario de consulta y el botón flotante de WhatsApp. Hoy es un número de ejemplo — reemplazalo por el real de Cecilia.

## Contacto: WhatsApp e inquiry form

Cada landing tiene un formulario de consulta (`src/components/InquiryForm.tsx`) y un botón flotante (`src/components/WhatsAppFloat.tsx`). No necesitan backend: al enviar, arman un mensaje pre-cargado y abren WhatsApp (`wa.me`) con los datos que cargó el visitante (nombre, fechas, personas, mensaje), traducido al idioma activo.

## Acceso al panel (login)

El panel está protegido con un login del lado del servidor:

- La ruta `/panel` está protegida por `src/proxy.ts` (la convención "middleware"
  de Next.js 16, ahora llamada **proxy**). Sin sesión válida, redirige a `/login`.
- Las credenciales viven en variables de entorno (`.env.local`, nunca en el
  código): `ADMIN_USER`, `ADMIN_PASSWORD` y `AUTH_SECRET`. Ver `.env.example`.
- Al iniciar sesión, `/api/login` valida la contraseña (comparación en tiempo
  constante) y emite una **cookie de sesión firmada con HMAC y httpOnly** que
  vence a las 12 h. `/api/logout` la borra. La lógica de firma está en
  `src/lib/auth.ts`.

**Primer uso / deploy:** copiá `.env.example` a `.env.local`, poné una contraseña
fuerte en `ADMIN_PASSWORD` y generá el `AUTH_SECRET` con
`node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"`.
En Vercel, cargá esas tres variables en la configuración del proyecto. Después de
cambiar el `.env.local` hay que reiniciar `npm run dev`.

El login tiene **rate limiting** (`src/lib/rateLimit.ts`): 5 intentos fallidos por
IP en 10 minutos y después devuelve 429. Es en memoria (por instancia del
servidor); para algo distribuido haría falta un store compartido (Redis/Upstash).
Pendiente para más adelante: credenciales por usuario cuando exista la base de datos.

## Panel de reservas (`/panel`)

Ya existe una primera versión del panel en `/panel`, funcionando con **datos de
ejemplo** (`src/data/reservations.ts`). Incluye:

- Calendario mensual por casa (o ambas juntas), con las reservas pintadas por
  color según la fuente: Airbnb, Booking o Directa.
- Filtro por propiedad y navegación entre meses.
- Registro en tabla con entrada/salida, noches, huésped, teléfono, monto y notas.
  Las reservas sin datos de huésped aparecen marcadas como "A completar".

Archivos clave: `src/app/panel/page.tsx`, `src/components/ReservationCalendar.tsx`,
`src/types/reservation.ts`, `src/lib/dates.ts`.

### Próximo paso (sincronización real)

Todavía pendiente, para cuando Cecilia tenga los links iCal:

- Cada propiedad tendrá 2 links iCal (export calendar de Airbnb y de Booking.com).
- Un endpoint de sincronización parsea esos iCal y guarda las reservas en una base
  de datos (upsert por id externo, sin pisar los datos cargados a mano).
- Proteger `/panel` con contraseña y permitir **editar** los datos de cada huésped
  (nombre, teléfono, monto) — hoy el registro es de solo lectura.

## Build de producción

```bash
npm run build
npm run start
```

## Deploy

Recomendado: **Vercel**.
