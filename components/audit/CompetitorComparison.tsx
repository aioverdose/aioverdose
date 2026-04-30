'use client';

import { useState } from 'react';
import { AuditResult } from '@/types/audit';
import { toast } from 'sonner';
import { Trophy, Loader2, Copy } from 'lucide-react';

interface CompetitorComparisonProps {
  yourResult: AuditResult;
}

export default function CompetitorComparison({
  yourResult,
}: CompetitorComparisonProps) {
  const [competitorUrl, setCompetitorUrl] = useState('');
  const [competitorResult, setCompetitorResult] = useState<AuditResult | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const runCompetitorAudit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!competitorUrl.trim()) {
      toast.error('Please enter a competitor URL');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: competitorUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to audit competitor');
      }

      const data = await response.json();
      setCompetitorResult(data);
      setShowComparison(true);
      toast.success('Competitor analysis complete!');
    } catch (error) {
      toast.error('Failed to analyze competitor URL');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const determineWinner = (yourScore: number, competitorScore: number) => {
    if (yourScore > competitorScore) return 'you';
    if (competitorScore > yourScore) return 'competitor';
    return 'tie';
  };

  const shareComparison = () => {
    const url = `${window.location.origin}/tools/audit/compare?url=${encodeURIComponent(yourResult.url || '')}&competitor=${encodeURIComponent(competitorResult?.url || '')}`;
    navigator.clipboard.writeText(url);
    toast.success('Comparison link copied!');
  };

  if (!showComparison || !competitorResult) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Compare with Competitor
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          See how your AI search readiness stacks up against a competitor.
        </p>

        <form onSubmit={runCompetitorAudit} className="space-y-4">
          <input
            type="url"
            value={competitorUrl}
            onChange={(e) => setCompetitorUrl(e.target.value)}
            placeholder="https://competitor.com"
            className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 size={18} className="animate-spin" />}
            {isLoading ? 'Analyzing...' : 'Analyze Competitor'}
          </button>
        </form>
      </div>
    );
  }

  const yourWins = Object.entries(yourResult.categories).filter(
    ([key, data]) => {
      const competitorScore =
        competitorResult.categories[key as keyof typeof competitorResult.categories]
          ?.score || 0;
      return determineWinner(data.score, competitorScore) === 'you';
    }
  ).length;

  const competitorWins = Object.entries(yourResult.categories).filter(
    ([key, data]) => {
      const competitorScore =
        competitorResult.categories[key as keyof typeof competitorResult.categories]
          ?.score || 0;
      return determineWinner(data.score, competitorScore) === 'competitor';
    }
  ).length;

  const overallWinner =
    yourResult.overallScore > competitorResult.overallScore
      ? 'you'
      : competitorResult.overallScore > yourResult.overallScore
        ? 'competitor'
        : 'tie';

  return (
    <div className="space-y-6">
      {/* Overall Winner Banner */}
      {overallWinner !== 'tie' && (
        <div
          className={`rounded-lg p-6 text-center ${
            overallWinner === 'you'
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
              : 'bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800'
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy
              size={24}
              className={
                overallWinner === 'you'
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-orange-600 dark:text-orange-400'
              }
            />
            <h3
              className={`text-xl font-bold ${
                overallWinner === 'you'
                  ? 'text-green-900 dark:text-green-100'
                  : 'text-orange-900 dark:text-orange-100'
              }`}
            >
              {overallWinner === 'you'
                ? '🎉 You Win Overall!'
                : '⚠️ Competitor Ahead'}
            </h3>
          </div>
          <p
            className={
              overallWinner === 'you'
                ? 'text-green-700 dark:text-green-300'
                : 'text-orange-700 dark:text-orange-300'
            }
          >
            Your Score: {yourResult.overallScore} | Competitor:{' '}
            {competitorResult.overallScore}
          </p>
        </div>
      )}

      {/* Category Comparison */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Category Breakdown
        </h3>

        <div className="space-y-3">
          {Object.entries(yourResult.categories).map(([key, data]) => {
            const competitorScore =
              competitorResult.categories[
                key as keyof typeof competitorResult.categories
              ]?.score || 0;
            const winner = determineWinner(data.score, competitorScore);

            return (
              <div
                key={key}
                className="bg-white dark:bg-gray-800 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900 dark:text-white capitalize">
                    {key.replace(/_/g, ' ')}
                  </h4>
                  {winner === 'you' && (
                    <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded">
                      ✓ You Win
                    </span>
                  )}
                  {winner === 'competitor' && (
                    <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-2 py-1 rounded">
                      Competitor Leads
                    </span>
                  )}
                  {winner === 'tie' && (
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400 px-2 py-1 rounded">
                      Tied
                    </span>
                  )}
                </div>

                {/* Score bars */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">You</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {data.score}/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${data.score}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm mt-3">
                    <span className="text-gray-600 dark:text-gray-400">
                      Competitor
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {competitorScore}/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: `${competitorScore}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Score Summary */}
      <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {yourWins}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Categories Won
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {competitorWins}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Competitor Wins
          </div>
        </div>
      </div>

      {/* Share and Reset */}
      <div className="flex gap-3">
        <button
          onClick={shareComparison}
          className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Copy size={18} />
          Share Comparison
        </button>
        <button
          onClick={() => {
            setShowComparison(false);
            setCompetitorUrl('');
            setCompetitorResult(null);
          }}
          className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg transition-colors"
        >
          Compare Another
        </button>
      </div>
    </div>
  );
}
