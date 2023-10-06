const http = require('http');
const url = require('url');
const cors = require('cors'); // Import the 'cors' package

const dictionary = []; // Array to store word:definition entries

const server = http.createServer((req, res) => {
  // Enable CORS for all routes
  // cors()(req, res, () => {});

  const parsedUrl = url.parse(req.url, true);
  if (req.method === 'GET' && parsedUrl.pathname === '/api/definitions') {
    const word = parsedUrl.query.word;
    const entry = dictionary.find((item) => item.word === word);
    // res.writeHead(200, {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"});
    if (entry) {
      res.setHeader('Content-Type', 'application/json', "Access-Control-Allow-Origin", "*" );
      res.end(JSON.stringify(entry));
    } else {
      res.statusCode = 404;
      res.end(`Request # ${dictionary.length + 1}, word '${word}' not found!`);
    }
  } else if (req.method === 'POST' && parsedUrl.pathname === '/api/definitions') {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      const postData = JSON.parse(data);

      if (postData.word && postData.definition) {
        const existingEntry = dictionary.find((item) => item.word === postData.word);
        if (existingEntry) {
          res.statusCode = 400;
          res.end(`Warning! '${postData.word}' already exists.`);
        } else {
          dictionary.push({ word: postData.word, definition: postData.definition });
          res.setHeader("Access-Control-Allow-Origin", "*" )
          res.statusCode = 201;
          res.end(`Request # ${dictionary.length}, New entry recorded:\n${JSON.stringify(postData)}`);
        }
      } else {
        res.statusCode = 400;
        res.end('Bad Request: Both word and definition are required.');
      }
    });
  } else {
    console.log(parsedUrl.pathname)
    res.statusCode = 404;
    res.end('Not Found');
  }
});

const port = 3000; // Change this to your desired port
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
