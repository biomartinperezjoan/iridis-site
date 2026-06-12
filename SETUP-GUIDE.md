# Iridis — guía paso a paso: dominio, hosting y puesta en marcha

Esta guía cubre todo el camino desde "tengo el proyecto en un zip" hasta
"la web está online con dominio propio y el editor funcionando en /admin".

Tiempo total de trabajo activo: 1-2 horas. Tiempo total con esperas (DNS,
emails de invitación): hasta 24-48h, pero la web puede estar visible
(en una URL temporal de Netlify) en los primeros 15 minutos.

No hace falta tocar la terminal/consola en ningún paso — todo se hace desde
páginas web.

---

## Paso 0 · Antes de empezar

Necesitaréis:
- Un email que vaya a usar uno de los 3 como "responsable técnico" (para las
  cuentas de GitHub/Netlify/registrador — luego se invita a los otros dos)
- Una tarjeta de crédito/débito (solo para el dominio, ~10-15€/año; el
  hosting es gratuito)
- El proyecto que os pasé (`iridis-site.zip`), descomprimido en una carpeta
  en vuestro ordenador

---

## Paso 1 · Comprar el dominio

1. Id a un registrador. Recomendados:
   - **Cloudflare Registrar** (cloudflare.com) — el más barato, sin
     "ofertas" engañosas, precio de renovación = precio de compra
   - **Namecheap** (namecheap.com) — muy popular, interfaz sencilla
   - **IONOS** (ionos.es) — válido si ya conocéis la plataforma, pero
     revisad el precio de renovación (suele subir mucho el 2º año)

2. Buscad el nombre. `iridis.com` probablemente esté ocupado. Alternativas
   a probar: `iridis.science`, `iridis.io`, `iridiswriting.com`,
   `iridis.es`, `getiridis.com`

3. Comprad **solo el dominio** — declinad cualquier hosting, email o
   "protección de privacidad de pago" que os intenten vender en el checkout
   (la privacidad WHOIS suele venir gratis ya).

4. Guardad las credenciales de acceso a esta cuenta — las necesitaréis en
   el Paso 4.

✅ **Resultado de este paso:** sois propietarios de `vuestrodominio.com`,
pero todavía no apunta a nada.

---

## Paso 2 · Crear una cuenta de GitHub y subir el proyecto

GitHub es donde vive el código del proyecto. Netlify lo lee de ahí para
construir la web — y el editor (`/admin`) también escribe ahí cuando
alguien publica un post o edita el About.

1. Id a **github.com** → Sign up → crear cuenta gratuita (con el email del
   responsable técnico)

2. Una vez dentro, arriba a la derecha pulsad el icono **+** → **New
   repository**

3. Nombre del repositorio: `iridis-site` (o el que prefiráis). Dejadlo
   **Public** o **Private** — ambos funcionan igual con Netlify, Private es
   más discreto. Pulsad **Create repository**

4. En la página del repo recién creado, buscad el enlace **"uploading an
   existing file"** (aparece en el mensaje de bienvenida del repo vacío)

5. Arrastrad **todo el contenido** de la carpeta `iridis-site` (no la
   carpeta en sí, sino lo que hay dentro: `src/`, `admin/`, `package.json`,
   `.eleventy.js`, `netlify.toml`, `README.md`, `.gitignore`...) a la zona
   de subida

   ⚠️ Si GitHub se queja de "too many files" al arrastrar todo junto,
   subidlo en 2-3 tandas (por ejemplo: primero `src/`, luego el resto)

6. Abajo, en "Commit changes", dejad el mensaje por defecto y pulsad
   **Commit changes**

✅ **Resultado de este paso:** el código está en
`github.com/vuestro-usuario/iridis-site`

---

## Paso 3 · Conectar con Netlify y publicar

1. Id a **netlify.com** → Sign up → elegid **"Sign up with GitHub"** (más
   fácil, conecta las dos cuentas automáticamente)

2. En el panel de Netlify: **Add new site** → **Import an existing
   project** → **Deploy with GitHub**

3. Autorizad a Netlify a acceder a vuestros repos (o solo al repo
   `iridis-site`, si os da esa opción)

4. Seleccionad el repositorio `iridis-site`

