'use client';

import Link from 'next/link';
import { FileText, Settings, MessageSquare, BookOpen } from 'lucide-react';

interface CMSCard {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const cmsCards: CMSCard[] = [
  {
    href: '/admin/cms/guides',
    icon: <BookOpen className="w-8 h-8" />,
    title: 'Guides',
    description: 'Manage blog posts and educational guides',
  },
  {
    href: '/admin/cms/content',
    icon: <FileText className="w-8 h-8" />,
    title: 'Site Content',
    description: 'Edit hero, FAQs, and homepage copy',
  },
  {
    href: '/admin/cms/audit-config',
    icon: <Settings className="w-8 h-8" />,
    title: 'Audit Configuration',
    description: 'Manage audit weights and thresholds',
  },
  {
    href: '/admin/cms/submissions',
    icon: <MessageSquare className="w-8 h-8" />,
    title: 'Form Submissions',
    description: 'View and manage contact form inbox',
  },
];

export default function CMSPage() {
  return (
    <div className="flex-1 p-8">
      <div className="max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Content Management System
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage all site content and configuration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cmsCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group block p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary dark:hover:border-primary hover:shadow-lg dark:hover:shadow-primary/10 transition-all"
            >
              <div className="text-primary mb-4 group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
