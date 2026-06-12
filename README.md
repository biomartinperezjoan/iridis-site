# Iridis — website + blog

This is the Iridis website: the main site (Home, Services, Work, About, Contact)
plus a blog built with **Eleventy** and editable through **Decap CMS** (a
free, login-protected editor at `/admin`).

Everything still outputs plain static HTML/CSS — no database, no PHP, no
WordPress. That's what keeps it fast.

---

## Project structure

```
src/
  index.html          ← the main site (Home/Services/Work/About/Contact tabs)
  css/styles.css       ← shared design-system stylesheet (used by every page)
  images/              ← logo files + uploads/ (images added via the CMS)
  js/nav.js            ← tiny script for the mobile menu on blog pages
  _includes/
    base.njk           ← shared layout: nav + footer for blog pages
    post.njk           ← layout for individual blog posts
  blog/
    index.njk          ← blog listing page (/blog/)
    posts/*.md         ← one Markdown file per article

admin/
  index.html           ← Decap CMS entry point (the editor)
  config.yml           ← defines the fields you see in the editor

.eleventy.js           ← build configuration
netlify.toml           ← tells Netlify how to build the site
```

---

## How writing a post works (once it's all set up)

1. Go to `yourdomain.com/admin`
2. Log in (set up once, see below)
3. Click **New post**, fill in title, date, excerpt, tags, cover image, body
4. Click **Publish**
5. Wait ~30–60 seconds — Netlify rebuilds the site automatically
6. The post is live at `yourdomain.com/blog/your-post-title/`

No one needs to open this code again for routine posting.

---

## One-time setup (in order)

### 1. Put this project on GitHub
Create a new repository and push this folder to it. (If you're not
comfortable with Git, ask whoever sets up hosting to do this step — it's a
five-minute job.)

### 2. Connect it to Netlify
- Sign up at netlify.com (free tier is enough)
- "Add new site" → "Import an existing project" → pick the GitHub repo
- Build command: `npm run build` (already set in `netlify.toml`)
- Publish directory: `_site` (already set in `netlify.toml`)
- Deploy — your site is now live at a `*.netlify.app` address

### 3. Connect your real domain
- In Netlify: Site settings → Domain management → Add custom domain
- Follow Netlify's instructions to point your domain's DNS at Netlify
  (usually 1–2 records, takes minutes to set up, up to 24h to propagate)
- HTTPS is configured automatically

### 4. Turn on the editor login (Netlify Identity + Git Gateway)
This is what makes `/admin` work with a login screen instead of needing Git.

- In Netlify: Site settings → Identity → **Enable Identity**
- Identity → Registration: set to **Invite only** (so randoms can't sign up)
- Identity → Services → Git Gateway → **Enable Git Gateway**
- Identity → Invite users → enter the email addresses of the 3 of you
- Each person gets an email invite, sets a password, and can then log in at
  `yourdomain.com/admin`

That's it — from this point on, publishing a post is just steps 1–6 above,
forever, with no code involved.

---

## Editing the About page through the CMS

Unlike the rest of the main site, the **About page** content now lives in
`src/_data/about.json` and is editable from `/admin` → **About page**:

- **Intro** — the headline and intro paragraph at the top
- **The name (IRIDIS)** — the "three meanings" cards (add/remove/reorder)
- **Team** — add or remove team members, edit name/role/bio, and upload a
  photo for each (leave the photo empty to keep the "Photo pending" placeholder)
- **How we work** — the four small cards at the bottom (add/remove/reorder)

Every list here (team members, meanings, "how we work" cards) has built-in
**+ Add**, **remove** and **drag-to-reorder** controls in the editor — no
code involved.

This is a pilot for the rest of the site. If it works well, the same
pattern (move content into `_data/*.json`, loop over it in the templates,
add a CMS collection) can be extended to Home, Services and Work so those
become editable too.

---

## Editing the rest of the main site (Home/Services/Work/Contact)

These pages still live in `src/index.html` as before — same design system,
same single file, same tab-based navigation. The Eleventy build now
*templates* this file (so it can read `about.json`), but everything outside
the About section renders exactly as before. To change copy or layout here,
edit `src/index.html` directly (or ask Claude to).

The **Blog** nav item links to `/blog/` instead of being an in-page tab.

---

## Local development

```bash
npm install        # first time only
npm run serve       # builds + serves at http://localhost:8080 with live reload
```

## Production build

```bash
npm run build        # outputs the finished site to _site/
```

---

## Notes on performance

- No JavaScript framework, no build step beyond Eleventy's static generation
- `styles.css` and the two logo PNGs are shared and cached across every page
  (main site + every blog post) — they're only downloaded once per visitor
- Each blog post is its own static HTML file with its own URL — good for SEO
  and for sharing on LinkedIn (real preview, real page, no JS required)
- Google Fonts are loaded with `preconnect` for faster first paint

## Notes on the CMS

- Decap CMS edits Markdown files in `src/blog/posts/` and commits them to
  GitHub. Netlify then rebuilds automatically.
- Images uploaded through the CMS land in `src/images/uploads/` and are
  referenced as `/images/uploads/...` — already configured in `admin/config.yml`.
- If you ever want to add new fields (e.g. an "author" field for ghostwritten
  posts), edit `admin/config.yml` — each field there becomes a box in the
  editor UI.
