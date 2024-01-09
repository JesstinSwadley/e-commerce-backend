const express = require("express");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");
const router = express.Router();

const admin = require("../models/admin.model");

// Routes
router.post("/register", async (req, res) => {
	const saltRounds = 10;

	let hashPassword = await bcrypt.hash(req.body.password, saltRounds);
	let email = req.body.email;
	let preferred_name = req.body.preferred_name;
	let id = nanoid(10);

	let adminData = {
		id,
		email,
		preferred_name,
		password: hashPassword,
	};

	try {
		await admin.register(adminData); // Register admin

		let token = await jwt.sign(
			{ user_id: id, email, preferred_name }, 
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
	let adminData = {
		email: req.body.email,
		password: req.body.password,
	};

	try {
		let admins = await admin.login(adminData);
		console.log("Admin module:", admin);
		if (admins.length === 0) {
			return res.status(404).send("Incorrect Email or Password");
		}

		let foundAdmin = admins[0];
		let checkPass = await bcrypt.compare(
			adminData.password,
			foundAdmin.password
		);

		if (!checkPass) {
			return res.status(401).send("Incorrect Email or Password");
		}

		let token = await jwt.sign(
			{ user_id: foundAdmin.id, email: foundAdmin.email },
			{ preferred_name: foundAdmin.preferred_name, email: foundAdmin.email },
			{ expiresIn: "1h" }
		);

		res.send(token);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
});

module.exports = router;
