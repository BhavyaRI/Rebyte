import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Login from "./Login";

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState(null);

    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            setError('Passwords doesnt match');
            return;
        }
        try {
            const passworddata = { password, passwordConfirm };
            const url = `https://psychic-system-xxxp69rwj7j399gq-3000.app.github.dev/api/resetPassword/${token}`;
            const response = await axios.patch(url, passworddata);

            alert('Password reset successfully! Please Log in');
            navigate('/Login');

        }
        catch (error) {
            setError(err.response?.data?.message || 'An unknown error occurred.');
            console.error('There was an error resetting the password:', err.response?.data);
        }

    };
    return (
        <div>
            <h2>Reset Your Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>New Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Confirm New Password</label>
                    <input
                        type="password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">
                    Reset Password
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );

};

export default ResetPassword;