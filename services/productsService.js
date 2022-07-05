const Joi = require('joi');
const { productsModel } = require('../models/productsModel');
const { runSchema } = require('./validators');

const productsService = {
  async listAll() {
    const allProducts = await productsModel.getAll();
    return allProducts;
  },

  async validName(name) {
    if (!name) return { message: '"name" is required', code: 400 };
    if (name.length < 5) {
      return { message: '"name" length must be at least 5 characters long', code: 422 };
    }
    return {};
  },

  async exist(id) {
    const existProduct = await productsModel.exist(id);
    if (!existProduct) return { message: 'Product not found', code: 404 };
    return {};
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
    const product = await productsModel.add(name);
    return { product, code: 201 };
  },

  async update(name, id) {
    await productsModel.update(name, id);
    return { code: 200, response: { id, name } };
  },

  async delete(id) {
    await productsModel.delete(id);
    return { code: 204 };
  },
};

module.exports = { productsService };
