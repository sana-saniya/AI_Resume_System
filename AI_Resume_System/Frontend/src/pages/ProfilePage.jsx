import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, ShieldCheck, Key, Calendar, Cpu, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, token } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Title */}
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-900 font-poppins">
          User Account & Security Profile
        </h2>
        <p className="text-xs text-slate-500">
          JWT Authentication credentials & candidate account status
        </p>
      </div>

      {/* Main Profile Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl p-8 border border-white/60 shadow-xl space-y-8"
      >
        {/* User Avatar & Identity Header */}
        <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
            {user?.name?.slice(0, 2).toUpperCase() || "AI"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-slate-900 font-poppins">{user?.name || "Candidate User"}</h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                JWT Authenticated
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{user?.email || "candidate@example.com"}</p>
            <p className="text-[11px] text-indigo-600 font-semibold mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Capstone Review 1 Verified Account
            </p>
          </div>
        </div>

        {/* Profile Attributes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-600" /> Account Name
            </span>
            <p className="font-bold text-slate-900 text-sm font-poppins">{user?.name || "Alex Morgan"}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-indigo-600" /> Email Identity
            </span>
            <p className="font-bold text-slate-900 text-sm font-poppins">{user?.email || "alex.morgan@example.com"}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-indigo-600" /> JWT Session Token
            </span>
            <p className="font-mono text-xs text-slate-600 truncate mt-1 bg-white p-2 rounded-lg border border-slate-200">
              {token ? `${token.slice(0, 30)}...` : 'Bearer Session Active'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-indigo-600" /> System Access
            </span>
            <p className="font-bold text-emerald-600 text-sm font-poppins flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Full Review 1 Access
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
