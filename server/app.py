from flask import Flask, request, jsonify, session
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

load_dotenv()

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI', 'sqlite:///app.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-secret-key')  # Change this to your actual secret key
app.secret_key = os.getenv('SECRET_KEY', 'your_secret_key')
app.config['SESSION_TYPE'] = 'filesystem'

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
CORS(app, supports_credentials=True)

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
    return age.isdigit() and 18 <= int(age) <= 120

def validate_date(date_text):
    try:
        datetime.strptime(date_text, '%Y-%m-%d')
        return True
    except ValueError:
        return False

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    nationality = db.Column(db.String, nullable=True)
    description = db.Column(db.String, nullable=True)
    hobbies = db.Column(db.String, nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "age": self.age,
            "nationality": decrypt(self.nationality) if self.nationality else None,
            "description": decrypt(self.description) if self.description else None,
            "hobbies": decrypt(self.hobbies) if self.hobbies else None
        }

class WorkoutPlan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True)
    duration = db.Column(db.Integer, nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "title": decrypt(self.title),
            "description": decrypt(self.description) if self.description else None,
            "duration": self.duration,
            "start_date": self.start_date,
            "end_date": self.end_date
        }

class NutritionPlan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": decrypt(self.title),
            "description": decrypt(self.description) if self.description else None,
            "start_date": self.start_date,
            "end_date": self.end_date
        }

class ProgressTracking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    weight = db.Column(db.Float, nullable=False)
    measurements = db.Column(db.String, nullable=True)
    date = db.Column(db.Date, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "weight": self.weight,
            "measurements": decrypt(self.measurements) if self.measurements else None,
            "date": self.date
        }


@app.route('/register', methods=['POST'])
def register():
    username = request.json.get("username")
    email = request.json.get("email")
    password = request.json.get("password")
    age = request.json.get("age")

    if not username or not email or not password or not age:
        return {"error": "Missing required fields"}, 400

    if not validate_email(email):
        return {"error": "Invalid email format"}, 400

    if not validate_password(password):
        return {"error": "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character"}, 400

    if not validate_age(age):
        return {"error": "Invalid age. Age must be a number between 18 and 120."}, 400

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
    email = request.json.get("email")
    password = request.json.get("password")

    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity={'username': user.username})
        session['user_id'] = user.id
        return {"message": "Logged in successfully", "access_token": access_token}, 200
    return {"error": "Invalid credentials"}, 401

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return {"message": "Logged out successfully"}, 200

@app.route('/users', methods=['GET'])
@app.route('/users/<int:user_id>', methods=['GET'])
def get_users(user_id=None):
    if user_id:
        user = User.query.get(user_id)
        if user:
            return user.to_dict(), 200
        return {"error": "User not found"}, 404

    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}, 200

@app.route('/workout_plans', methods=['POST'])
def create_workout_plan():
    data = request.get_json()

    if not data.get('title') or not data.get('duration') or not data.get('start_date') or not data.get('end_date'):
        return {"error": "Missing required fields"}, 400

    if not validate_date(data['start_date']) or not validate_date(data['end_date']):
        return {"error": "Invalid date format. Use YYYY-MM-DD"}, 400

    new_plan = WorkoutPlan(
        title=encrypt(data['title']),
        description=encrypt(data['description']) if data.get('description') else None,
        duration=data['duration'],
        start_date=data['start_date'],
        end_date=data['end_date']
    )
    db.session.add(new_plan)
    db.session.commit()
    return new_plan.to_dict(), 201

@app.route('/workout_plans', methods=['GET'])
@app.route('/workout_plans/<int:plan_id>', methods=['GET'])
def get_workout_plans(plan_id=None):
    if plan_id:
        plan = WorkoutPlan.query.get(plan_id)
        if plan:
            return plan.to_dict(), 200
        return {"error": "Plan not found"}, 404

    plans = WorkoutPlan.query.all()
    return [plan.to_dict() for plan in plans], 200

@app.route('/workout_plans/<int:plan_id>', methods=['PATCH'])
def update_workout_plan(plan_id):
    plan = WorkoutPlan.query.get(plan_id)
    if not plan:
        return {"error": "Plan not found"}, 404

    data = request.get_json()

    if 'title' in data:
        plan.title = encrypt(data['title'])
    if 'description' in data:
        plan.description = encrypt(data['description'])
    if 'duration' in data:
        plan.duration = data['duration']
    if 'start_date' in data:
        if not validate_date(data['start_date']):
            return {"error": "Invalid start date format. Use YYYY-MM-DD"}, 400
        plan.start_date = data['start_date']
    if 'end_date' in data:
        if not validate_date(data['end_date']):
            return {"error": "Invalid end date format. Use YYYY-MM-DD"}, 400
        plan.end_date = data['end_date']

    db.session.commit()
    return plan.to_dict(), 200

