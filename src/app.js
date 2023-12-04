const express = require('express');
const app = express();

// Express Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

// Router
const adminRoutes = require('./router/admin.routes');

// Routes
app.use('/admin', adminRoutes);

app.listen(PORT, () => {
	console.log(`Server is on Port ${PORT}`)
});