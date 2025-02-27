import React from 'react';
import { Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import GavelIcon from '@mui/icons-material/Gavel';
import RateReviewIcon from '@mui/icons-material/RateReview'; // Import an icon for the critic

const getSpeakerIcon = (speaker) => {
  let icon;
  let bgColor;

  switch (speaker.toLowerCase()) {
    case 'judge':
      icon = <GavelIcon />;
      bgColor = '#8A1538'; // Maroon color for the judge
      break;
    case 'critic':
      icon = <RateReviewIcon />;
      bgColor = '#026E78'; // Orange color for the critic
      break;
    case 'defendant':
      icon = <PersonIcon />;
      bgColor = '#0d4261'; // Green color for the defendant
      break;
    case 'user':
    default:
      icon = <PersonIcon />;
      bgColor = '#0D4261'; // Default color for the user
      break;
  }

  return (
    
        <Avatar sx={{ bgcolor: bgColor }}>
            {icon}
        </Avatar>
    
  );
};

export default getSpeakerIcon;
