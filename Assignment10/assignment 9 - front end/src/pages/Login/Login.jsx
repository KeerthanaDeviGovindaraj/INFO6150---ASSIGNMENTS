import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlice';
import { apiService } from '../../services/apiService';
import { 
  TextField, 
  Button, 
  Container, 
  Paper, 
  Typography, 
  Alert,
  Box,
  InputAdornment,
} from '@mui/material';
import { Email, Lock, WorkOutline } from '@mui/icons-material';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Call backend API
      const response = await apiService.loginUser(credentials);
      
      // Dispatch to Redux store
      dispatch(loginSuccess(response.user));
      
      // Redirect based on user type
      if (response.user.type === 'admin') {
        navigate('/admin/employees');
      } else {
        navigate('/jobs');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3
      }}
    >
      <Container maxWidth="sm">
        <Paper 
          elevation={24}
          sx={{
            padding: { xs: 4, md: 6 },
            borderRadius: 4,
            backgroundColor: 'white',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <WorkOutline sx={{ fontSize: 60, color: '#667eea', mb: 2 }} />
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 800,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              Job Portal
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem' }}>
              Sign in to explore career opportunities
            </Typography>
          </Box>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: 2,
                backgroundColor: '#FEF2F2',
                color: '#DC2626',
                border: '1px solid #FCA5A5'
              }}
            >
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              margin="normal"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: '#667eea' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#667eea',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#667eea',
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#667eea',
                }
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#667eea' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 4,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#667eea',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#667eea',
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#667eea',
                }
              }}
            />

            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              size="large"
              disabled={loading}
              sx={{
                py: 1.8,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                  boxShadow: '0 12px 24px rgba(102, 126, 234, 0.4)',
                  transform: 'translateY(-2px)',
                },
                '&:disabled': {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  opacity: 0.6
                },
                transition: 'all 0.3s ease'
              }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Test Credentials:
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              Admin: admin@test.com / Admin@123
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Employee: emp@test.com / Emp@123
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;