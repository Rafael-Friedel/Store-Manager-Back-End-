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
      sinon.stub(db, 'query').resolves([[]]);
      return chai.expect(productsModel.getAll()).to.eventually.be.deep.equal([]);
    });

    it('deve disparar um erro caso falhe o mysql', () => {
      sinon.stub(db, 'query').rejects();
      return chai.expect(productsModel.getAll()).to.eventually.be.rejected;
    });
  });

  describe('getById', () => {
    it('deve retornar um produto', () => {
      sinon.stub(db, 'query').resolves([[{}]]);
      return chai.expect(productsModel.getById()).to.eventually.be.deep.equal({});
    });
    it('deve disparar um erro caso falhe o mysql', () => {
      sinon.stub(db, 'query').rejects();
      return chai.expect(productsModel.getById(1)).to.eventually.be.rejected;
    });
    it('deve retornar undefined se não encontrar o produto', () => {
      sinon.stub(db, 'query').resolves([[]]);
      return chai.expect(productsModel.getById()).to.eventually.be.equal(undefined);
    });
  });

  describe('add', () => {
    it('deve retonar um objeto com o id criado pelo banco de dados', () => {
      sinon.stub(db, 'query').resolves([{ insertId:1 }]);
      return chai.expect(productsModel.add('produto')).to.eventually.be.have.property('id', 1)
    });
    it('deve disparar um erro caso falhe o mysql', () => {
      sinon.stub(db, 'query').rejects();
      return chai.expect(productsModel.add('produto')).to.eventually.be.rejected;
    });
    it('deve retornar undefined se não encontrar o produto', () => {
      sinon.stub(db, 'query').resolves([{}]);
      return chai.expect(productsModel.add('produto')).to.eventually.be.deep.equal({ id: undefined, name: 'produto'});
    });
  });

  describe('exist', () => {
    it('deve retornar um true', () => {
      sinon.stub(db, 'query').resolves([[true]]);
      return chai.expect(productsModel.exist(1)).to.eventually.be.true;
    });
    it('deve disparar um erro caso falhe o mysql', () => {
      sinon.stub(db, 'query').rejects();
      return chai.expect(productsModel.exist(1)).to.eventually.be.rejected;
    });
    it('deve retornar undefined se não encontrar o produto', () => {
      sinon.stub(db, 'query').resolves([[]]);
      return chai.expect(productsModel.exist(1)).to.eventually.be.false;
    });
  });

  describe('update', () => {
    it('deve retornar true', () => {
      sinon.stub(db, 'query').resolves(true);
      return chai.expect(productsModel.update('produto', 1)).to.eventually.be.true;
    });
    it('deve disparar um erro caso falhe o mysql', () => {
      sinon.stub(db, 'query').rejects();
      return chai.expect(productsModel.update('produto', 1)).to.eventually.be.rejected;
    });
    it('verifica se foi chamado a query', async () => {
      const queryStub = sinon.stub(db, 'query').resolves();
      await productsModel.update();
      return chai.expect(queryStub.calledOnce).to.be.true;
     
    });
  });

  describe('delete', () => {
    it('deve retornar true', () => {
      sinon.stub(db, 'query').resolves(true);
      return chai.expect(productsModel.delete(1)).to.eventually.be.true;
    });
    it('deve disparar um erro caso falhe o mysql', () => {
      sinon.stub(db, 'query').rejects();
      return chai.expect(productsModel.delete(1)).to.eventually.be.rejected;
    });
    it('verifica se foi chamado a query', async () => {
      const queryStub = sinon.stub(db, 'query').resolves();
      await productsModel.delete();
      return chai.expect(queryStub.calledOnce).to.be.true;
    });
  });
});