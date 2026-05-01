'use client';

import { useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

interface GuideEditorProps {
  initialTitle?: string;
  initialExcerpt?: string;
  initialAuthor?: string;
  initialSlug?: string;
  initialBody?: string;
  onSave: (data: {
    title: string;
    excerpt: string;
    author: string;
    slug: string;
    body: string;
  }) => Promise<void>;
  loading?: boolean;
}

export default function GuideEditor({
  initialTitle = '',
  initialExcerpt = '',
  initialAuthor = '',
  initialSlug = '',
  initialBody = '',
  onSave,
  loading = false,
}: GuideEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [excerpt, setExcerpt] = useState(initialExcerpt);
  const [author, setAuthor] = useState(initialAuthor);
  const [slug, setSlug] = useState(initialSlug);
  const [body, setBody] = useState(initialBody);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!title.trim() || !slug.trim() || !body.trim()) {
      setError('Title, slug, and body are required');
      return;
    }

    try {
      setError('');
      await onSave({
        title: title.trim(),
        excerpt: excerpt.trim(),
        author: author.trim() || 'Admin',
        slug: slug.trim(),
        body,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save guide');
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Guide title"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Slug *
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
            placeholder="guide-slug"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Excerpt
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Short excerpt for the guide"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Author
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Guide author"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Content (Markdown) *
        </label>
        <SimpleMDE
          value={body}
          onChange={setBody}
          options={{
            spellChecker: false,
            autoDownloadFontAwesome: false,
            toolbar: [
              'bold',
              'italic',
              'heading',
              '|',
              'quote',
              'unordered-list',
              'ordered-list',
              '|',
              'link',
              'image',
              '|',
              'preview',
              'side-by-side',
              'fullscreen',
              '|',
              'guide',
            ],
            hideIcons: ['fullscreen', 'side-by-side'],
          }}
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save Guide'}
        </button>
      </div>
    </div>
  );
}
