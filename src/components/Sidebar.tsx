import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Code, 
  History, 
  BarChart3, 
  Database,
  Terminal
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col pt-6 bg-white dark:bg-slate-950 fixed left-0 h-screen w-64 border-r border-slate-200 dark:border-slate-800 z-40 transition-colors">
      <div className="px-6 mb-8">
        <h3 className="text-slate-900 dark:text-white font-bold text-xl font-display tracking-tight">Workbench</h3>
        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mt-1 font-bold">V2.4.0</p>
      </div>
      
      <nav className="flex-1 text-[11px] uppercase tracking-[0.15em] font-bold">
        <NavLink 
          to="/" 
          className={({ isActive }) => cn(
            "flex items-center px-6 py-3.5 transition-all duration-200 border-l-4",
            isActive 
              ? "bg-slate-100 dark:bg-slate-900 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400" 
              : "text-slate-500 dark:text-slate-400 border-transparent hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-200"
          )}
        >
          <Code className="mr-3 w-4 h-4" /> Workspace
        </NavLink>
        <NavLink 
          to="/history" 
          className={({ isActive }) => cn(
            "flex items-center px-6 py-3.5 transition-all duration-200 border-l-4",
            isActive 
              ? "bg-slate-100 dark:bg-slate-900 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400" 
              : "text-slate-500 dark:text-slate-400 border-transparent hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-200"
          )}
        >
          <History className="mr-3 w-4 h-4" /> History
        </NavLink>
        <NavLink 
          to="/statistics" 
          className={({ isActive }) => cn(
            "flex items-center px-6 py-3.5 transition-all duration-200 border-l-4",
            isActive 
              ? "bg-slate-100 dark:bg-slate-900 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400" 
              : "text-slate-500 dark:text-slate-400 border-transparent hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-200"
          )}
        >
          <BarChart3 className="mr-3 w-4 h-4" /> Statistics
        </NavLink>
        <NavLink 
          to="/api" 
          className={({ isActive }) => cn(
            "flex items-center px-6 py-3.5 transition-all duration-200 border-l-4",
            isActive 
              ? "bg-slate-100 dark:bg-slate-900 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400" 
              : "text-slate-500 dark:text-slate-400 border-transparent hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-200"
          )}
        >
          <Terminal className="mr-3 w-4 h-4" /> API
        </NavLink>
      </nav>

      <div className="p-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
          <Database size={12} />
          <span>Sync: Cloud Enabled</span>
        </div>
      </div>
    </aside>
  );
}
