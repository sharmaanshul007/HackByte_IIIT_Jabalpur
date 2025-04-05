from fastapi import FastAPI, File, UploadFile, HTTPException
import cv2
from pydantic import BaseModel, EmailStr
from models.User import user_model
import shutil
import os
from utils.deleteFile import deleteFile
from utils.fakeImage import fakeImage
from fastapi.middleware.cors import CORSMiddleware

UPLOAD_DIR = "uploaded_videos"
os.makedirs(UPLOAD_DIR, exist_ok=True)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],              # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],                # Allow all HTTP methods
    allow_headers=["*"],                # Allow all headers
)

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

@app.post("/check")
async def upload_video(file: UploadFile = File(...)):
    file_location = f"{UPLOAD_DIR}/{file.filename}"
    
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    cap = cv2.VideoCapture(file_location)

    frame_count = 0
    real_count = 0
    fake_count = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        if frame_count % 3 == 0:
            if fakeImage(frame) == 1:
                fake_count += 1
            else:
                real_count += 1

        frame_count += 1

    real_prob = round(real_count / round(frame_count / 3)) * 100
    fake_prob = round(fake_count / round(frame_count / 3)) * 100
    cap.release()
    deleteFile(file_location)
    
    return {"real": min(100, real_prob), "fake": max(0, fake_prob)}

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

@app.get("/capture")
def capture():
    cap = cv2.VideoCapture(0)  # 0 is usually the default webcam

    if not cap.isOpened():
        print("❌ Could not open webcam.")
        return

    print("🎥 Press 'q' to quit the webcam window.")

    while True:
        ret, frame = cap.read()
        if not ret:
            print("❌ Failed to grab frame.")
            break

        if fakeImage(frame) == 1:
            cv2.putText(frame, "Fake", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
        else:
            cv2.putText(frame, "Real", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        cv2.imshow('Webcam Feed', frame)
        # Press 'q' to quit
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
    return {"message": "Webcam closed."}

# uvicorn main:app --reload