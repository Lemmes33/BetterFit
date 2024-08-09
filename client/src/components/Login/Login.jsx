import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleSignUp = () => setShowSignUp(!showSignUp);

  return (
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
              className={`login-btn-header ${!showSignUp ? 'active' : ''}`}
              type="button"
              onClick={() => setShowSignUp(false)}
            >
              Sign In
            </button>
          </div>
          <div className="login-sign-up">
            <button
              id="signup"
              className={`login-btn-header ${showSignUp ? 'active' : ''}`}
              type="button"
              onClick={toggleSignUp}
            >
              Sign Up
            </button>
          </div>
          <div id="signup-tab" className={`login-sign-up-info ${showSignUp ? '' : 'login-hidden'}`}>
            <div className="login-prompt-field">USERNAME</div>
            <input type="text" name="login-name" className="login-input-field" placeholder="Create a username" />
            <div className="login-prompt-field">PASSWORD</div>
            <input type="password" name="login-password" className="login-input-field" placeholder="*************" />
            <div className="login-prompt-field">E-MAIL ADDRESS</div>
            <input type="text" name="login-email" className="login-input-field" placeholder="Enter your e-mail address" />
            <div className="login-terms-container">
              <input type="checkbox" className="login-terms-checkbox" value="terms_checkbox" />
              <label className="login-terms-prompt">
                I accept the <span style={{ borderBottom: '1px solid #47C1B9' }}>terms and conditions</span>
              </label>
            </div>
            <button className="login-btn-signup" type="submit">
              SIGN UP <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
          </div>
          <div id="signin-tab" className={`login-sign-up-info ${showSignUp ? 'login-hidden' : ''}`}>
            <div className="login-prompt-field">USERNAME</div>
            <input type="text" name="login-name" className="login-input-field" />
            <div className="login-prompt-field">PASSWORD</div>
            <input type="password" name="login-password" className="login-input-field" />
            <div className="login-terms-container">
              <label className="login-terms-prompt">
                <span style={{ borderBottom: '1px solid #47C1B9' }}>Forgot your password?</span>
              </label>
            </div>
            <button className="login-btn-signup" type="submit">
              SIGN IN <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
