import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Code, 
  GraduationCap, 
  Briefcase, 
  FolderGit2, 
  Award, 
  FileText, 
  Sparkles, 
  UploadCloud, 
  Copy, 
  Check, 
  Terminal,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ResumeDetailsPage = () => {
  const { currentResume } = useAuth();
  const [showRawText, setShowRawText] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const parsed = currentResume?.parsed_data || {};
  const isSample = currentResume?.is_sample;

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    toast.success(`Copied ${fieldName} to clipboard!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Colorful skill badge palette generator
  const badgeGradients = [
    "bg-indigo-50 text-indigo-700 border-indigo-200",
    "bg-blue-50 text-blue-700 border-blue-200",
    "bg-cyan-50 text-cyan-700 border-cyan-200",
    "bg-emerald-50 text-emerald-700 border-emerald-200",
    "bg-purple-50 text-purple-700 border-purple-200",
    "bg-violet-50 text-violet-700 border-violet-200",
    "bg-amber-50 text-amber-700 border-amber-200",
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner Status */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6 border border-indigo-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-500/20">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-poppins font-extrabold text-slate-900 text-xl">
                Extracted Resume Metadata
              </h2>
              {isSample ? (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                  Pre-Populated Demo Sample
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  User Uploaded PDF
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Parsed via PyMuPDF (fitz) NLP text extraction pipeline.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setShowRawText(!showRawText)}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-2"
          >
            <Terminal className="w-4 h-4 text-slate-600" />
            <span>{showRawText ? "Hide Raw Text" : "View Extracted Raw Text"}</span>
          </button>

          <Link
            to="/dashboard/upload"
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload New PDF</span>
          </Link>
        </div>
      </motion.div>

      {/* Raw Extracted Text Drawer / Box */}
      {showRawText && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="glass-card rounded-2xl p-6 border border-slate-300 bg-slate-950 text-slate-100 space-y-3 font-mono text-xs overflow-x-auto shadow-2xl"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400">
            <span className="flex items-center gap-2 font-semibold">
              <Terminal className="w-4 h-4 text-emerald-400" /> PyMuPDF Raw Extracted Text Buffer
            </span>
            <button
              onClick={() => copyToClipboard(parsed.raw_text, 'Raw Resume Text')}
              className="hover:text-white transition-colors"
            >
              {copiedField === 'Raw Resume Text' ? 'Copied!' : 'Copy Raw Text'}
            </button>
          </div>
          <pre className="whitespace-pre-wrap leading-relaxed text-slate-300 max-h-96 overflow-y-auto">
            {parsed.raw_text || "No raw text extracted."}
          </pre>
        </motion.div>
      )}

      {/* Grid: Personal Info & Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card rounded-2xl p-6 border border-slate-200/80 space-y-6 lg:col-span-1"
        >
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-poppins font-bold text-slate-900 text-base">Personal Information</h3>
              <p className="text-xs text-slate-500">Contact Details</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Candidate Name */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Candidate Name</span>
              <p className="font-extrabold text-slate-900 text-lg font-poppins mt-0.5">{parsed.name || "Candidate Name"}</p>
            </div>

            {/* Email Address */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email Address</span>
              <div className="flex items-center justify-between mt-0.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-800 text-xs truncate">{parsed.email || "email@example.com"}</span>
                <button
                  onClick={() => copyToClipboard(parsed.email, 'Email')}
                  className="text-slate-400 hover:text-indigo-600 transition-colors ml-2"
                >
                  {copiedField === 'Email' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Phone Number</span>
              <div className="flex items-center justify-between mt-0.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-800 text-xs">{parsed.phone || "+1 (555) 000-0000"}</span>
                <button
                  onClick={() => copyToClipboard(parsed.phone, 'Phone')}
                  className="text-slate-400 hover:text-indigo-600 transition-colors ml-2"
                >
                  {copiedField === 'Phone' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Extracted Skills Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-card rounded-2xl p-6 border border-slate-200/80 space-y-5 lg:col-span-2"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center border border-cyan-100">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-poppins font-bold text-slate-900 text-base">Extracted Technical Skills</h3>
                <p className="text-xs text-slate-500">Matched against NLP technology dictionary</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
              {parsed.skills?.length || 0} Skills Detected
            </span>
          </div>

          {/* Colorful Badges Grid */}
          <div className="flex flex-wrap gap-2.5 pt-1">
            {parsed.skills && parsed.skills.length > 0 ? (
              parsed.skills.map((skill, idx) => {
                const gradientClass = badgeGradients[idx % badgeGradients.length];
                return (
                  <span
                    key={idx}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold border shadow-2xs hover:scale-105 transition-transform cursor-default ${gradientClass}`}
                  >
                    {skill}
                  </span>
                );
              })
            ) : (
              <p className="text-xs text-slate-400">No skills detected in resume text.</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Education Timeline Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="glass-card rounded-2xl p-6 border border-slate-200/80 space-y-6"
      >
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-poppins font-bold text-slate-900 text-base">Education Background</h3>
            <p className="text-xs text-slate-500">Academic Qualifications Timeline</p>
          </div>
        </div>

        {/* Vertical Timeline UI */}
        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-200">
          {parsed.education && parsed.education.length > 0 ? (
            parsed.education.map((edu, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-indigo-600 ring-4 ring-indigo-100"></div>
                <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-bold text-slate-900 text-sm font-poppins">{edu.degree}</h4>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-700 w-fit">
                      {edu.year}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">{edu.institution}</p>
                  {edu.score && (
                    <p className="text-[11px] font-bold text-emerald-600">Grade / Score: {edu.score}</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400">No education timeline parsed.</p>
          )}
        </div>
      </motion.div>

      {/* Experience Timeline Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="glass-card rounded-2xl p-6 border border-slate-200/80 space-y-6"
      >
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-poppins font-bold text-slate-900 text-base">Work Experience</h3>
            <p className="text-xs text-slate-500">Professional History Timeline</p>
          </div>
        </div>

        {/* Vertical Timeline UI */}
        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-purple-200">
          {parsed.experience && parsed.experience.length > 0 ? (
            parsed.experience.map((exp, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-purple-600 ring-4 ring-purple-100"></div>
                <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-bold text-slate-900 text-sm font-poppins">{exp.role}</h4>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-700 w-fit">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs text-indigo-600 font-bold">{exp.company}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400">No work experience parsed.</p>
          )}
        </div>
      </motion.div>

      {/* Projects Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="glass-card rounded-2xl p-6 border border-slate-200/80 space-y-6"
      >
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
            <FolderGit2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-poppins font-bold text-slate-900 text-base">Key Projects</h3>
            <p className="text-xs text-slate-500">Technical & Capstone Projects</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {parsed.projects && parsed.projects.length > 0 ? (
            parsed.projects.map((proj, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-3 shadow-xs">
                <h4 className="font-bold text-slate-900 text-sm font-poppins">{proj.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>
                {proj.tech_stack && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.tech_stack.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400">No projects parsed.</p>
          )}
        </div>
      </motion.div>

      {/* Certifications Cards */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="glass-card rounded-2xl p-6 border border-slate-200/80 space-y-6"
      >
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-poppins font-bold text-slate-900 text-base">Certifications & Credentials</h3>
            <p className="text-xs text-slate-500">Verified Technical Achievements</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {parsed.certifications && parsed.certifications.length > 0 ? (
            parsed.certifications.map((cert, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs font-poppins">{cert.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{cert.issuer}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                  {cert.year}
                </span>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400">No certifications parsed.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ResumeDetailsPage;
