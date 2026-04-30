import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | aioverdose',
  description: 'Learn how we collect, use, and protect your data at aioverdose.com.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <article className="max-w-3xl mx-auto px-4 py-16 prose prose-invert">
        <div className="mb-6 pb-6 border-b border-gray-300 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
            Last Updated: January 2026
          </p>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>

        <p className="text-lg text-gray-700 dark:text-gray-300">
          At <strong>aioverdose.com</strong>, we're committed to transparent data practices. This policy explains what information we collect, how we use it, and your rights.
        </p>

        <h2>1. What Information We Collect</h2>
        <p>We collect information in the following ways:</p>

        <h3>Audit Tool Usage</h3>
        <ul>
          <li><strong>URLs you analyze:</strong> We temporarily store the URL you submit to perform the audit. This data is not linked to your identity.</li>
          <li><strong>HTML content:</strong> If you paste HTML directly, we process it in-memory and do not store it.</li>
          <li><strong>Audit results:</strong> Scores and recommendations are generated in your browser; we don't store them on our servers.</li>
        </ul>

        <h3>Contact Form Submissions</h3>
        <ul>
          <li>Name, email, subject, and message (stored via Formspree, our form service provider)</li>
          <li>We use this solely to respond to your inquiry</li>
        </ul>

        <h3>Newsletter Signups</h3>
        <ul>
          <li>Email address (stored with our newsletter provider)</li>
          <li>Used to send you the weekly "AI Search Watch" digest</li>
          <li>Unsubscribe links in every email allow instant removal</li>
        </ul>

        <h3>Automatically Collected Data</h3>
        <ul>
          <li><strong>Analytics:</strong> We use Vercel Analytics and optional Plausible Analytics to understand traffic patterns, device types, and referring URLs. No personally identifying information is collected.</li>
          <li><strong>Cookies:</strong> See our <a href="/cookie-policy">Cookie Policy</a> for details.</li>
          <li><strong>Server logs:</strong> Like all websites, our hosting provider (Vercel) logs IP addresses, user agents, and access times for security.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li><strong>Improve our tools:</strong> Anonymous usage patterns help us identify which guides and tools are most valuable.</li>
          <li><strong>Respond to contacts:</strong> We reply to form submissions within 48 hours.</li>
          <li><strong>Send newsletters:</strong> Email subscribers receive our weekly AI search analysis.</li>
          <li><strong>Security:</strong> We detect and prevent abuse (e.g., automated tool scraping).</li>
          <li><strong>Legal compliance:</strong> We retain minimal data to comply with laws.</li>
        </ul>

        <h2>3. Cookies and Tracking</h2>
        <p>
          We use cookies for:
        </p>
        <ul>
          <li><strong>Essential:</strong> Session functionality, CSRF protection</li>
          <li><strong>Analytics:</strong> Tracking page views and user flow (anonymized)</li>
          <li><strong>Preferences:</strong> Dark mode toggle, newsletter signup state</li>
        </ul>
        <p>
          See our <a href="/cookie-policy">full Cookie Policy</a> for opt-out instructions.
        </p>

        <h2>4. Third-Party Services</h2>
        <p>We use the following services, which have their own privacy policies:</p>
        <ul>
          <li><strong>Vercel:</strong> Hosting and deployment. <a href="https://vercel.com/legal/privacy-policy" target="_blank">Privacy Policy</a></li>
          <li><strong>Formspree:</strong> Form submissions. <a href="https://formspree.io/legal/privacy-policy/" target="_blank">Privacy Policy</a></li>
          <li><strong>Plausible Analytics (optional):</strong> Privacy-focused analytics. <a href="https://plausible.io/privacy-focused-web-analytics" target="_blank">Privacy Policy</a></li>
          <li><strong>Newsletter provider (TBD):</strong> Will comply with GDPR/CCPA.</li>
        </ul>

        <h2>5. Data Retention</h2>
        <ul>
          <li><strong>Audit tool URLs:</strong> Not retained (processed in-memory)</li>
          <li><strong>Contact form submissions:</strong> Retained for 1 year for record-keeping</li>
          <li><strong>Newsletter emails:</strong> Retained as long as you're subscribed; deleted upon unsubscribe</li>
          <li><strong>Analytics:</strong> Aggregated data retained indefinitely; individual session data deleted after 30 days</li>
          <li><strong>Server logs:</strong> Deleted after 30 days by Vercel</li>
        </ul>

        <h2>6. Your Rights (GDPR & CCPA)</h2>
        <p>If you're in the EU or California, you have rights including:</p>
        <ul>
          <li><strong>Access:</strong> Request a copy of your data</li>
          <li><strong>Deletion:</strong> Request we delete your information (except legal obligations)</li>
          <li><strong>Portability:</strong> Request your data in a portable format</li>
          <li><strong>Opt-out:</strong> Unsubscribe from emails anytime</li>
          <li><strong>Object:</strong> Challenge how we process your data</li>
        </ul>
        <p>
          To exercise these rights, email <strong>hello@aioverdose.com</strong> with "Privacy Request" in the subject line. We'll respond within 30 days.
        </p>

        <h2>7. Children's Privacy</h2>
        <p>
          aioverdose.com is not directed at children under 13. We don't knowingly collect data from children. If we discover we've collected information from a child, we'll delete it immediately.
        </p>

        <h2>8. Security</h2>
        <p>
          We use industry-standard security:
        </p>
        <ul>
          <li>HTTPS encryption for all data in transit</li>
          <li>Secure hosting on Vercel's infrastructure</li>
          <li>No storage of sensitive audit data on our servers</li>
        </ul>
        <p>
          However, no system is 100% secure. Report security issues to <strong>security@aioverdose.com</strong>.
        </p>

        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this policy to reflect changes in our practices or legal requirements. We'll notify users of material changes via email or a prominent site notice. Continued use after changes constitutes acceptance.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          Questions about this policy?
        </p>
        <ul>
          <li>Email: <strong>hello@aioverdose.com</strong></li>
          <li><a href="/contact">Contact Form</a></li>
          <li>Twitter/X: <strong>@aioverdose</strong></li>
        </ul>

        <hr className="my-12 border-gray-300 dark:border-gray-700" />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © 2026 aioverdose.com. All rights reserved.
        </p>
      </article>
    </div>
  );
}
