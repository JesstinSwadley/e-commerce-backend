const db = require('.db');

const User = function(userData) {
	this.email = userData.email,
	this.password = userData.password,
	this.id = userData.id
}

User.register = async (newUser) => {
	let userQuery = `INSERT INTO users (email, password, id) VALUES (?, ?, ?)`
	
	let [result] = await db.query(userQuery, [newUser.email, newUser.password, newUser.id]);

	return result
}

User.login = async (userData) => {
	let userEmail = userData.email

	let userQuery = `SELECT * FROM users WHERE email="${userEmail}"`

	let [result] = await db.query(userQuery);

	return result
}