const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { saleService } = require('../../../services/saleService');
const { saleController } = require('../../../controllers/saleController');

chai.use(chaiAsPromised);

let req = {};
const res = {};


describe('controllers/saleController', () => {
  let saleMock;
  describe('getAll', () => {
    beforeEach(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns();
      saleMock = sinon.stub(saleService, "listAll")
    });

    afterEach(sinon.restore);

    it('deve disparar um erro caso o listAll dispare um erro', () => {
      saleMock.rejects();
      return chai.expect(saleController.getAll(req, res)).to.be.eventually.rejected;
    });

    it('deve retornar um status 200', async () => {
      saleMock.resolves();
      await saleController.getAll(req, res)
      chai.expect(res.status.calledWith(200)).to.be.true
    })
  });

  describe('getById', () => {
    beforeEach(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns();
      req.params = { id: 1}
      saleMock = sinon.stub(saleService, "getById")
    });

    afterEach(sinon.restore)

    it('deve disparar um erro caso o getById dispare um erro', () => {
      saleMock.rejects();
      return chai.expect(saleController.getById(req, res)).to.be.eventually.rejected;
    });
    it('deve retornar um status 200', async () => {
      saleMock.resolves({ code: 200 });
      await saleController.getById(req, res)
      chai.expect(res.status.calledWith(200)).to.be.true
    })
    it('deve retornar uma mensagem de erro caso getById do service retorne uma message', async () => {
      saleMock.resolves({ code: 404, message: 'not Found' });
      await saleController.getById(req, res)
      chai.expect(res.status.calledWith(404)).to.be.true
    })
    
  });

  describe('addSaleProducts', () => {
    beforeEach(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns();
      req.body = [{ id: 1 }]
      saleMock = sinon.stub(saleService, "validationsBody")
    });

    afterEach(sinon.restore)
    it('deve disparar um erro caso o validationsBody dispare um erro', () => {
      saleMock.rejects();
      return chai.expect(saleController.addSaleProducts(req, res)).to.be.eventually.rejected;
    });

    it('deve retornar um status 200', async () => {
      saleMock.resolves([{ code: 200 }]);
      await saleController.addSaleProducts(req, res)
      chai.expect(res.status.calledWith(201)).to.be.true
    })

    it('deve retornar uma mensagem de erro caso validationsBody retorne uma message', async () => {
      saleMock.resolves([{ code: 404, message: 'not Found' }]);
      await saleController.addSaleProducts(req, res)
      chai.expect(res.status.calledWith(404)).to.be.true
    })
  });
});