const express = require("express");
const cors = require("cors");
const app = express();

// Express Configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

// Router
const adminRoutes = require("./router/admin.routes");
const productRoutes = require("./router/product.routes");
const customerRoutes = require("./router/customer.routes");

// Routes
app.use("/admin", adminRoutes);
app.use("/products", productRoutes);
app.use("/customer", customerRoutes);

app.listen(PORT, () => {
	console.log(`Server is on Port ${PORT}`);
});
