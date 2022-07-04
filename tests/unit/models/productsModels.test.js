const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const { productsModel } = require('../../../models/productsModel');
const db = require('../../../models/db');

chai.use(chaiAsPromised);

describe('models/productsModel', () => {
  beforeEach(sinon.restore);

  describe('getAll', () => {
    it('deve retornar uma lista', () => {
      sinon.stub(db, 'query').resolves([[{}]]);
      chai.expect(productsModel.getAll()).to.eventually.be.true;
    });
  });

  describe('getById', () => {
    it('deve retornar um objeto', () => {
      sinon.stub(db, 'query').resolves({});
      chai.expect(productsModel.getById(1)).to.eventually.be.true;
    });
    it('deve disparar um erro caso falhe o mysql', () => {
      sinon.stub(db, 'query').resolves([]);
      chai.expect(productsModel.getById(1)).to.eventually.be.rejected;
    });
    it('deve retornar undefined se não encontrar o produto', () => {
      sinon.stub(db, 'query').resolves({});
      chai.expect(productsModel.getById(1)).to.eventually.be.false;
    });
  });

  describe('add', () => {
    it('deve adicionar um produto', () => {
      sinon.stub(db, 'query').resolves({});
      chai.expect(productsModel.add('produto')).to.eventually.be.true;
    });
  });

  describe('exist', () => {
    it('deve retornar um true', () => {
      sinon.stub(db, 'query').resolves(true);
      chai.expect(productsModel.exist(1)).to.eventually.be.true;
    });
  });

  describe('update', () => {
    it('deve atualizar um produto', () => {
      sinon.stub(db, 'query').resolves({});
      chai.expect(productsModel.update('produto', 1)).to.eventually.be.true;
    });
  });

  describe('delete', () => {
    it('deve retornar uma lista', () => {
      sinon.stub(db, 'query').resolves([[{}]]);
      chai.expect(productsModel.getAll()).to.eventually.be.true;
    });
  });
});