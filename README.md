<<<<<<< HEAD
# Term Project

This project contains the Mongoose property schema and a seed script for Maui properties.

## Structure
- `models/` — Mongoose schemas
- `seed.js` — Seed script for MongoDB
- `.gitignore` — Excludes sensitive files like `.env`

## Setup
1. Copy your `.env` file (with MongoDB URI) here, but do NOT commit it.
2. Run `npm install` to install dependencies.
3. Run `node seed.js` to seed the database.
=======
# ICS 385 Spring 2026

This is the main page for Course ICS 385 Spring 2026

## Week 1 - Introduction
  - AI
  - Setup Tools

## Week 2 - HTML and CSS
  - Bio Page 

## Week 3 - JavaScript
  - Dicee Challenge
  - Simon Game Challenge

## Week 4 - NodeJS
  - Hello
  - Hero
  - QRCode

## Week 5 - ExpressJS
  - My-Express-Server
  - BMI Calculator
  - Secrets Project
=======
# ICS385-coraliam-dev-bio
The Minimalist Coder: 50% coffee, 50% code. Just a human trying to compile a life story. 
# ICS 385: Web Development - Spring 2026
This repository contains my coursework and projects for ICS 385.

## Week 1: Setup and Introduction
* Completed environment configuration.

## Week 2: HTML & CSS - Professional Bio

- *Key Files:* [bio.html](./week2/hw/bio.html), [styles.css](./week2/hw/styles.css)

## 🛠️ Tech Stack
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

## Week 3 - JavaScript

### Dicee Challenge - 3-Player Dice Game 🎲

**Files:**
- [dicee.html](./week3/dicee/dicee.html) - Game structure
- [index.js](./week3/dicee/index.js) - Game logic and winner detection
- [styles.css](./week3/dicee/styles.css) - Casino theme and animations

=======
**How to Play:**
1. Click "ROLL DICE" to roll all three dice
2. Highest number wins! 🎉
3. If multiple players tie at the highest number, NO ONE wins that round
4. Click "Play Again!" to try again

)
### Simon Game - Memory Challenge 🎮

**Files:**
- [simon.html](./week3/simon/simon.html) - Game structure
- [game.js](./week3/simon/game.js) - Game logic and sequence handler
- [styles.css](./week3/simon/styles.css) - Colorful button styling and animations
=======

**How to Play:**
1. Click "Start" to begin the game
2. Watch and listen to the color sequence
3. Repeat the sequence by clicking the colored buttons in order
4. Each round adds a new color to the sequence
5. Try to get the highest level possible! 🌟

## Overview# Week 4 Hero HW4 Project
This Node.js project generates and saves a random hero, villain, inspirational quote, popular movie quote, and famous last words to five individual text files. It uses five different npm packages to accomplish this:

- `superheroes`: Generates a random superhero name
- `supervillains`: Generates a random supervillain name
- `inspirational-quotes`: Provides a random inspirational quote
- `popular-movie-quotes`: Provides a random popular movie quote
- `famous-last-words`: Provides a famous last words quote

## File Structure
```
hero-hw4/
  hero.js                 # Main code file
  package.json            # Project dependencies
  hero.txt                # Random hero name
  villain.txt             # Random villain name
  inspiration-quote.txt   # Random inspirational quote
  popular-movie-quotes.txt# Random movie quote
  famous-last-words.txt   # Famous last words quote
  ReadMe.md               # Project overview and instructions
  node_modules/           # Installed npm packages
```

  # qrcode (ICS 385 Week 4 / Assignment 4b)
  ## Overview
  This project generates QR codes from user input (URL or text) using Node.js and saves them as PNG images. It demonstrates using npm packages to create QR codes and includes sample outputs and instructions.

  ### Bitly QR Code Preview
  <img src="./week4/qrcode/BitlyQRcode.png" alt="Bitly QR Code" width="200" />

  ## Setup
  Navigate to the qrcode folder and run:
  ```
  npm install
  ```
  # Term Project

  This project contains the Mongoose property schema and a seed script for Maui properties.

  ## Structure
  - `models/` — Mongoose schemas
  - `seed.js` — Seed script for MongoDB
  - `.gitignore` — Excludes sensitive files like `.env`

  ## Setup
  1. Copy your `.env` file (with MongoDB URI) here, but do NOT commit it.
  2. Run `npm install` to install dependencies.
  3. Run `node seed.js` to seed the database.
