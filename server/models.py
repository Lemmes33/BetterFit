from datetime import date
from sqlalchemy.orm import validates
from app import db 

user_workout_plan = db.Table('user_workout_plan',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('workout_plan_id', db.Integer, db.ForeignKey('workout_plan.id'), primary_key=True)
)

class User(db.Model):
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    trainer_id = db.Column(db.Integer, db.ForeignKey('trainer.id'), nullable=True)

    # Relationships
    workout_plans = db.relationship('WorkoutPlan', secondary=user_workout_plan, backref=db.backref('users', lazy=True))
    nutrition_plans = db.relationship('NutritionPlan', backref='user', lazy=True)
    progress_tracking = db.relationship('ProgressTracking', backref='user', lazy=True)
    trainer = db.relationship('Trainer', backref='users', lazy=True)

    @validates('email')
    def validate_email(self, key, address):
        assert '@' in address, "Provided email is invalid"
        return address

    @validates('age')
    def validate_age(self, key, age):
        assert age > 0, "Age must be a positive integer"
        return age

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "age": self.age,
            "nationality": self.nationality,
            "description": self.description,
            "hobbies": self.hobbies
        }
    
class WorkoutPlan(db.Model):
   
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=True)
    duration = db.Column(db.Integer, nullable=False)
    start_date = db.Column(db.Date, nullable=False, default=date.today)
    end_date = db.Column(db.Date, nullable=False)
    trainer_id = db.Column(db.Integer , db.ForeignKey('trainer.id'), nullable=True)

    @validates('duration')
    def validate_duration(self, key, duration):
        assert duration > 0, "Duration must be a positive integer"
        return duration

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "duration": self.duration,
            "start_date": self.start_date,
            "end_date": self.end_date
        }
    
class NutritionPlan(db.Model):
   
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=True)
    start_date = db.Column(db.Date, nullable=False, default=date.today)
    end_date = db.Column(db.Date, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "description": self.description,
            "start_date": self.start_date,
            "end_date": self.end_date
        }
    
class ProgressTracking(db.Model):
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    weight = db.Column(db.Float, nullable=False)
    measurements = db.Column(db.Text, nullable=True)
    date = db.Column(db.Date, nullable=False, default=date.today)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "weight": self.weight,
            "measurements": self.measurements,
            "date": self.date
        }
    
class Trainer(db.Model):
   
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    phone = db.Column(db.String, nullable=True)
    specialty = db.Column(db.String, nullable=True)
    bio = db.Column(db.Text, nullable=True)

    # Relationships
    workout_plans = db.relationship('WorkoutPlan', backref='trainer', lazy=True)
    users = db.relationship('User', backref='trainer', lazy=True)


    @validates('email')
    def validate_email(self, key, address):
        assert '@' in address, "Provided email is invalid"
        return address

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "specialty": self.specialty,
            "bio": self.bio
        }
