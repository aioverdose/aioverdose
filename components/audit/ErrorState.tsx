'use client';

import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  error: string;
  suggestions?: string[];
  onRetry?: () => void;
}

export function ErrorState({ error, suggestions, onRetry }: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-md mx-auto py-12">
        <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-900 rounded-lg p-6 space-y-4">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          </div>

          {/* Error message */}
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-400">Analysis Failed</h3>
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>

          {/* Suggestions */}
          {suggestions && suggestions.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded p-3 space-y-2">
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">Suggestions</p>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                {suggestions.map((suggestion, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-red-600 dark:text-red-400">→</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Retry button */}
          {onRetry && (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={onRetry}
                className="w-full px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
            </motion.div>
          )}
        </div>

        {/* Additional help */}
        <div className="mt-6 space-y-2 text-xs text-gray-600 dark:text-gray-400">
          <p className="text-center font-medium">Need help?</p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded p-3 text-blue-900 dark:text-blue-400">
            <p>
              If you're having trouble with a URL, try using the <strong>"Paste HTML"</strong> tab instead. This is useful for
              local testing or when CORS is blocking access.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
