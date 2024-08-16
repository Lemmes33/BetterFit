import React, { useState } from "react";
import "./Login.css";
import { wrappedFetch } from "../../utils";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const toggleSignUp = () => setShowSignUp(!showSignUp);

  const login = async (event) => {
    event.preventDefault();

    try {
      const res = await wrappedFetch("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        localStorage.setItem("token", data.access_token);
        navigate("/Dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  };

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
       
        <img
          className="login-left-side-img"
          src="https://your-direct-image-url.com/image.jpg"
          alt="Background"
        />
        <div className="login-left-side-bg"></div>
        
      </div>
      <div className="login-right-side">
        <div className="login-sign-in-container">
          <div className="login-sign-in">
            <button
              id="signin"
              className={`login-btn-header ${!showSignUp ? "active" : ""}`}
              type="button"
              onClick={() => setShowSignUp(false)}
            >
              Sign In
            </button>
          </div>
          <div className="login-sign-up">
            <Link to="/register"
              id="signup"
              className={`login-btn-header ${showSignUp ? "active" : ""}`}
              
            >
              Sign Up
            </Link>
          </div>
          
          <div
            id="signin-tab"
            className={`login-sign-up-info ${showSignUp ? "login-hidden" : ""}`}
          >
            <form onSubmit={login}>
              <div className="login-prompt-field">USERNAME</div>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                name="login-username"
                className="login-input-field"
                placeholder="Enter your username"
              />
              <div className="login-prompt-field">PASSWORD</div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="login-password"
                className="login-input-field"
                placeholder="*************"
              />
              
              <Link to="/dashboard" className="signin-button">
                SIGN IN <i className="fa fa-arrow-right" aria-hidden="true"></i>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
