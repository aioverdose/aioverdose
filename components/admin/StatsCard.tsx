import { ReactNode } from 'react';

interface StatsCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  subtext?: string;
}

export function StatsCard({ icon, label, value, subtext }: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
          {subtext && (
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{subtext}</p>
          )}
        </div>
        <div className="text-3xl opacity-60">{icon}</div>
      </div>
    </div>
  );
}
