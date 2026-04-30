import { CheerioAPI } from 'cheerio';
import { CategoryScore, CheckResult } from '@/types/audit';

export function checkTechnical($: CheerioAPI): CategoryScore {
  const checks: CheckResult[] = [];

  // Check meta description
  const metaDescription = $('meta[name="description"]').attr('content') || '';
  const descriptionLength = metaDescription.length;

  checks.push({
    name: 'Meta description (120-160 chars)',
    passed: descriptionLength >= 120 && descriptionLength <= 160,
    value: `${descriptionLength} characters`,
    ideal: '120-160 characters',
    importance: 'critical',
    details: metaDescription.substring(0, 80) || 'Not found',
  });

  // Check Open Graph tags
  const ogTitle = $('meta[property="og:title"]').attr('content');
  const ogDescription = $('meta[property="og:description"]').attr('content');
  const ogImage = $('meta[property="og:image"]').attr('content');
  const hasOGTags = !!ogTitle && !!ogDescription && !!ogImage;

  checks.push({
    name: 'Open Graph tags',
    passed: hasOGTags,
    value: hasOGTags ? 'Complete' : 'Incomplete',
    ideal: 'og:title, og:description, og:image',
    importance: 'important',
    details: [ogTitle && 'title ✓', ogDescription && 'description ✓', ogImage && 'image ✓'].filter(Boolean).join(', '),
  });

  // Check page title
  const pageTitle = $('title').text();
  const titleLength = pageTitle.length;

  checks.push({
    name: 'Page title length (30-60 chars)',
    passed: titleLength >= 30 && titleLength <= 60,
    value: `${titleLength} characters`,
    ideal: '30-60 characters',
    importance: 'critical',
    details: pageTitle || 'Not found',
  });

  // Check canonical URL
  const canonicalURL = $('link[rel="canonical"]').attr('href');
  const hasCanonical = !!canonicalURL;

  checks.push({
    name: 'Canonical URL',
    passed: hasCanonical,
    value: canonicalURL || 'Not found',
    ideal: 'Present to avoid duplicates',
    importance: 'important',
  });

  // Check image alt text
  const images = $('img');
  const imagesWithAlt = $('img[alt]').length;
  const altCoverage = images.length > 0 ? Math.round((imagesWithAlt / images.length) * 100) : 100;

  checks.push({
    name: 'Image alt text coverage',
    passed: altCoverage >= 80,
    value: `${altCoverage}% (${imagesWithAlt}/${images.length})`,
    ideal: '100% of images with alt text',
    importance: 'important',
  });

  // Check internal links
  const internalLinkCount = $('a[href^="/"], a[href^="./"], a[href^="../"]').length;

  checks.push({
    name: 'Internal links',
    passed: internalLinkCount > 0,
    value: `${internalLinkCount} found`,
    ideal: 'Multiple links to other pages',
    importance: 'important',
  });

  // Check external links
  const externalLinks = $('a[href^="http"]').length;

  checks.push({
    name: 'External links',
    passed: externalLinks > 0,
    value: `${externalLinks} found`,
    ideal: 'Links to external resources',
    importance: 'suggestion',
  });

  // Check viewport meta tag
  const viewportTag = $('meta[name="viewport"]').attr('content');
  const hasViewport = !!viewportTag;

  checks.push({
    name: 'Mobile viewport meta tag',
    passed: hasViewport,
    value: hasViewport ? 'Present' : 'Missing',
    ideal: 'viewport=device-width, initial-scale=1',
    importance: 'important',
  });

  // Check for robots meta tag
  const robotsTag = $('meta[name="robots"]').attr('content');
  const isIndexable = !robotsTag || !robotsTag.includes('noindex');

  checks.push({
    name: 'Page indexable (not noindex)',
    passed: isIndexable,
    value: robotsTag || 'Not specified (default indexable)',
    ideal: 'Indexable by search engines',
    importance: 'critical',
  });

  // Check for language tag
  const htmlLang = $('html').attr('lang');
  const hasLanguage = !!htmlLang;

  checks.push({
    name: 'Language attribute',
    passed: hasLanguage,
    value: htmlLang || 'Not set',
    ideal: 'lang attribute on html tag',
    importance: 'suggestion',
  });

  // Check for SSL/HTTPS (heuristic - check for https in links)
  const httpLinksCount = $('a[href^="http://"]').not('[href*="https"]').length;
  const preferHTTPS = httpLinksCount === 0;

  checks.push({
    name: 'HTTPS preferred',
    passed: preferHTTPS,
    value: preferHTTPS ? 'Only HTTPS' : `${httpLinksCount} HTTP links found`,
    ideal: 'All links use HTTPS',
    importance: 'suggestion',
  });

  const score = calculateCategoryScore(checks);

  return {
    score,
    maxScore: 100,
    checks,
    recommendations: [
      (descriptionLength < 120 || descriptionLength > 160) && 'Update meta description to 120-160 characters',
      !hasOGTags && 'Add complete Open Graph tags for social preview cards',
      (titleLength < 30 || titleLength > 60) && 'Adjust page title to 30-60 characters',
      !hasCanonical && 'Add canonical URL to prevent duplicate indexing',
      altCoverage < 100 && `Add alt text to ${images.length - imagesWithAlt} images`,
      internalLinkCount === 0 && 'Add internal links to other relevant pages',
      !hasViewport && 'Add viewport meta tag for mobile optimization',
      !isIndexable && 'Remove noindex robots tag to allow indexing',
      !hasLanguage && 'Add lang attribute to html tag',
      httpLinksCount > 0 && 'Change HTTP links to HTTPS',
    ].filter(Boolean) as string[],
  };
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
