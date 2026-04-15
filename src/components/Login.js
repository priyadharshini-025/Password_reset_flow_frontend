import React, { useState } from 'react';
import { Form, Button, Alert, InputGroup, Spinner } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.post(`${apiUrl}/auth/login`, { email, password });
      const userEmail = response.data.email || email;
      localStorage.setItem('userEmail', userEmail);
      navigate('/welcome');
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        (error.response?.data && typeof error.response.data === 'string' ? error.response.data : null) ||
        error.response?.statusText ||
        error.message ||
        'Login failed. Please try again.';
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
            <h2 className="card-title text-center mb-4">Login</h2>
            {message && <Alert variant={message.includes('Welcome') ? 'success' : 'danger'}>{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeSlash /> : <Eye />}
                  </Button>
                </InputGroup>
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3 w-100 register-btn" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </Button>
            </Form>
            <div className="d-flex justify-content-between align-items-center mt-5">
              <a href="/register">Create Account</a>
              <a href="/forget-password">Forgot Password?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
