const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { saleService } = require('../../../services/saleService');
const { saleController } = require('../../../controllers/saleController');

chai.use(chaiAsPromised);

const req = {};
const res = {};


describe('controllers/saleController', () => {
  beforeEach(sinon.restore);

  describe('getAll', () => {
    it('deve disparar um erro caso o listAll dispare um erro', () => {
      sinon.stub(saleService, 'listAll').rejects();
      return chai.expect(saleController.getAll(req, res)).to.be.eventually.rejected;
    });
  });

  describe('getById', () => {
    it('deve disparar um erro caso o getById dispare um erro', () => {
      sinon.stub(saleService, 'getById').rejects();
      return chai.expect(saleController.getById(req, res)).to.be.eventually.rejected;
    });
  });

  describe('addSaleProducts', () => {
    it('deve disparar um erro caso o validationsBody dispare um erro', () => {
      sinon.stub(saleService, 'validationsBody').rejects();
      return chai.expect(saleController.addSaleProducts(req, res)).to.be.eventually.rejected;
    });
  });
});