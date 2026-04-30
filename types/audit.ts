export type Grade = 'A' | 'B' | 'C' | 'D' | 'F';
export type FetchStatus = 'success' | 'partial' | 'error';
export type Importance = 'critical' | 'important' | 'suggestion';
export type Impact = 'high' | 'medium' | 'low';

export interface CheckResult {
  name: string;
  passed: boolean;
  value: string | number | boolean | null;
  ideal: string;
  importance: Importance;
  details?: string;
}

export interface CategoryScore {
  score: number;
  maxScore: number;
  checks: CheckResult[];
  recommendations: string[];
}

export interface ActionItem {
  id: string;
  title: string;
  category: string;
  estimatedTime: string;
  impact: Impact;
  completed: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface AuditMetadata {
  title: string;
  description: string;
  url: string;
  wordCount: number;
  readingTime: number;
  fetchStatus: FetchStatus;
  fetchError?: string;
  headingCount: number;
  paragraphCount: number;
  imageCount: number;
  linkCount: number;
}

export interface AuditResult {
  id: string;
  url: string;
  html?: string;
  timestamp: string;
  overallScore: number;
  grade: Grade;
  categories: {
    structure: CategoryScore;
    schema: CategoryScore;
    content: CategoryScore;
    faq: CategoryScore;
    trust: CategoryScore;
    technical: CategoryScore;
  };
  actionPlan: ActionItem[];
  metadata: AuditMetadata;
}

export interface ComparisonResult {
  audit1: AuditResult;
  audit2: AuditResult;
  categoryWinners: Record<string, string>;
  scoreGap: number;
  winner: string;
}
