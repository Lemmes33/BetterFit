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

        <div className="footer-section">
          <h6 className="footer-heading">QUICK LINKS</h6>
          {/* <ul className="footer-links">
            <li><a href="http://scanfcode.com/about/">About Us</a></li>
            <li><a href="http://scanfcode.com/contact/">Contact Us</a></li>
            <li><a href="http://scanfcode.com/contribute-at-scanfcode/">Contribute</a></li>
            <li><a href="http://scanfcode.com/privacy-policy/">Privacy Policy</a></li>
            <li><a href="http://scanfcode.com/sitemap/">Sitemap</a></li>
          </ul> */}
        </div>

        <div className="footer-section">
          <h6 className="footer-heading">FOLLOW US</h6>
          {/* <ul className="footer-links">
            <li><a href="http://scanfcode.com/category/c-language/">C</a></li>
            <li><a href="http://scanfcode.com/category/front-end-development/">UI Design</a></li>
            <li><a href="http://scanfcode.com/category/back-end-development/">PHP</a></li>
            <li><a href="http://scanfcode.com/category/java-programming-language/">Java</a></li>
            <li><a href="http://scanfcode.com/category/android/">Android</a></li>
            <li><a href="http://scanfcode.com/category/templates/">Templates</a></li>
          </ul> */}
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
