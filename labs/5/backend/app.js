const { error } = require('console')
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
    console.log(result.rows)
    return result.rows

  } catch (err) {
    return err
  }
}



const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (parsedUrl.pathname.startsWith === '/query') {
    res.setHeader('Content-Type', 'application/json')
    if (req.method === 'GET') {
      try {
        //get the query and execute it
        const query = req.query.dbquery
        const result = await executeQuery(query)


      } catch (err) {

      }


    } else if (req.method === 'POST') {
      let reqBody = ""
      req.on('data', (chunk) => {
        reqBody += chunk
      })
      try {
        const postBody = JSON.parse(reqBody)

        const result = executeQuery(postBody)
      } catch (err) {
        console.log(err)

      }
      //parse body and execute body
    } else {
      //method not allowed.
    }


  } else if (parsedUrl.pathname === '/insert') {
    res.setHeader('Content-Type', 'application/json')
    const query = `INSERT INTO patient(name, dateofbirth)
    values
    ('Sara Brown', '1901-01-01'),
    ('John Smith', '1941-01-01'),
    ('Jack Ma', '1961-01-30'),
    ('Elon Musk', '1999-01-01')`

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


