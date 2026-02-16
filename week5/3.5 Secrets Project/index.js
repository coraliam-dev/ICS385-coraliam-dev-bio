//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import bodyParser from "body-parser"; // <-- Paste imports at the TOP
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

// --- MIDDLEWARE SECTION ---
// This line tells your server how to read data from the HTML form
app.use(bodyParser.urlencoded({ extended: true })); 

// --- ROUTES SECTION ---
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// This is where the "check" logic goes after someone clicks submit
app.post("/check", (req, res) => {
  const userPassword = req.body["password"]; // This gets the password from the form

  if (userPassword === "ILoveProgramming") {
    res.sendFile(__dirname + "/public/secret.html"); // If correct, show the secret page
  } else {
    res.redirect("/"); // If wrong, send them back to the login page
    // OR you can use: res.sendFile(__dirname + "/public/index.html");
  }
});

// --- START SERVER ---
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});