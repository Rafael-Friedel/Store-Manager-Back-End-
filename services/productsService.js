const Joi = require('joi');
const { productsModel } = require('../models/productsModel');
const { runSchema } = require('./validators');

const productsService = {
  async listAll() {
    const allProducts = await productsModel.getAll();
    return allProducts;
  },
  async getById(id) {
    const product = await productsModel.getById(id);
    return product;
  },
  validateParamsId: runSchema(Joi.object({
    id: Joi.number().required().positive().integer(),
  }).required()),
};

module.exports = {
  productsService,
};
