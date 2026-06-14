# Unitrack Pro — Despliegue de funciones serverless y pruebas

Este README contiene instrucciones paso a paso para desplegar las funciones serverless (Vercel), configurar las variables de entorno necesarias para Supabase y Resend, ejecutar el frontend localmente y verificar el flujo de registro → creación de usuario → inserción en tabla → envío de correo → inicio de sesión automático.

---

## Prerrequisitos
- Node.js (v18+ recomendado)
- npm
- Cuenta en Vercel (para desplegar funciones/serverless)
- Proyecto Supabase con:
	- Auth habilitado
	- Tabla `estudiantes` (ver SQL abajo)
	- Service Role Key (desde Settings → API)
- Cuenta en Resend (opcional, para envío de correos)

---

## Archivos relevantes
- Backend serverless:
	- `api/register-student.ts`
	- `api/send-email.ts`
- Frontend:
	- `src/app/components/registro-estudiante/registro-estudiante.component.ts`
	- `src/app/services/supabase.service.ts`
	- `src/app/shared/toast.service.ts` / `toast.component.ts`
- Datos compartidos:
	- `src/app/data/ubicaciones.ts`
	- `src/app/data/facultades.ts`

---

## Variables de entorno (Vercel)
Configura estas variables en Vercel → Project → Settings → Environment Variables (Preview + Production):

- `SUPABASE_URL` — URL de tu proyecto Supabase (ej. `https://xyz.supabase.co`)
- `SUPABASE_SERVICE_ROLE_KEY` — Service Role Key (secreta). USAR SOLO EN BACKEND.
- `SUPABASE_ANON_KEY` — anon/public key (usada por el backend para pedir token grant) y por el frontend para auth.
- `RESEND_API_KEY` — clave de Resend (opcional) para enviar correos.

IMPORTANTE: ¡NO expongas `SUPABASE_SERVICE_ROLE_KEY` en el frontend ni lo subas al repositorio!

---

## SQL (crear tabla `estudiantes` si hace falta)
Ejecuta en SQL Editor de Supabase:

```sql
create table if not exists estudiantes (
	id uuid default gen_random_uuid() primary key,
	nombres text,
	apellidos text,
	correo text unique,
	telefono text,
	facultad text,
	carrera text,
	sede text,
	jornada text,
	created_at timestamptz default now()
);
```

---

## Despliegue en Vercel (rápido)
Desde la raíz del repo (donde está `api/` y `frontend/`):

```bash
# Si usas la CLI por primera vez
npx vercel login

# Desplegar preview (sigue el asistente)


# Desplegar a producción
npx vercel --prod
```

Después del deploy, en Vercel → Functions → revisa los logs de `register-student` y `send-email` si hay errores.

---

## Ejecutar en local (opción: `vercel dev`)
Puedes probar las serverless locally usando `vercel dev` y arrancar el frontend con `npm start`:

```bash
# instalar dependencias front
cd frontend
npm install

# (opcional) instalar Playwright para E2E
npx playwright install

# levantar servidor de funciones localmente y proxys
npx vercel dev

# en otra terminal: arrancar frontend Angular
cd frontend
npm start
```

Con `vercel dev` las funciones estarán disponibles en `http://localhost:3000` (o el puerto que muestre la CLI). Asegúrate de tener un archivo `.env.local` con las claves para pruebas locales (NO subirlo al repo).

Contenido ejemplo `.env.local` (NO incluir en repo):

```
SUPABASE_URL=https://xyz.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxxxx
SUPABASE_ANON_KEY=yyyyy
RESEND_API_KEY=zzzzz
```

---

## Probar el endpoint manualmente
Tras desplegar (o con `vercel dev`) puedes probar con curl:

```bash
curl -X POST https://<TU_DOMINIO>/api/register-student \
	-H "Content-Type: application/json" \
	-d '{
		"profile": {
			"nombres":"Juan",
			"apellidos":"Perez",
			"correo":"juan.perez@example.com",
			"telefono":"+502 5555-5555",
			"facultad":"Ingeniería",
			"carrera":"Ingeniería en Sistemas",
			"sede":"Campus Central",
			"jornada":"Diurna"
		},
		"password": "Pass1234"
	}'
```

Respuesta esperada: JSON con `ok: true`, el `inserted` (fila insertada) y `session` si `SUPABASE_ANON_KEY` está configurada.

---

## Flujo de verificación desde el frontend
1. Arranca el frontend (`cd frontend && npm start`).
2. Abre `http://localhost:4200/registro`.
3. Completa el formulario y envía.
4. Comprobaciones:
	 - En Supabase → Auth → Users: debe aparecer el nuevo usuario.
	 - En Supabase → Table Editor → `estudiantes`: debe aparecer la fila insertada.
	 - Si `RESEND_API_KEY` configurado: se enviará un correo de bienvenida.
	 - El frontend debe recibir `session.access_token` devuelto por la función y almacenarlo en `localStorage` (inicia sesión automáticamente).

---

## Ejecutar E2E (Playwright)
Si quieres ejecutar el E2E básico que añadimos:

```bash
cd frontend
npm install
npx playwright install
npm run e2e
```

Asegúrate de que el frontend esté corriendo en `http://localhost:4200` o ajustar `e2e/playwright.config.ts`.

---

## Logs y debugging
- Vercel Dashboard → Functions → Logs — revisa errores runtime y salida de `console.error`.
- Supabase → Authentication → Logs — revisar errores de creación de usuario.
- Si recibes errores de unique constraint al insertar `estudiantes`, elimina/ajusta registros de prueba o maneja el conflicto en la función.

---

## Buenas prácticas de seguridad
- Mantén `SUPABASE_SERVICE_ROLE_KEY` únicamente en variables de entorno del servidor (Vercel). Nunca en el frontend.
- Considera habilitar RLS (Row Level Security) y políticas estrictas en la tabla `estudiantes` si luego vas a exponer APIs public.
- Rotar keys periódicamente y revocar las que no uses.

---

## Contacto
Si quieres, puedo:
- Ejecutar la prueba E2E local aquí (instalar Playwright y correr tests) — dime si me autorizas a instalar dependencias en el entorno.
- Ayudarte a desplegar paso a paso usando `npx vercel` desde aquí (si me das permiso para ejecutar comandos).

---

Archivo creado por el asistente — ajusta valores y ejemplos según tu entorno antes de ejecutar en producción.
