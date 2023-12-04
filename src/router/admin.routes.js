const express = require('express');
const router = express.Router();

const admin = require('../models/admin.model');

// Routes
router.post('/register', async (req, res) => {
	let adminData = {
		id: Math.random(),
		email: req.body.email,
		password: req.body.password
	}

	try {
		let admins = await admin.register(adminData);
		console.log(admins);
	} catch (err) {
		console.log(err)
	}
});

router.post('/login', async (req, res) => {
	let adminData = {
		email: req.body.email,
		password: req.body.password
	}

	try {
		let admins = await admin.login(adminData);
		console.log(admins);
	} catch (err) {
		console.log(err)
	}
});

module.exports = router;