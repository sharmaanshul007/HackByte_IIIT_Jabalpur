import os
from pymongo import MongoClient
from dotenv import load_dotenv
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    raise Exception("❌ MONGO_URI not found in .env file")

client = MongoClient(MONGO_URI)

db = client["myDatabase"]  
my_collection = db["myCollection"]

print("✅ Connected to MongoDB Atlas successfully!")