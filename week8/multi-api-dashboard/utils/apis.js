const axios = require("axios");
const fs = require("fs/promises");
const path = require("path");

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const CHUCK_API_KEY = process.env.CHUCK_API_KEY; // For RapidAPI

async function getWeather(city) {
  if (!OPENWEATHER_API_KEY) {
    return { ok: false, message: "Missing OpenWeather API key." };
  }
  try {
    const url = "https://api.openweathermap.org/data/2.5/weather";
    const response = await axios.get(url, {
      params: {
        q: city,
        units: "imperial",
        appid: OPENWEATHER_API_KEY,
      },
    });
    const data = response.data;
    return {
      ok: true,
      city: data.name,
      temp: Math.round(data.main.temp),
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      description: data.weather?.[0]?.description || "Unavailable",
      icon: data.weather?.[0]?.icon || "01d",
    };
  } catch (e) {
    return { ok: false, message: e.response?.data?.message || "Weather unavailable." };
  }
}

async function getJoke() {
  try {
    const response = await axios.get("https://v2.jokeapi.dev/joke/Programming?type=single");
    return { ok: true, joke: response.data.joke };
  } catch (e) {
    return { ok: false, joke: "Could not load a programming joke." };
  }
}

async function getChuckNorris() {
  if (!CHUCK_API_KEY) {
    return { ok: false, value: "Missing Chuck Norris API key." };
  }
  try {
    const response = await axios.get("https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random", {
      headers: {
        accept: "application/json",
        "X-RapidAPI-Key": CHUCK_API_KEY,
        "X-RapidAPI-Host": "matchilling-chuck-norris-jokes-v1.p.rapidapi.com"
      }
    });
    return { ok: true, value: response.data.value };
  } catch (e) {
    return { ok: false, value: "Could not load Chuck Norris inspiration." };
  }
}

async function getCourseStats() {
  const dataPath = path.join(__dirname, "../data/sample-data.json");
  const file = await fs.readFile(dataPath, "utf8");
  const catalog = JSON.parse(file);
  const departments = Array.isArray(catalog.departments) ? catalog.departments : [];
  const courses = departments.flatMap((department) => department.courses || []);
  const totalCourses = courses.length;
  const totalDepartments = departments.length;
  const avgEnrollment =
    totalCourses === 0
      ? 0
      : Math.round(
          courses.reduce((sum, course) => {
            const enrolled = course?.schedule?.enrolled || 0;
            const capacity = course?.schedule?.capacity || 0;
            if (!capacity) return sum;
            return sum + enrolled / capacity;
          }, 0) / totalCourses * 100
        );
  return {
    university: catalog.university || "UH Maui College",
    semester: catalog.semester || "Spring 2026",
    totalCourses,
    totalDepartments,
    avgEnrollment,
  };
}

module.exports = {
  getWeather,
  getJoke,
  getChuckNorris,
  getCourseStats,
};
