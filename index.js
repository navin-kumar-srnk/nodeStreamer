
const cors = require("cors")
const express = require('express')
const path = require('path')
const homeDir = require('os').homedir()
var http = require('http');



const streamRoutes = require('./Routes/stream')
let server
const app = express()

const port = 5000

// Enable CORS for all routes
app.use((req, res, next) => {
  // Allow requests from any origin
  res.header('Access-Control-Allow-Origin', '*');
  
  // ... (other CORS headers and settings)
  
  // Continue with the request
  next();
});

app.use(cors({ origin: '*' }))
app.use(express.json())

const { io } = require('./socket')
require('./socket').socket(io)


app.use('/stream', streamRoutes)


app.use('/live', express.static(path.join(homeDir, '/static')))




// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
server = http.createServer(app).listen(port);



io.attach(server);

server.on('error', (err) => {
  console.log(`errr` + err)
});
server.on('listening', () => {
  console.log(`Example app listening on port ${port}`)
});




