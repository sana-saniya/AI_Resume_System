import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, title, value, statusText, statusBadge, comingSoon = false, color = "indigo" }) => {
  const colorMap = {
    indigo: "from-indigo-500 to-blue-600 text-indigo-600 bg-indigo-50 border-indigo-100",
    emerald: "from-emerald-500 to-teal-600 text-emerald-600 bg-emerald-50 border-emerald-100",
    blue: "from-blue-500 to-cyan-600 text-blue-600 bg-blue-50 border-blue-100",
    amber: "from-amber-500 to-orange-600 text-amber-600 bg-amber-50 border-amber-100",
    purple: "from-purple-500 to-indigo-600 text-purple-600 bg-purple-50 border-purple-100",
  };

  const colorStyle = colorMap[color] || colorMap.indigo;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="glass-card rounded-2xl p-6 relative overflow-hidden border border-white/60 shadow-xl shadow-indigo-100/30"
    >
      {/* Decorative Gradient Glow */}
      <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-gradient-to-br ${colorStyle.split(' ')[0]} ${colorStyle.split(' ')[1]} opacity-10 blur-xl`}></div>

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-2 font-poppins">{value}</h3>
        </div>

        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm ${colorStyle.split(' ').slice(2).join(' ')}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100/80">
        <span className="text-xs font-medium text-slate-500">{statusText}</span>

        {comingSoon ? (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-200 uppercase tracking-wider">
            Coming Soon
          </span>
        ) : (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
            {statusBadge}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
