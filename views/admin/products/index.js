const layout = require('../layout');

module.exports = ({ categories, subcategories, products }) => {
	const renderedProducts = products
		.map((product) => {
			const category = categories.find((element) => element.id === product.categoryId);
			let isFeatured = false;
			if (category.featured) {
				isFeatured = category.featured.some((element) => element.productId === product.id);
			}

			const subcategory = subcategories.find((element) => element.id === product.subcategoryId);
			return `
      <tr>
        <td>${product.title}</td>
        <td>${product.userPrice}</td>
        <td>${category ? category.categoryName : ''}</td>
        <td>${subcategory ? subcategory.subCategoryName : ''}</td>
        <td>
          <a href="/admin/products/${product.id}/view">
            <button class="button is-link">
              View
            </button>
          </a>
        </td>
        <td>
        <a href="/admin/products/${product.id}/edit">
          <button class="button is-link">
            Edit
          </button>
        </a>
      </td>
        <td>
        <form method="POST" action="/admin/products/${product.id}/delete">
          <button class="button is-danger">
            Delete
          </button>
        </form>
        </td>
        <td>
        <form method="POST" action="/admin/products/${product.id}/${isFeatured ? 'deletefeatured' : 'addfeatured'}">
          <button class="button ${isFeatured ? 'is-danger' : 'is-link'}">
            ${isFeatured ? 'Delete' : 'Add'}
          </button>
        </form>
        </td>
      </tr>
    `;
		})
		.join('');

	return layout({
		content: `
      <div class="control">
        <h1 class="subtitle">Products</h1>  
        <a href="/admin/products/new" class="button is-primary">New Product</a>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>View</th>
            <th>Edit Product</th>
            <th>Delete Product</th>
            <th>Add/Remove from Featured</th>
          </tr>
        </thead>
        <tbody>
          ${renderedProducts}
        </tbody>
      </table>
    `
	});
};
