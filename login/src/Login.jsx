import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { email, password })
      .then(result => {
        console.log(result);
        navigate('/home'); // Assuming you want to navigate to a dashboard or home page after login
      })
      .catch(err => {
        console.log(err);
        setError('Login failed. Please check your credentials and try again.');
      });
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder='Enter Email'
              className='form-control rounded-0'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder='Enter password'
              className='form-control rounded-0'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button type='submit' className='btn btn-success w-100 rounded-0'>Login</button>
        </form>
        <p>New Member?</p>
        <Link to='/register' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Register</Link>
      </div>
    </div>
  );
};

export default Login;