const db = require('../db/index')
const http = require('http')

const createTableScript = `CREATE TABLE IF NOT EXISTS patient (
  patientid SERIAL PRIMARY KEY,
  name varchar(100),
  dateOfBirth date)`


db.createTable(createTableScript)

//testing db functionality
async function readDb(){
  const result = await db.query(`SELECT * FROM patient`)
  console.log(result.rows[0])
}


const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (parsedUrl.parsedUrl === '/query'){

  }

})

readDb()


