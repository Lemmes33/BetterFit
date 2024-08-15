from datetime import date, timedelta
from werkzeug.security import generate_password_hash
from app import app, db, bcrypt
from models import User, WorkoutPlan, NutritionPlan, ProgressTracking
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def seed():
    with app.app_context():
        # Drop all tables and create new ones
        db.drop_all()
        db.create_all()

        # Seed Users
        if User.query.count() == 0:
            users = [
                User(
                    username='john_doe',
                    email='john@example.com',
                    password=bcrypt.generate_password_hash('john123').decode('utf-8'),
                    age=28,
                    nationality='American',
                    description='Fitness enthusiast',
                    hobbies='Running, Cycling',
                    photo_url='https://example.com/photo/john_doe.jpg',
                    video_url='https://example.com/video/john_doe.mp4'
                ),
                User(
                    username='jane_smith',
                    email='jane@example.com',
                    password=bcrypt.generate_password_hash('jane123').decode('utf-8'),
                    age=32,
                    nationality='British',
                    description='Nutrition expert',
                    hobbies='Yoga, Reading',
                    photo_url='https://example.com/photo/jane_smith.jpg',
                    video_url='https://example.com/video/jane_smith.mp4'
                )
            ]
            db.session.bulk_save_objects(users)
            try:
                db.session.commit()
                logger.info("Users committed successfully!")
            except Exception as e:
                db.session.rollback()
                logger.error(f"Error committing users: {e}")

            for user in users:
                logger.info(f"User ID: {user.id}, Username: {user.username}")

        # Seed Workout Plans
        if WorkoutPlan.query.count() == 0:
            workout_plans = [
                WorkoutPlan(
                    title='Beginner Cardio',
                    description='A beginner-friendly cardio workout plan.',
                    duration=30,
                    start_date=date.today(),
                    end_date=date.today() + timedelta(days=30),
                    user_id=User.query.filter_by(username='john_doe').first().id,
                    photo_url='https://example.com/photo/beginner_cardio.jpg',
                    video_url='https://example.com/video/beginner_cardio.mp4'
                ),
                WorkoutPlan(
                    title='Strength Training',
                    description='An advanced strength training program.',
                    duration=60,
                    start_date=date.today(),
                    end_date=date.today() + timedelta(days=60),
                    user_id=User.query.filter_by(username='jane_smith').first().id,
                    photo_url='https://example.com/photo/strength_training.jpg',
                    video_url='https://example.com/video/strength_training.mp4'
                )
            ]
            db.session.bulk_save_objects(workout_plans)
            try:
                db.session.commit()
                logger.info("Workout plans committed successfully!")
            except Exception as e:
                db.session.rollback()
                logger.error(f"Error committing workout plans: {e}")

            for plan in workout_plans:
                logger.info(f"Workout Plan ID: {plan.id}, Title: {plan.title}")

        # Seed Nutrition Plans
        if NutritionPlan.query.count() == 0:
            nutrition_plans = [
                NutritionPlan(
                    user_id=User.query.filter_by(username='john_doe').first().id,
                    title='Weight Loss Plan',
                    description='Low-calorie diet to aid weight loss.',
                    start_date=date.today(),
                    end_date=date.today() + timedelta(days=30),
                    photo_url='https://example.com/photo/weight_loss_plan.jpg',
                    video_url='https://example.com/video/weight_loss_plan.mp4'
                ),
                NutritionPlan(
                    user_id=User.query.filter_by(username='jane_smith').first().id,
                    title='Muscle Gain Plan',
                    description='High-protein diet for muscle building.',
                    start_date=date.today(),
                    end_date=date.today() + timedelta(days=45),
                    photo_url='https://example.com/photo/muscle_gain_plan.jpg',
                    video_url='https://example.com/video/muscle_gain_plan.mp4'
                )
            ]
            db.session.bulk_save_objects(nutrition_plans)
            try:
                db.session.commit()
                logger.info("Nutrition plans committed successfully!")
            except Exception as e:
                db.session.rollback()
                logger.error(f"Error committing nutrition plans: {e}")

            for plan in nutrition_plans:
                logger.info(f"Nutrition Plan ID: {plan.id}, Title: {plan.title}")

        # Seed Progress Tracking
        if ProgressTracking.query.count() == 0:
            progress_entries = [
                ProgressTracking(
                    user_id=User.query.filter_by(username='john_doe').first().id,
                    weight=75.5,
                    measurements='Chest: 90 cm, Waist: 80 cm',
                    date=date.today(),
                    photo_url='https://example.com/photo/progress_john_doe.jpg',
                    video_url='https://example.com/video/progress_john_doe.mp4'
                ),
                ProgressTracking(
                    user_id=User.query.filter_by(username='jane_smith').first().id,
                    weight=68.0,
                    measurements='Chest: 85 cm, Waist: 70 cm',
                    date=date.today(),
                    photo_url='https://example.com/photo/progress_jane_smith.jpg',
                    video_url='https://example.com/video/progress_jane_smith.mp4'
                )
            ]
            db.session.bulk_save_objects(progress_entries)
            try:
                db.session.commit()
                logger.info("Progress tracking entries committed successfully!")
            except Exception as e:
                db.session.rollback()
                logger.error(f"Error committing progress tracking entries: {e}")

            for entry in progress_entries:
                logger.info(f"Progress Tracking ID: {entry.id}, User ID: {entry.user_id}")

        logger.info("Database seeded successfully!")

if __name__ == "__main__":
    seed()
