const db = require('./db');

const saleModel = {
  async getAll() {
    const query = `SELECT sp.sale_id, sp.product_id, sp.quantity, s.date
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales AS s
      ON s.id = sp.sale_id
      ORDER BY sp.sale_id, sp.product_id;`;
    const [allSales] = await db.query(query);
    return allSales;
  },

  async getById(id) {
    const query = `SELECT sp.sale_id, sp.product_id, sp.quantity, s.date
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales AS s
      ON s.id = sp.sale_id
      WHERE sp.sale_id = ?
      ORDER BY sp.sale_id, sp.product_id;`;
    const [sale] = await db.query(query, [id]);
    return sale;
  },

  async addSale() {
    const querySales = 'INSERT INTO StoreManager.sales (date) values (NOW())';
    const [{ insertId }] = await db.query(querySales);
    return insertId;
  },

  async addSaleProduct(insertId, productId, quantity) {
    const querySalesProducts = `INSERT INTO StoreManager.sales_products 
  (sale_id, product_id, quantity) values(?,?,?)`;
    const saleProduct = await db.query(querySalesProducts, [insertId, productId, quantity]);
    return saleProduct;
  },
};

module.exports = { saleModel };
