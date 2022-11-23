const express = require("express");
const { productsController } = require("./controllers/productsController");
const { saleController } = require("./controllers/saleController");

const app = express();
app.use(express.json());

app.get("/", (_request, response) => {
  response.send();
});

app.get("/products", productsController.getAll);

app.get("/products/:id", productsController.getById);

app.post("/products", productsController.newProduct);

app.post("/sales", saleController.addSaleProducts);

app.get("/sales/:id", saleController.getById);

app.get("/sales", saleController.getAll);

app.put("/products/:id", productsController.update);

app.delete("/products/:id", productsController.delete);

module.exports = app;
