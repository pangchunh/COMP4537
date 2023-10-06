const { assert } = require('console');
const http = require('http')
const url = require('url');

const dictionary = []

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (parsedUrl.pathname === '/api/definitions/') {
    if (req.method === 'GET') {
      const word = parsedUrl.query.word
      const entry = dictionary.find(item => item.word === word)
      if (entry) {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(entry));
      } else {
        res.statusCode = 404;
        res.end(`Request # ${dictionary.length + 1}, word '${word}' not found!`);
      }

    } else if (req.method === 'POST') {
      let reqBody = '';
      req.on('data', (chunk) => {
        reqBody += chunk
      })
      try {
        req.on('end', () => {
          const postBody = JSON.parse(reqBody)
          assert(postBody.word && postBody.definition, 'word and definition must be present in the body')
          const existingEntry = dictionary.find(entry => entry.word === postBody.word)
          if (existingEntry) {
            res.statusCode = 400
            res.end(`Warning!! ${postBody.word} already exist in the dictionary.`)
          } else {
            dictionary.push(postBody)
            res.statusCode = 200
            res.end(`Request #${dictionary.length}: New entry recorded, word: ${postBody.word}, definition: ${postBody.definition}`)
          }
        })
      } catch (e) {
        res.statusCode(400)
        res.end(e)
      }
    } else if (req.method === 'OPTIONS') {
      res.statusCode = 200;
      res.end()
    }
  } else {
    res.statusCode = 404
    res.end('Error: 404 path not found')
  }
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log(`Server listening on ${PORT}`))