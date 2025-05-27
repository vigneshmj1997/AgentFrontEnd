import React from 'react';
import { Box, Paper, Typography, Avatar } from '@mui/material';
import getSpeakerIcon from './getSpeakerIcon';
import { Margin } from '@mui/icons-material';

const getBGColor = (user) => {
  const colors = {
    judge: '#8A1538',
    critic: '#026E78',
    defendant: '#0D4261',
    user: '#0D4261',
  };
  return colors[user.toLowerCase()] || colors.user;
};


const getSenderName = (sender) => {
  switch (sender.toLowerCase()) {
    case 'speaker':
      return 'Speaker';
    case 'user':
      return 'User';
    case 'defendant':
      return 'مدعى عليه';
    case 'user':
      return 'أنت'; // This means "You" in Arabic
    default:
      return sender;
  }
};

const MessageComponent = ({ message, index }) => {
  // if (index === 0) {
  //   try {
  //     const jsonValue = JSON.parse(message.text);
  //     console.log(jsonValue)
  //     return <Typography variant="body1">{message.text.request_number}</Typography>;
  //   } catch (error) {
  //     return <Typography variant="body1">Invalid JSON</Typography>;
  //   }
  // }
  return <Typography variant="body1">{message.text}</Typography>;
};

const Neo4jChatApp = ({ messages }) => {

  console.log("Message")
  console.log(messages)
  
  return (
    <Paper
      elevation={3}
      sx={{
        
        height: '65vh',
        display: 'flex',
        flexDirection: 'column',
        p: 3,
        boxSizing: 'border-box',
        backgroundColor: '#f5f5f5',
        borderRadius: 4,
        overflow: 'hidden', // Prevents overflow
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto', // Enables scrolling for overflowing content
          mb: 2,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '4px',
          },
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
              mb: 2,
            }}
          >
            {message.sender !== 'user' && (
              <Avatar sx={{ mr: 1, bgcolor: getBGColor(message.sender) }}>
                {getSpeakerIcon(message.sender)}
              </Avatar>
              
            )}
            <Box
              sx={{
                maxWidth: '70%',
                bgcolor: getBGColor(message.sender),
                color: 'white',
                p: 2,
                borderRadius: 2,
                boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                wordWrap: 'break-word', // Ensures long text wraps within the box
              }}
            >
                <div className='senderName' style={{ fontFamily: 'Arial, sans-serif' }}>
                  {getSenderName(message.sender)}
                </div>
              <MessageComponent message={message} index={index} />
              {/* <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.8 }}>
                {message.sender}
              </Typography> */}
            </Box>
            {message.sender === 'user' && (
              <Avatar sx={{ ml: 1, bgcolor: getBGColor(message.sender) }}>
                {getSpeakerIcon(message.sender)}
              </Avatar>
            )}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default Neo4jChatApp;
