const express = require("express");
const cors = require("cors");
const app = express();

// CORS Configuration
app.use(cors());

// Express Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

// Router
const adminRoutes = require("./router/admin.routes");
const productRoutes = require("./router/product.routes");

// Routes
app.use("/admin", adminRoutes);
app.use("/products", productRoutes);

// Error Handling
app.listen(PORT, () => {
	console.log(`Server is on Port ${PORT}`);
});
