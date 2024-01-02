const db = require('./db');

const Product = function(productData) {
	this.productName = productData.productName,
	this.price = productData.price,
	this.id = productData.id
}

Product.create = async (newProduct) => {
	let productQuery = `INSERT INTO products (productName, price, productImage, id) VALUES (?, ?, ?, ?)`;

	let [result] = await db.query(productQuery, [newProduct.productName, newProduct.price, newProduct.productImage, newProduct.id]);

	return result
}

Product.readAll = async () => {
	let productQuery = `SELECT * FROM products`;

	let [results] = await db.query(productQuery);

	console.log(results);

	return results
}

Product.update = async (productData) => {
	let { productName, productPrice, productId } = productData

	let productQuery = `UPDATE products SET productName="${productName}", price =${productPrice} WHERE id="${productId}"`;

	let [ result ] = await db.query(productQuery);

	console.log(result);

	return result
}

Product.delete = async (productId) => {
	let productQuery = `DELETE FROM products WHERE id="${productId}"`;

	let [ result ] = await db.query(productQuery);

	return result
}

module.exports = Product;