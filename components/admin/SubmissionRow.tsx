'use client';

import { Trash2, Mail } from 'lucide-react';

interface Submission {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

interface SubmissionRowProps {
  submission: Submission;
  onToggleRead: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function SubmissionRow({ submission, onToggleRead, onDelete }: SubmissionRowProps) {
  const handleToggleRead = async () => {
    try {
      await onToggleRead(submission.id);
    } catch (error) {
      console.error('Failed to toggle read status:', error);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    try {
      await onDelete(submission.id);
    } catch (error) {
      console.error('Failed to delete submission:', error);
    }
  };

  const date = new Date(submission.createdAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const replyMailto = `mailto:${submission.email}?subject=Re: Your inquiry&body=Hi ${submission.name},\n\nThank you for your message. I appreciate your interest.\n\nBest regards`;

  return (
    <tr className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${!submission.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
      <td className="px-6 py-4">
        <button
          onClick={handleToggleRead}
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            submission.read
              ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50'
          }`}
        >
          {submission.read ? 'Read' : 'Unread'}
        </button>
      </td>
      <td className="px-6 py-4">
        <p className="font-medium text-gray-900 dark:text-white">{submission.name}</p>
        <a
          href={`mailto:${submission.email}`}
          className="text-sm text-primary hover:opacity-80"
        >
          {submission.email}
        </a>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {submission.message}
        </p>
      </td>
      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
        {formattedDate}
      </td>
      <td className="px-6 py-4 text-right space-x-2">
        <a
          href={replyMailto}
          className="inline-block p-2 text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          title="Reply via email"
        >
          <Mail className="w-4 h-4" />
        </a>
        <button
          onClick={handleDelete}
          className="inline-block p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}
