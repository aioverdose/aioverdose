'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Trash2 } from 'lucide-react';
import GuideEditor from '@/components/admin/GuideEditor';

interface Guide {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  datePublished: string;
  dateModified: string;
  published: boolean;
  body: string;
}

export default function EditGuidePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [guide, setGuide] = useState<Guide | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [published, setPublished] = useState(false);

  useEffect(() => {
    fetchGuide();
  }, [slug]);

  const fetchGuide = async () => {
    try {
      const response = await fetch(`/api/admin/guides/${slug}`);
      if (!response.ok) throw new Error('Guide not found');
      const data = await response.json();
      setGuide(data);
      setPublished(data.published);
    } catch (err) {
      setError('Failed to load guide');
    } finally {
      setLoading(false);
    }
  };

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
      const response = await fetch(`/api/admin/guides/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to update guide');

      const updated = await response.json();
      setGuide(updated);
      router.push('/admin/cms/guides');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update guide');
      setLoading(false);
    }
  };

  const handleTogglePublish = async () => {
    if (!guide) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/admin/guides/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: guide.title,
          excerpt: guide.excerpt,
          author: guide.author,
          body: guide.body,
          published: !published,
        }),
      });

      if (!response.ok) throw new Error('Failed to toggle publish');

      const updated = await response.json();
      setGuide(updated);
      setPublished(updated.published);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle publish');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this guide? This cannot be undone.'))
      return;

    try {
      setLoading(true);
      const response = await fetch(`/api/admin/guides/${slug}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete guide');

      router.push('/admin/cms/guides');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete guide');
      setLoading(false);
    }
  };

  if (loading && !guide) {
    return (
      <div className="flex-1 p-8">
        <div className="max-w-4xl">
          <p className="text-gray-600 dark:text-gray-400">Loading guide...</p>
        </div>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="flex-1 p-8">
        <div className="max-w-4xl">
          <p className="text-red-600 dark:text-red-400">{error || 'Guide not found'}</p>
          <Link href="/admin/cms/guides" className="text-primary hover:opacity-80 mt-4 inline-block">
            Back to guides
          </Link>
        </div>
      </div>
    );
  }

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

        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Edit Guide
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Last modified: {guide.dateModified}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleTogglePublish}
              disabled={loading}
              className={`px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                published
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
                  : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900/50'
              }`}
            >
              {published ? 'Published' : 'Draft'}
            </button>

            <button
              onClick={handleDelete}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
          <GuideEditor
            initialTitle={guide.title}
            initialExcerpt={guide.excerpt}
            initialAuthor={guide.author}
            initialSlug={guide.slug}
            initialBody={guide.body}
            onSave={handleSave}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
