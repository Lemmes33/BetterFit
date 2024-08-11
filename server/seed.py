from datetime import date, timedelta
from werkzeug.security import generate_password_hash
from app import app, db
from models import User, WorkoutPlan, NutritionPlan, ProgressTracking

def create_users():
    users = [
        User(
            username='john_doe',
            email='john@example.com',
            password=generate_password_hash('john123'),
            age=28,
            nationality='American',
            description='Fitness enthusiast',
            hobbies='Running, Hiking'
        ),
        User(
            username='jane_smith',
            email='jane@example.com',
            password=generate_password_hash('jane123'),
            age=32,
            nationality='Canadian',
            description='Nutrition expert',
            hobbies='Cooking, Yoga'
        )
    ]
    db.session.bulk_save_objects(users)
    db.session.commit()
    return users

def create_workout_plans(users):
    workout_plans = [
        WorkoutPlan(
            title='Beginner Cardio',
            description='A beginner-friendly cardio workout plan.',
            duration=30,
            start_date=date.today(),
            end_date=date.today() + timedelta(days=30)
        ),
        WorkoutPlan(
            title='Strength Training',
            description='An advanced strength training program.',
            duration=60,
            start_date=date.today(),
            end_date=date.today() + timedelta(days=60)
        )
    ]
    db.session.bulk_save_objects(workout_plans)
    db.session.commit()
    return workout_plans

def create_nutrition_plans(users):
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
            workout_plans = create_workout_plans(users)
            create_nutrition_plans(users)
            create_progress_tracking(users)
            print("Database seeded successfully!")
        except Exception as e:
            db.session.rollback()
            print(f"An error occurred while seeding the database: {e}")

if __name__ == '__main__':
    seed()
