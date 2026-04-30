import { CheerioAPI } from 'cheerio';
import { CategoryScore, CheckResult } from '@/types/audit';

export function checkSchema($: CheerioAPI): CategoryScore {
  const checks: CheckResult[] = [];

  // Find all JSON-LD scripts
  const jsonLdScripts = $('script[type="application/ld+json"]');
  const jsonLdCount = jsonLdScripts.length;

  checks.push({
    name: 'JSON-LD markup present',
    passed: jsonLdCount > 0,
    value: jsonLdCount,
    ideal: 'At least 1',
    importance: 'critical',
    details: `Found ${jsonLdCount} JSON-LD block(s)`,
  });

  // Parse JSON-LD and check for specific schemas
  const foundTypes = new Set<string>();

  jsonLdScripts.each((_, elem) => {
    try {
      const text = $(elem).text();
      const json = JSON.parse(text);
      const type = json['@type'];

      if (typeof type === 'string') {
        foundTypes.add(type);
      } else if (Array.isArray(type)) {
        type.forEach((t) => foundTypes.add(t));
      }
    } catch (e) {
      // Invalid JSON-LD, skip
    }
  });

  // Check for Article-like schemas
  const hasArticleSchema = ['Article', 'NewsArticle', 'BlogPosting'].some((t) => foundTypes.has(t));
  checks.push({
    name: 'Article schema',
    passed: hasArticleSchema,
    value: hasArticleSchema ? 'Found' : 'Missing',
    ideal: 'Article/NewsArticle/BlogPosting',
    importance: 'critical',
    details: Array.from(foundTypes).join(', ') || 'No schema found',
  });

  // Check for FAQ schema
  const hasFAQSchema = foundTypes.has('FAQPage');
  checks.push({
    name: 'FAQPage schema',
    passed: hasFAQSchema,
    value: hasFAQSchema ? 'Found' : 'Missing',
    ideal: 'Present for FAQ pages',
    importance: 'important',
  });

  // Check for HowTo schema
  const hasHowToSchema = foundTypes.has('HowTo');
  checks.push({
    name: 'HowTo schema',
    passed: hasHowToSchema,
    value: hasHowToSchema ? 'Found' : 'Missing',
    ideal: 'Present for instructional content',
    importance: 'important',
  });

  // Check for Organization/Person schema
  const hasOrgSchema = foundTypes.has('Organization') || foundTypes.has('Person');
  checks.push({
    name: 'Organization/Person schema',
    passed: hasOrgSchema,
    value: hasOrgSchema ? 'Found' : 'Missing',
    ideal: 'Organization or Person',
    importance: 'important',
    details: hasOrgSchema ? Array.from(foundTypes).filter((t) => t === 'Organization' || t === 'Person').join(', ') : 'None',
  });

  // Check for BreadcrumbList
  const hasBreadcrumb = foundTypes.has('BreadcrumbList');
  checks.push({
    name: 'BreadcrumbList schema',
    passed: hasBreadcrumb,
    value: hasBreadcrumb ? 'Found' : 'Missing',
    ideal: 'Recommended for multi-level sites',
    importance: 'suggestion',
  });

  // Check for og:image
  const ogImage = $('meta[property="og:image"]').attr('content');
  checks.push({
    name: 'OpenGraph image',
    passed: !!ogImage,
    value: ogImage ? 'Found' : 'Missing',
    ideal: 'og:image for preview cards',
    importance: 'suggestion',
  });

  // Calculate score
  const score = calculateCategoryScore(checks);

  return {
    score,
    maxScore: 100,
    checks,
    recommendations: [
      !hasArticleSchema && 'Add Article, NewsArticle, or BlogPosting schema for better AI recognition',
      !hasFAQSchema && hasFAQ($) && 'Add FAQPage schema to your FAQ section for direct Q&A extraction',
      !hasHowToSchema && isHowToContent($) && 'Add HowTo schema for instructional content',
      !hasOrgSchema && 'Add Organization or Person schema for author/creator credibility',
      !hasBreadcrumb && 'Add BreadcrumbList schema for better site structure understanding',
      !ogImage && 'Add og:image meta tag for social and AI preview cards',
    ].filter(Boolean) as string[],
  };
}

function hasFAQ($: CheerioAPI): boolean {
  const text = $.text().toLowerCase();
  return text.includes('faq') || text.includes('frequently asked');
}

function isHowToContent($: CheerioAPI): boolean {
  const text = $.text().toLowerCase();
  return text.includes('step') || text.includes('how to') || text.includes('tutorial');
}

function calculateCategoryScore(checks: CheckResult[]): number {
  if (checks.length === 0) return 0;

  let totalWeight = 0;
  let weightedScore = 0;

  checks.forEach((check) => {
    const weight = check.importance === 'critical' ? 3 : check.importance === 'important' ? 2 : 1;
    totalWeight += weight;
    weightedScore += (check.passed ? 100 : 0) * weight;
  });

  return Math.round(weightedScore / totalWeight);
}
