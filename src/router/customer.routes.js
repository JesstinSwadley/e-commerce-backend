const express = require("express");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");
const router = express.Router();

const customer = require("../models/customer.model");

// Routes
router.post("/register", async (req, res) => {
	const saltRounds = 10;

	let hashPassword = await bcrypt.hash(req.body.password, saltRounds);
	let email = req.body.email;
	let preferred_name = req.body.preferred_name;
	let id = nanoid(10);

	let customerData = {
		id,
		email,
		preferred_name,
		password: hashPassword,
	};

	try {
		await customer.register(customerData); // Register customer

		let token = await jwt.sign(
			{ customer_id: id, email }, 
			{ preferred_name, email },
			{ expiresIn: "1h" }
		);

		res.status(201).send(token);
	} catch (err) {
		console.log(err);
	}
});

router.post("/login", async (req, res) => {
	console.log("Received data:", req.body);
	let customerData = {
		email: req.body.email,
		password: req.body.password,
	};

	try {
		let customers = await customer.login(customerData);
		console.log("Customer module:", customer);
		if (customers.length === 0) {
			return res.status(404).send("Incorrect Email or Password");
		}

		let foundCustomer = customers[0];
		let checkPass = await bcrypt.compare(
			customerData.password,
			foundCustomer.password
		);

		if (!checkPass) {
			return res.status(401).send("Incorrect Email or Password");
		}

		let token = await jwt.sign(
			{ customer_id: foundCustomer.id, email: foundCustomer.email },
			{ preferred_name: foundCustomer.preferred_name, email: foundCustomer.email },
			{ expiresIn: "1h" }
		);

		res.send(token);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
});

module.exports = router;
