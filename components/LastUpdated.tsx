import { Calendar } from 'lucide-react';

interface LastUpdatedProps {
  date: Date | string;
  author?: string;
}

export default function LastUpdated({ date, author }: LastUpdatedProps) {
  const updateDate = typeof date === 'string' ? new Date(date) : date;
  const formattedDate = updateDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
      <Calendar size={16} />
      <span>Last updated: {formattedDate}</span>
      {author && <span>by {author}</span>}
    </div>
  );
}
