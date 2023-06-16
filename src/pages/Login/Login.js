import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Login.css';

function Login(props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://localhost:7162/api/User/GetUserData', {
        method: 'POST',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const responseJSON = await response.json();

      if (response.ok) {
        handleLogin(responseJSON);
      } else {
        setError(responseJSON.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Request error:', error);
      setError('An error occurred. Please try again.');
    }

    setIsLoading(false); 
  }

  function handleLogin(userData) {
    props.setUser(userData);
    props.setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', true);

    navigate('/');
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <h1 style={{ marginBottom: '8%' }}>Login</h1>
        <div className="space">
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
          :שם משתמש
        </div>
        <div className="space">
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          :סיסמא
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
        {isLoading && <div>Loading...</div>} {/* Display loading message or spinner */}
        <div style={{ color: 'red' }}>{error}</div>
        <br />
        dont have an account yet? <Link to={'/Register/'}>register</Link>
      </form>
    </div>
  );
}

export default Login;
