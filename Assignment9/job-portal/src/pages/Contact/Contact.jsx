import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import { Send, Email, Person, Message } from '@mui/icons-material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Box sx={{ backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          mb: 6
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontWeight: 800, textAlign: 'center' }}>
            Get In Touch
          </Typography>
          <Typography variant="h6" sx={{ textAlign: 'center', mt: 2, opacity: 0.95 }}>
            We'd love to hear from you
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ pb: 8 }}>
        <Paper
          elevation={0}
          sx={{
            p: 6,
            borderRadius: 4,
            border: '1px solid #E5E7EB'
          }}
        >
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Your Name"
              margin="normal"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              InputProps={{
                startAdornment: (
                  <Person sx={{ color: '#667eea', mr: 1 }} />
                ),
              }}
              sx={{
                mb: 3,
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
              label="Email Address"
              type="email"
              margin="normal"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              InputProps={{
                startAdornment: (
                  <Email sx={{ color: '#667eea', mr: 1 }} />
                ),
              }}
              sx={{
                mb: 3,
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
              label="Your Message"
              multiline
              rows={6}
              margin="normal"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
              InputProps={{
                startAdornment: (
                  <Message sx={{ color: '#667eea', mr: 1, alignSelf: 'flex-start', mt: 2 }} />
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
              endIcon={<Send />}
              sx={{
                py: 1.8,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '1.1rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                  boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              Send Message
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Contact;