'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { CategoryScore } from '@/types/audit';

interface CategoryCardProps {
  title: string;
  score: CategoryScore;
  icon: React.ReactNode;
}

export function CategoryCard({ title, score, icon }: CategoryCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getScoreColor = (s: number) => {
    if (s >= 80) return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', scoreColor: '#10b981' };
    if (s >= 50) return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', scoreColor: '#eab308' };
    return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', scoreColor: '#ef4444' };
  };

  const colors = getScoreColor(score.score);

  const getCheckIcon = (passed: boolean, importance: string) => {
    if (passed) {
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    }
    if (importance === 'critical') {
      return <AlertCircle className="w-4 h-4 text-red-600" />;
    }
    return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`border rounded-lg overflow-hidden ${colors.border} ${colors.bg}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-6 py-4 flex items-center justify-between hover:bg-opacity-75 transition-colors`}
        >
          <div className="flex items-center gap-4">
            <div className={`${colors.text}`}>{icon}</div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
              <p className={`text-sm ${colors.text}`}>
                {score.checks.filter((c) => c.passed).length} / {score.checks.length} checks passed
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className={`text-lg font-bold ${colors.text}`}>{score.score}</div>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className={`w-5 h-5 ${colors.text}`} />
            </motion.div>
          </div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="border-t border-current px-6 py-4 space-y-4">
                {/* Checks */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Checks</h4>
                  <div className="space-y-2">
                    {score.checks.map((check, idx) => (
                      <div key={idx} className="flex gap-3 text-sm">
                        {getCheckIcon(check.passed, check.importance)}
                        <div className="flex-1">
                          <div className="font-medium text-gray-700 dark:text-gray-300">{check.name}</div>
                          <div className="text-gray-600 dark:text-gray-400">
                            {check.passed ? (
                              <>
                                ✓ {check.value}
                                {check.details && <span className="block text-xs mt-1">{check.details}</span>}
                              </>
                            ) : (
                              <>
                                Current: {check.value} | Ideal: {check.ideal}
                                {check.details && <span className="block text-xs mt-1">{check.details}</span>}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                {score.recommendations.length > 0 && (
                  <div className="border-t border-current pt-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Recommendations</h4>
                    <ul className="space-y-2 text-sm">
                      {score.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex gap-2 text-gray-700 dark:text-gray-300">
                          <span className="text-lg leading-none">→</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
