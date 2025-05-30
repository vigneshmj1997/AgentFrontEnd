
import './App.css';
import ChatApp from './ChatPage';
import ComplaintDetails from './ComplaintDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyAppBar from './AppBar';
import React, { useState } from "react";
import { Box, TextField, IconButton, CircularProgress, Paper, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';


function Agents() {
    const [input, setInput] = useState('');
    const [data, setData] = useState({});
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const handleSend = async () => {
      if (input.trim()) {
        setLoading(true);
        try {
          let initialResponse = await axios.get('https://lmis-arbitratoragent-api.mol.gov.qa/get-data', {
            params: { request_id: input }
          });
          setData(initialResponse.data);
          setLoading(false);
  
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: JSON.stringify(initialResponse.data), sender: 'user' }
          ]);
          setInput('');
  
          let secondResponse = await axios.post('https://lmis-arbitratoragent-api.mol.gov.qa/invoke', {
            message: JSON.stringify(initialResponse.data),
          });
  
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: secondResponse.data.messages, sender: secondResponse.data.speaker }
          ]);
  
          const currentThreadId = secondResponse.data.thread_id;
          while (secondResponse.data.next_agent !== '__end__') {
            let response = await axios.post('https://lmis-arbitratoragent-api.mol.gov.qa/invoke', {
              thread_id: currentThreadId,
            });
  
            setMessages((prevMessages) => [
              ...prevMessages,
              { text: response.data.messages, sender: response.data.speaker }
            ]);
  
            if (response.data.next_agent === '__end__') break;
          }
        } catch (error) {
          console.error('Error communicating with the server:', error);
          setError(true);
        }
      }
    };
  
    return (
      <Box sx={{ margin:"0px", width: '100%', height: '95%', display: 'flex', flexDirection: 'column'}}>
        {/* AppBar with Logo */}
        <MyAppBar>
          <img
            src="download.jpg"
            alt="Logo"
            style={{ height: '40px', marginRight: '10px' }}
          />
        </MyAppBar>
  
          <Box display="flex" flex={1} p={2} gap={2} sx={{ overflow: 'hidden' }}>
            
            {/* Chat Section */}
            <Paper
              elevation={3}
              sx={{
                flex: 1,
                backgroundColor: '#FFFFFF',
                borderRadius: 3,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Box display="flex" alignItems="center">
                <Typography variant="h5"  sx={{ color: '#8A1538', fontFamily: 'Calibre, Arial, sans-serif'}}>
                  Chat Window 
                </Typography>
              </Box>
  
              <Box flex={1}>
                <ChatApp messages={messages} />
              </Box>
  
              {/* Chat Input */}
              <Box
                component="form"
                display="flex"
                mt={2}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
              >
                <TextField
                  variant="outlined"
                  placeholder="Enter Request No..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  fullWidth
                  sx={{
                    bgcolor: 'white',
                    borderRadius: '8px',
                    fontFamily: 'Calibre, Arial, sans-serif'
                  }}
                />
                <IconButton
                  type="submit"
                  sx={{
                    backgroundColor: "#026E78",
                    color: "#fff",
                    borderRadius: "8px",
                    width: "50px",
                    height: "50px",
                    ml: 1,
                    "&:hover": { backgroundColor: "#0D4261" },
                  }}
                >
                  <SendIcon />
                </IconButton>
              </Box>
            </Paper>
  
            {/* Complaint Details Section */}
            <Paper
              elevation={3}
              sx={{
                flex: 1,
                backgroundColor: '#FFFFFF',
                borderRadius: 3,
  
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography variant="h5" sx={{ color: '#0D4261', mb: 2, mr:10,mt:2, fontFamily: 'Calibre, Arial, sans-serif'}}>
                Request Details
              </Typography>
              <Box flex={1}>
                <ComplaintDetails data={data} loading={loading} error={error}/>
              </Box>
            </Paper>
            
          </Box>
        
      </Box>
    );
  }
  
  export default Agents;
  