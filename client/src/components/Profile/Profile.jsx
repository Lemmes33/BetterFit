import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Profile.css';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);  // Set the image URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (values) => {
    // Handle form submission, e.g., save the data or send it to a server
    console.log(values);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="profile-bg-cover">
      <div className="profile-container">
        <h1 className="profile-header">MY PROFILE</h1>
        <div className="profile-image-upload" onClick={() => document.getElementById('file-input').click()}>
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="profile-image" />
          ) : (
            <p className="profile-upload-text">Upload</p>
          )}
        </div>
        <input id="file-input" type="file" accept="image/*" onChange={handleImageChange} className="profile-file-input" />
        <Formik
          initialValues={{ name: '', email: '', description: '' }}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange }) => (
            <Form className="profile-form">
              <label htmlFor="name" className="profile-form-label">Name:</label>
              <Field
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                className="profile-form-input"
              />
              <label htmlFor="email" className="profile-form-label">Email:</label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="profile-form-input"
              />
              <label htmlFor="description" className="profile-form-label">Description:</label>
              <Field
                id="description"
                name="description"
                type="text"
                placeholder="Tell us about yourself"
                className="profile-form-description"
              />
              <button type="submit" className="profile-submit-button">Save</button>
            </Form>
          )}
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Profile;
