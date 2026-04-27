
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const apis = require("./utils/apis.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (req, res) => {
  const city = (req.query.city || "Kahului").trim();

  const [weatherResult, jokeResult, chuckResult, courseStatsResult] = await Promise.allSettled([
    apis.getWeather(city),
    apis.getJoke(),
    apis.getChuckNorris(),
    apis.getCourseStats(),
  ]);

  const weather =
    weatherResult.status === "fulfilled"
      ? weatherResult.value
      : { ok: false, message: "Weather service unavailable right now." };

  const joke =
    jokeResult.status === "fulfilled"
      ? jokeResult.value
      : { ok: false, joke: "Could not load a programming joke." };

  const chuck =
    chuckResult.status === "fulfilled"
      ? chuckResult.value
      : { ok: false, value: "Could not load Chuck Norris inspiration." };

  const courseStats =
    courseStatsResult.status === "fulfilled"
      ? courseStatsResult.value
      : {
          university: "UH Maui College",
          semester: "Spring 2026",
          totalCourses: 0,
          totalDepartments: 0,
          avgEnrollment: 0,
        };

  res.render("index", {
    city,
    weather,
    joke,
    chuck,
    courseStats,
    now: new Date().toLocaleString(),
  });
});

app.listen(port, () => {
  console.log(`Multi-API Dashboard running on port ${port}`);
});
