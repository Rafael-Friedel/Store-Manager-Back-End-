const db = require('./db');

const productsModel = {
  async getAll() {
    const query = 'SELECT * FROM StoreManager.products;';
    const [allProducts] = await db.query(query);
    return allProducts;
  },
  async getById(id) {
    const query = 'SELECT * FROM StoreManager.products WHERE id=?;';
    const [[product]] = await db.query(query, [id]);
    return product;
  },
};

module.exports = {
  productsModel,
};
