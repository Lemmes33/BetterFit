from app import create_app, db
from models import User, WorkoutPlan, NutritionPlan, ProgressTracking, Trainer
from flask_bcrypt import Bcrypt
from datetime import date

app = create_app()
bcrypt = Bcrypt(app)

def seed():
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()

        trainer1 = Trainer(name='Mary Jane', email='mary.jane@example.com', phone='123-456-7890', specialty='zumba instructor', bio='Expert in zumba and cardio training.')
        trainer2 = Trainer(name='Walter Black', email='walter.black@example.com', phone='987-654-3210', specialty='Yoga', bio='Certified yoga instructor with over 10 years of experience.')

        db.session.add(trainer1)
        db.session.add(trainer2)
        db.session.commit()

        # Create users
        hashed_password = bcrypt.generate_password_hash('password123').decode('utf-8')
        user1 = User(username='alice', email='alice@example.com', password=hashed_password, age=25, nationality='American', description='Fitness enthusiast', hobbies='Running, Cycling', trainer_id=trainer1.id)
        user2 = User(username='bob', email='bob@example.com', password=hashed_password, age=30, nationality='Canadian', description='Health conscious', hobbies='Swimming', trainer_id=trainer2.id)

        db.session.add(user1)
        db.session.add(user2)
        db.session.commit()

        # Create workout plans
        workout_plan1 = WorkoutPlan(title='Full Body Workout', description='A comprehensive full-body workout plan.', duration=30, start_date=date.today(), end_date=date.today())
        workout_plan2 = WorkoutPlan(title='Yoga for Beginners', description='An introductory yoga plan for beginners.', duration=45, start_date=date.today(), end_date=date.today())

        db.session.add(workout_plan1)
        db.session.add(workout_plan2)
        db.session.commit()

        # Create nutrition plans
        nutrition_plan1 = NutritionPlan(user_id=user1.id, title='High Protein Diet', description='A diet plan rich in protein to build muscle.', start_date=date.today(), end_date=date.today())
        nutrition_plan2 = NutritionPlan(user_id=user2.id, title='Balanced Diet', description='A well-balanced diet for overall health.', start_date=date.today(), end_date=date.today())

        db.session.add(nutrition_plan1)
        db.session.add(nutrition_plan2)
        db.session.commit()

        # Create progress tracking records
        progress1 = ProgressTracking(user_id=user1.id, weight=70.5, measurements='Chest: 90cm, Waist: 80cm', date=date.today())
        progress2 = ProgressTracking(user_id=user2.id, weight=82.0, measurements='Chest: 100cm, Waist: 90cm', date=date.today())

        db.session.add(progress1)
        db.session.add(progress2)
        db.session.commit()

        print("Database seeded successfully.")

if __name__ == '__main__':
    seed()
