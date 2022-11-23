const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { productsService } = require('../../../services/productsService');
const { productsController } = require('../../../controllers/productsController');
const { saleService } = require('../../../services/saleService');

chai.use(chaiAsPromised);

const req = {};
const res = {};


describe('controllers/productsController', () => {
  let productMock;

  describe('getAll', () => {

    beforeEach(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns();
      productMock = sinon.stub(saleService, "listAll")
    });

    afterEach(sinon.restore);

    it('deve disparar um erro caso o listAll dispare um erro', () => {
      productMock.rejects();
      return chai.expect(productsController.getAll(req, res)).to.be.eventually.rejected;
    });
  });

  describe('getById', () => {
    beforeEach(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns();
      productMock = sinon.stub(saleService, "getById")
    });

    afterEach(sinon.restore);

    it('deve disparar um erro caso o getById dispare um erro', () => {
      productMock.rejects();
      return chai.expect(productsController.getById(req, res)).to.be.eventually.rejected;
    });
  });

  describe('newProduct', () => {
    beforeEach(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns();
      productMock = sinon.stub(saleService, "validName")
    });

    afterEach(sinon.restore);

    it('deve disparar um erro caso o validName dispare um erro', () => {
      productMock.rejects();
      return chai.expect(productsController.newProduct(req, res)).to.be.eventually.rejected;
    });
  });

  describe('update', () => {
    beforeEach(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns();
      productMock = sinon.stub(saleService, "validName")
      productMockExist = sinon.stub(saleService, 'exist')
    });

    afterEach(sinon.restore);

    it('deve disparar um erro caso o validName dispare um erro', () => {
      productMock.rejects();
      return chai.expect(productsController.update(req, res)).to.be.eventually.rejected;
    });
  });

    it('deve disparar um erro caso o exist dispare um erro', () => {
      productMock.resolves();
      productMockExist.rejects();
      return chai.expect(productsController.update(req, res)).to.be.eventually.rejected;
  });

  describe('delete', () => {
    beforeEach(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns();
      productMockExist = sinon.stub(saleService, 'exist')
    });

    afterEach(sinon.restore);

    it('deve disparar um erro caso o exist dispare um erro', () => {
      productMockExist.rejects();
      return chai.expect(productsController.delete(req, res)).to.be.eventually.rejected;
    });
  });
});