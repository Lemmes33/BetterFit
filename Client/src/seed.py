import getpass
import json
import bcrypt
from cryptography.fernet import Fernet
from pathlib import Path
from typing import Dict
import sys
import filelock
import re

# Constants for file paths
USER_DATA_FILE = "users.json"
LOCK_FILE = "users.lock"
ENCRYPTION_KEY_FILE = "encryption.key"

# Generate or load the encryption key
def load_or_create_encryption_key() -> bytes:
    """Generate a new encryption key or load an existing one."""
    if Path(ENCRYPTION_KEY_FILE).is_file():
        with open(ENCRYPTION_KEY_FILE, "rb") as key_file:
            return key_file.read()
    else:
        key = Fernet.generate_key()
        with open(ENCRYPTION_KEY_FILE, "wb") as key_file:
            key_file.write(key)
        return key

# Initialize the Fernet encryption object
encryption_key = load_or_create_encryption_key()
fernet = Fernet(encryption_key)

class User:
    def __init__(self, email: str, password: str):
        self.email = email
        self.password = password

    @staticmethod
    def is_valid_email(email: str) -> bool:
        """Validate the email format using a regular expression."""
        email_regex = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        return bool(re.match(email_regex, email))

    @staticmethod
    def is_valid_password(password: str) -> bool:
        """Validate password strength."""
        return (
            len(password) >= 8 and
            re.search(r"[a-z]", password) and
            re.search(r"[A-Z]", password) and
            re.search(r"\d", password) and
            re.search(r"[!@#$%^&*(),.?\":{}|<>]", password)
        )

    def hash_password(self) -> bytes:
        """Hash a password using bcrypt."""
        return bcrypt.hashpw(self.password.encode(), bcrypt.gensalt())

    def check_password(self, hashed_password: bytes) -> bool:
        """Check a password against a hashed password using bcrypt."""
        return bcrypt.checkpw(self.password.encode(), hashed_password)

    def encrypt_user_data(self, hashed_password: bytes) -> Dict[str, bytes]:
        """Encrypt user data."""
        encrypted_email = fernet.encrypt(self.email.encode())
        encrypted_password = fernet.encrypt(hashed_password)
        return {
            "email": encrypted_email,
            "password": encrypted_password
        }

    @staticmethod
    def decrypt_user_data(encrypted_data: Dict[str, bytes]) -> Dict[str, str]:
        """Decrypt user data."""
        decrypted_email = fernet.decrypt(encrypted_data["email"]).decode()
        decrypted_password = fernet.decrypt(encrypted_data["password"]).decode()
        return {
            "email": decrypted_email,
            "password": decrypted_password
        }

# Define a function to create a new user
def create_user(email: str, password: str) -> Dict[str, bytes]:
    """Create a new user with the given email and password."""
    user = User(email, password)
    hashed_password = user.hash_password()
    encrypted_data = user.encrypt_user_data(hashed_password)
    return encrypted_data

# Define a function to save user data to a file with file locking
def save_user_data(user_data: Dict[str, Dict[str, bytes]], filename: str = USER_DATA_FILE) -> None:
    """Save user data to a file with file locking to ensure data integrity."""
    try:
        with filelock.FileLock(LOCK_FILE):
            with open(filename, "w") as f:
                json.dump(user_data, f, indent=4, default=lambda x: x.decode('utf-8'))
    except IOError as e:
        print(f"Error saving user data: {e}")

# Define a function to load user data from a file with file locking
def load_user_data(filename: str = USER_DATA_FILE) -> Dict[str, Dict[str, bytes]]:
    """Load user data from a file with file locking."""
    try:
        if not Path(filename).is_file():
            return {}
        with filelock.FileLock(LOCK_FILE):
            with open(filename, "r") as f:
                return json.load(f, object_hook=lambda d: {k: v.encode('utf-8') for k, v in d.items()})
    except IOError as e:
        print(f"Error loading user data: {e}")
        return {}

