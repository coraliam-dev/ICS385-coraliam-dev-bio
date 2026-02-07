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
  ![Bitly QR Code](./week4/qrcode/BitlyQRcode.png)

  ## Setup
  Navigate to the qrcode folder and run:
  ```
  npm install
  ```
  ## How to Run
  Run the main file:
  ```
  node index.js
  ```
  Or use:
  ```
  node solution.js
  ```

  ## New Features Added (Design)
  1) Accepts user input for URL or text and generates a QR code image.
  2) Supports multiple output formats (PNG, text file).
  3) Includes sample QR codes for YouTube and Bitly links.
  4) Modular code structure for easy extension.

  ## Testing
  - Test 1: Entered "https://youtube.com" as input
    Expected: QR code PNG generated for YouTube URL
    Actual: qr_youtube_com.png created successfully
  - Test 2: Entered "https://bitly.com" as input
    Expected: QR code PNG generated for Bitly URL
    Actual: BitlyQRcode.png created successfully
  - Test 3: Entered custom text
    Expected: QR code PNG generated for text
    Actual: qr_img.png created successfully

  ICS 385 Week 4 Study Guide • Page 6

  ## AI Attribution
  - Tool(s) used: GitHub Copilot, ChatGPT
  - Files/sections generated or modified by AI: index.js, solution.js, ReadMe.md, package.json
  - What I personally changed/verified: Tested all code, verified output images, updated instructions and comments

  ## Reflection (Manager Notes)
  - What my manager requested: Build a QR code generator using Node.js, accept user input, and save QR codes as images
  - What I learned: How to use npm packages for QR code generation, modularize Node.js code, and handle file outputs
  - Next improvements I would make: Add web interface, support more image formats, improve error handling, automate tests
