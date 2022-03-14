const client = require('./db');

// constructor
const Category = function (category) {
  this.name = category.name;
};

Category.create = (newCategory, result) => {
  client.query(
    'INSERT INTO category (name) VALUES ($1) RETURNING id',
    [newCategory.name],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      const { rows, fields } = res;
      console.log('created Category: ', { id: rows[0].id, ...newCategory });
      result(null, { id: rows[0].id, ...newCategory });
    }
  );
};

Category.findById = (id, result) => {
  client.query(`SELECT * FROM category WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    const { rows, fields } = res;
    if (rows.length) {
      console.log('found Category: ', rows[0]);
      result(null, rows[0]);
      return;
    }
    // not found Category with the id
    result({ kind: 'not_found' }, null);
  });
};

Category.getAll = (name, result) => {
  let query = 'SELECT * FROM category';
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
    console.log('categories: ', rows);
    result(null, rows);
  });
};

Category.updateById = (id, updateCategory, result) => {
  client.query(
    'UPDATE category SET name = ($1) WHERE id = ($2)',
    [updateCategory.name, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      if (res.rowCount == 0) {
        // not found Category with the id
        result({ kind: 'not_found' }, null);
        return;
      }
      console.log('updated category: ', { id: id, ...updateCategory });
      result(null, { id: id, ...updateCategory });
    }
  );
};

Category.remove = (id, result) => {
  client.query(`DELETE FROM category WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.rowCount == 0) {
      // not found Category with the id
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('deleted Category with id: ', id);
    result(null, res);
  });
};

Category.removeAll = (result) => {
  client.query('DELETE FROM category', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log(`deleted ${res.rowCount} categories`);
    result(null, res);
  });
};

module.exports = Category;
