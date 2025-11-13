import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  Container,
  Avatar
} from '@mui/material';
import { Logout, WorkOutline } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Jobs', path: '/jobs' },
    { label: 'Companies', path: '/companies' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        backgroundColor: 'white',
        borderBottom: '1px solid #E5E7EB'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WorkOutline sx={{ fontSize: 32, color: '#667eea' }} />
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 800,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                cursor: 'pointer'
              }}
              onClick={() => navigate('/')}
            >
              Job Portal
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                sx={{
                  color: location.pathname === item.path ? '#667eea' : '#64748b',
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: location.pathname === item.path ? 700 : 500,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: location.pathname === item.path ? '70%' : '0%',
                    height: '3px',
                    backgroundColor: '#667eea',
                    borderRadius: '2px 2px 0 0',
                    
                    transition: 'width 0.3s ease'
                  },
                  '&:hover': {
                    backgroundColor: '#F8FAFC',
                    color: '#667eea',
                    '&::after': {
                      width: '70%'

                    }
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar 
              sx={{ 
                bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                width: 40,
                height: 40,
                fontWeight: 700,
                fontSize: '1rem'
              }}
            >
              {user?.fullName?.charAt(0) || user?.email?.charAt(0)}
            </Avatar>
            <Button
              onClick={handleLogout}
              startIcon={<Logout />}
              sx={{
                color: '#64748b',
                textTransform: 'none',
                fontWeight: 600,
                px: 2,
                py: 1,
                borderRadius: 2,
                border: '1px solid #E5E7EB',
                '&:hover': {
                  backgroundColor: '#F8FAFC',
                  borderColor: '#667eea',
                  color: '#667eea',
                }
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;