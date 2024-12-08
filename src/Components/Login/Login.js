import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate for programmatic routing

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);
  const [redirectToSignup, setRedirectToSignup] = useState(false);

  const handleSubmit = () => {
    // Use the username and password here for your authentication logic.
    if (username === 'admin' && password === 'password') { // Example authentication
      setRedirectToDashboard(true); // Set the redirect state to true
    } else {
      alert('Invalid credentials');
    }
  };

  const handleSignupRedirect = () => {
    setRedirectToSignup(true); // Set the redirect to sign-up page
  };

  if (redirectToDashboard) {
    return <Navigate to="/dashboard" />; // Redirect to the dashboard
  }

  if (redirectToSignup) {
    return <Navigate to="/signup" />; // Redirect to the sign-up page
  }

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSubmit}>Login</button>
      
      {/* Redirects to the sign-up page when clicked */}
      <button onClick={handleSignupRedirect}>Sign Up</button>
    </div>
  );
};

export default Login;
