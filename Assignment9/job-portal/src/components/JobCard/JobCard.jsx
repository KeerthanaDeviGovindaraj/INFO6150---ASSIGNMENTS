import React from 'react';
import { 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  Chip,
  Box,
  Divider
} from '@mui/material';
import { Schedule, ArrowForward, AttachMoney, Code } from '@mui/icons-material';

const JobCard = ({ job }) => {
  return (
    <Card 
      elevation={0}
      sx={{ 
        height: '100%',
        minHeight: '440px',
        display: 'flex', 
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 3,
        border: '1px solid #E5E7EB',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 40px rgba(102, 126, 234, 0.15)',
          borderColor: '#667eea',
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 4 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 700, 
            mb: 2, 
            color: '#1e293b',
            lineHeight: 1.3
          }}
        >
          {job.title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1 }}>
          <AttachMoney sx={{ fontSize: 20, color: '#10b981' }} />
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#10b981',
              fontWeight: 700,
              fontSize: '1.1rem'

            }}
          >
            {job.salary}
          </Typography>
        </Box>

        <Typography 
          variant="body2" 
          sx={{ 
            mb: 3,
            color: '#64748b',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.8,
            fontSize: '0.95rem'
          }}
        >
          {job.description}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <Code sx={{ fontSize: 18, color: '#667eea' }} />
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b' }}>
              Required Skills:
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {job.skills.map((skill, index) => (
              <Chip 
                key={index}
                label={skill}
                size="small"
                sx={{
                  backgroundColor: '#EEF2FF',
                  color: '#667eea',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  border: '1px solid #C7D2FE',
                  '&:hover': {
                    backgroundColor: '#667eea',
                    color: 'white',
                  }
                }}
              />
            ))}
          </Box>
        </Box>

        <Chip 
          icon={<Schedule sx={{ fontSize: 16 }} />}
          label={job.lastUpdated} 
          size="small"
          sx={{
            backgroundColor: '#F1F5F9',
            color: '#64748b',
            fontWeight: 600,
            fontSize: '0.75rem',
            border: '1px solid #E5E7EB',
            '& .MuiChip-icon': {
              color: '#667eea'
            }
          }}
        />
      </CardContent>

      <CardActions sx={{ p: 4, pt: 0 }}>
        <Button 
          variant="contained"
          fullWidth
          endIcon={<ArrowForward />}
          href={job.applyLink}
          target="_blank"
          sx={{
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 700,
            fontSize: '1rem',
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
          Apply Now!
        </Button>
      </CardActions>
    </Card>
  );
};

export default JobCard;
