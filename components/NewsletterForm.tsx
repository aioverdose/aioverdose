'use client';

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // TODO: Replace with actual newsletter provider endpoint (e.g., Substack, ConvertKit, etc.)
      // For now, just validate and show success
      if (!email) {
        setError('Please enter your email address');
        setIsLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address');
        setIsLoading(false);
        return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess(true);
      setEmail('');

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="newsletter-form" className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          AI Search Watch Newsletter
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Get weekly updates on AI search systems, optimization tips, and GEO insights. No spam, one email per week.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors whitespace-nowrap"
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>

        {/* Error message */}
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        {/* Success message */}
        {success && (
          <div className="flex gap-2 items-center p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <CheckCircle className="text-green-600 dark:text-green-400 flex-shrink-0" size={18} />
            <p className="text-sm text-green-700 dark:text-green-300">
              Success! Check your email to confirm.
            </p>
          </div>
        )}

        <p className="text-xs text-gray-500 dark:text-gray-500">
          We send one email per week (Thursdays, 9 AM ET). Unsubscribe anytime. See our{' '}
          <a
            href="/privacy-policy"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            privacy policy
          </a>
          .
        </p>
      </form>
    </div>
  );
}
