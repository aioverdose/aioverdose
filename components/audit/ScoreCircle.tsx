'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ScoreCircleProps {
  score: number;
  grade: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ScoreCircle({ score, grade, size = 'lg' }: ScoreCircleProps) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let currentScore = 0;
    const interval = setInterval(() => {
      currentScore += Math.ceil(score / 30);
      if (currentScore >= score) {
        setDisplayScore(score);
        clearInterval(interval);
      } else {
        setDisplayScore(currentScore);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [score]);

  const getColor = (s: number) => {
    if (s >= 80) return 'from-green-500 to-emerald-600';
    if (s >= 50) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-rose-600';
  };

  const getGradeBg = (g: string) => {
    if (g === 'A') return 'bg-green-100 text-green-700';
    if (g === 'B') return 'bg-blue-100 text-blue-700';
    if (g === 'C') return 'bg-yellow-100 text-yellow-700';
    if (g === 'D') return 'bg-orange-100 text-orange-700';
    return 'bg-red-100 text-red-700';
  };

  const sizeMap = {
    sm: { container: 'w-32 h-32', text: 'text-4xl', gradeSize: 'text-sm' },
    md: { container: 'w-48 h-48', text: 'text-6xl', gradeSize: 'text-lg' },
    lg: { container: 'w-64 h-64', text: 'text-8xl', gradeSize: 'text-2xl' },
  };

  const config = sizeMap[size];
  const circumference = 2 * Math.PI * 60;
  const strokeDashoffset = circumference * ((100 - score) / 100);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className={`relative ${config.container} flex items-center justify-center`}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r="60" fill="none" stroke="#e5e7eb" strokeWidth="8" />
        <motion.circle
          cx="70"
          cy="70"
          r="60"
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={score >= 80 ? '#10b981' : score >= 50 ? '#eab308' : '#ef4444'} />
            <stop offset="100%" stopColor={score >= 80 ? '#059669' : score >= 50 ? '#ea580c' : '#f43f5e'} />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="text-center">
            <div className={`${config.text} font-bold bg-gradient-to-r ${getColor(score)} bg-clip-text text-transparent`}>
              {displayScore}
            </div>
            <div className={`${getGradeBg(grade)} ${config.gradeSize} font-bold rounded-full w-12 h-12 flex items-center justify-center mx-auto mt-2`}>
              {grade}
            </div>
          </div>
        </motion.div>
      </div>
      </div>
    </motion.div>
  );
}
