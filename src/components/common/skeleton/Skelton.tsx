import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function SkeletonLoader() {
  return (
    <Stack
      spacing={2}
      sx={{ 
        width: '100%',
        maxWidth: 800, // Adjusted width for profile alignment
        margin: 'auto',
        marginTop: '100px' // Align with profile page margin
      }}
    >
      <Skeleton 
        variant="rectangular" 
        width="100%"
        height={300} // Height to match cover image
        sx={{ borderRadius: '8px' }} // Rounded corners for consistency
      />

      <Skeleton 
        variant="circular" 
        width={120} 
        height={120} 
        sx={{ alignSelf: 'start', marginTop: '-60px' }} // Centered profile picture
      />
      
      <Skeleton 
        variant="text" 
        sx={{ fontSize: '2rem', width: '60%', margin: 'auto' }} // Adjusted for profile name
      />

      <Skeleton 
        variant="text" 
        sx={{ fontSize: '1rem', width: '80%', margin: 'auto' }} // Adjusted for bio or other details
      />
      
      <Skeleton 
        variant="rectangular" 
        width="80%"
        height={80} // For additional content blocks
        sx={{ borderRadius: '8px', margin: 'auto' }}
      />
      
      <Skeleton 
        variant="rectangular" 
        width="80%"
        height={80}
        sx={{ borderRadius: '8px', margin: 'auto' }}
      />
    </Stack>
  );
}
