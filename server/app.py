# app.py
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from dotenv import load_dotenv
import os
import re
from datetime import datetime
from cryptography.fernet import Fernet
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from functools import wraps
from flask_restful import Api, Resource, reqparse
import requests
from requests.auth import HTTPBasicAuth
import base64
import json

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI', 'sqlite:///app.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'super-secret'
app.secret_key = 'your_secret_key'
app.config['SESSION_TYPE'] = 'filesystem'

# Initialize extensions
bcrypt = Bcrypt(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
api = Api(app)
CORS(app, supports_credentials=True)
jwt = JWTManager(app)

# Handle encryption key
encryption_key = os.getenv('ENCRYPTION_KEY')
if not encryption_key:
    encryption_key = Fernet.generate_key().decode()
    with open('.env', 'a') as f:
        f.write(f'\nENCRYPTION_KEY={encryption_key}\n')
cipher = Fernet(encryption_key.encode())

def encrypt(data):
    return cipher.encrypt(data.encode()).decode()

def decrypt(data):
    return cipher.decrypt(data.encode()).decode()

def validate_email(email):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email) is not None

def validate_password(password):
    if len(password) < 8:
        return False
    if not re.search(r'[A-Z]', password):
        return False
    if not re.search(r'[a-z]', password):
        return False
    if not re.search(r'[0-9]', password):
        return False
    if not re.search(r'[@$!%*?&#]', password):
        return False
    return True

def validate_age(age):
    if isinstance(age, int) and 18 <= age <= 120:
        return True
    return False

def validate_date(date_text):
    try:
        datetime.strptime(date_text, '%Y-%m-%d')
        return True
    except ValueError:
        return False

def admin_required(fn):
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        from models import User  # Deferred import
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if user is None:
            return jsonify({"error": "User not found"}), 404
        if user.role != 'admin':
            return jsonify({"error": "Admin access required"}), 403
        return fn(*args, **kwargs)
    return wrapper

def get_mpesa_token():
    consumer_key = 'YXZhAOLvjYqmX7TkAirasXHJfTjUHHqQtIOAGXYTLjjVfvUK'
    consumer_secret = 'c6SpWnqqHckfRGGGKQt56LKdwIDrMQXeHlGs9PEiSbfGLLAmnbUjc7niS8olHtJ2'
    api_URL = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    r = requests.get(api_URL, auth=HTTPBasicAuth(consumer_key, consumer_secret))
    return r.json()['access_token']

class MakeSTKPush(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('phone', type=str, required=True, help="This field is required")
    parser.add_argument('amount', type=str, required=True, help="This field is required")

    def post(self):
        from models import User  # Deferred import
        data = MakeSTKPush.parser.parse_args()
        try:
            access_token = get_mpesa_token()
            api_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
            headers = {
                "Authorization": f"Bearer {access_token}",
                "Content-Type": "application/json"
            }
            request = {
                "BusinessShortCode": "174379",
                "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTYwMjE2MTY1NjI3",
                "Timestamp": "20160216165627",
                "TransactionType": "CustomerPayBillOnline",
                "Amount": data["amount"],
                "PartyA": data["phone"],
                "PartyB": "174379",
                "PhoneNumber": data["phone"],
                "CallBackURL": "https://mydomain.com/pat",
                "AccountReference": "Test",
                "TransactionDesc": "Test"
            }
            response = requests.post(api_url, json=request, headers=headers)
            if response.status_code > 299:
                return {"success": False, "message": "Sorry, something went wrong please try again later."}, 400
            return {"data": json.loads(response.text)}, 200
        except:
            return {"success": False, "message": "Sorry something went wrong please try again."}, 400

# Register the M-Pesa STK Push resource
api.add_resource(MakeSTKPush, "/stkpush")

# Define routes and resources

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    age = data.get("age")

    if not username or not email or not password or not age:
        return {"error": "Missing required fields"}, 400

    if not validate_email(email):
        return {"error": "Invalid email format"}, 400

    if not validate_password(password):
        return {"error": "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character"}, 400

    try:
        age = int(age)
    except ValueError:
        return {"error": "Age must be a number"}, 400

    if not validate_age(age):
        return {"error": "Invalid age. Age must be a number between 18 and 120."}, 400

    from models import User  # Deferred import
    if User.query.filter_by(email=email).first():
        return {"error": "Email already exists"}, 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(
        username=username,
        email=email,
        password=hashed_password,
        age=age,
    )
    db.session.add(new_user)
    db.session.commit()
    return new_user.to_dict(), 201

@app.route('/login', methods=['POST'])
def login():
    from models import User  # Deferred import
    email = request.json.get("email")
    password = request.json.get("password")
    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id, expires_delta=False)
        return {"access_token": access_token}, 200
    return {"error": "Invalid credentials"}, 401

