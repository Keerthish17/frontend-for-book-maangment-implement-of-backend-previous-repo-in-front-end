// Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/members/login/${email}/${password}`);
      if (response.ok) {
        localStorage.setItem('email', email); // Store email in localStorage upon successful login
        window.location.href = '/home'; // Redirect to home page upon successful login
      } else {
        const data = await response.json();
        alert(data); // Display error message
      }
    } catch (error) {
      alert('Error occurred during login:', error);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <p>New user? <Link to="/signup">Sign Up here</Link></p>
    </div>
  );
}

export default Login;
