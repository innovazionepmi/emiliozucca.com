// One-off importer: WordPress REST JSON -> Markdown files in src/content.
// Usage: node scripts/import-wp.mjs <dir-with-posts.json-and-pages.json>
import fs from 'node:fs';
import path from 'node:path';
import TurndownService from 'turndown';

const dir = process.argv[2];
const root = path.resolve(import.meta.dirname, '..');
const read = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));

const td = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-' });
td.remove(['script', 'style', 'noscript']);

const decode = (s) =>
  s.replace(/&#8217;/g, '’').replace(/&#8216;/g, '‘').replace(/&#8220;/g, '“').replace(/&#8221;/g, '”')
    .replace(/&#8211;/g, '–').replace(/&#038;|&amp;/g, '&').replace(/&#8230;/g, '…').replace(/&nbsp;/g, ' ');

const clean = (html) =>
  html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\[\/?vc_[^\]]*\]|\[\/?nectar_[^\]]*\]|\[\/?[a-z_]+ [^\]]*\]/g, '');

const stripSc = (m) => m.replace(/\\\[\/?[a-z0-9\\_]+(?:\s[^\]]*?)?\\\]/gi, '');
const toMd = (html) => stripSc(td.turndown(clean(html))).replace(/\n{3,}/g, '\n\n').trim();
const yamlStr = (s) => JSON.stringify(s);

fs.mkdirSync(path.join(root, 'src/content/articoli'), { recursive: true });
fs.mkdirSync(path.join(root, 'src/content/pagine-raw'), { recursive: true });

for (const p of read('posts.json')) {
  const cats = (p._embedded?.['wp:term']?.[0] ?? []).map((c) => c.name);
  const img = p._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? '';
  const body = decode(toMd(p.content.rendered));
  const firstPara = body.split('\n\n').find((x) => x && !x.startsWith('#') && !x.startsWith('-') && x.length > 60) ?? '';
  const excerpt = firstPara.replace(/[*_\[\]]/g, '').slice(0, 200);
  const fm = [
    '---',
    `title: ${yamlStr(decode(p.title.rendered))}`,
    `date: ${p.date.slice(0, 10)}`,
    `description: ${yamlStr(excerpt)}`,
    `categories: ${JSON.stringify(cats.map(decode))}`,
    img ? `wpImage: ${yamlStr(img)}` : '',
    '---',
    '',
  ].filter((l) => l !== '').join('\n');
  fs.writeFileSync(path.join(root, 'src/content/articoli', `${p.slug}.md`), fm + '\n\n' + body + '\n');
}

// Pages are dumped raw for manual editorial rework (WPBakery markup is not 1:1 convertible).
for (const p of read('pages.json')) {
  if (p.slug.startsWith('typ-')) continue;
  fs.writeFileSync(
    path.join(root, 'src/content/pagine-raw', `${p.slug}.md`),
    `# ${decode(p.title.rendered)}\n\n` + decode(toMd(p.content.rendered)) + '\n'
  );
}
console.log('done');
