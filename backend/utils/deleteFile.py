import os

def deleteFile(filename: str, folder: str = "uploaded_videos") -> bool:
    file_path = os.path.join(folder, filename)
    if os.path.exists(file_path):
        os.remove(file_path)
        print(f"[INFO] Deleted: {file_path}")
        return True
    else:
        print(f"[WARNING] File not found: {file_path}")
        return False