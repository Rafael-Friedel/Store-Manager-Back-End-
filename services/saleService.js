const { saleModel } = require('../models/saleModel');

const saleService = {
  async listAll() {
    const allSales = await saleModel.getAll();
    const sales = allSales.map((s) => ({
      saleId: s.sale_id,
      productId: s.product_id,
      quantity: s.quantity,
      date: s.date,
    }));
    return sales;
  },

  async getById(id) {
    const sale = await saleModel.getById(id);
    if (sale.length === 0) return { code: 404, message: 'Sale not found' };
    const result = sale.map(({ date, product_id: productId, quantity }) => ({
      date,
      productId,
      quantity,
    }));
    return { code: 200, result };
  },
};

module.exports = { saleService };
