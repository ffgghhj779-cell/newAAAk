const SITE_URL = 'https://www.almaarijsovereignwealthfund.com';

/**
 * Organization Schema - Tells AI and Search Engines exactly what this business entity is.
 */
export function getOrganizationSchema(locale: string) {
  const isAr = locale === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: isAr ? 'صندوق المعارج السيادي' : 'Sovereign Maareg Fund',
    alternateName: isAr ? 'Sovereign Maareg Fund' : 'صندوق المعارج السيادي',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/mylogo.png`,
      width: 512,
      height: 512,
    },
    description: isAr
      ? 'مؤسسة سيادية رائدة متخصصة في خدمات التأشيرات وحلول التنقل العالمي وإدارة الأصول الاستثمارية للمستثمرين وكبار الشخصيات.'
      : 'A premier sovereign institution specializing in premium visa services, global mobility solutions, and investment asset management for high-net-worth investors and executives.',
    foundingDate: '2024',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+201009086283',
        contactType: 'customer service',
        email: 'abdallahnooh7@gmail.com',
        availableLanguage: ['English', 'Arabic'],
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nasr City',
      addressCountry: 'EG',
    },
    sameAs: [
      // Add social media URLs here when available
    ],
  };
}

/**
 * FinancialService Schema - Classifies the business as a financial/investment service.
 * This is critical for AI systems to categorize the entity correctly.
 */
export function getFinancialServiceSchema(locale: string) {
  const isAr = locale === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    '@id': `${SITE_URL}/#financialservice`,
    name: isAr ? 'صندوق المعارج السيادي' : 'Sovereign Maareg Fund',
    description: isAr
      ? 'حلول استثمارية وتأشيرات سيادية للمستثمرين ورجال الأعمال حول العالم.'
      : 'Sovereign investment solutions and visa services for investors and business executives worldwide.',
    url: SITE_URL,
    provider: {
      '@id': `${SITE_URL}/#organization`,
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 30.0444,
        longitude: 31.2357,
      },
      geoRadius: '50000',
    },
    serviceType: [
      'Citizenship by Investment',
      'Golden Visa Processing',
      'Residency by Investment',
      'Corporate Establishment',
      'Wealth Management',
      'Global Mobility Solutions',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: isAr ? 'برامج التأشيرات السيادية' : 'Sovereign Visa Programs',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isAr ? 'إقامة المستثمرين المتميزة' : 'Premium Residency & Citizenship',
            description: isAr
              ? 'مساعدة شاملة للحصول على الإقامة والجنسية عبر برامج الاستثمار.'
              : 'End-to-end assistance in securing residency and citizenship via strategic investment programs.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isAr ? 'استشارات تأسيس الشركات' : 'Corporate Establishment',
            description: isAr
              ? 'تأسيس شركات دولية مع دمج قانوني كامل.'
              : 'Seamless international company formation and legal integration.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isAr ? 'إدارة الثروات والممتلكات' : 'Wealth & Property Integration',
            description: isAr
              ? 'تأمين استثماراتك العقارية ودمجها ببرامج الهجرة.'
              : 'Securing real estate investments and mapping them to sovereign immigration frameworks.',
          },
        },
      ],
    },
  };
}

/**
 * WebSite Schema with SearchAction - Enables Google Sitelinks Search Box.
 */
export function getWebSiteSchema(locale: string) {
  const isAr = locale === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: isAr ? 'صندوق المعارج السيادي' : 'Sovereign Maareg Fund',
    url: SITE_URL,
    inLanguage: [locale],
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/${locale}/visas?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * BreadcrumbList Schema - Helps Google and AI understand page hierarchy.
 */
export function getBreadcrumbSchema(locale: string, items: {name: string; url: string}[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}/${locale}${item.url}`,
    })),
  };
}

/**
 * FAQ Schema - Helps AI extract Q&A directly for featured snippets.
 */
export function getFAQSchema(locale: string) {
  const isAr = locale === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: isAr ? 'ما هو صندوق المعارج السيادي؟' : 'What is Sovereign Maareg Fund?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isAr
            ? 'صندوق المعارج السيادي هو مؤسسة رائدة متخصصة في تقديم خدمات التأشيرات وحلول التنقل العالمي بمعايير سيادية للمستثمرين وكبار الشخصيات ورجال الأعمال.'
            : 'Sovereign Maareg Fund is a premier institution specializing in premium visa services and global mobility solutions with sovereign standards for high-net-worth investors and executives.',
        },
      },
      {
        '@type': 'Question',
        name: isAr ? 'ما الخدمات التي يقدمها صندوق المعارج؟' : 'What services does Sovereign Maareg Fund offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isAr
            ? 'نقدم خدمات إقامة المستثمرين المتميزة، استشارات تأسيس الشركات الدولية، إدارة الثروات والممتلكات، وحماية وضمان الملفات بتدقيق سيادي شامل.'
            : 'We offer Premium Residency & Citizenship, Corporate Establishment consulting, Wealth & Property Integration, and Protected Case Management with full sovereign audits.',
        },
      },
      {
        '@type': 'Question',
        name: isAr ? 'كم تستغرق معالجة طلبات التأشيرة؟' : 'How long does visa processing take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isAr
            ? 'تختلف المدة حسب نوع البرنامج والدولة المستهدفة. تتراوح المدة عادة بين 3 أشهر إلى 12 شهراً، مع خيارات معالجة سريعة متاحة لبعض البرامج.'
            : 'Processing times vary by program type and destination country. Typical timelines range from 3 to 12 months, with expedited processing options available for select programs.',
        },
      },
      {
        '@type': 'Question',
        name: isAr ? 'ما هي نسبة نجاح الطلبات؟' : 'What is the application success rate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isAr
            ? 'نسبة نجاح الطلبات لدينا تتجاوز 99.9% بفضل التدقيق السيادي الشامل الذي نقوم به قبل تقديم أي ملف.'
            : 'Our application success rate exceeds 99.9% thanks to our comprehensive sovereign audit process conducted before any case submission.',
        },
      },
    ],
  };
}
