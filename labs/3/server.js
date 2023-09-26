const http = require('http')
const url = require('url')
const util = require('./modules/util')

const server = http.createServer((req, res) => {
  const q = url.parse(req.url, true)

  if (req.url.startsWith('/getDate/')) {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    const name = q.query.name ? q.query.name : 'empty'
    res.write(`Hello ${name}, What a beautiful day. Server current date and time is ${util.date()}`)
  } else if (req.url.startsWith('/writeFile')) {
    if (!q.query.text) {
      res.writeHead(404, { 'Content-Type': 'text' })
      res.write('Please specify text content')
    } else {
      util.appendFile(q.query.text)
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(`Successfully appended ${q.query.text} to file.txt`)
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' })
    res.write(`Error 404 not found`)
  }
})

const PORT = process.env.PORT || 8001
server.listen(PORT, () => console.log(`Server listening on ${PORT}`))
