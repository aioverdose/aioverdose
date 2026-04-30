import Link from 'next/link';
import { ArrowRight, Zap, BarChart3, Target } from 'lucide-react';
import { Metadata } from 'next';
import JsonLd from '@/components/shared/JsonLd';
import { BreadcrumbSchema } from '@/components/shared/BreadcrumbSchema';
import { SummaryBlock } from '@/components/shared/SummaryBlock';
import { FAQSection } from '@/components/shared/FAQSection';
import { LastUpdated } from '@/components/shared/LastUpdated';

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

const homepageFaqs = [
  {
    question: 'What is AI Search Readiness?',
    answer: 'AI Search Readiness measures how well your web content is structured for AI systems like ChatGPT, Perplexity, and Google AI Overviews to extract, understand, and cite.'
  },
  {
    question: 'How does GEO differ from SEO?',
    answer: 'GEO (Generative Engine Optimization) focuses on earning citations within AI-generated answers, while SEO optimizes for ranking positions in traditional search results.'
  },
  {
    question: 'What does the AI Search Readiness Audit check?',
    answer: 'Our audit analyzes six categories: Structure & Hierarchy, Schema Markup, Content Extractability, FAQ & Q&A Blocks, Trust & Authority Signals, and Technical Readability.'
  },
  {
    question: 'Is the audit tool free?',
    answer: 'Yes. The AI Search Readiness Audit is completely free with no signup required. Enter any URL or paste HTML for instant analysis.'
  },
  {
    question: 'How often should I audit my site?',
    answer: 'We recommend auditing your key pages monthly, or whenever you make significant content updates, as AI systems increasingly weight content freshness in citation decisions.'
  },
];

