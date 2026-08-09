import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileCheck, 
  Cpu, 
  Award, 
  Zap, 
  Briefcase, 
  TrendingUp, 
  MessageSquareCode, 
  BookOpen, 
  Star, 
  UserCheck, 
  UploadCloud, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/StatCard';
import ComingSoonCard from '../components/ComingSoonCard';

const DashboardPage = () => {
  const { currentResume, user } = useAuth();

  const isUploaded = currentResume && !currentResume.is_sample;
  const fileName = currentResume?.filename || "No Resume Uploaded";
  const parsedSkillsCount = currentResume?.parsed_data?.skills?.length || 0;

  return (
    <div className="space-y-8 pb-12">
      {/* Quick Action Top Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white relative overflow-hidden shadow-2xl shadow-indigo-500/20"
      >
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/10 backdrop-blur-3xl rounded-l-full pointer-events-none hidden md:block"></div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> PyMuPDF Automated Parsing Pipeline
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-poppins leading-tight">
            {isUploaded ? "PDF Resume Successfully Analyzed!" : "AI Resume Analysis Ready for Review 1"}
          </h2>
          <p className="text-white/80 text-sm leading-relaxed">
            {isUploaded
              ? `File "${fileName}" parsed. Extracted ${parsedSkillsCount} technical skills and structured profile sections.`
              : "Pre-populated sample candidate resume active. Upload a custom PDF to replace sample metadata dynamically."}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              to="/dashboard/upload"
              className="px-6 py-3 rounded-2xl bg-white text-indigo-700 font-bold text-sm shadow-lg hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload New PDF</span>
            </Link>

            <Link
              to="/dashboard/resume-details"
              className="px-6 py-3 rounded-2xl bg-white/15 text-white hover:bg-white/25 border border-white/30 font-bold text-sm transition-all flex items-center gap-2 backdrop-blur-md"
            >
              <span>View Extracted Details</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Main 4 Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Resume Uploaded */}
        <StatCard
          icon={FileCheck}
          title="Resume Uploaded"
          value={isUploaded ? "PDF Active" : "Sample Active"}
          statusText={fileName.length > 22 ? fileName.slice(0, 20) + "..." : fileName}
          statusBadge={isUploaded ? "User Upload" : "Sample Demo"}
          color="indigo"
        />

        {/* Card 2: Parsing Status */}
        <StatCard
          icon={Cpu}
          title="Parsing Status"
          value="100% Parsed"
          statusText="PyMuPDF PyEngine"
          statusBadge="Complete"
          color="emerald"
        />

        {/* Card 3: Resume Score (Coming Soon) */}
        <StatCard
          icon={Award}
          title="Resume Score"
          value="-- / 100"
          statusText="AI Quality Meter"
          comingSoon={true}
          color="purple"
        />

        {/* Card 4: AI Readiness (Coming Soon) */}
        <StatCard
          icon={Zap}
          title="AI Readiness"
          value="-- %"
          statusText="Skill Match Index"
          comingSoon={true}
          color="amber"
        />
      </div>

      {/* Future AI Modules Section Header */}
      <div className="pt-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-poppins flex items-center gap-2">
              🤖 Upcoming AI System Modules
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Planned AI startup features for Review 2 & Final Capstone Architecture
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            Roadmap Phase
          </span>
        </div>

        {/* 6 Disabled Coming Soon AI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ComingSoonCard
            icon={Briefcase}
            title="🤖 AI Job Recommendation"
            description="Automated job matching algorithm scoring candidate profile against live tech industry vacancies."
            delay={0.05}
          />

          <ComingSoonCard
            icon={TrendingUp}
            title="📈 Skill Gap Analysis"
            description="Identifies missing technical stack qualifications for target role descriptions."
            delay={0.1}
          />

          <ComingSoonCard
            icon={MessageSquareCode}
            title="🎯 AI Interview Preparation"
            description="Simulates role-specific AI technical interview questions and automated candidate evaluation."
            delay={0.15}
          />

          <ComingSoonCard
            icon={BookOpen}
            title="📚 Learning Recommendations"
            description="Curates prioritized course modules and learning tutorials to bridge identified skill gaps."
            delay={0.2}
          />

          <ComingSoonCard
            icon={Star}
            title="⭐ Resume Score"
            description="Comprehensive ATS resume optimization score evaluating impact verbs, skills, and layout format."
            delay={0.25}
          />

          <ComingSoonCard
            icon={UserCheck}
            title="💼 Recruiter Dashboard"
            description="Talent portal allowing recruiters to search, rank, and screen parsed candidate resumes."
            delay={0.3}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
