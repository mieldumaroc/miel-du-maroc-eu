/*
 * Runs after `craco build`. For every page, in French (/), English (/en) and
 * Arabic (/ar), it writes a copy of build/index.html whose <head> carries that
 * page's own title, description, language, canonical address, links to the
 * other two languages (hreflang), share preview and Google product data.
 * It also writes the sitemap. The React app itself loads exactly as before.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const BUILD = path.join(ROOT, 'build');

// Load an ES-module source file without a bundler: strip `export` and run it.
function loadModule(file, names) {
  const src = fs.readFileSync(path.join(ROOT, file), 'utf8').replace(/^export\s+(const|function)/gm, '$1');
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(`${src}\n;globalThis.__out = { ${names.join(', ')} };`, ctx);
  return ctx.__out;
}

const { PRODUCTS, BLOG_POSTS } = loadModule('src/data/products.js', ['PRODUCTS', 'BLOG_POSTS']);
const M = loadModule('src/seo/meta.js', ['SITE_URL', 'SEO_LANGS', 'OG_LOCALE', 'langPath', 'metaFor', 'productJsonLd', 'blogMeta']);
const { SITE_URL, SEO_LANGS, OG_LOCALE, langPath, metaFor, productJsonLd, blogMeta } = M;

const DEFAULT_IMAGE = '/og-image.jpg';
const CRUMB = { fr: ['Accueil', 'Nos Produits'], en: ['Home', 'Our Products'], ar: ['الرئيسية', 'منتجاتنا'] };

// Pages without a language prefix; each is built three times.
const basePages = [
  { path: '/', keep: ['store'] },
  { path: '/products', keep: ['store'] },
  { path: '/about' }, { path: '/health-benefits' }, { path: '/shipping' },
  { path: '/faq', keep: ['faq'] }, { path: '/contact' }, { path: '/blog' },
  ...PRODUCTS.map((p) => ({ path: `/products/${p.id}`, product: p })),
  ...BLOG_POSTS.map((b) => ({ path: `/blog/${b.slug}`, post: b })),
];

function breadcrumb(items) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, url], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE_URL + url })),
  };
}

function shareImage(pg) {
  if (pg.product) {
    const jpg = path.join(ROOT, 'public/honey-images/share', `${pg.product.id}.jpg`);
    return fs.existsSync(jpg) ? `/honey-images/share/${pg.product.id}.jpg` : pg.product.image;
  }
  if (pg.post) return pg.post.image || DEFAULT_IMAGE;
  return DEFAULT_IMAGE;
}

function jsonLdFor(pg, lang) {
  if (pg.product) {
    const p = pg.product;
    const name = lang === 'ar' ? (p.name_ar || p.name_fr) : lang === 'en' ? p.name : (p.name_fr || p.name);
    return [productJsonLd(p, lang), breadcrumb([[CRUMB[lang][0], langPath('/', lang)], [CRUMB[lang][1], langPath('/products', lang)], [name, langPath(pg.path, lang)]])];
  }
  if (pg.post) {
    const b = pg.post; const m = blogMeta(b, lang);
    return [{
      '@context': 'https://schema.org', '@type': 'Article', headline: m.headline, description: m.description,
      inLanguage: lang, image: SITE_URL + (b.image || DEFAULT_IMAGE), datePublished: b.published_at,
      author: { '@type': 'Organization', name: 'Miel du Maroc' },
      publisher: { '@type': 'Organization', name: 'Miel du Maroc', logo: { '@type': 'ImageObject', url: `${SITE_URL}/honey-images/logo-mdm-600.png` } },
      mainEntityOfPage: SITE_URL + langPath(pg.path, lang),
    }];
  }
  return [];
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function setMeta(html, attr, key, value) {
  const re = new RegExp(`<meta(?![^>]*\\blang=)[^>]*\\b${attr}="${key}"[^>]*>`, 'i');
  if (!re.test(html)) throw new Error(`missing <meta ${attr}="${key}">`);
  return html.replace(re, `<meta ${attr}="${key}" content="${esc(value)}">`);
}


// Readable content inside #root for search engines and for the first moment
// before the app starts; React replaces it as soon as it loads.
const H1 = {
  '/': { fr: "Des Montagnes de l'Atlas à Votre Table", en: 'From the Atlas Mountains to Your Table', ar: 'من جبال الأطلس إلى مائدتكم' },
  '/products': { fr: 'Nos Miels Purs et Huile d’Olive', en: 'Our Pure Honeys and Olive Oil', ar: 'العسل الحر وزيت الزيتون' },
  '/about': { fr: 'À Propos de Miel du Maroc', en: 'About Miel du Maroc', ar: 'من نحن' },
  '/health-benefits': { fr: 'Les Miels du Maroc et leurs Usages', en: 'Moroccan Honeys and Their Uses', ar: 'أنواع العسل المغربي واستعمالاتها' },
  '/shipping': { fr: 'Livraison partout au Maroc', en: 'Delivery across Morocco', ar: 'التوصيل لجميع أنحاء المغرب' },
  '/faq': { fr: 'Questions Fréquentes', en: 'Frequently Asked Questions', ar: 'الأسئلة الشائعة' },
  '/contact': { fr: 'Contactez-Nous', en: 'Contact Us', ar: 'اتصل بنا' },
  '/blog': { fr: 'Notre Blog', en: 'Our Blog', ar: 'مدونتنا' },
};
const NAV = { fr: ['Accueil', 'Nos produits', 'Livraison', 'Contact'], en: ['Home', 'Our products', 'Delivery', 'Contact'], ar: ['الرئيسية', 'منتجاتنا', 'التوصيل', 'اتصل بنا'] };
function rootContent(pg, lang, meta) {
  let h1 = H1[pg.path] && H1[pg.path][lang];
  let extra = '';
  if (pg.product) {
    const p = pg.product;
    h1 = lang === 'ar' ? (p.name_ar || p.name_fr) : lang === 'en' ? p.name : (p.name_fr || p.name);
    const unit = lang === 'ar' ? 'درهم' : 'DH';
    extra = `<ul>${(p.sizes || []).map((s) => `<li>${esc(s.size)} — ${s.price} ${unit}</li>`).join('')}</ul>`;
  } else if (pg.post) {
    h1 = blogMeta(pg.post, lang).headline;
  } else if (pg.path === '/products') {
    extra = `<ul>${PRODUCTS.map((p) => `<li><a href="${langPath(`/products/${p.id}`, lang)}">${esc(lang === 'ar' ? (p.name_ar || p.name_fr) : lang === 'en' ? p.name : p.name_fr)}</a></li>`).join('')}</ul>`;
  }
  const links = ['/', '/products', '/shipping', '/contact'].map((l, i) => `<a href="${langPath(l, lang)}">${NAV[lang][i]}</a>`).join(' · ');
  return `<div style="max-width:720px;margin:0 auto;padding:120px 24px 48px;font-family:Georgia,serif;color:#1A1713"><p>Miel du Maroc</p><h1>${esc(h1 || meta.title)}</h1><p>${esc(meta.description)}</p>${extra}<nav>${links}</nav></div>`;
}

const template = fs.readFileSync(path.join(BUILD, 'index.html'), 'utf8');

function render(pg, lang) {
  const meta = metaFor(pg.path, lang, PRODUCTS, BLOG_POSTS);
  const url = SITE_URL + langPath(pg.path, lang);
  const image = SITE_URL + shareImage(pg);
  let html = template;
  html = html.replace(/<html[^>]*>/, `<html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`);
  html = setMeta(html, 'name', 'description', meta.description);
  html = html.replace(/<link[^>]*rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}">`);
  html = setMeta(html, 'property', 'og:type', pg.product ? 'product' : pg.post ? 'article' : 'website');
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'property', 'og:title', meta.title);
  html = setMeta(html, 'property', 'og:description', meta.description);
  html = setMeta(html, 'property', 'og:image', image);
  html = setMeta(html, 'property', 'og:locale', OG_LOCALE[lang]);
  html = setMeta(html, 'name', 'twitter:title', meta.title);
  html = setMeta(html, 'name', 'twitter:description', meta.description);
  html = setMeta(html, 'name', 'twitter:image', image);
  // The French-only Arabic description/keywords in the template are not needed on per-language pages.
  html = html.replace(/<meta[^>]*name="(description|keywords)"[^>]*lang="ar"[^>]*>/g, '').replace(/<meta[^>]*lang="ar"[^>]*name="(description|keywords)"[^>]*>/g, '');
  for (const block of ['store', 'faq']) {
    const keep = (pg.keep || []).includes(block) && (block !== 'faq' || lang === 'fr');
    if (!keep) html = html.replace(new RegExp(`<script[^>]*data-seo="${block}"[^>]*>[\\s\\S]*?<\\/script>`), '');
  }
  const alternates = [...SEO_LANGS.map((l) => [l, l]), ['x-default', 'fr']]
    .map(([hl, l]) => `<link rel="alternate" hreflang="${hl}" href="${SITE_URL}${langPath(pg.path, l)}">`).join('');
  const ld = jsonLdFor(pg, lang).map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`).join('');
  html = html.replace('<div id="root"></div>', `<div id="root">${rootContent(pg, lang, meta)}</div>`);
  return html.replace('</head>', `${alternates}${ld}</head>`);
}

let count = 0;
for (const pg of basePages) {
  for (const lang of SEO_LANGS) {
    const dir = path.join(BUILD, langPath(pg.path, lang));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), render(pg, lang));
    count++;
  }
}

// Unknown addresses: the app shows its "not found" message; Google is told not to index it.
fs.writeFileSync(path.join(BUILD, '404.html'), template.replace(/<meta name="robots"[^>]*>/, '<meta name="robots" content="noindex">'));

// Sitemap with every language version and its alternates, rebuilt on each deploy.
const today = new Date().toISOString().slice(0, 10);
const prio = (p) => (p === '/' ? '1.0' : p === '/products' ? '0.9' : p.startsWith('/products/') ? '0.8' : '0.6');
const urls = [];
for (const pg of basePages) {
  const alts = [...SEO_LANGS.map((l) => [l, l]), ['x-default', 'fr']]
    .map(([hl, l]) => `<xhtml:link rel="alternate" hreflang="${hl}" href="${SITE_URL}${langPath(pg.path, l)}"/>`).join('');
  const img = pg.product ? `<image:image><image:loc>${SITE_URL}${pg.product.image}</image:loc></image:image>` : '';
  for (const lang of SEO_LANGS) {
    urls.push(`  <url><loc>${SITE_URL}${langPath(pg.path, lang)}</loc><lastmod>${today}</lastmod><priority>${prio(pg.path)}</priority>${alts}${img}</url>`);
  }
}
fs.writeFileSync(path.join(BUILD, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join('\n')}\n</urlset>\n`);

console.log(`SEO: wrote ${count} pages (${basePages.length} pages × ${SEO_LANGS.length} languages) and a sitemap with ${urls.length} addresses.`);
