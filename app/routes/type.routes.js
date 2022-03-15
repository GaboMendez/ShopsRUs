module.exports = (app) => {
  const types = require('../controllers/type.controller.js');
  var router = require('express').Router();
  // Create a new Type
  router.post('/', types.create);
  // Retrieve all Types
  router.get('/', types.findAll);
  // Retrieve a single Type with id
  router.get('/:id', types.findOne);
  // Update a Type with id
  router.put('/:id', types.update);
  // Delete a Type with id
  router.delete('/:id', types.delete);
  // Create a new Type
  router.delete('/', types.deleteAll);
  app.use('/api/types', router);
};
