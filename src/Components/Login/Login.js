// src/Components/Login/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import './Login.css'; // Import the CSS file for styling

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook to access navigation

    const handleLogin = (e) => {
        e.preventDefault();
        setError(''); // Reset error message

        // Simple validation (replace this with your authentication logic)
        if (email === 'user@example.com' && password === 'password123') {
            onLogin(); // Call the onLogin prop after successful login
        } else {
            setError('Invalid email or password.'); // Show error message
        }
    };

    const handleSignUpRedirect = () => {
        navigate('/signup'); // Redirect to Sign Up page
    };

    return (
        <div className="login-container">
            <h2>Login to Diet Plan App</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p className="signup-link" onClick={handleSignUpRedirect}>
                Don’t have an account? Sign Up
            </p>
        </div>
    );
};

export default Login;
