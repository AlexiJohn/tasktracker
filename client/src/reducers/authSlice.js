import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        username: '',
    },
    reducers: {
        userLogin: (state, action) => {
            console.log(action.payload);
            state.isLoggedIn = true;
            state.username = action.payload;
        },
        userLogout: (state, action) => {
            state.isLoggedIn = false;
            state.username = '';
        }
    } 
});

export const {
    userLogin,
    userLogout
} = authSlice.actions;

export default authSlice.reducer;