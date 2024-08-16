import React, { useState } from "react";
import "./register.css";
import { wrappedFetch } from "../../utils";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const [showSignUp, setShowSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const toggleSignUp = () => setShowSignUp(!showSignUp);

  const signup = async (event) => {
    event.preventDefault();

    try {
      const res = await wrappedFetch("/register", {
        method: "POST",
        body: JSON.stringify({ email, password, username, age }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
     <button className="back-button">
    <Link to="/" className="backbutton">Back</Link>
  </button>
    <div className="login-container">
      <div className="login-left-side">
        
        <div className="login-left-side-bg"></div>
      </div>
      <div className="login-right-side">
        <div className="login-sign-in-container">
          <div className="login-sign-in">
            <Link to="/login"
              id="signin"
              className={`login-btn-header ${!showSignUp ? "active" : ""}`}
              type="button"
              onClick={toggleSignUp}
            >
              Sign In
            </Link>
          </div>
          <div className="login-sign-up">
            <button
              id="signup"
              className={`login-btn-header ${showSignUp ? "active" : ""}`}
              type="button"
              onClick={() => setShowSignUp(true)}
            >
              Sign Up
            </button>
          </div>
          
          <div
            id="signup-tab"
            className={`login-sign-up-info ${!showSignUp ? "login-hidden" : ""}`}
          >
            <form onSubmit={signup}>
              <div className="login-prompt-field">USERNAME</div>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                name="login-name"
                className="login-input-field"
                placeholder="Create a username"
              />
              <div className="login-prompt-field">PASSWORD</div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="login-password"
                className="login-input-field"
                placeholder="*****"
              />
              <div className="login-prompt-field">E-MAIL</div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                name="login-email"
                className="login-input-field"
                placeholder="Enter your e-mail address"
              />
              <div className="login-prompt-field">AGE</div>
              <input
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="number"
                name="age"
                className="login-input-field"
                placeholder="Age"
              />
              
              <button className="login-btn-signup" type="submit">
                SIGN UP <i className="fa fa-arrow-right" aria-hidden="true"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;
