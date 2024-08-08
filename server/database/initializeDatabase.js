const db = require('../config/db');

const createCustomersTable = `
  CREATE TABLE IF NOT EXISTS customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    website VARCHAR(255),
    industry VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  );
`;

const createMeetingsTable = `
  CREATE TABLE IF NOT EXISTS meetings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATETIME NOT NULL,
    customerId INT,
    FOREIGN KEY (customerId) REFERENCES customers(id)
  );
`;

db.query(createCustomersTable, (err, result) => {
  if (err) throw err;
  console.log("Customers table created or already exists");

  db.query(createUsersTable, (err, result) => {
    if (err) throw err;
    console.log("Users table created or already exists");

    db.query(createMeetingsTable, (err, result) => {
      if (err) throw err;
      console.log("Meetings table created or already exists");
      process.exit();
    });
  });
});
