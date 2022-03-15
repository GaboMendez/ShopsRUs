const Invoice = require('../models/invoice.model.js');

// Create and Save a new Invoice
exports.create = (req, res) => {
  // Validate request
  if (!req.body.clientId || !req.body.products) {
    res.status(400).send({
      message: 'Invalid keys properties for this request or Content is empty!',
    });
    return;
  }
  // Create a Invoice
  const invoice = new Invoice({
    clientId: req.body.clientId,
    products: req.body.products,
  });
  // Validate products
  if (!Array.isArray(invoice.products)) {
    res.status(400).send({
      message: 'You must provide an array of products',
    });
    return;
  }
  if (invoice.products.length == 0) {
    res.status(400).send({
      message: 'You must provide products of your purchase',
    });
    return;
  }

  let keyError = 0,
    typeError = 0;
  invoice.products.forEach((product) => {
    const keys = Object.keys(product);
    const values = Object.values(product);
    if (!keys.includes('productId') || !keys.includes('quantity'))
      productError++;

    if (!values.every((item) => typeof item === 'number')) typeError++;
  });
  if (keyError > 0) {
    res.status(400).send({
      message:
        'You must use [productId] and [quantity] properties in product object',
    });
    return;
  }
  if (typeError > 0) {
    res.status(400).send({
      message:
        'You must use numeric values for [productId] and [quantity] properties in product object',
    });
    return;
  }

  // Save Invoice in the database
  Invoice.create(invoice, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving invoices.',
      });
    else res.send(data);
  });
};

// Retrieve all Invoices from the database.
exports.findAll = (req, res) => {
  Invoice.getAll(req.params.id, (err, data) => {
    if (err)
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Invoice with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving invoices.',
        });
      }
    else res.send(data);
  });
};

// Retrieve all Invoices Detail from the database.
exports.findAllDetail = (req, res) => {
  const clientName = req.query.clientName;
  Invoice.getAllDetail(clientName, (err, data) => {
    if (err)
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Invoice Details with client name ${clientName}.`,
        });
      } else {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving invoices.',
        });
      }
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
