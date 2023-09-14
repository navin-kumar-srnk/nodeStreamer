const express = require('express');
const http = require('http');
const SimplePeer = require('simple-peer');
const RTSPStream = require('node-rtsp-stream');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server); // Initialize Socket.io with the HTTP server

// Create an RTSP stream
const rtspStream = new RTSPStream({
    name: 'name',
    streamUrl: 'rtsp://:8554/stream2',
    wsPort: 9999,
    ffmpegOptions: { // options ffmpeg flags
      '-stats': '', // an option with no neccessary value uses a blank string
      '-r': 30 // options with required values specify the value after the key
    }
  })
// Store connected WebRTC peers
const webRtcPeers = new Set();

// Handle incoming Socket.io connections for signaling
io.on('connection', (socket) => {
  const peer = new SimplePeer({ initiator: true });

  // Add the WebRTC peer to the set
  webRtcPeers.add(peer);

  // Handle messages from the WebRTC peer
  socket.on('message', (message) => {
    // Forward the message to the corresponding WebRTC peer
    peer.signal(message);
  });

  // When the WebRTC peer has a signal, send it to the Socket.io client
  peer.on('signal', (data) => {
    socket.emit('signal', data);
  });

  // When the WebRTC peer closes, remove it from the set
  peer.on('close', () => {
    webRtcPeers.delete(peer);
  });
});

// Handle RTSP stream data and forward it to connected WebRTC peers
rtspStream.on('data', (data) => {
  for (const peer of webRtcPeers) {
    // Ensure data is forwarded in the correct format and codec
    // This may involve converting the RTSP format to WebRTC-compatible formats
    peer.send(data);
  }
});

// Start the HTTP server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
