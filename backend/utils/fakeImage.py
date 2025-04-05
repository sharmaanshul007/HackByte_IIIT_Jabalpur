from PIL import Image
import torch
import cv2
import torchvision.transforms as transforms
from utils.deepfake_model import model

def fakeImage(frame) -> bool:
    # Convert from BGR (OpenCV) to RGB (PIL)
    image = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])
    image = transform(image).unsqueeze(0)
    
    with torch.no_grad():
        outputs = model(image)
        _, predicted = torch.max(outputs, 1)
        
    return predicted.item()