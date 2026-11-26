// Dati globali del sito: modificali qui e si aggiornano ovunque.
import startImg from '../assets/img/start1-homepage.jpg';
import coachImg from '../assets/img/marketing-coaching.jpg';
import formazioneImg from '../assets/img/formazione.jpg';
import strategiaImg from '../assets/img/pianificazione-strategica.jpg';
import datiImg from '../assets/img/strategy1.jpg'; // provvisoria: sostituire con un'immagine dedicata
import anac from '../assets/img/clients/ANAC.png';
import italdesign from '../assets/img/clients/italdesign-logo-share.jpg';
import kidsus from '../assets/img/clients/kidsandus.jpg';
import moose from '../assets/img/clients/MooseDesign-logo.png';
import asisd from '../assets/img/clients/asisd.png';
import ekis from '../assets/img/clients/ekis-logo-company-h180.png';
import poliedra from '../assets/img/clients/poliedra.gif';
import digi from '../assets/img/clients/DIGI-1.png';

export const site = {
  name: 'Emilio Zucca Web Strategies',
  shortName: 'EZ Web Strategies',
  tagline: 'Consulenza di Innovazione, Marketing e Comunicazione Digitale',
  description:
    'Consulenza di marketing strategico e comunicazione digitale per PMI: checkup, coaching, formazione e strategia digitale. Prima l’analisi e la strategia, poi la tecnologia.',
  url: 'https://www.emiliozucca.com',
  email: 'info@emiliozucca.com',
  phone: '+39 392 759 0711',
  phoneHref: '+393927590711',
  whatsapp: 'https://wa.me/393927590711',
  address: 'Via Giovanni Re 105, 00134 Roma',
  vat: '14454021008',
  gtmId: 'GTM-NJFGNFR',
  hubspotPortalId: '4160510',
  iubenda: { siteId: 975554, cookiePolicyId: 8288975 },
  social: {
    linkedin: 'https://www.linkedin.com/in/emilio-zucca/',
    facebook: 'https://www.facebook.com/emiliozuccapuntocom',
    instagram: 'https://www.instagram.com/ezwebstrategies/',
    youtube: 'https://youtu.be/zs3mWNlHBh4',
  },
  person: {
    name: 'Emilio Zucca',
    jobTitle: 'Digital Marketing and Communication Advisor',
    knowsAbout: [
      'Marketing strategico',
      'Strategia digitale',
      'Comunicazione digitale',
      'Posizionamento di marca',
      'Marketing per PMI',
      'Lead generation',
      'Formazione aziendale',
      'Innovazione e intelligenza artificiale per le PMI',
    ],
  },
};

export const servizi = [
  {
    href: '/start/',
    label: 'Checkup START',
    kicker: 'Checkup',
    title: 'Digital Strategy Checkup',
    text: 'Una fotografia approfondita di marketing e comunicazione della tua azienda, con un piano di azioni concreto.',
    image: startImg,
  },
  {
    href: '/coach-marketing-strategico/',
    label: 'Coaching Marketing Strategico',
    kicker: 'Coaching',
    title: 'Marketing Coaching',
    text: 'Un consigliere esperto al tuo fianco per scegliere cosa fare, cosa delegare e come mantenere il controllo.',
    image: coachImg,
  },
  {
    href: '/formazione-marketing-azienda/',
    label: 'Formazione',
    kicker: 'Formazione',
    title: 'Formazione su misura',
    text: 'Percorsi di formazione e affiancamento costruiti sulle esigenze reali della tua azienda e del tuo team.',
    image: formazioneImg,
  },
  {
    href: '/strategia-digitale/',
    label: 'Consulenza Strategia Digitale',
    kicker: 'Strategia',
    title: 'Strategia Digitale',
    text: 'Dall’analisi del posizionamento al piano operativo: le fondamenta del marketing della tua azienda.',
    image: strategiaImg,
  },
  {
    href: '/decisioni-basate-sui-dati/',
    label: 'Decidere con i dati',
    kicker: 'Dati',
    title: 'Decidere con i dati',
    text: 'Quali decisioni puoi già prendere con i dati che hai, cosa ti manca e cosa iniziare a raccogliere.',
    image: datiImg,
  },
];

export const clienti = [
  { name: 'ANAC', src: anac },
  { name: 'Italdesign', src: italdesign },
  { name: 'Kids&Us', src: kidsus },
  { name: 'Moose Design', src: moose },
  { name: 'ASISD', src: asisd },
  { name: 'Ekis', src: ekis },
  { name: 'Poliedra', src: poliedra },
  { name: 'Digi', src: digi },
];
