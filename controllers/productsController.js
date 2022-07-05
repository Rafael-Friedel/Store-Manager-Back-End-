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
    const valid = await productsService.validName(name);
    if (valid.message) return res.status(valid.code).json({ message: valid.message });
    const { product, code } = await productsService.add(name);
    res.status(code).json(product);
  },

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    const valid = await productsService.validName(name);
    if (valid.message) return res.status(valid.code).json({ message: valid.message });
    const { message, code } = await productsService.exist(id);
    if (message) return res.status(code).json({ message });
    const update = await productsService.update(name, id);
    res.status(update.code).json(update.response);
  },

  async delete(req, res) {
    const { id } = req.params;
    const { message, code } = await productsService.exist(id);
    if (message) return res.status(code).json({ message });
    const deleted = await productsService.delete(id);
    res.sendStatus(deleted.code);
  },
};

module.exports = {
  productsController,
};
