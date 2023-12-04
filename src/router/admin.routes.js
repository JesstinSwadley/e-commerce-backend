const express = require('express');
const router = express.Router();

const admin = require('../models/admin.model');

// Routes
router.post('/register', (req, res) => {
	let adminData = {
		id: Math.random(),
		email: req.body.email,
		password: req.body.password
	}

	admin.register(adminData, (err, result) => {
		if(err) {
			res.status(409).send("Failed Registration");
			return
		}

		res.status(201).send(result);
	});	
});

router.post('/login', (req, res) => {
	res.send("Login Admin");
});

module.exports = router;