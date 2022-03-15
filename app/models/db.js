const dbConfig = require('../config/db.config.js');
// Create a connection to the database
const { Client } = require('pg');

const client = new Client({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

// open the MySQL connection
client.connect((error) => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
});

module.exports = client;
