import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .database import use_mongo
from .routers import auth, resume

app = FastAPI(
    title="AI-Powered Resume Based Job Recommendation System",
    description="Production-quality FastAPI backend for AI Resume Parsing and Candidate Management (Review 1)",
    version="1.0.0"
)

# Enable CORS for local React dev server and all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve uploaded files if needed
UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# Include routers with /api prefix
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"]) 
app.include_router(auth.router, prefix="/api", tags=["Auth Legacy"]) 
app.include_router(resume.router, prefix="/api", tags=["Resume Management"]) 

@app.get("/")
async def root():
    return {
        "system": "AI-Powered Resume Based Job Recommendation System API",
        "version": "1.0.0",
        "status": "Online",
        "mongo_connected": use_mongo
    }

@app.get("/api/health")
async def health_check():
    return {
        "status": "ok",
        "mongo_connected": use_mongo,
        "environment": "Development / Presentation"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("Backend.main:app", host="127.0.0.1", port=8000, reload=True)
