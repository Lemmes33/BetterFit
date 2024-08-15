import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import ProfileImg from "../../assets/___4_-removebg-preview.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [funFact, setFunFact] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);

  console.log(localStorage.getItem("token"));

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = response.data;
        setName(data.username || ""); // Correct key
        setEmail(data.email || "");
        setContact(data.contact || "");
        setFunFact(data.fun_fact || ""); // Correct key
        setAvatar(data.avatar || "");
      } catch (error) {
        console.error("Error fetching profile data", error);
        toast.error("Failed to fetch profile data.");
      }
    };

    fetchProfileData();
  }, []);

  // Handle profile data submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const profileData = {
        username: name, // Correct key
        email,
        contact,
        fun_fact: funFact, // Correct key
        avatar,
      };

      await axios.put("http://localhost:5000/profile", profileData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setIsProfileUpdated(true);
      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile data", error);
      toast.error("Failed to update profile.");
    }
  };

  // Handle avatar change
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle avatar removal
  const handleAvatarRemove = () => {
    setAvatar("");
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <Link to="/dashboard" className="back-button-link">
          Back
        </Link>
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
                <img
                  src={`https://ui-avatars.com/api/?name=${name}&background=random`}
                  alt="Profile Avatar"
                />
              </div>
            )}
            <div className="profile-avatar-overlay">
              <label htmlFor="avatar" className="profile-avatar-label">
                Upload
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
          <label htmlFor="name" className="profile-label">
            Name:
          </label>
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
          <label htmlFor="email" className="profile-label">
            Email:
          </label>
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
          <label htmlFor="contact" className="profile-label">
            Contact:
          </label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="profile-input"
          />
        </div>
        <div className="profile-input-group">
          <label htmlFor="funFact" className="profile-label">
            Fun Fact:
          </label>
          <textarea
            id="funFact"
            value={funFact}
            onChange={(e) => setFunFact(e.target.value)}
            className="profile-textarea"
          />
        </div>
        <button type="submit" className="profile-submit">
          Save Profile
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Profile;
