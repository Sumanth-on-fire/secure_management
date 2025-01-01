import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';
import { signup } from '../../api/auth';
import { Link as RouterLink } from 'react-router-dom';

const Signup = () => {
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(userData);
      setSuccess(true);
    } catch (err) {
      setError('Signup failed');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" align="center">Signup</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            name="username"
            label="Username"
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="email"
            label="Email"
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="password"
            label="Password"
            type="password"
            onChange={handleInputChange}
          />
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="success">Signup Successful!</Typography>}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Signup
          </Button>
        </form>
        <Typography sx={{ mt: 2 }} align="center">
          Already have an account?{' '}
          <Link component={RouterLink} to="/">
            Login
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Signup;