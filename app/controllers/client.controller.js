const Client = require('../models/client.model.js');

// Create and Save a new Client
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  // Create a Client
  const client = new Client({
    name: req.body.name,
    typeId: req.body.typeId,
  });
  // Save Client in the database
  Client.create(client, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Client.',
      });
    else res.send(data);
  });
};

// Retrieve all Clients from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  Client.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.',
      });
    else res.send(data);
  });
};

// Find a single Client with an id
exports.findOne = (req, res) => {
  Client.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Client with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Client with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Update a Client by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  console.log(req.body);
  Client.updateById(req.params.id, new Client(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Client with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error updating Client with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Client with the specified id in the request
exports.delete = (req, res) => {
  Client.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Client with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Client with id ' + req.params.id,
        });
      }
    } else res.send({ message: `Client was deleted successfully!` });
  });
};

// Delete all Clients from the database.
exports.deleteAll = (req, res) => {
  Client.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all tutorials.',
      });
    else res.send({ message: `All Tutorials were deleted successfully!` });
  });
};
