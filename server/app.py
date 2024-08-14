from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
from dotenv import load_dotenv
from cryptography.fernet import Fernet
from requests.auth import HTTPBasicAuth
import requests, base64, json, os, re
from datetime import datetime
from flask_restful import Resource, Api, reqparse

load_dotenv()

app = Flask(__name__)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI', 'sqlite:///app.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-secret-key')
app.secret_key = os.getenv('SECRET_KEY', 'your_secret_key')
app.config['SESSION_TYPE'] = 'filesystem'

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
CORS(app, supports_credentials=True)
api = Api(app)

encryption_key = os.getenv('ENCRYPTION_KEY')
if not encryption_key:
    encryption_key = Fernet.generate_key().decode()
    with open('.env', 'a') as f:
        f.write(f'\nENCRYPTION_KEY={encryption_key}\n')
cipher = Fernet(encryption_key.encode())

# Utility functions and Models (User, WorkoutPlan, NutritionPlan, ProgressTracking) here...

def get_mpesa_token():
    consumer_key = 'YXZhAOLvjYqmX7TkAirasXHJfTjUHHqQtIOAGXYTLjjVfvUK'
    consumer_secret = 'c6SpWnqqHckfRGGGKQt56LKdwIDrMQXeHlGs9PEiSbfGLLAmnbUjc7niS8olHtJ2'
    
    api_url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    r = requests.get(api_url, auth=HTTPBasicAuth(consumer_key, consumer_secret))
    
    return r.json()['access_token']

class MakeSTKPush(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('phone', type=str, required=True, help="This field is required")
    parser.add_argument('amount', type=str, required=True, help="This field is required")

    def post(self):
        data = MakeSTKPush.parser.parse_args()

        # Encode the Business ShortCode, Passkey, and Timestamp to Base64
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        business_shortcode = "174379"  # Replace with your business shortcode
        passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c89305b1f2d3c39c6f2c3e1b1f1d7"  # Replace with your passkey
        data_to_encode = business_shortcode + passkey + timestamp
        password = base64.b64encode(data_to_encode.encode()).decode()

        try:
            # Get the access token
            access_token = get_mpesa_token()

            # STK push request URL
            api_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
            
            headers = {
                "Authorization": f"Bearer {access_token}",
                "Content-Type": "application/json"
            }

            request_payload = {
                "BusinessShortCode": business_shortcode,
                "Password": password,
                "Timestamp": timestamp,
                "TransactionType": "CustomerPayBillOnline",
                "Amount": data["amount"],
                "PartyA": data["phone"],  # Customer's phone number
                "PartyB": business_shortcode,  # Business shortcode
                "PhoneNumber": data["phone"],
                "CallBackURL": "https://mydomain.com/callback",  # Replace with your callback URL
                "AccountReference": "Test",
                "TransactionDesc": "Test Payment"
            }

            response = requests.post(api_url, json=request_payload, headers=headers)

            if response.status_code >= 400:
                return {"success": False, "message": "Something went wrong. Please try again."}, 400

            return {"data": response.json()}, 200

        except Exception as e:
            return {"success": False, "message": f"Error: {str(e)}"}, 400

# Register the STK Push resource
api.add_resource(MakeSTKPush, "/stkpush")

if __name__ == '__main__':
    app.run(debug=True, port=5000)