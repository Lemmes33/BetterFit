import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Profile.css';

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
    <div className="bg-cover">
      <div className="container">
        <h1>MY PROFILE</h1>
        <div className="profile-picture" onClick={() => document.getElementById('file-input').click()}>
          {profileImage ? (
            <img src={profileImage} alt="Profile" />  // Ensure the image is displayed
          ) : (
            <p>Upload</p>
          )}
        </div>
        <input id="file-input" type="file" accept="image/*" onChange={handleImageChange} />
        <Formik
          initialValues={{ name: '', email: '', description: '' }}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange }) => (
            <Form>
              <label htmlFor="name">Name:</label>
              <Field
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
              />
              <label htmlFor="email">Email:</label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
              />
              <label htmlFor="description">Description:</label>
              <Field
                id="description"
                name="description"
                type="text"
                placeholder="Tell us about yourself"
                className="description"
              />
              <button type="submit">Save</button>
            </Form>
          )}
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Profile;