@app.route('/workout_plans/<int:plan_id>', methods=['DELETE'])
def delete_workout_plan(plan_id):
    plan = WorkoutPlan.query.get(plan_id)
    if not plan:
        return {"error": "Plan not found"}, 404
    db.session.delete(plan)
    db.session.commit()
    return {"message": "Plan deleted"}, 200

@app.route('/nutrition_plans', methods=['POST'])
def create_nutrition_plan():
    data = request.get_json()

    if not data.get('title') or not data.get('user_id') or not data.get('start_date') or not data.get('end_date'):
        return {"error": "Missing required fields"}, 400

    if not validate_date(data['start_date']) or not validate_date(data['end_date']):
        return {"error": "Invalid date format. Use YYYY-MM-DD"}, 400

    new_plan = NutritionPlan(
        title=encrypt(data['title']),
        description=encrypt(data['description']) if data.get('description') else None,
        user_id=data['user_id'],
        start_date=data['start_date'],
        end_date=data['end_date']
    )
    db.session.add(new_plan)
    db.session.commit()
    return new_plan.to_dict(), 201

@app.route('/nutrition_plans', methods=['GET'])
@app.route('/nutrition_plans/<int:plan_id>', methods=['GET'])
def get_nutrition_plans(plan_id=None):
    if plan_id:
        plan = NutritionPlan.query.get(plan_id)
        if plan:
            return plan.to_dict(), 200
        return {"error": "Plan not found"}, 404

    plans = NutritionPlan.query.all()
    return [plan.to_dict() for plan in plans], 200

@app.route('/nutrition_plans/<int:plan_id>', methods=['PATCH'])
def update_nutrition_plan(plan_id):
    plan = NutritionPlan.query.get(plan_id)
    if not plan:
        return {"error": "Plan not found"}, 404

    data = request.get_json()

    if 'title' in data:
        plan.title = encrypt(data['title'])
    if 'description' in data:
        plan.description = encrypt(data['description'])
    if 'start_date' in data:
        if not validate_date(data['start_date']):
            return {"error": "Invalid start date format. Use YYYY-MM-DD"}, 400
        plan.start_date = data['start_date']
    if 'end_date' in data:
        if not validate_date(data['end_date']):
            return {"error": "Invalid end date format. Use YYYY-MM-DD"}, 400
        plan.end_date = data['end_date']

    db.session.commit()
    return plan.to_dict(), 200

@app.route('/nutrition_plans/<int:plan_id>', methods=['DELETE'])
def delete_nutrition_plan(plan_id):
    plan = NutritionPlan.query.get(plan_id)
    if not plan:
        return {"error": "Plan not found"}, 404
    db.session.delete(plan)
    db.session.commit()
    return {"message": "Plan deleted"}, 200

@app.route('/progress_trackings', methods=['POST'])
def create_progress_tracking():
    data = request.get_json()

    if not data.get('user_id') or not data.get('weight') or not data.get('date'):
        return {"error": "Missing required fields"}, 400

    if not validate_date(data['date']):
        return {"error": "Invalid date format. Use YYYY-MM-DD"}, 400

    new_progress = ProgressTracking(
        user_id=data['user_id'],
        weight=data['weight'],
        measurements=encrypt(data['measurements']) if data.get('measurements') else None,
        date=data['date']
    )
    db.session.add(new_progress)
    db.session.commit()
    return new_progress.to_dict(), 201

@app.route('/progress_trackings', methods=['GET'])
@app.route('/progress_trackings/<int:progress_id>', methods=['GET'])
def get_progress_trackings(progress_id=None):
    if progress_id:
        progress = ProgressTracking.query.get(progress_id)
        if progress:
            return progress.to_dict(), 200
        return {"error": "Progress not found"}, 404

    progresses = ProgressTracking.query.all()
    return [progress.to_dict() for progress in progresses], 200

@app.route('/progress_trackings/<int:progress_id>', methods=['PATCH'])
def update_progress_tracking(progress_id):
    progress = ProgressTracking.query.get(progress_id)
    if not progress:
        return {"error": "Progress not found"}, 404

    data = request.get_json()

    if 'weight' in data:
        progress.weight = data['weight']
    if 'measurements' in data:
        progress.measurements = encrypt(data['measurements'])
    if 'date' in data:
        if not validate_date(data['date']):
            return {"error": "Invalid date format. Use YYYY-MM-DD"}, 400
        progress.date = data['date']

    db.session.commit()
    return progress.to_dict(), 200

@app.route('/progress_trackings/<int:progress_id>', methods=['DELETE'])
def delete_progress_tracking(progress_id):
    progress = ProgressTracking.query.get(progress_id)
    if not progress:
        return {"error": "Progress not found"}, 404
    db.session.delete(progress)
    db.session.commit()
    return {"message": "Progress deleted"}, 200

if __name__ == '__main__':
    app.run(debug=True)
