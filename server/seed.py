
from datetime import date, timedelta
from werkzeug.security import generate_password_hash
from app import app, db
from models import User, WorkoutPlan, NutritionPlan, ProgressTracking
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def create_users():
    if User.query.count() > 0:
        logger.info("Users already exist, skipping user creation.")
        return User.query.all()
    
    users = [
        User(
            username='john_doe',
            email='john@example.com',
            password=generate_password_hash('john123'),
            age=28,
        ),
        User(
            username='jane_smith',
            email='jane@example.com',
            password=generate_password_hash('jane123'),
            age=32,
        )
    ]
    db.session.bulk_save_objects(users)
    db.session.commit()
    return users

def create_workout_plans(users):
    if WorkoutPlan.query.count() > 0:
        logger.info("Workout plans already exist, skipping workout plan creation.")
        return WorkoutPlan.query.all()
    
    workout_plans = [
        WorkoutPlan(
            title='Beginner Cardio',
            description='A beginner-friendly cardio workout plan.',
            duration=30,
            start_date=date.today(),
            end_date=date.today() + timedelta(days=30),
            user_id=users[0].id  # Associate with the first user
        ),
        WorkoutPlan(
            title='Strength Training',
            description='An advanced strength training program.',
            duration=60,
            start_date=date.today(),
            end_date=date.today() + timedelta(days=60),
            user_id=users[1].id  # Associate with the second user
        )
    ]
    db.session.bulk_save_objects(workout_plans)
    db.session.commit()
    return workout_plans

def create_nutrition_plans(users):
    if NutritionPlan.query.count() > 0:
        logger.info("Nutrition plans already exist, skipping nutrition plan creation.")
        return NutritionPlan.query.all()
    
    nutrition_plans = [
        NutritionPlan(
            user=users[0],
            title='Weight Loss Plan',
            description='Low-calorie diet to aid weight loss.',
            start_date=date.today(),
            end_date=date.today() + timedelta(days=30)
        ),
        NutritionPlan(
            user=users[1],
            title='Muscle Gain Plan',
            description='High-protein diet for muscle building.',
            start_date=date.today(),
            end_date=date.today() + timedelta(days=45)
        )
    ]
    db.session.bulk_save_objects(nutrition_plans)
    db.session.commit()
    return nutrition_plans

def create_progress_tracking(users):
    if ProgressTracking.query.count() > 0:
        logger.info("Progress tracking entries already exist, skipping progress tracking creation.")
        return ProgressTracking.query.all()
    
    progress_entries = [
        ProgressTracking(
            user=users[0],
            weight=75.5,
            measurements='Chest: 90 cm, Waist: 80 cm',
            date=date.today()
        ),
        ProgressTracking(
            user=users[1],
            weight=68.0,
            measurements='Chest: 85 cm, Waist: 70 cm',
            date=date.today()
        )
    ]
    db.session.bulk_save_objects(progress_entries)
    db.session.commit()

def seed():
    with app.app_context():
        try:
            users = create_users()
            create_workout_plans(users)
            create_nutrition_plans(users)
            create_progress_tracking(users)
            logger.info("Database seeded successfully!")
        except Exception as e:
            db.session.rollback()
            logger.error(f"An error occurred while seeding the database: {e}")
=======
from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_restful import Api, Resource
from dotenv import load_dotenv
import os
from models import db, User, WorkoutPlan, NutritionPlan, ProgressTracking

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'your_secret_key'
app.config['SESSION_TYPE'] = 'filesystem'

db.init_app(app)
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)
CORS(app, supports_credentials=True)
api = Api(app) 

class Register(Resource):
    def post(self):
        username = request.json.get("username")
        email = request.json.get("email")
        password = request.json.get("password")
        age = request.json.get("age")
        nationality = request.json.get("nationality")
        description = request.json.get("description")
        hobbies = request.json.get("hobbies")

        if not username or not email or not password or not age:
            return {"error": "Missing fields"}, 400

        if User.query.filter_by(email=email).first():
            return {"error": "Email already exists"}, 400

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(username=username, email=email, password=hashed_password, age=age, nationality=nationality, description=description, hobbies=hobbies)
        db.session.add(new_user)
        db.session.commit()
        return new_user.to_dict(), 201
    
class Login(Resource):
    def post(self):
        email = request.json.get("email")
        password = request.json.get("password")

        user = User.query.filter_by(email=email).first()
        if user and bcrypt.check_password_hash(user.password, password):
            session['user_id'] = user.id
            return {"message": "Logged in successfully"}, 200
        return {"error": "Invalid credentials"}, 401

class Logout(Resource):
    def post(self):
        session.pop('user_id', None)
        return {"message": "Logged out successfully"}, 200

class UserResource(Resource):
    def get(self, user_id=None):
        if user_id:
            user = User.query.get(user_id)
            if user:
                return user.to_dict(), 200
            return {"error": "User not found"}, 404

        users = User.query.all()
        return {"users": [user.to_dict() for user in users]}, 200
    
class WorkoutPlanResource(Resource):
    def post(self):
        data = request.get_json()
        new_plan = WorkoutPlan(
            title=data['title'],
            description=data.get('description'),
            duration=data['duration'],
            start_date=data['start_date'],
            end_date=data['end_date']
        )
        db.session.add(new_plan)
        db.session.commit()
        return new_plan.to_dict(), 201

    def get(self, plan_id=None):
        if plan_id:
            plan = WorkoutPlan.query.get(plan_id)
            if plan:
                return plan.to_dict(), 200
            return {"error": "Plan not found"}, 404
        
        plans = WorkoutPlan.query.all()
        return [plan.to_dict() for plan in plans], 200

    def patch(self, plan_id):
        plan = WorkoutPlan.query.get(plan_id)
        if not plan:
            return {"error": "Plan not found"}, 404
        
        data = request.get_json()
        if 'title' in data:
            plan.title = data['title']
        if 'description' in data:
            plan.description = data['description']
        if 'duration' in data:
            plan.duration = data['duration']
        if 'start_date' in data:
            plan.start_date = data['start_date']
        if 'end_date' in data:
            plan.end_date = data['end_date']

        db.session.commit()
        return {"message": "Plan updated"}, 200

    def delete(self, plan_id):
        plan = WorkoutPlan.query.get(plan_id)
        if not plan:
            return {"error": "Plan not found"}, 404

        db.session.delete(plan)
        db.session.commit()
        return {"message": "Plan deleted"}, 200
    
api.add_resource(Register, '/register')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(UserResource, '/users', '/users/<int:user_id>')
api.add_resource(WorkoutPlanResource, '/workout_plans', '/workout_plans/<int:plan_id>')