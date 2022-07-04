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

    it('deve disparar um erro caso falhe o mysql', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(productsModel.getAll()).to.eventually.be.rejected;
    });
    it('deve retornar undefined se não encontrar o produto', () => {
      sinon.stub(db, 'query').resolves({});
      chai.expect(productsModel.getAll()).to.eventually.be.false;
    });
  });

  describe('getById', () => {
    it('deve retornar um objeto', () => {
      sinon.stub(db, 'query').resolves({});
      chai.expect(productsModel.getById(1)).to.eventually.be.true;
    });
    it('deve disparar um erro caso falhe o mysql', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(productsModel.getById(1)).to.eventually.be.rejected;
    });
    it('deve retornar undefined se não encontrar o produto', () => {
      sinon.stub(db, 'query').resolves(undefined);
      chai.expect(productsModel.getById(1)).to.eventually.be.false;
    });
  });

  describe('add', () => {
    it('deve adicionar um objeto', () => {
      sinon.stub(db, 'query').resolves({});
      chai.expect(productsModel.add('produto')).to.eventually.be.true;
    });
    it('deve disparar um erro caso falhe o mysql', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(productsModel.add('produto')).to.eventually.be.rejected;
    });
    it('deve retornar undefined se não encontrar o produto', () => {
      sinon.stub(db, 'query').resolves(undefined);
      chai.expect(productsModel.add('produto')).to.eventually.be.false;
    });
  });

  // describe('exist', () => {
  //   it('deve retornar um true', () => {
  //     sinon.stub(db, 'query').resolves(true);
  //     chai.expect(productsModel.exist(1)).to.eventually.be.true;
  //   });
  //   it('deve disparar um erro caso falhe o mysql', () => {
  //     sinon.stub(db, 'query').rejects();
  //     chai.expect(productsModel.exist(1)).to.eventually.be.rejected;
  //   });
  //   it('deve retornar undefined se não encontrar o produto', () => {
  //     sinon.stub(db, 'query').resolves(undefined);
  //     chai.expect(productsModel.exist(1)).to.eventually.be.false;
  //   });
  // });

  describe('update', () => {
    it('deve retornar true', () => {
      sinon.stub(db, 'query').resolves(true);
      chai.expect(productsModel.update('produto', 1)).to.eventually.be.true;
    });
    it('deve disparar um erro caso falhe o mysql', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(productsModel.update('produto', 1)).to.eventually.be.rejected;
    });
    it('deve retornar undefined se não encontrar o produto', () => {
      sinon.stub(db, 'query').resolves(undefined);
      chai.expect(productsModel.update('produto', 1)).to.eventually.be.false;
    });
  });

  describe('delete', () => {
    it('deve retornar true', () => {
      sinon.stub(db, 'query').resolves(true);
      chai.expect(productsModel.delete(1)).to.eventually.be.true;
    });
    it('deve disparar um erro caso falhe o mysql', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(productsModel.delete(1)).to.eventually.be.rejected;
    });
    it('deve retornar undefined se não encontrar o produto', () => {
      sinon.stub(db, 'query').resolves(undefined);
      chai.expect(productsModel.delete(1)).to.eventually.be.false;
    });
  });
});