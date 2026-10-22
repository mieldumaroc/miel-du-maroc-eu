/*
 * Runs after `craco build`. For every page of the site it writes a copy of
 * build/index.html whose <head> carries that page's own title, description,
 * canonical URL, share preview (WhatsApp, Facebook) and, for products, Google
 * product data. The React app still loads exactly as before.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const BUILD = path.join(ROOT, 'build');

// Load an ES-module source file without a bundler: strip `export` and run it.
function loadModule(file, names) {
  const src = fs.readFileSync(path.join(ROOT, file), 'utf8')
    .replace(/^export\s+(const|function)/gm, '$1');
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(`${src}\n;globalThis.__out = { ${names.join(', ')} };`, ctx);
  return ctx.__out;
}

const { PRODUCTS, BLOG_POSTS } = loadModule('src/data/products.js', ['PRODUCTS', 'BLOG_POSTS']);
const { SITE_URL, productTitle, productDescription, productJsonLd } =
  loadModule('src/seo/productMeta.js', ['SITE_URL', 'productTitle', 'productDescription', 'productJsonLd']);

const HONEY_COUNT = PRODUCTS.filter((p) => p.category !== 'oil').length;
const DEFAULT_IMAGE = '/og-image.jpg';

const pages = [
  { path: '/products', title: `Nos Miels Purs et Huile d'Olive | ${HONEY_COUNT} Variétés | Miel du Maroc`,
    description: `${HONEY_COUNT} variétés de miel pur du Maroc et huile d'olive pure (1 L et 5 L). Commande sur WhatsApp, livraison à domicile à Marrakech, paiement à la livraison.`,
    keep: ['store'] },
  { path: '/about', title: 'Miel Artisanal Maroc | Famille Apicultrice depuis 1995 | Atlas',
    description: "Famille apicultrice de Marrakech depuis 1995. Miel pur récolté à la main dans les montagnes de l'Atlas, livré directement chez vous à Marrakech." },
  { path: '/health-benefits', title: 'Bienfaits Miel Pur Maroc | Origan Thym Nigelle Thérapeutique',
    description: "Découvrez les bienfaits du vrai miel pur marocain : miel d'origan antibactérien, thym respiratoire, nigelle immunitaire, romarin foie, câpre antioxydant." },
  { path: '/shipping', title: 'Livraison à Domicile à Marrakech | Paiement à la Livraison | Miel du Maroc',
    description: "Commandez votre miel pur et votre huile d'olive sur WhatsApp : notre livreur vous les apporte chez vous à Marrakech. Paiement en espèces à la livraison." },
  { path: '/faq', title: 'Questions Fréquentes | Commande, Livraison à Marrakech, Paiement | Miel du Maroc',
    description: "Comment commander du miel pur et de l'huile d'olive, livraison à domicile à Marrakech, paiement à la livraison, conservation du miel.",
    keep: ['faq'] },
  { path: '/contact', title: "Commander Miel Pur et Huile d'Olive via WhatsApp | Livraison Marrakech",
    description: "Commandez votre miel pur et votre huile d'olive via WhatsApp. Livraison à domicile à Marrakech par notre livreur, paiement à la livraison." },
  { path: '/blog', title: 'Bienfaits Miel Maroc | Origan Thym Nigelle Thérapeutique | Blog',
    description: "Articles sur les bienfaits du miel pur marocain : miel d'origan, thym, nigelle, romarin. Conseils pour acheter et utiliser le miel de l'Atlas." },
];

for (const p of PRODUCTS) {
  pages.push({
    path: `/products/${p.id}`,
    title: productTitle(p),
    description: productDescription(p),
    // WhatsApp and Facebook previews need a JPEG; fall back to the product photo.
    image: fs.existsSync(path.join(ROOT, 'public/honey-images/share', `${p.id}.jpg`)) ? `/honey-images/share/${p.id}.jpg` : p.image,
    type: 'product',
    jsonLd: [productJsonLd(p), breadcrumb([['Accueil', '/'], ['Nos Produits', '/products'], [p.name_fr || p.name, `/products/${p.id}`]])],
  });
}

for (const b of BLOG_POSTS) {
  const title = b.title_fr || b.title;
  pages.push({
    path: `/blog/${b.slug}`,
    title: `${title} | Miel du Maroc`,
    description: b.excerpt_fr || b.excerpt,
    image: b.image,
    type: 'article',
    jsonLd: [{
      '@context': 'https://schema.org', '@type': 'Article', headline: title,
      description: b.excerpt_fr || b.excerpt, image: SITE_URL + (b.image || DEFAULT_IMAGE),
      datePublished: b.published_at, author: { '@type': 'Organization', name: 'Miel du Maroc' },
      publisher: { '@type': 'Organization', name: 'Miel du Maroc', logo: { '@type': 'ImageObject', url: `${SITE_URL}/honey-images/logo-mdm-600.png` } },
      mainEntityOfPage: `${SITE_URL}/blog/${b.slug}`,
    }],
  });
}

function breadcrumb(items) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, url], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE_URL + url })),
  };
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function setMeta(html, attr, key, value) {
  // Matches <meta name="description" content="..."> (but not the lang="ar" one), in any attribute order.
  const re = new RegExp(`<meta(?![^>]*\\blang=)[^>]*\\b${attr}="${key}"[^>]*>`, 'i');
  if (!re.test(html)) throw new Error(`missing <meta ${attr}="${key}">`);
  return html.replace(re, `<meta ${attr}="${key}" content="${esc(value)}">`);
}

const template = fs.readFileSync(path.join(BUILD, 'index.html'), 'utf8');

function render(page) {
  const url = SITE_URL + page.path;
  const image = SITE_URL + (page.image || DEFAULT_IMAGE);
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`);
  html = setMeta(html, 'name', 'description', page.description);
  html = html.replace(/<link[^>]*rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}">`);
  html = setMeta(html, 'property', 'og:type', page.type || 'website');
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'property', 'og:title', page.title);
  html = setMeta(html, 'property', 'og:description', page.description);
  html = setMeta(html, 'property', 'og:image', image);
  html = setMeta(html, 'name', 'twitter:title', page.title);
  html = setMeta(html, 'name', 'twitter:description', page.description);
  html = setMeta(html, 'name', 'twitter:image', image);
  for (const block of ['store', 'faq']) {
    if (!(page.keep || []).includes(block)) {
      html = html.replace(new RegExp(`<script[^>]*data-seo="${block}"[^>]*>[\\s\\S]*?<\\/script>`), '');
    }
  }
  const ld = (page.jsonLd || []).map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`).join('');
  return html.replace('</head>', `${ld}</head>`);
}

for (const page of pages) {
  const dir = path.join(BUILD, page.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), render(page));
}
fs.writeFileSync(path.join(BUILD, '404.html'), template.replace(/<meta name="robots"[^>]*>/, '<meta name="robots" content="noindex">'));
console.log(`SEO: wrote ${pages.length} pages with their own title, description, canonical and share preview.`);
