from flask import Flask
from pymongo import MongoClient
from dotenv import load_dotenv
import os

app = Flask(__name__)

# MongoDB connection
load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db = client["kuet_foodloop"]


db.command("ping")
print("MongoDB connected successfully!")
@app.route("/")
def home():
    return "KUET FoodLoop Backend + MongoDB is running!"

if __name__ == "__main__":
    app.run(debug=True)