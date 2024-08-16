import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h6 className="footer-heading">INFORMATION</h6>
          <p className="footer-text">
            BetterFit is a comprehensive fitness app that provides personalized workout videos tailored to your goals. With access to experienced instructors and custom food and nutrition plans, you receive expert guidance to help you achieve your fitness objectives. Unlock all these features with a subscription, and start your journey to a healthier, fitter you.
          </p>
        </div>

        

        

      </div>
      <hr className="footer-divider" />
      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <p className="footer-copyright">
            Copyright &copy; 2024 All Rights Reserved by <a href="#">BetterFit</a>.
          </p>
        </div>

        <div className="footer-bottom-right">
          <ul className="social-icons">
            <li><a className="social-icon facebook" href="#"><i className="fa fa-facebook"></i></a></li>
            <li><a className="social-icon twitter" href="#"><i className="fa fa-twitter"></i></a></li>
            <li><a className="social-icon dribbble" href="#"><i className="fa fa-dribbble"></i></a></li>
            <li><a className="social-icon linkedin" href="#"><i className="fa fa-linkedin"></i></a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
