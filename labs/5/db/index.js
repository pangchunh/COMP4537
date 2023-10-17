require('dotenv').config()
const { Pool } = require('pg')


const pool = new Pool({
  connectionString:process.env.DATABASE_URL_ADMIN,
})


const user_pool = new Pool({
  connectionString:process.env.DATABASE_URL_APP_USER,
})

const createTable = async (text, params) => {
  return await pool.query(text, params)
}

const query = async (text, params) => {
  const start = Date.now()
  const res = await pool.query(text, params)
  const duration = Date.now() - start
  console.log('executed query', { text, duration, rows: res.rowCount })
  return res
}

module.exports = {createTable, query}

