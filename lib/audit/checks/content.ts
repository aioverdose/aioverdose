import { CheerioAPI } from 'cheerio';
import { CategoryScore, CheckResult } from '@/types/audit';

export function checkContent($: CheerioAPI): CategoryScore {
  const checks: CheckResult[] = [];

  // Get first paragraph
  const firstParagraph = $('p').first().text().trim();
  const firstParagraphWords = firstParagraph.split(/\s+/).length;

  checks.push({
    name: 'First paragraph length (40-60 words)',
    passed: firstParagraphWords >= 40 && firstParagraphWords <= 60,
    value: `${firstParagraphWords} words`,
    ideal: '40-60 words for AI summaries',
    importance: 'critical',
    details: `"${firstParagraph.substring(0, 80)}..."`,
  });

  // Check for summary blocks
  const summaryElements = $('[class*="summary"], [class*="excerpt"], [role="doc-summary"]');
  const hasSummary = summaryElements.length > 0;

  checks.push({
    name: 'Summary/excerpt blocks',
    passed: hasSummary,
    value: hasSummary ? `${summaryElements.length} found` : 'Not found',
    ideal: 'At least one summary block',
    importance: 'important',
  });

  // Count bullet points and lists
  const bulletPoints = $('li').length;
  const hasLists = bulletPoints > 0;

  checks.push({
    name: 'Bullet points/lists',
    passed: hasLists,
    value: `${bulletPoints} items`,
    ideal: 'Multiple lists for scannability',
    importance: 'important',
  });

  // Check for bold/strong text
  const boldText = $('strong, b, [role="strong"]').length;
  const hasKeyTerms = boldText > 0;

  checks.push({
    name: 'Bold key terms',
    passed: hasKeyTerms && boldText >= 5,
    value: `${boldText} bold elements`,
    ideal: '5+ highlighted key terms',
    importance: 'suggestion',
  });

  // Analyze paragraph lengths
  const paragraphs = $('p');
  const paragraphLengths: number[] = [];

  paragraphs.each((_, elem) => {
    const words = $(elem).text().split(/\s+/).length;
    paragraphLengths.push(words);
  });

  const avgParagraphLength = paragraphLengths.length > 0
    ? Math.round(paragraphLengths.reduce((a, b) => a + b) / paragraphLengths.length)
    : 0;

  const goodParagraphs = paragraphLengths.filter((len) => len >= 50 && len <= 150).length;

  checks.push({
    name: 'Paragraph length (50-150 words)',
    passed: goodParagraphs >= paragraphLengths.length * 0.7,
    value: `${goodParagraphs}/${paragraphLengths.length} optimal`,
    ideal: '70%+ of paragraphs 50-150 words',
    importance: 'important',
    details: `Average: ${avgParagraphLength} words`,
  });

  // Check code blocks (if technical content)
  const codeBlocks = $('code, pre');
  const hasCodeBlocks = codeBlocks.length > 0;

  checks.push({
    name: 'Code blocks (if applicable)',
    passed: !hasCodeBlocks || codeBlocks.length > 0,
    value: `${codeBlocks.length} found`,
    ideal: 'Well-formatted code',
    importance: 'suggestion',
  });

  // Check for quoted text
  const quotes = $('blockquote, q');
  const hasQuotes = quotes.length > 0;

  checks.push({
    name: 'Cited quotes/references',
    passed: hasQuotes,
    value: `${quotes.length} quotes`,
    ideal: 'External citations for credibility',
    importance: 'suggestion',
  });

  // Calculate total word count
  const bodyText = $('body').text();
  const totalWords = bodyText.split(/\s+/).length;

  checks.push({
    name: 'Total word count',
    passed: totalWords >= 300,
    value: `${totalWords} words`,
    ideal: '300+ words for comprehensive coverage',
    importance: 'important',
  });

  const score = calculateCategoryScore(checks);

  return {
    score,
    maxScore: 100,
    checks,
    recommendations: [
      firstParagraphWords < 40 && 'Expand your first paragraph to 40-60 words for better AI summarization',
      firstParagraphWords > 60 && 'Condense your first paragraph to 40-60 words for AI extraction',
      !hasSummary && 'Add a summary section after the H1 for AI systems to extract directly',
      !hasLists && 'Use bullet points to break down complex information',
      boldText < 5 && 'Highlight 5-10 key terms in bold for emphasis',
      avgParagraphLength > 150 && 'Break down long paragraphs (150+ words) for better readability',
      avgParagraphLength < 50 && 'Expand short paragraphs to provide more context',
      totalWords < 300 && 'Expand content to at least 300 words for comprehensive coverage',
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
