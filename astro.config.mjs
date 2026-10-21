// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import fs from 'node:fs';

// lastmod per le pagine articolo, letto dal front matter (updated, altrimenti date).
const lastmods = new Map();
for (const f of fs.readdirSync('./src/content/articoli')) {
  const t = fs.readFileSync(`./src/content/articoli/${f}`, 'utf8');
  const d = t.match(/^updated:\s*(\S+)/m)?.[1] ?? t.match(/^date:\s*(\S+)/m)?.[1];
  if (d) lastmods.set(`/articoli/${f.replace(/\.md$/, '')}/`, new Date(d).toISOString());
}

export default defineConfig({
  site: 'https://www.emiliozucca.com',
  trailingSlash: 'always',
  compressHTML: true,
  build: { inlineStylesheets: 'auto' },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        const path = new URL(item.url).pathname;
        const lm = lastmods.get(path);
        if (lm) item.lastmod = lm;
        if (path === '/') { item.priority = 1.0; item.changefreq = 'weekly'; }
        else if (/^\/(start|coach-marketing-strategico|formazione-marketing-azienda|strategia-digitale)\/$/.test(path)) { item.priority = 0.9; item.changefreq = 'monthly'; }
        else if (path.startsWith('/articoli/') && path !== '/articoli/') { item.priority = 0.7; item.changefreq = 'yearly'; }
        else { item.priority = 0.5; item.changefreq = 'monthly'; }
        return item;
      },
    }),
  ],
});
