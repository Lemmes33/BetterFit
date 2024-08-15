# app.py
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token

from dotenv import load_dotenv
import os
import re
from datetime import datetime
from cryptography.fernet import Fernet
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from functools import wraps
from flask_restful import Api 
# Import models
from models import db,User, WorkoutPlan, NutritionPlan, ProgressTracking



load_dotenv()

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI', 'sqlite:///app.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['JWT_SECRET_KEY'] = 'super-secret'
app.secret_key = 'your_secret_key'
app.config['SESSION_TYPE'] = 'filesystem'

# Initialize extensions

bcrypt = Bcrypt(app)
migrate = Migrate(app, db)
db.init_app(app)
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

    if User.query.filter_by(email=email).first():
        return {"error": "Email already exists"}, 400

    # hashed_password = generate_password_hash(password)
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
    email = request.json.get("email")
    password = request.json.get("password")
    

    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        # Create JWT token
        access_token = create_access_token(identity=user.id,expires_delta=False),
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
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user:
        return jsonify(user.to_dict())
    return {"error": "User not found"}, 404

@app.route('/workout_plans', methods=['POST'])
@app.route('/workout_plans', methods=['GET'])
@jwt_required()
def workout_plans():
    if request.method == 'POST':
        data = request.get_json()

        if not data.get('title') or not data.get('duration') or not data.get('start_date') or not data.get('end_date'):
            return {"error": "Missing required fields"}, 400

        if not validate_date(data['start_date']) or not validate_date(data['end_date']):
            return {"error": "Invalid date format. Use YYYY-MM-DD"}, 400

        new_plan = WorkoutPlan(
            title=encrypt(data['title']),
            description=encrypt(data['description']) if data.get('description') else None,
            duration=data['duration'],
            start_date=datetime.strptime(data['start_date'], '%Y-%m-%d').date(),
            end_date=datetime.strptime(data['end_date'], '%Y-%m-%d').date()
        )
        db.session.add(new_plan)
        db.session.commit()
        return new_plan.to_dict(), 201

    else:
        plans = WorkoutPlan.query.all()
        return {"workout_plans": [plan.to_dict() for plan in plans]}, 200

@app.route('/nutrition_plans', methods=['POST'])
@app.route('/nutrition_plans', methods=['GET'])
@jwt_required()
def nutrition_plans():
    if request.method == 'POST':
        data = request.get_json()

        if not data.get('user_id') or not data.get('title') or not data.get('start_date') or not data.get('end_date'):
            return {"error": "Missing required fields"}, 400

        if not validate_date(data['start_date']) or not validate_date(data['end_date']):
            return {"error": "Invalid date format. Use YYYY-MM-DD"}, 400

        new_plan = NutritionPlan(
            user_id=data['user_id'],
            title=encrypt(data['title']),
            description=encrypt(data['description']) if data.get('description') else None,
            start_date=datetime.strptime(data['start_date'], '%Y-%m-%d').date(),
            end_date=datetime.strptime(data['end_date'], '%Y-%m-%d').date()
        )
        db.session.add(new_plan)
        db.session.commit()
        return new_plan.to_dict(), 201

    else:
        plans = NutritionPlan.query.all()
        return {"nutrition_plans": [plan.to_dict() for plan in plans]}, 200

@app.route('/progress_tracking', methods=['POST'])
@app.route('/progress_tracking', methods=['GET'])
@jwt_required()
def progress_tracking():
    if request.method == 'POST':
        data = request.get_json()

        if not data.get('user_id') or not data.get('weight') or not data.get('date'):
            return {"error": "Missing required fields"}, 400

        if not validate_date(data['date']):
            return {"error": "Invalid date format. Use YYYY-MM-DD"}, 400

        new_progress = ProgressTracking(
            user_id=data['user_id'],
            weight=data['weight'],
            measurements=encrypt(data['measurements']) if data.get('measurements') else None,
            date=datetime.strptime(data['date'], '%Y-%m-%d').date()
        )
        db.session.add(new_progress)
        db.session.commit()
        return new_progress.to_dict(), 201

    else:
        progress_records = ProgressTracking.query.all()
        return {"progress_tracking": [record.to_dict() for record in progress_records]}, 200
    
@app.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user:
        return jsonify(user.to_dict())
    return {"error": "User not found"}, 404

@app.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return {"error": "User not found"}, 404

    data = request.get_json()
    user.username = data.get("username", user.username)
    user.email = data.get("email", user.email)
    user.contact = data.get("contact", user.contact)
    user.fun_fact = data.get("fun_fact", user.fun_fact)
    user.avatar = data.get("avatar", user.avatar)

    # Optionally validate email if changed
    if data.get("email") and not validate_email(data["email"]):
        return {"error": "Invalid email format"}, 400

    db.session.commit()
    return jsonify(user.to_dict())

@app.route('/profile', methods=['DELETE'])
@jwt_required()
def delete_profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return {"message": "Profile deleted"}, 200
    return {"error": "User not found"}, 404


if __name__ == '__main__':
    app.run(debug=True)
