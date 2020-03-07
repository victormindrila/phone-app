const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ categories, subcategories, product, errors }) => {
	const renderedItems = [];
	for (let prop in product) {
		let renderedItem;
		if (prop === 'image') {
			renderedItem = `
      <figure class="product-image">
        <label class="label">${prop}</label>
				<img src="data:image/png;base64, ${product.image}" />
      </figure>
      `;
			renderedItems.push(renderedItem);
		} else {
			renderedItem = `
    <div class="field">
      <label class="label">${prop}</label>
      <input value="${product[prop]}" class="input" placeholder="${prop}" name="${prop}">
    </div>
    
    `;
			renderedItems.push(renderedItem);
		}
	}

	const renderedCategories = categories
		.map((category) => {
			return `
    <option value="${category.id}">${category.categoryName}</option>
  `;
		})
		.join('');

	const renderedSubcategories = subcategories
		.map((category) => {
			return `
    <option value="${category.id}">${category.subCategoryName}</option>
  `;
		})
		.join('');

	return layout({
		content: `
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="subtitle">Edit Product</h1>

          <form method="POST" enctype="multipart/form-data">
            ${renderedItems.join('\n')}
            <select name="categoryId">
            ${renderedCategories}
            </select>
            <select name="subcategoryId">
            ${renderedSubcategories}
            </select>
            <div class="field">
              <label class="label">Change Image</label>            
              <input type="file" name="image" />
            </div>
            <br />
            <button class="button is-primary">Update</button>
          </form>
        </div>
      </div>
    `
	});
};
