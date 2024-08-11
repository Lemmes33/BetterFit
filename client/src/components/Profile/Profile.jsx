import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [funFact, setFunFact] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ name, email, contact, funFact, instagram, twitter, avatar });
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h1 className="profile-title">Your Profile</h1>
      </header>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-avatar-container">
          {avatar && <img src={avatar} alt="Profile" className="profile-avatar" />}
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            className="profile-avatar-input"
          />
          <label htmlFor="avatar" className="profile-avatar-label">
            Choose Profile Picture
          </label>
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
        <div className="profile-input-group">
          <label htmlFor="instagram" className="profile-label">Instagram:</label>
          <input
            type="text"
            id="instagram"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            className="profile-input"
          />
        </div>
        <div className="profile-input-group">
          <label htmlFor="twitter" className="profile-label">Twitter:</label>
          <input
            type="text"
            id="twitter"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            className="profile-input"
          />
        </div>
        <button type="submit" className="profile-submit">Save Profile</button>
      </form>
    </div>
  );
};

export default Profile;