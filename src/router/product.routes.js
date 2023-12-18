const express = require('express');
const { nanoid } = require('nanoid');
const router = express.Router();

const product = require('../models/product.model');

router.post('/create', async (req, res) => {
	let productName = req.body.productName
	let price = req.body.price
	let id = nanoid(10);

	let productData = {
		productName,
		price,
		id
	}

	try {
		let products = await product.create(productData);

		res.send(products);
	} catch (err) {
		console.log(err);
	}
});

router.get('/get-all', async (req, res) => {
	try {
		let products = await product.readAll();

		res.send(products);
	} catch (err) {
		console.log(err);
	}
});

router.patch('/update', async (req, res) => {
	try {
		let productData = {
			productName: req.body.productName,
			productPrice: req.body.price,
			productId: req.body.id
		}

		let products = await product.update(productData);

		res.send(products);
	} catch (err) {
		console.log(err);
	}
});

router.delete('/delete', async (req, res) => {
	try {
		let productId = req.body.id
		
		let products = await product.delete(productId);

		res.send(products);
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;