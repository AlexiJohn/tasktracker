import React, { createContext, useContext, useReducer } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, userLogout } from '../reducers/authSlice';


function AuthHeader() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const username = useSelector((state) => state.auth.username);
    
    const logOutButton = () => {

      navigate('/login')
      dispatch(userLogout());
      console.log(isLoggedIn)
  
    }

    return (

            <div className='App'>
                <div className="header-container bg-light-teal text-white p-3">
                    {isLoggedIn ? (
                    <>
                        <h4 className="text-black">Logged in as {username}</h4>
                        <button className="btn btn-danger" onClick={logOutButton}>
                        Logout
                        </button>
                    </>
                    ) : (
                    <Navigate to="/login" />
                    )}
                </div>
            </div>

    )
}

export default AuthHeader;