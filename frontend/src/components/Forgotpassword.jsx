import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Login from "./Login";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [submitted, setsubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const useremail = { email };
            console.log(useremail);
            const resposne = await axios.post('https://psychic-system-xxxp69rwj7j399gq-3000.app.github.dev/api/forgotPassword',useremail);
            console.log('Email sent successfully');
            setsubmitted(true);
        }
        catch (error) {
            console.error('Error in sending mail', error);
        }
    }
    return (
        <div>
            <h2>Forgot password</h2>
            {submitted ? (
                <div>
                    <h3>Check your email</h3>
                    <p>
                        If an account with that email exists, we've sent password reset instructions to your inbox.
                    </p>
                    <Link to="/Login">
                        Return to Login
                    </Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="reset-email">Email:</label>
                        <input type="email" name="" id="reset-email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <button type="submit">Request Password Reset</button>
                    </div>
                </form>
            )
            };
        </div>
    );
}

export default ForgotPassword;