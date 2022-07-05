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
      sinon.stub(db, 'query').resolves([[]]);
      return chai.expect(saleModel.getAll()).to.eventually.be.deep.equal([]);
    });

    it('deve disparar um erro caso falhe o mysql', () => {
      sinon.stub(db, 'query').rejects();
      return chai.expect(saleModel.getAll()).to.eventually.be.rejected;
    });
  });

  describe('getById', () => {
    it('deve retornar um produto', () => {
      sinon.stub(db, 'query').resolves([{}]);
      return chai.expect(saleModel.getById()).to.eventually.be.deep.equal({});
    });
    it('deve disparar um erro caso falhe o mysql', () => {
      sinon.stub(db, 'query').rejects();
      return chai.expect(saleModel.getById(1)).to.eventually.be.rejected;
    });
  });

  describe('addSale', () => {
    it('deve adicionar um objeto', () => {
      sinon.stub(db, 'query').resolves([{ insertId:1 }]);
      return chai.expect(saleModel.addSale()).to.eventually.be.deep.equal(1);
    });
    it('deve disparar um erro caso falhe o mysql', () => {
      sinon.stub(db, 'query').rejects();
      return chai.expect(saleModel.addSale()).to.eventually.be.rejected;
    });
  });

  describe('addSaleProduct', () => {
    it('deve retornar true', () => {
      sinon.stub(db, 'query').resolves(true);
      return chai.expect(saleModel.addSaleProduct(1, 1, 1)).to.eventually.be.true;
    });
    it('deve disparar um erro caso falhe o mysql', () => {
      sinon.stub(db, 'query').rejects();
      return chai.expect(saleModel.addSaleProduct(1, 1, 1)).to.eventually.be.rejected;
    });
  });
});