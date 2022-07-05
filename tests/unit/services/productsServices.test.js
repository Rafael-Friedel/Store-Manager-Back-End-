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

    it('deve retornar um objeto com code 200 caso dê tudo certo', () => {
      sinon.stub(productsModel, 'update').resolves({});
      return chai.expect(productsService.update('produto', 1))
        .to.eventually.have.property('code', 200);
    });
    });
  });

describe('delete', () => {
  beforeEach(sinon.restore);
  it('deve disparar um erro caso o model dispare um erro', () => {
    sinon.stub(productsModel, 'delete').rejects();
    return chai.expect(productsService.delete(1))
      .to.eventually.be.rejected;
  });

  it('deve retornar um objeto com code 204 quando der tudo certo.', () => {
    sinon.stub(productsModel, 'delete').resolves();
    return chai.expect(productsService.delete())
      .to.eventually.have.property('code', 204);
  });

  describe('exist', () => {
    
    it('deve disparar um erro caso o model dispare um erro', () => {
      sinon.stub(productsModel, 'exist').rejects();
      return chai.expect(productsService.exist(1))
        .to.eventually.be.rejected;
    });

    it('deve retornar um objeto com code 404 quando der tudo certo.', () => {
      sinon.stub(productsModel, 'exist').resolves(false);
      return chai.expect(productsService.exist())
        .to.eventually.have.property('code', 404);
    });
    it('deve retornar um objeto vazio caso produto  exista.', () => {
      sinon.stub(productsModel, 'exist').resolves(true);
      return chai.expect(productsService.exist(2))
        .to.eventually.be.deep.equal({});
    });
  })
  describe('validName', () => {
    it('deve disparar um erro caso o model dispare um erro', () => {
      return chai.expect(productsService.validName())
        .to.eventually.have.property('code', 400);
    });

    it('deve retornar um objeto com code 404 quando der tudo certo.', () => {
      return chai.expect(productsService.validName('prod'))
        .to.eventually.have.property('code', 422);
    });
    it('deve retornar um objeto vazio caso produto  validName.', () => {
      return chai.expect(productsService.validName('produto'))
        .to.eventually.be.deep.equal({});
    });
  })
})
