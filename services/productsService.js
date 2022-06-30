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

  async add(name) {
    const product = await productsModel.add(name);
    return product;
  },

  validateBodyAdd: runSchema(Joi.object({
    name: Joi.string().min(5).required(),
  }).validate({ name: '123456' })),
};

module.exports = {
  productsService,
};
