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

//testing db functionaliy
async function readDb(){
  const result = await db.query(`SELECT * FROM patient`)
  console.log(result.rows[0])
}

const testQuery = `SELECT * FROM patient`


async function testOtherOps(){
  try{
    const result = await db.query(`DELETE FROM patient WHERE patientid = 1`)
  } catch (e){
    console.log(`db error ${e}`)
  }
}

async function executeQuery(query){
  try{
    const result = await db.query(query)
    console.log(result.rows)
    return result.rows

  }catch(err){
    return err
  }
}



const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (parsedUrl.pathname === '/query'){
    console.log('query received')
    let reqBody = ""
    req.on('data', (chunk) => {
      reqBody += chunk
    })
    try{
      const postBody = JSON.parse(reqBody)

      const result = executeQuery(postBody)
    }catch(err){
      console.log(err)

    }


  }else if (parsedUrl.pathname === '/insert'){
    console.log('insert route being called')
    let reqBody = ""
    req.on('data', (chunk) => {
      reqBody += chunk
    })
    try{
      req.on('end', async () => {
        res.setHeader('Content-Type', 'application/json')
        const postBody = JSON.parse(reqBody)
        const result = await executeQuery(postBody)
        res.statusCode = 200
        res.end(JSON.stringify({result}))
      })

      
    }catch(err){
      console.log(err)
      res.statusCode = 500
      res.end(JSON.stringify({err}))

    }

  }else if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end()
  }

})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server listening on ${PORT}`))


