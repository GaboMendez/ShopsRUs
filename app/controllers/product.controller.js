const Product = require('../models/product.model.js');

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }
  // Create a Product
  const product = new Product({
    name: req.body.name,
    categoryId: req.body.categoryId,
    price: req.body.price,
  });
  // Save Product in the database
  Product.create(product, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Product.',
      });
    else res.send(data);
  });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  const categoryId = req.query.categoryId;
  const categoryName = req.query.categoryName;
  if (name && (categoryId || categoryName)) {
    res.status(500).send({
      message:
        'If you filter by name you cannot filter by category_id or category_name.',
    });
    return;
  }
  if (categoryId && categoryName) {
    res.status(500).send({
      message: 'Filter by category_id or category_name but not both of them',
    });
    return;
  }
  Product.getAll(name, categoryName, categoryId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving products.',
      });
    else res.send(data);
  });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  Product.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Product with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving Product with id ${req.params.id}, ${err}`,
        });
      }
    } else res.send(data);
  });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }
  Product.updateById(req.params.id, new Product(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Product with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error updating Product with id ${req.params.id}, ${err}`,
        });
      }
    } else res.send(data);
  });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  Product.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Product with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Product with id ' + req.params.id,
        });
      }
    } else res.send({ message: `Product was deleted successfully!` });
  });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
  Product.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all products.',
      });
    else res.send({ message: `All Products were deleted successfully!` });
  });
};
