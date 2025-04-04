from fastapi import FastAPI, File, UploadFile
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

# uvicorn main:app --reload