export default function HomePage() {
  // Schema objects constructed in Server Component
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'aioverdose',
    url: 'https://aioverdose.com',
    logo: 'https://aioverdose.com/logo.png',
    sameAs: [
      'https://twitter.com/aioverdose',
      'https://linkedin.com/company/aioverdose'
    ],
    description: 'AI search strategy and GEO resources for the citation era',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@aioverdose.com'
    }
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'aioverdose',
    url: 'https://aioverdose.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://aioverdose.com/guides?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homepageFaqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={faqSchema} />
      <BreadcrumbSchema items={[{ name: 'Home', url: 'https://aioverdose.com' }]} />

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

            {/* Summary Section - For AI Extraction */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-8 my-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">What is AI Search Readiness?</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                AI search readiness measures how well your web content is optimized for citation and extraction by AI systems like ChatGPT, Perplexity, Google AI Overviews, and Gemini. Unlike traditional SEO which focuses on keyword rankings and backlinks, AI search readiness evaluates whether your content is structured, marked up, and written in ways that make it easy for AI systems to discover, understand, and cite your work when answering user queries.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our free AI Search Readiness Audit analyzes your page across 6 critical categories—Structure & Hierarchy, Schema Markup, Content Extractability, FAQ & Q&A Blocks, Trust & Authority, and Technical Readability—running 50+ specialized checks. You receive a 0-100 score with detailed category breakdowns and a prioritized action plan showing exactly what to improve for better AI search visibility. No signup, no credit card, completely free.
              </p>
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              AI search systems like ChatGPT, Perplexity, and Google AI Overviews cite and extract web content using different criteria than traditional search engines. Rather than ranking pages by link authority and keyword density, AI systems prioritize content that is well-structured, properly marked up with schema, clearly authored, and easily extractable for summarization. Understanding these differences is critical for content creators, publishers, and digital marketers who want their work discovered and cited by the next generation of search.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Get your AI readiness score and actionable improvements based on recommendations from{' '}
              <a
                href="https://schema.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Schema.org
              </a>
              , <a
                href="https://search.google.com/search-console"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Google Search Console
              </a>
              , official <a
                href="https://openai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                OpenAI
              </a>{' '}documentation, <a
                href="https://www.perplexity.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Perplexity AI
              </a>{' '} guidelines, and documented AI search best practices.
            </p>

            {/* Author Byline & Trust Signals */}
            <div className="space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <div className="text-left space-y-2">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Built by <strong>aioverdose</strong>
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    <strong>Expertise:</strong> AI Search Optimization, Generative Engine Optimization (GEO), Content Strategy, Schema Markup Implementation
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    <strong>Mission:</strong> Making AI search optimization transparent and accessible to all creators, regardless of technical background
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Published: April 15, 2026 | Last Updated: April 30, 2026 | Version 1.0
                  </p>
                </div>
                <div className="flex flex-col gap-2 text-xs">
                  <span className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded font-medium">
                    ✓ GDPR Compliant
                  </span>
                  <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded font-medium">
                    ✓ No Signup Required
                  </span>
                  <span className="px-3 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded font-medium">
                    ✓ Independent & Open
                  </span>
                </div>
              </div>

              {/* Expertise & Authority */}
              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Why You Can Trust aioverdose</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li><strong>•&nbsp;Built on Standards:</strong> Our audit criteria reference official guidelines from Schema.org, Google Search Console, and documented AI search best practices from OpenAI, Google, and Perplexity documentation.</li>
                  <li><strong>•&nbsp;Independent Analysis:</strong> aioverdose is not affiliated with or endorsed by any AI company. We provide unbiased analysis focused solely on your content's optimization.</li>
                  <li><strong>•&nbsp;Transparent Methodology:</strong> Every check in our 50+ item audit is based on publicly available information about how AI systems parse, extract, and cite web content.</li>
                  <li><strong>•&nbsp;Privacy First:</strong> We don't store audit results, sell data, or track users with invasive analytics. Your content analysis stays completely private.</li>
                </ul>
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
                desc: 'Clear, semantic HTML structure with proper heading hierarchy (H1, H2, H3) enables AI systems to parse your content logically. Well-organized page structure with clear sections helps ChatGPT, Perplexity, and Google AI Overviews understand content relationships and extract relevant information for citations. Proper hierarchy prevents content fragmentation and ensures AI systems can identify main topics, subtopics, and supporting details effectively.',
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: 'Schema Markup',
                desc: 'JSON-LD structured data (Article, FAQPage, HowTo, BreadcrumbList) provides machine-readable metadata that AI systems consume directly. When properly implemented, schema markup helps AI search engines understand your content type, authorship, publication date, and key facts without needing to parse the page layout. This structured approach significantly improves citation accuracy and content relevance scoring across all major AI systems.',
              },
              {
                icon: <Target className="w-6 h-6" />,
                title: 'Content Extractability',
                desc: 'Optimized paragraph length (100-200 words per section), summary blocks, and clear key term highlighting make content easier for AI to extract and summarize. Well-formatted content with concrete examples, statistics, and actionable takeaways provides rich context for AI summarization. Content sections should be self-contained yet connected, allowing AI systems to pull relevant excerpts for diverse user queries without losing meaning or context.',
              },
              {
                icon: '❓',
                title: 'FAQ & Q&A Blocks',
                desc: 'Structured FAQ sections and Q&A format content match user intent patterns that AI systems look for. Natural question phrasing followed by concise, direct answers helps ChatGPT and Perplexity match content to user queries more effectively. AI systems often prioritize FAQ schema and Q&A blocks when generating responses, making this one of the highest-impact content patterns for AI search optimization and citation likelihood.',
              },
              {
                icon: '🛡️',
                title: 'Trust & Authority',
                desc: 'Clear author credentials, publication dates, external citations, and E-E-A-T signals (Expertise, Experience, Authority, Trustworthiness) establish content credibility for AI systems. When AI systems extract your content for citations, they evaluate author reputation and source reliability. Including verifiable credentials, linking to authoritative sources, regular content updates, and demonstrating subject matter expertise significantly increases citation likelihood and perceived value.',
              },
              {
                icon: '⚙️',
                title: 'Technical Readability',
                desc: 'Meta descriptions, Open Graph tags, canonical URLs, robots.txt directives, and proper alt text coverage enable AI crawlers to efficiently index and understand your content. Technical implementation affects how quickly AI systems discover, parse, and cache your pages. Clean HTML, proper UTF-8 encoding, mobile optimization, and accessible markup ensure AI systems can process every element of your content accurately.',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors space-y-3"
              >
                <div className="text-3xl">{typeof feature.icon === 'string' ? feature.icon : feature.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
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
                desc: 'Submit a website URL for cloud-based analysis or paste HTML content directly for instant local processing. Both methods work equally well—URL submission allows our tool to fetch and analyze live pages, while HTML paste is perfect for testing drafts, password-protected pages, or debugging specific content without deploying changes. Choose whichever method fits your workflow.',
              },
              {
                step: '2',
                title: 'AI Readiness Analysis',
                desc: 'Our engine crawls your page and executes 50+ specialized checks across 6 critical categories: Structure & Hierarchy, Schema Markup, Content Extractability, FAQ & Q&A Blocks, Trust & Authority, and Technical Readability. Each check evaluates how well your content aligns with how ChatGPT, Perplexity, Google AI Overviews, and Gemini parse, understand, and cite web content. Analysis completes in 2-5 seconds.',
              },
              {
                step: '3',
                title: 'Get Your Score',
                desc: 'Receive a comprehensive AI Readiness score (0-100) with a letter grade (A-F) and detailed category breakdowns showing exactly how you perform in each area. Visual indicators highlight which categories are strong, need attention, or require significant work. You\'ll see your position relative to AI readiness benchmarks and understand which factors are driving your overall score.',
              },
              {
                step: '4',
                title: 'Actionable Plan',
                desc: 'Get a prioritized action plan with 15+ specific, implementable recommendations organized by impact level (High, Medium, Low) and effort required (Quick Wins, Long Term). Each recommendation includes why it matters for AI systems, the estimated time to fix, and step-by-step guidance. Focus on Quick Wins first to see immediate score improvements, then tackle high-impact items for maximum AI search visibility.',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0 mt-1">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection
          items={homepageFaqs}
          title="Common Questions"
        />

        {/* Authority & Standards Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Built on Industry Standards
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Our audit methodology references official guidelines and best practices from authoritative sources in search, content, and AI. Every check is based on published documentation rather than speculation, ensuring you get reliable recommendations aligned with how AI systems actually work.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center space-y-2">
              <div className="text-3xl mb-2">📋</div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Schema.org</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Official structured data standards used by all major search engines and AI systems</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl mb-2">🔍</div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Google Documentation</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Guidelines from Google Search Console, Helpful Content Update, and AI Overviews documentation</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl mb-2">🤖</div>
              <h3 className="font-semibold text-gray-900 dark:text-white">OpenAI Guidelines</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Best practices from OpenAI documentation on content extraction and citation</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold text-gray-900 dark:text-white">AI Search Research</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Published research and documentation on how AI systems evaluate and cite web content</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200 dark:border-gray-800">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-12 text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Ready to optimize for AI search?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Get your AI Readiness score in seconds. No signup, no credit card required. Join thousands of creators optimizing content for ChatGPT, Perplexity, Google AI Overviews, and Gemini.
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
        <footer className="border-t border-gray-200 dark:border-gray-800 mt-16 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">About aioverdose</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Independent AI search optimization platform dedicated to helping creators, publishers, and marketers optimize content for AI search systems. Founded in 2026 with a focus on transparency and accessibility.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Resources</h3>
                <ul className="space-y-2 text-xs">
                  <li><Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact & Support</Link></li>
                  <li><a href="https://schema.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Schema.org Standards</a></li>
                  <li><a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Google Search Console</a></li>
                  <li><a href="https://twitter.com/aioverdose" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Follow on Twitter</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Legal</h3>
                <ul className="space-y-2 text-xs">
                  <li><Link href="/privacy-policy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</Link></li>
                  <li><Link href="/cookie-policy" className="text-blue-600 dark:text-blue-400 hover:underline">Cookie Policy</Link></li>
                  <li><Link href="/disclaimer" className="text-blue-600 dark:text-blue-400 hover:underline">Disclaimer</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-xs text-gray-600 dark:text-gray-400">
              <p className="mb-2">
                AI Search Readiness Audit • Built to help creators understand how AI systems see their content
              </p>
              <p>
                Not affiliated with OpenAI, Perplexity, Google, Anthropic, or any AI company. aioverdose provides independent analysis and recommendations.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
