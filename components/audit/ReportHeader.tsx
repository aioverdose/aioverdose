'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import { AuditMetadata } from '@/types/audit';

interface ReportHeaderProps {
  metadata: AuditMetadata;
}

export function ReportHeader({ metadata }: ReportHeaderProps) {
  const formattedDate = new Date(metadata.url === 'clipboard' ? new Date() : new Date()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const getStatusColor = (status: string) => {
    if (status === 'success') return 'text-green-600 dark:text-green-400';
    if (status === 'partial') return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getStatusLabel = (status: string) => {
    if (status === 'success') return '✓ Successfully fetched';
    if (status === 'partial') return '⚠ Partial analysis';
    return '✗ Fetch error';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        {/* Main title and URL */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 break-words">
          {metadata.title || 'Analysis Report'}
        </h1>
        {metadata.url !== 'clipboard' && (
          <p className="text-sm text-gray-600 dark:text-gray-400 break-all hover:text-gray-900 dark:hover:text-gray-300 transition-colors">
            {metadata.url}
          </p>
        )}
      </div>

      {/* Description */}
      {metadata.description && (
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
          {metadata.description}
        </p>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Reading Time</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {metadata.readingTime}m
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Word Count</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">{metadata.wordCount.toLocaleString()}</p>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Headings</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">{metadata.headingCount}</p>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Images</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">{metadata.imageCount}</p>
        </div>
      </div>

        {/* Footer info */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            Analyzed on {formattedDate}
          </div>
          <div className={`flex items-center gap-1 ${getStatusColor(metadata.fetchStatus)}`}>
            {getStatusLabel(metadata.fetchStatus)}
          </div>
          {metadata.fetchError && (
            <div className="text-red-600 dark:text-red-400" title={metadata.fetchError}>
              Error: Limited analysis
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
