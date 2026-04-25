import React, { useRef } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface TextPanelProps {
  title: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
}

export default function TextPanel({ title, value, onChange, placeholder, icon }: TextPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        onChange(text);
      }
    };
    reader.readAsText(file);
  };

  const lineCount = value.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 15) }, (_, i) => i + 1);

  return (
    <div className="flex flex-col flex-1 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-all focus-within:ring-1 focus-within:ring-blue-500/50">
      <div className="h-10 px-4 flex items-center justify-between bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
          {icon || <FileText size={12} />} {title}
        </span>
        <div className="flex gap-2 items-center">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline font-bold"
          >
            Upload File
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            className="hidden" 
            accept=".txt,.json,.js,.ts,.css,.html"
          />
        </div>
      </div>
      
      <div className="flex-1 bg-white dark:bg-slate-950 font-mono text-[13px] flex overflow-hidden">
        <div className="w-12 bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-600 text-right pr-2 pt-4 select-none border-r border-slate-200 dark:border-slate-800 leading-6">
          {lineNumbers.map(n => <div key={n}>{n}</div>)}
        </div>
        <textarea 
          className="flex-1 bg-transparent p-4 outline-none resize-none placeholder:text-slate-300 dark:placeholder:text-slate-800 text-slate-800 dark:text-slate-200 leading-6 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800"
          placeholder={placeholder || "Paste your text here..."}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
