import os
from pymongo import MongoClient

# Load MongoDB URI from environment or default to local
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/resume-db")

client = MongoClient(MONGO_URI)
# Database name is 'resume-db'
_db = client.get_database()

# Collections
users_collection = _db["users"]
resumes_collection = _db["resumes"]
