import { createPool, PoolConnection } from 'mysql2/promise'
let host = process.env.PROD_HOST
let user = process.env.PROD_USER
let pass = process.env.PROD_PASS
let db = process.env.PROD_DB

if (process.env.ENV === 'dev') {
  host = process.env.DEV_HOST
  user = process.env.DEV_USER
  pass = process.env.DEV_PASS
  db = process.env.DEV_DB
}
const pool = createPool({
  host,
  user,
  password: pass,
  database: db,
  connectionLimit: 10,
})

export let con: PoolConnection

export async function establishDatabaseConnection() {
  try {
    const connection: PoolConnection = await pool.getConnection()
    con = connection
    console.log('Database connection established!')
    connection.release()
  } catch (err) {
    console.error(err)
    console.error('Error establishing database connection:', err)
  }
}

const query = pool

export { query }
