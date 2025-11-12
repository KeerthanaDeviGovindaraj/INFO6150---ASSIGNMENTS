import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent } from '@mui/material';
import { Lightbulb, People, TrendingUp, VerifiedUser } from '@mui/icons-material';

const About = () => {
  const values = [
    {
      icon: <Lightbulb sx={{ fontSize: 50, color: '#667eea' }} />,
      title: 'Innovation',
      description: 'Cutting-edge technology and modern solutions'
    },
    {
      icon: <People sx={{ fontSize: 50, color: '#10b981' }} />,
      title: 'Community',
      description: 'Building connections between talent and opportunity'
    },
    {
      icon: <TrendingUp sx={{ fontSize: 50, color: '#f59e0b' }} />,
      title: 'Growth',
      description: 'Empowering career advancement and success'
    },
    {
      icon: <VerifiedUser sx={{ fontSize: 50, color: '#667eea' }} />,
      title: 'Trust',
      description: 'Verified companies and authentic opportunities'
    },
  ];

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
            About Job Portal
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700, 
              mb: 3,
              color: '#1e293b'
            }}
          >
            Our Story
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#64748b', 
              fontSize: '1.1rem',
              lineHeight: 1.8,
              mb: 3
            }}
          >
            Job Portal is your gateway to finding meaningful career opportunities. 
            We connect talented professionals with leading companies across various industries, 
            making the job search process seamless and efficient.
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#64748b', 
              fontSize: '1.1rem',
              lineHeight: 1.8
            }}
          >
            Our platform is designed to simplify your career journey by providing curated job listings, 
            direct connections with employers, and resources to help you succeed in your professional goals.
          </Typography>
        </Box>

        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            mb: 4,
            color: '#1e293b',
            textAlign: 'center'
          }}
        >
          Our Core Values
        </Typography>

        <Grid container spacing={4}>
          {values.map((value, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  minHeight: '260px',
                  textAlign: 'center',
                  backgroundColor: 'white',
                  borderRadius: 3,
                  border: '1px solid #E5E7EB',
                  p: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(102, 126, 234, 0.1)',
                    borderColor: '#667eea',
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    {value.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1e293b' }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.7 }}>
                    {value.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default About;