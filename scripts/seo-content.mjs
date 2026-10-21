// Una tantum: scrive description, alt e FAQ nel front matter di articoli e pagine.
import fs from 'node:fs';

const art = {
  '3-pilastri-di-un-piano-di-marketing': ['Il marketing è più semplice di quanto sembra: i 3 pilastri di un piano marketing sono problema, target e soluzione. Scopri come usarli.', 'Copertina: i tre pilastri di un piano marketing'],
  '6-elementi-di-base-di-una-strategia-digitale': ['Cos’è una strategia digitale e quali sono i 6 elementi di base: mission, vision, competitor, posizionamento, buyer persona e analisi SWOT.', 'Copertina: i 6 elementi di base di una strategia digitale'],
  'come-abbandonare-il-marketing-casuale-focus-sulle-relazioni': ['Nel marketing digitale il valore aggiunto sono le relazioni vere con i clienti: come smettere di fare marketing casuale e costruire fiducia.', 'Copertina: marketing relazionale'],
  'non-ti-serve-conoscere-la-tecnologia-per-fare-marketing': ['Perché non serve frequentare corsi tecnici per fare marketing digitale: cosa devi sapere davvero e da dove partire, prima della tecnologia.', 'Copertina: non serve un altro videocorso per fare marketing'],
  'posizionamento-perche-importante': ['Cos’è il posizionamento e perché è il punto di partenza del marketing: occupare un posto nella mente del cliente e differenziarsi dai competitor.', 'Copertina: posizionamento di marca'],
  'senza-strategia-di-comunicazione': ['Cos’è una strategia di comunicazione, perché la tua azienda non può farne a meno e da dove partire: buyer persona, posizionamento e canali.', 'Copertina: strategia di comunicazione aziendale'],
  'sfidare-la-complessita-del-marketing-strategico-in-italia-nel-2024': ['Le sfide del marketing strategico in Italia nel 2024: budget limitati, privacy e normative sui dati, e come affrontarle con metodo.', 'Copertina: le sfide del marketing nel 2024'],
  'strategie-di-comunicazione-efficace-per-pmi-nel-2025-cosa-funziona': ['Come comunicare con i clienti nel 2025: scelta del canale, contenuti mirati, chatbot fatti bene, post-vendita e come evitare i falsi trend.', 'Copertina: comunicazione efficace per le PMI nel 2025'],
  'strategie-di-marketing-per-piccoli-imprenditori-la-checklist': ['La checklist in 8 punti per il marketing dei piccoli imprenditori: mercato, concorrenza, proposta di valore, canali, contenuti, social, SEO, metriche.', 'Copertina: checklist di strategie di marketing in 8 punti'],
};

const faqArt = {
  '6-elementi-di-base-di-una-strategia-digitale': [
    { q: 'Cos’è una strategia digitale?', a: 'È lo studio, la pianificazione e l’implementazione sul web di un insieme di azioni strategiche per il marketing e la comunicazione aziendale, in accordo con il modello di business definito.' },
    { q: 'Quali sono gli elementi di base di una strategia digitale?', a: 'Sei elementi: mission aziendale, vision aziendale, competitor, posizionamento dell’azienda, buyer persona (target) e analisi dei punti di forza e di debolezza (SWOT).' },
  ],
  'senza-strategia-di-comunicazione': [
    { q: 'Cos’è una strategia di comunicazione?', a: 'È il “manuale di sopravvivenza” dell’azienda: si poggia sul business plan e costruisce i processi che mettono in comunicazione in modo proficuo l’azienda con i suoi potenziali clienti.' },
    { q: 'Su quali basi si costruisce una strategia di comunicazione?', a: 'Su buyer persona conosciute a fondo, posizionamento chiaro, messaggi e toni di voce definiti, canali scelti e metodi per capire se si sta facendo bene.' },
  ],
};

