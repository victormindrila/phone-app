const layout = require('../layout');

module.exports = ({ categories, subcategories, product }) => {
	const category = categories.find((element) => element.id === product.categoryId);
	let isFeatured = false;
	if (category.featured) {
		isFeatured = category.featured.some((element) => element.productId === product.id);
	}
	const subcategory = subcategories.find((element) => element.id === product.subcategoryId);
	const topFeatures = product.topFeatures;
	const renderedFeaturesArr = [];
	for (let feature in product) {
		let row;
		let isTopFeature;
		if (topFeatures) {
			isTopFeature = topFeatures.some((item) => item === feature);
		} else {
			isTopFeature = false;
		}

		if (feature !== 'image') {
			row = `
            <tr>
              <td>${feature}</td>
              <td>${product[feature]}</td>
              <td>
              <form method="POST" action="/admin/products/${product.id}/view/${isTopFeature
				? 'delete-from-top-features'
				: 'add-to-top-features'}">
              <input type="text" name="feature" value="${feature}" hidden>
              <button class="button ${isTopFeature ? 'is-danger' : 'is-link'}">
                ${isTopFeature ? 'Exclude' : 'Add'}
              </button>
              </form>
              </td>
            </tr>
            `;
		}
		renderedFeaturesArr.push(row);
	}

	return layout({
		content: `
      <div class="control">
        <h1 class="subtitle">${product.title}</h1>  
        <a href="/admin/products/" class="button is-primary">All products</a>
      </div>
      
      <div>
      <span>Category:</span>
      <span>${category.categoryName}</span>
      <br>
      <span>Subcategory:</span>
      <span>${subcategory.subCategoryName}</span>
      <br>
      <span> Is Featured: </span>
      <span>${isFeatured ? 'Yes' : 'No'}
      </div>
      <img src="data:image/png;base64, ${product.image}" />
      <table class="table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Value</th>
            <th>Add/Remove to top feature</th>
          </tr>
        </thead>
        <tbody>
          ${renderedFeaturesArr.join('\n')}
        </tbody>
      </table>
    `
	});
};
