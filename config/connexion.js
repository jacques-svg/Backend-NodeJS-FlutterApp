require('dotenv').config();
const mysql2 = require('mysql2')

const db = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

db.connect();
module.exports = db;