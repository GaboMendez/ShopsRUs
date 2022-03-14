const Type = require('../models/type.model.js');

// Create and Save a new Type
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  // Create a Type
  const type = new Type({
    name: req.body.name,
  });
  // Save Type in the database
  Type.create(type, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Type.',
      });
    else res.send(data);
  });
};

// Retrieve all Types from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  Type.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving types.',
      });
    else res.send(data);
  });
};

// Find a single Type with an id
exports.findOne = (req, res) => {
  Type.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Type with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving Type with id ${req.params.id}, ${err}`,
        });
      }
    } else res.send(data);
  });
};

// Update a Type by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  Type.updateById(req.params.id, new Type(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Type with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error updating Type with id ${req.params.id}, ${err}`,
        });
      }
    } else res.send(data);
  });
};

// Delete a Type with the specified id in the request
exports.delete = (req, res) => {
  Type.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Type with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Type with id ' + req.params.id,
        });
      }
    } else res.send({ message: `Type was deleted successfully!` });
  });
};

// Delete all Types from the database.
exports.deleteAll = (req, res) => {
  Type.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all types.',
      });
    else res.send({ message: `All Types were deleted successfully!` });
  });
};
