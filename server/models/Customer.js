const db = require('../config/db');

const Customer = {
  getAll: (callback) => {
    const query = 'SELECT * FROM customers';
    db.query(query, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
  getById: (id, callback) => {
    const query = 'SELECT * FROM customers WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },
  create: (customer, callback) => {
    const query = 'INSERT INTO customers SET ?';
    db.query(query, customer, (err, results) => {
      if (err) return callback(err);
      callback(null, results.insertId);
    });
  },
  update: (id, customer, callback) => {
    const query = 'UPDATE customers SET ? WHERE id = ?';
    db.query(query, [customer, id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
  delete: (id, callback) => {
    const query = 'DELETE FROM customers WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }
};

module.exports = Customer;
