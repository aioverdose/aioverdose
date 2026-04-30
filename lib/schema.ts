// Utility for generating structured data (JSON-LD) for SEO and AI search readiness

export interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
  contactPoint: {
    '@type': string;
    email: string;
  };
}

export interface ArticleSchema {
  '@context': string;
  '@type': string;
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified: string;
  author: {
    '@type': string;
    name: string;
  };
  publisher: {
    '@type': string;
    name: string;
    logo: {
      '@type': string;
      url: string;
    };
  };
}

export interface BreadcrumbSchema {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item?: string;
  }>;
}

export interface FAQSchema {
  '@context': string;
  '@type': string;
  mainEntity: Array<{
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  }>;
}

export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'aioverdose',
    url: 'https://aioverdose.com',
    logo: 'https://aioverdose.com/logo.png',
    description:
      'AI Search Readiness Audit Tool - Analyze web pages for compatibility with AI search systems (ChatGPT, Perplexity, Google AI Overviews, Gemini)',
    sameAs: [
      'https://twitter.com/aioverdose',
      'https://linkedin.com/company/aioverdose',
      'https://github.com/aioverdose',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@aioverdose.com',
    },
  };
}

export function generateArticleSchema(
  headline: string,
  description: string,
  datePublished: string,
  dateModified?: string,
  author: string = 'aioverdose'
): ArticleSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description,
    datePublished,
    dateModified: dateModified || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'aioverdose',
      logo: {
        '@type': 'ImageObject',
        url: 'https://aioverdose.com/logo.png',
      },
    },
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url?: string }>
): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url }),
    })),
  };
}

export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
): FAQSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function schemaToJson(schema: unknown): string {
  return JSON.stringify(schema, null, 2);
}