@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    return {"message": "Logged out successfully"}, 200

@app.route('/users', methods=['GET'])
@app.route('/users/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id=None):
    from models import User  # Deferred import
    if user_id:
        user = User.query.get(user_id)
        if user:
            return user.to_dict(), 200
        return {"error": "User not found"}, 404

    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}, 200

@app.route('/profile', methods=['GET'])
@jwt_required()
def user_profile():
    from models import User  # Deferred import
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user:
        return jsonify(user.to_dict())
    return {"error": "User not found"}, 404

@app.route('/workout_plans', methods=['POST'])
@app.route('/workout_plans', methods=['GET'])
@jwt_required()
def workout_plans():
    from models import WorkoutPlan  # Deferred import
    if request.method == 'POST':
        data = request.get_json()

        if not data.get('title') or not data.get('duration') or not data.get('start_date') or not data.get('end_date'):
            return {"error": "Missing required fields"}, 400

        if not validate_date(data['start_date']) or not validate_date(data['end_date']):
            return {"error": "Invalid date format. Use YYYY-MM-DD."}, 400

        new_plan = WorkoutPlan(
            title=data['title'],
            duration=data['duration'],
            start_date=data['start_date'],
            end_date=data['end_date'],
            user_id=get_jwt_identity()
        )
        db.session.add(new_plan)
        db.session.commit()
        return {"message": "Workout plan created successfully"}, 201

    plans = WorkoutPlan.query.filter_by(user_id=get_jwt_identity()).all()
    return jsonify([plan.to_dict() for plan in plans])

@app.route('/nutrition_plans', methods=['POST'])
@app.route('/nutrition_plans', methods=['GET'])
@jwt_required()
def nutrition_plans():
    from models import NutritionPlan  # Deferred import
    if request.method == 'POST':
        data = request.get_json()

        if not data.get('title') or not data.get('meals') or not data.get('start_date') or not data.get('end_date'):
            return {"error": "Missing required fields"}, 400

        if not validate_date(data['start_date']) or not validate_date(data['end_date']):
            return {"error": "Invalid date format. Use YYYY-MM-DD."}, 400

        new_plan = NutritionPlan(
            title=data['title'],
            meals=data['meals'],
            start_date=data['start_date'],
            end_date=data['end_date'],
            user_id=get_jwt_identity()
        )
        db.session.add(new_plan)
        db.session.commit()
        return {"message": "Nutrition plan created successfully"}, 201

    plans = NutritionPlan.query.filter_by(user_id=get_jwt_identity()).all()
    return jsonify([plan.to_dict() for plan in plans])

@app.route('/progress_tracking', methods=['POST'])
@app.route('/progress_tracking', methods=['GET'])
@jwt_required()
def progress_tracking():
    from models import ProgressTracking  # Deferred import
    if request.method == 'POST':
        data = request.get_json()

        if not data.get('progress') or not data.get('date'):
            return {"error": "Missing required fields"}, 400

        if not validate_date(data['date']):
            return {"error": "Invalid date format. Use YYYY-MM-DD."}, 400

        new_progress = ProgressTracking(
            progress=data['progress'],
            date=data['date'],
            user_id=get_jwt_identity()
        )
        db.session.add(new_progress)
        db.session.commit()
        return {"message": "Progress tracking entry created successfully"}, 201

    entries = ProgressTracking.query.filter_by(user_id=get_jwt_identity()).all()
    return jsonify([entry.to_dict() for entry in entries])

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
