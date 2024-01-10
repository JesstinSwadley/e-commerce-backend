const express = require('express');
const { nanoid } = require('nanoid');
const router = express.Router();

const order = require('../models/order.model');

// Routes
router.post("/create", async (req, res) => {
	let product_id = req.body.product_id;
	let customer_id = req.body.customer_id;
	let id = nanoid(10);

	let orderData = {
		product_id,
		customer_id,
		id
	}

	try {
		let orders = await order.create(orderData);

		res.send(orders);
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;