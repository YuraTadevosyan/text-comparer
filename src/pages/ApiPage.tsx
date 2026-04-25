import React from 'react';
import { 
  Zap, 
  Terminal, 
  Shield, 
  Cpu,
  Lock,
  Globe,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';

export default function ApiPage() {
  return (
    <div className="flex flex-col min-w-0 pb-12 bg-white dark:bg-slate-950 min-h-screen">
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 sm:px-8 py-10 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors"
      >
        <div className="max-w-6xl">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight font-display">API & Integrations</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed text-sm sm:text-base">
            Embed the power of our diff engine directly into your enterprise workflows. Ultra-low latency, edge-ready API.
          </p>
        </div>
      </motion.section>

      <div className="px-4 sm:px-8 py-16 max-w-4xl w-full mx-auto">
        <div className="relative group overflow-hidden bg-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-3xl -ml-32 -mb-32"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20 
              }}
              className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/40"
            >
              <Cpu size={40} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-4">
                Enterprise Beta
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold mb-6 tracking-tighter">Coming Soon</h2>
              <p className="text-slate-400 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed mb-10">
                We're currently fine-tuning our REST and GraphQL endpoints for large-scale deployments. Sign up for early access.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 w-full"
            >
              <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl flex items-center gap-3 w-full sm:w-auto">
                <Terminal size={20} className="text-blue-400" />
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Protocol</p>
                  <p className="text-sm font-mono">gRPC / REST</p>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl flex items-center gap-3 w-full sm:w-auto">
                <Shield size={20} className="text-green-400" />
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Security</p>
                  <p className="text-sm font-mono">OAuth 2.0</p>
                </div>
              </div>
            </motion.div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-12 bg-white text-slate-900 px-10 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-slate-100 transition-all shadow-xl shadow-white/5"
            >
              Join the Waitlist <ArrowRight size={18} />
            </motion.button>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20">
          <div className="space-y-3">
            <div className="text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <Zap size={20} />
              <h3 className="font-bold">Lightning Fast</h3>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Optimized diffing algorithms running on high-performance edge nodes.</p>
          </div>
          <div className="space-y-3">
            <div className="text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <Lock size={20} />
              <h3 className="font-bold">Secure by Design</h3>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Zero-data retention policy for all API requests by default.</p>
          </div>
          <div className="space-y-3">
            <div className="text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <Globe size={20} />
              <h3 className="font-bold">Global Scale</h3>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Distributed architecture ensuring low latency worldwide.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
