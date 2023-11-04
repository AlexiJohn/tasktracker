import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        login: {},
        signup: {},
        modeLogin: true,
    },
    reducers: {
        setLogin: (state, action) => {
            state.login = action.payload
        },
        setSignup: (state, action) => {
            state.signup = action.payload
        },
        setModeLogin: (state, action) => {
            state.modeLogin= action.payload
        },
    } 
});

export const {
    setLogin,
    setSignup,
    setModeLogin,
} = loginSlice.actions;

export default loginSlice.reducer;