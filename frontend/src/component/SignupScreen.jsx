import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios'; // Import axios for making HTTP requests

export default function SignupScreen() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirmation: '',
    name: '',
    profilePicture: null,
    termsAndConditions: false,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const validateEmail = (email) => {
    // Regular expression for a valid email address
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, name } = formData;
    const emailIsValid = validateEmail(username);

    if (!emailIsValid) {
      setErrors({ username: 'Please enter a valid email address.' });
      return;
    }

    try {
      // Send POST request to register user
      const response = await axios.post('http://localhost:8100/api/user', {
        email: username,
        password,
        name,
      });

      if (response.data.success) {
        // If registration is successful, show success message and navigate to '/post'
        handleSuccessClick();
        navigate('/post');
      } else {
        // If registration fails, show error message
        Swal.fire('Error', response.data.message, 'error');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      Swal.fire('Error', 'An error occurred while registering user.', 'error');
    }
  };

  const handleSuccessClick = () => {
    Swal.fire('Signin', 'Email sent', 'success');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username/Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              pattern="^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
              minLength="6"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Password Confirmation */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Password Confirmation</label>
            <input
              type="password"
              name="passwordConfirmation"
              value={formData.passwordConfirmation}
              onChange={handleChange}
              required
              placeholder="Password"
              pattern={formData.password}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.passwordConfirmation && (
              <p className="text-red-500 text-sm mt-1">{errors.passwordConfirmation}</p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              name="profilePicture"
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.profilePicture && (
              <p className="text-red-500 text-sm mt-1">{errors.profilePicture}</p>
            )}
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="termsAndConditions"
              checked={formData.termsAndConditions}
              onChange={handleChange}
              required
              className="mr-2"
            />
            <label htmlFor="termsAndConditions" className="text-sm text-gray-600">
              I agree to the terms and conditions
            </label>
            {errors.termsAndConditions && (
              <p className="text-red-500 text-sm mt-1">{errors.termsAndConditions}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
