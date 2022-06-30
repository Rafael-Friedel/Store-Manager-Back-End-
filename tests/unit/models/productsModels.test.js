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
});