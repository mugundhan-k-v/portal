import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/login.css';

const LoginPage = () => {
  const [facultyId, setFacultyId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (facultyId === '' || password === '') {
      setError('Faculty ID and password are required.');
      setSuccess('');
      console.log('Login failed: Faculty ID and password are required.'); // Debugging line
      return;
    }

    console.log('Submitting login for:', facultyId); // Debugging line
    try {
      const response = await axios.post('http://localhost:5000/api/login', { facultyId, password });
      setSuccess(response.data.message);
      setError('');
      console.log('Login successful:', response.data); // Debugging line

      setTimeout(() => {
        if (response.data.role === 'admin') {
          navigate('/Adminhomepage');
        } else {
          navigate('/homepage');
        }
      }, 1000);
    } catch (error) {
      setError('Invalid faculty ID or password.');
      setSuccess('');
      console.error('Login error:', error.response ? error.response.data : error.message); // Debugging line
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="facultyId">Faculty ID</label>
          <input
            type="text"
            id="facultyId"
            value={facultyId}
            onChange={(e) => setFacultyId(e.target.value)}
            placeholder="Enter your Faculty ID"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
