import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, CircularProgress, Alert, Box } from '@mui/material';
import CompanyCard from '../../components/CompanyCard/CompanyCard';
import { apiService } from '../../services/apiService';
import { Business } from '@mui/icons-material';

const CompanyShowcase = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const data = await apiService.getCompanyImages();
      setCompanies(data);
    } catch (err) {
      setError(err.toString());
      setCompanies([
        { name: 'Tech Corporation', imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop' },
        { name: 'Innovation Labs', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop' },
        { name: 'Digital Solutions', imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop' },
        { name: 'Cloud Systems', imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop' },
        { name: 'Data Analytics Pro', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop' },
        { name: 'Smart Tech', imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ backgroundColor: '#F9FAFB', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress sx={{ color: '#667eea' }} size={60} />
      </Box>
    );
  }

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
          <Box sx={{ textAlign: 'center' }}>
            <Business sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
              Our Partner Companies
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.95 }}>
              Explore opportunities with industry-leading organizations
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 8 }}>
        {error && (
          <Alert 
            severity="info" 
            sx={{ 
              mb: 4,
              borderRadius: 2,
              backgroundColor: '#EFF6FF',
              color: '#1e40af',
              border: '1px solid #BFDBFE'
            }}
          >
            Showing demo data. {error}
          </Alert>
        )}

        <Grid container spacing={4}>
          {companies.map((company, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CompanyCard company={company} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CompanyShowcase;