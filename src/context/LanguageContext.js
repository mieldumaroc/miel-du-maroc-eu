import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    nav: { home: 'Home', products: 'Our Products', about: 'About', healthBenefits: 'Benefits', shipping: 'Delivery', faq: 'FAQ', contact: 'Contact', blog: 'Blog' },
    hero: { tagline: "Pure Moroccan Honey & Olive Oil", title: "From the Atlas Mountains to Your Table", subtitle: "Authentic honey and pure olive oil, delivered to your door in Marrakech by our own driver", cta: "Discover Our Products", whatsapp: "Order on WhatsApp", badgeDelivery: "Delivery in Marrakech", badgeCash: "Cash on delivery", badgePure: "100% pure & natural", imageAlt: "Miel du Maroc honey jars and olive oil in a Moroccan riad courtyard" },
    products: { title: 'Our Honey Collection', subtitle: 'Each jar captures the essence of Morocco pristine landscapes', viewDetails: 'View Details', inquire: 'Order via WhatsApp', from: 'From', perKg: 'per 500g', healthBenefits: 'Health Benefits', selectSize: 'Select Size', addToCart: 'Add to Cart', orderWhatsApp: 'Hello, I would like to order', excellence: 'Excellence', delivery: 'Delivery', wellness: 'Wellness', contact_label: 'Contact', chatWhatsApp: 'Chat on WhatsApp', searchPlaceholder: 'Search...', collection: 'Collection', colHoney: 'Honey', colCategory: 'Category', colBenefits: 'Key Benefits', colPrice: 'Price (500g)', oilTitle: 'Pure Olive Oil', oilSubtitle: 'Pure Moroccan olive oil, available in 1 litre and 5 litre bottles', oilLabel: 'Olive Oil', noResults: 'No products found.', addedToCart: 'added to cart', notFound: 'Product not found.', checkoutNow: "Order now", question: "Have a question?", askWhatsApp: "Message us on WhatsApp", questionMsg: "Hello, I have a question about:", inCart: "in your cart" },
    about: { title: 'About Miel du Maroc', subtitle: 'A Family Tradition Since 1995', story: 'Family Business', tradition: 'Traditional Methods', traditionText: 'We harvest honey using time-honored techniques that preserve natural enzymes and therapeutic properties.', purity: '100% Pure', purityText: 'No additives, no processing. Pure raw honey exactly as nature intended.', direct: 'Direct from Source', directText: 'From our family hives in the Atlas Mountains straight to your door in Marrakech.' },
    whyUs: { title: 'Why Choose Miel du Maroc', subtitle: 'The difference is in every drop', authenticity: 'Guaranteed Authenticity', authenticityText: 'Every jar is traceable to our family hives in the Atlas', therapeutic: 'Therapeutic Quality', therapeuticText: 'Harvested at peak potency for maximum health benefits', familyBusiness: 'Family Business', familyBusinessText: 'Personal attention to every order and direct communication' },
    testimonials: { title: 'What Our Customers Say', subtitle: 'Trusted by families across Morocco' },
    contact: { title: 'Contact Us', subtitle: 'We would love to hear from you', whatsapp: 'Message us on WhatsApp', whatsappText: 'Primary contact for orders and inquiries', email: 'Email', emailText: 'For detailed questions', location: 'Location', locationText: 'Marrakech, Morocco', messageLabel: 'Your message (optional)', messagePlaceholder: 'Tell us what you would like to order or ask...' },
    shipping: { title: 'Delivery in Marrakech', subtitle: 'Delivered to your door by our own driver', info: 'We deliver across Marrakech with our own delivery driver. Order on WhatsApp and your honey or olive oil is brought straight to your door.', packaging: 'Careful Handling', packagingText: 'Every jar and bottle is prepared with care and handed to our driver in person.', delivery: 'Fast Delivery in Marrakech', deliveryText: 'Orders in Marrakech are delivered quickly. We confirm the delivery time with you on WhatsApp.', infoTitle: 'How Delivery Works', countries: 'Marrakech: delivered to your door by our own delivery driver.', courier: 'Other cities in Morocco: contact us on WhatsApp to arrange delivery.', processing: 'Delivery fees and delivery time are confirmed with you on WhatsApp when you order.', inquiries: 'For any delivery questions, contact us on WhatsApp.', cash: 'Pay on Delivery', cashText: 'Pay the driver in cash when you receive your order. No advance payment needed.' },
    faq: { title: 'Frequently Asked Questions', subtitle: 'Everything you need to know', support: 'Support' },
    blog: { title: 'Our Blog', subtitle: 'Discover the world of Moroccan honey', readMore: 'Read More', backToBlog: 'Back to Blog', journal: 'Journal', catHealth: 'Health Benefits', catTraditional: 'Traditional Uses', catOrdering: 'Ordering Guide', catProduct: 'Product Spotlight' },
    payment: { title: 'How to Order', subtitle: 'Simple, fast and local', secure: 'Simple and Local', methodsText: 'Cash on delivery: pay the driver when your order arrives', stepTitle1: 'Choose', stepTitle2: 'Order on WhatsApp', stepTitle3: 'We Prepare It', stepTitle4: 'Receive and Pay', step1: 'Browse our honeys and olive oil and add your favourites to the cart', step2: 'Send your order on WhatsApp with your address in Marrakech', step3: 'We confirm your order and hand it to our delivery driver', step4: 'The driver brings it to your door. Pay in cash on delivery', cod: 'Cash on Delivery' },
    footer: { quickLinks: 'Quick Links', support: 'Support', followUs: 'Follow Us', copyright: '© 2024 Miel du Maroc. All rights reserved.', tagline: 'Premium Moroccan honey and pure olive oil, delivered to your door in Marrakech.' },
    common: { learnMore: 'Learn More', orderNow: 'Order Now', viewAll: 'View All', price: 'Price' },
    cart: { titleA: "Your", titleB: "Cart", product: "Product", price: "Price", quantity: "Quantity", subtotal: "Subtotal", remove: "Remove", continue: "Continue shopping", clear: "Clear cart", totals: "Cart Totals", delivery: "Delivery", deliveryValue: "Confirmed on WhatsApp", total: "Total", plusDelivery: "+ delivery fee", cashNote: "Cash on delivery: pay the driver when your order arrives.", details: "Your Details", firstName: "First name", lastName: "Last name", phone: "Phone number", address: "Delivery address", addressPh: "Neighbourhood, street, number (Marrakech)", phonePh: "06 12 34 56 78", note: "Note (optional)", notePh: "E.g. preferred delivery time", order: "Order on WhatsApp", required: "This field is required", phoneInvalid: "Please enter a valid phone number", empty: "Your cart is empty", emptyCta: "Discover our products", checkout: "Checkout", opened: "WhatsApp is opening to send your order", msgHello: "Hello, I would like to order:", msgSubtotal: "Subtotal", msgFee: "delivery fee", msgPay: "Cash on delivery", msgName: "Name", msgPhone: "Phone", msgAddress: "Address", msgNote: "Note", msgThanks: "Thank you!" },
    benefits: { title: 'Health Benefits of Moroccan Honey', subtitle: 'Nature most powerful remedy' },
    tags: { all: 'All', immunity: 'Immunity', respiratory: 'Respiratory', digestion: 'Digestion', energy: 'Energy', calming: 'Calming', rare: 'Rare', liverHealth: 'Liver Health', generalHealth: 'General Health', wellness: 'Wellness', warming: 'Warming', powerful: 'Powerful', oliveOil: 'Olive Oil' },
  },
  fr: {
    nav: { home: 'Accueil', products: 'Nos Produits', about: 'A Propos', healthBenefits: 'Bienfaits', shipping: 'Livraison', faq: 'FAQ', contact: 'Contact', blog: 'Blog' },
    hero: { tagline: "Miel & Huile d'Olive du Maroc", title: "Des Montagnes de l'Atlas à Votre Table", subtitle: "Miel authentique et huile d'olive pure, livrés chez vous à Marrakech par notre propre livreur", cta: "Découvrir nos produits", whatsapp: "Commander sur WhatsApp", badgeDelivery: "Livraison à Marrakech", badgeCash: "Paiement à la livraison", badgePure: "100% pur & naturel", imageAlt: "Pots de miel Miel du Maroc et huile d'olive dans un riad marocain" },
    products: { title: 'Notre Collection de Miels', subtitle: 'Chaque pot capture l\'essence des paysages vierges du Maroc', viewDetails: 'Voir Details', inquire: 'Commander via WhatsApp', from: 'A partir de', perKg: 'par 500g', healthBenefits: 'Bienfaits pour la Sante', selectSize: 'Choisir Taille', addToCart: 'Ajouter au Panier', orderWhatsApp: 'Bonjour, je voudrais commander', excellence: 'Excellence', delivery: 'Livraison', wellness: 'Bien-etre', contact_label: 'Contact', chatWhatsApp: 'Chatter sur WhatsApp', searchPlaceholder: 'Rechercher...', collection: 'Collection', colHoney: 'Miel', colCategory: 'Categorie', colBenefits: 'Bienfaits Cles', colPrice: 'Prix (500g)', oilTitle: 'Huile d\'Olive Pure', oilSubtitle: 'Huile d\'olive pure du Maroc, en bouteilles de 1 litre et 5 litres', oilLabel: 'Huile d\'Olive', noResults: 'Aucun produit trouvé.', addedToCart: 'ajouté au panier', notFound: 'Produit introuvable.', checkoutNow: "Commander maintenant", question: "Une question ?", askWhatsApp: "Écrivez-nous sur WhatsApp", questionMsg: "Bonjour, j'ai une question sur :", inCart: "dans votre panier" },
    about: { title: 'A Propos de Miel du Maroc', subtitle: 'Une Tradition Familiale Depuis 1995', story: 'Entreprise Familiale', tradition: 'Methodes Traditionnelles', traditionText: 'Nous recoltons le miel en utilisant des techniques ancestrales qui preservent les enzymes naturelles.', purity: '100% Pur', purityText: 'Sans additifs, sans traitement. Du miel brut pur exactement comme la nature l\'a voulu.', direct: 'Directement de la Source', directText: 'De nos ruches familiales dans l\'Atlas directement à votre porte à Marrakech.' },
    whyUs: { title: 'Pourquoi Choisir Miel du Maroc', subtitle: 'La difference est dans chaque goutte', authenticity: 'Authenticite Garantie', authenticityText: 'Chaque pot est tracable jusqu\'a nos ruches familiales dans l\'Atlas', therapeutic: 'Qualite Therapeutique', therapeuticText: 'Recolte a son apogee pour des benefices sante maximaux', familyBusiness: 'Entreprise Familiale', familyBusinessText: 'Attention personnelle a chaque commande et communication directe' },
    testimonials: { title: 'Ce que Disent Nos Clients', subtitle: 'La confiance des familles à travers le Maroc' },
    contact: { title: 'Contactez-Nous', subtitle: 'Nous serions ravis de vous entendre', whatsapp: 'Ecrivez-nous sur WhatsApp', whatsappText: 'Contact principal pour les commandes et demandes', email: 'Email', emailText: 'Pour les questions detaillees', location: 'Localisation', locationText: 'Marrakech, Maroc', messageLabel: 'Votre message (optionnel)', messagePlaceholder: 'Dites-nous ce que vous souhaitez commander ou demander...' },
    shipping: { title: 'Livraison à Marrakech', subtitle: 'Livré chez vous par notre propre livreur', info: 'Nous livrons partout à Marrakech avec notre propre livreur. Commandez sur WhatsApp et votre miel ou votre huile d\'olive est apporté directement à votre porte.', packaging: 'Préparation Soignée', packagingText: 'Chaque pot et chaque bouteille est préparé avec soin et remis en main propre à notre livreur.', delivery: 'Livraison Rapide à Marrakech', deliveryText: 'Les commandes à Marrakech sont livrées rapidement. Nous confirmons l\'heure de livraison avec vous sur WhatsApp.', infoTitle: 'Comment Fonctionne la Livraison', countries: 'Marrakech : livraison à domicile par notre propre livreur.', courier: 'Autres villes du Maroc : contactez-nous sur WhatsApp pour organiser la livraison.', processing: 'Les frais et le délai de livraison vous sont confirmés sur WhatsApp lors de votre commande.', inquiries: 'Pour toute question sur la livraison, contactez-nous sur WhatsApp.', cash: 'Paiement à la Livraison', cashText: 'Payez le livreur en espèces à la réception de votre commande. Aucun paiement à l\'avance.' },
    faq: { title: 'Questions Frequentes', subtitle: 'Tout ce que vous devez savoir', support: 'Assistance' },
    blog: { title: 'Notre Blog', subtitle: 'Decouvrez le monde du miel marocain', readMore: 'Lire la Suite', backToBlog: 'Retour au Blog', journal: 'Journal', catHealth: 'Bienfaits Sante', catTraditional: 'Usages Traditionnels', catOrdering: 'Guide de Commande', catProduct: 'Produit en Vedette' },
    payment: { title: 'Comment Commander', subtitle: 'Simple, rapide et local', secure: 'Simple et Local', methodsText: 'Paiement à la livraison : payez le livreur à la réception', stepTitle1: 'Choisissez', stepTitle2: 'Commandez sur WhatsApp', stepTitle3: 'Nous Préparons', stepTitle4: 'Recevez et Payez', step1: 'Parcourez nos miels et notre huile d\'olive et ajoutez vos favoris au panier', step2: 'Envoyez votre commande sur WhatsApp avec votre adresse à Marrakech', step3: 'Nous confirmons votre commande et la remettons à notre livreur', step4: 'Le livreur vous l\'apporte. Payez en espèces à la livraison', cod: 'Paiement à la Livraison' },
    footer: { quickLinks: 'Liens Rapides', support: 'Support', followUs: 'Suivez-Nous', copyright: '© 2024 Miel du Maroc. Tous droits reserves.', tagline: 'Miel marocain premium et huile d\'olive pure, livrés chez vous à Marrakech.' },
    common: { learnMore: 'En Savoir Plus', orderNow: 'Commander Maintenant', viewAll: 'Voir Tout', price: 'Prix' },
    cart: { titleA: "Votre", titleB: "Panier", product: "Produit", price: "Prix", quantity: "Quantité", subtotal: "Sous-total", remove: "Retirer", continue: "Continuer mes achats", clear: "Vider le panier", totals: "Total du Panier", delivery: "Livraison", deliveryValue: "Confirmée sur WhatsApp", total: "Total", plusDelivery: "+ frais de livraison", cashNote: "Paiement en espèces à la livraison, directement au livreur.", details: "Vos Coordonnées", firstName: "Prénom", lastName: "Nom", phone: "Téléphone", address: "Adresse de livraison", addressPh: "Quartier, rue, numéro (Marrakech)", phonePh: "06 12 34 56 78", note: "Remarque (facultatif)", notePh: "Ex. : heure de livraison souhaitée", order: "Commander sur WhatsApp", required: "Ce champ est obligatoire", phoneInvalid: "Veuillez entrer un numéro de téléphone valide", empty: "Votre panier est vide", emptyCta: "Découvrir nos produits", checkout: "Passer la commande", opened: "WhatsApp s'ouvre pour envoyer votre commande", msgHello: "Bonjour, je voudrais commander :", msgSubtotal: "Sous-total", msgFee: "frais de livraison", msgPay: "Paiement à la livraison", msgName: "Nom", msgPhone: "Téléphone", msgAddress: "Adresse", msgNote: "Remarque", msgThanks: "Merci !" },
    benefits: { title: 'Bienfaits du Miel Marocain pour la Sante', subtitle: 'Le remede le plus puissant de la nature' },
    tags: { all: 'Tous', immunity: 'Immunite', respiratory: 'Respiratoire', digestion: 'Digestion', energy: 'Energie', calming: 'Calmant', rare: 'Rare', liverHealth: 'Sante du Foie', generalHealth: 'Sante Generale', wellness: 'Bien-etre', warming: 'Rechauffant', powerful: 'Puissant', oliveOil: 'Huile d\'Olive' },
  },
  ar: {
    nav: { home: 'الرئيسية', products: 'منتجاتنا', about: 'من نحن', healthBenefits: 'الفوائد', shipping: 'التوصيل', faq: 'الأسئلة', contact: 'اتصل بنا', blog: 'المدونة' },
    hero: { tagline: "عسل وزيت زيتون مغربي طبيعي", title: "من جبال الأطلس إلى مائدتكم", subtitle: "عسل أصيل وزيت زيتون طبيعي، يصلكم إلى باب المنزل في مراكش عبر موصّلنا الخاص", cta: "اكتشف منتجاتنا", whatsapp: "اطلب عبر واتساب", badgeDelivery: "التوصيل في مراكش", badgeCash: "الدفع عند الاستلام", badgePure: "طبيعي ١٠٠٪", imageAlt: "برطمانات عسل ميل دو ماروك وزيت الزيتون في رياض مغربي" },
    products: { title: 'مجموعة عسلنا', subtitle: 'كل برطمان يحمل جوهر مناطق المغرب النقية', viewDetails: 'عرض التفاصيل', inquire: 'اطلب عبر واتساب', from: 'من', perKg: 'لكل ٥٠٠ غ', healthBenefits: 'الفوائد الصحية', selectSize: 'اختر الحجم', addToCart: 'أضف إلى السلة', orderWhatsApp: 'مرحباً، أريد طلب', excellence: 'التميز', delivery: 'التوصيل', wellness: 'العافية', contact_label: 'تواصل معنا', chatWhatsApp: 'تحدث على واتساب', searchPlaceholder: 'البحث...', collection: 'المجموعة', colHoney: 'العسل', colCategory: 'الفئة', colBenefits: 'الفوائد الرئيسية', colPrice: 'السعر (500غ)', oilTitle: 'زيت الزيتون الطبيعي', oilSubtitle: 'زيت زيتون مغربي طبيعي، متوفر في قنينات ١ لتر و٥ لترات', oilLabel: 'زيت الزيتون', noResults: 'لم يتم العثور على منتجات.', addedToCart: 'أضيف إلى السلة', notFound: 'المنتج غير موجود.', checkoutNow: "اطلب الآن", question: "لديك سؤال؟", askWhatsApp: "راسلنا عبر واتساب", questionMsg: "مرحباً، لدي سؤال حول:", inCart: "في سلتك" },
    about: { title: 'عسل المغرب', subtitle: 'تقليد عائلي منذ عام ١٩٩٥', story: 'عمل عائلي', tradition: 'أساليب تقليدية', traditionText: 'نحصد العسل بتقنيات متوارثة تحافظ على الإنزيمات الطبيعية والخصائص العلاجية.', purity: '١٠٠٪ نقي', purityText: 'بدون إضافات أو معالجة. عسل نقي طبيعي كما أرادت الطبيعة.', direct: 'مباشرة من المصدر', directText: 'من خلايا عائلتنا في الأطلس مباشرة إلى باب منزلك في مراكش.' },
    whyUs: { title: 'لماذا تختار عسل المغرب', subtitle: 'الفرق في كل قطرة', authenticity: 'أصالة مضمونة', authenticityText: 'كل برطمان يمكن تتبعه إلى خلايا عائلتنا في الأطلس', therapeutic: 'جودة علاجية', therapeuticText: 'يُحصد في ذروة قوته للحصول على أقصى فوائد صحية', familyBusiness: 'عمل عائلي', familyBusinessText: 'اهتمام شخصي بكل طلب وتواصل مباشر' },
    testimonials: { title: 'ماذا يقول عملاؤنا', subtitle: 'ثقة العائلات في جميع أنحاء المغرب' },
    contact: { title: 'تواصل معنا', subtitle: 'يسعدنا سماعكم', whatsapp: 'راسلنا على واتساب', whatsappText: 'التواصل الرئيسي للطلبات والاستفسارات', email: 'البريد الإلكتروني', emailText: 'للأسئلة التفصيلية', location: 'الموقع', locationText: 'مراكش، المغرب', messageLabel: 'رسالتك (اختياري)', messagePlaceholder: 'أخبرنا بما تريد طلبه أو استفساره...' },
    shipping: { title: 'التوصيل في مراكش', subtitle: 'يصلك إلى باب منزلك عبر موصّلنا الخاص', info: 'نوصل في جميع أنحاء مراكش عبر موصّلنا الخاص. اطلب عبر واتساب وسيصلك العسل أو زيت الزيتون مباشرة إلى باب منزلك.', packaging: 'تحضير بعناية', packagingText: 'كل برطمان وكل قنينة تُحضَّر بعناية وتُسلَّم يداً بيد لموصّلنا.', delivery: 'توصيل سريع في مراكش', deliveryText: 'تصل الطلبات في مراكش بسرعة. نؤكد معك وقت التوصيل عبر واتساب.', infoTitle: 'كيف يتم التوصيل', countries: 'مراكش: توصيل إلى باب المنزل عبر موصّلنا الخاص.', courier: 'مدن أخرى في المغرب: تواصل معنا عبر واتساب لترتيب التوصيل.', processing: 'نؤكد لك رسوم ووقت التوصيل عبر واتساب عند الطلب.', inquiries: 'لأي استفسار حول التوصيل، تواصل معنا عبر واتساب.', cash: 'الدفع عند الاستلام', cashText: 'ادفع للموصّل نقداً عند استلام طلبك. لا حاجة للدفع المسبق.' },
    faq: { title: 'الأسئلة الشائعة', subtitle: 'كل ما تحتاج معرفته', support: 'الدعم' },
    blog: { title: 'مدونتنا', subtitle: 'اكتشف عالم العسل المغربي', readMore: 'اقرأ المزيد', backToBlog: 'العودة للمدونة', journal: 'المدونة', catHealth: 'الفوائد الصحية', catTraditional: 'الاستخدامات التقليدية', catOrdering: 'دليل الطلب', catProduct: 'منتج مميز' },
    payment: { title: 'كيفية الطلب', subtitle: 'بسيط وسريع ومحلي', secure: 'بسيط ومحلي', methodsText: 'الدفع عند الاستلام: ادفع للموصّل عند وصول طلبك', stepTitle1: 'اختر', stepTitle2: 'اطلب عبر واتساب', stepTitle3: 'نحضّر طلبك', stepTitle4: 'استلم وادفع', step1: 'تصفح أنواع العسل وزيت الزيتون وأضف ما يعجبك إلى السلة', step2: 'أرسل طلبك عبر واتساب مع عنوانك في مراكش', step3: 'نؤكد طلبك ونسلّمه لموصّلنا', step4: 'يوصله الموصّل إلى بابك. ادفع نقداً عند الاستلام', cod: 'الدفع عند الاستلام' },
    footer: { quickLinks: 'روابط سريعة', support: 'الدعم', followUs: 'تابعنا', copyright: '© ٢٠٢٤ ميل دو مارو. جميع الحقوق محفوظة.', tagline: 'عسل مغربي فاخر وزيت زيتون طبيعي، يصلكم إلى باب المنزل في مراكش.' },
    common: { learnMore: 'اعرف المزيد', orderNow: 'اطلب الآن', viewAll: 'عرض الكل', price: 'السعر' },
    cart: { titleA: "سلة", titleB: "التسوق", product: "المنتج", price: "السعر", quantity: "الكمية", subtotal: "المجموع الفرعي", remove: "حذف", continue: "متابعة التسوق", clear: "إفراغ السلة", totals: "إجمالي السلة", delivery: "التوصيل", deliveryValue: "يُؤكَّد عبر واتساب", total: "المجموع", plusDelivery: "+ رسوم التوصيل", cashNote: "الدفع نقداً عند الاستلام، مباشرة للموصّل.", details: "معلوماتك", firstName: "الاسم الشخصي", lastName: "الاسم العائلي", phone: "رقم الهاتف", address: "عنوان التوصيل", addressPh: "الحي، الشارع، الرقم (مراكش)", phonePh: "06 12 34 56 78", note: "ملاحظة (اختياري)", notePh: "مثال: الوقت المفضل للتوصيل", order: "اطلب عبر واتساب", required: "هذا الحقل مطلوب", phoneInvalid: "يرجى إدخال رقم هاتف صحيح", empty: "سلة التسوق فارغة", emptyCta: "اكتشف منتجاتنا", checkout: "إتمام الطلب", opened: "يتم فتح واتساب لإرسال طلبك", msgHello: "مرحباً، أريد طلب:", msgSubtotal: "المجموع الفرعي", msgFee: "رسوم التوصيل", msgPay: "الدفع عند الاستلام", msgName: "الاسم", msgPhone: "الهاتف", msgAddress: "العنوان", msgNote: "ملاحظة", msgThanks: "شكراً!" },
    benefits: { title: 'فوائد العسل المغربي الصحية', subtitle: 'أقوى علاج طبيعي' },
    tags: { all: 'الكل', immunity: 'المناعة', respiratory: 'الجهاز التنفسي', digestion: 'الهضم', energy: 'الطاقة', calming: 'مهدئ', rare: 'نادر', liverHealth: 'صحة الكبد', generalHealth: 'الصحة العامة', wellness: 'العافية', warming: 'مدفئ', powerful: 'قوي', oliveOil: 'زيت الزيتون' },
  },
};

