const express = require('express');
const router = express.Router();

// Routes
router.post('/register', (req, res) => {
	res.send("Register Admin");
});

router.post('/login', (req, res) => {
	res.send("Login Admin");
});

module.exports = router;