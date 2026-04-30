import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { Mail, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | aioverdose',
  description: "Get in touch with the aioverdose team. Questions about our AI search audit tool? We're here to help.",
};

const faqData = [
  {
    question: 'What is the AI Search Readiness Audit?',
    answer:
      'The AI Search Readiness Audit is a free tool that analyzes your webpage across 6 critical categories to evaluate how well your content is optimized for AI search systems like ChatGPT, Perplexity, Google AI Overviews, and Gemini.',
  },
  {
    question: 'Is the audit tool really free?',
    answer:
      'Yes, the AI Search Readiness Audit is completely free with no signup required.',
  },
  {
    question: 'How long does an audit take?',
    answer:
      'Most audits complete in 2-5 seconds, depending on your page size.',
  },
  {
    question: 'Does a high audit score guarantee AI visibility?',
    answer:
      'No. A high score indicates your page is well-optimized for AI systems, but AI algorithms are controlled by third parties.',
  },
  {
    question: 'What if I get a CORS error?',
    answer:
      'CORS errors occur when a website blocks external requests. Switch to the Paste HTML tab and copy/paste your page source directly.',
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqData.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Have questions about AI search readiness? Found a bug? Want to collaborate? We'd love to hear from you.
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Contact methods */}
          <div className="md:col-span-1 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Contact Methods
              </h3>
            </div>

            {/* Email */}
            <div className="flex gap-4">
              <div className="mt-1">
                <Mail className="text-blue-600 dark:text-blue-400" size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Email</p>
                <a
                  href="mailto:hello@aioverdose.com"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  hello@aioverdose.com
                </a>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  Response within 24 hours
                </p>
              </div>
            </div>

            {/* Response time */}
            <div className="flex gap-4">
              <div className="mt-1">
                <Clock className="text-blue-600 dark:text-blue-400" size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Hours</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Monday - Friday
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  9 AM - 5 PM ET
                </p>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <div>
                <p className="font-medium text-gray-900 dark:text-white mb-3">
                  Follow Us
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://twitter.com/aioverdose"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  >
                    Twitter
                  </a>
                  <a
                    href="https://linkedin.com/company/aioverdose"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="md:col-span-2">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8">
              <ContactForm />
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-8">
            {/* FAQ Item 1 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                What is the AI Search Readiness Audit?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                The AI Search Readiness Audit is a free tool that analyzes your webpage across 6 critical categories (Structure, Schema, Content, FAQ, Trust, Technical) to evaluate how well your content is optimized for AI search systems like ChatGPT, Perplexity, Google AI Overviews, and Gemini. You receive a 0-100 score and actionable recommendations.
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Is the audit tool really free?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, the AI Search Readiness Audit is completely free. No account required, no hidden fees. We offer it as an educational tool to help creators understand AI search readiness. We may earn affiliate commissions from recommended tools, but those are clearly disclosed.
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                How long does an audit take?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Most audits complete in 2-5 seconds, depending on your page size. If you paste HTML directly, results appear instantly. If you encounter a CORS error when submitting a URL, you can copy/paste the page's HTML source for faster analysis.
              </p>
            </div>

            {/* FAQ Item 4 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Does a high audit score guarantee AI visibility?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                No. A high score indicates your page is well-optimized for AI systems, but AI algorithms are controlled by third parties (OpenAI, Google, Perplexity) and change constantly. The audit measures technical readiness, not guaranteed results. See our{' '}
                <a
                  href="/disclaimer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  disclaimer
                </a>{' '}
                for details.
              </p>
            </div>

            {/* FAQ Item 5 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                What if I get a CORS error?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                CORS errors occur when a website blocks external requests. Switch to the "Paste HTML" tab and copy/paste your page's HTML source directly. This method works for all pages, including password-protected ones. No CORS issues, instant results.
              </p>
            </div>

            {/* FAQ Item 6 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Do you store my website data?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                No. Audit results are calculated in your browser and not saved on our servers. When you submit a URL, we fetch the page to analyze it, but we don't store the content. Your data stays private. See our{' '}
                <a
                  href="/privacy-policy"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  privacy policy
                </a>{' '}
                for details.
              </p>
            </div>

            {/* FAQ Item 7 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                How can I improve my audit score?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Each audit includes an "Action Plan" with 15 prioritized recommendations organized by time to fix (Quick Wins, High Impact, Long Term). Start with the quick wins, then tackle high-impact items like adding schema markup or improving content structure. Our guides provide step-by-step instructions.
              </p>
            </div>

            {/* FAQ Item 8 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Do you sell my data or track me with ads?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                No. We don't sell user data. We use privacy-first analytics (Vercel Analytics and optional Plausible Analytics) to understand traffic patterns, but no personally identifying information is collected. You can opt out of analytics in our cookie consent banner. Review our{' '}
                <a
                  href="/privacy-policy"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  privacy policy
                </a>
                {' '}and{' '}
                <a
                  href="/cookie-policy"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  cookie policy
                </a>
                .
              </p>
            </div>

            {/* FAQ Item 9 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                What is generative engine optimization (GEO)?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                GEO is the practice of optimizing your content to appear in AI search results from ChatGPT, Perplexity, Google AI Overviews, and Gemini. Unlike traditional SEO (optimizing for Google search results), GEO focuses on making your content easily extractable and citeable by AI systems. Our guides explain best practices.
              </p>
            </div>

            {/* FAQ Item 10 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Who built aioverdose.com?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                aioverdose is an independent project dedicated to helping creators understand AI search. We're not affiliated with OpenAI, Google, Perplexity, or any AI company. Our goal is to make AI search optimization transparent and accessible. Questions? Email{' '}
                <a
                  href="mailto:hello@aioverdose.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  hello@aioverdose.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="mt-16 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Can't find an answer?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Email us at{' '}
            <a
              href="mailto:hello@aioverdose.com"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              hello@aioverdose.com
            </a>
            . We typically respond within 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
