<div align="center">

# 🤖 AI-Powered Resume Based Job Recommendation System

### Final Year Engineering Capstone Project — Review 1

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)

> A production-quality, full-stack AI SaaS platform that automates resume parsing, candidate skill extraction, and intelligent job recommendation using NLP and machine learning.

</div>

---

## 📸 Screenshots

| Landing Page | Dashboard |
|:---:|:---:|
| Modern glassmorphism hero with animated gradient background | Metric cards, sidebar navigation, and future AI module previews |

| Resume Upload | Resume Details |
|:---:|:---:|
| Drag-and-drop PDF upload with progress animation | Structured extraction: Skills, Education, Experience, Projects |

---

## ✨ Features (Review 1)

### 🔐 Authentication
- **User Registration** — Name, Email, Password with real-time validation
- **JWT Login** — Secure HMAC-SHA256 token-based authentication
- **Demo Account Pre-fill** — One-click evaluator credentials for presentations

### 📊 Dashboard
- **Personalized Greeting** with user avatar and notification bell
- **Stat Cards** — Resume status, parsing engine status, and upcoming AI features
- **Sidebar Navigation** — Active modules + locked future AI modules with badges

### 📄 Resume Upload & Parsing
- **Drag & Drop PDF Upload** — File validation (PDF only, max 10MB)
- **PyMuPDF (fitz) Parsing Engine** — Intelligent text extraction from PDF documents
- **Sample Resume Fallback** — Demo parsed resume served when no upload exists
- **Structured Data Extraction:**
  - 👤 **Personal Info** — Name, Email, Phone (with copy buttons)
  - 🛠 **Skills** — Matched against 130+ NLP technology dictionary (AI/ML, Web Dev, Cloud, DevOps)
  - 🎓 **Education** — Degree, Institution, CGPA, Timeline
  - 💼 **Experience** — Role, Company, Period, Responsibilities
  - 🚀 **Projects** — Title, Tech Stack, Description
  - 📜 **Certifications** — Name, Issuer, Year
  - 📝 **Raw Text Viewer** — Toggle extracted raw text

### 🗄 Database
- **MongoDB** primary storage with automatic **local JSON fallback** — runs without a DB setup
- Resume metadata persisted per user with full parsed structure

### 🎨 UI/UX Design
- **Glassmorphism** — Frosted glass cards with `backdrop-blur` and soft borders
- **Gradient Mesh Backgrounds** — Animated indigo/blue/cyan gradients
- **Framer Motion Animations** — Page transitions, hover effects, micro-interactions
- **Google Fonts** — Inter + Poppins typography
- **Fully Responsive** — Works on desktop and tablet viewports

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|:---|:---|
| **React 18** | Component-based UI framework |
| **Vite 6** | Lightning-fast build tool & dev server |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **Framer Motion** | Animations & page transitions |
| **React Router DOM** | Client-side routing |
| **Axios** | HTTP client for API communication |
| **Lucide React** | Modern icon library |
| **React Hot Toast** | Toast notifications |

### Backend
| Technology | Purpose |
|:---|:---|
| **FastAPI** | High-performance async Python web framework |
| **Uvicorn** | ASGI server |
| **PyMuPDF (fitz)** | PDF text extraction engine |
| **PyJWT** | JWT token generation & verification |
| **MongoDB / pymongo** | NoSQL database with local JSON fallback |
| **Pydantic** | Data validation & serialization |
| **python-multipart** | Multipart file upload handling |

---

## 📁 Project Structure

