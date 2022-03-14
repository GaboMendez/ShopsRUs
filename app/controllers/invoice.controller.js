const Invoice = require('../models/invoice.model.js');

// Create and Save a new Invoice
exports.create = (req, res) => {
  // Validate request
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }
  for (var key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      let value = req.body[key];
      console.log(`value for ${key} is ${value}`);
    }
  }
  // Create a Invoice
  const invoice = new Invoice({
    clientId: req.body.clientId,
    products: req.body.products,
  });
  // Save Invoice in the database
  Invoice.create(invoice, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving clients.',
      });
    else res.send(data);
  });
};

// Retrieve all Invoices from the database.
exports.findAll = (req, res) => {
  const clientName = req.query.clientName;
  const clientId = req.query.clientId;
  Invoice.getAll(clientName, clientId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving invoices.',
      });
    else res.send(data);
  });
};

// Delete a Invoice with the specified id in the request
exports.delete = (req, res) => {
  Invoice.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Invoice with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Invoice with id ' + req.params.id,
        });
      }
    } else res.send({ message: `Invoice was deleted successfully!` });
  });
};

// Delete all Invoices from the database.
exports.deleteAll = (req, res) => {
  Invoice.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all invoices.',
      });
    else res.send({ message: `All Invoices were deleted successfully!` });
  });
};
