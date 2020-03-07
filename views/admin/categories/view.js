const layout = require('../layout');

module.exports = ({ subcategories }) => {
	const renderedCategories = subcategories
		.map((subcategory) => {
			return `
      <tr>
        <td>${subcategory.id}</td>
        <td><a href="/admin/products/${subcategory.id}/view">${subcategory.subCategoryName}</td>
        <td>
          <a href="/admin/categories/${subcategory.id}/edit">
            <button class="button is-link">
              Edit
            </button>
          </a>
        </td>
        <td>
        <form method="POST" action="/admin/categories/${subcategory.id}/delete">
          <button class="button is-danger">Delete</button>
        </form>
        </td>
      </tr>
    `;
		})
		.join('');

	return layout({
		content: `
      <div class="control">
        <h1 class="subtitle">Subcategories</h1>  
        <a href="/admin/new-category" class="button is-primary">New Category</a>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          ${renderedCategories}
        </tbody>
      </table>
    `
	});
};
