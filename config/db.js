// Database Configuration: Node.js backend connects to MYSQL
//Import mysql2 package
const mysql = require("mysql2");
const dotenv = require("dotenv");

//load environment variables from .env file
dotenv.config({ path: "../.env" });

//create connection to mysql db
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});
//connect to database and test node

//to check env files are getting read or not
console.log("ENV TEST →", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err.message);
  } else {
    console.log("Database Connected Successfully to MYSQL RDS");
  }
});

module.exports = db;
