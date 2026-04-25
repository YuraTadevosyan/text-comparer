import React, { useState, useEffect } from 'react';
import { 
  History as HistoryIcon, 
  Trash2, 
  ExternalLink,
  Calendar,
  Layers,
  PlusCircle,
  MinusCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ComparisonResult } from '../types';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

export default function HistoryPage() {
  const [history, setHistory] = useState<ComparisonResult[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('tc_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const deleteItem = (id: string) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem('tc_history', JSON.stringify(updated));
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      setHistory([]);
      localStorage.removeItem('tc_history');
    }
  };

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(timestamp));
  };

  return (
    <div className="flex flex-col min-w-0 pb-12 bg-white dark:bg-slate-950 min-h-screen">
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 sm:px-8 py-10 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors"
      >
        <div className="max-w-6xl flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight font-display">Comparison History</h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed text-sm sm:text-base">
              Track and revisit your previous text comparisons. Data is stored locally in your browser.
            </p>
          </div>
          {history.length > 0 && (
            <button 
              onClick={clearHistory}
              className="text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 uppercase tracking-wider border border-red-200 dark:border-red-900/30"
            >
              <Trash2 size={14} /> Clear All
            </button>
          )}
        </div>
      </motion.section>

      <div className="px-4 sm:px-8 py-8 max-w-5xl w-full mx-auto">
        {history.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center space-y-6"
          >
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-400">
              <HistoryIcon size={40} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">No history yet</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                Your previous comparisons will appear here. Start by comparing some texts in the workspace.
              </p>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
            >
              Go to Workspace
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence mode="popLayout">
              {history.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-xl transition-all hover:border-blue-500/50 hover:shadow-lg flex flex-col md:flex-row gap-6 relative overflow-hidden"
                >
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                        <Calendar size={14} />
                        <span className="text-xs font-bold font-mono tracking-tighter">{formatDate(item.timestamp)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider",
                          item.stats.similarity > 80 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                          item.stats.similarity > 50 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                          "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        )}>
                          {item.stats.similarity}% Match
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-600 tracking-widest">Original</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 italic font-mono bg-slate-50 dark:bg-slate-950/50 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                          {item.originalText || '(Empty)'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-600 tracking-widest">Changed</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 italic font-mono bg-slate-50 dark:bg-slate-950/50 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                          {item.changedText || '(Empty)'}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 border-t border-slate-50 dark:border-slate-800/50">
                      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                        <PlusCircle size={14} className="text-green-500" />
                        <span className="text-xs font-bold font-mono tracking-tighter">{item.stats.additions}</span>
                        <span className="text-[10px] uppercase text-slate-400">Add</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                        <MinusCircle size={14} className="text-red-500" />
                        <span className="text-xs font-bold font-mono tracking-tighter">{item.stats.removals}</span>
                        <span className="text-[10px] uppercase text-slate-400">Rem</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                        <Layers size={14} className="text-amber-500" />
                        <span className="text-xs font-bold font-mono tracking-tighter">{item.stats.changes}</span>
                        <span className="text-[10px] uppercase text-slate-400">Chg</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-slate-50 dark:border-slate-800/50 pt-4 md:pt-0 md:pl-6 min-w-full md:min-w-[140px]">
                    <button 
                      onClick={() => {
                        navigate('/', { 
                          state: { 
                            originalText: item.originalText, 
                            changedText: item.changedText 
                          } 
                        });
                      }}
                      className="flex-1 flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 py-3 px-4 rounded-xl font-bold text-xs hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all active:scale-95"
                    >
                      <ExternalLink size={14} /> Open
                    </button>
                    <button 
                      onClick={() => deleteItem(item.id)}
                      className="flex items-center justify-center bg-red-50 dark:bg-red-950/20 text-red-600 p-3 rounded-xl hover:bg-red-600 hover:text-white transition-all active:scale-95"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