export const LANGUAGES = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'عربي', flag: '🇲🇦' },
];

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('mdm-lang');
    return translations[saved] ? saved : 'fr';
  });

  useEffect(() => {
    localStorage.setItem('mdm-lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = (lang) => {
    if (translations[lang]) setLanguage(lang);
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    if (value) return value;
    // Fall back to French, then English, before showing the raw key
    for (const fallback of ['fr', 'en']) {
      let v = translations[fallback];
      for (const k of keys) v = v?.[k];
      if (v) return v;
    }
    return key;
  };

  const getProductName = (product) => {
    if (!product) return '';
    if (language === 'ar') return product.name_ar || product.name_fr || product.name;
    if (language === 'fr') return product.name_fr || product.name;
    return product.name;
  };

  const getProductDescription = (product) => {
    if (!product) return '';
    if (language === 'ar') return product.description_ar || product.description_fr || product.description;
    if (language === 'fr') return product.description_fr || product.description;
    return product.description;
  };

  const getProductBenefits = (product) => {
    if (!product) return [];
    if (language === 'ar') return product.health_benefits_ar || product.health_benefits_fr || product.health_benefits || [];
    if (language === 'fr') return product.health_benefits_fr || product.health_benefits || [];
    return product.health_benefits || [];
  };

  // Turns a product tag like 'Liver Health' or 'Olive Oil' into its translated label
  const getTagLabel = (tag) => {
    if (!tag) return '';
    const key = tag.split(' ').map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
    return t(`tags.${key}`);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, changeLanguage, t, getProductName, getProductDescription, getProductBenefits, getTagLabel }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
