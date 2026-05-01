import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  FileText,
  Settings,
  Inbox,
  Code2,
  ChevronRight,
  LogOut,
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;
  const isSection = (prefix: string) => pathname.startsWith(prefix);

  return (
    <aside className="w-64 bg-gray-900 text-gray-100 h-screen overflow-y-auto flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span>🔍</span>
          <span>aioverdose</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">Admin Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {/* Dashboard */}
        <Link
          href="/admin"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
            isActive('/admin')
              ? 'bg-primary text-white'
              : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>

        {/* CMS */}
        <div>
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors">
            <FileText className="w-5 h-5" />
            <span>CMS</span>
            <ChevronRight className="w-4 h-4 ml-auto" />
          </button>

          {isSection('/admin/cms') && (
            <div className="ml-2 mt-1 space-y-1 border-l border-gray-700 pl-2">
              <Link
                href="/admin/cms/guides"
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                  isActive('/admin/cms/guides')
                    ? 'bg-primary/20 text-primary'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                }`}
              >
                Guides
              </Link>
              <Link
                href="/admin/cms/content"
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                  isActive('/admin/cms/content')
                    ? 'bg-primary/20 text-primary'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                }`}
              >
                Site Content
              </Link>
              <Link
                href="/admin/cms/audit-config"
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                  isActive('/admin/cms/audit-config')
                    ? 'bg-primary/20 text-primary'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                }`}
              >
                Audit Config
              </Link>
              <Link
                href="/admin/cms/submissions"
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                  isActive('/admin/cms/submissions')
                    ? 'bg-primary/20 text-primary'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                }`}
              >
                Submissions
              </Link>
            </div>
          )}
        </div>

        {/* Dev Agent */}
        <Link
          href="/admin/dev-agent"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
            isActive('/admin/dev-agent')
              ? 'bg-primary text-white'
              : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          <Code2 className="w-5 h-5" />
          <span>Dev Agent</span>
        </Link>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-800 transition-colors text-sm"
        >
          ← Back to site
        </Link>
        <form action="/api/admin/auth" method="DELETE">
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-colors text-sm"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
