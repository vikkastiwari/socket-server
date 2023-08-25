const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();

app.get('/',(req,res)=>{
  res.send("Welcome to Socket server!")
});

/**
 * @author Vikas Tiwari
 * @description Create server handler
 * @note Socket cors middleware configuration
*/
const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: ['http://localhost:4200','http://localhost:4201'], 
  },
});

/**
 * @author Vikas Tiwari
 * @description Establishes socket connection
*/
io.on('connection', (socket) => {
  console.log('A user connected');

  const sessionId = socket.id;

  socket.on('drawing', (data) => {
    socket.broadcast.emit('drawing', {sessionId, data});
  });

  socket.on('stopdrawing', (data) => {
    socket.broadcast.emit('stopdrawing', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

/**
 * @author Vikas Tiwari
 * @description Socket server port configuration handler
*/
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Socket server is running on port ${port}`);
});

/**
 * @author Vikas Tiwari
 * @description Socket server error handler
*/
server.on('error', (error) => {
  console.error('Server error:', error);
});