### Overview
Week 5 is about ExpressJS, which allows websites to display various web pages based on the URL. While we have worked on VS Code and GitHub for the past few weeks, we will learn about the online IDE - CodeSandbox.io.

- [ExpressJS Project on CodeSandbox](https://codesandbox.io/p/devbox/week5-my-express-server-forked-hxhxvz)
>>>>>>> a1b1970b65d619aec3d146eb5b71d638becc25fc
>>>>>>>


# Week 6 To-Do List Project

## Overview
This assignment for ICS385 Week 6 is about creating a web app with multiple to-do lists. You will build a Node.js and Express application that lets users manage separate lists for chores, camping, work, and general tasks. The project helps you practice routing, templating with EJS, and basic web development skills.

Welcome! This project is for ICS385 Week 6. It lets you keep separate to-do lists for chores, camping, work, and a main list.

## What’s Inside?
- Four to-do lists: Main, Work, Chores, Camping
- Easy navigation between lists
- Add your own items to any list

## How to Start
1. Open your terminal and go to the project folder:
   - cd "week 6/todolist-v1"
2. Install the needed packages:
   - npm install
3. Start the app:
   - node index.js
4. Open your web browser and go to:
   - http://localhost:3000/ (Main List)
   - http://localhost:3000/work (Work List)
   - http://localhost:3000/chores (Chores List)
   - http://localhost:3000/camping (Camping List)

## How to Use
- Type a new item in the box and click the + button to add it to the list
- Click the links at the top to switch between lists

# Week 8 - 5.2 JSON Assignment: basic-json

## Overview
This project demonstrates working with JSON data in a web application. It displays a searchable and filterable course catalog using data from a JSON file. The app is designed for ICS 385 Week 8, following all assignment deliverables and testing requirements.

## File Structure
```
week8/basic-json/
├── index.html
├── styles.css
├── course-catalog.js
├── sample-data.json
└── README.md
```

## Features
- Loads and displays a course catalog from sample-data.json
- Search courses by keyword (title, department, instructor, etc.)
- Filter by department and credits
- Responsive design for mobile and desktop
- Handles empty data, invalid JSON, and missing properties gracefully
- Well-commented code with meaningful variable names

## Setup Instructions
1. Clone or download this repository.
2. Navigate to the `week8/basic-json/` folder.
3. Open `index.html` in your web browser (no server required).

## Sample Data
- `sample-data.json` contains at least 8 courses across 3 departments (e.g., ICS, MATH, ENG).
- You can expand this file to test with 50+ courses for performance testing.

## Testing Requirements
- **Valid JSON:** App loads and displays all courses from a properly formatted JSON file.
- **Invalid JSON:** App shows a clear error message if the JSON is malformed.
- **Empty Data:** App displays a friendly message if there are no courses or missing properties.
- **Search Functionality:** Test with various keywords, including edge cases (e.g., partial matches, case sensitivity).
- **Filter Combinations:** Use department and credit filters together to refine results.
- **Data Limits:** App remains responsive with large datasets (50+ courses).
- **Mobile Testing:** Layout adapts for different screen sizes; test on phone/tablet.

## Live Demo
[You can deploy this project to GitHub Pages for a live demo. To do so:
1. Push the `week8/basic-json/` folder to your GitHub repository.
2. In your repo settings, enable GitHub Pages and set the source to the `main` branch and `/week8/basic-json/` folder.
3. Share the provided GitHub Pages URL for grading.](https://coraliam-dev.github.io/ICS385-coraliam-dev-bio/)

---

>>>>>>> f25eaf9c02daed6a0a8641560843d4a1415118cb