```
AI_Resume_System/
├── Backend/
│   ├── main.py                 # FastAPI app entry point, CORS config, static file serving
│   ├── database.py             # MongoDB + LocalJSONStore fallback
│   ├── fallback_db.json        # Local JSON database (auto-created when MongoDB is absent)
│   ├── routers/
│   │   ├── auth.py             # POST /api/register, POST /api/login
│   │   └── resume.py           # POST /api/upload-resume, GET /api/resume/me, GET /api/resume/{id}
│   ├── utils/
│   │   ├── auth_utils.py       # JWT creation, password hashing, token verification
│   │   └── resume_parser.py    # PyMuPDF PDF parsing & NLP skill extraction (130+ skills)
│   └── uploads/                # Uploaded PDF storage (auto-created)
├── Frontend/
│   ├── src/
│   │   ├── components/         # Navbar, Sidebar, TopBar, GlassCard, StatCard, ComingSoonCard
│   │   ├── context/            # AuthContext (JWT state management)
│   │   ├── layouts/            # DashboardLayout (sidebar + topbar wrapper)
│   │   ├── pages/              # Landing, Login, Register, Dashboard, Upload, ResumeDetails, Profile
│   │   ├── services/           # Axios API client (api.js)
│   │   └── utils/              # sampleData.js — demo resume fallback
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── START_APP.bat               # One-click launcher for both servers (Windows)
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Python 3.11+** with pip
- **Node.js 20+** with npm
- **MongoDB** (optional — auto-falls back to local JSON store)

### 1. Clone the Repository
```bash
git clone https://github.com/sana-saniya/AI_Resume_System.git
cd AI_Resume_System/AI_Resume_System
```

### 2. Install Backend Dependencies
```bash
pip install fastapi uvicorn pymongo pyjwt PyMuPDF pydantic[email] python-multipart
```

### 3. Install Frontend Dependencies
```bash
cd Frontend
npm install
cd ..
```

### 4. Start the Application

**Option A — One-Click Launcher (Windows):**
```bash
START_APP.bat
```

**Option B — Manual Start:**

Terminal 1 (Backend):
```bash
python -m uvicorn Backend.main:app --host 127.0.0.1 --port 8000 --reload
```

Terminal 2 (Frontend):
```bash
cd Frontend
npm run dev
```

### 5. Open in Browser
| Service | URL |
|:---|:---|
| 🌐 Frontend App | http://localhost:5173 |
| ⚡ Backend API | http://127.0.0.1:8000 |
| 📚 Swagger Docs | http://127.0.0.1:8000/docs |

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth |
|:---|:---|:---|:---|
| `POST` | `/api/register` | Create new user account | ❌ |
| `POST` | `/api/login` | Authenticate & get JWT token | ❌ |
| `POST` | `/api/upload-resume` | Upload PDF resume for parsing | ✅ JWT |
| `GET` | `/api/resume/me` | Get latest parsed resume (or sample fallback) | ✅ JWT |
| `GET` | `/api/resume/{id}` | Get specific resume by ID | ✅ JWT |
| `GET` | `/api/health` | Health check & DB connection status | ❌ |
| `GET` | `/` | API root info & version | ❌ |

> Auth routes are also available under `/api/auth/register` and `/api/auth/login` for compatibility.

---

## 🧠 Resume Parsing Pipeline

```
PDF Upload → PyMuPDF Text Extraction → Section Block Segmentation
                                              ↓
                              ┌───────────────┼───────────────┐
                              ↓               ↓               ↓
                         Experience       Projects        Education
                              ↓               ↓               ↓
                     Role/Company/     Title/Tech Stack/  Degree/Institution/
                     Period/Desc       Description        Score/Year
                              ↓               ↓               ↓
                              └───────────────┼───────────────┘
                                              ↓
                    NLP Skill Dictionary Match (130+ technologies)
                                              ↓
                              Structured JSON Response → Frontend UI
```

### Skill Categories Detected
| Category | Examples |
|:---|:---|
| AI / ML & Data Science | Python, PyTorch, TensorFlow, LangChain, BERT, GPT, RAG, NLP |
| Web & Frontend | React, Next.js, Vite, TypeScript, Tailwind CSS, Framer Motion |
| Backend & APIs | FastAPI, Flask, Django, Node.js, Express, Spring Boot, GraphQL |
| Databases | MongoDB, PostgreSQL, MySQL, Redis, Elasticsearch, Pinecone |
| Cloud & DevOps | AWS, Azure, Docker, Kubernetes, CI/CD, GitHub Actions, Terraform |
| Languages | C, C++, Java, Go, Rust, PHP, SQL, R |

---

## 🗺 Roadmap

| Module | Status |
|:---|:---|
| ✅ User Registration & JWT Login | **Review 1** — Complete |
| ✅ Resume Upload & PDF Parsing | **Review 1** — Complete |
| ✅ Structured Resume Details Display | **Review 1** — Complete |
| ✅ MongoDB + JSON Fallback Storage | **Review 1** — Complete |
| 🔒 AI Job Recommendation Engine | Review 2 — Upcoming |
| 🔒 Skill Gap Analysis & Learning Paths | Review 2 — Upcoming |
| 🔒 AI Interview Preparation | Review 3 — Upcoming |
| 🔒 Resume Score & ATS Optimization | Review 3 — Upcoming |
| 🔒 Recruiter Dashboard | Review 3 — Upcoming |

---

## 👥 Team

| Name | Role |
|:---|:---|
| **Jaswanth Kumar Reddy T** | Full Stack Developer & AI/ML Engineer |
| **Sana Saniya** | Project Lead & Frontend Developer |

---

## 📄 License

This project is developed as part of the **Final Year B.Tech Capstone Project** at **Geethanjali Institute of Science and Technology**, Nellore.

---

<div align="center">

**Built with ❤️ using React, FastAPI, PyMuPDF & Tailwind CSS**

*Last updated: August 2026 — Review 1 Submission*

</div>
