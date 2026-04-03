
import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const port = 3000;


// Loads and parses the course catalog JSON with error handling
function loadCourseData() {
  try {
    const data = fs.readFileSync("./recipe.json", "utf-8");
    const catalog = JSON.parse(data);
    return catalog;
  } catch (err) {
    console.error("Error loading or parsing course catalog:", err.message);
    return null;
  }
}

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


// Display all courses in a responsive grid
function displayAllCourses() {
  const catalog = loadCourseData();
  if (!catalog) return [];
  // Flatten all courses from all departments
  let allCourses = [];
  catalog.departments.forEach(dept => {
    dept.courses.forEach(course => {
      allCourses.push({
        ...course,
        department: dept.code,
        departmentName: dept.name
      });
    });
  });
  return allCourses;
}

app.get("/", (req, res) => {
  const courses = displayAllCourses();
  const catalogJSON = loadCourseData();
  res.render("index.ejs", { courses, catalogJSON });
});

app.post("/recipe", (req, res) => {
  //Step 3: Write your code here to make this behave like the solution website.
  //Step 4: Add code to views/index.ejs to use the recieved recipe object.
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
