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
      fr: { title: "Miel Pur et Huile d'Olive du Maroc | Miel du Maroc", description: "Miel pur de l'Atlas et huile d'olive pure, livrés à Marrakech et partout au Maroc. Paiement à la livraison. Famille apicultrice depuis 1995." },
      en: { title: 'Pure Moroccan Honey & Olive Oil | Miel du Maroc', description: 'Raw honey from the Atlas Mountains and pure olive oil, delivered in Marrakech and all over Morocco. Cash on delivery. Beekeepers since 1995.' },
      ar: { title: 'عسل حر طبيعي وزيت زيتون مغربي | ميل دو ماروك', description: 'عسل حر من جبال الأطلس وزيت زيتون طبيعي، يصلكم إلى باب المنزل في مراكش وجميع مدن المغرب. الدفع عند الاستلام. عائلة نحّالين منذ 1995.' },
    },
    '/products': {
      fr: { title: `${n} Miels Purs et Huile d'Olive | Miel du Maroc`, description: `${n} variétés de miel pur du Maroc et huile d'olive pure (1 L et 5 L). Commande sur WhatsApp, livraison à Marrakech et partout au Maroc, paiement à la livraison.` },
      en: { title: `Our Pure Honeys & Olive Oil | ${n} Varieties | Miel du Maroc`, description: `${n} varieties of pure Moroccan honey and pure olive oil (1 L and 5 L). Order on WhatsApp, delivery in Marrakech and all over Morocco, cash on delivery.` },
      ar: { title: `أنواع العسل الحر وزيت الزيتون | ${n} نوعاً | ميل دو ماروك`, description: `${n} نوعاً من العسل المغربي الحر وزيت الزيتون الطبيعي (1 لتر و5 لتر). اطلب عبر واتساب، التوصيل في مراكش وجميع أنحاء المغرب والدفع عند الاستلام.` },
    },
    '/about': {
      fr: { title: 'Miel Artisanal du Maroc, Apiculteurs depuis 1995', description: "Famille apicultrice de Marrakech depuis 1995. Miel pur récolté à la main dans les montagnes de l'Atlas, livré chez vous à Marrakech et partout au Maroc." },
      en: { title: 'Artisanal Moroccan Honey, Beekeepers since 1995', description: 'A Marrakech beekeeping family since 1995. Pure honey harvested by hand in the Atlas Mountains, delivered to your door in Marrakech and all over Morocco.' },
      ar: { title: 'عسل مغربي حرفي | عائلة نحّالين منذ 1995 | الأطلس', description: 'عائلة نحّالين من مراكش منذ 1995. عسل حر يُجنى يدوياً في جبال الأطلس ويصلكم إلى منازلكم في مراكش وفي جميع أنحاء المغرب.' },
    },
    '/health-benefits': {
      fr: { title: 'Bienfaits du Miel Pur du Maroc | Origan, Thym, Nigelle', description: "Nos miels purs du Maroc et leurs usages traditionnels : origan, thym, nigelle, câpre, jujubier et plus, récoltés dans les montagnes de l'Atlas." },
      en: { title: 'Benefits of Pure Moroccan Honey | Miel du Maroc', description: 'Discover our Moroccan honeys and their traditional uses: oregano, thyme, nigella, caper, sidr and more, from the Atlas Mountains.' },
      ar: { title: 'فوائد العسل المغربي الحر | الزعتر، الزعيترة، الحبة السوداء', description: 'عسلنا المغربي الحر واستعمالاته التقليدية: الزعتر، الزعيترة، الحبة السوداء، الكبار، السدر وغيرها، من جبال الأطلس.' },
    },
    '/shipping': {
      fr: { title: 'Livraison partout au Maroc | Miel du Maroc', description: "Notre livreur à Marrakech, un transporteur partout ailleurs au Maroc. Frais confirmés sur WhatsApp, paiement à la livraison." },
      en: { title: 'Delivery in Marrakech & All Over Morocco | Cash on Delivery', description: 'Order on WhatsApp: our own driver delivers in Marrakech, and a courier everywhere else in Morocco. Fees confirmed on WhatsApp, cash on delivery.' },
      ar: { title: 'التوصيل في مراكش وجميع أنحاء المغرب | الدفع عند الاستلام', description: 'اطلب عبر واتساب: موصّلنا الخاص يوصل في مراكش، وشركة توصيل في باقي مدن المغرب. نؤكد الرسوم عبر واتساب، والدفع عند الاستلام.' },
    },
    '/faq': {
      fr: { title: 'Questions Fréquentes | Miel du Maroc', description: "Comment commander du miel pur et de l'huile d'olive, livraison à Marrakech et partout au Maroc, paiement à la livraison, conservation du miel." },
      en: { title: 'FAQ: Ordering, Delivery and Payment | Miel du Maroc', description: 'How to order pure honey and olive oil, delivery in Marrakech and all over Morocco, cash on delivery, and how to store honey.' },
      ar: { title: 'الأسئلة الشائعة | ميل دو ماروك', description: 'كيف تطلب العسل الحر وزيت الزيتون، التوصيل في مراكش وجميع أنحاء المغرب، الدفع عند الاستلام، وطريقة حفظ العسل.' },
    },
    '/contact': {
      fr: { title: 'Contact et Commande | Miel du Maroc', description: "Commandez votre miel pur et votre huile d'olive via WhatsApp. Livraison à Marrakech et partout au Maroc, paiement à la livraison." },
      en: { title: 'Contact and Orders | Miel du Maroc', description: 'Order your pure honey and olive oil on WhatsApp. Delivery in Marrakech and all over Morocco, cash on delivery.' },
      ar: { title: 'اتصل بنا واطلب | ميل دو ماروك', description: 'اطلب العسل الحر وزيت الزيتون عبر واتساب. التوصيل في مراكش وجميع أنحاء المغرب، والدفع عند الاستلام.' },
    },
    '/blog': {
      fr: { title: 'Blog : Conseils sur le Miel Pur | Miel du Maroc', description: "Articles sur les bienfaits du miel pur marocain : origan, thym, nigelle, câpre. Conseils pour acheter et utiliser le miel de l'Atlas." },
      en: { title: 'Blog: Tips on Pure Moroccan Honey | Miel du Maroc', description: 'Articles on the benefits of pure Moroccan honey: oregano, thyme, nigella, caper. Tips for buying and using Atlas honey.' },
      ar: { title: 'المدونة | فوائد ونصائح حول العسل المغربي الحر | ميل دو ماروك', description: 'مقالات عن فوائد العسل المغربي الحر: الزعتر، الزعيترة، الحبة السوداء، الكبار. نصائح لشراء واستعمال عسل الأطلس.' },
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
  if (lang === 'en') {
    const n = /\bpure\b/i.test(name) ? name : `Pure ${name}`;
    return fitTitle(`${n} – from ${from} DH | Delivery in Morocco`, `${n} – from ${from} DH`, name);
  }
  if (lang === 'ar') return fitTitle(`${name} – ابتداءً من ${from} درهم | التوصيل لكل المغرب`, `${name} – ابتداءً من ${from} درهم`, name);
  const n = /\bpure?\b/i.test(name) ? name : `${name} pur`;
  return fitTitle(`${n} – dès ${from} DH | Livraison au Maroc`, `${n} – dès ${from} DH`, name);
}

