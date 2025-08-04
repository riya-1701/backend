// For Loading Environment variables files
// require("dotenv").config({path: ../.env});

const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const db = require("./config/db");
const cors = require("cors");

//To check server is running or not
app.get("/", (req, res) => {
  res.send("Server is working!");
});

//Frontend is served at: http://127.0.0.1:5500 and backend (API) is served at: http://localhost:3000.
// So when frontend (port 5500) tries to access backend (port 3000), browser blocks the request — unless the backend explicitly allows it using CORS.
app.use(cors());

// This line is required to parse JSON request body
app.use(express.json());

// Use routes
app.use("/", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

app.post("/register", async (req, res) => {
  console.log("Register Server is working");
});
