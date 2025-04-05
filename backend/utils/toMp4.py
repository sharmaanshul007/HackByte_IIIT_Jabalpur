from moviepy import VideoFileClip
import os
from utils.deleteFile import deleteFile

def toMp4(path: str) -> str:
    if not os.path.exists(path):
        raise FileNotFoundError(f"File not found: {path}")
    
    base, _ = os.path.splitext(path)
    output_path = f"{base}.mp4"

    # Load and convert the video
    clip = VideoFileClip(path)
    clip.write_videofile(output_path, codec="libx264", audio_codec="aac")
    deleteFile(path)
    return output_path