# emiliozucca.com

Sito di Emilio Zucca Web Strategies. Astro (statico) + contenuti in Markdown, deploy su Vercel. Migrato da WordPress (Salient).

## Dove si modifica cosa
- `src/content/articoli/*.md`: articoli del blog (URL `/articoli/<nome-file>/`). Front matter: title, date, description, categories, cover (`../../assets/articoli/...`), coverAlt.
- `src/content/pagine/*.md`: pagine servizi/privacy (URL `/<nome-file>/`). Front matter: title, description, eyebrow, image, imageAlt, cta, faq.
- `src/data/site.ts`: contatti, social, elenco servizi (menu, home, footer) e loghi clienti.
- `src/pages/index.astro`: homepage. `src/pages/contatti.astro`: contatti.
- `src/styles/global.css`: design token (lime `#d0d82c`, font Cabin + Roboto) e stile `.prose`.
- `src/assets/`: immagini (ottimizzate da Astro). `public/` solo per favicon, robots.txt e manifest.
- `_migrazione/`: materiale grezzo del vecchio sito WordPress, solo riferimento (non pubblicato). `scripts/import-wp.mjs` è l'importer una tantum.

## SEO e GEO (già implementati, da mantenere)
- `src/layouts/Base.astro` genera title, meta, canonical, Open Graph/Twitter (immagine 1200x630 automatica) e il grafo JSON-LD (`src/lib/seo.ts`: Organization, Person, WebSite, WebPage, BreadcrumbList, Article, Service, FAQPage). Le pagine passano solo `crumbs`/`graph`.
- Front matter: `description` ≤160 caratteri, `seoTitle` ≤60 (se il titolo lungo non ci sta), `coverAlt`/`imageAlt` sempre compilati, `faq: [{q, a}]` per Q&A (visibili in pagina + FAQPage), `updated` quando un articolo viene rivisto davvero (alimenta lastmod/dateModified).
- Un solo H1 per pagina (lo mette il template): nei file `.md` si parte da `##`.
- Immagini: sempre in `src/assets/` (ottimizzate in WebP/responsive da Astro), mai in `public/`. Nei `.md` percorso relativo (`../../assets/...`), negli `.mdx` import.
- `llms.txt`, `llms-full.txt`, `rss.xml`, sitemap si rigenerano a ogni build dai contenuti. `public/robots.txt` consente esplicitamente i crawler AI.
- Dopo ogni modifica sostanziale: `npm run build && node scripts/audit.mjs` (controlla title/description, H1, alt, JSON-LD, link interni rotti).
- Non linkare internamente URL che sono redirect in `vercel.json`.

## Regole
- Mantenere gli URL storici (SEO). Se si cambia uno slug, aggiungere un redirect in `vercel.json`.
- Italiano, tono diretto: "niente trucchi, niente guru". Accenti corretti (perché, è, né).
- Comandi: `npm run dev`, `npm run build`.

## Git
- Questo progetto non ha staging: si committa e si pusha direttamente su `main` (eccezione voluta alla regola generale di Emilio). Vercel pubblica a ogni push.
