const Repository = require('./repository');

class ProductsRepository extends Repository {}

module.exports = new ProductsRepository('subcategories.json');
