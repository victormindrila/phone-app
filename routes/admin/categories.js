const express = require('express');

const { handleErrors, requireAuth } = require('./middlewares');

//repos
const categoriesRepo = require('../../repositories/categories');
const subCategoriesRepo = require('../../repositories/subcategories');

// templates
const newCategoryTemplate = require('../../views/admin/categories/new');
const categoriesTemplate = require('../../views/admin/categories/index');
const viewCategoryTemplate = require('../../views/admin/categories/view');
const { requireTitle, requirePrice } = require('./validators');

const router = express.Router();

router.get('/admin/categories', requireAuth, async (req, res) => {
	const categories = await categoriesRepo.getAll();
	res.send(categoriesTemplate({ categories }));
});

router.get('/admin/new-category', requireAuth, async (req, res) => {
	const categories = await categoriesRepo.getAll();
	res.send(newCategoryTemplate({ categories }));
});

router.post('/admin/new-category', requireAuth, async (req, res) => {
	let categories = await categoriesRepo.getAll();
	const { categoryName } = req.body;
	await categoriesRepo.create({ categoryName });
	categories = await categoriesRepo.getAll();
	res.send(newCategoryTemplate({ categories }));
});

router.post('/admin/new-sub-category', requireAuth, async (req, res) => {
	const { subCategoryName, categoryId } = req.body;
	await subCategoriesRepo.create({ subCategoryName, categoryId });

	const categories = await categoriesRepo.getAll();
	res.send(newCategoryTemplate({ categories }));
});

router.get('/admin/categories/:id/view', async (req, res) => {
	const categoryId = req.params.id;
	const allSubcategories = await subCategoriesRepo.getAll();
	const subcategories = allSubcategories.filter((subCat) => subCat.categoryId === categoryId);
	res.send(viewCategoryTemplate({ subcategories }));
});

router.get('/admin/categories/:id/edit', requireAuth, async (req, res) => {
	res.send('to be developed');
});

router.post('/admin/categories/:id/edit', requireAuth, async (req, res) => {
	res.send('to be developed');
});

router.post('/admin/categories/:id/delete', requireAuth, async (req, res) => {
	await categoriesRepo.delete(req.params.id);
	res.redirect('/admin/categories');
});

module.exports = router;
