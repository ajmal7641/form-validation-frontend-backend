import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => { 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.name.trim()) {
      validationErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Enter a valid email";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      validationErrors.password = "Password should be at least 6 characters";
    }

    setError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const result = await axios.post('http://localhost:3001/register', formData);
        console.log(result);
        alert("Form submitted successfully");

        
        navigate('/login');
      } catch (err) {
        console.log(err);
        // Handle server-side validation errors or other issues
      }
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder='Enter Name'
              className='form-control rounded-0'
              onChange={handleChange}
              value={formData.name}
            />
            {error.name && <span>{error.name}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder='Enter email'
              className='form-control rounded-0'
              onChange={handleChange}
              value={formData.email}
            />
            {error.email && <span>{error.email}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder='Enter password'
              className='form-control rounded-0'
              onChange={handleChange}
              value={formData.password}
            />
            {error.password && <span>{error.password}</span>}
          </div>

          <button type='submit' className='btn btn-success w-100 rounded-0'>Register</button>
        </form>
        <p>Already have an account?</p>
        <Link to='/login' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
      </div>
    </div>
  );
};

export default Signup;
