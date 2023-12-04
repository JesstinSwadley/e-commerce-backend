const mysql = require('mysql2');

const db = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env. PASSWORD,
	multipleStatements: true
}).promise();

let databaseQuery = "CREATE DATABASE IF NOT EXISTS ecommerce_db; USE ecommerce_db;"

let adminsTableQuery = `CREATE TABLE IF NOT EXISTS admins (
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	id VARCHAR(36) NOT NULL PRIMARY KEY
)`

db.query(databaseQuery);

db.query(adminsTableQuery);

module.exports = db;