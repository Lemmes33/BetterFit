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

if __name__ == '__main__':
    seed()
