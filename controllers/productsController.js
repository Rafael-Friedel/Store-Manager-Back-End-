const { productsService } = require('../services/productsService');

const productsController = {
  async getAll(_req, res) {
    const allProducts = await productsService.listAll();
    res.status(200).json(allProducts);
  },
  async getById(req, res) {
    const { id } = await productsService.validateParamsId(req.params);
    const { product, code, message } = await productsService.getById(id);
    if (message) return res.status(code).json({ message });
    res.status(code).json(product);
  },

  async newProduct(req, res) {
    const { name } = req.body;
    const { product, message, code } = await productsService.add(name);
    if (message) res.status(code).json({ message });
    res.status(code).json(product);
  },
};

module.exports = {
  productsController,
};
