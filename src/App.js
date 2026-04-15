import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';
import Register from './components/Register';
import Login from './components/Login';
import Welcome from './components/Welcome';

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
