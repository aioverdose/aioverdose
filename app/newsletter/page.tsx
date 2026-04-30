import { Metadata } from 'next';
import NewsletterForm from '@/components/NewsletterForm';
import { Mail, Zap, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Search Watch Newsletter | aioverdose',
  description:
    'Weekly newsletter with AI search updates, generative engine optimization tips, and insights on ChatGPT, Perplexity, Google AI Overviews, and Gemini.',
};

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            AI Search Watch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Weekly updates on AI search systems, generative engine optimization tips, and trends shaping the future of discovery.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <Zap className="text-blue-600 dark:text-blue-400 mb-3" size={24} />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Weekly Updates
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              New algorithms, AI system changes, and emerging optimization opportunities delivered every Thursday.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <TrendingUp className="text-green-600 dark:text-green-400 mb-3" size={24} />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Actionable Insights
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Practical tips and best practices you can implement immediately to improve your AI search readiness.
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
            <Mail className="text-purple-600 dark:text-purple-400 mb-3" size={24} />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Community Insights
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Learn what's working for creators, marketing teams, and SEO professionals optimizing for AI.
            </p>
          </div>
        </div>

        {/* Newsletter signup form */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 mb-16">
          <NewsletterForm />
        </div>

        {/* What to expect */}
        <div className="space-y-8 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              What to Expect
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Every Thursday, you'll receive an email with:
            </p>
          </div>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Top Stories (3-5 min read)
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Major announcements from OpenAI, Google, Perplexity, and other AI systems that impact your content strategy.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Optimization Tip of the Week
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                One specific, actionable recommendation you can implement to improve your AI search readiness. From schema markup to content structure, with exact how-to steps.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Case Study or Interview
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Real examples from creators and marketing teams seeing results from GEO. What strategies worked, what didn't, and why.
              </p>
            </div>

            <div className="border-l-4 border-amber-500 pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Resource Highlight
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                A tool, guide, or resource we recommend for improving your AI search game. (Some links are affiliate partnerships, always disclosed.)
              </p>
            </div>
          </div>
        </div>

        {/* Sample issue */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Sample Newsletter
          </h2>

          <div className="space-y-6 text-gray-600 dark:text-gray-400">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white mb-2">
                Subject: AI Search Watch #42 - Google Rolls Back AI Overviews
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                🔥 Top Stories
              </h4>
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  Google confirms AI Overviews will exclude travel, sports, shopping queries (impacts 40% of high-intent searches)
                </li>
                <li>
                  ChatGPT releases new citation format; now shows author bio + publication date (huge for E-E-A-T signals)
                </li>
                <li>
                  Perplexity reaches 200M monthly active users; adds personalization layer (what this means for your content strategy)
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                ⚡ Optimization Tip: Add FAQ Schema
              </h4>
              <p>
                Perplexity pulls Q&A pairs directly from FAQPage schema markup. If you have 3+ Q&A sections on your page, add this schema in 5 minutes:
              </p>
              <p className="mt-2 text-sm bg-gray-900 dark:bg-gray-950 text-gray-100 p-3 rounded font-mono">
                &lt;script type="application/ld+json"&gt;
                {'{'}
                "@context": "schema.org",
                "@type": "FAQPage",
                "mainEntity": [...]
                {'}'}
                &lt;/script&gt;
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                📚 Case Study: How TechBlog Went From 0 to 50 ChatGPT Citations/Month
              </h4>
              <p>
                Learn how a mid-size tech blog increased AI search citations by 500% in 90 days by focusing on three core changes: better structure, schema markup, and trust signals. (Interview with founder.)
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                🛠️ Resource: Structured Data Testing Tool
              </h4>
              <p>
                Free validator from Google. Takes 30 seconds to check if your schema is correct. [Test your schema]
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                ✉️ Unsubscribe anytime | Share with a friend | View online
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Newsletter FAQs
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                How often will I get emails?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Every Thursday at 9 AM ET. Just one email per week. No spam, no promotions (except tool recommendations we genuinely use).
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Can I unsubscribe anytime?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes. Every email has an unsubscribe link. One click and you're off the list. No questions asked.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Will you sell my email address?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Absolutely not. We never sell, share, or trade email addresses. Your data is yours. See our{' '}
                <a
                  href="/privacy-policy"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  privacy policy
                </a>
                .
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                What if I already signed up from the footer?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                You're already in the system! Confirm your email when you get the welcome message, and you'll start receiving newsletters next Thursday.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Do you have past issues archived?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Not yet, but we're working on it. For now, join the newsletter to stay current with the latest AI search updates.
              </p>
            </div>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="mt-16 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Ready to stay updated on AI search?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Join 1000+ creators, marketers, and SEO professionals keeping up with AI search trends.
          </p>
          <a
            href="#newsletter-form"
            className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Subscribe Now
          </a>
        </div>
      </div>
    </div>
  );
}
