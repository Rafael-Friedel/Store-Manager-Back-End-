const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { productsService } = require('../../../services/productsService');
const { productsController } = require('../../../controllers/productsController');

chai.use(chaiAsPromised);

const req = {};
const res = {};


describe('controllers/productsController', () => {
  beforeEach(sinon.restore);

  describe('getAll', () => {
    it('deve disparar um erro caso o listAll dispare um erro', () => {
      sinon.stub(productsService, 'listAll').rejects();
      return chai.expect(productsController.getAll(req, res)).to.be.eventually.rejected;
    });
  });

  describe('getById', () => {
    it('deve disparar um erro caso o getById dispare um erro', () => {
      sinon.stub(productsService, 'getById').rejects();
      return chai.expect(productsController.getById(req, res)).to.be.eventually.rejected;
    });
  });

  describe('newProduct', () => {
    it('deve disparar um erro caso o validName dispare um erro', () => {
      sinon.stub(productsService, 'validName').rejects();
      return chai.expect(productsController.newProduct(req, res)).to.be.eventually.rejected;
    });
  });

  describe('update', () => {
    it('deve disparar um erro caso o validName dispare um erro', () => {
      sinon.stub(productsService, 'validName').rejects();
      return chai.expect(productsController.update(req, res)).to.be.eventually.rejected;
    });
  });

  it('deve disparar um erro caso o exist dispare um erro', () => {
    sinon.stub(productsService, 'validName').resolves();
    sinon.stub(productsService, 'exist').rejects();
    return chai.expect(productsController.update(req, res)).to.be.eventually.rejected;
  });

  describe('delete', () => {
    it('deve disparar um erro caso o exist dispare um erro', () => {
      sinon.stub(productsService, 'exist').rejects();
      return chai.expect(productsController.delete(req, res)).to.be.eventually.rejected;
    });
  });
});