import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, userLogout } from './reducers/authSlice';


import Login  from './components/Login';
import TaskManager from './components/TaskManager';
import UserHeader from './components/UserHeader';

function App(){

  return(

    <>
        <Router>
          <UserHeader />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/tasks" element={<TaskManager />} />
          </Routes>
        </Router>
    </>
    
  )

}

export default App;
