
import React, { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setLogin, setSignup, setModeLogin } from "../reducers/loginSlice";
import {  userLogin, userLogout } from '../reducers/authSlice';

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { login, signup, modeLogin } = useSelector((state) => state.login);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const username = useSelector((state) => state.auth.username);
    

    const handleLogin = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/login', login);
            dispatch(userLogin(login.username));  
            console.log(`${isLoggedIn} ${username}`);
            navigate('/tasks');
            console.log(response.data);
        } catch (error) {
          console.error('Login failed', error);
        }
        
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log(signup)
        try {
          const response = await axios.post('http://localhost:8000/signup', signup);
    
          console.log(response.data);
        } catch (error) {
          console.error('Signup failed', error);
        }
    
    };

    const updateModeLogin = () => {
        if(modeLogin){
            dispatch(setModeLogin(false));
        } else {
            dispatch(setModeLogin(true));
        }
    }
    return(
        <>
            { modeLogin ? (
            <div>
            <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <input
                    type="text"
                    placeholder="Username"
                    value={login.username}
                    onChange={(e) => dispatch(setLogin({ ...login, username: e.target.value}))}
                    />
                    <input
                    type="password"
                    placeholder="Password"
                    value={login.password}
                    onChange={(e) => dispatch(setLogin({ ...login, password: e.target.value}))}
                    />
                    <button type="submit">Login</button>
                </form>
                <button onClick={updateModeLogin}>Create an Account</button>
            </div>
            ) :
            (
                <>
                    <h1>Signup</h1>
                        <form onSubmit={handleSignup}>
                            <input
                            type="text"
                            placeholder="Username"
                            value={signup.username}
                            onChange={(e) => dispatch(setSignup({ ...signup, username: e.target.value}))}
                            />
                            <input
                            type="password"
                            placeholder="Password"
                            value={signup.password}
                            onChange={(e) => dispatch(setSignup({ ...signup, password: e.target.value}))}
                            />
                            <button type="submit">Submit</button>
                        </form>
                        <button onClick={updateModeLogin}>Back to Login</button>
                </>
            )
        
        
        }
            
        </>
    )
}

export default Login;