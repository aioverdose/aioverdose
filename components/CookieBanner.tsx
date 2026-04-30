'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  preferences: boolean;
}

const defaultConsent: CookieConsent = {
  essential: true, // Always enabled
  analytics: false,
  preferences: false,
};

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>(defaultConsent);

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = localStorage.getItem('cookie-consent');
    if (!savedConsent) {
      setIsVisible(true);
    } else {
      const parsed = JSON.parse(savedConsent);
      setConsent(parsed);
    }
  }, []);

  const handleAcceptAll = () => {
    const fullConsent: CookieConsent = {
      essential: true,
      analytics: true,
      preferences: true,
    };
    localStorage.setItem('cookie-consent', JSON.stringify(fullConsent));
    setConsent(fullConsent);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const minimalConsent: CookieConsent = {
      essential: true,
      analytics: false,
      preferences: false,
    };
    localStorage.setItem('cookie-consent', JSON.stringify(minimalConsent));
    setConsent(minimalConsent);
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    setIsVisible(false);
  };

  const handleToggle = (key: keyof CookieConsent) => {
    if (key === 'essential') return; // Essential cannot be toggled
    setConsent((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-gray-900 dark:bg-gray-950 text-white shadow-lg border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {!showDetails ? (
            // Default view
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold mb-1">Cookie Preferences</h3>
                  <p className="text-sm text-gray-300">
                    We use cookies to improve your experience. See our{' '}
                    <a
                      href="/cookie-policy"
                      className="text-blue-400 hover:underline"
                    >
                      cookie policy
                    </a>{' '}
                    for details.
                  </p>
                </div>
                <button
                  onClick={() => handleRejectAll()}
                  className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 rounded transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={() => setShowDetails(true)}
                  className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 rounded transition-colors"
                >
                  Customize
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded transition-colors font-medium"
                >
                  Accept All
                </button>
              </div>
            </div>
          ) : (
            // Detailed view
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-semibold">Cookie Preferences</h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Cookie categories */}
              <div className="space-y-3 py-2 max-h-48 overflow-y-auto">
                {/* Essential */}
                <div className="flex items-start justify-between gap-4 pb-3 border-b border-gray-800">
                  <div>
                    <p className="font-medium">Essential Cookies</p>
                    <p className="text-sm text-gray-400">
                      Required for basic site functionality. Cannot be disabled.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={consent.essential}
                    disabled
                    className="mt-1"
                  />
                </div>

                {/* Analytics */}
                <div className="flex items-start justify-between gap-4 pb-3 border-b border-gray-800">
                  <div>
                    <p className="font-medium">Analytics Cookies</p>
                    <p className="text-sm text-gray-400">
                      Help us understand how you use the site. (Vercel Analytics, Plausible)
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={consent.analytics}
                    onChange={() => handleToggle('analytics')}
                    className="mt-1 cursor-pointer"
                  />
                </div>

                {/* Preferences */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">Preference Cookies</p>
                    <p className="text-sm text-gray-400">
                      Remember your dark mode choice and newsletter preferences.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={consent.preferences}
                    onChange={() => handleToggle('preferences')}
                    className="mt-1 cursor-pointer"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-gray-800">
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 rounded transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded transition-colors font-medium"
                >
                  Save Preferences
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 rounded transition-colors font-medium"
                >
                  Accept All
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
