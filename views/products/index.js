const layout = require('../layout');

module.exports = ({ products }) => {
	const renderedProducts = products
		.map((product) => {
			return `
        <article class="product">
          <div class="product-details">
            <figure class="product-image">
              <img src="data:image/png;base64, ${product.image}"/>
            </figure>
            <div>
              <h2>${product.title}</h2>
              <h2>$${product.userPrice}</h2>
            </div>
            <footer class="product-footer hidden">
              <form action="/cart/products" method="POST">
                <input hidden value="${product.id}" name="productId"/>
                <button class="product-cart-btn">
                  <i class="fa fa-shopping-cart"></i> Add to cart
                </button>
                <button class="product-view-btn">View product</button>
              </form>
            </footer>
          </div>
        </article>
      `;
		})
		.join('\n');
	return layout({
		content: `
    <section class="container">
    <div class="slider">
      <img src="/images/samsung-galaxy-fold-7.jpg" alt="">
      <div class="slider-description one-half">
        <ul>
          <li>Feature 1</li>
          <li>Feature 2</li>
          <li>Feature 3</li>
          <li>Feature 4</li>
          <li>Feature 5</li>
        </ul>
      </div>
    </div>
  </section>
  <div class="container">
    <hr> 
  </div>
      <h2 class="container">FEATURED PRODUCTS</h2>
      <section class="products">
                  ${renderedProducts}  
      </section>
    `
	});
};
