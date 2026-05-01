import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import JsonLd from '@/components/shared/JsonLd';
import { BreadcrumbSchema } from '@/components/shared/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'AI Search Readiness Audit — Free GEO Tool | aioverdose',
  description: 'Free AI Search Readiness Audit. Analyze your site for ChatGPT, Perplexity & Google AI Overviews citation optimization. Get your GEO score in 30 seconds. No signup.',
  keywords: 'AI search, GEO, generative engine optimization, ChatGPT, Perplexity, Google AI Overviews, content optimization',
  openGraph: {
    title: 'AI Search Readiness Audit — Free GEO Tool',
    description: 'Analyze any webpage for AI citation readiness. Check schema, structure, content extractability, and trust signals.',
    url: 'https://aioverdose.com',
    type: 'website',
    siteName: 'aioverdose',
    images: [{ url: 'https://aioverdose.com/og-home.png', width: 1200, height: 630, alt: 'AI Search Readiness Audit Tool' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Search Readiness Audit — Free GEO Tool',
    description: 'Analyze any webpage for AI citation readiness.',
    images: ['https://aioverdose.com/og-home.png']
  },
  alternates: {
    canonical: 'https://aioverdose.com'
  }
};

export default function HomePage() {
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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is AI Search Readiness?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AI Search Readiness measures how effectively your web content is structured for extraction and citation by AI systems like ChatGPT, Perplexity, and Google AI Overviews. It evaluates six dimensions: structure, schema markup, content extractability, FAQ blocks, trust signals, and technical readability. A high score means AI systems can easily parse, understand, and cite your content in generated answers.'
        }
      },
      {
        '@type': 'Question',
        name: 'How is GEO different from traditional SEO?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SEO optimizes for ranking positions in traditional search results pages, focusing on keywords, backlinks, and page speed. GEO (Generative Engine Optimization) optimizes for citation within AI-generated answers, focusing on structure, schema, trust signals, and content extractability. As 58-62% of searches now end without a click, GEO has become essential for visibility in the emerging citation economy.'
        }
      },
      {
        '@type': 'Question',
        name: 'What score should I aim for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Aim for 80+ (Grade B or higher). Scores below 60 indicate significant barriers to AI citation. Scores of 90+ (Grade A) mean your content is well-structured for extraction across ChatGPT, Perplexity, and Google AI Overviews. Even small improvements — adding an FAQ section, author byline, or summary blocks — can move your score 10-15 points and dramatically increase citation probability.'
        }
      },
      {
        '@type': 'Question',
        name: 'How often should I re-audit my site?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We recommend monthly audits for active sites, and immediate re-audits after significant content updates. AI search systems increasingly weight content freshness — pages updated within 90 days receive 18-22% higher citation priority. Regular audits help you catch schema errors, broken headings, and stale content before they impact your AI search visibility.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does GEO replace traditional SEO?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No — GEO complements SEO. Traditional SEO remains critical for transactional queries and Google rankings. GEO addresses the growing share of research and discovery queries handled by AI chatbots. The most effective strategy combines both: SEO for ranking and clicks, GEO for citations in AI-generated answers. They share foundational elements like quality content and technical performance, but require different formatting and optimization approaches.'
        }
      },
      {
        '@type': 'Question',
        name: 'What platforms does the audit cover?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our audit evaluates readiness for ChatGPT (68% of AI search traffic), Google Gemini (18%), Perplexity (8%), and Google AI Overviews (appearing on 60%+ of queries). We also monitor emerging platforms like Claude, You.com, and Copilot. Our methodology is platform-agnostic, focusing on universal signals that all AI extraction systems prioritize.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is my data stored when I run an audit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Our audit tool is completely client-side for URL analysis and processes pasted HTML in memory only. We do not store your URLs, content, or scores on our servers. For PDF report downloads, we only collect your email address for our newsletter — and you can unsubscribe at any time. We are GDPR compliant and committed to privacy-first analytics.'
        }
      },
      {
        '@type': 'Question',
        name: 'How can I improve my score quickly?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The fastest wins are: add an author byline with credentials (+15 points), add a visible FAQ section with 6+ questions (+12 points), add summary paragraphs after each H2 (+10 points), and ensure Article schema with author and dates (+8 points). These four changes alone can move a failing score to passing in under 30 minutes of implementation.'
        }
      }
    ]
  };

  return (
    <>
      <JsonLd data={organizationSchema} />
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-8">
              Is your content <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">AI-ready</span>?
            </h1>

            {/* H1 Summary Paragraph */}
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-8">
              <strong>AI Search Readiness</strong> measures how effectively your web content is structured for extraction and citation by <strong>AI search systems</strong> like <strong>ChatGPT</strong>, <strong>Perplexity</strong>, and <strong>Google AI Overviews</strong>. Our free audit analyzes <em>structure, schema markup, content extractability, FAQ blocks, trust signals, and technical readability</em> — then provides a prioritized action plan to improve your visibility in AI-generated answers.
            </p>

            <Link
              href="/tools/audit"
              className="inline-block px-8 py-4 rounded-lg bg-primary text-white font-semibold hover:bg-opacity-90 transition-colors flex items-center gap-2 justify-center mb-12"
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

        {/* What We Check - Expanded Content Section */}
        <section className="py-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-white">What We Check</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              Our audit engine runs <strong>50+ checks</strong> across six critical dimensions. Each category evaluates a specific aspect of how AI systems parse, understand, and cite your content.
            </p>

            <div className="space-y-12">

              {/* Section 1: Structure & Hierarchy */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🏗️</span>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Structure & Hierarchy</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  <strong>AI systems parse heading hierarchies</strong> to understand content organization and extract the right information in context. Clear <strong>H1→H2→H3 structure</strong> with logical flow helps large language models identify main topics, subtopics, and supporting details without ambiguity.
                </p>
                <ul className="space-y-2 mb-4 text-gray-600 dark:text-gray-400">
                  <li>✓ <strong>Single H1</strong> per page with primary topic</li>
                  <li>✓ <strong>Logical H2/H3 nesting</strong> with no skipped levels</li>
                  <li>✓ <strong>Section length</strong> optimized to 150-300 words</li>
                  <li>✓ <strong>Table of contents</strong> for content over 1,000 words</li>
                  <li>✓ <strong>Semantic HTML</strong> using section, article, and nav</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  <strong>Why this matters:</strong> When ChatGPT or Perplexity extracts your content, they rely on heading structure to determine what information is primary versus supplementary. Poor structure leads to misattribution or complete omission from AI-generated answers.
                </p>
              </div>

              {/* Section 2: Schema Markup */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">📋</span>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Schema Markup</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  <strong>JSON-LD schema markup</strong> tells AI systems exactly what your content means and how to categorize it. <strong>Article, FAQPage, HowTo, and Organization schemas</strong> enable direct extraction into AI answer boxes without ambiguity about content type or authorship.
                </p>
                <ul className="space-y-2 mb-4 text-gray-600 dark:text-gray-400">
                  <li>✓ <strong>Article/BlogPosting</strong> schema with author and dates</li>
                  <li>✓ <strong>FAQPage schema</strong> for question-answer content</li>
                  <li>✓ <strong>HowTo schema</strong> for step-by-step procedures</li>
                  <li>✓ <strong>Organization/Person</strong> schema for entity recognition</li>
                  <li>✓ <strong>BreadcrumbList</strong> for navigation context</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  <strong>Why this matters:</strong> Pages with valid schema markup are <strong>3-4x more likely to be cited</strong> in Google AI Overviews and Perplexity answers. Schema transforms unstructured text into machine-readable data that AI systems can confidently quote.
                </p>
              </div>

              {/* Section 3: Content Extractability */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">✂️</span>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Content Extractability</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  <strong>AI summarization engines</strong> extract key points from well-formatted content. <strong>Concise summary blocks</strong> after headings, bullet points for scannability, and bold key terms all improve extraction accuracy and reduce the risk of misquotation.
                </p>
                <ul className="space-y-2 mb-4 text-gray-600 dark:text-gray-400">
                  <li>✓ <strong>40-60 word summary blocks</strong> after every H2</li>
                  <li>✓ <strong>Bullet and numbered lists</strong> for scannable content</li>
                  <li>✓ <strong>Bold/strong key terminology</strong> for AI parsing</li>
                  <li>✓ <strong>Concise paragraph structure</strong> (100-150 words max)</li>
                  <li>✓ <strong>Definition boxes</strong> for critical concepts</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  <strong>Why this matters:</strong> AI systems like ChatGPT process content in chunks. When your key points are visually and structurally emphasized, the model extracts them with higher confidence and includes them in generated answers rather than skipping them.
                </p>
              </div>

              {/* Section 4: FAQ & Q&A Blocks */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">❓</span>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">FAQ & Q&A Blocks</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  <strong>AI systems directly extract FAQ content</strong> for answer boxes and conversational responses. Naturally phrased questions using <strong>who, what, where, when, why, and how</strong> match the exact patterns users type into ChatGPT and Perplexity.
                </p>
                <ul className="space-y-2 mb-4 text-gray-600 dark:text-gray-400">
                  <li>✓ <strong>Natural-language question phrasing</strong> (not titles)</li>
                  <li>✓ <strong>Concise 60-80 word answers</strong> with key terms</li>
                  <li>✓ <strong>FAQPage schema markup</strong> wrapping all Q&A</li>
                  <li>✓ <strong>Expandable accordion format</strong> for user experience</li>
                  <li>✓ <strong>Related question suggestions</strong> for semantic coverage</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  <strong>Why this matters:</strong> When a user asks Perplexity "What is GEO?" or "How do I optimize for AI search?", the system searches for FAQ blocks with matching question patterns. Well-structured FAQs are the <strong>highest-citation content type</strong> in AI search.
                </p>
              </div>

              {/* Section 5: Trust & Authority */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🛡️</span>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Trust & Authority</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  <strong>E-E-A-T signals</strong> (Experience, Expertise, Authoritativeness, Trust) determine whether AI systems cite your content or ignore it. <strong>Author credentials, publication dates, external citations, and editorial transparency</strong> all build citation-worthy authority.
                </p>
                <ul className="space-y-2 mb-4 text-gray-600 dark:text-gray-400">
                  <li>✓ <strong>Named author</strong> with real credentials and expertise</li>
                  <li>✓ <strong>Publication and update dates</strong> for freshness signals</li>
                  <li>✓ <strong>External authoritative citations</strong> (Schema.org, Google)</li>
                  <li>✓ <strong>Editorial policy transparency</strong> and methodology</li>
                  <li>✓ <strong>Secure connection</strong> (HTTPS) and privacy compliance</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  <strong>Why this matters:</strong> AI systems are trained to prioritize trustworthy sources. Content without clear authorship or citations is treated as <strong>unverified and deprioritized</strong>. E-E-A-T is not just an SEO concept — it is the core filter for AI citation.
                </p>
              </div>

              {/* Section 6: Technical Readability */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">⚙️</span>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Technical Readability</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  <strong>Technical foundations</strong> ensure AI crawlers can access and parse your content without barriers. <strong>Meta descriptions, Open Graph tags, canonical URLs, and image alt text</strong> all contribute to AI-friendly presentation and social sharing optimization.
                </p>
                <ul className="space-y-2 mb-4 text-gray-600 dark:text-gray-400">
                  <li>✓ <strong>Meta description</strong> (120-160 characters, unique)</li>
                  <li>✓ <strong>Open Graph tags</strong> for social and AI preview cards</li>
                  <li>✓ <strong>Canonical URLs</strong> to prevent duplicate content issues</li>
                  <li>✓ <strong>Image alt text</strong> on all images for accessibility</li>
                  <li>✓ <strong>Mobile viewport</strong> and responsive design</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  <strong>Why this matters:</strong> If AI crawlers cannot access or understand your page due to technical barriers, none of your content optimization matters. Technical readiness is the <strong>foundation layer</strong> that all other GEO efforts depend on.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-white">How It Works</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              Our audit process takes less than 30 seconds and requires no technical expertise. Simply submit your URL or paste HTML, and our engine handles the analysis.
            </p>
            <div className="grid md:grid-cols-4 gap-8">

              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Enter URL or Paste HTML</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Submit any public website URL or paste raw HTML directly into our analyzer. We handle JavaScript-rendered pages, single-page applications, and various content management systems without requiring backend access.
                </p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">AI Readiness Analysis</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our engine runs <strong>50+ checks</strong> across six categories, evaluating heading structure, schema markup validity, content formatting, FAQ detection, trust signals, and technical SEO foundations against established standards.
                </p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Get Your Score</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Receive an overall <strong>AI Readiness score from 0-100</strong> with letter grade (A-F). See detailed breakdowns per category with pass, warning, or fail status for each of the 50+ individual checks.
                </p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Actionable Plan</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Get <strong>prioritized recommendations</strong> sorted by impact and implementation effort. Each action item includes specific guidance on what to change, why it matters for AI citation, and estimated time to complete.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* What is GEO Definition Section */}
        <section className="py-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">What is Generative Engine Optimization?</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              <strong>Generative Engine Optimization (GEO)</strong> is the practice of optimizing web content to be discovered, extracted, and cited by AI search and generation systems. Unlike traditional SEO, which optimizes for <strong>ranking positions</strong> in search results pages, GEO optimizes for <strong>citation within AI-generated answers</strong> — where your content is summarized, attributed, and presented directly to users without requiring a click.
            </p>
            <div className="bg-gray-50 dark:bg-gray-700/50 border-l-4 border-primary p-6 my-8 rounded-r-lg">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Key Differences: GEO vs SEO</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>SEO:</strong> Optimize for position #1 in Google results</li>
                <li><strong>GEO:</strong> Optimize for citation in ChatGPT, Perplexity, Gemini answers</li>
                <li><strong>SEO metric:</strong> Click-through rate from search results</li>
                <li><strong>GEO metric:</strong> Citation frequency in AI-generated responses</li>
                <li><strong>SEO focus:</strong> Keywords, backlinks, page speed</li>
                <li><strong>GEO focus:</strong> Structure, schema, trust signals, extractability</li>
              </ul>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              As <strong>58-62% of Google searches now end without a click</strong> and AI chatbots handle an estimated 10-15% of research queries, GEO has become essential for any organization that depends on digital visibility. The brands that master GEO today will establish compounding citation advantages as AI search systems reinforce their authority over time.
            </p>
          </div>
        </section>

        {/* Methodology & Sources */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Methodology & Sources</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Our audit methodology is based on established standards and ongoing research from leading organizations in search and artificial intelligence:
            </p>
            <ul className="space-y-3 mb-6">
              <li>
                <a href="https://schema.org" className="text-primary hover:underline font-medium" target="_blank" rel="noopener noreferrer">
                  Schema.org
                </a>
                <span className="text-gray-700 dark:text-gray-300"> — The official structured data vocabulary used by Google, Microsoft, Pinterest, and other major platforms for AI and search engine understanding.</span>
              </li>
              <li>
                <a href="https://developers.google.com/search/docs/appearance/structured-data" className="text-primary hover:underline font-medium" target="_blank" rel="noopener noreferrer">
                  Google Search Central
                </a>
                <span className="text-gray-700 dark:text-gray-300"> — Official guidelines for structured data implementation, rich results eligibility, and AI Overviews optimization.</span>
              </li>
              <li>
                <a href="https://www.perplexity.ai/hub" className="text-primary hover:underline font-medium" target="_blank" rel="noopener noreferrer">
                  Perplexity AI
                </a>
                <span className="text-gray-700 dark:text-gray-300"> — Leading AI search platform whose citation patterns inform our trust signal and content extractability checks.</span>
              </li>
              <li>
                <a href="https://platform.openai.com/docs" className="text-primary hover:underline font-medium" target="_blank" rel="noopener noreferrer">
                  OpenAI Documentation
                </a>
                <span className="text-gray-700 dark:text-gray-300"> — Technical documentation on GPT model behavior, content processing, and extraction methodologies.</span>
              </li>
            </ul>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              We update our audit criteria monthly to reflect changes in AI search algorithm behavior and emerging best practices from the GEO community.
            </p>
          </div>
        </section>

        {/* Editorial Policy */}
        <div className="max-w-3xl mx-auto px-4 py-4 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
          <p>
            <a href="/about" className="text-primary hover:underline">Editorial Policy</a> ·
            <a href="/about" className="text-primary hover:underline"> Methodology</a> ·
            <a href="/privacy-policy" className="text-primary hover:underline"> Privacy</a> ·
            <span> Independent. No AI company funding.</span>
          </p>
        </div>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
              Common questions about AI Search Readiness, GEO, and how our audit works.
            </p>
            <div className="space-y-4">

              <details className="bg-white dark:bg-gray-800 rounded-lg p-6 group border border-gray-200 dark:border-gray-700">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-gray-900 dark:text-white">
                  What is AI Search Readiness?
                  <span className="text-gray-600 dark:text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong>AI Search Readiness</strong> measures how effectively your web content is structured for extraction and citation by AI systems like <strong>ChatGPT</strong>, <strong>Perplexity</strong>, and <strong>Google AI Overviews</strong>. It evaluates six dimensions: structure, schema markup, content extractability, FAQ blocks, trust signals, and technical readability. A high score means AI systems can easily parse, understand, and cite your content in generated answers.
                </p>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-lg p-6 group border border-gray-200 dark:border-gray-700">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-gray-900 dark:text-white">
                  How is GEO different from traditional SEO?
                  <span className="text-gray-600 dark:text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong>SEO optimizes for ranking positions</strong> in traditional search results pages, focusing on keywords, backlinks, and page speed. <strong>GEO (Generative Engine Optimization) optimizes for citation within AI-generated answers</strong>, focusing on structure, schema, trust signals, and content extractability. As <strong>58-62% of searches now end without a click</strong>, GEO has become essential for visibility in the emerging citation economy.
                </p>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-lg p-6 group border border-gray-200 dark:border-gray-700">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-gray-900 dark:text-white">
                  What score should I aim for?
                  <span className="text-gray-600 dark:text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong>Aim for 80+ (Grade B or higher)</strong>. Scores below 60 indicate significant barriers to AI citation. Scores of 90+ (Grade A) mean your content is well-structured for extraction across ChatGPT, Perplexity, and Google AI Overviews. Even small improvements — adding an FAQ section, author byline, or summary blocks — can move your score 10-15 points and dramatically increase citation probability.
                </p>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-lg p-6 group border border-gray-200 dark:border-gray-700">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-gray-900 dark:text-white">
                  How often should I re-audit my site?
                  <span className="text-gray-600 dark:text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                  We recommend <strong>monthly audits</strong> for active sites, and immediate re-audits after significant content updates. AI search systems increasingly weight content freshness — pages updated within <strong>90 days receive 18-22% higher citation priority</strong>. Regular audits help you catch schema errors, broken headings, and stale content before they impact your AI search visibility.
                </p>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-lg p-6 group border border-gray-200 dark:border-gray-700">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-gray-900 dark:text-white">
                  Does GEO replace traditional SEO?
                  <span className="text-gray-600 dark:text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong>No — GEO complements SEO.</strong> Traditional SEO remains critical for transactional queries and Google rankings. GEO addresses the growing share of <strong>research and discovery queries</strong> handled by AI chatbots. The most effective strategy combines both: SEO for ranking and clicks, GEO for citations in AI-generated answers. They share foundational elements like quality content and technical performance, but require different formatting and optimization approaches.
                </p>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-lg p-6 group border border-gray-200 dark:border-gray-700">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-gray-900 dark:text-white">
                  What platforms does the audit cover?
                  <span className="text-gray-600 dark:text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our audit evaluates readiness for <strong>ChatGPT</strong> (68% of AI search traffic), <strong>Google Gemini</strong> (18%), <strong>Perplexity</strong> (8%), and <strong>Google AI Overviews</strong> (appearing on 60%+ of queries). We also monitor emerging platforms like <strong>Claude</strong>, <strong>You.com</strong>, and <strong>Copilot</strong>. Our methodology is platform-agnostic, focusing on universal signals that all AI extraction systems prioritize.
                </p>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-lg p-6 group border border-gray-200 dark:border-gray-700">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-gray-900 dark:text-white">
                  Is my data stored when I run an audit?
                  <span className="text-gray-600 dark:text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong>No.</strong> Our audit tool is completely client-side for URL analysis and processes pasted HTML in memory only. We do not store your URLs, content, or scores on our servers. For PDF report downloads, we only collect your email address for our newsletter — and you can unsubscribe at any time. We are <strong>GDPR compliant</strong> and committed to privacy-first analytics.
                </p>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-lg p-6 group border border-gray-200 dark:border-gray-700">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-gray-900 dark:text-white">
                  How can I improve my score quickly?
                  <span className="text-gray-600 dark:text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                  The <strong>fastest wins</strong> are: add an <strong>author byline</strong> with credentials (+15 points), add a <strong>visible FAQ section</strong> with 6+ questions (+12 points), add <strong>summary paragraphs</strong> after each H2 (+10 points), and ensure <strong>Article schema</strong> with author and dates (+8 points). These four changes alone can move a failing score to passing in under 30 minutes of implementation.
                </p>
              </details>

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
    </>
  );
}
