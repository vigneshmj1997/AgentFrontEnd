import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8A1538', // Lighter maroon for the navigation bar
    },
    secondary: {
      main: '#FFFFFF', // White text
    },
  },
  typography: {
    h6: {
      fontWeight: 600,
    },
  },
});

function MyAppBar() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary">
        <Toolbar>
          {/* Logo Section */}
          <Box
            component="img"
            sx={{
              height: 80,
              marginRight: 2, // Space between logo and text
              padding:1
            }}
            alt="Logo"
            src="src\assets\download.png" // Replace with your image path
          />
          {/* Title Section */}
          <Typography variant="h6" color="secondary">
            Ministry of Labour
          </Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default MyAppBar;
