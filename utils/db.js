"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg = require("pg");
const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
exports.db = db;
if (db == null) {
    console.error("Could not connect to database");
    process.exit(1);
}
else {
    console.log("Successfully connected to database");
}
