require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER_DB,
    password: process.env.PASSWORD,
    // database: process.env.DATABASE,
    insecureAuth: true,
});

// Connect to the MySQL server
db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL: ' + err.stack);
      return;
    }
    console.log('Connected to MySQL as id ' + db.threadId);
  
    // Create the database if it doesn't exist
    db.query('CREATE DATABASE IF NOT EXISTS tasksalexis;', (err, results) => {
      if (err) {
        console.error('Error creating database: ' + err);
        // return;
      }
  
      console.log('Database "tasksalexis" created or already exists.');
  
      // Use the "tasksalexis" database
      db.changeUser({ database: 'tasksalexis' }, (err) => {
        if (err) {
          console.error('Error selecting database: ' + err);
          return;
        }
  
        console.log('Using "tasksalexis" database.');
        
        // user_id INT AUTO_INCREMENT PRIMARY KEY,
        db.query(`
            CREATE TABLE IF NOT EXISTS users (
              username VARCHAR(255) PRIMARY KEY,
              password VARCHAR(60) NOT NULL
          );`, (err, results) => {
          if (err) {
            console.error('Error creating table: ' + err);
          } else {
            console.log('Table "users" created or already exists.');
          }
        });

        // Create the "items" table if it doesn't exist
        db.query(`
          CREATE TABLE IF NOT EXISTS items (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            Name VARCHAR(255) NOT NULL,
            Description TEXT,
            Status TINYINT(1) DEFAULT 0,
            username VARCHAR(255),
            FOREIGN KEY (username) REFERENCES users(username)
          );`, (err, results) => {
          if (err) {
            console.error('Error creating table: ' + err);
          } else {
            console.log('Table "items" created or already exists.');
          }
        });

        
      });
    });
  });
  
module.exports = db;