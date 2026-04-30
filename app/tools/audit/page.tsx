'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  FileText,
  HelpCircle,
  BarChart3,
  Shield,
  Layout,
} from 'lucide-react';
import { AuditForm } from '@/components/audit/AuditForm';
import { LoadingScanner } from '@/components/audit/LoadingScanner';
import { ErrorState } from '@/components/audit/ErrorState';
import { ReportHeader } from '@/components/audit/ReportHeader';
import { ScoreCircle } from '@/components/audit/ScoreCircle';
import { CategoryCard } from '@/components/audit/CategoryCard';
import { ActionPlan } from '@/components/audit/ActionPlan';
import { ExportMenu } from '@/components/audit/ExportMenu';
import PDFExport from '@/components/audit/PDFExport';
import CompetitorComparison from '@/components/audit/CompetitorComparison';
import { AuditResult } from '@/types/audit';

const categoryIcons = {
  structure: <Layout className="w-5 h-5" />,
  schema: <Code2 className="w-5 h-5" />,
  content: <FileText className="w-5 h-5" />,
  faq: <HelpCircle className="w-5 h-5" />,
  trust: <Shield className="w-5 h-5" />,
  technical: <BarChart3 className="w-5 h-5" />,
};

const categoryTitles = {
  structure: 'Structure & Hierarchy',
  schema: 'Schema Markup',
  content: 'Content Extractability',
  faq: 'FAQ & Q&A Blocks',
  trust: 'Trust & Authority',
  technical: 'Technical Readability',
};

export default function AuditPage() {
  const [result, setResult] = useState<AuditResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAudit = async (data: { url?: string; html?: string }) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze page');
      }

      const auditResult = await response.json();
      setResult(auditResult);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">🔍 AI Search Audit</div>
          <a
            href="/"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
          >
            Home
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {!result && !loading && !error && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero Section */}
              <div className="text-center mb-12 space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                    AI Search Readiness Audit
                  </h1>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Is your page built to be cited by AI? Check how ChatGPT, Perplexity, and Google AI Overviews see your content.
                  </p>
                </motion.div>

                {/* AI Systems */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600 dark:text-gray-400 pt-4">
                    <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">ChatGPT</span>
                    <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">Perplexity</span>
                    <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">Google AI Overviews</span>
                    <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">Gemini</span>
                  </div>
                </motion.div>
              </div>

              {/* Form */}
              <div className="max-w-2xl mx-auto mb-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                <AuditForm onSubmit={handleAudit} isLoading={loading} />
              </div>

              {/* Features Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  {[
                    {
                      icon: '⚡',
                      title: 'Instant Analysis',
                      desc: 'Get results in seconds',
                    },
                    {
                      icon: '🔓',
                      title: 'No Signup',
                      desc: 'Start auditing immediately',
                    },
                    {
                      icon: '🎯',
                      title: 'Actionable',
                      desc: 'Prioritized improvement steps',
                    },
                  ].map((feature, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="text-3xl">{feature.icon}</div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingScanner />
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ErrorState
                error={error}
                suggestions={[
                  'Check that the URL is valid and publicly accessible',
                  'Try using the Paste HTML option for local testing',
                  'Some JavaScript-heavy sites may have limited analysis',
                ]}
                onRetry={handleRetry}
              />
            </motion.div>
          )}

          {result && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="space-y-12">
                {/* Header */}
                <ReportHeader metadata={result.metadata} />

                {/* Score Section */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex flex-col items-center justify-center py-8">
                    <ScoreCircle score={result.overallScore} grade={result.grade} />

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <div className="text-center mt-6 space-y-2">
                        <p className="text-gray-600 dark:text-gray-400">
                          {result.overallScore >= 80
                            ? 'Your page is AI-ready! AI systems will likely cite your content.'
                            : result.overallScore >= 50
                              ? 'Good foundation, but improvements needed for optimal AI readiness.'
                              : 'Significant gaps detected. Follow the action plan to improve.'}
                        </p>
                      </div>
                    </motion.div>

                    {/* PDF Export Button */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      <div className="mt-6">
                        <PDFExport auditResult={result} />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

              {/* Category Cards */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Detailed Analysis</h2>
                <div className="grid gap-4">
                  {Object.entries(result.categories).map(([key, category]) => (
                    <CategoryCard
                      key={key}
                      title={categoryTitles[key as keyof typeof categoryTitles]}
                      score={category}
                      icon={categoryIcons[key as keyof typeof categoryIcons]}
                    />
                  ))}
                </div>
              </div>

              {/* Competitor Comparison */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Competitive Analysis</h2>
                  <CompetitorComparison yourResult={result} />
                </div>
              </motion.div>

              {/* Action Plan */}
              <ActionPlan items={result.actionPlan} />

              {/* Export & Share */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Share Your Results</h2>
                <ExportMenu result={result} />
              </div>

              {/* New Audit Button */}
              <div className="flex gap-4 justify-center pt-8">
                <button
                  onClick={() => {
                    setResult(null);
                    setError(null);
                  }}
                  className="px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-opacity-90 transition-colors"
                >
                  Audit Another Page
                </button>
              </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-16 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            AI Search Readiness Audit • Optimizing content for ChatGPT, Perplexity, Google AI Overviews, and Gemini
          </p>
        </div>
      </footer>
    </div>
  );
}
