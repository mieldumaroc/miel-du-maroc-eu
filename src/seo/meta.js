// Page titles, descriptions and Google product data in French, English and Arabic.
// Used in the browser (RouteSeo in App.js) and at build time (scripts/prerender-seo.js),
// so what Google reads in the HTML matches what the page shows. Keep this file free of imports.
export const SITE_URL = 'https://www.mieldumaroc.com';
export const SEO_LANGS = ['fr', 'en', 'ar'];
export const OG_LOCALE = { fr: 'fr_MA', en: 'en_GB', ar: 'ar_MA' };

export function langPath(path, lang) {
  if (lang === 'fr') return path;
  return path === '/' ? `/${lang}` : `/${lang}${path}`;
}

const SIZE_AR = { g: 'غ', kg: 'كغ', L: 'لتر' };
function fmtSize(size, lang) {
  const m = String(size).match(/^(\d+)\s*(g|kg|L)$/i);
  if (!m) return size;
  return lang === 'ar' ? `${m[1]} ${SIZE_AR[m[2]] || m[2]}` : `${m[1]} ${m[2]}`;
}

const honeyCount = (products) => products.filter((p) => p.category !== 'oil').length;

export function staticPages(products) {
  const n = honeyCount(products);
  return {
    '/': {
      fr: { title: "Miel Pur et Huile d'Olive au Maroc | Livraison à Marrakech | Miel du Maroc", description: "Vrai miel pur artisanal des montagnes de l'Atlas et huile d'olive pure, livrés chez vous à Marrakech. Commande sur WhatsApp, paiement à la livraison. Famille apicultrice depuis 1995." },
      en: { title: 'Pure Honey & Olive Oil in Morocco | Delivery in Marrakech | Miel du Maroc', description: 'Real raw honey from the Atlas Mountains and pure olive oil, delivered to your door in Marrakech. Order on WhatsApp, pay cash on delivery. Beekeeping family since 1995.' },
      ar: { title: 'عسل حر طبيعي وزيت زيتون في المغرب | التوصيل في مراكش | ميل دو ماروك', description: 'عسل حر طبيعي من جبال الأطلس وزيت زيتون طبيعي، يصلكم إلى باب المنزل في مراكش. اطلب عبر واتساب وادفع عند الاستلام. عائلة نحّالين منذ 1995.' },
    },
    '/products': {
      fr: { title: `Nos Miels Purs et Huile d'Olive | ${n} Variétés | Miel du Maroc`, description: `${n} variétés de miel pur du Maroc et huile d'olive pure (1 L et 5 L). Commande sur WhatsApp, livraison à domicile à Marrakech, paiement à la livraison.` },
      en: { title: `Our Pure Honeys & Olive Oil | ${n} Varieties | Miel du Maroc`, description: `${n} varieties of pure Moroccan honey and pure olive oil (1 L and 5 L). Order on WhatsApp, home delivery in Marrakech, cash on delivery.` },
      ar: { title: `أنواع العسل الحر وزيت الزيتون | ${n} نوعاً | ميل دو ماروك`, description: `${n} نوعاً من العسل المغربي الحر وزيت الزيتون الطبيعي (1 لتر و5 لتر). اطلب عبر واتساب، توصيل إلى المنزل في مراكش والدفع عند الاستلام.` },
    },
    '/about': {
      fr: { title: 'Miel Artisanal du Maroc | Famille Apicultrice depuis 1995 | Atlas', description: "Famille apicultrice de Marrakech depuis 1995. Miel pur récolté à la main dans les montagnes de l'Atlas, livré directement chez vous à Marrakech." },
      en: { title: 'Artisanal Moroccan Honey | Beekeeping Family since 1995 | Atlas', description: 'A Marrakech beekeeping family since 1995. Pure honey harvested by hand in the Atlas Mountains, delivered straight to your door in Marrakech.' },
      ar: { title: 'عسل مغربي حرفي | عائلة نحّالين منذ 1995 | الأطلس', description: 'عائلة نحّالين من مراكش منذ 1995. عسل حر يُجنى يدوياً في جبال الأطلس ويصلكم مباشرة إلى منازلكم في مراكش.' },
    },
    '/health-benefits': {
      fr: { title: 'Bienfaits du Miel Pur du Maroc | Origan, Thym, Nigelle', description: "Les bienfaits du vrai miel pur marocain : miel d'origan, thym pour la respiration, nigelle pour l'immunité, romarin pour le foie, câpre antioxydant." },
      en: { title: 'Health Benefits of Pure Moroccan Honey | Oregano, Thyme, Nigella', description: 'The benefits of real Moroccan honey: oregano honey, thyme for breathing, nigella for immunity, rosemary for the liver, antioxidant caper honey.' },
      ar: { title: 'فوائد العسل المغربي الحر | الزعتر، الزعيترة، الحبة السوداء', description: 'فوائد العسل المغربي الحر: عسل الزعتر، الزعيترة للتنفس، الحبة السوداء للمناعة، إكليل الجبل للكبد، وعسل الكبار الغني بمضادات الأكسدة.' },
    },
    '/shipping': {
      fr: { title: 'Livraison à Domicile à Marrakech | Paiement à la Livraison | Miel du Maroc', description: "Commandez votre miel pur et votre huile d'olive sur WhatsApp : notre livreur vous les apporte chez vous à Marrakech. Paiement en espèces à la livraison." },
      en: { title: 'Home Delivery in Marrakech | Cash on Delivery | Miel du Maroc', description: 'Order your pure honey and olive oil on WhatsApp and our driver brings them to your door in Marrakech. Pay cash on delivery.' },
      ar: { title: 'التوصيل إلى المنزل في مراكش | الدفع عند الاستلام | ميل دو ماروك', description: 'اطلب العسل الحر وزيت الزيتون عبر واتساب، ويوصلهما موصّلنا إلى باب منزلك في مراكش. الدفع نقداً عند الاستلام.' },
    },
    '/faq': {
      fr: { title: 'Questions Fréquentes | Commande, Livraison à Marrakech, Paiement | Miel du Maroc', description: "Comment commander du miel pur et de l'huile d'olive, livraison à domicile à Marrakech, paiement à la livraison, conservation du miel." },
      en: { title: 'FAQ | Ordering, Delivery in Marrakech, Payment | Miel du Maroc', description: 'How to order pure honey and olive oil, home delivery in Marrakech, cash on delivery, and how to store honey.' },
      ar: { title: 'الأسئلة الشائعة | الطلب، التوصيل في مراكش، الدفع | ميل دو ماروك', description: 'كيف تطلب العسل الحر وزيت الزيتون، التوصيل إلى المنزل في مراكش، الدفع عند الاستلام، وطريقة حفظ العسل.' },
    },
    '/contact': {
      fr: { title: "Commander Miel Pur et Huile d'Olive via WhatsApp | Livraison Marrakech", description: "Commandez votre miel pur et votre huile d'olive via WhatsApp. Livraison à domicile à Marrakech par notre livreur, paiement à la livraison." },
      en: { title: 'Order Pure Honey & Olive Oil on WhatsApp | Delivery in Marrakech', description: 'Order your pure honey and olive oil on WhatsApp. Home delivery in Marrakech by our own driver, cash on delivery.' },
      ar: { title: 'اطلب العسل الحر وزيت الزيتون عبر واتساب | التوصيل في مراكش', description: 'اطلب العسل الحر وزيت الزيتون عبر واتساب. توصيل إلى المنزل في مراكش عبر موصّلنا، والدفع عند الاستلام.' },
    },
    '/blog': {
      fr: { title: 'Blog | Bienfaits et Conseils sur le Miel Pur du Maroc | Miel du Maroc', description: "Articles sur les bienfaits du miel pur marocain : origan, thym, nigelle, romarin. Conseils pour acheter et utiliser le miel de l'Atlas." },
      en: { title: 'Blog | Benefits and Tips on Pure Moroccan Honey | Miel du Maroc', description: 'Articles on the benefits of pure Moroccan honey: oregano, thyme, nigella, rosemary. Tips for buying and using Atlas honey.' },
      ar: { title: 'المدونة | فوائد ونصائح حول العسل المغربي الحر | ميل دو ماروك', description: 'مقالات عن فوائد العسل المغربي الحر: الزعتر، الزعيترة، الحبة السوداء، إكليل الجبل. نصائح لشراء واستعمال عسل الأطلس.' },
    },
    '/cart': {
      fr: { title: 'Panier | Miel du Maroc', description: 'Votre panier Miel du Maroc.', noindex: true },
      en: { title: 'Cart | Miel du Maroc', description: 'Your Miel du Maroc cart.', noindex: true },
      ar: { title: 'السلة | ميل دو ماروك', description: 'سلة مشترياتك من ميل دو ماروك.', noindex: true },
    },
  };
}

