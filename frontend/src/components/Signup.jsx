import React,{useState} from 'react';
import axios from 'axios';

const Signup = ()=>{
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[passwordConfirm,setpasswordConfirm] = useState('');

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const signupData = {
                email,
                password,
                passwordConfirm
            };

            const response = await axios.post('https://psychic-system-xxxp69rwj7j399gq-3000.app.github.dev/api/signin',signupData);
            
            console.log("Signup successful:",response.data);
        }
        catch(error){
            console.error('There was an error signing up',error.response.data);
        }
    };
    return(
        <div>
            <h2>Signup page</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="passwordConfirm">Confirm password:</label>
                    <input type="password" name="" id="passwordConfirm" value={passwordConfirm} onChange={(e)=>setpasswordConfirm(e.target.value)} required/>
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default Signup;