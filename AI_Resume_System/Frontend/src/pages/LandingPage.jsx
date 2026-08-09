import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  FileText, 
  Briefcase, 
  TrendingUp, 
  MessageSquareCode, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Lock,
  Layers,
  Search
} from 'lucide-react';
import Navbar from '../components/Navbar';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-mesh-light flex flex-col justify-between overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Floating Abstract AI Elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl animate-float pointer-events-none"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-float-delayed pointer-events-none"></div>

        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-indigo-200/80 mb-8 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-indigo-600 animate-spin" />
          <span className="text-xs font-bold text-indigo-950 uppercase tracking-wider">
            Final Year Engineering Project • Review 1 Presentation
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight font-poppins max-w-5xl mx-auto leading-tight"
        >
          <span className="text-gradient">AI-Powered Resume Based</span> Job Recommendation System
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed"
        >
          Analyze your resume, discover opportunities, identify skill gaps, and prepare for interviews using Artificial Intelligence.
        </motion.p>

        {/* Action Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white font-bold text-base shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/login"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-card text-slate-700 font-bold text-base hover:bg-white border border-slate-200/80 hover:border-indigo-300 hover:text-indigo-600 transition-all flex items-center justify-center gap-2"
          >
            <span>Login to Platform</span>
          </Link>
        </motion.div>

        {/* Feature Badges Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 border border-slate-200/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>PyMuPDF Automated Parsing</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 border border-slate-200/80">
            <ShieldCheck className="w-4 h-4 text-blue-500" />
            <span>JWT Secure Authentication</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 border border-slate-200/80">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>MongoDB Database Backend</span>
          </div>
        </motion.div>
      </section>

      {/* Feature Showcase Grid Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 font-poppins">
            System Modules & Capabilities
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Review 1 Implementation & Roadmap for Upcoming AI Modules
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Resume Analysis (Implemented) */}
          <motion.div
            whileHover={{ y: -5 }}
            className="glass-card rounded-2xl p-6 relative overflow-hidden border border-indigo-200/80 shadow-xl shadow-indigo-100/40"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center mb-5 shadow-md shadow-indigo-500/20">
              <FileText className="w-6 h-6" />
            </div>

            <div className="flex items-center justify-between mb-2">
              <h3 className="font-poppins font-bold text-slate-900 text-lg">Resume Analysis</h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 uppercase">
                Active (Review 1)
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Upload PDF resumes to extract structured candidate metadata including skills, education, experience, projects, and contact info using PyMuPDF.
            </p>
          </motion.div>

          {/* Card 2: Smart Job Recommendation (Upcoming) */}
          <motion.div
            whileHover={{ y: -5 }}
            className="glass-card rounded-2xl p-6 relative overflow-hidden border border-slate-200/80 bg-white/60 opacity-90"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mb-5 border border-slate-200">
              <Briefcase className="w-6 h-6" />
            </div>

            <div className="flex items-center justify-between mb-2">
              <h3 className="font-poppins font-bold text-slate-900 text-lg">Job Recommendation</h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-200 uppercase flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" /> Upcoming
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Matches extracted candidate skills against live job market vacancies using NLP vector similarity scores.
            </p>
          </motion.div>

          {/* Card 3: Skill Gap Analysis (Upcoming) */}
          <motion.div
            whileHover={{ y: -5 }}
            className="glass-card rounded-2xl p-6 relative overflow-hidden border border-slate-200/80 bg-white/60 opacity-90"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mb-5 border border-slate-200">
              <TrendingUp className="w-6 h-6" />
            </div>

            <div className="flex items-center justify-between mb-2">
              <h3 className="font-poppins font-bold text-slate-900 text-lg">Skill Gap Analysis</h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-200 uppercase flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" /> Upcoming
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Identifies missing tech stack skills required for target job roles and provides tailored learning paths.
            </p>
          </motion.div>

          {/* Card 4: AI Interview Preparation (Upcoming) */}
          <motion.div
            whileHover={{ y: -5 }}
            className="glass-card rounded-2xl p-6 relative overflow-hidden border border-slate-200/80 bg-white/60 opacity-90"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mb-5 border border-slate-200">
              <MessageSquareCode className="w-6 h-6" />
            </div>

            <div className="flex items-center justify-between mb-2">
              <h3 className="font-poppins font-bold text-slate-900 text-lg">AI Interview Prep</h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-200 uppercase flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" /> Upcoming
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Generates role-specific technical interview questions and mock feedback powered by AI LLMs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200/80 bg-white/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500 font-medium">
          <p>© 2026 AI-Powered Resume Based Job Recommendation System. Final Year Engineering Capstone Project.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
