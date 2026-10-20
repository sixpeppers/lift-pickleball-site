# Lift Pickleball — Website

This site is built with [Eleventy](https://www.11ty.dev/) (a static site generator) and edited through [Decap CMS](https://decapcms.org/) (a free, git-based content editor at `/admin`). The six pages — Home, About, Lessons, Pricing, Contact, Areas We Serve — are templates in `src/` that pull their text from JSON files in `src/_data/`. Editing those JSON files (by hand, or through the `/admin` editor) and running a build regenerates the exact same hand-crafted HTML/CSS design, just with new words in it.

**First time setting this up?** See `SETUP.md` — it walks through the one-time GitHub/Netlify steps needed to get the `/admin` editor working on your live site.

## Local development

```
npm install
npm run build      # builds the site into _site/
npm run serve       # builds + serves with live reload at localhost:8080
```

## Project structure

- `src/*.njk` — one template per page (`index.njk`, `about.njk`, `lessons.njk`, `pricing.njk`, `contact.njk`, `areas.njk`), each pinned via front matter to its original flat URL (e.g. `pricing.html`) so every existing link, the sitemap, and search rankings stay exactly where they are.
- `src/_includes/base.njk` — the shared page shell: header/nav, footer, all SEO meta tags, and the `LocalBusiness` / `BreadcrumbList` / `FAQPage` JSON-LD, assembled from `_data/site.json` and `_data/offers.json` so it can never drift out of sync with the visible pricing.
- `src/_data/*.json` — all editable content, one file per page/topic (pricing, bio, lessons, home, contact, areas, testimonials, FAQ). These are exactly what the `/admin` editor reads and writes.
- `src/styles.css`, `src/nav.js`, `src/contact-protect.js`, `src/images/`, `src/robots.txt`, `src/sitemap.xml` — static assets, copied through to the build untouched.
- `admin/` — the Decap CMS editor (`index.html` + `config.yml`).
- `netlify.toml` — tells Netlify to run `npm run build` and publish `_site/`.

## What's real vs. still placeholder

Bio, credentials, pricing, and contact info were pulled from your old site (pbnerds.com) and your direction since, so most of the site reflects real information. Still marked with `[brackets]` in the content files for you to fill in (editable right in the CMS under their respective sections):

- Payment methods accepted (Pricing FAQ)
- Cancellation/rescheduling policy (Pricing FAQ)
- Whether loaner paddles are actually available (Pricing FAQ, Lessons "what's included")
- Specific court names/addresses (Pricing FAQ, Lessons, Contact)
- First-lesson discount, if you offer one (Contact FAQ)
- Real student testimonials (the 3 on the homepage are still samples — toggle the "sample" flag off once you swap in a real quote)
- A headshot/coaching photo on the About page (Home page has your real action photo; About still shows a placeholder frame — this isn't in the CMS yet since it needs an actual image file, just ask if you'd like it added)
- Travel fee policy for lessons outside Walnut Creek (Areas FAQ)

## SEO

Unchanged from before — every page has a unique title/meta description, canonical URL, Open Graph/Twitter tags, and `LocalBusiness`/`BreadcrumbList` schema (`areas.html` adds `FAQPage` schema too). `sitemap.xml` and `robots.txt` are passed through as-is. The business description, service-area list, and pricing used in the structured data now live in `src/_data/site.json` and `src/_data/offers.json` — editing pricing in the CMS automatically updates the schema too, so they can't drift apart.

## How the contact info is spam-protected

Unchanged: your email and phone number are never written as plain text anywhere in the built HTML. `contact-protect.js` reconstructs them from shifted character codes and inserts them into the page only after it loads in a browser, which defeats the vast majority of basic scraper bots. The phone/email are intentionally left out of the JSON-LD schema for the same reason.

## Hosting

Deploys on Netlify from this GitHub repo (`npm run build` → publish `_site/`). See `SETUP.md` for the one-time connection steps, including wiring up the `/admin` editor.
