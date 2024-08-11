import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [signInDetails, setSignInDetails] = useState({ username: '', password: '' });
  const [signUpDetails, setSignUpDetails] = useState({ username: '', password: '', email: '', termsAccepted: false });

  const toggleSignUp = () => setShowSignUp(!showSignUp);

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInDetails({ ...signInDetails, [name]: value });
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpDetails({ ...signUpDetails, [name]: value });
  };

  const handleTermsChange = (e) => {
    setSignUpDetails({ ...signUpDetails, termsAccepted: e.target.checked });
  };

  const isSignInDisabled = !signInDetails.username || !signInDetails.password;
  const isSignUpDisabled = !signUpDetails.username || !signUpDetails.password || !signUpDetails.email || !signUpDetails.termsAccepted;

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
            <input
              type="text"
              name="username"
              className="login-input-field"
              placeholder="Create a username"
              value={signUpDetails.username}
              onChange={handleSignUpChange}
            />
            <div className="login-prompt-field">PASSWORD</div>
            <input
              type="password"
              name="password"
              className="login-input-field"
              placeholder="*************"
              value={signUpDetails.password}
              onChange={handleSignUpChange}
            />
            <div className="login-prompt-field">E-MAIL ADDRESS</div>
            <input
              type="text"
              name="email"
              className="login-input-field"
              placeholder="Enter your e-mail address"
              value={signUpDetails.email}
              onChange={handleSignUpChange}
            />
            <div className="login-terms-container">
              <input
                type="checkbox"
                className="login-terms-checkbox"
                value="terms_checkbox"
                checked={signUpDetails.termsAccepted}
                onChange={handleTermsChange}
              />
              <label className="login-terms-prompt">
                I accept the <span style={{ borderBottom: '1px solid #47C1B9' }}>terms and conditions</span>
              </label>
            </div>
            <button
              className="login-btn-signup"
              type="submit"
              disabled={isSignUpDisabled}
            >
              SIGN UP <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
          </div>
          <div id="signin-tab" className={`login-sign-up-info ${showSignUp ? 'login-hidden' : ''}`}>
            <div className="login-prompt-field">USERNAME</div>
            <input
              type="text"
              name="username"
              className="login-input-field"
              value={signInDetails.username}
              onChange={handleSignInChange}
            />
            <div className="login-prompt-field">PASSWORD</div>
            <input
              type="password"
              name="password"
              className="login-input-field"
              value={signInDetails.password}
              onChange={handleSignInChange}
            />
            <div className="login-terms-container">
              <label className="login-terms-prompt">
                <span style={{ borderBottom: '1px solid #47C1B9' }}>Forgot your password?</span>
              </label>
            </div>
            <Link to="/dashboard"
              className="login-btn-signup"
              type="submit"
              disabled={isSignInDisabled}
            >
              SIGN IN <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
