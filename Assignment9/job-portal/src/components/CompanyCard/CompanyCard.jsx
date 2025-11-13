import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { Business } from '@mui/icons-material';

const CompanyCard = ({ company }) => {
  return (
    <Card 
      elevation={0}
      sx={{
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 3,
        border: '1px solid #E5E7EB',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {

          transform: 'translateY(-8px)',
          boxShadow: '0 20px 40px rgba(102, 126, 234, 0.15)',
          borderColor: '#667eea',
          cursor: 'pointer'
        }
      }}
    >
      <Box sx={{ position: 'relative', backgroundColor: '#F1F5F9' }}>
        <CardMedia
          component="img"
          height="220"
          image={company.imageUrl || 'https://via.placeholder.com/400x300/667eea/ffffff?text=Company'}
          alt={company.name}
          sx={{ 
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        />
        {!company.imageUrl && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <Business sx={{ fontSize: 60, color: '#667eea', opacity: 0.5 }} />
          </Box>
        )}
      </Box>
      <CardContent sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
          {company.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
