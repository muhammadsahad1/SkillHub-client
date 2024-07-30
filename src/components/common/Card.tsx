import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const OutlinedCard = ({users}) => {
  return (
    <Box sx={{ minWidth: 275, display: 'flex', justifyContent: 'center', p: 2 }}>
      <Card className='mt-32'
        variant="outlined"
        sx={{
          borderColor: 'primary.main',
          borderRadius: '16px',
          boxShadow: 3,
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.01)',
            boxShadow: 6,
          
          },
        }}
      >
        <CardContent sx={{ padding: '16px' }}>
          <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="div" sx={{ mb: 1 }}>
            be{bull}nev{bull}o{bull}lent
          </Typography>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end', padding: '16px' }}>
          <Button size="small" color="primary">Learn More</Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default OutlinedCard;
