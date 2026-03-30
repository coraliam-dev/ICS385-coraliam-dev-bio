import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import session from "express-session";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// Use session to track user authentication securely
app.use(session({
  secret: "your-session-secret", // In production, use a strong secret and store in env
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));

// Beginner-friendly password check using environment variable
function passwordCheck(req, res, next) {
  const password = req.body["password"];
  // Check password against environment variable
  if (password === process.env.SECRET_PASSWORD) {
    // Set session variable to track user authentication
    req.session.userIsAuthorised = true;
  }
  next();
}
app.use(passwordCheck);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  // Check session variable for user authentication
  if (req.session.userIsAuthorised) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.sendFile(__dirname + "/public/index.html");
    // Alternatively res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  // Reminder: Set SECRET_PASSWORD in your environment before running!
  // Example: SECRET_PASSWORD=ILoveProgramming node solution_TEST.js
});
