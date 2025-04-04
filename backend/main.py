from fastapi import FastAPI, File, UploadFile, HTTPException
from pydantic import BaseModel, EmailStr
from models.User import user_model
import shutil
import os
from utils.deleteFile import deleteFile

UPLOAD_DIR = "uploaded_videos"
os.makedirs(UPLOAD_DIR, exist_ok=True)

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

@app.post("/upload/")
async def upload_video(file: UploadFile = File(...)):
    file_location = f"{UPLOAD_DIR}/{file.filename}"
    
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # deleteFile(file.filename)
    
    return {"filename": file.filename, "message": "Upload successful"}

class UserSignup(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

@app.post("/signup")
def signup(user: UserSignup):
    result = user_model.create_user(user.name, user.email, user.password)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@app.post("/login")
def login(user: UserLogin):
    result = user_model.verify_user(user.email, user.password)
    if "error" in result:
        raise HTTPException(status_code=401, detail=result["error"])
    return {"message": result["message"], "user": {
        "name": result["user"]["name"],
        "email": result["user"]["email"]
    }}

# uvicorn main:app --reload