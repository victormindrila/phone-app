const express = require('express');
const multer = require('multer');

const { handleErrors, requireAuth } = require('./middlewares');
const productsRepo = require('../../repositories/products');
const categoriesRepo = require('../../repositories/categories');
const subCategoriesRepo = require('../../repositories/subcategories');
const productsNewTemplate = require('../../views/admin/products/new');
const productsIndexTemplate = require('../../views/admin/products/index');
const productsEditTemplate = require('../../views/admin/products/edit');
const productViewTemplate = require('../../views/admin/products/view');
const { requireTitle, requirePrice } = require('./validators');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/admin/products', requireAuth, async (req, res) => {
	const products = await productsRepo.getAll();
	const categories = await categoriesRepo.getAll();
	const subcategories = await subCategoriesRepo.getAll();
	res.send(productsIndexTemplate({ categories, subcategories, products }));
});

router.get('/admin/products/new', requireAuth, async (req, res) => {
	const categories = await categoriesRepo.getAll();
	const subcategories = await subCategoriesRepo.getAll();
	res.send(productsNewTemplate({ categories, subcategories }));
});

router.post('/admin/products/new', requireAuth, upload.single('image'), async (req, res) => {
	const props = req.body;
	if (req.file.buffer) {
		const image = req.file.buffer.toString('base64');
		props.image = image;
	}

	await productsRepo.create(props);
	res.redirect('/admin/products');
});

router.get('/admin/products/:id/view', requireAuth, async (req, res) => {
	const product = await productsRepo.getOne(req.params.id);
	const categories = await categoriesRepo.getAll();
	const subcategories = await subCategoriesRepo.getAll();
	if (!product) {
		return res.send('Product not found');
	}
	res.send(productViewTemplate({ categories, subcategories, product }));
});

router.post('/admin/products/:id/view/add-to-top-features', requireAuth, async (req, res) => {
	const product = await productsRepo.getOne(req.params.id);
	const topFeatures = product.topFeatures || [];

	if (topFeatures.some((element) => element === req.body.feature)) {
		res.redirect(`/admin/products/${req.params.id}/view`);
	} else {
		topFeatures.push(req.body.feature);
		await productsRepo.update(req.params.id, { topFeatures: topFeatures });
		res.redirect(`/admin/products/${req.params.id}/view`);
	}
});

router.post('/admin/products/:id/view/delete-from-top-features', requireAuth, async (req, res) => {
	const product = await productsRepo.getOne(req.params.id);
	const topFeatures = product.topFeatures;
	const filtered = topFeatures.filter((element) => element !== req.body.feature);
	await productsRepo.update(req.params.id, { topFeatures: filtered });
	res.redirect(`/admin/products/${req.params.id}/view`);
});

router.get('/admin/products/:id/edit', requireAuth, async (req, res) => {
	const product = await productsRepo.getOne(req.params.id);
	const categories = await categoriesRepo.getAll();
	const subcategories = await subCategoriesRepo.getAll();
	if (!product) {
		return res.send('Product not found');
	}

	res.send(productsEditTemplate({ categories, subcategories, product }));
});

router.post(
	'/admin/products/:id/edit',
	requireAuth,
	upload.single('image'),
	handleErrors(productsEditTemplate, async (req) => {
		const product = await productsRepo.getOne(req.params.id);
		return { product };
	}),
	async (req, res) => {
		const changes = req.body;
		if (req.file) {
			changes.image = req.file.buffer.toString('base64');
		}
		try {
			await productsRepo.update(req.params.id, changes);
		} catch (error) {
			return res.send('Could not find item');
		}
		res.redirect('/admin/products');
	}
);

router.post('/admin/products/:id/delete', requireAuth, async (req, res) => {
	await productsRepo.delete(req.params.id);
	res.redirect('/admin/products');
});

router.post('/admin/products/:id/addfeatured', requireAuth, async (req, res) => {
	const product = await productsRepo.getOne(req.params.id);
	const productCategory = product.categoryId;
	const category = await categoriesRepo.getOne(productCategory);
	const featured = category.featured;
	if (!featured) {
		category.featured = [];
	}
	category.featured.push({ productId: req.params.id });
	await categoriesRepo.update(category.id, { featured: category.featured });
	res.redirect('/admin/products');
});

router.post('/admin/products/:id/deletefeatured', requireAuth, async (req, res) => {
	const product = await productsRepo.getOne(req.params.id);
	const productCategory = product.categoryId;
	const category = await categoriesRepo.getOne(productCategory);
	const filteredFeatured = category.featured.filter((element) => element.productId !== req.params.id);
	await categoriesRepo.update(category.id, { featured: filteredFeatured });
	res.redirect('/admin/products');
});

module.exports = router;
