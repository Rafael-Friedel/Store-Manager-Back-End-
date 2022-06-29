const { productsService } = require('../services/productsService');

const productsController = {
  async getAll(_req, res) {
    const allProducts = await productsService.listAll();
    res.status(200).json(allProducts);
  },
  async getById(req, res) {
    const { id } = await productsService.validateParamsId(req.params);
    const product = await productsService.getById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  },
};

module.exports = {
  productsController,
};
