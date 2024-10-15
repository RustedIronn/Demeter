// src/Components/SignUp/SignUp.js
import React, { useState } from 'react';
import './Signup.css'; // Import the CSS file for styling

const SignUp = ({ onSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();
        setError(''); // Reset error message

        // Basic validation for sign-up
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Call the onSignUp prop (implement your sign-up logic here)
        onSignUp(email, password);
    };

    return (
        <div className="signup-container">
            <h2>Create an Account</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSignUp}>
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
