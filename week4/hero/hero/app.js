const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');

  const fs = require("fs");
  fs.appendFileSync("file2.txt", " More Hello World!");

  // Use asynchronous append to prevent blocking the event loop
  fs.appendFile("file2.txt", " More Hello World!", (err) => {
    if (err) console.error("Error appending to file:", err);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
