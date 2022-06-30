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

  async newProduct(req, res) {
    const { name } = req.body;
    // const { name } = await productsService.validateBodyAdd(req.body);
    // if (!name) return res.status(400).json({ message: '"name" is required' });
    // if (name.lenght < 5) {
    //   return res.status(424)
    //     .json({ message: '"name" length must be at least 5 characters long' });
    // }
    const product = await productsService.add(name);
    res.status(201).json(product);
  },
};

module.exports = {
  productsController,
};
