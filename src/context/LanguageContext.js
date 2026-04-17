import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    nav: { home: 'Home', products: 'Our Honeys', about: 'About', healthBenefits: 'Benefits', shipping: 'Shipping', faq: 'FAQ', contact: 'Contact', blog: 'Blog' },
    hero: { tagline: 'Pure Moroccan Honey', title: 'From the Atlas Mountains to Your Table', subtitle: 'Authentic, therapeutic honey harvested by our family in Morocco since 1995', cta: 'Discover Our Collection' },
    products: { title: 'Our Honey Collection', subtitle: 'Each jar captures the essence of Morocco\'s pristine landscapes', viewDetails: 'View Details', inquire: 'Order via WhatsApp', from: 'From', perKg: 'per 500g', healthBenefits: 'Health Benefits', selectSize: 'Select Size', addToCart: 'Add to Cart', orderWhatsApp: 'Hello, I would like to order', excellence: 'Excellence', delivery: 'Delivery', wellness: 'Wellness', contact_label: 'Contact', chatWhatsApp: 'Chat on WhatsApp', searchPlaceholder: 'Search...', collection: 'Collection', colHoney: 'Honey', colCategory: 'Category', colBenefits: 'Key Benefits', colPrice: 'Price (500g)' },
    about: { title: 'About Miel du Maroc', subtitle: 'A Family Tradition Since 1995', story: 'Family business', tradition: 'Traditional Methods', traditionText: 'We harvest using time-honored techniques that preserve the honey\'s natural enzymes and therapeutic properties.', purity: '100% Pure', purityText: 'No additives, no processing. Just pure, raw honey exactly as nature intended.', direct: 'Direct from Source', directText: 'From our hives in the Atlas Mountains directly to your table, ensuring freshness and authenticity.' },
    whyUs: { title: 'Why Choose Miel du Maroc', subtitle: 'The difference is in every drop', authenticity: 'Guaranteed Authenticity', authenticityText: 'Every jar is traceable to our family hives in the Atlas Mountains', therapeutic: 'Therapeutic Grade', therapeuticText: 'Harvested at peak potency for maximum health benefits', familyBusiness: 'Family Business', familyBusinessText: 'Personal attention to every order, direct communication' },
    testimonials: { title: 'What Our Customers Say', subtitle: 'Trusted by families across Europe' },
    contact: { title: 'Get in Touch', subtitle: 'We\'d love to hear from you', whatsapp: 'Message us on WhatsApp', whatsappText: 'Primary contact for orders and inquiries', email: 'Email', emailText: 'For detailed questions', location: 'Location', locationText: 'Marrakech, Morocco', messageLabel: 'Your message (optional)', messagePlaceholder: "Tell us what you'd like to order or ask...", form: { name: 'Your Name', email: 'Email Address', message: 'Your Message', send: 'Send Message' } },
    shipping: { title: 'Shipping & Delivery', subtitle: 'We deliver across Europe with care', info: 'All orders are carefully packaged and shipped from Morocco. Typical delivery to Europe takes 7-14 business days.', packaging: 'Careful Packaging', packagingText: 'Each jar is individually wrapped and cushioned for safe transit.', delivery: '7-14 Business Days', deliveryText: 'Standard delivery to all European countries from Morocco.', infoTitle: 'Shipping Information', countries: 'We ship to all European countries including France, Germany, Netherlands, Belgium, UK, Spain, Italy, Switzerland, and more.', courier: 'All orders are shipped via international tracked courier service. You will receive a tracking number once your order is dispatched.', processing: 'Orders are typically processed within 1-2 business days. Delivery takes 7-14 business days to most European destinations.', inquiries: "For any shipping inquiries, please contact us via WhatsApp. We're happy to provide updates on your delivery." },
    faq: { title: 'Frequently Asked Questions', subtitle: 'Everything you need to know', support: 'Support' },
    blog: { title: 'Our Blog', subtitle: 'Discover the world of Moroccan honey', readMore: 'Read More', backToBlog: 'Back to Blog', journal: 'Journal', catHealth: 'Health Benefits', catTraditional: 'Traditional Uses', catOrdering: 'Ordering Guide', catProduct: 'Product Spotlight' },
    payment: { title: 'How to Order', subtitle: 'Simple, secure, and personal', secure: 'Secure Payment', methodsText: 'We accept international transfers for your convenience', stepTitle1: 'Browse & Choose', stepTitle2: 'Get Your Quote', stepTitle3: 'Send Payment', stepTitle4: 'Track Delivery', step1: 'Browse our honey collection and choose your favorites', step2: 'Receive a personalized quote with payment details', step3: 'Send payment via your preferred transfer method', step4: 'Receive your tracking number and delivery updates' },
    footer: { quickLinks: 'Quick Links', support: 'Support', followUs: 'Follow Us', copyright: '\u00a9 2024 Miel du Maroc. All rights reserved.', tagline: 'Premium Moroccan honey, harvested with love from the Atlas Mountains since 1995.' },
    common: { learnMore: 'Learn More', orderNow: 'Order Now', viewAll: 'View All', price: 'Price' },
    benefits: { title: 'Health Benefits of Moroccan Honey', subtitle: 'Nature\'s most powerful remedy' },
    collection: 'Collection',
    tags: { all: 'All', immunity: 'Immunity', respiratory: 'Respiratory', digestion: 'Digestion', energy: 'Energy', calming: 'Calming', rare: 'Rare', liverHealth: 'Liver Health', generalHealth: 'General Health', wellness: 'Wellness', warming: 'Warming', powerful: 'Powerful' },
  },
  fr: {
    nav: { home: 'Accueil', products: 'Nos Miels', about: 'A Propos', healthBenefits: 'Bienfaits', shipping: 'Livraison', faq: 'FAQ', contact: 'Contact', blog: 'Blog' },
    hero: { tagline: 'Miel Pur du Maroc', title: 'Des Montagnes de l\'Atlas a Votre Table', subtitle: 'Miel authentique et therapeutique recolte par notre famille au Maroc depuis 1995', cta: 'Decouvrir Notre Collection' },
    products: { title: 'Notre Collection de Miels', subtitle: 'Chaque pot capture l\'essence des paysages vierges du Maroc', viewDetails: 'Voir Details', inquire: 'Commander via WhatsApp', from: 'A partir de', perKg: 'par 500g', healthBenefits: 'Bienfaits pour la Sante', selectSize: 'Choisir Taille', addToCart: 'Ajouter au Panier', orderWhatsApp: 'Bonjour, je voudrais commander', excellence: 'Excellence', delivery: 'Livraison', wellness: 'Bien-etre', contact_label: 'Contact', chatWhatsApp: 'Chatter sur WhatsApp', searchPlaceholder: 'Rechercher...', collection: 'Collection', colHoney: 'Miel', colCategory: 'Categorie', colBenefits: 'Bienfaits Cles', colPrice: 'Prix (500g)' },
    about: { title: 'A Propos de Miel du Maroc', subtitle: 'Une Tradition Familiale Depuis 1995', story: 'Entreprise familiale', tradition: 'Methodes Traditionnelles', traditionText: 'Nous recoltons en utilisant des techniques ancestrales qui preservent les enzymes naturelles et les proprietes therapeutiques du miel.', purity: '100% Pur', purityText: 'Pas d\'additifs, pas de transformation. Juste du miel pur et brut tel que la nature l\'a voulu.', direct: 'Direct de la Source', directText: 'De nos ruches dans les montagnes de l\'Atlas directement a votre table.' },
    whyUs: { title: 'Pourquoi Choisir Miel du Maroc', subtitle: 'La difference est dans chaque goutte', authenticity: 'Authenticite Garantie', authenticityText: 'Chaque pot est tracable jusqu\'a nos ruches familiales dans l\'Atlas', therapeutic: 'Qualite Therapeutique', therapeuticText: 'Recolte au pic de puissance pour des bienfaits maximaux', familyBusiness: 'Entreprise Familiale', familyBusinessText: 'Attention personnelle a chaque commande, communication directe' },
    testimonials: { title: 'Ce Que Disent Nos Clients', subtitle: 'La confiance des familles a travers l\'Europe' },
    contact: { title: 'Contactez-Nous', subtitle: 'Nous serions ravis de vous entendre', whatsapp: 'Ecrivez-nous sur WhatsApp', whatsappText: 'Contact principal pour les commandes et demandes', email: 'Email', emailText: 'Pour les questions detaillees', location: 'Emplacement', locationText: 'Marrakech, Maroc', messageLabel: 'Votre message (optionnel)', messagePlaceholder: 'Dites-nous ce que vous souhaitez commander ou demander...', form: { name: 'Votre Nom', email: 'Adresse Email', message: 'Votre Message', send: 'Envoyer le Message' } },
    shipping: { title: 'Livraison & Expedition', subtitle: 'Nous livrons a travers l\'Europe avec soin', info: 'Toutes les commandes sont soigneusement emballees et expediees du Maroc. La livraison typique en Europe prend 7 a 14 jours ouvrables.', packaging: 'Emballage Soigneux', packagingText: 'Chaque pot est emballe individuellement et rembourre pour un transit securise.', delivery: '7-14 Jours Ouvrables', deliveryText: 'Livraison standard vers tous les pays europeens depuis le Maroc.', infoTitle: 'Informations de Livraison', countries: 'Nous livrons dans tous les pays europeens incluant la France, l\'Allemagne, les Pays-Bas, la Belgique, le Royaume-Uni, l\'Espagne, l\'Italie, la Suisse, et plus.', courier: 'Toutes les commandes sont expediees via un service de courrier international avec suivi. Vous recevrez un numero de suivi une fois votre commande expediee.', processing: 'Les commandes sont generalement traitees dans 1 a 2 jours ouvrables. La livraison prend 7 a 14 jours ouvrables vers la plupart des destinations europeennes.', inquiries: 'Pour toute question concernant la livraison, contactez-nous via WhatsApp. Nous sommes heureux de vous fournir des mises a jour sur votre livraison.' },
    faq: { title: 'Questions Frequentes', subtitle: 'Tout ce que vous devez savoir', support: 'Assistance' },
    blog: { title: 'Notre Blog', subtitle: 'Decouvrez le monde du miel marocain', readMore: 'Lire la Suite', backToBlog: 'Retour au Blog', journal: 'Journal', catHealth: 'Bienfaits Sante', catTraditional: 'Usages Traditionnels', catOrdering: 'Guide de Commande', catProduct: 'Produit en Vedette' },
    payment: { title: 'Comment Commander', subtitle: 'Simple, securise et personnel', secure: 'Paiement Securise', methodsText: 'Nous acceptons les transferts internationaux pour votre commodite', stepTitle1: 'Parcourir & Choisir', stepTitle2: 'Recevoir Votre Devis', stepTitle3: 'Envoyer le Paiement', stepTitle4: 'Suivre la Livraison', step1: 'Parcourez notre collection de miels et choisissez vos favoris', step2: 'Recevez un devis personnalise avec les details de paiement', step3: 'Envoyez le paiement par votre methode de transfert preferee', step4: 'Recevez votre numero de suivi et les mises a jour de livraison' },
    footer: { quickLinks: 'Liens Rapides', support: 'Support', followUs: 'Suivez-Nous', copyright: '\u00a9 2024 Miel du Maroc. Tous droits reserves.', tagline: 'Miel marocain premium, recolte avec amour depuis les montagnes de l\'Atlas depuis 1995.' },
    common: { learnMore: 'En Savoir Plus', orderNow: 'Commander', viewAll: 'Voir Tout', price: 'Prix' },
    benefits: { title: 'Bienfaits du Miel Marocain pour la Sante', subtitle: 'Le remede le plus puissant de la nature' },
    collection: 'Collection',
    tags: { all: 'Tous', immunity: 'Immunite', respiratory: 'Respiratoire', digestion: 'Digestion', energy: 'Energie', calming: 'Calmant', rare: 'Rare', liverHealth: 'Sante du Foie', generalHealth: 'Sante Generale', wellness: 'Bien-etre', warming: 'Rechauffant', powerful: 'Puissant' },
  },
  de: {
    nav: { home: 'Startseite', products: 'Unsere Honige', about: 'Uber Uns', healthBenefits: 'Vorteile', shipping: 'Versand', faq: 'FAQ', contact: 'Kontakt', blog: 'Blog' },
    hero: { tagline: 'Reiner Marokkanischer Honig', title: 'Vom Atlasgebirge auf Ihren Tisch', subtitle: 'Authentischer, therapeutischer Honig, seit 1995 von unserer Familie in Marokko geerntet', cta: 'Kollektion Entdecken' },
    products: { title: 'Unsere Honigkollektion', subtitle: 'Jedes Glas fangt die Essenz der unberuhrten Landschaften Marokkos ein', viewDetails: 'Details Ansehen', inquire: 'Uber WhatsApp Bestellen', from: 'Ab', perKg: 'pro 500g', healthBenefits: 'Gesundheitsvorteile', selectSize: 'Grosse Wahlen', addToCart: 'In den Warenkorb', orderWhatsApp: 'Hallo, ich möchte bestellen', excellence: 'Exzellenz', delivery: 'Lieferung', wellness: 'Wohlbefinden', contact_label: 'Kontakt', chatWhatsApp: 'Auf WhatsApp chatten', searchPlaceholder: 'Suchen...', collection: 'Kollektion', colHoney: 'Honig', colCategory: 'Kategorie', colBenefits: 'Hauptvorteile', colPrice: 'Preis (500g)' },
    about: { title: 'Uber Miel du Maroc', subtitle: 'Eine Familientradition Seit 1995', story: 'Familienunternehmen', tradition: 'Traditionelle Methoden', traditionText: 'Wir ernten mit bewahrten Techniken, die die naturlichen Enzyme und therapeutischen Eigenschaften des Honigs bewahren.', purity: '100% Rein', purityText: 'Keine Zusatzstoffe, keine Verarbeitung. Nur reiner, roher Honig, genau wie von der Natur vorgesehen.', direct: 'Direkt von der Quelle', directText: 'Von unseren Bienenstocken im Atlasgebirge direkt auf Ihren Tisch.' },
    whyUs: { title: 'Warum Miel du Maroc Wahlen', subtitle: 'Der Unterschied liegt in jedem Tropfen', authenticity: 'Garantierte Authentizitat', authenticityText: 'Jedes Glas ist bis zu unseren Familienbienenstocken im Atlas ruckverfolgbar', therapeutic: 'Therapeutische Qualitat', therapeuticText: 'Auf dem Hohepunkt der Wirksamkeit geerntet', familyBusiness: 'Familienunternehmen', familyBusinessText: 'Personliche Aufmerksamkeit bei jeder Bestellung' },
    testimonials: { title: 'Was Unsere Kunden Sagen', subtitle: 'Vertraut von Familien in ganz Europa' },
    contact: { title: 'Kontaktieren Sie Uns', subtitle: 'Wir freuen uns von Ihnen zu horen', whatsapp: 'Schreiben Sie uns auf WhatsApp', whatsappText: 'Hauptkontakt fur Bestellungen und Anfragen', email: 'E-Mail', emailText: 'Fur detaillierte Fragen', location: 'Standort', locationText: 'Marrakesch, Marokko', messageLabel: 'Ihre Nachricht (optional)', messagePlaceholder: 'Sagen Sie uns, was Sie bestellen oder fragen mochten...', form: { name: 'Ihr Name', email: 'E-Mail-Adresse', message: 'Ihre Nachricht', send: 'Nachricht Senden' } },
    shipping: { title: 'Versand & Lieferung', subtitle: 'Wir liefern mit Sorgfalt nach ganz Europa', info: 'Alle Bestellungen werden sorgfaltig verpackt und aus Marokko verschickt. Typische Lieferung nach Europa dauert 7-14 Werktage.', packaging: 'Sorgfaltige Verpackung', packagingText: 'Jedes Glas wird einzeln eingewickelt und gepolstert fur einen sicheren Transport.', delivery: '7-14 Werktage', deliveryText: 'Standardlieferung in alle europaischen Lander aus Marokko.', infoTitle: 'Versandinformationen', countries: 'Wir liefern in alle europaischen Lander einschliesslich Frankreich, Deutschland, Niederlande, Belgien, UK, Spanien, Italien, Schweiz und mehr.', courier: 'Alle Bestellungen werden uber einen internationalen Kurierdienst mit Sendungsverfolgung versandt. Sie erhalten eine Tracking-Nummer, sobald Ihre Bestellung versendet wurde.', processing: 'Bestellungen werden in der Regel innerhalb von 1-2 Werktagen bearbeitet. Die Lieferung dauert 7-14 Werktage zu den meisten europaischen Zielen.', inquiries: 'Fur Versandanfragen kontaktieren Sie uns bitte uber WhatsApp. Wir geben Ihnen gerne Updates zu Ihrer Lieferung.' },
    faq: { title: 'Haufig Gestellte Fragen', subtitle: 'Alles was Sie wissen mussen', support: 'Unterstutzung' },
    blog: { title: 'Unser Blog', subtitle: 'Entdecken Sie die Welt des marokkanischen Honigs', readMore: 'Weiterlesen', backToBlog: 'Zuruck zum Blog', journal: 'Journal', catHealth: 'Gesundheitsvorteile', catTraditional: 'Traditionelle Verwendungen', catOrdering: 'Bestellanleitung', catProduct: 'Produkt im Rampenlicht' },
    payment: { title: 'So Bestellen Sie', subtitle: 'Einfach, sicher und personlich', secure: 'Sichere Zahlung', methodsText: 'Wir akzeptieren internationale Uberweisungen', stepTitle1: 'Durchstobern & Wahlen', stepTitle2: 'Angebot Erhalten', stepTitle3: 'Zahlung Senden', stepTitle4: 'Lieferung Verfolgen', step1: 'Durchstobern Sie unsere Honigkollektion und wahlen Sie Ihre Favoriten', step2: 'Erhalten Sie ein personalisiertes Angebot mit Zahlungsdetails', step3: 'Senden Sie die Zahlung uber Ihre bevorzugte Uberweisungsmethode', step4: 'Erhalten Sie Ihre Sendungsnummer und Lieferupdates' },
    footer: { quickLinks: 'Schnelllinks', support: 'Support', followUs: 'Folgen Sie Uns', copyright: '\u00a9 2024 Miel du Maroc. Alle Rechte vorbehalten.', tagline: 'Premium marokkanischer Honig, mit Liebe aus dem Atlasgebirge seit 1995 geerntet.' },
    common: { learnMore: 'Mehr Erfahren', orderNow: 'Bestellen', viewAll: 'Alle Ansehen', price: 'Preis' },
    benefits: { title: 'Gesundheitsvorteile von Marokkanischem Honig', subtitle: 'Das machtigste Heilmittel der Natur' },
    collection: 'Kollektion',
    tags: { all: 'Alle', immunity: 'Immunitat', respiratory: 'Atemwege', digestion: 'Verdauung', energy: 'Energie', calming: 'Beruhigend', rare: 'Selten', liverHealth: 'Lebergesundheit', generalHealth: 'Allgemeine Gesundheit', wellness: 'Wohlbefinden', warming: 'Warmend', powerful: 'Kraftvoll' },
  },
  ar: {
    nav: { home: 'الرئيسية', products: 'أعسالنا', about: 'من نحن', healthBenefits: 'الفوائد', shipping: 'الشحن', faq: 'الأسئلة', contact: 'اتصل بنا', blog: 'المدونة' },
    hero: { tagline: 'عسل مغربي طبيعي ١٠٠٪', title: 'من جبال الأطلس إلى مائدتكم', subtitle: 'عسل طبيعي وعلاجي تحصده عائلتنا في المغرب منذ عام ١٩٩٥', cta: 'اكتشف مجموعتنا' },
    products: { title: 'مجموعة عسلنا', subtitle: 'كل برطمان يحمل جوهر مناطق المغرب النقية', viewDetails: 'عرض التفاصيل', inquire: 'اطلب عبر واتساب', from: 'من', perKg: 'لكل ٥٠٠ غ', healthBenefits: 'الفوائد الصحية', selectSize: 'اختر الحجم', addToCart: 'أضف إلى السلة', orderWhatsApp: 'مرحباً، أريد طلب', excellence: 'التميز', delivery: 'التوصيل', wellness: 'العافية', contact_label: 'تواصل معنا', chatWhatsApp: 'تحدث على واتساب', searchPlaceholder: 'البحث...', collection: 'المجموعة', colHoney: 'العسل', colCategory: 'الفئة', colBenefits: 'الفوائد الرئيسية', colPrice: 'السعر (500غ)' },
    about: { title: 'عسل المغرب', subtitle: 'تقليد عائلي منذ عام ١٩٩٥', story: 'عمل عائلي', tradition: 'أساليب تقليدية', traditionText: 'نحصد العسل بتقنيات متوارثة تحافظ على الإنزيمات الطبيعية والخصائص العلاجية.', purity: '١٠٠٪ نقي', purityText: 'بدون إضافات أو معالجة. عسل نقي طبيعي كما أرادت الطبيعة.', direct: 'مباشرة من المصدر', directText: 'من خلايا النحل في جبال الأطلس مباشرة إلى مائدتكم.' },
    whyUs: { title: 'لماذا تختار مِيل دو مارو', subtitle: 'الفرق في كل قطرة', authenticity: 'أصالة مضمونة', authenticityText: 'كل برطمان يمكن تتبعه إلى خلايا عائلتنا في الأطلس', therapeutic: 'جودة علاجية', therapeuticText: 'يُحصد في ذروة قوته للحصول على أقصى فوائد صحية', familyBusiness: 'عمل عائلي', familyBusinessText: 'اهتمام شخصي بكل طلب وتواصل مباشر' },
    testimonials: { title: 'ماذا يقول عملاؤنا', subtitle: 'ثقة العائلات عبر أوروبا' },
    contact: { title: 'تواصل معنا', subtitle: 'يسعدنا سماعكم', whatsapp: 'راسلنا على واتساب', whatsappText: 'التواصل الرئيسي للطلبات والاستفسارات', email: 'البريد الإلكتروني', emailText: 'للأسئلة التفصيلية', location: 'الموقع', locationText: 'مراكش، المغرب', messageLabel: 'رسالتك (اختياري)', messagePlaceholder: 'أخبرنا بما تريد طلبه أو استفساره...', form: { name: 'اسمك', email: 'البريد الإلكتروني', message: 'رسالتك', send: 'إرسال الرسالة' } },
    shipping: { title: 'الشحن والتوصيل', subtitle: 'نوصل بعناية إلى أوروبا', info: 'جميع الطلبات تُعبأ بعناية وترسل من المغرب. التوصيل المعتاد إلى أوروبا يستغرق ٧-١٤ يوم عمل.', packaging: 'تغليف دقيق', packagingText: 'كل برطمان يُلف بشكل فردي ومبطن لنقل آمن.', delivery: '٧-١٤ يوم عمل', deliveryText: 'توصيل قياسي لجميع دول أوروبا من المغرب.', infoTitle: 'معلومات الشحن', countries: 'نشحن لجميع الدول الأوروبية بما فيها فرنسا وألمانيا وهولندا وبلجيكا والمملكة المتحدة وإسبانيا وإيطاليا وسويسرا وغيرها.', courier: 'جميع الطلبات ترسل عبر خدمة بريد دولي مع تتبع. ستتلقى رقم التتبع عند شحن طلبك.', processing: 'تُعالج الطلبات عادةً خلال ١-٢ يوم عمل. يستغرق التوصيل ٧-١٤ يوم عمل لمعظم الوجهات الأوروبية.', inquiries: 'لأي استفسارات حول الشحن، تواصل معنا عبر واتساب. يسعدنا تزويدكم بتحديثات التوصيل.' },
    faq: { title: 'الأسئلة الشائعة', subtitle: 'كل ما تحتاج معرفته', support: 'الدعم' },
    blog: { title: 'مدونتنا', subtitle: 'اكتشف عالم العسل المغربي', readMore: 'اقرأ المزيد', backToBlog: 'العودة للمدونة', journal: 'المدونة', catHealth: 'الفوائد الصحية', catTraditional: 'الاستخدامات التقليدية', catOrdering: 'دليل الطلب', catProduct: 'منتج مميز' },
    payment: { title: 'كيفية الطلب', subtitle: 'بسيط وآمن وشخصي', secure: 'دفع آمن', methodsText: 'نقبل التحويلات الدولية لراحتكم', stepTitle1: 'تصفح واختر', stepTitle2: 'احصل على عرضك', stepTitle3: 'أرسل الدفع', stepTitle4: 'تتبع التوصيل', step1: 'تصفح مجموعة عسلنا واختر مفضلاتك', step2: 'احصل على عرض مخصص مع تفاصيل الدفع', step3: 'أرسل الدفع عبر طريقة التحويل المفضلة لديك', step4: 'احصل على رقم التتبع وتحديثات التوصيل' },
    footer: { quickLinks: 'روابط سريعة', support: 'الدعم', followUs: 'تابعنا', copyright: '© ٢٠٢٤ ميل دو مارو. جميع الحقوق محفوظة.', tagline: 'عسل مغربي فاخر، يُحصد بحب من جبال الأطلس منذ ١٩٩٥.' },
    common: { learnMore: 'اعرف المزيد', orderNow: 'اطلب الآن', viewAll: 'عرض الكل', price: 'السعر' },
    benefits: { title: 'فوائد العسل المغربي الصحية', subtitle: 'أقوى علاج طبيعي' },
    collection: 'المجموعة',
    tags: { all: 'الكل', immunity: 'المناعة', respiratory: 'الجهاز التنفسي', digestion: 'الهضم', energy: 'الطاقة', calming: 'مهدئ', rare: 'نادر', liverHealth: 'صحة الكبد', generalHealth: 'الصحة العامة', wellness: 'العافية', warming: 'مدفئ', powerful: 'قوي' },
  },
  nl: {
    nav: { home: 'Home', products: 'Onze Honing', about: 'Over Ons', healthBenefits: 'Voordelen', shipping: 'Verzending', faq: 'FAQ', contact: 'Contact', blog: 'Blog' },
    hero: { tagline: 'Pure Marokkaanse Honing', title: 'Van het Atlasgebergte naar Uw Tafel', subtitle: 'Authentieke, therapeutische honing geoogst door onze familie in Marokko sinds 1995', cta: 'Ontdek Onze Collectie' },
    products: { title: 'Onze Honingcollectie', subtitle: 'Elke pot vangt de essentie van de ongerepte landschappen van Marokko', viewDetails: 'Details Bekijken', inquire: 'Bestel via WhatsApp', from: 'Vanaf', perKg: 'per 500g', healthBenefits: 'Gezondheidsvoordelen', selectSize: 'Kies Maat', addToCart: 'In winkelwagen', orderWhatsApp: 'Hallo, ik wil graag bestellen', excellence: 'Excellentie', delivery: 'Levering', wellness: 'Welzijn', contact_label: 'Contact', chatWhatsApp: 'Chatten op WhatsApp', searchPlaceholder: 'Zoeken...', collection: 'Collectie', colHoney: 'Honing', colCategory: 'Categorie', colBenefits: 'Belangrijkste Voordelen', colPrice: 'Prijs (500g)' },
    about: { title: 'Over Miel du Maroc', subtitle: 'Een Familietraditie Sinds 1995', story: 'Familiebedrijf', tradition: 'Traditionele Methoden', traditionText: 'We oogsten met beproefde technieken die de natuurlijke enzymen en therapeutische eigenschappen van de honing behouden.', purity: '100% Puur', purityText: 'Geen toevoegingen, geen verwerking. Gewoon pure, rauwe honing precies zoals de natuur het bedoelde.', direct: 'Direct van de Bron', directText: 'Van onze bijenkorven in het Atlasgebergte direct naar uw tafel.' },
    whyUs: { title: 'Waarom Miel du Maroc Kiezen', subtitle: 'Het verschil zit in elke druppel', authenticity: 'Gegarandeerde Authenticiteit', authenticityText: 'Elke pot is traceerbaar tot onze familiebijenkorven in de Atlas', therapeutic: 'Therapeutische Kwaliteit', therapeuticText: 'Geoogst op het hoogtepunt van kracht', familyBusiness: 'Familiebedrijf', familyBusinessText: 'Persoonlijke aandacht voor elke bestelling' },
    testimonials: { title: 'Wat Onze Klanten Zeggen', subtitle: 'Vertrouwd door families in heel Europa' },
    contact: { title: 'Neem Contact Op', subtitle: 'We horen graag van u', whatsapp: 'Stuur ons een bericht op WhatsApp', whatsappText: 'Primair contact voor bestellingen en vragen', email: 'E-mail', emailText: 'Voor gedetailleerde vragen', location: 'Locatie', locationText: 'Marrakech, Marokko', messageLabel: 'Uw bericht (optioneel)', messagePlaceholder: 'Vertel ons wat u wilt bestellen of vragen...', form: { name: 'Uw Naam', email: 'E-mailadres', message: 'Uw Bericht', send: 'Bericht Versturen' } },
    shipping: { title: 'Verzending & Levering', subtitle: 'We leveren met zorg door heel Europa', info: 'Alle bestellingen worden zorgvuldig verpakt en verzonden vanuit Marokko. Typische levering naar Europa duurt 7-14 werkdagen.', packaging: 'Zorgvuldige Verpakking', packagingText: 'Elk potje wordt individueel ingepakt en gekussend voor veilig transport.', delivery: '7-14 Werkdagen', deliveryText: 'Standaard levering naar alle Europese landen vanuit Marokko.', infoTitle: 'Verzendingsinformatie', countries: 'We leveren in alle Europese landen waaronder Frankrijk, Duitsland, Nederland, Belgie, VK, Spanje, Italie, Zwitserland en meer.', courier: 'Alle bestellingen worden verzonden via internationale koeriersdienst met tracking. U ontvangt een trackingnummer zodra uw bestelling is verstuurd.', processing: 'Bestellingen worden doorgaans verwerkt binnen 1-2 werkdagen. Levering duurt 7-14 werkdagen naar de meeste Europese bestemmingen.', inquiries: 'Voor verzendvragen kunt u contact met ons opnemen via WhatsApp. We geven graag updates over uw levering.' },
    faq: { title: 'Veelgestelde Vragen', subtitle: 'Alles wat u moet weten', support: 'Ondersteuning' },
    blog: { title: 'Ons Blog', subtitle: 'Ontdek de wereld van Marokkaanse honing', readMore: 'Lees Meer', backToBlog: 'Terug naar Blog', journal: 'Journal', catHealth: 'Gezondheidsvoordelen', catTraditional: 'Traditioneel Gebruik', catOrdering: 'Bestelgids', catProduct: 'Product in de Spotlight' },
    payment: { title: 'Hoe te Bestellen', subtitle: 'Eenvoudig, veilig en persoonlijk', secure: 'Veilige Betaling', methodsText: 'Wij accepteren internationale overboekingen', stepTitle1: 'Bladeren & Kiezen', stepTitle2: 'Uw Offerte Ontvangen', stepTitle3: 'Betaling Verzenden', stepTitle4: 'Levering Volgen', step1: 'Blader door onze honingcollectie en kies uw favorieten', step2: 'Ontvang een gepersonaliseerde offerte met betalingsgegevens', step3: 'Verzend de betaling via uw favoriete overboekingsmethode', step4: 'Ontvang uw trackingnummer en bezorgupdates' },
    footer: { quickLinks: 'Snelle Links', support: 'Ondersteuning', followUs: 'Volg Ons', copyright: '\u00a9 2024 Miel du Maroc. Alle rechten voorbehouden.', tagline: 'Premium Marokkaanse honing, met liefde geoogst uit het Atlasgebergte sinds 1995.' },
    common: { learnMore: 'Meer Leren', orderNow: 'Bestellen', viewAll: 'Alles Bekijken', price: 'Prijs' },
    benefits: { title: 'Gezondheidsvoordelen van Marokkaanse Honing', subtitle: 'Het krachtigste geneesmiddel van de natuur' },
    collection: 'Collectie',
    tags: { all: 'Alle', immunity: 'Immuniteit', respiratory: 'Luchtwegen', digestion: 'Spijsvertering', energy: 'Energie', calming: 'Kalmerend', rare: 'Zeldzaam', liverHealth: 'Leversgezondheid', generalHealth: 'Algemene Gezondheid', wellness: 'Welzijn', warming: 'Verwarmend', powerful: 'Krachtig' },
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr');

  useEffect(() => {
    const savedLang = localStorage.getItem('mdm-lang') || 'fr';
    setLanguage(savedLang);
    document.documentElement.lang = savedLang;
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('mdm-lang', lang);
    document.documentElement.lang = lang;
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const getProductName = (product) => {
    const nameKey = language === 'en' ? 'name' : `name_${language}`;
    return product[nameKey] || product.name;
  };

  const getProductDescription = (product) => {
    const descKey = language === 'en' ? 'description' : `description_${language}`;
    return product[descKey] || product.description;
  };

  const getProductBenefits = (product) => {
    const benefitsKey = language === 'en' ? 'health_benefits' : `health_benefits_${language}`;
    return product[benefitsKey] || product.health_benefits;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, getProductName, getProductDescription, getProductBenefits }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};


export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '\ud83c\uddec\ud83c\udde7' },
  { code: 'fr', name: 'Fran\u00e7ais', flag: '\ud83c\uddeb\ud83c\uddf7' },
  { code: 'de', name: 'Deutsch', flag: '\ud83c\udde9\ud83c\uddea' },
  { code: 'nl', name: 'Nederlands', flag: '\ud83c\uddf3\ud83c\uddf1' },
  { code: 'ar', name: '\u0639\u0631\u0628\u064a', flag: '\ud83c\uddf2\ud83c\udde6' },
];
