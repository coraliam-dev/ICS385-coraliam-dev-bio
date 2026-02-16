// Copy of original index.js for security testing
// GenAI tools used: bcryptjs integration, environment variable usage, password hash comparison, security comments
import express from "express";
import bodyParser from "body-parser"; // <-- Paste imports at the TOP
import { dirname } from "path";
import { fileURLToPath } from "url";
// GenAI tools used: bcryptjs import for password hashing
import bcrypt from "bcryptjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

// --- MIDDLEWARE SECTION ---
// This line tells your server how to read data from the HTML form
app.use(bodyParser.urlencoded({ extended: true })); 

// GenAI tools used: Store hashed password in environment variable
// Example: export SECRET_HASH=$(node -e "console.log(require('bcryptjs').hashSync('ILoveProgramming', 10))")
const secretHash = process.env.SECRET_HASH;

// --- ROUTES SECTION ---
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// This is where the "check" logic goes after someone clicks submit
app.post("/check", (req, res) => {
  const userPassword = req.body["password"]; // This gets the password from the form

  // GenAI tools used: bcryptjs password hash comparison
  if (secretHash && bcrypt.compareSync(userPassword, secretHash)) {
    res.sendFile(__dirname + "/public/secret.html"); // If correct, show the secret page
  } else {
    res.redirect("/"); // If wrong, send them back to the login page
    // OR you can use: res.sendFile(__dirname + "/public/index.html");
  }
});

// --- START SERVER ---
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  // GenAI tools used: Security reminder for environment variable
  // Reminder: Set SECRET_HASH in your environment before running!
  // Example: export SECRET_HASH=$(node -e "console.log(require('bcryptjs').hashSync('ILoveProgramming', 10))")
});
