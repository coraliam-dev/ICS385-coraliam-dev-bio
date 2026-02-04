# Hero HW4 Project

## Overview
This Node.js project demonstrates the use of five different npm packages to generate and display:
- A random superhero name
- A random supervillain name
- An inspirational quote
- A popular movie quote
- Famous last words

Each item is saved to its own text file. The project also starts a simple web server that displays all the generated content.

## File Structure
- `index.js` - Main code file that generates the content, saves to files, and starts the web server
- `hero.txt` - Contains the random superhero name
- `villain.txt` - Contains the random supervillain name
- `inspiration.txt` - Contains the inspirational quote
- `movie-quote.txt` - Contains the popular movie quote
- `last-words.txt` - Contains the famous last words
- `package.json` - Project dependencies and metadata
- Other files: `file2.txt`, `filecopy.js`, `helloworld.js`, `starter.js` (not used in the main logic)

## How to Run
1. Install dependencies:
   ```
   npm install
   ```
2. Run the main program:
   ```
   node index.js
   ```
3. Open your browser and go to `http://127.0.0.1:3000` to see the output.

## Changes Made
- Installed and used five npm packages: `superheroes`, `supervillains`, `inspiration`, `popular-movie-quotes`, and `famous-last-words`.
- Generated a random value from each package and saved each to a separate `.txt` file.
- Updated the web server to display all five values.
- Added beginner-friendly comments to the code for clarity.
