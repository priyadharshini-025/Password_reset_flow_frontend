import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return; // Prevent double submission

    setIsLoading(true);
    setMessage('');

    console.log('Attempting to send reset email for:', email);

    try {
      const response = await axios.post(`${apiUrl}/auth/forget-password`, { email });
      console.log('Forget password response:', response.data);
      setMessage(response.data.message);
    } catch (error) {
      console.log('Forget password error:', error);
      console.log('Error response:', error.response);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        (error.response?.data && typeof error.response.data === 'string' ? error.response.data : null) ||
        (error.response?.status === 404 ? 'User not registered' : null) ||
        error.response?.statusText ||
        error.message ||
        'Failed to send reset email. Please try again.';
      setMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Forget Password</h2>
            {message && <Alert variant={message.includes('sent') ? 'success' : 'danger'}>{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 forget-btn" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Sending...
                  </>
                ) : (
                  'Send Reset Password Link'
                )}
              </Button>
            </Form>
            <div className="text-center mt-3">
              <a href="/">Back to Login</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;