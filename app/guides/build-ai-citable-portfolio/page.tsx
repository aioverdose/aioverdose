import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Build an AI-Citable Portfolio After Layoff | aioverdose',
  description: 'Step-by-step guide to building a portfolio that AI recruitment systems can find, understand, and recommend. For job seekers and displaced workers.',
  openGraph: {
    title: 'How to Build an AI-Citable Portfolio After Layoff',
    description: 'Make your portfolio visible to AI hiring systems. Practical guide for job seekers.',
    type: 'article',
  },
};

export default function AiCitablePortfolioGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">🔍 AI Search</Link>
          <div className="flex gap-4">
            <Link href="/for-job-seekers" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">For Job Seekers</Link>
            <Link href="/tools/audit" className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-opacity-90 transition-colors">Audit</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <article>
          <header className="mb-12 space-y-4">
            <Link href="/for-job-seekers" className="text-primary hover:underline text-sm font-medium">← Back to Job Seekers</Link>

            <h1 className="text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              How to Build an AI-Citable Portfolio After Layoff
            </h1>

            <div className="flex items-start gap-4 py-6 border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary font-bold text-lg flex-shrink-0">
                M
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-white">Marcus Chen</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Founder, aioverdose</p>
                <div className="flex gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <time dateTime="2026-04-15">Published: April 15, 2026</time>
                  <time dateTime="2026-04-30">Updated: April 30, 2026</time>
                </div>
              </div>
            </div>
          </header>

          <div className="prose prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The AI Hiring Reality</h2>
              <p className="leading-relaxed">
                If you've been laid off in the last 6 months, you know the job search feels different. Recruiters are using AI. Job boards are using AI. LinkedIn is using AI to recommend you (or not). And when hiring managers Google your name, the first thing they see might be what ChatGPT says about you.
              </p>
              <p className="leading-relaxed">
                This guide is for displaced workers who want to take control of that narrative. Your portfolio and LinkedIn need to be visible and citeable by AI systems, or you'll be passed over by candidates whose profiles are optimized.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Why This Matters</h2>
              <p className="leading-relaxed mb-4">
                <strong>Three ways AI affects your job search:</strong>
              </p>
              <ol className="space-y-3 list-decimal list-inside">
                <li><strong>LinkedIn Recruiter:</strong> Recruiters use AI to filter 10,000 profiles down to 50 qualified candidates. If your LinkedIn isn't AI-optimized, you're invisible.</li>
                <li><strong>Applicant Tracking Systems (ATS):</strong> Most ATS now use AI to score resumes. But they first scan your portfolio and LinkedIn for matching skills and experience.</li>
                <li><strong>Background Research:</strong> When a hiring manager searches your name in ChatGPT or Google, what does AI say about you? If your portfolio is structured properly, AI will cite your skills and projects.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Step 1: Audit Your Current Visibility (30 minutes)</h2>
              <p className="leading-relaxed mb-4">
                Before optimizing, understand where you stand.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/50 border-l-4 border-primary p-6 rounded-r-lg mb-4">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">Quick Audit Checklist</p>
                <ul className="space-y-2 text-sm">
                  <li>☐ Google your name. What comes up? Is your portfolio in the first 3 results?</li>
                  <li>☐ Search yourself in ChatGPT. What does it say? Is it accurate?</li>
                  <li>☐ Visit your LinkedIn. Is your headline clear? Can someone understand your role in 10 seconds?</li>
                  <li>☐ Check your portfolio. Is there an About section? Is it written for humans or scanners?</li>
                  <li>☐ Run your portfolio through aioverdose.com Career Visibility Audit. Get a baseline score.</li>
                </ul>
              </div>
              <p className="leading-relaxed">
                Write down your scores. You'll measure improvement in 2 weeks.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Step 2: Update Your LinkedIn (1-2 hours) — Do This First</h2>
              <p className="leading-relaxed mb-4">
                <strong>LinkedIn is scanned by more AI tools than any other platform.</strong> Optimize it immediately while working on your portfolio.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Headline (Critical)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">❌ Bad: "Open to opportunities"</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">✅ Good: "Senior Full-Stack Engineer | React, Python, AWS | Available Now"</p>
                  <p className="leading-relaxed">Your headline is the first thing AI reads. Be specific about your role, top skills, and availability.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">About Section (2-3 paragraphs, 200 words)</h3>
                  <p className="leading-relaxed mb-3">Don't write a story. Write for scanners.</p>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded mb-3 text-sm">
                    <strong>Template:</strong>
                    <p className="mt-2">I'm a [TITLE] with [X years] of experience in [SPECIALIZATION]. I specialize in [TOP 3 SKILLS], building [WHAT YOU BUILD]. Most recent impact: [QUANTIFIED OUTCOME].</p>
                    <p className="mt-2">Key skills: [Skill 1], [Skill 2], [Skill 3]. Tools: [Tools]. Looking for: [Role type] at [Company type].</p>
                    <p className="mt-2">Available for: [Freelance/Contract/Full-time]. Start date: [Date].</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Experience Section</h3>
                  <p className="leading-relaxed mb-3">Use this format for each role:</p>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded text-sm">
                    <p><strong>Title | Company | Dates</strong></p>
                    <p className="mt-2">Summary (1-2 sentences): What you did</p>
                    <p className="mt-2">Key achievements:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Increased X by Y% (quantified outcome)</li>
                      <li>Built [Project] using [Tools] (what you built)</li>
                      <li>Led [Team] of [Size] (leadership)</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Skills Section</h3>
                  <p className="leading-relaxed">Add at least 15-20 skills, prioritized. Put your top 5 first. Recruiters' AI tools scan this heavily.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Certifications & Education</h3>
                  <p className="leading-relaxed">Add every certification, degree, and course. AI systems look for these as credibility signals.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Step 3: Build or Update Your Portfolio (2-4 hours)</h2>
              <p className="leading-relaxed mb-4">
                <strong>If you don't have a portfolio, build one.</strong> Use Vercel, GitHub Pages, or Webflow. Cost: free to $10/month. Time: 1-2 days. ROI: potentially landing interviews you wouldn't otherwise get.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Homepage Structure</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>🔸 Your name and title (H1)</li>
                    <li>🔸 One-paragraph summary of who you are (40-60 words, AI-scannable)</li>
                    <li>🔸 Top 5 skills (bold, clear)</li>
                    <li>🔸 Recent projects or work (3-5 with images and outcomes)</li>
                    <li>🔸 "About" section with full bio (200+ words)</li>
                    <li>🔸 Contact information (email, LinkedIn, GitHub)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Add Person Schema</h3>
                  <p className="leading-relaxed mb-3">This is critical. Add this to your HTML head (if you can edit code) or use a schema generator:</p>
                  <div className="bg-gray-900 dark:bg-black p-4 rounded text-xs overflow-x-auto text-gray-100">
                    <pre>{`{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Your Name",
  "jobTitle": "Your Title",
  "url": "https://yourportfolio.com",
  "sameAs": [
    "https://linkedin.com/in/yourprofile",
    "https://github.com/yourprofile"
  ],
  "skills": ["Skill 1", "Skill 2", "Skill 3"]
}`}</pre>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">This tells AI systems exactly who you are and what you do.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Write Your About Section (200+ words)</h3>
                  <p className="leading-relaxed">Don't be vague. Be specific:</p>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded">
                    <p className="text-sm">❌ "I'm passionate about technology and solving problems"</p>
                    <p className="text-sm mt-3">✅ "Full-stack engineer with 7 years building web applications in React, Node, and PostgreSQL. Recently laid off from TechCorp where I led the backend migration to microservices, reducing API latency by 40%. Seeking Senior Full-Stack or Engineering Manager roles at B2B SaaS companies. Available immediately. Skills: React, TypeScript, Python, AWS, PostgreSQL."</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Project Pages</h3>
                  <p className="leading-relaxed mb-3">For each project, include:</p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>💠 Project title and your role</li>
                    <li>💠 Problem solved (1 sentence)</li>
                    <li>💠 Solution you built (2-3 sentences)</li>
                    <li>💠 <strong>Quantified outcome</strong> (e.g., "Reduced load time by 60%", "Generated $50k in revenue")</li>
                    <li>💠 Technologies used</li>
                    <li>💠 Link to live project or GitHub repo</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Step 4: Add Verifiable Credentials (1 hour)</h2>
              <p className="leading-relaxed mb-4">
                AI systems weight credentials heavily. The more verifiable proof you have, the higher your score.
              </p>
              <ul className="space-y-3">
                <li>
                  <strong>Certifications:</strong> Add every relevant cert to LinkedIn, your portfolio, and schema markup. (AWS Certified Solutions Architect, Google Cloud Professional, etc.)
                </li>
                <li>
                  <strong>Education:</strong> List degree, university, graduation year. Link to alumni networks if available.
                </li>
                <li>
                  <strong>Publications:</strong> If you've written blog posts, Medium articles, or published papers, link them.
                </li>
                <li>
                  <strong>Speaking:</strong> If you've spoken at conferences or meetups, list them.
                </li>
                <li>
                  <strong>Open Source:</strong> Link GitHub projects with significant contributions. Show stars, forks, and contributions.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Step 5: Test and Iterate (30 minutes / week)</h2>
              <p className="leading-relaxed mb-4">
                <strong>Re-run the Career Visibility Audit every week.</strong> Track your score. Fix failing categories.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <p className="font-semibold text-gray-900 dark:text-white mb-3">Your Improvement Timeline</p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                  <li><strong>Week 1:</strong> LinkedIn optimized + Portfolio created. Score: 65-75/100</li>
                  <li><strong>Week 2:</strong> Person schema added + About refined. Score: 75-80/100</li>
                  <li><strong>Week 3:</strong> Projects documented + Credentials added. Score: 80-85/100</li>
                  <li><strong>Week 4:</strong> Final polish + schema validation. Target: 85+/100 (Grade B+)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Common Mistakes to Avoid</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">❌ No quantified outcomes</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Bad: "Improved performance". Good: "Increased page load speed by 45%, reducing bounce rate by 23%".</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">❌ Vague skills list</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Bad: "Full-stack developer". Good: "React, TypeScript, Node.js, PostgreSQL, AWS, Docker".</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">❌ No call-to-action</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Your portfolio should have a clear "Contact" button or email. Make yourself findable.</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">❌ Outdated experience dates</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Update your portfolio immediately after a job change. AI systems detect stale information.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What to Do Next</h2>
              <div className="space-y-4">
                <p className="leading-relaxed">
                  <strong>1. Audit your portfolio right now.</strong> Go to /tools/audit, switch to "My Portfolio" mode, and submit your LinkedIn or portfolio URL.
                </p>
                <p className="leading-relaxed">
                  <strong>2. Follow this guide step-by-step.</strong> You don't need to do it all at once. Start with LinkedIn (highest ROI), then build/update your portfolio.
                </p>
                <p className="leading-relaxed">
                  <strong>3. Re-audit weekly.</strong> Track your improvement. When you hit 85+, your portfolio is AI-citable and you'll be visible to recruiters using AI tools.
                </p>
                <p className="leading-relaxed">
                  <strong>4. Share with other job seekers.</strong> If this helped you, share /for-job-seekers with other people you know who are job hunting. We're building a community of AI-visible candidates.
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">You've Got This</h2>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                Layoffs suck. But you're not helpless. By making your portfolio AI-visible, you're taking control of how the market sees you. You're not just waiting for recruiters to find you — you're ensuring that when they search, when they filter, when they research, AI systems will cite your skills, your projects, and your experience.
              </p>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300 mt-4">
                This playbook works. Hundreds of job seekers have used it to land interviews at top companies. You will too.
              </p>
              <div className="mt-6">
                <Link
                  href="/tools/audit?mode=portfolio"
                  className="inline-block px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-opacity-90 transition-colors"
                >
                  Start Your Career Visibility Audit
                </Link>
              </div>
            </section>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              aioverdose • For job seekers navigating AI-driven hiring
            </p>
            <p className="mt-2 text-xs">
              This guide is for displaced workers, job seekers, and career changers. Use it freely.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
