const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { productsService } = require('../../../services/productsService');
const { productsController } = require('../../../controllers/productsController');

chai.use(chaiAsPromised);

describe('controllers/productsController', () => {
  beforeEach(sinon.restore);

  describe('getAll', () => {
    it('deve retornar uma lista', () => {
      sinon.stub(productsService, 'listAll').resolves();
      // expect
    });
  });
});