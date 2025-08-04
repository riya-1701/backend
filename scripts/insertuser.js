const bcrypt = require("bcrypt");
const db = require("../config/db");

const insertTestUser = async () => {
  const username = "Riya";
  const email = "riya1701";
  const plainPassword = "riya";

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const query = "INSERT INTO users(username, email, password) VALUES (?,?,?)";
  db.query(query, [username, email, hashedPassword], (err, result) => {
    if (err) {
      console.error("Error Inserting User: ", err.message);
    } else {
      console.log("User Inserted Succesfully");
    }
    process.exit();
  });
};
insertTestUser();
