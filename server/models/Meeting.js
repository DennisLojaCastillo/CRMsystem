const db = require('../config/db');

const Meeting = {
  getAll: (callback) => {
    const query = 'SELECT * FROM meetings';
    db.query(query, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
  getById: (id, callback) => {
    const query = 'SELECT * FROM meetings WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },
  create: (meeting, callback) => {
    const query = 'INSERT INTO meetings SET ?';
    db.query(query, meeting, (err, results) => {
      if (err) return callback(err);
      callback(null, results.insertId);
    });
  },
  update: (id, meeting, callback) => {
    const query = 'UPDATE meetings SET ? WHERE id = ?';
    db.query(query, [meeting, id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
  delete: (id, callback) => {
    const query = 'DELETE FROM meetings WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }
};

module.exports = Meeting;
