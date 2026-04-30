import { CheerioAPI } from 'cheerio';
import { CategoryScore, CheckResult } from '@/types/audit';

interface FAQItem {
  question: string;
  answer: string;
}

export function checkFAQ($: CheerioAPI): CategoryScore {
  const checks: CheckResult[] = [];

  // Find FAQ sections
  const faqSections = $('[class*="faq"], [id*="faq"]');
  const hasFAQSection = faqSections.length > 0;

  checks.push({
    name: 'FAQ section detected',
    passed: hasFAQSection,
    value: hasFAQSection ? 'Found' : 'Not found',
    ideal: 'Dedicated FAQ section',
    importance: 'important',
  });

  // Extract Q&A pairs
  const qaItems = extractQAPairs($);

  checks.push({
    name: 'Question-answer pairs',
    passed: qaItems.length > 0,
    value: `${qaItems.length} pairs`,
    ideal: '5+ quality Q&A pairs',
    importance: 'important',
    details: qaItems.length > 0 ? qaItems.slice(0, 3).map((q) => `Q: ${q.question}`).join('\n') : 'None found',
  });

  // Check question phrasing
  const naturalQuestions = qaItems.filter((q) => isNaturalQuestion(q.question));
  const hasNaturalQuestions = naturalQuestions.length === qaItems.length && qaItems.length > 0;

  checks.push({
    name: 'Natural question phrasing',
    passed: hasNaturalQuestions,
    value: `${naturalQuestions.length}/${qaItems.length} natural`,
    ideal: 'Questions phrased naturally (Who/What/Where/When/Why/How)',
    importance: 'important',
    details: qaItems.length > 0 ? qaItems.slice(0, 2).map((q) => `"${q.question}"`).join(', ') : 'No questions',
  });

  // Check answer lengths
  const answerLengths = qaItems.map((q) => q.answer.split(/\s+/).length);
  const hasGoodAnswers = answerLengths.every((len) => len >= 30 && len <= 200);

  checks.push({
    name: 'Answer length (30-200 words)',
    passed: hasGoodAnswers && qaItems.length > 0,
    value: `${qaItems.filter((_, i) => answerLengths[i] >= 30 && answerLengths[i] <= 200).length}/${qaItems.length} optimal`,
    ideal: 'Concise answers 30-200 words',
    importance: 'important',
    details: answerLengths.length > 0 ? `Average: ${Math.round(answerLengths.reduce((a, b) => a + b) / answerLengths.length)} words` : '',
  });

  // Check for FAQPage schema in FAQ section
  const faqSchema = $('script[type="application/ld+json"]').filter((_, elem) => {
    try {
      const json = JSON.parse($(elem).text());
      return json['@type'] === 'FAQPage';
    } catch (e) {
      return false;
    }
  });

  const hasFAQPageSchema = faqSchema.length > 0;

  checks.push({
    name: 'FAQPage schema on FAQs',
    passed: hasFAQPageSchema,
    value: hasFAQPageSchema ? 'Implemented' : 'Missing',
    ideal: 'FAQPage schema with question-answer items',
    importance: 'critical',
  });

  // Check for expandable/accordion patterns
  const hasAccordion = $('[role="tablist"], [aria-expanded]').length > 0;

  checks.push({
    name: 'Interactive FAQ (accordion)',
    passed: hasAccordion,
    value: hasAccordion ? 'Found' : 'Not found',
    ideal: 'Expandable Q&A blocks',
    importance: 'suggestion',
  });

  const score = calculateCategoryScore(checks);

  return {
    score,
    maxScore: 100,
    checks,
    recommendations: [
      !hasFAQSection && 'Create a dedicated FAQ section for better AI extraction',
      qaItems.length < 5 && 'Add at least 5 common questions in your FAQ section',
      !hasNaturalQuestions && 'Rephrase questions to be more natural and conversational',
      !hasGoodAnswers && 'Ensure answers are 30-200 words for clear AI extraction',
      !hasFAQPageSchema && qaItems.length > 0 && 'Implement FAQPage schema for direct search result display',
      !hasAccordion && 'Use expandable sections for better UX and crawlability',
    ].filter(Boolean) as string[],
  };
}

function extractQAPairs($: CheerioAPI): FAQItem[] {
  const items: FAQItem[] = [];

  // Try to find accordion/details elements
  $('details').each((_, details) => {
    const summary = $(details).find('summary').text().trim();
    const answer = $(details).contents().not('summary').text().trim();

    if (summary && answer) {
      items.push({ question: summary, answer });
    }
  });

  // Try to find divs with Q and A classes
  $('[class*="question"], dt').each((_, elem) => {
    const $elem = $(elem);
    const question = $elem.text().trim();
    const answer = $elem.next('[class*="answer"], dd').text().trim();

    if (question && answer) {
      items.push({ question, answer });
    }
  });

  // Try to find h3/h4 followed by p pattern
  if (items.length === 0) {
    $('h3, h4').each((_, heading) => {
      const $heading = $(heading);
      if ($heading.text().toLowerCase().includes('?')) {
        const answer = $heading.next('p').text().trim();
        if (answer) {
          items.push({
            question: $heading.text().trim(),
            answer,
          });
        }
      }
    });
  }

  return items;
}

function isNaturalQuestion(question: string): boolean {
  const q = question.toLowerCase();
  const naturalStarts = ['what', 'why', 'how', 'where', 'when', 'who', 'which', 'does', 'can', 'should', 'is'];
  return naturalStarts.some((start) => q.startsWith(start)) && question.includes('?');
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
