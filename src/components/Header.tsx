import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import { 
  Sun, 
  Moon, 
  HelpCircle, 
  UserCircle,
  Layout as LayoutIcon,
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white/50 dark:bg-slate-900/50 backdrop-blur-md z-50 sticky top-0 transition-colors">
      <div className="flex items-center gap-8">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">TC</div>
          <span className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">TextComparer</span>
        </NavLink>
        <nav className="hidden md:flex items-center h-16 space-x-2">
          <NavLink 
            to="/" 
            className={({ isActive }) => cn(
              "px-3 h-full flex items-center transition-all duration-200 text-sm font-medium border-b-2",
              isActive 
                ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 bg-slate-100 dark:bg-slate-800/30" 
                : "text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-slate-200"
            )}
          >
            Compare
          </NavLink>
          <NavLink 
            to="/history" 
            className={({ isActive }) => cn(
              "px-3 h-full flex items-center transition-all duration-200 text-sm font-medium border-b-2",
              isActive 
                ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 bg-slate-100 dark:bg-slate-800/30" 
                : "text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-slate-200"
            )}
          >
            History
          </NavLink>
        </nav>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
           <NavLink to="/" className={({isActive}) => cn("px-3 py-1 text-xs rounded transition-all", isActive ? "bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200")}>Diff</NavLink>
           <NavLink to="/history" className={({isActive}) => cn("px-3 py-1 text-xs rounded transition-all", isActive ? "bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200")}>History</NavLink>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleTheme}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500 dark:text-slate-400"
          >
            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