function pName(p, lang) {
  if (lang === 'ar') return p.name_ar || p.name_fr || p.name;
  if (lang === 'en') return p.name || p.name_fr;
  return p.name_fr || p.name;
}
function pDesc(p, lang) {
  if (lang === 'ar') return p.description_ar || p.description_fr || p.description;
  if (lang === 'en') return p.description || p.description_fr;
  return p.description_fr || p.description;
}
const minPrice = (p) => Math.min(...(p.sizes || [{ price: p.price }]).map((s) => s.price));

export function productTitle(p, lang = 'fr') {
  const name = pName(p, lang);
  const from = minPrice(p);
  if (lang === 'en') return `${/\bpure\b/i.test(name) ? name : `Pure ${name}`} – from ${from} DH | Delivery in Marrakech`;
  if (lang === 'ar') return `${name} – ابتداءً من ${from} درهم | التوصيل في مراكش`;
  return `${/\bpure?\b/i.test(name) ? name : `${name} pur`} – dès ${from} DH | Livraison Marrakech`;
}

export function productDescription(p, lang = 'fr') {
  const base = (pDesc(p, lang) || '').trim().replace(/[.。]?$/, '.');
  const sizes = p.sizes || [];
  if (lang === 'en') {
    const prices = sizes.map((s) => `${fmtSize(s.size, 'en')}: ${s.price} DH`).join(', ');
    return `${base} ${prices ? prices + '. ' : ''}Home delivery in Marrakech, cash on delivery.`;
  }
  if (lang === 'ar') {
    const prices = sizes.map((s) => `${fmtSize(s.size, 'ar')}: ${s.price} درهم`).join('، ');
    return `${base} ${prices ? prices + '. ' : ''}توصيل إلى المنزل في مراكش والدفع عند الاستلام.`;
  }
  const prices = sizes.map((s) => `${fmtSize(s.size, 'fr')} : ${s.price} DH`).join(', ');
  return `${base} ${prices ? prices + '. ' : ''}Livraison à domicile à Marrakech, paiement à la livraison.`;
}

