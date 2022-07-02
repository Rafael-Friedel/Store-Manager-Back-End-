const Joi = require('joi');
const { productsModel } = require('../models/productsModel');
const { runSchema } = require('./validators');

const validName = (name) => { 
  if (!name) return { message: '"name" is required', code: 400 };
  if (name.length < 5) {
    return { message: '"name" length must be at least 5 characters long', code: 422 };
  }
  return 'name válido';
};

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
    const valid = validName(name);
    if (valid.message) return valid;
    const product = await productsModel.add(name);
    return { product, code: 201 };
  },

  async update(name, id) {
    const valid = validName(name);
    const allProducts = await productsService.listAll();
    const exist = allProducts.some((p) => p.id === Number(id));
    if (!exist) return { message: 'Product not found', code: 404 };
    if (valid.message) return valid;
    await productsModel.update(name, id);
    return { code: 200, response: { id, name } };
  },

  validateBodyAdd: runSchema(Joi.object({
    name: Joi.string().min(5).required(),
  }).validate({ name: '123456' })),
};

module.exports = { productsService, validName };
