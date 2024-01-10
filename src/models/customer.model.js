const db = require('.db');

const Customer = function(customerData) {
	this.email = customerData.email,
	this.password = customerData.password,
	this.preferred_name = customerData.preferred_name,
	this.id = customerData.id
}

Customer.register = async (newCustomer) => {
	let customerQuery = `INSERT INTO customers (email, password, id) VALUES (?, ?, ?, ?)`
	
	let [result] = await db.query(customerQuery, [newCustomer.email, newCustomer.password, newCustomer.preferred_name, newCustomer.id]);

	return result
}

Customer.login = async (customerData) => {
	let customerEmail = customerData.email

	let customerQuery = `SELECT * FROM customers WHERE email="${customerEmail}"`

	let [result] = await db.query(customerQuery);

	return result
}