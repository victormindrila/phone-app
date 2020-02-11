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
        <div>
          <div class="columns is-centered">
            <img src="/images/banner.jpg" />
          </div>
        </div>
      </section>
      <h2 class="container">FEATURED PRODUCTS</h2>
      <section class=" products">
                  ${renderedProducts}  
      </section>
    `
	});
};
