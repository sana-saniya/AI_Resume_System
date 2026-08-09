import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Sparkles } from 'lucide-react';

const ComingSoonCard = ({ icon: Icon, title, description, badge = "Coming Soon", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -3, scale: 1.01 }}
      className="glass-card rounded-2xl p-6 relative overflow-hidden border border-slate-200/80 bg-white/50 opacity-85 hover:opacity-100 transition-all duration-300 group cursor-not-allowed"
    >
      {/* Top Banner Status */}
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50/80 border border-indigo-100/80 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
          <Icon className="w-6 h-6" />
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-xs font-bold shadow-xs">
          <Lock className="w-3.5 h-3.5 text-slate-400" />
          <span>{badge}</span>
        </div>
      </div>

      <h3 className="text-lg font-bold text-slate-900 font-poppins group-hover:text-indigo-600 transition-colors flex items-center gap-2">
        {title}
      </h3>

      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
        {description}
      </p>

      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Planned AI Engine
        </span>
        <span className="text-indigo-500 group-hover:underline">Review 2 Feature</span>
      </div>
    </motion.div>
  );
};

export default ComingSoonCard;
