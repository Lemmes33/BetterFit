from flask import Flask, request, jsonify, session
from flask_restful import Api, Resource
from dotenv import load_dotenv
import os
import re
from datetime import datetime
from cryptography.fernet import Fernet

<<<<<<< HEAD
load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI', 'sqlite:///app.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'your_secret_key'
app.config['SESSION_TYPE'] = 'filesystem'

# Initialize extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)
api = Api(app)
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

# Define your models here
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

# Define resources
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
            nationality=encrypt(nationality) if nationality else None,
            description=encrypt(description) if description else None,
            hobbies=encrypt(hobbies) if hobbies else None
        )
        db.session.add(new_user)
        db.session.commit()
        return new_user.to_dict(), 201

class Login(Resource):
    def post(self):
        email = request.json.get("email")
        password = request.json.get("password")
=======
from extensions import db, bcrypt, migrate, cors  # Import extensions
from models import User, WorkoutPlan, NutritionPlan, ProgressTracking

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.secret_key = 'your_secret_key'
    app.config['SESSION_TYPE'] = 'filesystem'

    # Initialize extensions
    db.init_app(app)
    bcrypt.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app, supports_credentials=True)
    
    api = Api(app)
>>>>>>> 7fdf119 (got the database table to show and added some files)

    encryption_key = os.getenv('ENCRYPTION_KEY')
    if not encryption_key:
        encryption_key = Fernet.generate_key().decode()
        with open('.env', 'a') as f:
            f.write(f'\nENCRYPTION_KEY={encryption_key}\n')
    cipher = Fernet(encryption_key.encode())

<<<<<<< HEAD
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
=======
    def encrypt(data):
        return cipher.encrypt(data.encode()).decode()

    def decrypt(data):
        return cipher.decrypt(data.encode()).decode()
>>>>>>> 7fdf119 (got the database table to show and added some files)

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
            new_user = User(
                username=username, 
                email=email, 
                password=hashed_password, 
                age=age, 
                nationality=encrypt(nationality) if nationality else None,
                description=encrypt(description) if description else None,
                hobbies=encrypt(hobbies) if hobbies else None
            )
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
                title=encrypt(data['title']),
                description=encrypt(data['description']) if data.get('description') else None,
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
<<<<<<< HEAD
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
        return {"message": "Plan updated"}, 200

    def delete(self, plan_id):
        plan = WorkoutPlan.query.get(plan_id)
        if not plan:
            return {"error": "Plan not found"}, 404

        db.session.delete(plan)
        db.session.commit()
        return {"message": "Plan deleted"}, 200

class NutritionPlanResource(Resource):
    def post(self):
        data = request.get_json()
        new_plan = NutritionPlan(
            user_id=data['user_id'],
            title=encrypt(data['title']),
            description=encrypt(data['description']) if data.get('description') else None,
            start_date=data['start_date'],
            end_date=data['end_date']
        )
        db.session.add(new_plan)
        db.session.commit()
        return new_plan.to_dict(), 201

    def get(self, plan_id=None):
        if plan_id:
            plan = NutritionPlan.query.get(plan_id)
            if plan:
                return plan.to_dict(), 200
            return {"error": "Plan not found"}, 404
        
        plans = NutritionPlan.query.all()
        return [plan.to_dict() for plan in plans], 200

    def patch(self, plan_id):
        plan = NutritionPlan.query.get(plan_id)
        if not plan:
            return {"error": "Plan not found"}, 404
        
        data = request.get_json()
        if 'title' in data:
            plan.title = encrypt(data['title'])
        if 'description' in data:
            plan.description = encrypt(data['description'])
        if 'start_date' in data:
            plan.start_date = data['start_date']
        if 'end_date' in data:
            plan.end_date = data['end_date']

        db.session.commit()
        return {"message": "Plan updated"}, 200

    def delete(self, plan_id):
        plan = NutritionPlan.query.get(plan_id)
        if not plan:
            return {"error": "Plan not found"}, 404

        db.session.delete(plan)
        db.session.commit()
        return {"message": "Plan deleted"}, 200

class ProgressTrackingResource(Resource):
    def post(self):
        data = request.get_json()
        new_progress = ProgressTracking(
            user_id=data['user_id'],
            weight=data['weight'],
            measurements=encrypt(data['measurements']) if data.get('measurements') else None,
            date=data['date']
        )
        db.session.add(new_progress)
        db.session.commit()
        return new_progress.to_dict(), 201

    def get(self, progress_id=None):
        if progress_id:
            progress = ProgressTracking.query.get(progress_id)
            if progress:
                return progress.to_dict(), 200
            return {"error": "Progress not found"}, 404
        
        progresses = ProgressTracking.query.all()
        return [progress.to_dict() for progress in progresses], 200

    def patch(self, progress_id):
        progress = ProgressTracking.query.get(progress_id)
        if not progress:
            return {"error": "Progress not found"}, 404
        
        data = request.get_json()
        if 'weight' in data:
            progress.weight = data['weight']
        if 'measurements' in data:
            progress.measurements = encrypt(data['measurements'])
        if 'date' in data:
            progress.date = data['date']

        db.session.commit()
        return {"message": "Progress updated"}, 200

    def delete(self, progress_id):
        progress = ProgressTracking.query.get(progress_id)
        if not progress:
            return {"error": "Progress not found"}, 404

        db.session.delete(progress)
        db.session.commit()
        return {"message": "Progress deleted"}, 200

# Add resources and routes
api.add_resource(Register, '/register')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(UserResource, '/users', '/users/<int:user_id>')
api.add_resource(WorkoutPlanResource, '/workout_plans', '/workout_plans/<int:plan_id>')
api.add_resource(NutritionPlanResource, '/nutrition_plans', '/nutrition_plans/<int:plan_id>')
api.add_resource(ProgressTrackingResource, '/progress_tracking', '/progress_tracking/<int:progress_id>')

if __name__ == '__main__':
    app.run(debug=True, port=5555)
=======
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

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
>>>>>>> 7fdf119 (got the database table to show and added some files)
