import React from 'react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  variant?: 'default' | 'error' | 'success' | 'warning';
}

export default function StatCard({ icon, label, value, variant = 'default' }: StatCardProps) {
  const valueColor = {
    default: "text-blue-600 dark:text-blue-400",
    error: "text-red-600 dark:text-red-400",
    success: "text-green-600 dark:text-green-400",
    warning: "text-yellow-600 dark:text-yellow-400",
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="flex flex-col items-center justify-center p-3 sm:p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50 shadow-sm hover:shadow-md"
    >
      <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 font-bold mb-1">{label}</span>
      <div className="flex items-center gap-2">
        <span className={cn("hidden sm:block opacity-50", valueColor[variant])}>{icon}</span>
        <span className={cn("font-mono text-base sm:text-lg font-bold tracking-tighter", valueColor[variant])}>{value}</span>
      </div>
    </motion.div>
  );
}
