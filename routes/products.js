const express = require('express');
const productsRepo = require('../repositories/products');
const categoriesRepo = require('../repositories/categories');
const productsIndexTemplate = require('../views/products/index');

const router = express.Router();

router.get('/', async (req, res) => {
	const products = await productsRepo.getAll();
	const categories = await categoriesRepo.getAll();
	res.send(productsIndexTemplate({ categories, products }));
});

module.exports = router;
