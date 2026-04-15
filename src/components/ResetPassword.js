import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, InputGroup, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [isValidToken, setIsValidToken] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios.get(`${apiUrl}/auth/reset-password/${token}`);
        setIsValidToken(true);
      } catch (error) {
        const errorMessage =
          error.response?.data?.error ||
          error.response?.data?.message ||
          (error.response?.data && typeof error.response.data === 'string' ? error.response.data : null) ||
          error.message ||
          'Invalid token';
        setMessage(errorMessage);
      }
    };
    if (token) {
      verifyToken();
    }
  }, [token,apiUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    if (isLoading) return; // Prevent double submission

    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.post(`${apiUrl}/auth/reset-password/${token}`, { password });
      setMessage(response.data.message);
      setIsSuccess(true);
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        (error.response?.data && typeof error.response.data === 'string' ? error.response.data : null) ||
        error.response?.statusText ||
        error.message ||
        'Failed to reset password. Please try again.';
      setMessage(errorMessage);
    } finally {
      setIsLoading(false);
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
            {message && (
              <Alert variant={isSuccess ? 'success' : 'danger'}>
                {message}
                {isSuccess && <div className="mt-2">Redirecting to login page in 3 seconds...</div>}
              </Alert>
            )}
            {isValidToken && !isSuccess && (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter new password"
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
                <Form.Group className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? <EyeSlash /> : <Eye />}
                    </Button>
                  </InputGroup>
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 reset-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Resetting...
                    </>
                  ) : (
                    'Reset Password'
                  )}
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