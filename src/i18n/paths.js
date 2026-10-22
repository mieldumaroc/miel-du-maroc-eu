// French lives at the root (/products/thym); English and Arabic get a prefix
// (/en/products/thym, /ar/products/thym), so Google can index all three.
export const LANGS = ['fr', 'en', 'ar'];
export const DEFAULT_LANG = 'fr';

export function splitLang(pathname = '/') {
  const m = pathname.match(/^\/(en|ar)(?=\/|$)/);
  if (!m) return { lang: DEFAULT_LANG, path: pathname || '/' };
  const rest = pathname.slice(m[0].length);
  return { lang: m[1], path: rest === '' ? '/' : rest };
}

export function withLang(path, lang) {
  if (!path || !path.startsWith('/')) return path;
  const clean = splitLang(path).path;
  if (lang === DEFAULT_LANG) return clean;
  return clean === '/' ? `/${lang}` : `/${lang}${clean}`;
}
