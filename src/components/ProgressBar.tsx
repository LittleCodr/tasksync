import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import confetti from 'canvas-confetti';
import { AlertTriangle } from 'lucide-react';
import { useTheme } from '../store/themeStore';

interface ProgressBarProps {
  completed: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ completed, total }) => {
  const { theme } = useTheme();
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  const controls = useAnimation();

  useEffect(() => {
    if (percentage === 100) {
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    
    controls.start({
      width: `${percentage}%`,
      transition: { duration: 0.5, ease: "easeOut" }
    });
  }, [percentage, controls]);

  const isLowProgress = total > 3 && percentage < 30;

  const getEmoji = () => {
    if (percentage === 100) return "🎉";
    if (percentage >= 75) return "😄";
    if (percentage >= 50) return "🙂";
    if (percentage >= 25) return "😐";
    return "😟";
  };

  return (
    <div className="relative">
      <div className={`w-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-full h-6 relative overflow-hidden shadow-inner`}>
        <motion.div
          initial={{ width: 0 }}
          animate={controls}
          className={`h-full rounded-full ${
            percentage === 100
              ? 'bg-gradient-to-r from-green-400 to-green-500'
              : isLowProgress
              ? 'bg-gradient-to-r from-red-400 to-red-500'
              : 'bg-gradient-to-r from-blue-500 to-blue-600'
          }`}
        />
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white"
        >
          {percentage}% {getEmoji()}
        </motion.span>
      </div>

      {isLowProgress && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`absolute -right-64 top-0 ${
            theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-700'
          } px-4 py-2 rounded-lg flex items-center gap-2`}
        >
          <AlertTriangle size={16} />
          <span className="text-sm">Many tasks pending! Time to focus!</span>
        </motion.div>
      )}
    </div>
  );
};