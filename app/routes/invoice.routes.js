module.exports = (app) => {
  const invoices = require('../controllers/invoice.controller.js');
  var router = require('express').Router();
  // Create a new Invoice
  router.post('/', invoices.create);
  // Retrieve a all Invoice details with id
  router.get('/details', invoices.findAllDetail);
  // Retrieve all Invoices
  router.get('/', invoices.findAll);
  // Retrieve a single Invoice with id
  router.get('/:id', invoices.findAll);
  // Delete a Invoice with id
  router.delete('/:id', invoices.delete);
  // Create a new Invoice
  router.delete('/', invoices.deleteAll);
  app.use('/api/invoices', router);
};
