from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import db
from .routers import auth, resume

app = FastAPI(title="AI-Powered Resume Recommendation System")

# CORS configuration (allow all for development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api", tags=["auth"]) 
app.include_router(resume.router, prefix="/api", tags=["resume"]) 

# Simple health check
@app.get("/api/health")
async def health_check():
    return {"status": "ok"}
