const db = require('../db/index')
const http = require('http')
const url = require('url')
require('dotenv').config()

const createTableScript = `CREATE TABLE IF NOT EXISTS patient (
  patientid SERIAL PRIMARY KEY,
  name varchar(100),
  dateOfBirth date)`

db.createTable(createTableScript)


async function testOtherOps() {
  try {
    return await db.query(`DELETE FROM patient WHERE patientid = 1`)
  } catch (e) {
    console.log(`Should have catch error. db error ${e}`)
  }
}

async function executeQuery(query) {
  try {
    const result = await db.query(query)
    return result.rows

  } catch (err) {
    return err
  }
}



const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (parsedUrl.pathname.startsWith('/query')) {
    res.setHeader('Content-Type', 'application/json')
    if (req.method === 'GET') {
      try {        
        const query = parsedUrl.query.dbquery
        const result = await executeQuery(query)
        res.statusCode = 200
        res.end(JSON.stringify({result}))
      } catch (err) {
        res.end(JSON.stringify({err}))

      }

    } else if (req.method === 'POST') {
      let reqBody = ''
      req.on('data', (chunk) => {
        reqBody += chunk
      })
      req.on('end', async()=>{
        const result = await executeQuery(reqBody)
        res.statusCode = 200
        res.end(JSON.stringify({result}))
      })
    } else{
      res.statusCode = 400
      res.end(JSON.stringify({'error':'Method not accepted.'}))
    }
  } else if (parsedUrl.pathname === '/insert') {
    res.setHeader('Content-Type', 'application/json')
    const query = `INSERT INTO patient(name, dateofbirth)
    VALUES
    ('Sara Brown', '1901-01-01'),
    ('John Smith', '1941-01-01'),
    ('Jack Ma', '1961-01-30'),
    ('Elon Musk', '1999-01-01')
    RETURNING *`
    

    try {
      const result = await executeQuery(query)
      res.statusCode = 200
      res.end(JSON.stringify({ result }))

    } catch (err) {
      console.log(err)
      res.statusCode = 500
      res.end(JSON.stringify({ err }))
    }
  } else if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end()
  }
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server listening on ${PORT}`))


