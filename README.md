# Iridis — website + blog

This is the Iridis website: the main site (Home, Services, Work, About, Contact)
plus a blog built with **Eleventy** and editable through **Decap CMS** (a
free, login-protected editor at `/admin`).

Everything outputs plain static HTML/CSS — no database, no PHP, no WordPress.
Hosted on **Cloudflare Pages**, deployed automatically from GitHub.

---

## Project structure

```
src/
  index.html          ← the main site (Home/Services/Work/About/Contact tabs)
  css/styles.css      ← shared design-system stylesheet (used by every page)
  images/             ← logo files + uploads/ (images added via the CMS)
  js/nav.js           ← tiny script for the mobile menu on blog pages
  _includes/
    base.njk          ← shared layout: nav + footer for blog pages
    post.njk          ← layout for individual blog posts
  blog/
    index.njk         ← blog listing page (/blog/)
    posts/*.md        ← one Markdown file per article
  _data/
    about.json        ← About page content (editable from /admin)

admin/
  index.html          ← Decap CMS entry point (the editor)
  config.yml          ← defines the fields you see in the editor

.eleventy.js          ← build configuration
package.json          ← dependencies and build scripts
```

---

## How writing a post works

1. Go to `yourdomain.com/admin`
2. Log in with GitHub
3. Click **New post**, fill in title, date, excerpt, tags, cover image, body
4. Click **Publish**
5. Wait ~1 minute — Cloudflare Pages rebuilds the site automatically
6. The post is live at `yourdomain.com/blog/your-post-title/`

No one needs to open this code again for routine posting.

---

## Editing the About page through the CMS

The **About page** content lives in `src/_data/about.json` and is editable
from `/admin` → **About page**:

- **Intro** — the headline and intro paragraph at the top
- **The name (IRIDIS)** — the "three meanings" cards (add/remove/reorder)
- **Team** — add or remove team members, edit name/role/bio, and upload a
  photo for each (leave the photo empty to keep the "Photo pending" placeholder)
- **How we work** — the four small cards at the bottom (add/remove/reorder)

Every list has built-in **+ Add**, **remove** and **drag-to-reorder** controls
in the editor — no code involved.

---

## Editing the rest of the main site (Home/Services/Work/Contact)

These pages live in `src/index.html` — same design system, same single file,
same tab-based navigation. To change copy or layout here, edit `src/index.html`
directly (or ask Claude to).

The **Blog** nav item links to `/blog/` as a separate page.

---

## Local development

```bash
npm install        # first time only
npm run serve      # builds + serves at http://localhost:8080 with live reload
```

## Production build

```bash
npm run build      # outputs the finished site to _site/
```

Cloudflare Pages runs `npm run build` automatically on every push to `main`.
Build output directory: `_site`.

---

## Notes on performance

- No JavaScript framework — pure Eleventy static generation
- `styles.css` and logo PNGs are shared and cached across every page — downloaded once per visitor
- Each blog post is its own static HTML file with its own URL — good for SEO and LinkedIn previews
- Google Fonts loaded with `preconnect` for faster first paint

## Notes on the CMS

- Decap CMS authenticates via GitHub OAuth (handled by a Cloudflare Worker at `base_url` in `admin/config.yml`)
- When a post is published, Decap commits the Markdown file to GitHub; Cloudflare Pages rebuilds automatically
- Images uploaded through the CMS land in `src/images/uploads/` and are referenced as `/images/uploads/...`
- To add new fields (e.g. an "author" field), edit `admin/config.yml` — each field becomes a box in the editor UI
