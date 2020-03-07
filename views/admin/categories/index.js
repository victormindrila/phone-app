const layout = require('../layout');

module.exports = ({ categories }) => {
	const renderedCategories = categories
		.map((category) => {
			return `
      <tr>
        <td>${category.id}</td>
        <td><a href="/admin/categories/${category.id}/view">${category.categoryName}</a></td>
        <td>
          <a href="/admin/categories/${category.id}/edit">
            <button class="button is-link">
              Edit
            </button>
          </a>
        </td>
        <td>
        <form method="POST" action="/admin/categories/${category.id}/delete">
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
        <h1 class="subtitle">Categories</h1>  
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
