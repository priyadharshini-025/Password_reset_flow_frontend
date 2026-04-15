import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios.get(`http://localhost:5000/api/auth/reset-password/${token}`);
        setIsValidToken(true);
      } catch (error) {
        setMessage(error.response?.data?.error || 'Invalid token');
      }
    };
    if (token) {
      verifyToken();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  if (!isValidToken && !message) {
    return <div className="text-center">Verifying token...</div>;
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Reset Password</h2>
            {message && <Alert variant={message.includes('successfully') ? 'success' : 'danger'}>{message}</Alert>}
            {isValidToken && (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Reset Password
                </Button>
              </Form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;