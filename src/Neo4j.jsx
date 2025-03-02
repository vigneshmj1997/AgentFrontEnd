import './App.css';
import Neo4jChatApp from './Neo4jChatPage';
import MyAppBar from './AppBar';
import React, { useState } from "react";
import { Box, TextField, IconButton, CircularProgress, Paper, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

function Neo4j() {
  const [input, setInput] = useState('');
  const [data, setData] = useState({});
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
// Define the request payload
const payload = {
  "question": "string"
};
  const handleSend = async () => {
    if (input.trim()) {
      setLoading(true);
      try {
        // let initialResponse = await axios.post('http://192.168.130.232:8001/expert-response/', {
        //   params: { request_id: input }
        // });
        payload.question = input;
        axios.post('http://192.168.130.232:8001/ask',payload, {
          headers: {
           'accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            // Handle the successful response
            console.log('Response:', response.data);
            setData(response.data);
             setMessages((prevMessages) => [
          ...prevMessages,
          { text: response.data.question, sender: 'user' }
        ]);
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: response.data.result, sender: 'speaker' }
          ]);
        setInput('');
            setLoading(false);
          })
          .catch(error => {
            // Handle any errors
            if (error.response) {
              console.error('Error Response:', error.response.data);
            } else {
              console.error('Error:', error.message);
            }
          });
        // setData(initialResponse.data);
        // setLoading(false);

        // setMessages((prevMessages) => [
        //   ...prevMessages,
        //   { text: JSON.stringify(initialResponse.data), sender: 'user' }
        // ]);
        // setInput('');

        // let secondResponse = await axios.post('http://localhost:8000/invoke', {
        //   message: JSON.stringify(initialResponse.data),
        // });

        // setMessages((prevMessages) => [
        //   ...prevMessages,
        //   { text: secondResponse.data.messages, sender: secondResponse.data.speaker }
        // ]);

        // const currentThreadId = secondResponse.data.thread_id;
        // while (secondResponse.data.next_agent !== '__end__') {
        //   let response = await axios.post('http://localhost:8000/invoke', {
        //     thread_id: currentThreadId,
        //   });

        //   setMessages((prevMessages) => [
        //     ...prevMessages,
        //     { text: response.data.messages, sender: response.data.speaker }
        //   ]);

        //   if (response.data.next_agent === '__end__') break;
        // }
      } catch (error) {
        console.error('Error communicating with the server:', error);
      }
    }
  };

  return (
    <Box sx={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column'}}>
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
            <Box display="flex" alignItems="center" mb={2}>
              <img
                src="src\assets\download (1).jpg"
                alt="Logo"
                style={{ height: '30px', marginRight: '10px', fontFamily: 'Calibre, Arial, sans-serif' }}
              />
              <Typography variant="h5"  sx={{ color: '#8A1538', fontFamily: 'Calibre, Arial, sans-serif'}}>
                Chat Window
              </Typography>
            </Box>

            <Box flex={1}>
              <Neo4jChatApp messages={messages} />
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


        </Box>

    </Box>
  );
}

export default Neo4j;
