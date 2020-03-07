const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ categories, errors }) => {
	const renderedCategories = categories
		.map((category) => {
			return `
      <option value="${category.id}">${category.categoryName}</option>
    `;
		})
		.join('');
	return layout({
		content: `
      <div class="columns is-centered">
        <div class="column is-half">

          <h1 class="subtitle">Create a Category</h1>

          <form method="POST">
            <div class="field">
              <label class="label">Category Name</label>
              <input class="input" placeholder="Category Name" name="categoryName">
            </div>
            <br />
            <button class="button is-primary">Create</button>
          </form>
          <br />
          <br />
          <h1 class="subtitle">Create a Subcategory</h1>
          
          <form method="POST" action="/admin/new-sub-category">
            <div class="field">
              <label class="label"> Select a category:</label>
              <div class="select is-focused">
              <select name="categoryId">
                ${renderedCategories}
              </select>
              </div>
              <label class="label">Subcategory Name</label>
              <input class="input" placeholder="Subcategory Name" name="subCategoryName">
            </div>
            <br />
            <button class="button is-primary">Create</button>
          </form>

        </div>
      </div>
    `
	});
};
