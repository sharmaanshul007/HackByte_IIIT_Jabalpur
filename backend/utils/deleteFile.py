import os

def deleteFile(file_path: str) -> bool:
    if os.path.exists(file_path):
        os.remove(file_path)
        print(f"[INFO] Deleted: {file_path}")
        return True
    else:
        print(f"[WARNING] File not found: {file_path}")
        return False