const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { productsModel } = require('../../../models/productsModel');
const { productsService } = require('../../../services/productsService');

chai.use(chaiAsPromised);

describe('services/productsService', () => {
  beforeEach(sinon.restore);

  describe('listAll', () => {
    it('deve disparar um erro caso o model dispare um erro', () => {
      sinon.stub(productsModel, 'getAll').rejects();
      chai.expect(productsService.listAll())
        .to.eventually.be.rejected;
    });

    it('deve disparar um erro caso o model não retorne uma lista', () => {
      sinon.stub(productsModel, 'getAll').resolves();
      chai.expect(productsService.listAll())
        .to.eventually.be.undefined;
    });
  });
  describe('getById', () => {
    it('deve disparar um erro caso o model dispare um erro', () => {
      sinon.stub(productsModel, 'getById').rejects();
      chai.expect(productsService.getById(1))
        .to.eventually.be.rejected;
    });

    it('deve disparar um erro caso o model não retorne uma lista', () => {
      sinon.stub(productsModel, 'getById').resolves();
      chai.expect(productsService.getById(1))
        .to.eventually.be.undefined;
    });
    it('deve retornar um objeto caso dê tudo certo', () => {
      sinon.stub(productsModel, 'getById').resolves({});
      chai.expect(productsService.getById(1))
        .to.eventually.be.resolves;
    });
  });
  describe('add', () => {
    it('deve disparar um erro caso o model dispare um erro', () => {
      sinon.stub(productsModel, 'add').rejects();
      chai.expect(productsService.add('produto'))
        .to.eventually.be.rejected;
    });

    it('deve disparar um erro caso o model não retorne uma lista', () => {
      sinon.stub(productsModel, 'add').resolves();
      chai.expect(productsService.add('produto'))
        .to.eventually.be.undefined;
    });
    it('deve retornar um objeto caso dê tudo certo', () => {
      sinon.stub(productsModel, 'add').resolves({});
      chai.expect(productsService.add('produto'))
        .to.eventually.be.resolves;
    });
  });

  describe('update', () => {
    it('deve disparar um erro caso o model dispare um erro', () => {
      sinon.stub(productsModel, 'update').rejects();
      chai.expect(productsService.update('produto', 1))
        .to.eventually.be.rejected;
    });

    it('deve disparar um erro caso o model não retorne uma lista', () => {
      sinon.stub(productsModel, 'update').resolves();
      chai.expect(productsService.update('produto', 1))
        .to.eventually.be.undefined;
    });
    it('deve retornar um objeto caso dê tudo certo', () => {
      sinon.stub(productsModel, 'update').resolves({});
      chai.expect(productsService.update('produto', 1))
        .to.eventually.be.resolves;
    });
  });

  describe('delete', () => {
    it('deve disparar um erro caso o model dispare um erro', () => {
      sinon.stub(productsModel, 'delete').rejects();
      chai.expect(productsService.delete(1))
        .to.eventually.be.rejected;
    });

    it('deve disparar um erro caso o model não retorne uma lista', () => {
      sinon.stub(productsModel, 'delete').resolves();
      chai.expect(productsService.delete(1))
        .to.eventually.be.undefined;
    });
    it('deve retornar um objeto caso dê tudo certo', () => {
      sinon.stub(productsModel, 'delete').resolves({});
      chai.expect(productsService.delete(1))
        .to.eventually.be.resolves;
    });
  })
});