const express = require('express');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const jwt = require('jsonwebtoken');
const router = express.Router();

const admin = require('../models/admin.model');

// Routes
router.post('/register', async (req, res) => {
	const saltRounds = 10;

	let hashPassword = await bcrypt.hash(req.body.password, saltRounds);
	let email = req.body.email;
	let id = nanoid(10);

	let adminData = {
		id,
		email,
		password: hashPassword
	}

	try {
		await admin.register(adminData);

		let token = await jwt.sign({user_id: id, email}, 'test', { expiresIn: '1h' });

		res.status(201).send(token);
	} catch (err) {
		console.log(err);
	}
});

router.post('/login', async (req, res) => {
	let adminData = {
		email: req.body.email,
		password: req.body.password
	}

	try {
		let admins = await admin.login(adminData);

		let checkPass = await bcrypt.compare(adminData.password, admins[0].password);

		if (checkPass == false) {
			return res.send("Incorrect Email or Password");
		}

		let token = await jwt.sign({user_id: id, email}, 'test', { expiresIn: '1h' });

		res.send(token);
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;