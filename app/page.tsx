import Link from 'next/link';
import { ArrowRight, Zap, BarChart3, Target } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Search Readiness Audit - Free Tool for ChatGPT, Perplexity, Google AI',
  description:
    'Check if your web content is optimized for AI search systems. Free AI Search Readiness Audit analyzes 6 categories with 50+ checks. No signup required.',
  keywords:
    'AI search, GEO, generative engine optimization, ChatGPT, Perplexity, Google AI Overviews, content optimization',
  openGraph: {
    title: 'AI Search Readiness Audit',
    description: 'Is your content AI-ready? Check now with our free audit tool.',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">🔍 AI Search</div>
          <Link
            href="/tools/audit"
            className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-opacity-90 transition-colors"
          >
            Start Audit
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            Is your content <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">AI-ready</span>?
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            AI search systems (ChatGPT, Perplexity, Google AI Overviews) cite web content differently than traditional search engines.
            Check your page's AI readiness and get actionable improvements.
          </p>

          {/* Author Byline & Trust Signals */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                By aioverdose <span className="text-gray-500">•</span> AI Search Specialists
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Updated April 2026 • Free tool for creators & marketers
              </p>
            </div>
            <div className="flex gap-3 text-xs">
              <span className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded">
                ✓ GDPR Compliant
              </span>
              <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded">
                ✓ No Signup
              </span>
            </div>
          </div>

          <Link
            href="/tools/audit"
            className="inline-block px-8 py-4 rounded-lg bg-primary text-white font-semibold hover:bg-opacity-90 transition-colors flex items-center gap-2 justify-center"
          >
            Start Free Audit <ArrowRight className="w-5 h-5" />
          </Link>

          <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">ChatGPT</span>
            <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">Perplexity</span>
            <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">Google AI Overviews</span>
            <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">Gemini</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          What We Check
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <BarChart3 className="w-6 h-6" />,
              title: 'Structure & Hierarchy',
              desc: 'Clear headings, proper hierarchy, and section organization for AI parsing',
            },
            {
              icon: <Zap className="w-6 h-6" />,
              title: 'Schema Markup',
              desc: 'JSON-LD schemas (Article, FAQ, HowTo) that AI systems extract directly',
            },
            {
              icon: <Target className="w-6 h-6" />,
              title: 'Content Extractability',
              desc: 'Summary blocks, paragraph length, key terms highlighting for AI summarization',
            },
            {
              icon: '❓',
              title: 'FAQ & Q&A Blocks',
              desc: 'Naturally phrased questions and concise answers for direct AI matching',
            },
            {
              icon: '🛡️',
              title: 'Trust & Authority',
              desc: 'Author credentials, publication dates, external citations, E-E-A-T signals',
            },
            {
              icon: '⚙️',
              title: 'Technical Readability',
              desc: 'Meta descriptions, Open Graph tags, canonical URLs, alt text coverage',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors space-y-3"
            >
              <div className="text-3xl">{typeof feature.icon === 'string' ? feature.icon : feature.icon}</div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          How It Works
        </h2>

        <div className="space-y-8 max-w-2xl mx-auto">
          {[
            {
              step: '1',
              title: 'Enter URL or Paste HTML',
              desc: 'Submit a website URL or paste HTML content directly for instant analysis.',
            },
            {
              step: '2',
              title: 'AI Readiness Analysis',
              desc: 'Our tool crawls and analyzes 6 key categories, running 50+ checks.',
            },
            {
              step: '3',
              title: 'Get Your Score',
              desc: 'Receive an overall AI Readiness score (0-100) with detailed breakdowns.',
            },
            {
              step: '4',
              title: 'Actionable Plan',
              desc: 'Get prioritized improvement recommendations sorted by impact and effort.',
            },
          ].map((item, idx) => (
            <div key={idx} className="flex gap-6">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0 mt-1">
                {item.step}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200 dark:border-gray-800">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-12 text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Ready to optimize for AI search?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Get your AI Readiness score in seconds. No signup, no credit card required.
          </p>
          <Link
            href="/tools/audit"
            className="inline-block px-8 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-opacity-90 transition-colors"
          >
            Start Your Free Audit
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              AI Search Readiness Audit • Built to help creators understand how AI systems see their content
            </p>
            <p className="mt-2 text-xs">
              Not affiliated with OpenAI, Perplexity, Google, or Anthropic.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
