'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FileChange {
  path: string;
  content: string;
  action: 'create' | 'update' | 'delete';
}

interface DiffViewerProps {
  files: FileChange[];
}

export default function DiffViewer({ files }: DiffViewerProps) {
  const [expandedFiles, setExpandedFiles] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Expand all files by default if there are few files
    if (files.length <= 3) {
      setExpandedFiles(new Set(files.map((f) => f.path)));
    }
  }, [files]);

  const toggleFile = (path: string) => {
    const newExpanded = new Set(expandedFiles);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFiles(newExpanded);
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'update':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'delete':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'create':
        return 'NEW';
      case 'update':
        return 'UPDATED';
      case 'delete':
        return 'DELETED';
      default:
        return action.toUpperCase();
    }
  };

  return (
    <div className="space-y-2">
      {files.map((file) => (
        <div
          key={file.path}
          className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleFile(file.path)}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-3 text-left flex-1 min-w-0">
              <code className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {file.path}
              </code>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded whitespace-nowrap ${getActionColor(
                  file.action
                )}`}
              >
                {getActionLabel(file.action)}
              </span>
            </div>
            {expandedFiles.has(file.path) ? (
              <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
            )}
          </button>

          {expandedFiles.has(file.path) && (
            <div className="bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
              {file.action === 'delete' ? (
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  File will be deleted
                </p>
              ) : (
                <pre className="text-xs font-mono text-gray-900 dark:text-gray-100 overflow-x-auto max-h-96 bg-gray-900 dark:bg-black p-4 rounded text-gray-100">
                  {file.content}
                </pre>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
