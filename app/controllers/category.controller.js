const Category = require('../models/category.model.js');

// Create and Save a new Category
exports.create = (req, res) => {
  // Validate request
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }
  // Create a Category
  const category = new Category({
    name: req.body.name,
  });
  // Save Category in the database
  Category.create(category, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Category.',
      });
    else res.send(data);
  });
};

// Retrieve all Categories from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  Category.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving categories.',
      });
    else res.send(data);
  });
};

// Find a single Category with an id
exports.findOne = (req, res) => {
  Category.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Category with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving Category with id ${req.params.id}, ${err}`,
        });
      }
    } else res.send(data);
  });
};

// Update a Category by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }
  Category.updateById(req.params.id, new Category(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Category with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error updating Category with id ${req.params.id}, ${err}`,
        });
      }
    } else res.send(data);
  });
};

// Delete a Category with the specified id in the request
exports.delete = (req, res) => {
  Category.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Category with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Category with id ' + req.params.id,
        });
      }
    } else res.send({ message: `Category was deleted successfully!` });
  });
};

// Delete all Categories from the database.
exports.deleteAll = (req, res) => {
  Category.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all categories.',
      });
    else res.send({ message: `All Categories were deleted successfully!` });
  });
};
