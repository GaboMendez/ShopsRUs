const client = require('./db');

// constructor
const Type = function (type) {
  this.name = type.name;
};

Type.create = (newCategory, result) => {
  client.query(
    'INSERT INTO type (name) VALUES ($1) RETURNING id',
    [newCategory.name],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      const { rows, fields } = res;
      console.log('created Type: ', { id: rows[0].id, ...newCategory });
      result(null, { id: rows[0].id, ...newCategory });
    }
  );
};

Type.findById = (id, result) => {
  client.query(`SELECT * FROM type WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    const { rows, fields } = res;
    if (rows.length) {
      console.log('found Type: ', rows[0]);
      result(null, rows[0]);
      return;
    }
    // not found Type with the id
    result({ kind: 'not_found' }, null);
  });
};

Type.getAll = (name, result) => {
  let query = 'SELECT * FROM type';
  if (name) {
    query += ` WHERE LOWER(name) LIKE '%${name.toLowerCase()}%'`;
  }
  client.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    const { rows, fields } = res;
    console.log('types: ', rows);
    result(null, rows);
  });
};

Type.updateById = (id, updateType, result) => {
  client.query(
    'UPDATE type SET name = ($1) WHERE id = ($2)',
    [updateType.name, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      if (res.rowCount == 0) {
        // not found Type with the id
        result({ kind: 'not_found' }, null);
        return;
      }
      console.log('updated type: ', { id: id, ...updateType });
      result(null, { id: id, ...updateType });
    }
  );
};

Type.remove = (id, result) => {
  client.query(`DELETE FROM type WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.rowCount == 0) {
      // not found Type with the id
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('deleted Type with id: ', id);
    result(null, res);
  });
};

Type.removeAll = (result) => {
  client.query('DELETE FROM type', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log(`deleted ${res.rowCount} types`);
    result(null, res);
  });
};

module.exports = Type;
