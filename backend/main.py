from fastapi import FastAPI, File, UploadFile, HTTPException
import cv2
from pydantic import BaseModel, EmailStr
from models.User import user_model
import shutil
import os
from utils.deleteFile import deleteFile
from utils.fakeImage import fakeImage
from fastapi.middleware.cors import CORSMiddleware
import mss
import time
import numpy as np
import threading

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

@app.post("/check")
async def uploadVideo(file: UploadFile = File(...)):
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

@app.get("/capture/cam")
def captureCam():
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

drawing = False
start_point = (-1, -1)
end_point = (-1, -1)
selected_region = None

def mouse_handler(event, x, y, flags, param):
    global drawing, start_point, end_point
    if event == cv2.EVENT_LBUTTONDOWN:
        drawing = True
        start_point = (x, y)
        end_point = (x, y)
    elif event == cv2.EVENT_MOUSEMOVE and drawing:
        end_point = (x, y)
    elif event == cv2.EVENT_LBUTTONUP:
        drawing = False
        end_point = (x, y)

def draw_rectangle():
    global selected_region
    with mss.mss() as sct:
        monitor = sct.monitors[1]
        screenshot = np.array(sct.grab(monitor))

    window_name = "Select Region"
    cv2.namedWindow(window_name)
    cv2.setMouseCallback(window_name, mouse_handler)

    while True:
        img_copy = screenshot.copy()
        if drawing or start_point != end_point:
            cv2.rectangle(img_copy, start_point, end_point, (0, 255, 0), 2)
        cv2.imshow(window_name, img_copy)
        key = cv2.waitKey(1) & 0xFF
        if key == ord("q") or key == 13:
            break

    cv2.destroyWindow(window_name)

    x1, y1 = start_point
    x2, y2 = end_point
    top = min(y1, y2)
    left = min(x1, x2)
    width = abs(x2 - x1)
    height = abs(y2 - y1)
    selected_region = {"top": top, "left": left, "width": width, "height": height}
    return selected_region

def capture_and_detect(region):
    with mss.mss() as sct:
        fps = 20
        frame_time = 1 / fps

        while True:
            start = time.time()
            img = np.array(sct.grab(region))
            frame = cv2.cvtColor(img, cv2.COLOR_BGRA2BGR)

            label = "Fake" if fakeImage(frame) else "Real"
            color = (0, 0, 255) if label == "Fake" else (0, 255, 0)
            cv2.putText(frame, label, (210, 140), cv2.FONT_HERSHEY_SIMPLEX, 1.2, color, 3)
            cv2.imshow("Detection", frame)

            if cv2.waitKey(1) & 0xFF == ord("q"):
                break

            elapsed = time.time() - start
            if elapsed < frame_time:
                time.sleep(frame_time - elapsed)

        cv2.destroyAllWindows()

def start_screen_detection():
    region = draw_rectangle()
    if region:
        capture_and_detect(region)
        return "Detection ended."
    return "No region selected."

@app.get("/capture/screen")
def captureScreen():
    thread = threading.Thread(target=start_screen_detection)
    thread.start()
    return {"message": "🟢 Detection started. Press 'q' to stop."}

# uvicorn main:app --reload