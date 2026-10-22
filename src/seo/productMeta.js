// Shared by the product page (in the browser) and scripts/prerender-seo.js (at build time),
// so the title Google reads in the HTML matches the title the page sets itself.
export const SITE_URL = 'https://www.mieldumaroc.com';

const fmtSize = (s) => s.replace(/(\d)(g|kg|L)$/i, '$1 $2');

export function productTitle(p) {
  const name = p.name_fr || p.name;
  const from = Math.min(...(p.sizes || [{ price: p.price }]).map((s) => s.price));
  const label = /\bpure?\b/i.test(name) ? name : `${name} pur`;
  return `${label} – dès ${from} DH | Livraison Marrakech`;
}

export function productDescription(p) {
  const base = (p.description_fr || p.description || '').trim().replace(/\.?$/, '.');
  const prices = (p.sizes || []).map((s) => `${fmtSize(s.size)} : ${s.price} DH`).join(', ');
  return `${base} ${prices ? prices + '. ' : ''}Livraison à domicile à Marrakech, paiement à la livraison.`;
}

export function productJsonLd(p) {
  const sizes = p.sizes || [{ size: '', price: p.price }];
  const url = `${SITE_URL}/products/${p.id}`;
  const images = [p.image, ...sizes.map((s) => s.image)].filter(Boolean).map((i) => SITE_URL + i);
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name_fr || p.name,
    alternateName: [p.name, p.name_ar].filter(Boolean),
    description: p.description_fr || p.description,
    image: [...new Set(images)],
    url,
    sku: p.id,
    brand: { '@type': 'Brand', name: 'Miel du Maroc' },
    countryOfOrigin: 'MA',
    offers: sizes.map((s) => ({
      '@type': 'Offer',
      name: `${p.name_fr || p.name} ${fmtSize(s.size)}`.trim(),
      price: String(s.price),
      priceCurrency: 'MAD',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      url,
      seller: { '@type': 'Organization', name: 'Miel du Maroc' },
    })),
  };
}
