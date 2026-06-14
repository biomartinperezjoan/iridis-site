# Iridis — guía de infraestructura

Referencia del stack actual: cómo está montado todo y qué tocar si algo
necesita cambiarse.

---

## Stack

| Capa | Servicio | Plan |
|---|---|---|
| Repositorio | GitHub (`biomartinperezjoan/iridis-site`) | Free |
| Hosting + builds | Cloudflare Pages | Free |
| DNS + dominio | Cloudflare | — |
| CMS | Decap CMS (en `/admin`) | Free (open source) |
| Autenticación del CMS | Cloudflare Worker (`iridis-cms-auth`) | Free |

---

## Cómo funciona el flujo completo

```
Alguien publica un post en /admin
        ↓
Decap CMS hace un commit al repo de GitHub
        ↓
Cloudflare Pages detecta el push y lanza un build (npm run build)
        ↓
El sitio se actualiza en ~1 minuto
```

---

## Acceso al editor (`/admin`)

- URL: `vuestrodominio.com/admin`
- Login: con cuenta de GitHub (OAuth gestionado por el Cloudflare Worker)
- Solo pueden entrar las cuentas de GitHub que tengan acceso al repositorio

Para dar acceso a una persona nueva: añadirla como **collaborator** en el
repositorio de GitHub (`Settings → Collaborators`).

---

## Cloudflare Pages — configuración del build

En el dashboard de Cloudflare Pages, el sitio está configurado con:

- **Build command:** `npm run build`
- **Build output directory:** `_site`
- **Node version:** 20 (configurado en Variables de entorno: `NODE_VERSION = 20`)
- **Branch de producción:** `main`

Cualquier push a `main` lanza un deploy automático.

---

## Cloudflare Worker — autenticación del CMS

El Worker `iridis-cms-auth` actúa como intermediario OAuth entre Decap CMS
y GitHub. Su URL está referenciada en `admin/config.yml` como `base_url`.

Si el Worker deja de funcionar, el login en `/admin` dejará de funcionar.
Para revisarlo: Cloudflare dashboard → Workers & Pages → `iridis-cms-auth`.

---

## DNS

El dominio apunta a Cloudflare Pages a través de los registros DNS
gestionados en Cloudflare. HTTPS está activado automáticamente.

---

## Formulario de contacto

El formulario de la web actualmente es solo visual (no envía emails).
Para activarlo, las opciones más sencillas compatibles con Cloudflare Pages:

- **Web3Forms** (web3forms.com) — gratuito, sin backend propio, añadir
  `action` al formulario con la clave de API
- **Formspree** (formspree.io) — igual de sencillo, plan gratuito disponible

Cuando queráis activarlo, es un cambio de 2-3 líneas en `src/index.html`.

---

## Email corporativo

Para tener `hola@vuestrodominio.com`:

- **Zoho Mail** (zoho.com/mail) — plan gratuito hasta 5 usuarios con dominio
  propio. Añadir registros MX en el DNS de Cloudflare (Zoho los proporciona).
- **Google Workspace** — de pago (~6 €/usuario/mes), mejor integración si
  ya usáis Gmail/Drive/Calendar a diario.

---

## Si algo se atasca

| Síntoma | Dónde mirar |
|---|---|
| La web no carga | Cloudflare Pages → Deployments → ver si el último build falló |
| `/admin` no deja hacer login | Cloudflare Workers → `iridis-cms-auth` → ver logs |
| Un post publicado no aparece | Cloudflare Pages → ver si se lanzó un build tras el commit |
| El dominio no resuelve | Cloudflare DNS → comprobar que los registros apuntan a Pages |
