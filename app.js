const express = require('express');
const { productsController } = require('./controllers/productsController');
const { saleController } = require('./controllers/saleController');
// const { validName, productsService } = require('./services/productsService');
// const db = require('./models/db');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.getAll);

app.get('/products/:id', productsController.getById);

app.post('/products', productsController.newProduct);

app.post('/sales', saleController.addSaleProducts);

app.get('/sales/:id', saleController.getById);

app.get('/sales', saleController.getAll);

app.put('/products/:id', productsController.update);

app.delete('/products/:id', productsController.delete);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;