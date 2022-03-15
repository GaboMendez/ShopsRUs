module.exports = (app) => {
  const invoices = require('../controllers/invoice.controller.js');
  var router = require('express').Router();
  // Create a new Invoice
  router.post('/', invoices.create);
  // Retrieve all Invoices
  router.get('/', invoices.findAll);
  router.get('/details', invoices.findAllDetail);
  // Delete a Invoice with id
  router.delete('/:id', invoices.delete);
  // Create a new Invoice
  router.delete('/', invoices.deleteAll);
  app.use('/api/invoices', router);
};
