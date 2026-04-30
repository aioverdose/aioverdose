'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap } from 'lucide-react';
import { ActionItem } from '@/types/audit';

interface ActionPlanProps {
  items: ActionItem[];
}

export function ActionPlan({ items }: ActionPlanProps) {
  const [expandedView, setExpandedView] = useState<'all' | 'quick' | 'high' | 'long'>('all');
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());

  const toggleComplete = (id: string) => {
    const newCompleted = new Set(completedItems);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedItems(newCompleted);
  };

  const getFilteredItems = () => {
    let filtered = items;

    if (expandedView === 'quick') {
      filtered = items.filter((item) => item.estimatedTime.includes('5') || item.estimatedTime.includes('2'));
    } else if (expandedView === 'high') {
      filtered = items.filter((item) => item.impact === 'high');
    } else if (expandedView === 'long') {
      filtered = items.filter((item) => item.impact === 'medium' || item.impact === 'low');
    }

    return filtered;
  };

  const filteredItems = getFilteredItems();
  const completionRate = items.length > 0 ? Math.round((completedItems.size / items.length) * 100) : 0;

  const getImpactColor = (impact: string) => {
    if (impact === 'high') return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
    if (impact === 'medium') return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
    return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20';
  };

  const getTimeColor = (time: string) => {
    if (time.includes('2-5')) return 'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
    if (time.includes('5-10') || time.includes('5 min')) return 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20';
    return 'text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Improvement Action Plan</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {items.length} recommended improvements prioritized by impact and effort
          </p>
        </div>

        {/* Completion Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-700 dark:text-gray-300">Progress</span>
            <span className="text-gray-600 dark:text-gray-400">
              {completedItems.size} / {items.length} completed
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${completionRate}%` }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* View Filters */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'all', label: 'All Items', icon: null },
          { key: 'quick', label: '⚡ Quick Wins (<10 min)', icon: null },
          { key: 'high', label: '🔥 High Impact', icon: null },
          { key: 'long', label: '📋 Long Term', icon: null },
        ].map((filter) => (
          <button
            key={filter.key}
            onClick={() => setExpandedView(filter.key as any)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              expandedView === filter.key
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Action Items */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="text-center py-8">
            <Zap className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-2" />
            <p className="text-gray-600 dark:text-gray-400">No items in this category</p>
          </div>
        ) : (
          filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <div className={`p-4 rounded-lg border transition-all ${
                completedItems.has(item.id)
                  ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 opacity-60'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}>
              <div className="flex gap-3">
                {/* Checkbox */}
                <button
                  onClick={() => toggleComplete(item.id)}
                  className="flex-shrink-0 mt-1 transition-colors"
                >
                  {completedItems.has(item.id) ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                  )}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${getImpactColor(item.impact)}`}>
                      {item.impact === 'high' ? '🔴 High' : item.impact === 'medium' ? '🟡 Medium' : '🔵 Low'} Impact
                    </span>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${getTimeColor(item.estimatedTime)}`}>
                      {item.estimatedTime}
                    </span>
                    <span className="text-xs font-medium px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      {item.category}
                    </span>
                  </div>
                  <p
                    className={`text-sm ${
                      completedItems.has(item.id)
                        ? 'text-gray-500 dark:text-gray-500 line-through'
                        : 'text-gray-900 dark:text-gray-100'
                    }`}
                  >
                    {item.title}
                  </p>
                </div>
              </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

        {/* Summary */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4 text-sm">
          <p className="text-blue-900 dark:text-blue-400">
            <strong>Pro tip:</strong> Start with quick wins (2-5 minute fixes) to boost your score, then tackle high-impact items for maximum improvement.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
