'use client';

import { useEffect, useState } from 'react';
import SubmissionRow from '@/components/admin/SubmissionRow';

interface Submission {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/admin/submissions');
      if (!response.ok) throw new Error('Failed to fetch submissions');
      const data = await response.json();
      setSubmissions(data);
    } catch (err) {
      setError('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRead = async (id: string) => {
    try {
      const submission = submissions.find((s) => s.id === id);
      if (!submission) return;

      const response = await fetch('/api/admin/submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          read: !submission.read,
        }),
      });

      if (!response.ok) throw new Error('Failed to update submission');

      const updated = await response.json();
      setSubmissions(
        submissions.map((s) => (s.id === id ? updated : s))
      );
    } catch (err) {
      console.error('Failed to toggle read:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch('/api/admin/submissions', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error('Failed to delete submission');

      setSubmissions(submissions.filter((s) => s.id !== id));
    } catch (err) {
      console.error('Failed to delete submission:', err);
    }
  };

  const filteredSubmissions =
    filter === 'unread' ? submissions.filter((s) => !s.read) : submissions;

  const unreadCount = submissions.filter((s) => !s.read).length;

  return (
    <div className="flex-1 p-8">
      <div className="max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Form Submissions
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage contact form inquiries
            </p>
          </div>
          {unreadCount > 0 && (
            <div className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium">
              {unreadCount} unread
            </div>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">Loading submissions...</p>
          </div>
        ) : submissions.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
            <p className="text-gray-600 dark:text-gray-400">No submissions yet</p>
          </div>
        ) : (
          <>
            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                  filter === 'all'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                All ({submissions.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                  filter === 'unread'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Unread ({unreadCount})
              </button>
            </div>

            {/* Submissions Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white w-24">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white flex-1">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white w-40">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredSubmissions.map((submission) => (
                    <SubmissionRow
                      key={submission.id}
                      submission={submission}
                      onToggleRead={handleToggleRead}
                      onDelete={handleDelete}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {filteredSubmissions.length === 0 && (
              <div className="text-center py-12 text-gray-600 dark:text-gray-400">
                No submissions match the selected filter
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
