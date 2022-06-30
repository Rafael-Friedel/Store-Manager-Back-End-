const express = require('express');
const { productsController } = require('./controllers/productsController');
const { saleController } = require('./controllers/saleController');
const db = require('./models/db');
const { productsService } = require('./services/productsService');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.getAll);

app.get('/products/:id', productsController.getById);

app.post('/products', productsController.newProduct);

app.post('/sales', async (req, res) => {
  const querySales = 'INSERT INTO StoreManager.sales (date) values (NOW())';
  const [{ insertId }] = await db.query(querySales);
  const querySalesProducts = `INSERT INTO StoreManager.sales_products 
  (sale_id, product_id, quantity) values(?,?,?)`;
  const allProducts = await productsService.listAll();
  const items = req.body.map(({ productId, quantity }) => {
    if (!productId) return res.status(400).json({ message: '"productId" is required' });
    const exist = allProducts.some(({ id }) => id === productId);
    if (!exist) return res.status(404).json({ message: 'Product not found' });
    if (quantity < 1) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    if (!quantity) return res.status(400).json({ message: '"quantity" is required' });
    db.query(querySalesProducts, [insertId, productId, quantity]);
    return { productId, quantity };
  });

  res.status(200).json({ id: insertId, itemsSold: items });
});

app.get('/sales/:id', saleController.getById);

app.get('/sales', saleController.getAll);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;