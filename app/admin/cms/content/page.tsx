'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface ContentData {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export default function ContentPage() {
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/admin/content');
      if (!response.ok) throw new Error('Failed to fetch content');
      const data = await response.json();
      setContent(data);
    } catch (err) {
      setError('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!content) return;

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      if (!response.ok) throw new Error('Failed to save content');

      setSuccess('Content saved successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  const handleHeroChange = (field: 'title' | 'subtitle' | 'cta', value: string) => {
    if (!content) return;
    setContent({
      ...content,
      hero: {
        ...content.hero,
        [field]: value,
      },
    });
  };

  const handleFaqChange = (index: number, field: 'question' | 'answer', value: string) => {
    if (!content) return;
    const newFaqs = [...content.faqs];
    newFaqs[index] = {
      ...newFaqs[index],
      [field]: value,
    };
    setContent({
      ...content,
      faqs: newFaqs,
    });
  };

  const addFaq = () => {
    if (!content) return;
    setContent({
      ...content,
      faqs: [...content.faqs, { question: '', answer: '' }],
    });
  };

  const removeFaq = (index: number) => {
    if (!content) return;
    setContent({
      ...content,
      faqs: content.faqs.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return (
      <div className="flex-1 p-8">
        <p className="text-gray-600 dark:text-gray-400">Loading content...</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex-1 p-8">
        <p className="text-red-600 dark:text-red-400">{error || 'Failed to load content'}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Site Content</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Edit hero section, FAQs, and homepage copy
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
            {success}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 space-y-8">
          {/* Hero Section */}
          <div className="space-y-6 pb-8 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Hero Section
              </h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Hero Title
              </label>
              <input
                type="text"
                value={content.hero.title}
                onChange={(e) => handleHeroChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Hero Subtitle
              </label>
              <textarea
                value={content.hero.subtitle}
                onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                CTA Button Text
              </label>
              <input
                type="text"
                value={content.hero.cta}
                onChange={(e) => handleHeroChange('cta', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* FAQs Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              <button
                onClick={addFaq}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-white font-medium hover:bg-opacity-90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add FAQ
              </button>
            </div>

            <div className="space-y-4">
              {content.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <label className="text-sm font-medium text-gray-900 dark:text-white">
                      Question {index + 1}
                    </label>
                    <button
                      onClick={() => removeFaq(index)}
                      className="p-1 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                      title="Delete FAQ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                    placeholder="Enter question"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  />

                  <div>
                    <label className="text-sm font-medium text-gray-900 dark:text-white">
                      Answer
                    </label>
                    <textarea
                      value={faq.answer}
                      onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                      placeholder="Enter answer"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary mt-2"
                    />
                  </div>
                </div>
              ))}

              {content.faqs.length === 0 && (
                <div className="p-4 text-center text-gray-600 dark:text-gray-400 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                  No FAQs yet. Add your first one above.
                </div>
              )}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-4 pt-8 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Content'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
