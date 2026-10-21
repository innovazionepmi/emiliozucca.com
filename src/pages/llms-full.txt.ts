// /llms-full.txt — contenuti del sito in Markdown pulito, in un unico file.
import { getCollection } from 'astro:content';
import { site, servizi } from '../data/site';

const abs = (p: string) => new URL(p, site.url).toString();

export async function GET() {
  const articoli = (await getCollection('articoli')).sort((a, b) => +b.data.date - +a.data.date);
  const pagine = await getCollection('pagine');
  const fmt = (d: Date) => d.toISOString().slice(0, 10);

  const servizio = (href: string) => {
    const p = pagine.find((x) => `/${x.id}/` === href);
    if (!p) return '';
    const faq = (p.data.faq ?? []).map((f) => `**${f.q}**\n${f.a}`).join('\n\n');
    return `### ${p.data.service ?? p.data.title}\nURL: ${abs(href)}\n\n${p.data.description}\n\n${faq}`;
  };

  const out = `# ${site.name}

> ${site.description}

Autore: ${site.person.name}, ${site.person.jobTitle}. ${site.address}. Email: ${site.email}. Telefono: ${site.phone}.

## Servizi

${servizi.map((s) => servizio(s.href)).join('\n\n')}

## Articoli

${articoli
  .map(
    (a) => `### ${a.data.title}
URL: ${abs(`/articoli/${a.id}/`)}
Pubblicato: ${fmt(a.data.date)}${a.data.updated ? ` · Aggiornato: ${fmt(a.data.updated)}` : ''}

${(a.body ?? '').replace(/!\[[^\]]*\]\([^)]*\)\n*/g, '').replace(/^(#{1,5}) /gm, '#### ').trim()}`
  )
  .join('\n\n---\n\n')}
`;
  return new Response(out, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
