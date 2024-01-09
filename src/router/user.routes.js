const express = require("express");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");
const router = express.Router();

const user = require("../models/user.model");

// Routes
router.post("/register", async (req, res) => {
	const saltRounds = 10;

	let hashPassword = await bcrypt.hash(req.body.password, saltRounds);
	let email = req.body.email;
	let preferred_name = req.body.preferred_name;
	let id = nanoid(10);

	let userData = {
		id,
		email,
		preferred_name,
		password: hashPassword,
	};

	try {
		await user.register(userData); // Register user

		let token = await jwt.sign(
			{ user_id: id, email }, 
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
	let userData = {
		email: req.body.email,
		password: req.body.password,
	};

	try {
		let users = await user.login(userData);
		console.log("User module:", user);
		if (users.length === 0) {
			return res.status(404).send("Incorrect Email or Password");
		}

		let foundUser = users[0];
		let checkPass = await bcrypt.compare(
			userData.password,
			foundUser.password
		);

		if (!checkPass) {
			return res.status(401).send("Incorrect Email or Password");
		}

		let token = await jwt.sign(
			{ user_id: foundUser.id, email: foundUser.email },
			{ preferred_name: foundUser.preferred_name, email: foundUser.email },
			{ expiresIn: "1h" }
		);

		res.send(token);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
});

module.exports = router;
