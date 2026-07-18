import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate for programmatic routing

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match'); // Error message when passwords do not match
      return;
    }

    // You can add user creation logic here (e.g., saving user data to a database)
    // For now, we assume successful sign-up
    setRedirectToLogin(true); // Redirect to login page after successful sign-up
  };

  const handleLoginRedirect = () => {
    setRedirectToLogin(true); // Redirect to login page
  };

  if (redirectToLogin) {
    return <Navigate to="/login" />; // Redirect to the login page
  }

  return (
    <div>
      <h2>Sign Up</h2>
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
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
      />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message if passwords don't match */}
      <button onClick={handleSubmit}>Sign Up</button>
      
      {/* Redirect to login page if the user already has an account */}
      <button onClick={handleLoginRedirect}>Already have an account? Login</button>
    </div>
  );
};

export default Signup;
