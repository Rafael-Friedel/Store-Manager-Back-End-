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
      sinon.stub(productsModel, 'getAll').resolves({});
      chai.expect(productsService.listAll())
        .to.eventually.be.rejected;
    });
  })
});