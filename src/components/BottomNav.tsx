import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Code, 
  History, 
  Settings,
  BarChart3
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function BottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-around items-center h-16 px-4 z-[70] transition-colors pb-safe">
      <NavLink 
        to="/" 
        className={({ isActive }) => cn(
          "flex flex-col items-center gap-1 transition-all",
          isActive ? "text-blue-600 dark:text-blue-400 scale-110" : "text-slate-500 dark:text-slate-400"
        )}
      >
        <Code size={20} />
        <span className="text-[10px] font-bold uppercase tracking-tighter">Compare</span>
      </NavLink>
      <NavLink 
        to="/history" 
        className={({ isActive }) => cn(
          "flex flex-col items-center gap-1 transition-all",
          isActive ? "text-blue-600 dark:text-blue-400 scale-110" : "text-slate-500 dark:text-slate-400"
        )}
      >
        <History size={20} />
        <span className="text-[10px] font-bold uppercase tracking-tighter">History</span>
      </NavLink>
      <NavLink 
        to="/statistics" 
        className={({ isActive }) => cn(
          "flex flex-col items-center gap-1 transition-all",
          isActive ? "text-blue-600 dark:text-blue-400 scale-110" : "text-slate-500 dark:text-slate-400"
        )}
      >
        <BarChart3 size={20} />
        <span className="text-[10px] font-bold uppercase tracking-tighter">Stats</span>
      </NavLink>
      <NavLink 
        to="/settings" 
        className={({ isActive }) => cn(
          "flex flex-col items-center gap-1 transition-all",
          isActive ? "text-blue-600 dark:text-blue-400 scale-110" : "text-slate-500 dark:text-slate-400"
        )}
      >
        <Settings size={20} />
        <span className="text-[10px] font-bold uppercase tracking-tighter">Setup</span>
      </NavLink>
    </nav>
  );
}
