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
  // Left join to include clients without type...
  const sql = `SELECT client.id, client.name, type.name client_type, client.created_at 
                 FROM client LEFT JOIN type ON client.type_id = type.id WHERE client.id = ${id}`;
  client.query(sql, (err, res) => {
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
  // Left join to include clients without type...
  let sql = `SELECT client.id, client.name, type.name client_type, client.created_at 
               FROM client LEFT JOIN type ON client.type_id = type.id`;
  if (name) {
    sql += ` WHERE LOWER(client.name) LIKE '%${name.toLowerCase()}%'`;
  }
  client.query(sql, (err, res) => {
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

Client.updateById = (id, updateClient, result) => {
  client.query(
    'UPDATE client SET name = ($1), type_id = ($2) WHERE id = ($3)',
    [updateClient.name, updateClient.typeId, id],
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
      console.log('updated client: ', { id: id, ...updateClient });
      result(null, { id: id, ...updateClient });
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
