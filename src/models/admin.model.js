const db = require('./db');

const Admin = function(adminData) {
	this.email = adminData.email,
	this.password = adminData.password,
	this.id = adminData.id
}

Admin.register = (newAdmin, results) => {
	let adminQuery = `INSERT INTO admins (email, password, id) VALUES (?, ?, ?)`
	
	db.query(adminQuery, [newAdmin.email, newAdmin.password, newAdmin.id], (err, res) => {
		if(err) {
			results(err, null);
			return
		}

		results(null, res);
	});
}

Admin.login = () => {

}

module.exports = Admin;