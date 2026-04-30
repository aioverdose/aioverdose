'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Copy, Mail, Twitter, Linkedin } from 'lucide-react';
import { AuditResult } from '@/types/audit';

interface ExportMenuProps {
  result: AuditResult;
}

export function ExportMenu({ result }: ExportMenuProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyResults = () => {
    const text = `
AI Search Readiness Audit Results
${result.metadata.url}

Overall Score: ${result.overallScore}/100 (Grade: ${result.grade})

Category Breakdown:
- Structure & Hierarchy: ${result.categories.structure.score}
- Schema Markup: ${result.categories.schema.score}
- Content Extractability: ${result.categories.content.score}
- FAQ & Q&A Blocks: ${result.categories.faq.score}
- Trust & Authority: ${result.categories.trust.score}
- Technical Readability: ${result.categories.technical.score}

${result.actionPlan.slice(0, 5).map((item) => `• ${item.title}`).join('\n')}

Analyzed: ${new Date(result.timestamp).toLocaleDateString()}
`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () => {
    const text = `I just audited my website for AI search readiness. My score: ${result.overallScore}/100 (Grade ${result.grade}). Check your site too!`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        result.metadata.url || 'https://ai-search-audit.com'
      )}`,
      '_blank'
    );
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {/* Main menu button */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-opacity-90 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export & Share
            </button>

            {/* Dropdown menu */}
            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute top-full mt-2 left-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 min-w-48">
                    <button
                      onClick={handleCopyResults}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 text-sm"
                    >
                      <Copy className="w-4 h-4" />
                      {copied ? 'Copied!' : 'Copy Summary'}
                    </button>

                    <button
                      onClick={shareOnTwitter}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 text-sm border-t border-gray-200 dark:border-gray-700"
                    >
                      <Twitter className="w-4 h-4" />
                      Share on Twitter
                    </button>

                    <button
                      onClick={shareOnLinkedIn}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 text-sm border-t border-gray-200 dark:border-gray-700"
                    >
                      <Linkedin className="w-4 h-4" />
                      Share on LinkedIn
                    </button>

                    <div className="border-t border-gray-200 dark:border-gray-700">
                      <p className="px-4 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Other formats</p>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <Mail className="w-4 h-4" />
                        PDF Report (Coming soon)
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick action buttons */}
          <button
            onClick={handleCopyResults}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>
        </div>

        {/* Share buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={shareOnTwitter}
            className="px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm font-medium flex items-center gap-1"
          >
            <Twitter className="w-4 h-4" />
            Twitter
          </button>

          <button
            onClick={shareOnLinkedIn}
            className="px-3 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors text-sm font-medium flex items-center gap-1"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </button>
        </div>

        {/* Info box */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg p-3 text-xs text-blue-900 dark:text-blue-400">
          <p>
            <strong>Share your results:</strong> Help others understand AI search readiness. Tag us for a chance to be featured!
          </p>
        </div>
      </div>
    </motion.div>
  );
}
