from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)
@app.route("/api/health", methods=["GET"])
def health():
    return {"status": "ok"}, 200

# ===============================
# MONGODB CONNECTION
# ===============================

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db = client["kuet_foodloop"]

students_collection = db["students"]

# Test MongoDB connection
db.command("ping")
print("MongoDB connected successfully!")


# ===============================
# HOME
# ===============================

@app.route("/")
def home():
    return "KUET FoodLoop Backend + MongoDB is running!"
@app.route("/api/student/login", methods=["POST"])
def student_login():

    data = request.get_json()

    roll = data.get("roll")
    password = data.get("password")

    if not roll or not password:
        return jsonify({
            "success": False,
            "message": "Roll and password are required."
        }), 400

    student = students_collection.find_one({
        "roll": roll
    })

    if student is None:

        students_collection.insert_one({
            "roll": roll,
            "password": password,
            "meal_choice": None,
            "interests": []
        })

    return jsonify({
        "success": True,
        "message": "Login successful.",
        "roll": roll
    })


# ===============================
# STUDENT MEAL CHOICE
# ===============================

@app.route("/api/meal-choice", methods=["POST"])
def meal_choice():

    data = request.get_json()

    roll = data.get("roll")
    choice = data.get("choice")
    interests = data.get("interests", [])

    if not roll or choice not in ["yes", "no"]:
        return jsonify({
            "success": False,
            "message": "Invalid student data."
        }), 400

    students_collection.update_one(
        {"roll": roll},
        {
            "$set": {
                "roll": roll,
                "meal_choice": choice,
                "interests": interests
            }
        },
        upsert=True
    )

    return jsonify({
        "success": True,
        "message": "Meal choice saved successfully.",
        "roll": roll,
        "choice": choice
    })


# ===============================
# ADMIN STATS
# ===============================

@app.route("/api/admin/stats", methods=["GET"])
def admin_stats():

    total_students = students_collection.count_documents({})

    yes_count = students_collection.count_documents({
        "meal_choice": "yes"
    })

    no_count = students_collection.count_documents({
        "meal_choice": "no"
    })

    pending_count = total_students - yes_count - no_count

    return jsonify({
        "total_students": total_students,
        "yes": yes_count,
        "no": no_count,
        "pending": pending_count,
        "expected_students": yes_count
    })


# ===============================
# RUN SERVER
# ===============================

if __name__ == "__main__":
    app.run(debug=True)