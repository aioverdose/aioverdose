import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | aioverdose',
  description: 'How we use cookies and tracking on aioverdose.com.',
};

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <article className="max-w-3xl mx-auto px-4 py-16 prose prose-invert">
        <div className="mb-6 pb-6 border-b border-gray-300 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
            Last Updated: January 2026
          </p>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Cookie Policy</h1>

        <p className="text-lg text-gray-700 dark:text-gray-300">
          This policy explains how aioverdose.com uses cookies and similar tracking technologies.
        </p>

        <h2>1. What Are Cookies?</h2>
        <p>
          Cookies are small text files stored on your device (computer, phone, tablet) when you visit a website. They serve various purposes:
        </p>
        <ul>
          <li>Remembering your preferences</li>
          <li>Keeping you logged in</li>
          <li>Analyzing how you use the site</li>
          <li>Preventing spam and attacks</li>
        </ul>

        <h2>2. Types of Cookies We Use</h2>

        <h3>Essential Cookies</h3>
        <ul>
          <li><strong>Session ID:</strong> Keeps you connected while browsing</li>
          <li><strong>CSRF Protection:</strong> Prevents cross-site attacks</li>
          <li><strong>Security:</strong> Detects suspicious activity</li>
        </ul>
        <p>
          <em>These are required for the site to function. You cannot opt out.</em>
        </p>

        <h3>Preferences Cookies</h3>
        <ul>
          <li><strong>Dark Mode Toggle:</strong> Remembers your light/dark theme choice</li>
          <li><strong>Newsletter State:</strong> Tracks if you've dismissed the signup banner</li>
          <li><strong>Consent:</strong> Remembers your cookie preferences</li>
        </ul>
        <p>
          <em>You can opt out; the site will still work but your preferences won't be saved.</em>
        </p>

        <h3>Analytics Cookies</h3>
        <ul>
          <li><strong>Vercel Analytics:</strong> Tracks page views, device type, referrer. <a href="https://vercel.com/docs/concepts/analytics/privacy-statement" target="_blank">Privacy</a></li>
          <li><strong>Plausible Analytics (optional):</strong> GDPR-compliant analytics. <a href="https://plausible.io/data-policy" target="_blank">Privacy</a></li>
        </ul>
        <p>
          <em>These collect anonymized data (no personal info). You can opt out via banner.</em>
        </p>

        <h3>Functional Cookies</h3>
        <ul>
          <li><strong>Form State:</strong> Saves contact form progress</li>
          <li><strong>Search History:</strong> LocalStorage only; not synced to servers</li>
        </ul>

        <h2>3. Third-Party Cookies</h2>
        <p>
          We don't use third-party cookies for tracking (e.g., Facebook Pixel, Google Analytics). However:
        </p>
        <ul>
          <li><strong>Vercel:</strong> May set cookies for security and performance monitoring</li>
          <li><strong>External links:</strong> When you click off-site, third parties may set their own cookies (not under our control)</li>
        </ul>

        <h2>4. How to Manage Cookies</h2>

        <h3>Via Our Site</h3>
        <p>
          Accept or reject cookies using our consent banner when you first visit (and anytime via the Cookie Settings button in the footer).
        </p>

        <h3>Via Your Browser</h3>
        <p>
          Most browsers allow you to control cookies:
        </p>
        <ul>
          <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
          <li><strong>Firefox:</strong> Preferences → Privacy & Security → Cookies and Site Data</li>
          <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
          <li><strong>Edge:</strong> Settings → Privacy, search, and services → Cookies and other site permissions</li>
        </ul>
        <p>
          <strong>Warning:</strong> Blocking essential cookies may break site functionality.
        </p>

        <h3>Do Not Track (DNT)</h3>
        <p>
          Some browsers support a "Do Not Track" signal. We honor DNT by not loading analytics cookies if it's enabled.
        </p>

        <h2>5. Cookie Consent Mechanism</h2>
        <p>
          When you first visit, you'll see a banner asking to accept cookies. You can:
        </p>
        <ul>
          <li><strong>Accept All:</strong> Enable all cookies</li>
          <li><strong>Essential Only:</strong> Use only required cookies</li>
          <li><strong>Customize:</strong> Choose which types to enable</li>
        </ul>
        <p>
          Your choice is saved for 12 months. You can change it anytime via the footer settings button.
        </p>

        <h2>6. Cookie Duration</h2>
        <ul>
          <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
          <li><strong>Persistent cookies:</strong> Remain for up to 12 months</li>
          <li><strong>Consent cookie:</strong> Lasts 12 months (then you'll re-see the banner)</li>
        </ul>

        <h2>7. Contact Us</h2>
        <p>
          Questions about cookies?
        </p>
        <ul>
          <li>Email: <strong>hello@aioverdose.com</strong></li>
          <li><a href="/contact">Contact Form</a></li>
        </ul>

        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this policy if our cookie practices change. We'll notify you via email or a prominent banner of material changes.
        </p>

        <hr className="my-12 border-gray-300 dark:border-gray-700" />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © 2026 aioverdose.com. All rights reserved.
        </p>
      </article>
    </div>
  );
}