# Define a function to check if a user exists
def user_exists(email: str, user_data: Dict[str, Dict[str, bytes]]) -> bool:
    """Check if a user with the given email exists."""
    for encrypted_user_data in user_data.values():
        decrypted_user_data = User.decrypt_user_data(encrypted_user_data)
        if email == decrypted_user_data['email']:
            return True
    return False

# Define a function to find a user's encrypted data
def find_encrypted_user_data(email: str, user_data: Dict[str, Dict[str, bytes]]) -> Dict[str, bytes]:
    """Find a user's encrypted data by email."""
    for encrypted_user_data in user_data.values():
        decrypted_user_data = User.decrypt_user_data(encrypted_user_data)
        if email == decrypted_user_data['email']:
            return encrypted_user_data
    return None

# Define a function to handle forgotten passwords
def forgotten_password(email: str, user_data: Dict[str, Dict[str, bytes]]) -> None:
    """Handle forgotten passwords by asking for a new password."""
    encrypted_user_data = find_encrypted_user_data(email, user_data)
    if encrypted_user_data:
        while True:
            new_password = getpass.getpass("Enter new password: ")
            confirm_password = getpass.getpass("Confirm new password: ")
            user = User(email, new_password)
            if new_password != confirm_password:
                print("Passwords do not match. Try again!")
                continue
            if not User.is_valid_password(new_password):
                print("Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.")
                continue
            hashed_password = user.hash_password()
            encrypted_user_data['password'] = fernet.encrypt(hashed_password)
            save_user_data(user_data)
            print("Password updated successfully!")
            break
    else:
        print("User does not exist.")

# Define a function to handle login
def login(email: str, password: str, user_data: Dict[str, Dict[str, bytes]]) -> bool:
    """Handle login by checking if the email and password are correct."""
    encrypted_user_data = find_encrypted_user_data(email, user_data)
    if encrypted_user_data:
        decrypted_user_data = User.decrypt_user_data(encrypted_user_data)
        user = User(email, password)
        if user.check_password(decrypted_user_data['password'].encode()):
            print("Login successful!")
            return True
        else:
            print("Incorrect password. Try again!")
            return False
    else:
        print("User does not exist. Try again!")
        return False

# Define a function to handle registration
def register(email: str, password: str) -> None:
    """Handle registration by creating a new user and saving their data."""
    user_data = load_user_data()
    if not user_exists(email, user_data):
        if not User.is_valid_password(password):
            print("Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.")
            return
        new_user = create_user(email, password)
        user_data[email] = new_user
        save_user_data(user_data)
        print("Registration successful!")
    else:
        print("User already exists. Try again!")

# Main program loop
def main():
    while True:
        try:
            print("\n1. Login")
            print("2. Register")
            print("3. Forgotten password")
            print("4. Exit")
            choice = input("Enter your choice: ")
            
            if choice == "1":
                email = input("Enter your email: ").strip()
                if not User.is_valid_email(email):
                    print("Invalid email format.")
                    continue
                
                password = getpass.getpass("Enter your password: ")
                user_data = load_user_data()
                login(email, password, user_data)
            
            elif choice == "2":
                email = input("Enter your email: ").strip()
                if not User.is_valid_email(email):
                    print("Invalid email format.")
                    continue
                
                password = getpass.getpass("Enter your password: ")
                register(email, password)
            
            elif choice == "3":
                email = input("Enter your email: ").strip()
                if not User.is_valid_email(email):
                    print("Invalid email format.")
                    continue
                
                user_data = load_user_data()
                forgotten_password(email, user_data)
            
            elif choice == "4":
                print("Goodbye!")
                break
            
            else:
                print("Invalid choice. Try again!")
        
        except KeyboardInterrupt:
            print("\nProgram interrupted. Exiting.")
            sys.exit(0)

if __name__ == "__main__":
    main()
