import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, LogOut, User as UserIcon, Sparkles, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const TopBar = () => {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const userName = user?.name || 'Candidate';
  const userInitials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  return (
    <header className="h-20 px-8 glass-nav flex items-center justify-between z-40 sticky top-0">
      {/* Welcome Greeting */}
      <div>
        <h1 className="font-poppins font-bold text-slate-900 text-xl flex items-center gap-2">
          Welcome back, <span className="text-gradient">{userName}</span> 👋
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          AI Resume Intelligence Platform Dashboard
        </p>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-5">
        {/* Notification Bell with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-2xl bg-slate-100/80 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200/80 text-slate-600 flex items-center justify-center transition-all relative"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 absolute top-2 right-2 ring-2 ring-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 rounded-2xl glass-card p-4 shadow-2xl border border-white/60 space-y-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-bold text-xs text-slate-800 uppercase tracking-wider">System Notifications</span>
                <span className="text-[10px] font-semibold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">New</span>
              </div>
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-indigo-50/60 border border-indigo-100/80 flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">PyMuPDF Resume Engine Ready</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Resume text & section parsing operational for Review 1.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-blue-500 text-white font-bold text-sm flex items-center justify-center shadow-md shadow-indigo-500/20">
            {userInitials || <UserIcon className="w-5 h-5" />}
          </div>
          <div className="hidden sm:block text-left">
            <p className="font-bold text-slate-800 text-sm leading-tight">{userName}</p>
            <p className="text-[11px] text-slate-500">{user?.email || 'user@example.com'}</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="p-2.5 rounded-xl bg-slate-100/80 hover:bg-rose-50 hover:text-rose-600 border border-slate-200/80 text-slate-600 transition-all flex items-center gap-2 text-sm font-semibold ml-2"
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
