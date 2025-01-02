import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, CircularProgress, Popover } from '@mui/material';
import {logout} from '../../api/auth'
import { useNavigate } from 'react-router-dom';
import { fetchUserIP} from '../../common/ipAddress'

const AppHeader = () => {

  const [userName, setUserName] = useState('')
  const [openpop, setOpenpop] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    setTimeout(() => {
        setUserName(localStorage.getItem('userName'))
    }, 2000);
  }, [])

  const handleLogOut = async () => {
    await logout({username: localStorage.getItem('email'), ip_address: await fetchUserIP()})
    navigate('/')
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the popover
    setOpenpop(true)
  };

  const handleClose = () => {
    setAnchorEl(null); // Close the popover
    setOpenpop(false)
  };
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
              cursor:'pointer'
            }}
            onClick={handleClick}
          >
            {
            userName ? 
            `Hi, ${userName}!`
            : <CircularProgress style={{ color: 'white', fontSize:'6px' }}/>
            }
          </Typography>
          <Popover
        open={openpop}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
            <Button
              onClick={handleLogOut}
              variant="contained"
              size='small'
              sx={{
                // margin: "10px",
                backgroundColor: "brown", // Set the button color to dark brown
                "&:hover": {
                  backgroundColor: "#5D3A1A", // A darker shade of brown for the hover effect
                },
                textTransform: 'none'
              }}
            >
              Log out
            </Button>
      </Popover>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
