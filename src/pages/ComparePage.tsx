import React, { useState, useEffect } from 'react';
import { 
  Scan, 
  MinusCircle, 
  PlusCircle, 
  ArrowLeftRight,
  Play,
  RotateCcw
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useShortcuts } from '../lib/shortcuts';
import StatCard from '../components/StatCard';
import TextPanel from '../components/TextPanel';
import DiffViewer from '../components/DiffViewer';
import { calculateDiff, calculateStats } from '../utils/diffEngine';
import { DiffLine, ComparisonResult } from '../types';
import { cn } from '../lib/utils';

export default function ComparePage() {
  const { symbols } = useShortcuts();
  const location = useLocation();
  const [originalText, setOriginalText] = useState('');
  const [changedText, setChangedText] = useState('');
  const [diffLines, setDiffLines] = useState<DiffLine[] | null>(null);
  const [stats, setStats] = useState<ComparisonResult['stats'] | null>(null);
  const [isComparing, setIsComparing] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey;
      
      if (isMod && e.key === 'Enter' && !diffLines) {
        handleCompare();
      }
      
      if (isMod && e.key === 'l' && !diffLines) {
        e.preventDefault();
        handleReset();
      }

      if (e.key === 'Escape' && diffLines) {
        setDiffLines(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [originalText, changedText, diffLines]);

  useEffect(() => {
    if (location.state && (location.state.originalText || location.state.changedText)) {
      setOriginalText(location.state.originalText || '');
      setChangedText(location.state.changedText || '');
      // Clear state so it doesn't re-fill on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleCompare = () => {
    if (!originalText && !changedText) return;
    
    setIsComparing(true);
    // Simulate slight delay for UX
    setTimeout(() => {
      const lines = calculateDiff(originalText, changedText);
      const calculatedStats = calculateStats(lines, originalText, changedText);
      
      setDiffLines(lines);
      setStats(calculatedStats);
      setIsComparing(false);

      // Save to history
      const historyItem: ComparisonResult = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        originalText,
        changedText,
        diffLines: lines,
        stats: calculatedStats,
      };
      
      const existingHistory = JSON.parse(localStorage.getItem('tc_history') || '[]');
      localStorage.setItem('tc_history', JSON.stringify([historyItem, ...existingHistory.slice(0, 49)]));
    }, 400);
  };

  const handleReset = () => {
    setOriginalText('');
    setChangedText('');
    setDiffLines(null);
    setStats(null);
  };

  return (
    <div className="flex flex-col min-w-0 pb-24 lg:pb-12 bg-white dark:bg-slate-950 min-h-screen">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 sm:px-8 py-8 sm:py-10 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors"
      >
        <div className="max-w-6xl">
          <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">Compare texts instantly</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Paste or upload two files and quickly find the differences with precision diffing technology designed for developers.
          </p>
        </div>
      </motion.section>

      <div className="px-4 sm:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 max-w-full w-full">
        {/* Summary Panel */}
        <AnimatePresence>
          {stats && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 overflow-hidden"
            >
              <StatCard 
                icon={<Scan size={16} />} 
                label="Similarity" 
                value={`${stats.similarity}%`} 
                variant="default"
              />
              <StatCard 
                icon={<MinusCircle size={16} />} 
                label="Removals" 
                value={`${stats.removals}`} 
                variant="error"
              />
              <StatCard 
                icon={<PlusCircle size={16} />} 
                label="Additions" 
                value={`${stats.additions}`} 
                variant="success"
              />
              <StatCard 
                icon={<ArrowLeftRight size={16} />} 
                label="Changed" 
                value={`${stats.changes}`} 
                variant="warning"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Editors Area */}
        <AnimatePresence mode="wait">
          {!diffLines ? (
            <motion.div 
              key="inputs"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col lg:flex-row gap-4 lg:gap-0 lg:h-[calc(100vh-360px)] min-h-[400px] sm:min-h-[500px]"
            >
              <TextPanel 
                title="Original Text" 
                value={originalText} 
                onChange={setOriginalText}
                placeholder="Paste your original text here..."
              />
              <div className="w-px bg-slate-200 dark:bg-slate-800 hidden lg:block h-full"></div>
              <TextPanel 
                title="Changed Text" 
                value={changedText} 
                onChange={setChangedText}
                placeholder="Paste the version to compare against..."
              />
            </motion.div>
          ) : (
            <motion.div
              key="diff"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <DiffViewer 
                diffLines={diffLines} 
                onReset={() => setDiffLines(null)} 
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Bar (Desktop-ish) */}
        {!diffLines && (
          <motion.div 
            layout
            className="flex items-center justify-center sm:justify-between px-6 h-16 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900 shadow-sm"
          >
            <div className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
              <RotateCcw size={14} /> Ready to compare
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button 
                onClick={handleCompare}
                disabled={isComparing || (!originalText && !changedText)}
                className="flex-1 sm:flex-none px-8 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-blue-500/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <span>{isComparing ? 'Diffing...' : 'Compare Texts'}</span>
                {!isComparing && (
                  <span className="hidden md:flex items-center gap-0.5 bg-black/20 px-1.5 py-0.5 rounded text-[10px] opacity-80">
                    <span className="font-sans leading-none">{symbols.mod}</span>
                    <span className="font-sans leading-none">{symbols.enter}</span>
                  </span>
                )}
              </button>
              <button 
                onClick={handleReset}
                className="px-6 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold rounded-lg transition-all flex items-center gap-2"
              >
                <span>Clear</span>
                <span className="hidden md:flex items-center gap-0.5 bg-slate-300 dark:bg-slate-700 px-1.5 py-0.5 rounded text-[10px] opacity-80">
                  <span className="font-sans leading-none">{symbols.mod}</span>
                  <span className="font-sans leading-none">L</span>
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Mobile FAB */}
      <AnimatePresence>
        {!diffLines && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCompare}
            disabled={isComparing || (!originalText && !changedText)}
            className="fixed bottom-20 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center lg:hidden z-[60] disabled:bg-slate-400"
          >
            {isComparing ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Play size={24} fill="white" />}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
