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
  async add(name) {
    const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
    const [{ insertId }] = await db.query(query, [name]);
    return { id: insertId, name };
  },

  async update(name, id) {
    const query = `UPDATE StoreManager.products
      SET name = ?
      WHERE id = ?;`;
    await db.query(query, [name, id]);
    return true;
  },

  async delete(id) {
    const query = `DELETE FROM StoreManager.products
      WHERE id = ?;`;
    await db.query(query, [id]);
    return true;
  },

  async exist(id) {
    const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
    const [[item]] = await db.query(query, [id]);
    return !!item;
  },
};

module.exports = {
  productsModel,
};
