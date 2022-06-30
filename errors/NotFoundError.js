const errorMiddleware = (erro, req, res, _next) => {
  res.status(404).json({ message: 'Product not found' });
};

module.exports = errorMiddleware; 