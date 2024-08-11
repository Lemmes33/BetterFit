import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Profile.css'; // Changed to a more specific name
import { Link } from 'react-router-dom';

const UserProfile = () => { // Renamed Profile to UserProfile
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
    <div className="user-profile-bg-cover"> {/* Changed class name */}
      <div className="user-profile-container"> {/* Changed class name */}
        <h1 className="user-profile-header">MY PROFILE</h1> {/* Changed class name */}
        <div className="user-profile-image-upload" onClick={() => document.getElementById('user-file-input').click()}> {/* Changed class name */}
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="user-profile-image" /> /* Changed class name */
          ) : (
            <p className="user-profile-upload-text">Upload</p> /* Changed class name */
          )}
        </div>
        <input id="user-file-input" type="file" accept="image/*" onChange={handleImageChange} className="user-profile-file-input" /> {/* Changed id and class name */}
        <Formik
          initialValues={{ name: '', email: '', description: '' }}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange }) => (
            <Form className="user-profile-form"> {/* Changed class name */}
              <label htmlFor="name" className="user-profile-form-label">Name:</label> {/* Changed class name */}
              <Field
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                className="user-profile-form-input" /* Changed class name */
              />
              <label htmlFor="email" className="user-profile-form-label">Email:</label> {/* Changed class name */}
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="user-profile-form-input" 
              />
              <label htmlFor="description" className="user-profile-form-label">Description:</label> {/* Changed class name */}
              <Field
                id="description"
                name="description"
                type="text"
                placeholder="Tell us about yourself"
                className="user-profile-form-description" /* Changed class name */
              />
              <button type="submit" className="user-profile-submit-button">Save</button> {/* Changed class name */}
            </Form>
          )}
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
};

export default UserProfile; // Changed export name
