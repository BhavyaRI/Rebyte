import React, { useState } from 'react';
import axios from 'axios';
import Home from './Home';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const logindata = { email, password };
            const response = await axios.post('https://psychic-system-xxxp69rwj7j399gq-3000.app.github.dev/api/login', logindata);

            console.log('Login successful', response.data);
            navigate('/Home');
        }
        catch (error) {
            console.error('There was problem logging in', error.response.data);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="login-email">Email:</label>
                    <input type="email" name="" id="login-email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="login-password">Password:</label>
                    <input type="password" name="" id="login-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <h4>
                    <Link to="/ForgotPassword">
                        Forgot Password?
                    </Link>
                    </h4>
                </div>
                <button type="submit">Log in</button>
            </form>
        </div>
    );
};

export default Login;