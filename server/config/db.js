const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();  // Load environment variables

console.log("DB Host:", process.env.DB_HOST);
console.log("DB User:", process.env.DB_USER);
console.log("DB Name:", process.env.DB_NAME);

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = connection;
