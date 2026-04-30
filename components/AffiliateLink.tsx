'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';

interface AffiliateLinkProps {
  href: string;
  children: React.ReactNode;
  affiliate?: boolean;
  className?: string;
  target?: string;
  rel?: string;
}

export default function AffiliateLink({
  href,
  children,
  affiliate = false,
  className = '',
  target = '_blank',
  rel = 'noopener noreferrer',
}: AffiliateLinkProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="inline-block relative">
      <a
        href={href}
        target={target}
        rel={rel}
        className={`text-blue-600 dark:text-blue-400 hover:underline ${className}`}
      >
        {children}
      </a>

      {affiliate && (
        <button
          type="button"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={() => setShowTooltip(!showTooltip)}
          className="inline-block ml-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
          aria-label="Affiliate disclosure"
        >
          <Info size={14} className="inline align-text-top" />
        </button>
      )}

      {affiliate && showTooltip && (
        <div className="absolute z-10 bottom-full left-0 mb-2 p-2 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded whitespace-nowrap">
          We may earn a commission if you purchase through this link. Doesn't affect your price.
          <div className="absolute top-full left-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900 dark:border-t-gray-800" />
        </div>
      )}
    </div>
  );
}
