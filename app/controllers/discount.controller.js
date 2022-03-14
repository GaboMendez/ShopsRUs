const Discount = require('../models/discount.model.js');

// Create and Save a new Discount
exports.create = (req, res) => {
  // Validate request
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }
  // Create a Discount
  const discount = new Discount({
    percent: req.body.percent,
    typeId: req.body.typeId,
  });
  // Save Discount in the database
  Discount.create(discount, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Discount.',
      });
    else res.send(data);
  });
};

// Retrieve all discounts from the database.
exports.findAll = (req, res) => {
  const typeId = req.query.typeId;
  const typeName = req.query.typeName;
  if (typeId && typeName) {
    res.status(500).send({
      message: 'Filter by type_id or type_name but not both of them',
    });
    return;
  }
  Discount.getAll(typeId, typeName, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving discounts.',
      });
    else res.send(data);
  });
};

// Find a single Discount with an id
exports.findOne = (req, res) => {
  Discount.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Discount with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving Discount with id ${req.params.id}, ${err}`,
        });
      }
    } else res.send(data);
  });
};

// Update a Discount by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }
  Discount.updateById(req.params.id, new Discount(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Discount with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error updating Discount with id ${req.params.id}, ${err}`,
        });
      }
    } else res.send(data);
  });
};

// Delete a Discount with the specified id in the request
exports.delete = (req, res) => {
  Discount.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Discount with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Discount with id ' + req.params.id,
        });
      }
    } else res.send({ message: `Discount was deleted successfully!` });
  });
};

// Delete all discounts from the database.
exports.deleteAll = (req, res) => {
  Discount.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all discounts.',
      });
    else res.send({ message: `All Discounts were deleted successfully!` });
  });
};
