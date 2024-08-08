const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
  create: (user, callback) => {
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) return callback(err);
      const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
      db.query(query, [user.username, hash], (err, results) => {
        if (err) return callback(err);
        callback(null, results.insertId);
      });
    });
  },
  findByUsername: (username, callback) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  }
};

module.exports = User;
