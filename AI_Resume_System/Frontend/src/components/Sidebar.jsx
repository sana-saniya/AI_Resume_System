import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UploadCloud, 
  FileText, 
  User, 
  Briefcase, 
  TrendingUp, 
  MessageSquareCode, 
  Lock, 
  Sparkles,
  Cpu
} from 'lucide-react';

const Sidebar = () => {
  const activeNavClass = "flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/20 transition-all duration-200";
  const inactiveNavClass = "flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-sm text-slate-600 hover:text-indigo-600 hover:bg-white/80 transition-all duration-200";

  return (
    <aside className="w-72 min-h-screen glass-sidebar p-6 flex flex-col justify-between flex-shrink-0">
      <div className="space-y-8">
        {/* Sidebar Brand Header */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="font-poppins font-bold text-slate-900 text-base leading-tight">
              AI Resume <span className="text-indigo-600">Hub</span>
            </h2>
            <span className="text-[11px] text-slate-400 font-medium">Review 1 Module</span>
          </div>
        </div>

        {/* Active Navigation Links */}
        <div className="space-y-1">
          <p className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Core Features
          </p>

          <NavLink to="/dashboard" end className={({ isActive }) => isActive ? activeNavClass : inactiveNavClass}>
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/dashboard/upload" className={({ isActive }) => isActive ? activeNavClass : inactiveNavClass}>
            <UploadCloud className="w-5 h-5" />
            <span>Upload Resume</span>
          </NavLink>

          <NavLink to="/dashboard/resume-details" className={({ isActive }) => isActive ? activeNavClass : inactiveNavClass}>
            <FileText className="w-5 h-5" />
            <span>Resume Details</span>
          </NavLink>

          <NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? activeNavClass : inactiveNavClass}>
            <User className="w-5 h-5" />
            <span>Profile</span>
          </NavLink>
        </div>

        {/* Future Modules Section (Disabled with Coming Soon Badge) */}
        <div className="space-y-1 pt-4 border-t border-slate-200/60">
          <div className="flex items-center justify-between px-4 mb-2">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Future Modules
            </p>
            <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              <Lock className="w-2.5 h-2.5" /> Locked
            </span>
          </div>

          <div className="group relative opacity-60 cursor-not-allowed">
            <div className="flex items-center justify-between px-4 py-3 rounded-2xl text-slate-400 font-medium text-sm bg-slate-100/50">
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-slate-400" />
                <span>Job Recommendation</span>
              </div>
              <span className="text-[10px] font-semibold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-md">
                Coming Soon
              </span>
            </div>
          </div>

          <div className="group relative opacity-60 cursor-not-allowed">
            <div className="flex items-center justify-between px-4 py-3 rounded-2xl text-slate-400 font-medium text-sm bg-slate-100/50">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-slate-400" />
                <span>Skill Gap Analysis</span>
              </div>
              <span className="text-[10px] font-semibold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-md">
                Coming Soon
              </span>
            </div>
          </div>

          <div className="group relative opacity-60 cursor-not-allowed">
            <div className="flex items-center justify-between px-4 py-3 rounded-2xl text-slate-400 font-medium text-sm bg-slate-100/50">
              <div className="flex items-center gap-3">
                <MessageSquareCode className="w-5 h-5 text-slate-400" />
                <span>AI Interview Prep</span>
              </div>
              <span className="text-[10px] font-semibold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-md">
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Capstone Info Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 border border-indigo-100/80 space-y-2">
        <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Capstone Review 1</span>
        </div>
        <p className="text-[11px] text-slate-600 leading-snug">
          Resume Uploading & PyMuPDF Automated Parsing Module.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
