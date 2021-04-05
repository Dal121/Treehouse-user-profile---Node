// Problem: Need a simple way to look at a users badge count and JS points from a webbrowser
//Solution: use node.js to perform profile lookup and serve templates via HTTP

var router = require('./router.js');

// Create a web server - can delete hostname and ref to it
const http = require('http');

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {
  router.home(req, res);
  router.user(req, res); 
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


