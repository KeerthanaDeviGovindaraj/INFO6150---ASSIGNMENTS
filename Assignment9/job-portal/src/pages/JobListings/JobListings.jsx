import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import JobCard from '../../components/JobCard/JobCard';
import { jobPosts } from '../../utils/jobData';
import { Work } from '@mui/icons-material';

const JobListings = () => {
  return (
    <Box sx={{ backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
      {/* Header Section */}
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
            <Work sx={{ fontSize: 60, mb: 2 }} />
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 800, 
                mb: 2
              }}
            >
              Available Positions
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.95 }}>
              {jobPosts.length} exciting opportunities waiting for you
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Job Cards Grid */}
      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <Grid container spacing={4}>
          {jobPosts.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <JobCard job={job} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default JobListings;