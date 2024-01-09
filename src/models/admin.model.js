const db = require('./db');

const Admin = function(adminData) {
	this.email = adminData.email,
	this.password = adminData.password,
	this.preferred_name = adminData.preferred_name,
	this.id = adminData.id
}

Admin.register = async (newAdmin) => {
	let adminQuery = `INSERT INTO admins (email, password, preferred_name, id) VALUES (?, ?, ?, ?)`
	
	let [result] = await db.query(adminQuery, [newAdmin.email, newAdmin.password, newAdmin.preferred_name, newAdmin.id]);

	return result
}

Admin.login = async (adminData) => {
	let adminEmail = adminData.email

	let adminQuery = `SELECT * FROM admins WHERE email="${adminEmail}"`

	let [result] = await db.query(adminQuery);

	return result
}

module.exports = Admin;