export function productDescription(p, lang = 'fr') {
  const base = (pDesc(p, lang) || '').trim().replace(/[.。]?$/, '.');
  const first = base.split(/(?<=[.!؟])\s/)[0];
  const name = pName(p, lang);
  const sizes = p.sizes || [];
  if (lang === 'en') {
    const prices = sizes.map((s) => `${fmtSize(s.size, 'en')} ${s.price} DH`).join(', ');
    const tail = 'Delivery across Morocco, cash on delivery.';
    return fitDesc(`${base} ${prices}. ${tail}`, `${first} ${prices}. ${tail}`, `${first} ${prices}.`, `${first} ${tail}`, `${name} : ${prices}. ${tail}`);
  }
  if (lang === 'ar') {
    const prices = sizes.map((s) => `${fmtSize(s.size, 'ar')} ${s.price} درهم`).join('، ');
    const tail = 'التوصيل لكل المغرب والدفع عند الاستلام.';
    return fitDesc(`${base} ${prices}. ${tail}`, `${first} ${prices}. ${tail}`, `${first} ${prices}.`, `${first} ${tail}`, `${name} : ${prices}. ${tail}`);
  }
  const prices = sizes.map((s) => `${fmtSize(s.size, 'fr')} ${s.price} DH`).join(', ');
  const tail = 'Livraison partout au Maroc, paiement à la livraison.';
  return fitDesc(`${base} ${prices}. ${tail}`, `${first} ${prices}. ${tail}`, `${first} ${prices}.`, `${first} ${tail}`, `${name} : ${prices}. ${tail}`);
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
      availability: p.available === false ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      url,
      seller: { '@type': 'Organization', name: 'Miel du Maroc' },
    })),
  };
}

