import { CheerioAPI } from 'cheerio';
import { CategoryScore, CheckResult } from '@/types/audit';

export function checkTrust($: CheerioAPI): CategoryScore {
  const checks: CheckResult[] = [];

  // Check for author name
  const authorMeta = $('meta[name="author"]').attr('content');
  const authorByline = $('[class*="author"], [rel="author"]').text().trim();
  const hasAuthor = !!authorMeta || !!authorByline;

  checks.push({
    name: 'Author name present',
    passed: hasAuthor,
    value: authorMeta || authorByline || 'Not found',
    ideal: 'Author name or byline',
    importance: 'critical',
  });

  // Check for author bio/credentials
  const authorBio = $('[class*="bio"], [class*="credentials"]').text();
  const hasAuthorBio = authorBio.length > 20;

  checks.push({
    name: 'Author credentials/bio',
    passed: hasAuthorBio,
    value: hasAuthorBio ? `${authorBio.substring(0, 50)}...` : 'Not found',
    ideal: 'Author expertise/credentials',
    importance: 'important',
    details: hasAuthorBio ? authorBio.substring(0, 100) : 'No bio found',
  });

  // Check for publication date
  const pubDate = extractDate($, 'published, datePublished');
  const hasPubDate = !!pubDate;

  checks.push({
    name: 'Publication date',
    passed: hasPubDate,
    value: pubDate || 'Not found',
    ideal: 'ISO 8601 format or visible date',
    importance: 'critical',
  });

  // Check for last updated date
  const updatedDate = extractDate($, 'modified, dateModified, updated');
  const hasUpdatedDate = !!updatedDate;
  const isRecent = hasUpdatedDate && isDateRecent(updatedDate);

  checks.push({
    name: 'Last updated date',
    passed: hasUpdatedDate && isRecent,
    value: updatedDate || 'Not found',
    ideal: 'Updated within last 90 days',
    importance: 'important',
    details: isRecent ? 'Recent' : 'Check if current',
  });

  // Check for external citations/references
  const externalLinks = $('a[href^="http"]').length;
  const hasExternalCitations = externalLinks > 0;

  checks.push({
    name: 'External citations',
    passed: hasExternalCitations && externalLinks >= 3,
    value: `${externalLinks} external links`,
    ideal: '3+ citations to authoritative sources',
    importance: 'important',
  });

  // Check for links to authoritative sources
  const authorityDomains = ['gov.', 'edu.', '.org', 'wikipedia'];
  let authorityLinks = 0;

  $('a[href^="http"]').each((_, elem) => {
    const href = $(elem).attr('href') || '';
    if (authorityDomains.some((d) => href.includes(d))) {
      authorityLinks++;
    }
  });

  checks.push({
    name: 'Links to authoritative sources',
    passed: authorityLinks > 0,
    value: `${authorityLinks} found`,
    ideal: 'Citations to .gov, .edu, .org domains',
    importance: 'important',
  });

  // Check for E-E-A-T signals (Experience, Expertise, Authoritativeness, Trustworthiness)
  const hasEEAT = hasAuthor && hasAuthorBio && hasPubDate && authorityLinks > 0;

  checks.push({
    name: 'E-E-A-T signals',
    passed: hasEEAT,
    value: hasEEAT ? 'Strong signals' : 'Incomplete',
    ideal: 'Author + Bio + Date + Citations',
    importance: 'critical',
    details: [
      hasAuthor && 'Author ✓',
      hasAuthorBio && 'Bio ✓',
      hasPubDate && 'Date ✓',
      authorityLinks > 0 && 'Citations ✓',
    ]
      .filter(Boolean)
      .join(', '),
  });

  // Check for contact information
  const hasContact = $('a[href="mailto:"], [class*="contact"]').length > 0;

  checks.push({
    name: 'Contact information',
    passed: hasContact,
    value: hasContact ? 'Found' : 'Not found',
    ideal: 'Email or contact form',
    importance: 'suggestion',
  });

  // Check for trust badges/certifications
  const trustBadges = $('[class*="verified"], [class*="certified"], [class*="trusted"]').length;

  checks.push({
    name: 'Trust indicators',
    passed: trustBadges > 0 || hasContact,
    value: trustBadges > 0 ? `${trustBadges} found` : 'Not visible',
    ideal: 'Security badges or certifications',
    importance: 'suggestion',
  });

  const score = calculateCategoryScore(checks);

  return {
    score,
    maxScore: 100,
    checks,
    recommendations: [
      !hasAuthor && 'Add author byline with name',
      !hasAuthorBio && 'Include author credentials (expertise, role, experience)',
      !hasPubDate && 'Add publication date using meta tag or visible text',
      !isRecent && hasUpdatedDate && 'Update the "last modified" date regularly',
      externalLinks < 3 && 'Add citations to at least 3 authoritative sources',
      authorityLinks === 0 && 'Link to authoritative sources (.gov, .edu, .org)',
      !hasContact && 'Display contact information or contact form',
      trustBadges === 0 && 'Add security/trust badges for credibility',
    ].filter(Boolean) as string[],
  };
}

function extractDate($: CheerioAPI, selectors: string): string {
  const metaDate = $(selectors.split(',').map((s) => `meta[property="${s.trim()}"], meta[name="${s.trim()}"]`).join(','))
    .attr('content');

  if (metaDate) {
    return new Date(metaDate).toLocaleDateString();
  }

  const textDate = $(selectors.split(',').map((s) => `time[datetime], [data-date], .${s.trim()}`).join(',')).attr('datetime')
    || $(selectors.split(',').map((s) => `time[datetime], [data-date], .${s.trim()}`).join(',')).attr('content')
    || $(selectors.split(',').map((s) => `time[datetime], [data-date], .${s.trim()}`).join(',')).text();

  if (textDate) {
    try {
      return new Date(textDate).toLocaleDateString();
    } catch (e) {
      return textDate;
    }
  }

  return '';
}

function isDateRecent(dateStr: string): boolean {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return diffDays <= 90;
  } catch (e) {
    return false;
  }
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
