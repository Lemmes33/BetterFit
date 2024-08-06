import React, { useState, useRef } from 'react';
import './login.css';
// import { IonIcon } from 'ionicons';

const Login = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const containerRef = useRef(null);

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  return (
    <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} ref={containerRef}>
      <div className="form-container sign-up-container">
        <form>
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social">
              <IonIcon name="logo-facebook" />
            </a>
            <a href="#" className="social">
              <IonIcon name="logo-googleplus" />
            </a>
            <a href="#" className="social">
              <IonIcon name="logo-linkedin" />
            </a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form>
          <h1>Sign In</h1>
          <div className="social-container">
            <a href="#" className="social">
              <IonIcon name="logo-facebook" />
            </a>
            <a href="#" className="social">
              <IonIcon name="logo-googleplus" />
            </a>
            <a href="#" className="social">
              <IonIcon name="logo-linkedin" />
            </a>
          </div>
          <span>or use your account</span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" onClick={handleSignInClick}>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;