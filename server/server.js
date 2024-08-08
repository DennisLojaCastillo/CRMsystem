const express = require('express');
const session = require('express-session');
const path = require('path');
const customerRoutes = require('./routes/customerRoutes');
const authRoutes = require('./routes/authRoutes');
const meetingRoutes = require('./routes/meetingRoutes');
const authMiddleware = require('./middleware/auth');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

global.io = io; // Gem io i en global variabel

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true when using HTTPS
}));

// Static files
app.use(express.static(path.join(__dirname, '../client/public')));

// Serve HTML files
app.get('/pages/*', (req, res) => {
  res.sendFile(path.join(__dirname, `../client/public${req.path}`));
});

// Routes
app.use('/api/customers', authMiddleware, customerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/meetings', authMiddleware, meetingRoutes);

// Socket.io configuration
io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
