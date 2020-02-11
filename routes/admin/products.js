const express = require('express');
const multer = require('multer');

const { handleErrors, requireAuth } = require('./middlewares');
const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
const productsIndexTemplate = require('../../views/admin/products/index');
const productsEditTemplate = require('../../views/admin/products/edit');
const { requireTitle, requirePrice } = require('./validators');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/admin/products', requireAuth, async (req, res) => {
	const products = await productsRepo.getAll();
	res.send(productsIndexTemplate({ products }));
});

router.get('/admin/products/new', requireAuth, (req, res) => {
	res.send(productsNewTemplate({}));
});

router.post('/admin/products/new', requireAuth, upload.single('image'), async (req, res) => {
	const image = req.file.buffer.toString('base64');
	const {
		title,
		userPrice,
		DeviceName,
		Brand,
		technology,
		gprs,
		edge,
		announced,
		status,
		dimensions,
		weight,
		sim,
		type,
		size,
		resolution,
		card_slot,
		alert_types,
		loudspeaker,
		wlan,
		bluetooth,
		gps,
		radio,
		usb,
		messaging,
		browser,
		java,
		features_c,
		battery_c,
		stand_by,
		talk_time,
		colors,
		sar_us,
		sar_eu,
		sensors,
		cpu,
		internal,
		os,
		primary_,
		video,
		secondary,
		speed,
		music_play,
		protection,
		gpu,
		multitouch,
		audio_quality,
		_2g_bands,
		_3_5mm_jack_,
		_3g_bands
	} = req.body;
	await productsRepo.create({
		title,
		userPrice,
		DeviceName,
		Brand,
		technology,
		gprs,
		edge,
		announced,
		status,
		dimensions,
		weight,
		sim,
		type,
		size,
		resolution,
		card_slot,
		alert_types,
		loudspeaker,
		wlan,
		bluetooth,
		gps,
		radio,
		usb,
		messaging,
		browser,
		java,
		features_c,
		battery_c,
		stand_by,
		talk_time,
		colors,
		sar_us,
		sar_eu,
		sensors,
		cpu,
		internal,
		os,
		primary_,
		video,
		secondary,
		speed,
		music_play,
		protection,
		gpu,
		multitouch,
		audio_quality,
		_2g_bands,
		_3_5mm_jack_,
		_3g_bands,
		image
	});
	res.redirect('/admin/products');
});

router.get('/admin/products/:id/edit', requireAuth, async (req, res) => {
	const product = await productsRepo.getOne(req.params.id);
	if (!product) {
		return res.send('Product not found');
	}

	res.send(productsEditTemplate({ product }));
});

router.post(
	'/admin/products/:id/edit',
	requireAuth,
	upload.single('image'),
	[ requireTitle, requirePrice ],
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
module.exports = router;
