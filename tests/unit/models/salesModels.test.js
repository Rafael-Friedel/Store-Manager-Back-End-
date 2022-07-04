const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const { saleModel } = require('../../../models/saleModel');
const db = require('../../../models/db');

chai.use(chaiAsPromised);

describe('models/saleModel', () => {
  beforeEach(sinon.restore);

  describe('getAll', () => {
    it('deve retornar uma lista', () => {
      sinon.stub(db, 'query').resolves([[{}]]);
      chai.expect(saleModel.getAll()).to.eventually.be.true;
    });

    it('deve disparar um erro caso falhe o mysql', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(saleModel.getAll()).to.eventually.be.rejected;
    });
    it('deve retornar undefined se não encontrar o produto', () => {
      sinon.stub(db, 'query').resolves({});
      chai.expect(saleModel.getAll()).to.eventually.be.false;
    });
  });

  describe('getById', () => {
    it('deve retornar um produto', () => {
      sinon.stub(db, 'query').resolves({});
      chai.expect(saleModel.getById(1)).to.eventually.be.true;
    });
    it('deve disparar um erro caso falhe o mysql', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(saleModel.getById(1)).to.eventually.be.rejected;
    });
    it('deve retornar undefined se não encontrar o produto', () => {
      sinon.stub(db, 'query').resolves(undefined);
      chai.expect(saleModel.getById(1)).to.eventually.be.false;
    });
  });

  describe('addSale', () => {
    it('deve adicionar um objeto', () => {
      sinon.stub(db, 'query').resolves({});
      chai.expect(saleModel.addSale()).to.eventually.be.true;
    });
    it('deve disparar um erro caso falhe o mysql', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(saleModel.addSale()).to.eventually.be.rejected;
    });
    it('deve retornar undefined se não encontrar o produto', () => {
      sinon.stub(db, 'query').resolves(undefined);
      chai.expect(saleModel.addSale()).to.eventually.be.false;
    });
  });

  describe('addSaleProduct', () => {
    it('deve retornar true', () => {
      sinon.stub(db, 'query').resolves(true);
      chai.expect(saleModel.addSaleProduct(1, 1, 1)).to.eventually.be.true;
    });
    it('deve disparar um erro caso falhe o mysql', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(saleModel.addSaleProduct(1, 1, 1)).to.eventually.be.rejected;
    });
    it('deve retornar undefined se não encontrar o produto', () => {
      sinon.stub(db, 'query').resolves(undefined);
      chai.expect(saleModel.addSaleProduct(1, 1, 1)).to.eventually.be.false;
    });
  });
});