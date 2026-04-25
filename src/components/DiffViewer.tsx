import React, { useMemo, useRef, useEffect } from 'react';
import { Copy, RefreshCcw, ArrowRightLeft } from 'lucide-react';
import { DiffLine } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { calculateCharDiff } from '../utils/diffEngine';
import { useShortcuts } from '../lib/shortcuts';

interface DiffViewerProps {
  diffLines: DiffLine[];
  onReset: () => void;
}

interface AlignedRow {
  left?: {
    num?: number;
    text: string;
    type: 'removed' | 'unchanged';
  };
  right?: {
    num?: number;
    text: string;
    type: 'added' | 'unchanged';
  };
}

function HighlightedText({ text, type, otherText }: { text: string; type: 'added' | 'removed' | 'unchanged'; otherText?: string }) {
  if (type === 'unchanged' || !otherText) {
    return <span>{text}</span>;
  }

  const diff = type === 'removed' 
    ? calculateCharDiff(text, otherText) 
    : calculateCharDiff(otherText, text);

  return (
    <>
      {diff.map((part, idx) => {
        // For 'removed' type (left side), we highlight parts that were removed (not added to other side)
        // For 'added' type (right side), we highlight parts that were added (not in other side)
        const shouldHighlight = type === 'removed' ? part.removed : part.added;
        const shouldSkip = type === 'removed' ? part.added : part.removed;

        if (shouldSkip) return null;

        return (
          <span 
            key={idx} 
            className={cn(
              shouldHighlight && type === 'removed' ? "bg-red-300 dark:bg-red-800/60 text-red-950 dark:text-red-100 rounded-sm px-0.5" : "",
              shouldHighlight && type === 'added' ? "bg-green-300 dark:bg-green-800/60 text-green-950 dark:text-green-100 rounded-sm px-0.5" : ""
            )}
          >
            {part.value}
          </span>
        );
      })}
    </>
  );
}

