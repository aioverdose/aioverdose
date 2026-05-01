import { StatsCard } from '@/components/admin/StatsCard';
import { FileText, Inbox, BarChart3, TrendingUp } from 'lucide-react';
import { readFile } from 'fs/promises';
import { join } from 'path';

async function getStats() {
  try {
    const dataDir = join(process.cwd(), 'data');

    // Get guides count
    let guidesCount = 0;
    try {
      const guidesData = await readFile(join(dataDir, 'guides.json'), 'utf-8');
      const guides = JSON.parse(guidesData);
      guidesCount = Array.isArray(guides) ? guides.length : 0;
    } catch (e) {
      guidesCount = 0;
    }

    // Get submissions count
    let submissionsCount = 0;
    try {
      const submissionsData = await readFile(join(dataDir, 'submissions.json'), 'utf-8');
      const submissions = JSON.parse(submissionsData);
      submissionsCount = Array.isArray(submissions) ? submissions.length : 0;
    } catch (e) {
      submissionsCount = 0;
    }

    return {
      guidesCount,
      submissionsCount,
    };
  } catch (error) {
    console.error('Error reading stats:', error);
    return {
      guidesCount: 0,
      submissionsCount: 0,
    };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="flex-1 p-8">
      <div className="max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome to the aioverdose admin dashboard
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={<FileText />}
            label="Published Guides"
            value={stats.guidesCount}
            subtext="Total guides in CMS"
          />
          <StatsCard
            icon={<Inbox />}
            label="Form Submissions"
            value={stats.submissionsCount}
            subtext="Contact form entries"
          />
          <StatsCard
            icon={<BarChart3 />}
            label="Admin Dashboard"
            value="v1.0"
            subtext="Latest version"
          />
          <StatsCard
            icon={<TrendingUp />}
            label="System Status"
            value="Online"
            subtext="All systems operational"
          />
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              📝 Content Management
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Manage guides, site content, audit configuration, and contact form submissions.
            </p>
            <a
              href="/admin/cms/guides"
              className="inline-block px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-opacity-90 transition-colors text-sm"
            >
              Go to CMS →
            </a>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              🤖 Development Agent
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Chat with Claude AI to generate code changes and apply them directly to your repo.
            </p>
            <a
              href="/admin/dev-agent"
              className="inline-block px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-opacity-90 transition-colors text-sm"
            >
              Open Dev Agent →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