export function productJsonLd(p, lang = 'fr') {
  const sizes = p.sizes || [{ size: '', price: p.price }];
  const url = SITE_URL + langPath(`/products/${p.id}`, lang);
  const images = [p.image, ...sizes.map((s) => s.image)].filter(Boolean).map((i) => SITE_URL + i);
  const name = pName(p, lang);
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    alternateName: [p.name_fr, p.name, p.name_ar].filter((x) => x && x !== name),
    description: pDesc(p, lang),
    image: [...new Set(images)],
    url,
    sku: p.id,
    brand: { '@type': 'Brand', name: 'Miel du Maroc' },
    countryOfOrigin: 'MA',
    offers: sizes.map((s) => ({
      '@type': 'Offer',
      name: `${name} ${fmtSize(s.size, lang)}`.trim(),
      price: String(s.price),
      priceCurrency: 'MAD',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      url,
      seller: { '@type': 'Organization', name: 'Miel du Maroc' },
    })),
  };
}

export function blogMeta(b, lang = 'fr') {
  const title = (lang === 'ar' ? b.title_ar : lang === 'en' ? b.title : b.title_fr) || b.title_fr || b.title;
  const description = (lang === 'ar' ? b.excerpt_ar : lang === 'en' ? b.excerpt : b.excerpt_fr) || b.excerpt_fr || b.excerpt;
  return { title: `${title} | Miel du Maroc`, headline: title, description };
}

// Title/description for any address (path without language prefix).
export function metaFor(path, lang, products, posts) {
  const pages = staticPages(products);
  if (pages[path]) return pages[path][lang];
  let m = path.match(/^\/products\/([^/]+)$/);
  if (m) {
    const p = products.find((x) => x.id === m[1]);
    if (p) return { title: productTitle(p, lang), description: productDescription(p, lang) };
  }
  m = path.match(/^\/blog\/([^/]+)$/);
  if (m) {
    const b = posts.find((x) => x.slug === m[1]);
    if (b) return blogMeta(b, lang);
  }
  return null;
}
