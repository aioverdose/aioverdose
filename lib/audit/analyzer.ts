import * as cheerio from 'cheerio';
import { AuditResult, Grade, ActionItem } from '@/types/audit';
import { checkStructure } from './checks/structure';
import { checkSchema } from './checks/schema';
import { checkContent } from './checks/content';
import { checkFAQ } from './checks/faq';
import { checkTrust } from './checks/trust';
import { checkTechnical } from './checks/technical';

export async function analyzeURL(url: string): Promise<AuditResult> {
  let html = '';
  let fetchStatus: 'success' | 'partial' | 'error' = 'error';
  let fetchError: string | undefined;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok && response.status !== 200) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    html = await response.text();
    fetchStatus = 'success';
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    fetchError = errorMessage;

    if (errorMessage.includes('CORS') || errorMessage.includes('Cross-Origin')) {
      fetchStatus = 'error';
      throw new Error(`CORS Error: Unable to fetch ${url}. Try pasting HTML instead.`);
    }

    throw error;
  }

  return analyzeHTML(html, url, fetchStatus, fetchError);
}

export function analyzeHTML(html: string, url: string = 'clipboard', fetchStatus: 'success' | 'partial' | 'error' = 'success', fetchError?: string): AuditResult {
  const $ = cheerio.load(html);

  // Run all checks
  const structure = checkStructure($);
  const schema = checkSchema($);
  const content = checkContent($);
  const faq = checkFAQ($);
  const trust = checkTrust($);
  const technical = checkTechnical($);

  // Calculate weighted overall score
  const categoryWeights = {
    structure: 0.2,
    schema: 0.2,
    content: 0.2,
    faq: 0.15,
    trust: 0.15,
    technical: 0.1,
  };

  const overallScore = Math.round(
    structure.score * categoryWeights.structure +
      schema.score * categoryWeights.schema +
      content.score * categoryWeights.content +
      faq.score * categoryWeights.faq +
      trust.score * categoryWeights.trust +
      technical.score * categoryWeights.technical
  );

  const grade = getGrade(overallScore);

  // Collect recommendations and create action plan
  const allRecommendations = [
    ...structure.recommendations,
    ...schema.recommendations,
    ...content.recommendations,
    ...faq.recommendations,
    ...trust.recommendations,
    ...technical.recommendations,
  ];

  const actionPlan = generateActionPlan(allRecommendations);

  // Extract metadata
  const title = $('title').text() || $('meta[property="og:title"]').attr('content') || 'Untitled';
  const description = $('meta[name="description"]').attr('content') || '';
  const bodyText = $('body').text();
  const wordCount = bodyText.split(/\s+/).filter((w) => w.length > 0).length;
  const readingTime = Math.ceil(wordCount / 200);
  const headingCount = $('h1, h2, h3, h4, h5, h6').length;
  const paragraphCount = $('p').length;
  const imageCount = $('img').length;
  const linkCount = $('a').length;

  const result: AuditResult = {
    id: generateId(),
    url,
    timestamp: new Date().toISOString(),
    overallScore,
    grade,
    categories: {
      structure,
      schema,
      content,
      faq,
      trust,
      technical,
    },
    actionPlan,
    metadata: {
      title,
      description,
      url,
      wordCount,
      readingTime,
      fetchStatus,
      fetchError,
      headingCount,
      paragraphCount,
      imageCount,
      linkCount,
    },
  };

  return result;
}

function getGrade(score: number): Grade {
  if (score >= 90) return 'A';
  if (score >= 70) return 'B';
  if (score >= 50) return 'C';
  if (score >= 30) return 'D';
  return 'F';
}

function generateActionPlan(recommendations: string[]): ActionItem[] {
  const actions: ActionItem[] = [];
  const seen = new Set<string>();

  // Helper to categorize actions
  const getCategoryName = (rec: string): string => {
    if (rec.includes('H1') || rec.includes('heading') || rec.includes('hierarchy')) return 'Structure';
    if (rec.includes('schema') || rec.includes('Schema') || rec.includes('FAQPage')) return 'Schema';
    if (rec.includes('paragraph') || rec.includes('section') || rec.includes('summary')) return 'Content';
    if (rec.includes('FAQ') || rec.includes('question')) return 'FAQ';
    if (rec.includes('author') || rec.includes('date') || rec.includes('citation')) return 'Trust';
    if (rec.includes('meta') || rec.includes('title') || rec.includes('image') || rec.includes('link')) return 'Technical';
    return 'General';
  };

  const getImpact = (rec: string): 'high' | 'medium' | 'low' => {
    if (rec.includes('schema') || rec.includes('author') || rec.includes('meta description')) return 'high';
    if (rec.includes('section') || rec.includes('alt text') || rec.includes('date')) return 'medium';
    return 'low';
  };

  const getTime = (rec: string): string => {
    if (rec.includes('schema')) return '5-10 min';
    if (rec.includes('H1') || rec.includes('title')) return '2-5 min';
    if (rec.includes('paragraph') || rec.includes('section')) return '15-30 min';
    if (rec.includes('author') || rec.includes('date')) return '5 min';
    if (rec.includes('alt text')) return '10-20 min';
    return '5-10 min';
  };

  recommendations.forEach((rec) => {
    if (!seen.has(rec) && rec.trim().length > 0) {
      seen.add(rec);
      actions.push({
        id: generateId(),
        title: rec,
        category: getCategoryName(rec),
        estimatedTime: getTime(rec),
        impact: getImpact(rec),
        difficulty: getTime(rec).includes('30') ? 'hard' : getTime(rec).includes('15') ? 'medium' : 'easy',
        completed: false,
      });
    }
  });

  // Sort by impact (high > medium > low) then by difficulty (easy > medium > hard)
  actions.sort((a, b) => {
    const impactOrder = { high: 0, medium: 1, low: 2 };
    const diffOrder = { easy: 0, medium: 1, hard: 2 };

    if (impactOrder[a.impact] !== impactOrder[b.impact]) {
      return impactOrder[a.impact] - impactOrder[b.impact];
    }

    return diffOrder[a.difficulty] - diffOrder[b.difficulty];
  });

  return actions.slice(0, 15); // Limit to 15 action items
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