5. Netlify detectará automáticamente la configuración (está en
   `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `_site`

   No cambiéis nada, pulsad **Deploy site**

6. Esperad 1-2 minutos. Cuando termine, Netlify os da una URL del tipo
   `nombre-aleatorio-12345.netlify.app` — **abridla y comprobad que la web
   carga bien**

✅ **Resultado de este paso:** la web está online (en una URL provisional
de Netlify). Cualquier cambio que subáis a GitHub a partir de ahora se
publica solo en 1-2 minutos.

---

## Paso 4 · Apuntar vuestro dominio a la web

1. En Netlify: dentro del sitio → **Site configuration** → **Domain
   management** → **Add a domain**

2. Escribid vuestro dominio (`vuestrodominio.com`) → Netlify os mostrará
   las instrucciones DNS exactas. Normalmente es uno de estos dos métodos:

   **Opción A (la más simple): cambiar los nameservers**
   Netlify os da 4 nameservers (tipo `dns1.p01.nsone.net`). Vais a vuestro
   registrador (Paso 1) → configuración DNS del dominio → sustituís los
   nameservers actuales por los 4 que da Netlify.

   **Opción B: añadir registros sueltos**
   Si no queréis mover los nameservers, Netlify también os da un registro
   tipo `A` (o `ALIAS`/`CNAME`) que añadís en el panel DNS de vuestro
   registrador, sin tocar los nameservers.

   Cualquiera de las dos vale — la A es más rápida de configurar si no
   queréis perder otros servicios que ya dependan del DNS actual (como el
   email, si ya tenéis uno).

3. Guardad. La propagación tarda entre 10 minutos y 24h (normalmente
   bastante menos).

4. Netlify activa automáticamente el **certificado HTTPS** (candado en el
   navegador) en cuanto detecta el DNS correcto — no hay que hacer nada más.

✅ **Resultado de este paso:** `vuestrodominio.com` muestra la web, con
HTTPS.

---

## Paso 5 · Activar el editor (`/admin`)

Esto es lo que permite que los 3 entréis a `vuestrodominio.com/admin` con
login y editor visual (blog + página About, según lo montado).

1. En Netlify: dentro del sitio → **Identity** → pulsad **Enable Identity**

2. Bajad a **Registration** → cambiad a **Invite only** (para que nadie más
   pueda crear una cuenta)

3. Bajad a **Services** → **Git Gateway** → **Enable Git Gateway** (esto
   permite que el editor guarde cambios en GitHub sin que cada persona
   necesite su propia cuenta de GitHub)

4. Arriba, pestaña **Identity** → **Invite users** → escribid los emails de
   los 3 → enviar invitación

5. Cada uno recibirá un email ("You've been invited to join...") → al
   pulsar el enlace, le pedirá crear una contraseña → con eso ya puede
   entrar en `vuestrodominio.com/admin`

✅ **Resultado de este paso:** los 3 podéis entrar en `/admin`, ver el
editor de posts del blog y de la página About, y publicar cambios sin
tocar código. Cada publicación tarda ~30-60s en aparecer en la web (Netlify
reconstruye solo).

---

## Paso 6 · Activar el formulario de contacto

El formulario de la web ahora mismo es solo visual. Para que los mensajes
lleguen a un email real, la opción más simple con Netlify:

1. Cuando tengáis margen, decidme y os añado al HTML del formulario el
   atributo que activa **Netlify Forms** (`data-netlify="true"` + un campo
   oculto) — es un cambio de 2 líneas

2. Tras el siguiente deploy, en Netlify → **Forms** veréis las
   submissions, y podéis configurar que cada una os llegue por email a
   `hola@vuestrodominio.com` (o a un Gmail temporal, si todavía no tenéis
   email corporativo)

---

## Paso 7 · Email corporativo (opcional, cuando queráis)

Para tener `hola@vuestrodominio.com`:

- **Zoho Mail** (zoho.com/mail) — plan gratuito hasta 5 usuarios con
  dominio propio. Solo hay que añadir unos registros MX en el DNS del
  dominio (Zoho os da las instrucciones exactas).
- **Google Workspace** — de pago (~6€/usuario/mes), pero si ya usáis
  Gmail/Drive/Calendar a diario, vale la pena por la integración.

Este paso no bloquea nada de lo anterior — se puede hacer en cualquier
momento.

---

## Resumen del orden y tiempos

| Paso | Qué | Tiempo activo | Espera |
|---|---|---|---|
| 1 | Comprar dominio | 10 min | — |
| 2 | Subir proyecto a GitHub | 10 min | — |
| 3 | Conectar Netlify, primer deploy | 10 min | 1-2 min build |
| 4 | Apuntar dominio | 10 min | hasta 24h DNS |
| 5 | Activar editor (Identity) | 10 min | minutos (email invitación) |
| 6 | Formulario de contacto | — (lo hago yo) | — |
| 7 | Email corporativo | 15 min | minutos-horas |

**Podéis hacer los pasos 1-3 hoy y tener la web visible en una URL de
Netlify en menos de media hora.** El paso 4 (dominio propio) puede ir en
paralelo mientras esperáis la propagación DNS.

---

## Si algo se atasca

Decidme en qué paso estáis y qué veis en pantalla (una captura ayuda mucho)
y lo resolvemos — los puntos donde más gente se atasca son: subir muchos
archivos a GitHub de golpe (paso 2) y elegir entre nameservers vs. registro
A en el DNS (paso 4).
