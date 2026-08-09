import os
import uuid
from datetime import datetime
from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, status

from ..database import save_resume_metadata, get_latest_user_resume, get_resume_by_id
from ..utils.auth_utils import get_current_user
from ..utils.resume_parser import parse_resume_pdf

router = APIRouter()

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

SAMPLE_PARSED_RESUME = {
    "_id": "sample-demo-resume-001",
    "filename": "Jaswanth_Kumar_Reddy_Resume.pdf",
    "file_size": 245760,
    "file_size_formatted": "240 KB",
    "upload_date": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
    "is_sample": True,
    "parsed_data": {
        "name": "Jaswanth kumar Reddy Tirumalareddy",
        "email": "tjaswanthkumarreddy@gmail.com",
        "phone": "+91 7396731325",
        "skills": [
            "Python", "JavaScript", "TypeScript", "React", "React.js", "Next.js", 
            "Node.js", "Express", "CSS", "Tailwind CSS", "Framer Motion", "Axios", 
            "C", "C++", "Java", "SQL", "MongoDB", "PostgreSQL", "MySQL", 
            "AWS", "Docker", "Git", "GitHub", "CI/CD", "Nginx", "Linux", "Postman"
        ],
        "education": [
            {
                "degree": "Bachelor of Technology (B.Tech) – Computer Science & Engineering",
                "institution": "Geethanjali Institute of Science and Technology, Nellore, India",
                "year": "Since Aug 2023",
                "score": "CGPA: 8.32 / 10.0 (Semester 5)"
            }
        ],
        "experience": [
            {
                "role": "DSA Instructor & UI/UX Designer (Intern)",
                "company": "CodeNow Academy Pvt Ltd",
                "period": "Jan 2026 – Apr 2026",
                "description": "◦ 250+ students mentored in Data Structures & Algorithms, improving problem-solving efficiency by 40%.\n◦ Curated 100+ technical problem sets focused on product-based company interview patterns.\n◦ Produced 3+ weekly technical videos using Microsoft PPT and live-coding recordings."
            },
            {
                "role": "Full Stack Developer (Freelance)",
                "company": "Utsavlokam Enterprises Pvt. Ltd",
                "period": "Sep 2025 – Nov 2025",
                "description": "◦ Built a full-featured event vendor marketplace using the MERN stack.\n◦ Implemented distributed locking mechanism to prevent double bookings under high concurrency (500+ reservations).\n◦ Improved backend performance and scalability through database query optimization."
            },
            {
                "role": "Java Developer (Intern)",
                "company": "Infosys Springboard",
                "period": "Sep 2024 – Nov 2024",
                "description": "◦ Built and deployed 5+ microservices with Spring Boot & Spring Security, improving API authentication/authorization.\n◦ Optimized service architecture to boost API performance by 20%."
            }
        ],
        "projects": [
            {
                "title": "CodeVisualizor",
                "tech_stack": ["Next.js", "Tailwind CSS", "Framer Motion", "Babel (AST)"],
                "description": "Engineered a high-performance visual engine utilizing Babel AST instrumentation to simulate step-by-step code execution with dynamic state tracking and an interactive memory-mapping interface."
            },
            {
                "title": "Edu hack tech",
                "tech_stack": ["MERN Stack", "Tailwind CSS", "JWT", "Axios"],
                "description": "Architected a full-stack 'Learn-to-Compete' ecosystem with integrated course modules, automated hackathon registration, and secure team collaboration."
            },
            {
                "title": "Pixel Literacy Quest",
                "tech_stack": ["Python (Pygame)", "MVC Architecture", "Git/GitHub Actions"],
                "description": "Engineered a full-stack game engine using MVC architecture to decouple state logic. 🏆 Winner – Best Educational Value Award, IIT Madras Game Trade Hackathon (₹25,000 prize)."
            }
        ],
        "certifications": [
            {
                "name": "DSA with Java (Elite + Silver)",
                "issuer": "CodeNow Academy",
                "year": "2026"
            },
            {
                "name": "Best Performance: C & DS Training",
                "issuer": "Blackbucks Education",
                "year": "2024"
            },
            {
                "name": "LeetCode 360+ Problems Solved (225+ Medium/Hard)",
                "issuer": "LeetCode Profile (Peak Rating: 1513, 6 Badges)",
                "year": "2026"
            },
            {
                "name": "JEE Mains 92.7 Percentile (97.7% in Physics)",
                "issuer": "National Testing Agency (NTA)",
                "year": "2023"
            },
            {
                "name": "Educational Programming YouTube Channel (1,800+ Subscribers, 72,500+ Views)",
                "issuer": "YouTube Creator Community",
                "year": "2025"
            }
        ],
        "raw_text": "Jaswanth kumar Reddy Tirumalareddy\nEmail: tjaswanthkumarreddy@gmail.com | Mobile: +91 7396731325\n..."
    }
}

def format_file_size(size_in_bytes: int) -> str:
    if size_in_bytes < 1024:
        return f"{size_in_bytes} Bytes"
    elif size_in_bytes < 1024 * 1024:
        return f"{round(size_in_bytes / 1024, 1)} KB"
    else:
        return f"{round(size_in_bytes / (1024 * 1024), 2)} MB"

@router.post("/upload-resume")
async def upload_resume(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF documents (.pdf) are supported"
        )
        
    user_id = str(current_user["sub"])
    file_id = str(uuid.uuid4())
    filename = f"{file_id}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    
    content = await file.read()
    file_size = len(content)
    
    with open(file_path, "wb") as f:
        f.write(content)
        
    parsed_data = parse_resume_pdf(file_path)
    
    resume_doc = {
        "_id": file_id,
        "user_id": user_id,
        "filename": file.filename,
        "file_path": file_path,
        "file_size": file_size,
        "file_size_formatted": format_file_size(file_size),
        "upload_date": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
        "is_sample": False,
        "parsed_data": parsed_data
    }
    
    saved_doc = save_resume_metadata(resume_doc)
    
    return {
        "message": "Resume uploaded and parsed successfully",
        "resume": saved_doc
    }

@router.get("/resume/me")
async def get_my_resume(current_user: dict = Depends(get_current_user)):
    user_id = str(current_user["sub"])
    latest_resume = get_latest_user_resume(user_id)
    
    if not latest_resume:
        return {
            "message": "No uploaded resume found. Returning sample parsed resume for preview.",
            "has_resume": False,
            "resume": SAMPLE_PARSED_RESUME
        }
        
    return {
        "message": "Resume fetched successfully",
        "has_resume": True,
        "resume": latest_resume
    }

@router.get("/resume/{resume_id}")
async def get_resume(resume_id: str, current_user: dict = Depends(get_current_user)):
    if resume_id == "sample" or resume_id == "sample-demo-resume-001":
        return {"resume": SAMPLE_PARSED_RESUME}
        
    doc = get_resume_by_id(resume_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Resume document not found")
    return {"resume": doc}
