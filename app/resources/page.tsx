'use client';

import AffiliateLink from '@/components/AffiliateLink';
import { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';

// Note: Metadata not available in client components, but keeping structure for future migration
export default function ResourcesPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('analytics');

  const categories = [
    {
      id: 'analytics',
      name: 'Analytics & Monitoring',
      description: 'Track performance and understand your audience',
      tools: [
        {
          name: 'Ahrefs',
          description: 'Comprehensive SEO and backlink analysis tool. Essential for understanding domain authority and content performance across search systems.',
          url: 'https://ahrefs.com',
          affiliate: true,
          price: '$99-$999/month',
        },
        {
          name: 'Semrush',
          description: 'All-in-one marketing toolkit with SEO, PPC, and content analysis. Great for keyword research and competitive analysis.',
          url: 'https://semrush.com',
          affiliate: true,
          price: '$120-$450/month',
        },
        {
          name: 'Google Search Console',
          description: 'Free tool from Google showing how your site appears in search, performance data, and indexing status.',
          url: 'https://search.google.com/search-console/',
          affiliate: false,
          price: 'Free',
        },
        {
          name: 'Plausible Analytics',
          description: 'Privacy-first analytics that respects user privacy while giving you the insights you need.',
          url: 'https://plausible.io',
          affiliate: true,
          price: '$9-$20/month',
        },
      ],
    },
    {
      id: 'content',
      name: 'Content & Schema Tools',
      description: 'Optimize your content structure and add schema markup',
      tools: [
        {
          name: 'Surfer SEO',
          description: 'AI-powered content optimization tool that analyzes top-ranking pages and provides specific recommendations for structure, length, and keywords.',
          url: 'https://surferseo.com',
          affiliate: true,
          price: '$89-$399/month',
        },
        {
          name: 'Yoast SEO',
          description: 'WordPress plugin for on-page SEO optimization, readability analysis, and schema markup generation.',
          url: 'https://yoast.com/wordpress/plugins/seo/',
          affiliate: false,
          price: 'Free - $99/year',
        },
        {
          name: 'Schema.org Testing Tool',
          description: 'Google\'s free structured data validator. Essential for verifying your schema markup is correct.',
          url: 'https://search.google.com/structured-data/testing-tool',
          affiliate: false,
          price: 'Free',
        },
        {
          name: 'JSON-LD.org',
          description: 'Reference documentation and examples for JSON-LD schema markup formats.',
          url: 'https://json-ld.org',
          affiliate: false,
          price: 'Free',
        },
      ],
    },
    {
      id: 'writing',
      name: 'Writing & Research',
      description: 'Create better content and research topics',
      tools: [
        {
          name: 'Grammarly',
          description: 'AI writing assistant that checks grammar, clarity, tone, and plagiarism. Helps you write content that\'s clear and professional.',
          url: 'https://grammarly.com',
          affiliate: true,
          price: '$12/month',
        },
        {
          name: 'Perplexity AI',
          description: 'AI search engine that shows sources for everything. Great for research and fact-checking before you write.',
          url: 'https://perplexity.ai',
          affiliate: false,
          price: 'Free - $20/month',
        },
        {
          name: 'ChatGPT',
          description: 'Powerful AI assistant for brainstorming, outlining, editing, and research. Plus access to the latest models.',
          url: 'https://openai.com/chatgpt',
          affiliate: false,
          price: 'Free - $20/month',
        },
        {
          name: 'Notion AI',
          description: 'AI-powered workspace for organizing research, taking notes, and drafting content all in one place.',
          url: 'https://notion.so',
          affiliate: false,
          price: '$8-$20/month',
        },
      ],
    },
    {
      id: 'technical',
      name: 'Technical SEO & Performance',
      description: 'Audit and improve technical aspects of your site',
      tools: [
        {
          name: 'PageSpeed Insights',
          description: 'Free Google tool measuring page speed and mobile friendliness. Core Web Vitals matter for all search systems.',
          url: 'https://pagespeed.web.dev',
          affiliate: false,
          price: 'Free',
        },
        {
          name: 'Lighthouse',
          description: 'Built into Chrome DevTools. Audits performance, accessibility, SEO, and best practices.',
          url: 'https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpombljlkpstvnztVTNyZJ',
          affiliate: false,
          price: 'Free',
        },
        {
          name: 'Screaming Frog',
          description: 'Website crawler that audits technical SEO issues, broken links, duplicate content, and crawlability problems.',
          url: 'https://screamingfrog.co.uk',
          affiliate: true,
          price: 'Free - $199/year',
        },
        {
          name: 'Cloudflare',
          description: 'Content delivery network (CDN) that improves page speed, security, and reliability globally.',
          url: 'https://cloudflare.com',
          affiliate: false,
          price: 'Free - $200+/month',
        },
      ],
    },
    {
      id: 'publishing',
      name: 'Publishing Platforms',
      description: 'Publish and host your content',
      tools: [
        {
          name: 'Substack',
          description: 'Newsletter and blog platform. Simple, built for writers, with great reach potential.',
          url: 'https://substack.com',
          affiliate: false,
          price: 'Free - 10% revenue share',
        },
        {
          name: 'Ghost',
          description: 'Modern publishing platform built for independent creators. Membership and subscriber support built-in.',
          url: 'https://ghost.org',
          affiliate: false,
          price: '$29-$199/month',
        },
        {
          name: 'Vercel',
          description: 'Deploy Next.js and other frameworks instantly. Excellent performance, built-in analytics, edge caching.',
          url: 'https://vercel.com',
          affiliate: false,
          price: 'Free - $20+/month',
        },
        {
          name: 'WordPress.com',
          description: 'Managed WordPress with built-in SEO tools, security, and performance optimization.',
          url: 'https://wordpress.com',
          affiliate: false,
          price: '$4-$45/month',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Resources & Tools
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            Curated collection of tools we use and recommend for AI search optimization.
          </p>
          <div className="inline-block bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg px-4 py-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              💡 <strong>Affiliate Disclosure:</strong> Some links below are affiliate partnerships. We earn a small commission if you purchase through them. This doesn't affect your price and helps us keep this site free.
            </p>
          </div>
        </div>

        {/* Tools by category */}
        <div className="space-y-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden"
            >
              {/* Category header */}
              <button
                onClick={() =>
                  setExpandedCategory(
                    expandedCategory === category.id ? null : category.id
                  )
                }
                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-between transition-colors"
              >
                <div className="text-left">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {category.name}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {category.description}
                  </p>
                </div>
                <ChevronDown
                  size={20}
                  className={`text-gray-600 dark:text-gray-400 transition-transform ${
                    expandedCategory === category.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Category content */}
              {expandedCategory === category.id && (
                <div className="px-6 py-4 space-y-4 border-t border-gray-200 dark:border-gray-800">
                  {category.tools.map((tool, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <AffiliateLink
                              href={tool.url}
                              affiliate={tool.affiliate}
                            >
                              {tool.name}
                            </AffiliateLink>
                            <span className="text-xs font-normal px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">
                              {tool.price}
                            </span>
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {tool.description}
                          </p>
                        </div>
                      </div>
                      {idx < category.tools.length - 1 && (
                        <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mt-4" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Recommendations section */}
        <div className="mt-16 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Our Top Recommendations
          </h2>
          <div className="space-y-3 text-gray-600 dark:text-gray-400">
            <p>
              <strong className="text-gray-900 dark:text-white">For quick audits:</strong> Start with{' '}
              <AffiliateLink href="https://aioverdose.com/tools/audit">
                the AI Search Readiness Audit
              </AffiliateLink>{' '}
              (free), then drill deeper with Ahrefs or Semrush.
            </p>
            <p>
              <strong className="text-gray-900 dark:text-white">For content optimization:</strong> Use{' '}
              <AffiliateLink href="https://surferseo.com" affiliate>
                Surfer SEO
              </AffiliateLink>{' '}
              to understand what top-ranking content looks like, then implement those patterns.
            </p>
            <p>
              <strong className="text-gray-900 dark:text-white">For monitoring:</strong> Set up{' '}
              <AffiliateLink href="https://search.google.com/search-console/">
                Google Search Console
              </AffiliateLink>{' '}
              (free) to track your visibility in Google search and AI systems.
            </p>
            <p>
              <strong className="text-gray-900 dark:text-white">For writing:</strong> Combine{' '}
              <AffiliateLink href="https://grammarly.com" affiliate>
                Grammarly
              </AffiliateLink>{' '}
              for editing with{' '}
              <AffiliateLink href="https://perplexity.ai">
                Perplexity
              </AffiliateLink>{' '}
              for research.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Resources FAQ
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Do I need to use these tools?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                No. These are optional tools that can accelerate your AI search optimization. Our{' '}
                <AffiliateLink href="/tools/audit">free audit tool</AffiliateLink> can identify gaps; these tools help you fix them faster.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Are these tools free?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Many have free tiers or freemium models (Google Search Console, Lighthouse, Schema testing tools). Paid tools start around $9/month. Read pricing before committing.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                What tools should I start with?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Start free: Google Search Console, PageSpeed Insights, and Schema.org testing tool. If you're serious about optimization, add Ahrefs or Semrush for deeper analysis.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Do you get paid to recommend these?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Only for affiliate links (marked with a{' '}
                <Info size={14} className="inline align-text-top" /> icon). These are tools we genuinely use and recommend. We don't include anything we wouldn't use ourselves.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Can I recommend a tool?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes! Email us at{' '}
                <AffiliateLink href="mailto:hello@aioverdose.com">
                  hello@aioverdose.com
                </AffiliateLink>{' '}
                with your recommendation and why you think it's valuable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
