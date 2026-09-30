import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    nav: { home: 'Home', products: 'Our Honeys', about: 'About', healthBenefits: 'Benefits', shipping: 'Shipping', faq: 'FAQ', contact: 'Contact', blog: 'Blog' },
    hero: { tagline: '100% Pure Moroccan Honey', title: 'From the Atlas Mountains to Your Table', subtitle: 'Authentic therapeutic honey harvested by our family in Morocco since 1995', cta: 'Discover Our Collection' },
    products: { title: 'Our Honey Collection', subtitle: 'Each jar captures the essence of Morocco pristine landscapes', viewDetails: 'View Details', inquire: 'Order via WhatsApp', from: 'From', perKg: 'per 500g', healthBenefits: 'Health Benefits', selectSize: 'Select Size', addToCart: 'Add to Cart', orderWhatsApp: 'Hello, I would like to order', excellence: 'Excellence', delivery: 'Delivery', wellness: 'Wellness', contact_label: 'Contact', chatWhatsApp: 'Chat on WhatsApp', searchPlaceholder: 'Search...', collection: 'Collection', colHoney: 'Honey', colCategory: 'Category', colBenefits: 'Key Benefits', colPrice: 'Price (500g)' },
    about: { title: 'About Miel du Maroc', subtitle: 'A Family Tradition Since 1995', story: 'Family Business', tradition: 'Traditional Methods', traditionText: 'We harvest honey using time-honored techniques that preserve natural enzymes and therapeutic properties.', purity: '100% Pure', purityText: 'No additives, no processing. Pure raw honey exactly as nature intended.', direct: 'Direct from Source', directText: 'From our family hives in the Atlas Mountains directly to your table.' },
    whyUs: { title: 'Why Choose Miel du Maroc', subtitle: 'The difference is in every drop', authenticity: 'Guaranteed Authenticity', authenticityText: 'Every jar is traceable to our family hives in the Atlas', therapeutic: 'Therapeutic Quality', therapeuticText: 'Harvested at peak potency for maximum health benefits', familyBusiness: 'Family Business', familyBusinessText: 'Personal attention to every order and direct communication' },
    testimonials: { title: 'What Our Customers Say', subtitle: 'Trusted by families across Europe' },
    contact: { title: 'Contact Us', subtitle: 'We would love to hear from you', whatsapp: 'Message us on WhatsApp', whatsappText: 'Primary contact for orders and inquiries', email: 'Email', emailText: 'For detailed questions', location: 'Location', locationText: 'Marrakech, Morocco', messageLabel: 'Your message (optional)', messagePlaceholder: 'Tell us what you would like to order or ask...' },
    shipping: { title: 'Shipping and Delivery', subtitle: 'We deliver with care to Europe', info: 'All orders are carefully packaged and shipped from Morocco. Standard delivery to Europe takes 7-14 business days.', packaging: 'Careful Packaging', packagingText: 'Each jar is individually wrapped and padded for safe transit.', delivery: '7-14 Business Days', deliveryText: 'Standard delivery to all European countries from Morocco.', infoTitle: 'Shipping Information', countries: 'We ship to all European countries including France, Germany, Netherlands, Belgium, UK, Spain, Italy, Switzerland and more.', courier: 'All orders are sent via tracked international courier. You will receive a tracking number when your order ships.', processing: 'Orders are typically processed within 1-2 business days.', inquiries: 'For any shipping inquiries please contact us via WhatsApp.' },
    faq: { title: 'Frequently Asked Questions', subtitle: 'Everything you need to know', support: 'Support' },
    blog: { title: 'Our Blog', subtitle: 'Discover the world of Moroccan honey', readMore: 'Read More', backToBlog: 'Back to Blog', journal: 'Journal', catHealth: 'Health Benefits', catTraditional: 'Traditional Uses', catOrdering: 'Ordering Guide', catProduct: 'Product Spotlight' },
    payment: { title: 'How to Order', subtitle: 'Simple, secure and personal', secure: 'Secure Payment', methodsText: 'We accept international transfers for your convenience', stepTitle1: 'Browse and Choose', stepTitle2: 'Get Your Quote', stepTitle3: 'Send Payment', stepTitle4: 'Track Delivery', step1: 'Browse our honey collection and choose your favourites', step2: 'Get a personalised quote with payment details', step3: 'Send payment via your preferred transfer method', step4: 'Receive tracking number and delivery updates' },
    footer: { quickLinks: 'Quick Links', support: 'Support', followUs: 'Follow Us', copyright: '© 2024 Miel du Maroc. All rights reserved.', tagline: 'Premium Moroccan honey, lovingly harvested from the Atlas Mountains since 1995.' },
    common: { learnMore: 'Learn More', orderNow: 'Order Now', viewAll: 'View All', price: 'Price' },
    benefits: { title: 'Health Benefits of Moroccan Honey', subtitle: 'Nature most powerful remedy' },
    tags: { all: 'All', immunity: 'Immunity', respiratory: 'Respiratory', digestion: 'Digestion', energy: 'Energy', calming: 'Calming', rare: 'Rare', liverHealth: 'Liver Health', generalHealth: 'General Health', wellness: 'Wellness', warming: 'Warming', powerful: 'Powerful' },
  },
  fr: {
    nav: { home: 'Accueil', products: 'Nos Miels', about: 'A Propos', healthBenefits: 'Bienfaits', shipping: 'Livraison', faq: 'FAQ', contact: 'Contact', blog: 'Blog' },
    hero: { tagline: 'Miel Pur du Maroc', title: 'Des Montagnes de l\'Atlas a Votre Table', subtitle: 'Miel authentique et therapeutique recolte par notre famille au Maroc depuis 1995', cta: 'Decouvrir Notre Collection' },
    products: { title: 'Notre Collection de Miels', subtitle: 'Chaque pot capture l\'essence des paysages vierges du Maroc', viewDetails: 'Voir Details', inquire: 'Commander via WhatsApp', from: 'A partir de', perKg: 'par 500g', healthBenefits: 'Bienfaits pour la Sante', selectSize: 'Choisir Taille', addToCart: 'Ajouter au Panier', orderWhatsApp: 'Bonjour, je voudrais commander', excellence: 'Excellence', delivery: 'Livraison', wellness: 'Bien-etre', contact_label: 'Contact', chatWhatsApp: 'Chatter sur WhatsApp', searchPlaceholder: 'Rechercher...', collection: 'Collection', colHoney: 'Miel', colCategory: 'Categorie', colBenefits: 'Bienfaits Cles', colPrice: 'Prix (500g)' },
    about: { title: 'A Propos de Miel du Maroc', subtitle: 'Une Tradition Familiale Depuis 1995', story: 'Entreprise Familiale', tradition: 'Methodes Traditionnelles', traditionText: 'Nous recoltons le miel en utilisant des techniques ancestrales qui preservent les enzymes naturelles.', purity: '100% Pur', purityText: 'Sans additifs, sans traitement. Du miel brut pur exactement comme la nature l\'a voulu.', direct: 'Directement de la Source', directText: 'De nos ruches familiales dans les montagnes de l\'Atlas directement a votre table.' },
    whyUs: { title: 'Pourquoi Choisir Miel du Maroc', subtitle: 'La difference est dans chaque goutte', authenticity: 'Authenticite Garantie', authenticityText: 'Chaque pot est tracable jusqu\'a nos ruches familiales dans l\'Atlas', therapeutic: 'Qualite Therapeutique', therapeuticText: 'Recolte a son apogee pour des benefices sante maximaux', familyBusiness: 'Entreprise Familiale', familyBusinessText: 'Attention personnelle a chaque commande et communication directe' },
    testimonials: { title: 'Ce que Disent Nos Clients', subtitle: 'La confiance des familles a travers l\'Europe' },
    contact: { title: 'Contactez-Nous', subtitle: 'Nous serions ravis de vous entendre', whatsapp: 'Ecrivez-nous sur WhatsApp', whatsappText: 'Contact principal pour les commandes et demandes', email: 'Email', emailText: 'Pour les questions detaillees', location: 'Localisation', locationText: 'Marrakech, Maroc', messageLabel: 'Votre message (optionnel)', messagePlaceholder: 'Dites-nous ce que vous souhaitez commander ou demander...' },
    shipping: { title: 'Livraison et Expedition', subtitle: 'Nous livrons avec soin en Europe', info: 'Toutes les commandes sont soigneusement emballees et envoyees du Maroc. La livraison standard en Europe prend 7 a 14 jours ouvrables.', packaging: 'Emballage Soigneux', packagingText: 'Chaque pot est emballe individuellement pour un transit securise.', delivery: '7-14 Jours Ouvrables', deliveryText: 'Livraison standard dans tous les pays europeens depuis le Maroc.', infoTitle: 'Informations de Livraison', countries: 'Nous livrons dans tous les pays europeens incluant la France, l\'Allemagne, les Pays-Bas, la Belgique, le Royaume-Uni, l\'Espagne, l\'Italie, la Suisse et plus.', courier: 'Toutes les commandes sont envoyees via coursier international suivi.', processing: 'Les commandes sont generalement traitees dans 1-2 jours ouvrables.', inquiries: 'Pour toute question de livraison, contactez-nous via WhatsApp.' },
    faq: { title: 'Questions Frequentes', subtitle: 'Tout ce que vous devez savoir', support: 'Assistance' },
    blog: { title: 'Notre Blog', subtitle: 'Decouvrez le monde du miel marocain', readMore: 'Lire la Suite', backToBlog: 'Retour au Blog', journal: 'Journal', catHealth: 'Bienfaits Sante', catTraditional: 'Usages Traditionnels', catOrdering: 'Guide de Commande', catProduct: 'Produit en Vedette' },
    payment: { title: 'Comment Commander', subtitle: 'Simple, securise et personnel', secure: 'Paiement Securise', methodsText: 'Nous acceptons les virements internationaux pour votre commodite', stepTitle1: 'Parcourir et Choisir', stepTitle2: 'Obtenir Votre Devis', stepTitle3: 'Envoyer le Paiement', stepTitle4: 'Suivre la Livraison', step1: 'Parcourez notre collection de miels et choisissez vos favoris', step2: 'Obtenez un devis personnalise avec les details de paiement', step3: 'Envoyez le paiement via votre methode de virement preferee', step4: 'Recevez le numero de suivi et les mises a jour de livraison' },
    footer: { quickLinks: 'Liens Rapides', support: 'Support', followUs: 'Suivez-Nous', copyright: '© 2024 Miel du Maroc. Tous droits reserves.', tagline: 'Miel marocain premium, recolte avec amour dans les montagnes de l\'Atlas depuis 1995.' },
    common: { learnMore: 'En Savoir Plus', orderNow: 'Commander Maintenant', viewAll: 'Voir Tout', price: 'Prix' },
    benefits: { title: 'Bienfaits du Miel Marocain pour la Sante', subtitle: 'Le remede le plus puissant de la nature' },
    tags: { all: 'Tous', immunity: 'Immunite', respiratory: 'Respiratoire', digestion: 'Digestion', energy: 'Energie', calming: 'Calmant', rare: 'Rare', liverHealth: 'Sante du Foie', generalHealth: 'Sante Generale', wellness: 'Bien-etre', warming: 'Rechauffant', powerful: 'Puissant' },
  },
  ar: {
    nav: { home: 'الرئيسية', products: 'أعسالنا', about: 'من نحن', healthBenefits: 'الفوائد', shipping: 'الشحن', faq: 'الأسئلة', contact: 'اتصل بنا', blog: 'المدونة' },
    hero: { tagline: 'عسل مغربي طبيعي ١٠٠٪', title: 'من جبال الأطلس إلى مائدتكم', subtitle: 'عسل طبيعي وعلاجي تحصده عائلتنا في المغرب منذ عام ١٩٩٥', cta: 'اكتشف مجموعتنا' },
    products: { title: 'مجموعة عسلنا', subtitle: 'كل برطمان يحمل جوهر مناطق المغرب النقية', viewDetails: 'عرض التفاصيل', inquire: 'اطلب عبر واتساب', from: 'من', perKg: 'لكل ٥٠٠ غ', healthBenefits: 'الفوائد الصحية', selectSize: 'اختر الحجم', addToCart: 'أضف إلى السلة', orderWhatsApp: 'مرحباً، أريد طلب', excellence: 'التميز', delivery: 'التوصيل', wellness: 'العافية', contact_label: 'تواصل معنا', chatWhatsApp: 'تحدث على واتساب', searchPlaceholder: 'البحث...', collection: 'المجموعة', colHoney: 'العسل', colCategory: 'الفئة', colBenefits: 'الفوائد الرئيسية', colPrice: 'السعر (500غ)' },
    about: { title: 'عسل المغرب', subtitle: 'تقليد عائلي منذ عام ١٩٩٥', story: 'عمل عائلي', tradition: 'أساليب تقليدية', traditionText: 'نحصد العسل بتقنيات متوارثة تحافظ على الإنزيمات الطبيعية والخصائص العلاجية.', purity: '١٠٠٪ نقي', purityText: 'بدون إضافات أو معالجة. عسل نقي طبيعي كما أرادت الطبيعة.', direct: 'مباشرة من المصدر', directText: 'من خلايا النحل في جبال الأطلس مباشرة إلى مائدتكم.' },
    whyUs: { title: 'لماذا تختار عسل المغرب', subtitle: 'الفرق في كل قطرة', authenticity: 'أصالة مضمونة', authenticityText: 'كل برطمان يمكن تتبعه إلى خلايا عائلتنا في الأطلس', therapeutic: 'جودة علاجية', therapeuticText: 'يُحصد في ذروة قوته للحصول على أقصى فوائد صحية', familyBusiness: 'عمل عائلي', familyBusinessText: 'اهتمام شخصي بكل طلب وتواصل مباشر' },
    testimonials: { title: 'ماذا يقول عملاؤنا', subtitle: 'ثقة العائلات عبر أوروبا' },
    contact: { title: 'تواصل معنا', subtitle: 'يسعدنا سماعكم', whatsapp: 'راسلنا على واتساب', whatsappText: 'التواصل الرئيسي للطلبات والاستفسارات', email: 'البريد الإلكتروني', emailText: 'للأسئلة التفصيلية', location: 'الموقع', locationText: 'مراكش، المغرب', messageLabel: 'رسالتك (اختياري)', messagePlaceholder: 'أخبرنا بما تريد طلبه أو استفساره...' },
    shipping: { title: 'الشحن والتوصيل', subtitle: 'نوصل بعناية إلى أوروبا', info: 'جميع الطلبات تُعبأ بعناية وترسل من المغرب. التوصيل المعتاد إلى أوروبا يستغرق ٧-١٤ يوم عمل.', packaging: 'تغليف دقيق', packagingText: 'كل برطمان يُلف بشكل فردي ومبطن لنقل آمن.', delivery: '٧-١٤ يوم عمل', deliveryText: 'توصيل قياسي لجميع دول أوروبا من المغرب.', infoTitle: 'معلومات الشحن', countries: 'نشحن لجميع الدول الأوروبية بما فيها فرنسا وألمانيا وهولندا وبلجيكا والمملكة المتحدة وإسبانيا وإيطاليا وسويسرا وغيرها.', courier: 'جميع الطلبات ترسل عبر خدمة بريد دولي مع تتبع.', processing: 'تُعالج الطلبات عادةً خلال ١-٢ يوم عمل.', inquiries: 'لأي استفسارات حول الشحن، تواصل معنا عبر واتساب.' },
    faq: { title: 'الأسئلة الشائعة', subtitle: 'كل ما تحتاج معرفته', support: 'الدعم' },
    blog: { title: 'مدونتنا', subtitle: 'اكتشف عالم العسل المغربي', readMore: 'اقرأ المزيد', backToBlog: 'العودة للمدونة', journal: 'المدونة', catHealth: 'الفوائد الصحية', catTraditional: 'الاستخدامات التقليدية', catOrdering: 'دليل الطلب', catProduct: 'منتج مميز' },
    payment: { title: 'كيفية الطلب', subtitle: 'بسيط وآمن وشخصي', secure: 'دفع آمن', methodsText: 'نقبل التحويلات الدولية لراحتكم', stepTitle1: 'تصفح واختر', stepTitle2: 'احصل على عرضك', stepTitle3: 'أرسل الدفع', stepTitle4: 'تتبع التوصيل', step1: 'تصفح مجموعة عسلنا واختر مفضلاتك', step2: 'احصل على عرض مخصص مع تفاصيل الدفع', step3: 'أرسل الدفع عبر طريقة التحويل المفضلة لديك', step4: 'احصل على رقم التتبع وتحديثات التوصيل' },
    footer: { quickLinks: 'روابط سريعة', support: 'الدعم', followUs: 'تابعنا', copyright: '© ٢٠٢٤ ميل دو مارو. جميع الحقوق محفوظة.', tagline: 'عسل مغربي فاخر، يُحصد بحب من جبال الأطلس منذ ١٩٩٥.' },
    common: { learnMore: 'اعرف المزيد', orderNow: 'اطلب الآن', viewAll: 'عرض الكل', price: 'السعر' },
    benefits: { title: 'فوائد العسل المغربي الصحية', subtitle: 'أقوى علاج طبيعي' },
    tags: { all: 'الكل', immunity: 'المناعة', respiratory: 'الجهاز التنفسي', digestion: 'الهضم', energy: 'الطاقة', calming: 'مهدئ', rare: 'نادر', liverHealth: 'صحة الكبد', generalHealth: 'الصحة العامة', wellness: 'العافية', warming: 'مدفئ', powerful: 'قوي' },
  },
};

const LANG_TO_CURRENCY = { en: 'GBP', fr: 'EUR', ar: 'EUR' };

export const LANGUAGES = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'عربي', flag: '🇲🇦' },
];

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => localStorage.getItem('mdm-lang') || 'fr');

  useEffect(() => {
    localStorage.setItem('mdm-lang', language);
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const getProductName = (product) => {
    if (language === 'ar') return product.name_ar || product.name_fr || product.name;
    if (language === 'fr') return product.name_fr || product.name;
    return product.name;
  };

  const setCurrencyFromLanguage = (lang) => {
    return LANG_TO_CURRENCY[lang] || 'EUR';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getProductName, setCurrencyFromLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
