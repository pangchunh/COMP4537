require('dotenv').config()
const { Pool } = require('pg')



const pool = new Pool({
  connectionString:process.env.DATABASE_URL_ADMIN,
  ssl: {
    rejectUnauthorized: false
  },
})

const user_pool = new Pool({
  connectionString:process.env.DATABASE_URL_APP_USER,
  ssl: {
    rejectUnauthorized: false
  },
})

const createTable = async (text, params) => {
  return await pool.query(text, params)

}


const query = async (text, params) => {
  return await user_pool.query(text, params)
}

module.exports = {createTable, query}