const pages = {
  start: {
    seo: 'Checkup marketing aziendale START | Emilio Zucca',
    desc: 'Il checkup START analizza mission, target, posizionamento, competitor, social, sito e SEO e consegna un report con un piano d’azione concreto.',
    alt: 'Consulenza di marketing: il checkup START',
    svc: 'Checkup marketing aziendale START',
    faq: [
      { q: 'Cos’è il checkup START?', a: 'È un checkup approfondito della strategia di marketing e comunicazione della tua azienda: mette in evidenza le criticità e indica il punto di partenza per gli interventi di miglioramento.' },
      { q: 'Cosa analizza il checkup?', a: 'Mission e vision, target e buyer persona, posizionamento, competitor, eventuale piano marketing esistente, presenza sui social, sito web e posizionamento SEO.' },
      { q: 'Cosa ottengo alla fine del checkup?', a: 'Un report completo e compilato a mano (circa 60 pagine per una media azienda) con criticità, soluzioni e una proposta di piano concreto con tempistiche e propedeuticità, presentato in un meeting finale.' },
      { q: 'Come funziona il checkup START?', a: 'In quattro fasi: interviste approfondite sull’azienda, analisi di tutto ciò che è visibile online, elaborazione in un report dettagliato e presentazione dei risultati in un incontro di condivisione.' },
    ],
  },
  'strategia-digitale': {
    seo: 'Consulenza Strategia Digitale per PMI | Emilio Zucca',
    desc: 'Consulenza di strategia digitale per PMI: analisi di posizionamento, target e competitor, obiettivi e piano operativo di marketing basato sui dati.',
    alt: 'Pianificazione della strategia digitale',
    svc: 'Consulenza Strategia Digitale',
    faq: [
      { q: 'Cos’è una strategia digitale?', a: 'È lo studio e la pianificazione delle azioni di marketing e comunicazione aziendale sul web, a partire da un’analisi approfondita di posizionamento, mission e vision, buyer persona, competitor e punti di forza e debolezza.' },
      { q: 'Da cosa dipende il marketing di un’azienda?', a: 'Da esso dipendono vendite, reputazione e vita stessa dell’azienda: per questo non può essere gestito in modo improvvisato e richiede un piano basato su un approccio analitico e sui dati.' },
      { q: 'Quali domande dovrebbe risolvere una strategia digitale?', a: 'Qual è il costo di acquisizione di un contatto e di un cliente, quali canali online portano contatti, quanto investire in pubblicità e che tipo di campagne conviene fare.' },
    ],
  },
  'coach-marketing-strategico': {
    seo: 'Coach per il Marketing Strategico | Emilio Zucca',
    desc: 'Un Marketing Coach affianca l’imprenditore nelle scelte di marketing strategico: cosa fare, cosa delegare, come mantenere il controllo.',
    alt: 'Coaching di marketing strategico',
    svc: 'Coaching Marketing Strategico',
    faq: [
      { q: 'Cosa fa un Marketing Coach?', a: 'È un professionista di riferimento per l’imprenditore, a metà strada tra strategia aziendale e attuazione delle iniziative di marketing: aiuta ad avere le idee chiare e guida le scelte.' },
      { q: 'Per chi è utile il coaching di marketing?', a: 'Per imprenditori e amministratori delegati, manager commerciali e manager di marketing e comunicazione che vogliono capire come funzionano le cose senza studiare la tecnologia e mantenere il controllo su ciò che delegano.' },
      { q: 'Quanto dura un percorso di coaching?', a: 'Dipende: per una domanda puntuale può bastare un’ora, per sbloccare parte del piano marketing un paio di giornate, per partire da zero un percorso passo passo fino all’autonomia. Senza lunghi vincoli temporali.' },
      { q: 'Cos’è P.M.N.?', a: 'Sono i tre pilastri su cui si lavora nel coaching: Positioning, Mission e Needs, cioè posizionamento, missione dell’azienda e necessità dei clienti.' },
    ],
  },
  'formazione-marketing-azienda': {
    seo: 'Formazione Marketing e Comunicazione su misura | Emilio Zucca',
    desc: 'Formazione su misura in marketing e comunicazione digitale per imprenditori e team: percorsi personalizzati con affiancamento operativo.',
    alt: 'Formazione marketing per aziende',
    svc: 'Formazione marketing e comunicazione',
    faq: [
      { q: 'Perché una formazione su misura?', a: 'Perché le aziende non sono tutte uguali: i corsi uguali per tutti spesso non risolvono, mentre un approccio che combina formazione e affiancamento applica le nozioni alla realtà aziendale.' },
      { q: 'Quali temi si possono affrontare?', a: 'Pianificazione della strategia digitale, best practice per i social network, teorie e tecniche di lead generation, gestione digitale dei contatti (CRM) e altro, in base alle esigenze dell’azienda.' },
      { q: 'È possibile usare i fondi interprofessionali?', a: 'Sì: diverse aziende hanno finanziato la formazione con fondi interprofessionali, e l’azienda può essere indirizzata verso professionisti che supportano l’accesso ai fondi.' },
    ],
  },
};

for (const [slug, [d, a]] of Object.entries(art)) {
  const p = `src/content/articoli/${slug}.md`;
  let s = fs.readFileSync(p, 'utf8');
  s = s.replace(/^description: .*$/m, () => 'description: ' + JSON.stringify(d));
  s = s.replace(/^(cover: .*)$/m, (m) => `${m}\ncoverAlt: ${JSON.stringify(a)}`);
  if (faqArt[slug]) s = s.replace(/\n---\n\n/, () => `\nfaq: ${JSON.stringify(faqArt[slug])}\n---\n\n`);
  fs.writeFileSync(p, s);
}

for (const [slug, m] of Object.entries(pages)) {
  const p = `src/content/pagine/${slug}.mdx`;
  let s = fs.readFileSync(p, 'utf8');
  s = s.replace(/^description: .*$/m, () => 'description: ' + JSON.stringify(m.desc));
  s = s.replace(/^(image: .*)$/m, (x) => `${x}\nimageAlt: ${JSON.stringify(m.alt)}\nseoTitle: ${JSON.stringify(m.seo)}\nservice: ${JSON.stringify(m.svc)}\nfaq: ${JSON.stringify(m.faq)}`);
  fs.writeFileSync(p, s);
}
console.log('ok');
