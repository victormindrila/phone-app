const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ categories, subcategories, errors }) => {
	const renderedCategories = categories
		.map((category) => {
			return `
      <option value="${category.id}">${category.categoryName}</option>
    `;
		})
		.join('');
	const renderedSubcategories = subcategories
		.map((subcategory) => {
			return `
      <option data-catId="${subcategory.categoryId}" value="${subcategory.id}">${subcategory.subCategoryName}</option>
    `;
		})
		.join('');

	return layout({
		content: `
      <div class="columns is-centered">
        <div class="column is-half">

          <label class="label">Look for a phone data on fonoapi</label>
          <div id="autocomplete"></div>

          <h1 class="subtitle">Create Product</h1>

          <form method="POST" enctype="multipart/form-data">
            <div class="field">
              <label class="label">Title</label>
              <input class="input" placeholder="Title" name="title">
            </div>
            
            <div class="field">
              <label class="label">Price</label>
              <input class="input" placeholder="Price" name="userPrice">
            </div>
            <div id="input-data"></div>  
            <div>
            <button class="button is-primary" id="add-feature"><i class="fas fa-plus-circle"></i> </button>
            </div>
            <div class="select is-focused">
            <label class="label">Category</label>
            <select id="category" name="categoryId">
            ${renderedCategories}
            </select>
            </div>
            <div class="select is-focused">
            <label class="label">Subcategory</label>
            <select id="subcategory" name="subcategoryId">
            ${renderedSubcategories}
            </select>
            </div>
             
            <div class="field">
              <label class="label">Image</label>            
              <input type="file" name="image" />
            </div>
            <br />
            <button class="button is-primary">Create</button>
          </form>
        </div>
      </div>
      <script src="/js/utils.js" defer></script> 
      <script src="/js/autocomplete.js" defer></script>
      <script src="/js/newproduct.js" defer></script>
      
    `
	});
};
