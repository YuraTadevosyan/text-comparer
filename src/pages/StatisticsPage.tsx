import React, { useMemo } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { ComparisonResult } from '../types';

export default function StatisticsPage() {
  const history: ComparisonResult[] = useMemo(() => {
    const saved = localStorage.getItem('tc_history');
    return saved ? JSON.parse(saved) : [];
  }, []);

  const stats = useMemo(() => {
    if (history.length === 0) return null;

    const totalAdditions = history.reduce((acc, curr) => acc + curr.stats.additions, 0);
    const totalRemovals = history.reduce((acc, curr) => acc + curr.stats.removals, 0);
    const totalChanges = history.reduce((acc, curr) => acc + curr.stats.changes, 0);
    const avgSimilarity = history.reduce((acc, curr) => acc + curr.stats.similarity, 0) / history.length;

    return {
      totalAdditions,
      totalRemovals,
      totalChanges,
      avgSimilarity: Math.round(avgSimilarity),
      totalComparisons: history.length
    };
  }, [history]);

  return (
    <div className="flex flex-col min-w-0 pb-12 bg-white dark:bg-slate-950 min-h-screen">
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 sm:px-8 py-10 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors"
      >
        <div className="max-w-6xl">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight font-display">Performance Insights</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed text-sm sm:text-base">
            Deep dive into your text modification patterns over time. Monitor removals, additions, and overall similarity trends.
          </p>
        </div>
      </motion.section>

      <div className="px-4 sm:px-8 py-8 max-w-6xl w-full mx-auto space-y-8">
        {!stats ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Activity className="w-16 h-16 text-slate-200 dark:text-slate-800 mb-6" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">No data available</h2>
            <p className="text-slate-500 max-w-xs mt-2">Start comparing texts to see your statistics populated here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Primary Stats */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="col-span-1 lg:col-span-2 grid grid-cols-2 gap-4"
            >
              <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/20 flex flex-col justify-between">
                <div>
                  <div className="bg-white/20 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp size={20} />
                  </div>
                  <p className="text-sm font-bold uppercase tracking-wider opacity-80">Total Comparisons</p>
                  <h3 className="text-4xl font-bold mt-1">{stats.totalComparisons}</h3>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold mt-6">
                  <ArrowUpRight size={14} /> 12% vs last week
                </div>
              </div>

              <div className="bg-slate-900 dark:bg-white p-6 rounded-2xl text-white dark:text-slate-900 flex flex-col justify-between">
                <div>
                  <div className="bg-white/10 dark:bg-slate-100 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 size={20} />
                  </div>
                  <p className="text-sm font-bold uppercase tracking-wider opacity-60">Avg. Similarity</p>
                  <h3 className="text-4xl font-bold mt-1">{stats.avgSimilarity}%</h3>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold mt-6 opacity-60">
                  <Clock size={14} /> Calculated from all time
                </div>
              </div>
            </motion.div>

            {/* Minor Stats */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em] mb-1">Code Additions</p>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold text-green-600">{stats.totalAdditions}</span>
                    <span className="text-xs text-slate-400 pb-1 italic font-mono tracking-tighter">lines added</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em] mb-1">Code Removals</p>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold text-red-500">{stats.totalRemovals}</span>
                    <span className="text-xs text-slate-400 pb-1 italic font-mono tracking-tighter">lines removed</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em] mb-1">Files Changed</p>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold text-amber-500">{stats.totalChanges}</span>
                    <span className="text-xs text-slate-400 pb-1 italic font-mono tracking-tighter">lines modified</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
