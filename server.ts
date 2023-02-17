import * as pg from 'pg';
import * as dotenv from 'dotenv'

dotenv.config()

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})

if (db == null){
  console.error("Could not connect to database")
} else {
  db.query("SELECT 1").then(console.table)
}