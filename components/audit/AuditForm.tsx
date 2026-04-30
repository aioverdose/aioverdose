'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface AuditFormProps {
  onSubmit: (data: { url?: string; html?: string }) => void;
  isLoading: boolean;
}

export function AuditForm({ onSubmit, isLoading }: AuditFormProps) {
  const [tab, setTab] = useState<'url' | 'html'>('url');
  const [url, setUrl] = useState('');
  const [html, setHtml] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');

    if (tab === 'url') {
      if (!url.trim()) {
        setError('Please enter a URL');
        return;
      }

      try {
        new URL(url);
      } catch (e) {
        setError('Please enter a valid URL (e.g., https://example.com)');
        return;
      }

      onSubmit({ url });
    } else {
      if (!html.trim()) {
        setError('Please paste HTML content');
        return;
      }

      onSubmit({ html });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-6">
        {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setTab('url')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            tab === 'url'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
          }`}
        >
          URL Audit
        </button>
        <button
          onClick={() => setTab('html')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            tab === 'html'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
          }`}
        >
          Paste HTML
        </button>
      </div>

      {/* URL Input */}
      {tab === 'url' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Website URL</label>
            <input
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError('');
              }}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">Enter any publicly accessible website URL</p>
          </div>
        </motion.div>
      )}

      {/* HTML Input */}
      {tab === 'html' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">HTML Content</label>
            <textarea
              placeholder="Paste your HTML content here..."
              value={html}
              onChange={(e) => {
                setHtml(e.target.value);
                setError('');
              }}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="w-full h-40 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 font-mono text-sm"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">Use this for local testing or if you get CORS errors</p>
          </div>
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900">
            <p className="text-sm font-medium text-red-700 dark:text-red-400">{error}</p>
          </div>
        </motion.div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {isLoading ? 'Analyzing...' : 'Analyze Page'}
      </button>

      {/* Trust Badges */}
      <div className="flex flex-wrap gap-4 pt-4 justify-center text-xs text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <span>🔓</span> No signup required
        </div>
        <div className="flex items-center gap-1">
          <span>⚡</span> Instant results
        </div>
        <div className="flex items-center gap-1">
          <span>🔒</span> Privacy first
        </div>
      </div>
      </div>
    </motion.div>
  );
}
