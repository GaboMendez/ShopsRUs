module.exports = (app) => {
  const types = require('../controllers/type.controller.js');
  var router = require('express').Router();
  // Create a new Tutorial
  router.post('/', types.create);
  // Retrieve all Tutorials
  router.get('/', types.findAll);
  // Retrieve a single Tutorial with id
  router.get('/:id', types.findOne);
  // Update a Tutorial with id
  router.put('/:id', types.update);
  // Delete a Tutorial with id
  router.delete('/:id', types.delete);
  // Create a new Tutorial
  router.delete('/', types.deleteAll);
  app.use('/api/types', router);
};
