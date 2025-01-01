import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';

const AppHeader = () => {

  const [userName, setUserName] = useState('')

  useEffect(()=>{
    setTimeout(() => {
        setUserName(localStorage.getItem('userName'))
    }, 2000);
  }, [])
  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(90deg, #004d40, #00796b)', // Unified color with Sidebar
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Toolbar>
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            fontFamily: "'Roboto Slab', serif",
            color: '#ffffff',
          }}
        >
          Secure App
        </Typography>
        <Box
          sx={{
            background: '#ffffff22',
            padding: '8px 16px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: '1.1rem',
              fontFamily: "'Roboto', sans-serif",
              color: '#ffffff',
            }}
          >
            {
            userName ? 
            `Hi, ${userName}!`
            : <CircularProgress style={{ color: 'white', fontSize:'6px' }}/>
            }
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
