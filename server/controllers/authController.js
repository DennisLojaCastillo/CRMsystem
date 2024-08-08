const User = require('../models/User');
const bcrypt = require('bcrypt');

const authController = {
  register: (req, res) => {
    const { username, password } = req.body;
    User.create({ username, password }, (err, userId) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: userId });
    });
  },
  login: (req, res) => {
    const { username, password } = req.body;
    User.findByUsername(username, (err, user) => {
      if (err) return res.status(500).json({ error: err });
      if (!user) return res.status(401).json({ error: 'Invalid username or password' });
      
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return res.status(500).json({ error: err });
        if (!isMatch) return res.status(401).json({ error: 'Invalid username or password' });
        
        req.session.userId = user.id;
        res.json({ message: 'Login successful' });
      });
    });
  },
  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ error: err });
      res.clearCookie('connect.sid');
      res.json({ message: 'Logout successful' });
    });
  },
  status: (req, res) => {
    res.json({ loggedIn: !!req.session.userId });
  }
};

module.exports = authController;
