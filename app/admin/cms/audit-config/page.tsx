'use client';

import { useEffect, useState } from 'react';
import WeightSlider from '@/components/admin/WeightSlider';

interface AuditConfig {
  weights: {
    structure: number;
    schema: number;
    content: number;
    faq: number;
    trust: number;
    technical: number;
  };
  thresholds: {
    pass: number;
    warning: number;
    fail: number;
  };
}

export default function AuditConfigPage() {
  const [config, setConfig] = useState<AuditConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await fetch('/api/admin/audit-config');
      if (!response.ok) throw new Error('Failed to fetch config');
      const data = await response.json();
      setConfig(data);
    } catch (err) {
      setError('Failed to load audit configuration');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!config) return;

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/admin/audit-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (!response.ok) throw new Error('Failed to save config');

      setSuccess('Audit configuration saved successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save configuration');
    } finally {
      setSaving(false);
    }
  };

  const handleWeightChange = (key: keyof AuditConfig['weights'], value: number) => {
    if (!config) return;

    const newWeights = { ...config.weights, [key]: value };
    const total = Object.values(newWeights).reduce((a, b) => a + b, 0);

    if (total <= 1.001) {
      setConfig({
        ...config,
        weights: newWeights,
      });
    }
  };

  const handleThresholdChange = (key: keyof AuditConfig['thresholds'], value: number) => {
    if (!config) return;
    setConfig({
      ...config,
      thresholds: {
        ...config.thresholds,
        [key]: value,
      },
    });
  };

  if (loading) {
    return (
      <div className="flex-1 p-8">
        <p className="text-gray-600 dark:text-gray-400">Loading audit configuration...</p>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="flex-1 p-8">
        <p className="text-red-600 dark:text-red-400">{error || 'Failed to load configuration'}</p>
      </div>
    );
  }

  const totalWeight = Object.values(config.weights).reduce((a, b) => a + b, 0);
  const isValid = Math.abs(totalWeight - 1) < 0.001;

  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Audit Configuration
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage audit scoring weights and thresholds
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
            {success}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 space-y-8">
          {/* Weights Section */}
          <div className="space-y-6 pb-8 border-b border-gray-200 dark:border-gray-700">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Category Weights
                </h2>
                <div className="text-sm">
                  <span className={`font-semibold ${isValid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    Total: {(totalWeight * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Adjust the weight for each audit category. The total must equal 100%.
              </p>
            </div>

            <div className="space-y-4">
              <WeightSlider
                label="Structure"
                value={config.weights.structure}
                onChange={(value) => handleWeightChange('structure', value)}
              />
              <WeightSlider
                label="Schema"
                value={config.weights.schema}
                onChange={(value) => handleWeightChange('schema', value)}
              />
              <WeightSlider
                label="Content"
                value={config.weights.content}
                onChange={(value) => handleWeightChange('content', value)}
              />
              <WeightSlider
                label="FAQ"
                value={config.weights.faq}
                onChange={(value) => handleWeightChange('faq', value)}
              />
              <WeightSlider
                label="Trust"
                value={config.weights.trust}
                onChange={(value) => handleWeightChange('trust', value)}
              />
              <WeightSlider
                label="Technical"
                value={config.weights.technical}
                onChange={(value) => handleWeightChange('technical', value)}
              />
            </div>
          </div>

          {/* Thresholds Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Score Thresholds
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Define the score ranges for pass, warning, and fail statuses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Pass Threshold
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={config.thresholds.pass}
                  onChange={(e) =>
                    handleThresholdChange('pass', parseInt(e.target.value) || 0)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Warning Threshold
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={config.thresholds.warning}
                  onChange={(e) =>
                    handleThresholdChange('warning', parseInt(e.target.value) || 0)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Fail Threshold
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={config.thresholds.fail}
                  onChange={(e) =>
                    handleThresholdChange('fail', parseInt(e.target.value) || 0)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-4 pt-8 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleSave}
              disabled={saving || !isValid}
              title={!isValid ? 'Weights must total 100%' : ''}
              className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Configuration'}
            </button>
            {!isValid && (
              <span className="text-sm text-red-600 dark:text-red-400 flex items-center">
                Weights must total 100% (currently {(totalWeight * 100).toFixed(1)}%)
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
