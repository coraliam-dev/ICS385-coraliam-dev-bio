//jshint esversion:6

// Import required Node.js and npm modules
const superheroes = require('superheroes'); // For random superhero names
const supervillains = require('supervillains'); // For random supervillain names
const inspiration = require('inspiration'); // For inspirational quotes
const movieQuotes = require('popular-movie-quotes'); // For popular movie quotes
const lastWords = require('famous-last-words'); // For famous last words
const fs = require('fs'); // For file system operations

// Generate a random superhero name
const mySuperHeroName = superheroes.random();
// Generate a random supervillain name
const mySuperVillainName = supervillains.random();
// Get a random inspirational quote
const myInspiration = inspiration.getQuote();
// Get a random popular movie quote (returns an object with quote and movie)
const myMovieQuote = movieQuotes.getRandomQuote();
// Get a random famous last words quote
const myLastWords = lastWords.random();

// Save each value to its own text file
fs.writeFileSync('hero.txt', mySuperHeroName); // Save hero name
fs.writeFileSync('villain.txt', mySuperVillainName); // Save villain name
fs.writeFileSync('inspiration.txt', myInspiration); // Save inspiration quote
fs.writeFileSync('movie-quote.txt', myMovieQuote.quote + ' - ' + myMovieQuote.movie); // Save movie quote
fs.writeFileSync('last-words.txt', myLastWords); // Save last words

// Set up a simple web server to display all the generated content
const http = require('http'); // Import http module
const hostname = '127.0.0.1'; // Localhost IP
const port = 3000; // Port number

// Create the server
const server = http.createServer((req, res) => {
  res.statusCode = 200; // HTTP status OK
  res.setHeader('Content-Type', 'text/plain'); // Set response type
  // Send all the generated content as the response
  res.end(
    'Super Hero: ' + mySuperHeroName +
    '\nSuper Villain: ' + mySuperVillainName +
    '\nInspiration: ' + myInspiration +
    '\nMovie Quote: ' + myMovieQuote.quote + ' - ' + myMovieQuote.movie +
    '\nFamous Last Words: ' + myLastWords
  );
});

// Start the server and listen on the specified port
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});