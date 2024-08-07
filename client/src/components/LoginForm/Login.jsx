import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleSignUp = () => setShowSignUp(!showSignUp);

  return (
    <div className="container">
      <div className="left-side">
        <img 
          className="left-side-img" 
          src="https://your-direct-image-url.com/image.jpg" 
          alt="Background" 
        />
        <div className="left-side-bg">
        
        </div>
      </div>
      <div className="right-side">
        <div className="sign-in-container login-font">
          <div className="sign-in">
            <button
              id="signin"
              className={`btn-header ${!showSignUp ? 'active' : ''}`}
              type="button"
              onClick={() => setShowSignUp(false)}
            >
              Sign In
            </button>
          </div>
          <div className="sign-up">
            <button
              id="signup"
              className={`btn-header ${showSignUp ? 'active' : ''}`}
              type="button"
              onClick={toggleSignUp}
            >
              Sign Up
            </button>
          </div>
          <div id="signup-tab" className={`sign-up-information-container ${showSignUp ? '' : 'hidden'}`}>
            <div className="prompt-field">USERNAME</div>
            <input type="text" name="login-name" className="input-field" placeholder="Create a username" />
            <div className="prompt-field">PASSWORD</div>
            <input type="password" name="login-password" className="input-field" placeholder="*************" />
            <div className="prompt-field">E-MAIL ADDRESS</div>
            <input type="text" name="login-email" className="input-field" placeholder="Enter your e-mail address" />
            <div className="terms-container">
              <input type="checkbox" className="terms-checkbox" value="terms_checkbox" />
              <label className="terms-prompt">
                I accept the <span style={{ borderBottom: '1px solid #47C1B9' }}>terms and conditions</span>
              </label>
            </div>
            <button className="btn-signup" type="submit">
              SIGN UP <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
          </div>
          <div id="signin-tab" className={`sign-up-information-container ${showSignUp ? 'hidden' : ''}`}>
            <div className="prompt-field">USERNAME</div>
            <input type="text" name="login-name" className="input-field" />
            <div className="prompt-field">PASSWORD</div>
            <input type="password" name="login-password" className="input-field" />
            <div className="terms-container">
              <label className="terms-prompt">
                <span style={{ borderBottom: '1px solid #47C1B9' }}>Forgot your password?</span>
              </label>
            </div>
            <button className="btn-signup" type="submit">
              SIGN IN <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
