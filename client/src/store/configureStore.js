
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../reducers/taskSlice';
import loginReducer from '../reducers/loginSlice';
import authReducer, { updateAuthContext } from '../reducers/authSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    login: loginReducer,
    auth: authReducer,
  },
});


export default store;
