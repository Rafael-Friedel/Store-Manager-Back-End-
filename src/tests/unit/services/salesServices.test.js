const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { saleModel } = require('../../../models/saleModel');
const { productsModel } = require('../../../models/productsModel');
const { saleService } = require('../../../services/saleService');

chai.use(chaiAsPromised);

const BODY_VALID = [{ productId: 1, quantity: 1 }];
const BODY_VALID_WITH_TWO_PRODUCTS = [{ productId: 1, quantity: 1 }, { productId: 1, quantity: 1 }];
const BODY_NOT_PRODUCT_ID = [{ quantity: 1 }];
const BODY_PRODUCT_ID_NOT_EXIST = [{ productId: 2, quantity: 1 }];
const BODY_QUANTITY_LESSTHEN_ONE = [{ productId: 1, quantity: 0 }];
const BODY_NOT_QUANTITY = [{ productId: 1 }];

describe('services/saleService', () => {
  beforeEach(sinon.restore);

  describe('listAll', () => {
    it('deve disparar um erro caso o model dispare um erro', () => {
      sinon.stub(saleModel, 'getAll').rejects();
      return chai.expect(saleService.listAll())
        .to.eventually.be.rejected;
    });

    it('deve retornar uma lista', () => {
      sinon.stub(saleModel, 'getAll').resolves([]);
      return chai.expect(saleService.listAll())
        .to.eventually.be.deep.equal([]);
    });
  });
  describe('getById', () => {
    it('deve disparar um erro caso o model dispare um erro', () => {
      sinon.stub(saleModel, 'getById').rejects();
      return chai.expect(saleService.getById(1))
        .to.eventually.be.rejected;
    });

    it('deve disparar um erro caso o model não retorne uma lista', () => {
      sinon.stub(saleModel, 'getById').resolves([]);
      return chai.expect(saleService.getById())
        .to.eventually.deep.equal({ code: 404, message: 'Sale not found' });
    });
    it('deve retornar um objeto com code 200 caso dê tudo certo', () => {
      sinon.stub(saleModel, 'getById').resolves([{ date: 1, quantity:1, product_id: 1}]);
      return chai.expect(saleService.getById(1))
        .to.eventually.have.property('code', 200);
    });
  });
  describe('validationsBody', () => {
    it('deve disparar um erro caso o model dispare um erro', () => {
      sinon.stub(productsModel, 'getAll').rejects();
      return chai.expect(saleService.validationsBody([]))
        .to.eventually.be.rejected;
    });

    it('deve retornar um objeto com code 200 se deu tudo certo', () => {
      sinon.stub(productsModel, 'getAll').resolves([{ id:1}]);
      return chai.expect(saleService.validationsBody(BODY_VALID))
        .to.eventually.be.deep.equal([{code: 200}]);
    });
    it('deve retornar um objeto com code 400 se não tiver o productId', () => {
      sinon.stub(productsModel, 'getAll').resolves([{ id: 1 }]);
      return chai.expect(saleService.validationsBody(BODY_NOT_PRODUCT_ID))
        .to.eventually.be.deep.equal([{ message: '"productId" is required', code: 400 }]);
    });
    it('deve retornar um objeto com code 404 se o productId não existir', () => {
      sinon.stub(productsModel, 'getAll').resolves([{ id: 1 }]);
      return chai.expect(saleService.validationsBody(BODY_PRODUCT_ID_NOT_EXIST))
        .to.eventually.be.deep.equal([{ message: 'Product not found', code: 404 }]);
    });
    it('deve retornar um objeto com code 422 se quantity for menor que 1', () => {
      sinon.stub(productsModel, 'getAll').resolves([{ id: 1 }]);
      return chai.expect(saleService.validationsBody(BODY_QUANTITY_LESSTHEN_ONE))
        .to.eventually.be.deep.equal([{ message: '"quantity" must be greater than or equal to 1', code: 422 }]);
    });
    it('deve retornar um objeto com code 400 se quantity não existir', () => {
      sinon.stub(productsModel, 'getAll').resolves([{ id: 1 }]);
      return chai.expect(saleService.validationsBody(BODY_NOT_QUANTITY))
        .to.eventually.be.deep.equal([{ message: '"quantity" is required', code: 400 }]);
    });
  });

  describe('addSaleProduct', () => {
    it('deve disparar um erro caso o model dispare um erro', () => {
      sinon.stub(saleModel, 'addSale').rejects();
      return chai.expect(saleService.addSaleProduct('produto', 1))
        .to.eventually.be.rejected;
    });

    it('testa se o addSale é chamado', async () => {
      const STUB_ADDSALE = sinon.stub(saleModel, 'addSale').resolves();
      const STUB_ADD_SALE_PRODUCT = sinon.stub(saleModel, 'addSaleProduct').resolves();
      await saleService.addSaleProduct(BODY_VALID)
      chai.expect(STUB_ADDSALE.calledOnce)
        .to.be.true;
      chai.expect(STUB_ADD_SALE_PRODUCT.calledOnce)
        .to.be.true;
    });
    it('testa se o addSaleProducts é chamado 2 vezes, se tiver dois produtos', async () => {
      const STUB_ADDSALE = sinon.stub(saleModel, 'addSale').resolves();
      const STUB_ADD_SALE_PRODUCT = sinon.stub(saleModel, 'addSaleProduct').resolves();
      await saleService.addSaleProduct(BODY_VALID_WITH_TWO_PRODUCTS)
      chai.expect(STUB_ADDSALE.calledOnce)
        .to.be.true;
      chai.expect(STUB_ADD_SALE_PRODUCT.calledTwice)
        .to.be.true;
    });
    
  });
});

