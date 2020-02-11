const navBar = document.querySelector('.nav-bar');
const main = document.querySelector('main');
const products = document.querySelectorAll('.product');

const sticky = navBar.offsetTop;
window.addEventListener('scroll', (event) => {
	if (window.pageYOffset > sticky) {
		navBar.classList.add('sticky');
		main.classList.add('margin-top');
	} else {
		navBar.classList.remove('sticky');
		main.classList.remove('margin-top');
	}
});

products.forEach((item) => {
	item.addEventListener('mouseover', function(event) {
		const currentProduct = this;
		const footer = currentProduct.querySelector('.product-footer ');
		footer.classList.remove('hidden');
	});
	item.addEventListener('mouseout', function(event) {
		const currentProduct = this;
		const footer = currentProduct.querySelector('.product-footer ');
		footer.classList.add('hidden');
	});
});
