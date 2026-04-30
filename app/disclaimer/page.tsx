import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer | aioverdose',
  description: 'Important disclaimers about aioverdose.com content and tools.',
};

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <article className="max-w-3xl mx-auto px-4 py-16 prose prose-invert">
        <div className="mb-6 pb-6 border-b border-gray-300 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
            Last Updated: January 2026
          </p>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Disclaimer</h1>

        <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 my-6">
          <p className="font-semibold text-amber-900 dark:text-amber-200 m-0">
            ⚠️ Please read this carefully. It affects your rights.
          </p>
        </div>

        <h2>1. Educational Purpose Only</h2>
        <p>
          All content on aioverdose.com—including guides, tools, recommendations, and analysis—is provided for <strong>educational purposes only</strong>. We aim to help you understand AI search systems and generative engine optimization (GEO), but:
        </p>
        <ul>
          <li>We are not accountants, lawyers, or SEO professionals</li>
          <li>We do not provide professional, legal, tax, or financial advice</li>
          <li>We do not guarantee specific business outcomes</li>
        </ul>

        <h2>2. No Professional Advice</h2>
        <p>
          <strong>Nothing on this site should be treated as professional guidance.</strong> Before making significant business decisions, consult qualified professionals:
        </p>
        <ul>
          <li><strong>Legal:</strong> Consult a lawyer about legal compliance, T&Cs, and liability</li>
          <li><strong>Financial:</strong> Talk to a CPA or financial advisor about business impacts</li>
          <li><strong>SEO/Marketing:</strong> Work with an experienced SEO agency for your specific situation</li>
        </ul>

        <h2>3. AI Search Results Are Not Guaranteed</h2>
        <p>
          <strong>Our AI Search Readiness Audit score does not guarantee that your site will appear in ChatGPT, Perplexity, Google AI Overviews, or any other AI search system.</strong> Here's why:
        </p>
        <ul>
          <li><strong>Algorithms are black boxes:</strong> We don't control how AI systems extract and cite content</li>
          <li><strong>Systems evolve constantly:</strong> ChatGPT, Google, and others change their algorithms weekly. Information quickly becomes outdated.</li>
          <li><strong>Multiple factors matter:</strong> Domain authority, freshness, relevance, and training data all influence results in ways we can't fully predict</li>
          <li><strong>Luck plays a role:</strong> What works for one site may not work for another, even with identical optimization</li>
          <li><strong>Third parties control outcomes:</strong> We have no influence over what OpenAI, Google, or Perplexity do with information</li>
        </ul>
        <p>
          Our audit is a best-effort assessment of technical readiness, not a crystal ball.
        </p>

        <h2>4. Rapid Industry Changes</h2>
        <p>
          The AI search landscape changes at unprecedented speed. What's accurate today may be wrong tomorrow:
        </p>
        <ul>
          <li>Google rolled out AI Overviews; we updated guides; a month later, they changed the algorithm</li>
          <li>OpenAI announced new citation features; our recommendations shifted</li>
          <li>Perplexity changed how it sources; our best practices evolved</li>
        </ul>
        <p>
          We do our best to stay current, but we <strong>cannot guarantee accuracy</strong> for anything we publish. Always cross-check with official sources (Google Search Central, OpenAI docs, etc.).
        </p>

        <h2>5. Third-Party Links</h2>
        <p>
          We link to external resources, tools, and articles. We don't control them and are not responsible for:
        </p>
        <ul>
          <li>Accuracy of third-party content</li>
          <li>Their privacy practices</li>
          <li>Their pricing or terms</li>
          <li>Downtime or service interruptions</li>
          <li>Malware or security issues</li>
        </ul>
        <p>
          Review their privacy policies and terms before using.
        </p>

        <h2>6. Affiliate Disclosure</h2>
        <p>
          We may earn affiliate commissions from some links to tools and services we recommend. This includes:
        </p>
        <ul>
          <li>Direct affiliate programs (Ahrefs, Surfer SEO, etc.)</li>
          <li>Referral bonuses or commissions</li>
        </ul>
        <p>
          <strong>These are clearly disclosed.</strong> This does not affect your purchase price and doesn't bias our recommendations—we only link to tools we genuinely use and believe help creators understand GEO.
        </p>

        <h2>7. Our Audit Tool Disclaimer</h2>
        <p>
          The AI Search Readiness Audit is a free, educational tool. It has limitations:
        </p>
        <ul>
          <li><strong>Simplified analysis:</strong> Real-world AI ranking is far more complex</li>
          <li><strong>Client-side processing:</strong> We don't store your data, but the analysis runs in your browser (may not catch everything a server could)</li>
          <li><strong>No personalization:</strong> The tool can't account for your specific niche, audience, or strategy</li>
          <li><strong>Scores are relative:</strong> A 75/100 doesn't mean you'll rank; it means you're better positioned than a 50/100 site (all else equal)</li>
        </ul>
        <p>
          Use it as a starting point, not gospel.
        </p>

        <h2>8. No Warranty</h2>
        <p>
          <strong>All content, tools, and services are provided "as-is" without warranty.</strong> We don't guarantee:
        </p>
        <ul>
          <li>Accuracy, completeness, or timeliness</li>
          <li>Fitness for a particular purpose</li>
          <li>Freedom from errors or omissions</li>
          <li>Uninterrupted uptime</li>
        </ul>

        <h2>9. Limitation of Liability</h2>
        <p>
          <strong>To the fullest extent allowed by law, aioverdose.com is not liable for:</strong>
        </p>
        <ul>
          <li>Any direct or indirect damages from using (or not using) our site</li>
          <li>Lost revenue, lost traffic, or lost rankings</li>
          <li>Wrong decisions made based on our advice</li>
          <li>Downtime or tool outages</li>
          <li>Security breaches (though we work to prevent them)</li>
        </ul>
        <p>
          Even if we've been told these damages were possible, we're not responsible.
        </p>

        <h2>10. Your Responsibility</h2>
        <p>
          You are responsible for:
        </p>
        <ul>
          <li>Evaluating the appropriateness of our advice for your specific situation</li>
          <li>Making informed decisions with qualified professionals</li>
          <li>Backing up your own data and content</li>
          <li>Complying with all laws and platform terms (Google, OpenAI, etc.)</li>
        </ul>

        <h2>11. Indemnity</h2>
        <p>
          You agree to indemnify (defend and compensate) aioverdose.com for any claims, losses, or damages arising from your use of the site or your reliance on our content.
        </p>

        <h2>12. Corrections</h2>
        <p>
          We try to be accurate, but we make mistakes. If you find an error, please report it:
        </p>
        <ul>
          <li>Email: <strong>hello@aioverdose.com</strong></li>
          <li><a href="/contact">Contact Form</a></li>
          <li>Subject: "Correction: [article title]"</li>
        </ul>
        <p>
          We'll investigate and update content if needed. We appreciate your help in keeping the site accurate.
        </p>

        <h2>13. No Professional Relationship</h2>
        <p>
          Using aioverdose.com does not create:
        </p>
        <ul>
          <li>An attorney-client relationship</li>
          <li>A consultant-client relationship</li>
          <li>Any legal obligation on our part to provide ongoing advice</li>
        </ul>

        <h2>14. Governing Law</h2>
        <p>
          This disclaimer is governed by Delaware law. See our <a href="/terms-of-service">Terms of Service</a> for full legal terms.
        </p>

        <h2>15. Questions?</h2>
        <p>
          If you have questions about this disclaimer or anything we've published:
        </p>
        <ul>
          <li>Email: <strong>hello@aioverdose.com</strong></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>

        <hr className="my-12 border-gray-300 dark:border-gray-700" />

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4">
          <p className="text-blue-900 dark:text-blue-200 m-0">
            <strong>Bottom line:</strong> We provide educational content to help you understand AI search. Do your own research, consult professionals for major decisions, and don't blame us if things don't work out. We're here to help, not to guarantee results.
          </p>
        </div>

        <hr className="my-12 border-gray-300 dark:border-gray-700" />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © 2026 aioverdose.com. All rights reserved.
        </p>
      </article>
    </div>
  );
}
