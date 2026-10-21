// Costruzione del grafo JSON-LD (schema.org) condiviso dalle pagine.
import { site, servizi } from '../data/site';

const abs = (p: string) => new URL(p, site.url).toString();

export const ids = {
  org: `${site.url}/#organization`,
  person: `${site.url}/#emilio-zucca`,
  website: `${site.url}/#website`,
};

export interface Crumb { name: string; path: string }
export interface FaqItem { q: string; a: string }

/** Nodi globali: organizzazione, persona (entità autore), sito. */
export function baseGraph(logoUrl: string, portraitUrl: string) {
  return [
    {
      '@type': ['ProfessionalService', 'Organization'],
      '@id': ids.org,
      name: site.name,
      alternateName: site.shortName,
      url: site.url,
      description: site.description,
      logo: { '@type': 'ImageObject', url: logoUrl },
      image: logoUrl,
      email: site.email,
      telephone: site.phoneHref,
      vatID: `IT${site.vat}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Via Giovanni Re 105',
        postalCode: '00134',
        addressLocality: 'Roma',
        addressRegion: 'RM',
        addressCountry: 'IT',
      },
      areaServed: { '@type': 'Country', name: 'Italia' },
      founder: { '@id': ids.person },
      knowsAbout: site.person.knowsAbout,
      sameAs: [site.social.linkedin, site.social.facebook, site.social.instagram],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: site.phoneHref,
        email: site.email,
        availableLanguage: 'it',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servizi',
        itemListElement: servizi.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.label, url: abs(s.href), provider: { '@id': ids.org } },
        })),
      },
    },
    {
      '@type': 'Person',
      '@id': ids.person,
      name: site.person.name,
      jobTitle: site.person.jobTitle,
      url: `${site.url}/#chi-sono`,
      image: portraitUrl,
      email: site.email,
      worksFor: { '@id': ids.org },
      knowsAbout: site.person.knowsAbout,
      sameAs: [site.social.linkedin, site.social.facebook, site.social.instagram],
    },
    {
      '@type': 'WebSite',
      '@id': ids.website,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: 'it-IT',
      publisher: { '@id': ids.org },
    },
  ];
}

export function breadcrumbs(items: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export function faqPage(items: FaqItem[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function webPage(opts: {
  path: string;
  name: string;
  description: string;
  image?: string;
  published?: Date;
  modified?: Date;
  type?: string;
  crumbs?: boolean;
}) {
  return {
    '@type': opts.type ?? 'WebPage',
    '@id': `${abs(opts.path)}#webpage`,
    url: abs(opts.path),
    name: opts.name,
    description: opts.description,
    inLanguage: 'it-IT',
    isPartOf: { '@id': ids.website },
    about: { '@id': ids.org },
    ...(opts.image ? { primaryImageOfPage: { '@type': 'ImageObject', url: opts.image } } : {}),
    ...(opts.published ? { datePublished: opts.published.toISOString() } : {}),
    ...(opts.modified ? { dateModified: opts.modified.toISOString() } : {}),
    ...(opts.crumbs ? { breadcrumb: { '@id': `${abs(opts.path)}#breadcrumb` } } : {}),
  };
}

export function article(opts: {
  path: string;
  title: string;
  description: string;
  image?: string;
  published: Date;
  modified?: Date;
  section?: string;
  words?: number;
}) {
  return {
    '@type': 'Article',
    '@id': `${abs(opts.path)}#article`,
    mainEntityOfPage: { '@id': `${abs(opts.path)}#webpage` },
    headline: opts.title,
    description: opts.description,
    ...(opts.image ? { image: [opts.image] } : {}),
    datePublished: opts.published.toISOString(),
    dateModified: (opts.modified ?? opts.published).toISOString(),
    author: { '@id': ids.person },
    publisher: { '@id': ids.org },
    inLanguage: 'it-IT',
    ...(opts.section ? { articleSection: opts.section } : {}),
    ...(opts.words ? { wordCount: opts.words } : {}),
    isAccessibleForFree: true,
  };
}

export function service(opts: { path: string; name: string; description: string; image?: string }) {
  return {
    '@type': 'Service',
    '@id': `${abs(opts.path)}#service`,
    name: opts.name,
    description: opts.description,
    url: abs(opts.path),
    provider: { '@id': ids.org },
    areaServed: { '@type': 'Country', name: 'Italia' },
    serviceType: opts.name,
    ...(opts.image ? { image: opts.image } : {}),
  };
}
