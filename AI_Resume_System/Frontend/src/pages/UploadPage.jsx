import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Sparkles, ArrowRight, RefreshCw } from 'lucide-react';
import { uploadResumeFile } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadedResumeInfo, setUploadedResumeInfo] = useState(null);

  const fileInputRef = useRef(null);
  const { updateResume } = useAuth();
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateFile = (file) => {
    if (!file) return false;
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      toast.error('Only PDF documents (.pdf) are supported!');
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size exceeds maximum limit of 10MB');
      return false;
    }
    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        setUploadSuccess(false);
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        setUploadSuccess(false);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a PDF resume file to upload');
      return;
    }

    setUploading(true);
    setProgress(10);

    try {
      const result = await uploadResumeFile(selectedFile, (percent) => {
        setProgress(percent);
      });

      if (result && result.resume) {
        setUploadSuccess(true);
        setUploadedResumeInfo(result.resume);
        updateResume(result.resume);
        toast.success('Resume uploaded and parsed with PyMuPDF!');
      }
    } catch (err) {
      const msg = err.response?.data?.detail || 'Failed to upload resume';
      toast.error(msg);
    } finally {
      setUploading(false);
    }
  };

  const formatSize = (bytes) => {
    if (!bytes) return '0 KB';
    return bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(1)} KB`
      : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Title */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-slate-900 font-poppins">
          Upload Candidate Resume
        </h2>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          Upload PDF format resume. The backend PyMuPDF engine automatically extracts candidate details, skills, education, and experience.
        </p>
      </div>

      {/* Main Drag and Drop Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card rounded-3xl p-8 sm:p-12 border-2 border-dashed transition-all duration-300 relative overflow-hidden"
        style={{
          borderColor: dragActive ? '#6366F1' : 'rgba(203, 213, 225, 0.8)',
          backgroundColor: dragActive ? 'rgba(238, 242, 255, 0.6)' : 'rgba(255, 255, 255, 0.75)',
        }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="text-center space-y-5">
          {/* Upload Icon */}
          <div className="w-20 h-20 rounded-3xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center border border-indigo-100 shadow-md shadow-indigo-500/10">
            <UploadCloud className={`w-10 h-10 ${uploading ? 'animate-bounce' : ''}`} />
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 font-poppins">
              Drag & Drop your Resume PDF here
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              or click below to browse from your computer (PDF only, up to 10MB)
            </p>
          </div>

          {/* Browse File Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:border-indigo-500 hover:text-indigo-600 transition-all shadow-xs"
          >
            Browse Document
          </button>
        </div>
      </motion.div>

      {/* Selected File Card & Upload Progress */}
      {selectedFile && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 border border-indigo-100 shadow-lg space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100/80 text-indigo-700 flex items-center justify-center font-bold text-xs">
                PDF
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm font-poppins">{selectedFile.name}</h4>
                <p className="text-xs text-slate-500">{formatSize(selectedFile.size)} • Ready for PyMuPDF parsing</p>
              </div>
            </div>

            {!uploading && !uploadSuccess && (
              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="text-xs text-slate-400 hover:text-rose-500 transition-colors"
              >
                Remove
              </button>
            )}
          </div>

          {/* Upload Progress Bar */}
          {uploading && (
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-semibold text-indigo-600">
                <span>Uploading & Parsing PDF...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-600 to-cyan-400 transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Upload Button */}
          {!uploadSuccess && (
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing PyMuPDF Engine...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Parse & Save Resume Metadata</span>
                </>
              )}
            </button>
          )}
        </motion.div>
      )}

      {/* Uploaded File Metadata Card (Success Animation State) */}
      <AnimatePresence>
        {uploadSuccess && uploadedResumeInfo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="glass-card rounded-2xl p-6 border-2 border-emerald-300 bg-emerald-50/40 space-y-4 shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base font-poppins">
                  Resume Upload & Extraction Complete!
                </h3>
                <p className="text-xs text-emerald-700">Saved to MongoDB database & parsed successfully.</p>
              </div>
            </div>

            {/* Metadata Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-emerald-200/60 text-xs">
              <div>
                <span className="text-slate-500 font-medium">File Name</span>
                <p className="font-bold text-slate-900 mt-0.5 truncate">{uploadedResumeInfo.filename}</p>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Upload Time</span>
                <p className="font-bold text-slate-900 mt-0.5">{uploadedResumeInfo.upload_date}</p>
              </div>
              <div>
                <span className="text-slate-500 font-medium">File Size</span>
                <p className="font-bold text-slate-900 mt-0.5">{uploadedResumeInfo.file_size_formatted}</p>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="pt-3">
              <button
                onClick={() => navigate('/dashboard/resume-details')}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>View Extracted Resume Details Page</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UploadPage;
