'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import GuideEditor from '@/components/admin/GuideEditor';

export default function NewGuidePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async (data: {
    title: string;
    excerpt: string;
    author: string;
    slug: string;
    body: string;
  }) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/guides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create guide');
      }

      router.push('/admin/cms/guides');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create guide');
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl">
        <Link
          href="/admin/cms/guides"
          className="flex items-center gap-2 text-primary hover:opacity-80 mb-6 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to guides
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create New Guide
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Add a new blog post or guide to your site
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
          <GuideEditor onSave={handleSave} loading={loading} />
        </div>
      </div>
    </div>
  );
}
