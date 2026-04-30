'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const steps = [
  'Fetching page...',
  'Parsing structure...',
  'Checking schema...',
  'Analyzing content...',
  'Evaluating trust signals...',
  'Generating report...',
];

interface LoadingScannerProps {
  onCancel?: () => void;
}

export function LoadingScanner({ onCancel }: LoadingScannerProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center justify-center py-16 space-y-8">
      {/* Scanner Visualization */}
      <div className="relative w-48 h-48">
        {/* Outer rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary" />
        </motion.div>

        {/* Middle rotating ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-4 rounded-full border-2 border-transparent border-b-primary border-l-primary" />
        </motion.div>

        {/* Inner pulsing circle */}
        <motion.div
          animate={{ scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="absolute inset-8 rounded-full border-2 border-primary bg-primary/5" />
        </motion.div>

        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="text-primary font-bold text-3xl">
              ⚡
            </div>
          </motion.div>
        </div>

        {/* Scan line */}
        <motion.div
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </div>

      {/* Steps */}
      <div className="space-y-3 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Running Analysis</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-full bg-gradient-to-r from-primary to-primary/60" />
          </motion.div>
        </div>

        {/* Step list */}
        <div className="space-y-2 pt-4">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: idx <= currentStep ? 1 : 0.5 }}
            >
              <div className="flex items-center gap-2 text-sm">
                {idx < currentStep ? (
                  <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</span>
                ) : idx === currentStep ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                    <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent" />
                  </motion.div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                )}
                <span className={idx <= currentStep ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400'}>
                  {step}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

        {/* Cancel button */}
        {onCancel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <button
              onClick={onCancel}
              className="mt-8 px-6 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
