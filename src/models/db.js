require("dotenv").config();
const mysql = require("mysql2");

const db = mysql
	.createConnection({
		host: process.env.HOST,
		user: process.env.DB_USER, // USER is declared & doesn't work on MacOS
		password: process.env.PASSWORD,
		multipleStatements: true,
	})
	.promise();

let databaseQuery = "CREATE DATABASE IF NOT EXISTS ecom_db; USE ecom_db;";

let adminsTableQuery = `CREATE TABLE IF NOT EXISTS admins (
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	id VARCHAR(36) NOT NULL PRIMARY KEY
)`;

let productsTableQuery = `CREATE TABLE IF NOT EXISTS products (
	productName VARCHAR(255) NOT NULL,
	price DECIMAL(13,2) NOT NULL,
	productImage VARCHAR(2083) NOT NULL,
	id VARCHAR(36) NOT NULL PRIMARY KEY
)`;

let sampleProductsQuery = `REPLACE INTO 
	products (productName, price, productImage, id) 
	VALUES 
	("JX1 Keyboard", 139.99, "https://res.cloudinary.com/dk6nmvwh2/image/upload/v1703366610/proud-ecom/JX1.png", "3y1PCK7XQD"),
	("JM1 Keyboard", 99.99, "https://res.cloudinary.com/dk6nmvwh2/image/upload/v1703366610/proud-ecom/JM1.png", "vl6jbmR5ds"),
	("JS2 Keyboard", 119.99, "https://res.cloudinary.com/dk6nmvwh2/image/upload/v1703366610/proud-ecom/JS2.png", "HPSdHUpoKD"),
	("M4 Mouse", 74.99, "https://res.cloudinary.com/dk6nmvwh2/image/upload/v1703366610/proud-ecom/M4.png", "6UPctQMenn"),
	("S7 Mouse", 79.99, "https://res.cloudinary.com/dk6nmvwh2/image/upload/v1703366610/proud-ecom/S7.png", "-hfbAfB6we")`;

db.query(databaseQuery);

db.query(adminsTableQuery);

db.query(productsTableQuery);

db.query(sampleProductsQuery);

module.exports = db;

