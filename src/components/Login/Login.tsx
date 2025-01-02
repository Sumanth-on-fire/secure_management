import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link, CircularProgress } from '@mui/material';
import { login } from '../../api/auth';
import { fetchUserIP } from '../../common/ipAddress'
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import PasswordInputWithEyeIcon from '../../common/muiItems/PasswordTextField'
import { passwordEnum } from '../../common/enum'

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '', ip_address: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  const handleInputChange = async (e) => {
    const ipAdd = await fetchUserIP()
    setCredentials({ ...credentials, [e.target.name]: e.target.value, ip_address: ipAdd.toLocaleString() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      const data = await login(credentials);
      setIsLoading(false)
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('email', data.email);
      localStorage.setItem('role', data.role)
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" align="center">Login</Typography>
        <form onSubmit={handleSubmit}>
          {isLoading ?
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="50vh"
            >
              <CircularProgress style={{ color: 'red' }} />
            </Box> :
            <div><TextField
              fullWidth
              margin="normal"
              name="username"
              label="Username / Email"
              onChange={handleInputChange}
              onInput={handleInputChange}
            />
              <PasswordInputWithEyeIcon textLabel={passwordEnum.password} name={passwordEnum.password.toLowerCase()} handlePasswordChange={handleInputChange} />
              {error && <Typography color="error">{error}</Typography>}
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                Login
              </Button>
            </div>}
        </form>
        <Typography sx={{ mt: 2 }} align="center">
          Don't have an account?{' '}
          <Link component={RouterLink} to="/signup">
            Signup
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
