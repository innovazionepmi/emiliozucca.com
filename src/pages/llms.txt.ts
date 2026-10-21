// /llms.txt — indice del sito pensato per gli LLM (https://llmstxt.org/).
// Si rigenera da solo a ogni build leggendo le collezioni: non va modificato a mano.
import { getCollection } from 'astro:content';
import { site, servizi } from '../data/site';

export async function GET() {
  const articoli = (await getCollection('articoli')).sort((a, b) => +b.data.date - +a.data.date);
  const pagine = await getCollection('pagine');
  const abs = (p: string) => new URL(p, site.url).toString();
  const svcDesc = (href: string) => pagine.find((p) => `/${p.id}/` === href)?.data.description ?? '';

  const out = `# ${site.name}

> ${site.description}

Emilio Zucca è un ${site.person.jobTitle} con oltre 20 anni di esperienza, con studio a Roma. Lavora con le PMI italiane su strategia, posizionamento e comunicazione, con un approccio analitico: prima l’analisi e la strategia, poi la tecnologia. Il sito è in italiano.

## Servizi
${servizi.map((s) => `- [${s.label}](${abs(s.href)}): ${svcDesc(s.href) || s.text}`).join('\n')}

## Articoli
${articoli.map((a) => `- [${a.data.title}](${abs(`/articoli/${a.id}/`)}): ${a.data.description}`).join('\n')}

## Contatti e informazioni
- [Contatti](${abs('/contatti/')}): telefono ${site.phone}, email ${site.email}, ${site.address}
- [Privacy e Cookie Policy](${abs('/privacy-policy/')})
- [LinkedIn](${site.social.linkedin})
- [Innovazione e AI per le PMI](https://www.innovazionepmi.it/)

## Optional
- [Testo completo per LLM](${abs('/llms-full.txt')}): servizi, FAQ e tutti gli articoli in un unico file
- [Feed RSS](${abs('/rss.xml')})
`;
  return new Response(out, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
