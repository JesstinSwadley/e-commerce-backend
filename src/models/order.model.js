const db = require('./db');

const Order = function(orderData) {
	this.product_id = orderData.product_id,
	this.customer_id = orderData.customer_id,
	this.id = orderData.id
}

Order.create = async (newOrder) => {
	let orderQuery = `INSERT INTO orders (product_id, customer_id, id) VALUES (?, ?, ?)`

	let [result] = await db.query(orderQuery, [newOrder.product_id, newOrder.customer_id, newOrder.id]);

	return result
}

module.exports = Order;