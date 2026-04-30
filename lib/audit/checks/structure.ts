import { CheerioAPI } from 'cheerio';
import { CategoryScore, CheckResult } from '@/types/audit';

export function checkStructure($: CheerioAPI): CategoryScore {
  const checks: CheckResult[] = [];

  // Check H1
  const h1Count = $('h1').length;
  checks.push({
    name: 'Single H1 tag',
    passed: h1Count === 1,
    value: h1Count,
    ideal: '1',
    importance: 'critical',
    details: `Found ${h1Count} H1 tag(s)`,
  });

  // Check H2/H3 flow
  const headings = $('h1, h2, h3, h4, h5, h6');
  let validHierarchy = true;
  const headingLevels: number[] = [];

  headings.each((_, elem) => {
    const tagName = elem.name;
    const level = parseInt(tagName[1]);
    headingLevels.push(level);
  });

  // Check for skipped levels
  for (let i = 1; i < headingLevels.length; i++) {
    const diff = headingLevels[i] - headingLevels[i - 1];
    if (diff > 1) {
      validHierarchy = false;
      break;
    }
  }

  checks.push({
    name: 'Logical heading hierarchy',
    passed: validHierarchy,
    value: validHierarchy ? 'Valid' : 'Skipped levels detected',
    ideal: 'No skipped levels',
    importance: 'important',
    details: `Heading levels: ${headingLevels.join(' → ')}`,
  });

  // Count H2s and H3s
  const h2Count = $('h2').length;
  const h3Count = $('h3').length;

  checks.push({
    name: 'Heading count',
    passed: h2Count > 0,
    value: `${h2Count} H2, ${h3Count} H3`,
    ideal: 'At least 3 H2s',
    importance: 'important',
  });

  // Check section lengths
  let sectionLengths: number[] = [];
  $('h2').each((_, elem) => {
    const $h2 = $(elem);
    let wordCount = 0;
    let current = $h2.next();

    while (current.length && !current.is('h1, h2')) {
      wordCount += current.text().split(/\s+/).length;
      current = current.next();
    }
    sectionLengths.push(wordCount);
  });

  const avgSectionLength = sectionLengths.length > 0
    ? Math.round(sectionLengths.reduce((a, b) => a + b) / sectionLengths.length)
    : 0;

  const goodSections = sectionLengths.filter(
    (len) => len >= 150 && len <= 300
  ).length;

  checks.push({
    name: 'Section length (150-300 words)',
    passed: goodSections >= sectionLengths.length * 0.7,
    value: `${goodSections}/${sectionLengths.length} sections optimal`,
    ideal: '70%+ of sections 150-300 words',
    importance: 'suggestion',
    details: `Average: ${avgSectionLength} words`,
  });

  // Check for TOC
  const hasTOC = $('nav:contains("Table of Contents"), [role="navigation"]:contains("Table")').length > 0;

  checks.push({
    name: 'Table of Contents',
    passed: hasTOC,
    value: hasTOC ? 'Detected' : 'Not found',
    ideal: 'Present for long articles',
    importance: 'suggestion',
  });

  // Calculate score
  const score = calculateCategoryScore(checks);

  return {
    score,
    maxScore: 100,
    checks,
    recommendations: [
      h1Count !== 1 && 'Ensure exactly one H1 tag per page',
      !validHierarchy && 'Fix heading hierarchy - avoid skipping levels',
      h2Count === 0 && 'Add H2 tags to structure content sections',
      avgSectionLength > 300 && 'Break down long sections into subsections',
      avgSectionLength < 150 && 'Expand sections to 150+ words for better context',
      !hasTOC && 'Add a table of contents for articles 2000+ words',
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
