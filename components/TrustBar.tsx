import { Shield, Lock, Award } from 'lucide-react';

export default function TrustBar() {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 border-y border-gray-200 dark:border-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Privacy First */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <Lock className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Privacy First
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                No tracking pixels, no data selling. Your privacy is protected.
              </p>
            </div>
          </div>

          {/* Transparent */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <Shield className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Fully Transparent
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Affiliate links are clearly marked. We disclose everything.
              </p>
            </div>
          </div>

          {/* Independent */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <Award className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Independent
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Not affiliated with any AI company. We're here to help creators.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
