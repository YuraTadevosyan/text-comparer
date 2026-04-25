import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-200 flex min-h-screen flex-col transition-colors duration-300">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 lg:ml-64 flex flex-col min-w-0 pb-16 lg:pb-0">
          <div className="flex-1">
            {children}
          </div>
          
          <footer className="h-10 px-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hidden sm:flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex gap-4 items-center font-mono">
              <span>ENCODING: UTF-8</span>
              <span className="hidden sm:block">LANGUAGE: AUTO-DETECT</span>
              <span className="text-blue-600 dark:text-blue-500 font-bold uppercase tracking-widest text-[9px]">Synced Scroll Enabled</span>
            </div>
            <div className="font-bold tracking-tight">© 2024 TC Utility - V2.4.0</div>
          </footer>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
