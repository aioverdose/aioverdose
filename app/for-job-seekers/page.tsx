import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Career Visibility Audit — Make Sure AI Can Find You | aioverdose',
  description: 'Lost your job to AI? Make sure AI can find your next one. Free Career Visibility Audit for job seekers. Optimize your portfolio for LinkedIn, ChatGPT, and recruiter AI tools.',
  openGraph: {
    title: 'Career Visibility Audit — For Job Seekers',
    description: 'Audit your portfolio for AI visibility. Ensure ChatGPT, recruiters, and AI discovery tools can find and recommend you.',
    type: 'website',
  },
};

export default function JobSeekersPage() {
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
            Lost your job to AI?
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Make sure AI can find your next one.
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
            <strong>AI systems now decide who gets interviews.</strong> Recruiters use AI to screen candidates. Job boards use AI to match opportunities. LinkedIn uses AI to recommend talent. And when hiring managers research you, ChatGPT will be part of the process.
          </p>

          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Your portfolio and LinkedIn profile need to be <strong>AI-visible and AI-citable.</strong> This free audit ensures recruitment AI systems can find, understand, and recommend you.
          </p>

          <Link
            href="/tools/audit?mode=portfolio"
            className="inline-block px-8 py-4 rounded-lg bg-primary text-white font-semibold hover:bg-opacity-90 transition-colors flex items-center gap-2 justify-center"
          >
            Audit My Portfolio (Free) <ArrowRight className="w-5 h-5" />
          </Link>

          <div className="flex justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">Portfolio</span>
            <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">LinkedIn</span>
            <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">Recruiter Tools</span>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Your Portfolio is Invisible to AI
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-500" />
              <h3 className="font-semibold text-gray-900 dark:text-white">No Schema Markup</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Your portfolio lacks Person schema. Recruiters' AI tools can't extract your name, job title, skills, and experience in structured format.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-500" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Unstructured Content</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              When ChatGPT or a recruiter's AI tool reads your portfolio, it can't distinguish your skills from random prose. No highlights, no emphasis.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-500" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Missing Credentials</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              AI systems look for certifications, education, testimonials. If they're not visible and verifiable, you're overlooked for candidates with structured proof.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-8">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">The Result</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            <strong>Recruiters using LinkedIn Recruiter, Greenhouse, and Workable</strong> run AI filters over candidates. If your profile isn't structured for AI extraction, you get filtered out before a human ever sees your resume. Even if you're perfectly qualified.
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          How to Become AI-Visible
        </h2>

        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white">
                1
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Audit Your Visibility</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Run a Career Visibility Audit on your portfolio. This free tool checks whether recruiters' AI systems can extract your name, experience, skills, education, and contact info.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white">
                2
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Add Person Schema</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Add Person schema to your portfolio homepage. This tells AI systems exactly what your name, title, skills, and credentials are. No guessing.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white">
                3
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Optimize Your About Section</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Write a clear, scannable "About" section with bold key terms, job title, top skills, and certifications. AI systems will extract this to show recruiters.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white">
                4
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Link Your Presence</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Add SameAs links to your LinkedIn, GitHub, Twitter, and other professional profiles. This helps AI systems connect and verify your identity across platforms.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white">
                5
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Update LinkedIn</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your LinkedIn profile is scanned by more AI tools than any other platform. Ensure your headline, About, Skills, and Experience are complete, current, and AI-readable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          What Our Audit Checks
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Portfolio Visibility</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Person schema with name, jobTitle, skills</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Clear, AI-extractable About section</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Contact info is accessible</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Social profile links (LinkedIn, GitHub, etc.)</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Mobile responsive design</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Career Credibility</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Quantified project outcomes</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Certifications and credentials visible</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Education details listed</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Skill descriptions, not just keywords</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Testimonials or recommendations</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          For Job Seekers
        </h2>

        <div className="max-w-3xl mx-auto space-y-6">
          <details className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 group">
            <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-gray-900 dark:text-white">
              What does "AI-visible" mean for job seekers?
              <span className="text-gray-600 dark:text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              AI-visible means recruiters' AI tools can extract your key information: name, title, skills, experience, education, and contact details. When LinkedIn Recruiter or Greenhouse AI scans your profile, it needs to instantly understand who you are and what you do — without guessing.
            </p>
          </details>

          <details className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 group">
            <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-gray-900 dark:text-white">
              Will improving my AI visibility hurt my human audience?
              <span className="text-gray-600 dark:text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              No. AI-optimized portfolios are more scannable and clear for humans too. Bold keywords, clear structure, quantified outcomes, and visible contact info all make your portfolio better for anyone reading it. You're just making it work for both AI and people.
            </p>
          </details>

          <details className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 group">
            <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-gray-900 dark:text-white">
              What if I don't have a portfolio website?
              <span className="text-gray-600 dark:text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              You should. But your LinkedIn profile is almost as important. Audit your LinkedIn, optimize it with Person schema (LinkedIn supports it), ensure your headline is clear, your About is detailed, and your Skills section is complete. Most recruiters see LinkedIn first.
            </p>
          </details>

          <details className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 group">
            <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-gray-900 dark:text-white">
              How long does it take to become AI-visible?
              <span className="text-gray-600 dark:text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              If you have a portfolio: 2-3 hours. Add Person schema, rewrite your About section, ensure all key info is visible. If you only have LinkedIn: 30-60 minutes. Update your headline, flesh out your About, add all skills and certifications. Start now — recruiters are hiring today.
            </p>
          </details>

          <details className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 group">
            <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-gray-900 dark:text-white">
              Does this replace my resume?
              <span className="text-gray-600 dark:text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              No. Your resume is still critical for the interview stage. But your AI-visible portfolio and LinkedIn get you into the interview. Recruiters using AI tools scan portfolios first, then request resumes from the matches. Be AI-visible first.
            </p>
          </details>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200 dark:border-gray-800">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-12 text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Don't let AI miss you
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Start your Career Visibility Audit now. Free. No signup. Takes 2 minutes.
          </p>
          <Link
            href="/tools/audit?mode=portfolio"
            className="inline-block px-8 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-opacity-90 transition-colors"
          >
            Audit My Portfolio
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              Career Visibility Audit • Built for job seekers navigating AI-driven hiring
            </p>
            <p className="mt-2 text-xs">
              Not affiliated with LinkedIn, Indeed, Greenhouse, or any hiring platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
