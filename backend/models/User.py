import bcrypt
from utils.dbConnect import db

class UserModel:
    def __init__(self):
        self.collection = db["users"]

    def create_user(self, name, email, password):
        # Check if user already exists
        if self.collection.find_one({"email": email}):
            return {"error": "User already exists"}

        # Hash the password
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        # Create the user document
        user = {
            "name": name,
            "email": email,
            "password": hashed_password
        }

        # Insert into the DB
        self.collection.insert_one(user)
        return {"message": "User created successfully"}

    def find_by_email(self, email):
        return self.collection.find_one({"email": email})

    def verify_user(self, email, password):
        user = self.find_by_email(email)
        if not user:
            return {"error": "User not found"}

        if bcrypt.checkpw(password.encode('utf-8'), user['password']):
            return {"message": "Login successful", "user": user}
        else:
            return {"error": "Invalid password"}

user_model = UserModel()