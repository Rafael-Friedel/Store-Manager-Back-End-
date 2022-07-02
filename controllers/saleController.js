const { saleService } = require('../services/saleService');

const saleController = {
  async getAll(req, res) {
    const allSales = await saleService.listAll();
    res.status(200).json(allSales);
  },

  async getById(req, res) {
    const { id } = req.params;
    const { code, message, result } = await saleService.getById(id);
    if (message) return res.status(code).json({ message });
    res.status(code).json(result);
  },

  async addSaleProducts(req, res) {
    const { body } = req;
    const validation = await saleService.validationsBody(body);
    console.log(validation);
    const valid = validation.find((v) => v.message);
    console.log(valid);
    if (valid) {
      return res.status(valid.code).json({ message: valid.message });
    }
    const id = await saleService.addSaleProduct(body);
    res.status(201).json({ id, itemsSold: body });
  },
};

module.exports = { saleController };
