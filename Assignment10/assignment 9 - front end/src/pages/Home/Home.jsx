import React from 'react';
import { Container, Typography, Button, Box, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { Work, Business, TrendingUp, Group } from '@mui/icons-material';

const Home = () => {
  const features = [
    {
      icon: <Work sx={{ fontSize: 50, color: '#667eea' }} />,
      title: '500+ Jobs',
      description: 'Curated opportunities from top companies worldwide'
    },
    {
      icon: <Business sx={{ fontSize: 50, color: '#10b981' }} />,
      title: 'Top Companies',
      description: 'Connect with industry leaders and innovators'
    },
    {
      icon: <TrendingUp sx={{ fontSize: 50, color: '#f59e0b' }} />,
      title: 'Career Growth',
      description: 'Accelerate your professional development'
    },
    {
      icon: <Group sx={{ fontSize: 50, color: '#ec4899' }} />,
      title: '10k+ Candidates',
      description: 'Join thousands of successful job seekers'
    },
  ];

  return (
    <Box sx={{ backgroundColor: '#F9FAFB' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 12,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography 
                variant="h2" 
                sx={{ 
                  fontWeight: 900,
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}
              >
                Find Your Dream Job Today
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 5,
                  fontWeight: 400,
                  opacity: 0.95,
                  lineHeight: 1.8
                }}
              >
                Discover thousands of opportunities from leading companies. 
                Take the next step in your career journey with confidence.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button 
                  variant="contained" 
                  size="large"
                  component={Link}
                  to="/jobs"
                  sx={{
                    px: 5,
                    py: 1.8,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    backgroundColor: 'white',
                    color: '#667eea',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                    '&:hover': {
                      backgroundColor: '#f8f9fa',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 12px 28px rgba(0,0,0,0.2)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Explore Jobs
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  component={Link}
                  to="/companies"
                  sx={{
                    px: 5,
                    py: 1.8,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderColor: 'white',
                    color: 'white',
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-3px)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  View Companies
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography 
          variant="h3" 
          sx={{ 
            mb: 2,
            fontWeight: 800,
            textAlign: 'center',
            color: '#1e293b'
          }}
        >
          Why Choose Us
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 6,
            textAlign: 'center',
            color: '#64748b',
            fontSize: '1.1rem'
          }}
        >
          Everything you need to find your perfect career opportunity
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  minHeight: '280px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  textAlign: 'center',
                  backgroundColor: 'white',
                  borderRadius: 4,
                  border: '1px solid #E5E7EB',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-12px)',
                    boxShadow: '0 20px 40px rgba(102, 126, 234, 0.1)',
                    borderColor: '#667eea',
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ mb: 3 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1e293b' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.7 }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          py: 10,
          textAlign: 'center',
          color: 'white'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 3 }}>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" sx={{ mb: 5, opacity: 0.95 }}>
            Join thousands of professionals who found their dream jobs
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/jobs"
            sx={{
              px: 6,
              py: 2,
              borderRadius: 3,
              textTransform: 'none',
              fontSize: '1.2rem',
              fontWeight: 700,
              backgroundColor: 'white',
              color: '#667eea',
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              '&:hover': {
                backgroundColor: '#f8f9fa',
                transform: 'translateY(-3px)',
                boxShadow: '0 12px 28px rgba(0,0,0,0.2)',
              }
            }}
          >
            Browse All Jobs
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;