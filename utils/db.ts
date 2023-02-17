import * as pg from 'pg';

const db = new pg.Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false
	}
})

if (db == null) {
	console.error("Could not connect to database")
	process.exit(1)
} else {
	console.log("Successfully connected to database")
}

export {
	db
}