export default function DiffViewer({ diffLines, onReset }: DiffViewerProps) {
  const { symbols } = useShortcuts();
  const containerRef = useRef<HTMLDivElement>(null);

  const alignedRows = useMemo(() => {
    const rows: AlignedRow[] = [];
    let i = 0;

    while (i < diffLines.length) {
      const current = diffLines[i];

      if (current.type === 'unchanged') {
        rows.push({
          left: { num: current.leftLineNumber, text: current.content, type: 'unchanged' },
          right: { num: current.rightLineNumber, text: current.content, type: 'unchanged' }
        });
        i++;
      } else if (current.type === 'removed') {
        // Collect all consecutive removals
        const removals: DiffLine[] = [];
        while (i < diffLines.length && diffLines[i].type === 'removed') {
          removals.push(diffLines[i]);
          i++;
        }

        // Collect all consecutive additions immediately following
        const additions: DiffLine[] = [];
        while (i < diffLines.length && diffLines[i].type === 'added') {
          additions.push(diffLines[i]);
          i++;
        }

        // Pair them up
        const max = Math.max(removals.length, additions.length);
        for (let j = 0; j < max; j++) {
          rows.push({
            left: removals[j] ? { num: removals[j].leftLineNumber, text: removals[j].content, type: 'removed' } : undefined,
            right: additions[j] ? { num: additions[j].rightLineNumber, text: additions[j].content, type: 'added' } : undefined
          });
        }
      } else if (current.type === 'added') {
        // If we hit an addition without preceding removal (already handled above if they co-exist)
        rows.push({
          right: { num: current.rightLineNumber, text: current.content, type: 'added' }
        });
        i++;
      }
    }
    return rows;
  }, [diffLines]);

  const copyToClipboard = () => {
    const text = diffLines.map(l => l.content).join('\n');
    navigator.clipboard.writeText(text);
  };

  const additions = diffLines.filter(l => l.type === 'added').length;
  const removals = diffLines.filter(l => l.type === 'removed').length;

  return (
    <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl transition-all rounded-2xl flex flex-col h-[70vh]">
      <div className="h-16 px-6 shrink-0 flex items-center justify-between bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-10">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Analysis Result</h2>
            <div className="flex items-center gap-2 mt-1">
              <ArrowRightLeft size={12} className="text-blue-500" />
              <span className="text-[10px] font-bold text-slate-400 uppercase">Side-by-Side View</span>
            </div>
          </div>
          
          <div className="flex gap-3 px-4 border-l border-slate-200 dark:border-slate-800">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-bold text-slate-400">Additions</span>
              <span className="text-green-600 dark:text-green-400 font-mono font-bold">+{additions}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-bold text-slate-400">Removals</span>
              <span className="text-red-600 dark:text-red-400 font-mono font-bold">-{removals}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={copyToClipboard}
            className="p-2.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400 flex items-center gap-2 transition-all active:scale-95 group"
            title="Copy all lines"
          >
            <Copy size={18} className="group-hover:text-blue-500 transition-colors" />
            <span className="text-xs hidden sm:block font-bold">Copy Full</span>
          </button>
          <button 
            onClick={onReset}
            className="p-2.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400 flex items-center gap-2 transition-all active:scale-95 group"
            title="Return to editor (Esc)"
          >
             <RefreshCcw size={18} className="group-hover:text-amber-500 transition-colors" />
             <span className="text-xs hidden sm:block font-bold">Back</span>
             <span className="hidden md:flex bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[10px] font-sans opacity-60">Esc</span>
          </button>
        </div>
      </div>
      
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-900/20 editor-container"
      >
        <div className="min-w-full inline-block">
          {alignedRows.length === 0 ? (
            <div className="px-6 py-24 text-center text-slate-400 dark:text-slate-600 bg-white dark:bg-slate-950">
              <div className="flex justify-center mb-4">
                <ArrowRightLeft size={40} className="opacity-20" />
              </div>
              <p className="font-bold">Analysis complete. No differences detected.</p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800/50">
                {alignedRows.map((row, idx) => (
                  <div key={idx} className="flex min-w-full">
                    {/* Left Pane */}
                    <div className={cn(
                      "flex-1 border-r border-slate-200 dark:border-slate-800 flex transition-colors",
                      row.left?.type === 'removed' ? "bg-red-500/10 dark:bg-red-500/20" : "bg-transparent"
                    )}>
                      <div className="w-12 shrink-0 bg-slate-100/50 dark:bg-slate-900/50 text-slate-400 dark:text-slate-500 text-right pr-3 select-none text-[10px] font-mono flex items-center justify-end h-7 border-r border-slate-200 dark:border-slate-800/50">
                        {row.left?.num || ''}
                      </div>
                      <div className={cn(
                        "px-4 py-1 whitespace-pre font-mono text-[13px] flex-1 min-h-[1.75rem] flex items-center",
                        row.left?.type === 'removed' ? "text-red-800 dark:text-red-300" : "text-slate-600 dark:text-slate-400 opacity-60"
                      )}>
                        <HighlightedText 
                          text={row.left?.text || ''} 
                          type={row.left?.type || 'unchanged'} 
                          otherText={row.right?.text}
                        />
                      </div>
                    </div>

                    {/* Right Pane */}
                    <div className={cn(
                      "flex-1 flex transition-colors",
                      row.right?.type === 'added' ? "bg-green-500/10 dark:bg-green-500/20" : "bg-transparent"
                    )}>
                      <div className="w-12 shrink-0 bg-slate-100/50 dark:bg-slate-900/50 text-slate-400 dark:text-slate-500 text-right pr-3 select-none text-[10px] font-mono flex items-center justify-end h-7 border-r border-slate-200 dark:border-slate-800/50">
                        {row.right?.num || ''}
                      </div>
                      <div className={cn(
                        "px-4 py-1 whitespace-pre font-mono text-[13px] flex-1 min-h-[1.75rem] flex items-center",
                        row.right?.type === 'added' ? "text-green-800 dark:text-green-300" : "text-slate-600 dark:text-slate-400"
                      )}>
                        <HighlightedText 
                          text={row.right?.text || ''} 
                          type={row.right?.type || 'unchanged'} 
                          otherText={row.left?.text}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="shrink-0 h-10 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between">
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-sm bg-red-500"></div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Removed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-sm bg-green-500"></div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Added</span>
          </div>
        </div>
        <div className="text-[10px] font-mono text-slate-400 tracking-tighter">
          {alignedRows.length} total lines compared
        </div>
      </div>
    </div>
  );
}
