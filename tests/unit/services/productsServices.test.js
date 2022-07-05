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
      return chai.expect(productsService.listAll())
        .to.eventually.be.rejected;
    });

    it('deve retornar uma lista', () => {
      sinon.stub(productsModel, 'getAll').resolves([]);
      return chai.expect(productsService.listAll())
        .to.eventually.be.deep.equal([]);
    });
  });
  describe('getById', () => {
    it('deve disparar um erro caso o model dispare um erro', () => {
      sinon.stub(productsModel, 'getById').rejects();
      return chai.expect(productsService.getById(1))
        .to.eventually.be.rejected;
    });

    it('deve disparar um erro caso o model não retorne uma lista', () => {
      sinon.stub(productsModel, 'getById').resolves();
      return chai.expect(productsService.getById())
        .to.eventually.deep.equal({ code: 404, message: 'Product not found' });
    });
    it('deve retornar um objeto com code 200 caso dê tudo certo', () => {
      sinon.stub(productsModel, 'getById').resolves({});
      chai.expect(productsService.getById(1))
        .to.eventually.have.property('code', 200);
    });
  });
  describe('add', () => {
    it('deve disparar um erro caso o model dispare um erro', () => {
      sinon.stub(productsModel, 'add').rejects();
      return chai.expect(productsService.add('produto'))
        .to.eventually.be.rejected;
    });

    it('deve disparar um erro caso não tenha o name', () => {
      sinon.stub(productsModel, 'add').resolves();
      return chai.expect(productsService.add())
        .to.eventually.be.deep.equal({ message: '"name" is required', code: 400 });
    });
    it('deve disparar um erro caso o name seja menor que 5', () => {
      sinon.stub(productsModel, 'add').resolves();
      return chai.expect(productsService.add('prod'))
        .to.eventually.be.deep.equal({ message: '"name" length must be at least 5 characters long', code: 422 });
    });
    it('deve retornar um objeto com code 201 se deu tudo certo', () => {
      sinon.stub(productsModel, 'add').resolves({});
      return chai.expect(productsService.add('produto'))
        .to.eventually.have.property('code', 201);
    });
  });

  describe('update', () => {
    it('deve disparar um erro caso o model dispare um erro', () => {
      sinon.stub(productsModel, 'update').rejects();
      return chai.expect(productsService.update('produto', 1))
        .to.eventually.be.rejected;
    });

    it('deve disparar um erro caso o name não seja válildo', () => {
      sinon.stub(productsModel, 'update').resolves();
      return chai.expect(productsService.update('prod', 1))
        .to.eventually.be.deep.equal({ message: '"name" length must be at least 5 characters long', code: 422 });
    });
    it('deve disparar um erro caso não tenha name no body', () => {
      sinon.stub(productsModel, 'update').resolves();
      return chai.expect(productsService.update(null ,1))
        .to.eventually.be.deep.equal({ message: '"name" is required', code: 400 });
    });
    it.only('deve disparar um erro caso não exista o produto pra fazer o update', () => {
      sinon.stub(productsModel, 'update').resolves();
      return chai.expect(productsService.update('produto', 1))
        .to.eventually.be.deep.equal({ message: 'Product not found', code: 404 });
    });
  });

  describe('delete', () => {
    it('deve disparar um erro caso o model dispare um erro', () => {
      sinon.stub(productsModel, 'delete').rejects();
      return chai.expect(productsService.delete(1))
        .to.eventually.be.rejected;
    });

    it('deve disparar um erro caso o model não retorne uma lista', () => {
      sinon.stub(productsModel, 'delete').resolves();
      return chai.expect(productsService.delete(1))
        .to.eventually.be.undefined;
    });
    // it('deve retornar um objeto caso dê tudo certo', () => {
    //   sinon.stub(productsModel, 'delete').resolves();
    //   chai.expect(productsService.delete(1))
    //     .to.eventually.be.resolves;
    // });
  })
});