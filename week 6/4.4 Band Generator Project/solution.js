import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("solution.ejs");
});

app.post("/submit", (req, res) => {
  const randomCourseID = courseIDs[Math.floor(Math.random() * courseIDs.length)];
  const randomCourseName = courseNames[Math.floor(Math.random() * courseNames.length)];
  res.render("solution.ejs", {
    courseID: randomCourseID,
    courseName: randomCourseName,
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
//A list of course IDs and course names to randomly select from when the form is submitted.
const courseIDs = [
  "ICS 111",
  "ICS 141",
  "ICS 211",
  "ICS 212",
  "ICS 215",
  "ICS 241",
  "ICS 314",
  "ICS 321",
  "ICS 322",
  "ICS 331",
  "ICS 355",
  "ICS 361",
  "ICS 365",
  "ICS 383",
  "ICS 385",
  "ICS 390",
  "ICS 414",
  "ICS 415",
  "ICS 419",
  "ICS 421",
  "ICS 423",
  "ICS 424",
  "ICS 425",
  "ICS 426",
  "ICS 432",
  "ICS 441",
  "ICS 442",
  "ICS 451",
  "ICS 455",
  "ICS 464",
  "ICS 465",
  "ICS 466",
  "ICS 469",
  "ICS 475",
  "ICS 481",
  "ICS 483",
  "ICS 484",
  "ICS 485",
  "ICS 491",
  "ICS 495",
  "ICS 499",
  ];
  //A list of course names to randomly select from when the form is submitted.
  const courseNames = [
    "Database Design",
    "System Analysis",
    "Web Development",
    "Software Engineering",
    "Data Structures",
    "Algorithms",
    "Operating Systems",
    "Computer Networks",
    "Artificial Intelligence",
    "Machine Learning",
    "Cybersecurity",
    "Mobile App Development",
    "Game Development",
    "Cloud Computing",
    "Human-Computer Interaction",
    "Programming Languages",
    "Discrete Mathematics",
    "Computer Architecture",
    "Information Security",
    "Big Data Analytics",
    "Digital Forensics",
    "Parallel Computing",
    "Computer Graphics",
    "Natural Language Processing",
    "Robotics",
    "Bioinformatics",
    "Compiler Design",
    "Embedded Systems",
    "Quantum Computing",
    "Ethical Hacking",
    "IT Project Management"
  ];