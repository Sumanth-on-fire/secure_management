import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link, CircularProgress } from '@mui/material';
import { signup } from '../../api/auth';
import { fetchUserIP } from '../../common/ipAddress'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PasswordInputWithEyeIcon from '../../common/muiItems/PasswordTextField'
import { passwordEnum } from '../../common/enum'

const Signup = () => {
  const [userData, setUserData] = useState({ username: '', email: '', password: '', ip_address: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [initialPass, setInitialPass] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = async (e) => {
    const ipAdd = await fetchUserIP()
    if (e.target.name === 'password' && e.target.value !== initialPass) {
      setError("Passwords don't Match !!")
      return
    }
    setError("")
    setUserData({ ...userData, [e.target.name]: e.target.value, ip_address: ipAdd.toLocaleString() });
  };

  const handleInitialPass = async (e) => {
    setInitialPass(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      await signup(userData);
      setSuccess(true);
    } catch (err) {
      setError('Signup failed');
    }
    setIsLoading(false)
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" align="center">Signup</Typography>
        <form onSubmit={handleSubmit}>
          {isLoading ? <Box
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
              {/* <TextField
            fullWidth
            margin="normal"
            name="password"
            label="Password"
            type="password"
            onChange={handleInputChange}
          /> */}
              <PasswordInputWithEyeIcon textLabel={passwordEnum.password} name={passwordEnum.password.toLowerCase()} handlePasswordChange={handleInitialPass} />
              <PasswordInputWithEyeIcon textLabel={passwordEnum.confirmPassword} name={passwordEnum.password.toLowerCase()} handlePasswordChange={handleInputChange} />
              {error && <Typography color="error">{error}</Typography>}
              {success && navigate('/') && <Typography color="success">Signup Successful!</Typography>}
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                Signup
              </Button>
            </div>}
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
