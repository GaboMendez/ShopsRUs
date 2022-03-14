const client = require('./db');

// constructor
const Client = function (client) {
  this.name = client.name;
  this.typeId = client.typeId;
};

Client.create = (newClient, result) => {
  client.query(
    'INSERT INTO client (name, type_id) VALUES ($1, $2) RETURNING id',
    [newClient.name, newClient.typeId],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      const { rows, fields } = res;
      console.log('created Client: ', { id: rows[0].id, ...newClient });
      result(null, { id: rows[0].id, ...newClient });
    }
  );
};

Client.findById = (id, result) => {
  client.query(`SELECT * FROM client WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    const { rows, fields } = res;
    if (rows.length) {
      console.log('found Client: ', rows[0]);
      result(null, rows[0]);
      return;
    }
    // not found Client with the id
    result({ kind: 'not_found' }, null);
  });
};

Client.getAll = (name, result) => {
  let query = 'SELECT * FROM client';
  if (name) {
    query += ` WHERE LOWER(name) LIKE '%${name.toLowerCase()}%'`;
  }
  client.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    const { rows, fields } = res;
    console.log('clients: ', rows);
    result(null, rows);
  });
};

Client.updateById = (id, client, result) => {
  client.query(
    'UPDATE client SET name = ($1), type_id = ($2) WHERE id = ($3)',
    [client.name, client.typeId, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Client with the id
        result({ kind: 'not_found' }, null);
        return;
      }
      console.log('updated client: ', { id: id, ...client });
      result(null, { id: id, ...client });
    }
  );
};

Client.remove = (id, result) => {
  client.query(`DELETE FROM client WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Client with the id
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('deleted Client with id: ', id);
    result(null, res);
  });
};

Client.removeAll = (result) => {
  client.query('DELETE FROM client', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} clients`);
    result(null, res);
  });
};

module.exports = Client;
