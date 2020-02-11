console.log('Hi there');

const fetchProducts = async ({ fonoapi, token }, device) => {
	let response = await fetch(`${fonoapi}getdevice?device=${device}&token=${token}`);
	let data = await response.json();
	return data;
};

const renderDevice = async (device) => {
	const fetchedProducts = await fetchProducts(window.config, device);
	console.log(fetchedProducts);
};

renderDevice('iphone');
