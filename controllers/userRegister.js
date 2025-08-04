//To secure compare passwords
const bcrypt = require("bcrypt");
const db = require("../config/db");
const jwt = require("jsonwebtoken");

//User Register Function
const userRegister = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  //Validate input
  if (!email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //Match Password entered by user
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  //Check if email already exists
  //Find user by email: ? is a placeholder which is later replaced by email in db.query
  const checkQuery = `Select* from users where email = ?`;
  db.query(checkQuery, [email], async (err, results) => {
    if (err) {
      console.error("DB ERROR:", err);
      return res.status(500).json({ message: "Database error" });
    }
    //   results.length refers to the number of rows returned from the SQL query
    if (results.length > 0) {
      console.log("User Not Found");
      return res.status(401).json({ message: "Email already registered!" });
    }
    const user = results[0];
    console.log("Found User:", user);

    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Insert user into db
    const insertQuery = `Insert into users (email, password) values (?,?)`;
    db.query(insertQuery, [email, hashedPassword], async (err, results) => {
      if (err) {
        console.log("Insert Error:", err);
        return res.status(500).json({ message: "Registeration Failed" });
      }
      return res.status(201).json({ message: "User Registered Successfully" });
    });
  });
};

module.exports = { userRegister };
