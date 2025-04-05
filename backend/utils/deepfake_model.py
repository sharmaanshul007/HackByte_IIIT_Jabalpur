import torchvision.models as models
import torch
import torch.nn as nn

model = models.resnet50(weights=None)
in_features = model.fc.in_features

# Define the sequential structure with the correct dimensions
model.fc = nn.Sequential(
    nn.Linear(in_features, 512),  # fc.0 - First layer has 512 output features
    nn.ReLU(),                    # fc.1 (no parameters)
    nn.Dropout(0.5),              # fc.2 (no parameters)
    nn.Linear(512, 256),          # fc.3 - Second layer has 256 output features
    nn.ReLU(),                    # fc.4 (no parameters)
    nn.Dropout(0.5),              # fc.5 (no parameters)
    nn.Linear(256, 2)             # fc.6 - Final layer for binary classification
)

model.load_state_dict(torch.load('deepfake_detection_model.pth', map_location=torch.device('cpu')))
model.eval()