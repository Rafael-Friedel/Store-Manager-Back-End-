const { saleModel } = require('../models/saleModel');
const { productsService } = require('./productsService');

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

  async validationsBody(body) {
    const allProducts = await productsService.listAll();
    const response = await body.map(({ productId, quantity }) => {
      if (!productId) return { message: '"productId" is required', code: 400 };
      const exist = allProducts.some(({ id }) => id === productId);
      if (!exist) return { message: 'Product not found', code: 404 };
      if (quantity < 1) {
        return { message: '"quantity" must be greater than or equal to 1', code: 422 };
      }
      if (!quantity) return { message: '"quantity" is required', code: 400 };
      return { code: 200 };
    });
    return response;
  },

  async addSaleProduct(body) { 
    const id = await saleModel.addSale();
    body.forEach(async (b) => {
      await saleModel.addSaleProduct(id, b.productId, b.quantity);
    });
    return id;
  },
};

module.exports = { saleService };
