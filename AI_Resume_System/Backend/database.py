import os
import json
import uuid
from datetime import datetime
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError

# MongoDB URI from environment or default local URI
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/resume-db")
FALLBACK_DB_FILE = os.path.join(os.path.dirname(__file__), "fallback_db.json")

# In-Memory / File Fallback Database Class for seamless demo execution without MongoDB dependency
class LocalJSONStore:
    def __init__(self, filename=FALLBACK_DB_FILE):
        self.filename = filename
        if not os.path.exists(self.filename):
            self._save({"users": [], "resumes": []})

    def _load(self):
        try:
            with open(self.filename, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return {"users": [], "resumes": []}

    def _save(self, data):
        with open(self.filename, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, default=str)

    def find_one(self, collection_name, query):
        data = self._load()
        items = data.get(collection_name, [])
        for item in items:
            match = True
            for k, v in query.items():
                if item.get(k) != v:
                    match = False
                    break
            if match:
                return item
        return None

    def insert_one(self, collection_name, doc):
        data = self._load()
        if "_id" not in doc:
            doc["_id"] = str(uuid.uuid4())
        data.setdefault(collection_name, []).append(doc)
        self._save(data)
        return doc

    def find(self, collection_name, query=None):
        data = self._load()
        items = data.get(collection_name, [])
        if not query:
            return items
        results = []
        for item in items:
            match = True
            for k, v in query.items():
                if item.get(k) != v:
                    match = False
                    break
            if match:
                results.append(item)
        return results

    def update_one(self, collection_name, query, update):
        data = self._load()
        items = data.get(collection_name, [])
        for item in items:
            match = True
            for k, v in query.items():
                if item.get(k) != v:
                    match = False
                    break
            if match:
                if "$set" in update:
                    for k, v in update["$set"].items():
                        item[k] = v
                self._save(data)
                return True
        return False


# Try MongoDB connection, default to LocalJSONStore if server is unreachable
use_mongo = False
db = None
users_collection = None
resumes_collection = None
fallback_db = LocalJSONStore()

try:
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=2000)
    # Trigger connection check
    client.admin.command('ping')
    _db = client.get_database()
    users_collection = _db["users"]
    resumes_collection = _db["resumes"]
    use_mongo = True
    print(" Connected to MongoDB successfully!")
except Exception as e:
    print(f" MongoDB connection failed or offline. Using LocalJSONStore fallback!")
    use_mongo = False


def get_user_by_email(email: str):
    if use_mongo and users_collection is not None:
        return users_collection.find_one({"email": email.lower()})
    return fallback_db.find_one("users", {"email": email.lower()})


def save_user(user_data: dict):
    user_data["email"] = user_data["email"].lower()
    if use_mongo and users_collection is not None:
        result = users_collection.insert_one(user_data)
        user_data["_id"] = str(result.inserted_id)
        return user_data
    return fallback_db.insert_one("users", user_data)


def save_resume_metadata(resume_data: dict):
    if use_mongo and resumes_collection is not None:
        result = resumes_collection.insert_one(resume_data)
        resume_data["_id"] = str(result.inserted_id)
        return resume_data
    return fallback_db.insert_one("resumes", resume_data)


def get_user_resumes(user_id: str):
    if use_mongo and resumes_collection is not None:
        return list(resumes_collection.find({"user_id": str(user_id)}))
    return fallback_db.find("resumes", {"user_id": str(user_id)})


def get_latest_user_resume(user_id: str):
    resumes = get_user_resumes(user_id)
    if not resumes:
        return None
    # Sort by upload_date descending
    resumes.sort(key=lambda x: x.get("upload_date", ""), reverse=True)
    return resumes[0]


def get_resume_by_id(resume_id: str):
    if use_mongo and resumes_collection is not None:
        return resumes_collection.find_one({"_id": resume_id})
    return fallback_db.find_one("resumes", {"_id": resume_id})
