import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BoxArrowRight } from 'react-bootstrap-icons';

const Welcome = () => {
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (!storedEmail) {
      navigate('/');
    } else {
      setEmail(storedEmail);
    }
  }, [navigate]);

  if (!email) return null;

  return (
    <div className="welcome-page">
      <div className="welcome-card">
        <div className="logo-section">
          {/* <CodeSlash className="logo-icon" size={48} /> */}
          <h2 className="logo-text">MERN Stack</h2>
        </div>

        <h1 className="welcome-title">Welcome to MERN Stack Developer</h1>

        <p className="welcome-subtitle">
          You are logged in as <strong className="user-email">{email}</strong>
        </p>

        <p className="welcome-description">
          Explore the power of the MERN stack with seamless user authentication and password management.
        </p>

        <div className="welcome-footer">
          <Button
            onClick={handleLogout}
            className="logout-btn"
          >
            <BoxArrowRight className="me-2" size={20} />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
