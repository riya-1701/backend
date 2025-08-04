const db = require("../config/db");
//table is created with name : users in sql query
const createUserTable = () => {
  const abc = `
        CREATE TABLE IF NOT EXISTS users(
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(200) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP       
    );
    `;

  db.query(abc, (err, result) => {
    if (err) {
      console.error("Table is not created", err.message);
    } else {
      console.log("users table exists!");
    }
  });
};
//call the functions when file run
createUserTable();

module.exports = db;
