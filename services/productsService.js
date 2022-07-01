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
    if (!product) return { code: 404, message: 'Product not found' };
    return { code: 200, product };
  },

  validateParamsId: runSchema(Joi.object({
    id: Joi.number().required().positive().integer(),
  }).required()),

  async add(name) {
    if (!name) return { message: '"name" is required', code: 400 };
    if (name.length < 5) {
      return { message: '"name" length must be at least 5 characters long', code: 422 };
    }
    const product = await productsModel.add(name);
    return { product, code: 201 };
  },

  validateBodyAdd: runSchema(Joi.object({
    name: Joi.string().min(5).required(),
  }).validate({ name: '123456' })),
};

module.exports = {
  productsService,
};