// Shorter titles for search results where the article title is too long.
const BLOG_SEO_TITLES = {
  'moroccan-honey-traditions': { fr: "L'Apiculture Ancestrale dans l'Atlas | Miel du Maroc", en: 'Ancient Beekeeping in the Atlas | Miel du Maroc', ar: 'تربية النحل التقليدية في الأطلس | ميل دو ماروك' },
  'caper-honey-rarest-honey-morocco': { fr: 'Miel de Câpre, le Plus Rare du Maroc | Miel du Maroc', en: "Caper Honey, Morocco's Rarest Honey | Miel du Maroc", ar: 'عسل الكبار، أندر عسل في المغرب | ميل دو ماروك' },
  'health-benefits-thyme-honey': { fr: "Miel de Thym de l'Atlas | Miel du Maroc", en: 'Thyme Honey from the Atlas | Miel du Maroc', ar: 'عسل الزعيترة من الأطلس | ميل دو ماروك' },
};

export function blogMeta(b, lang = 'fr') {
  const title = (lang === 'ar' ? b.title_ar : lang === 'en' ? b.title : b.title_fr) || b.title_fr || b.title;
  const description = (lang === 'ar' ? b.excerpt_ar : lang === 'en' ? b.excerpt : b.excerpt_fr) || b.excerpt_fr || b.excerpt;
  const short = BLOG_SEO_TITLES[b.slug] && BLOG_SEO_TITLES[b.slug][lang];
  return { title: fitTitle(`${title} | Miel du Maroc`, short, title), headline: title, description: fitDesc(description) };
}

// Title/description for any address (path without language prefix).
// Search engines show about 60 characters of a title and 160 of a description.
const TITLE_MAX = 60;
const DESC_MAX = 160;
function clip(text, max) {
  const t = String(text || '').replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const at = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf(' '));
  return `${cut.slice(0, at > max * 0.6 ? at : max - 1).replace(/[\s,;:.–-]+$/, '')}…`;
}
function fitTitle(...options) {
  return options.find((o) => o && o.length <= TITLE_MAX) || clip(options[options.length - 1], TITLE_MAX);
}
function fitDesc(...options) {
  const opts = options.filter(Boolean).map((o) => o.replace(/\s+/g, ' ').trim());
  return opts.find((o) => o.length >= 70 && o.length <= DESC_MAX) || clip(opts[0], DESC_MAX);
}

export function metaFor(path, lang, products, posts) {
  const pages = staticPages(products);
  if (pages[path]) {
    const m = pages[path][lang];
    return { ...m, title: fitTitle(m.title), description: fitDesc(m.description) };
  }
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
