from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_restful import Api, Resource
from dotenv import load_dotenv
import os
from cryptography.fernet import Fernet

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