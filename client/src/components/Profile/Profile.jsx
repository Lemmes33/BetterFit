import React, { useState } from 'react';
import './Profile.css';
import ProfileImg from "../../assets/___4_-removebg-preview.png";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [funFact, setFunFact] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || '');

  const navigate = useNavigate(); // Initialize useNavigate

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        localStorage.setItem('avatar', reader.result); // Save to localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarRemove = () => {
    setAvatar('');
    localStorage.removeItem('avatar'); // Remove from localStorage
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save profile data here (e.g., send to server)
    toast.success("Profile saved successfully!"); // Show success toast
  };

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
      <Link to="/dashboard" className="back-button-link">Back</Link>

        <h1 className="profile-title1">Your Profile</h1>
        <div className="header-image-container1">
          <img src={ProfileImg} alt="Header" className="header-image1" />
        </div>
      </header>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-avatar-container">
          <div className="profile-avatar-wrapper">
            {avatar ? (
              <img src={avatar} alt="Profile" className="profile-avatar" />
            ) : (
              <div className="profile-avatar-placeholder">
                <span>+</span>
              </div>
            )}
            <div className="profile-avatar-overlay">
              <label htmlFor="avatar" className="profile-avatar-label">
                {/* Add label text if needed */}
              </label>
              {avatar && (
                <button
                  type="button"
                  className="profile-avatar-remove"
                  onClick={handleAvatarRemove}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            className="profile-avatar-input"
          />
        </div>
        <div className="profile-input-group">
          <label htmlFor="name" className="profile-label">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="profile-input"
            required
          />
        </div>
        <div className="profile-input-group">
          <label htmlFor="email" className="profile-label">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="profile-input"
            required
          />
        </div>
        <div className="profile-input-group">
          <label htmlFor="contact" className="profile-label">Contact:</label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="profile-input"
          />
        </div>
        <div className="profile-input-group">
          <label htmlFor="funFact" className="profile-label">Fun Fact:</label>
          <textarea
            id="funFact"
            value={funFact}
            onChange={(e) => setFunFact(e.target.value)}
            className="profile-textarea"
          />
        </div>
       
        <button type="submit" className="profile-submit">Save Profile</button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Profile;
