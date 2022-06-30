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
};

module.exports = { saleController };
