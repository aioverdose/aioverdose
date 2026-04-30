import type { Metadata } from 'next';
import './globals.css';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';

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
            }),
          }}
        />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
