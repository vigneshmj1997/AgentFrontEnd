import './App.css';
import ChatApp from './ChatPage';
import ComplaintDetails from './ComplaintDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyAppBar from './AppBar';
import React, { useState } from "react";
import { Box, TextField, IconButton, CircularProgress, Paper, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import Agents  from './Agents';
import Neo4j from './Neo4j'




function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route path="/Neo4j" element={<Neo4j/>} />

        {/* Agents Route */}
        <Route path="/agents" element={<Agents/>} />
      </Routes>
    </Router>
  );
}

export default App;
  
