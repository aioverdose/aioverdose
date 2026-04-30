import type { Metadata } from 'next';
import './globals.css';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import ToastProvider from '@/components/shared/ToastProvider';

export const metadata: Metadata = {
  title: 'AI Search Readiness Audit',
  description: 'Analyze your webpage for AI search engine compatibility. Get insights on ChatGPT, Perplexity, Google AI Overviews, and Gemini readiness.',
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'AI Search Readiness Audit',
    description: 'Analyze your webpage for AI search engine compatibility',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'aioverdose',
              url: 'https://aioverdose.com',
              logo: 'https://aioverdose.com/logo.png',
              description:
                'AI Search Readiness Audit Tool - Analyze web pages for compatibility with AI search systems',
              sameAs: [
                'https://twitter.com/aioverdose',
                'https://linkedin.com/company/aioverdose',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'hello@aioverdose.com',
              },
              founder: {
                '@type': 'Person',
                name: 'aioverdose',
                url: 'https://aioverdose.com',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'aioverdose',
              url: 'https://aioverdose.com',
              jobTitle: 'AI Search Optimization Specialist',
              description: 'Expert in AI Search Optimization and Generative Engine Optimization (GEO)',
              expertise: ['AI Search Optimization', 'Schema Markup', 'Generative Engine Optimization', 'Content Strategy'],
              sameAs: [
                'https://twitter.com/aioverdose',
                'https://linkedin.com/company/aioverdose',
              ],
              knowsAbout: ['ChatGPT', 'Perplexity', 'Google AI Overviews', 'Gemini', 'Content Optimization', 'Schema.org'],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://aioverdose.com',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Tools',
                  item: 'https://aioverdose.com/tools',
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: 'AI Search Readiness Audit Tool',
              description:
                'Free tool to analyze your web content for AI search engine compatibility. Optimize for ChatGPT, Perplexity, Google AI Overviews, and Gemini.',
              image: 'https://aioverdose.com/og-image.png',
              datePublished: '2026-04-15T00:00:00Z',
              dateModified: new Date().toISOString(),
              author: {
                '@type': 'Organization',
                name: 'aioverdose',
                url: 'https://aioverdose.com',
              },
              publisher: {
                '@type': 'Organization',
                name: 'aioverdose',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://aioverdose.com/logo.png',
                },
              },
            }),
          }}
        />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
        <ToastProvider />
      </body>
    </html>
  );
}
