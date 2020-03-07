const layout = require('../layout');

module.exports = ({ categories, items }) => {
	const totalPrice = items.reduce((prev, item) => {
		return prev + item.quantity * item.product.userPrice;
	}, 0);
	const renderedItems = items
		.map((item) => {
			return `
        <div class="shopping-cart">
          <h3>${item.product.title}</h3>
          <div>
            <div>
              $${item.product.userPrice}  X  ${item.quantity} = 
            </div>
            <div>
              $${item.product.userPrice * item.quantity}
            </div>
            <div>
              <form method="POST" action="/cart/products/delete">
                <input type="hidden" value="${item.id}" name="itemId" />
                <button>                  
                  <span>
                    <i class="fas fa-times"></i>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      `;
		})
		.join('');
	const renderedCategories = categories
		.map((category) => {
			return `
      <li><a href="">${category.categoryName} <i class="fas fa-caret-down"></i></a></li>
    `;
		})
		.join('');
	return layout({
		renderedCategories,
		content: `
      <div id="cart">
        <div>
          <div>
            <h3><b>Shopping Cart</b></h3>
            <div>
              ${renderedItems}
            </div>
            <div>
              <div>
                Total
              </div>
              <h1>$${totalPrice}</h1>
              <button>Buy</button>
            </div>
          </div>
        </div>
      </div>
    `
	});
};
