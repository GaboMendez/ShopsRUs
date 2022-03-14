const client = require('./db');

// constructor
const Product = function (product) {
  this.name = product.name;
  this.categoryId = product.categoryId;
  this.price = product.price;
};

Product.create = (newProduct, result) => {
  client.query(
    'INSERT INTO product (name, category_id, price) VALUES ($1, $2, $3) RETURNING id',
    [newProduct.name, newProduct.categoryId, newProduct.price],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      const { rows, fields } = res;
      console.log('created Product: ', { id: rows[0].id, ...newProduct });
      result(null, { id: rows[0].id, ...newProduct });
    }
  );
};

Product.findById = (id, result) => {
  const sql = `SELECT product.id, product.name, category.name product_category, product.price, product.created_at 
                 FROM product INNER JOIN category ON product.category_id = category.id WHERE product.id = ${id}`;
  client.query(sql, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    const { rows, fields } = res;
    if (rows.length) {
      console.log('found Product: ', rows[0]);
      result(null, rows[0]);
      return;
    }
    // not found Product with the id
    result({ kind: 'not_found' }, null);
  });
};

Product.getAll = (name, categoryName, categoryId, result) => {
  let sql = `SELECT product.id, product.name, category.name product_category, product.price, product.created_at 
               FROM product INNER JOIN category ON product.category_id = category.id`;
  if (name) {
    sql += ` WHERE LOWER(product.name) LIKE '%${name.toLowerCase()}%'`;
  } else if (categoryName || categoryId) {
    sql += ` WHERE ${
      categoryName
        ? `LOWER(category.name) LIKE '%${categoryName.toLowerCase()}%'`
        : `category.id = ${categoryId}`
    }`;
  }
  client.query(sql, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    const { rows, fields } = res;
    console.log('products: ', rows);
    result(null, rows);
  });
};

Product.updateById = (id, updateProduct, result) => {
  const sql = updateProduct.price
    ? 'UPDATE product SET name = ($1), category_id = ($2), price = ($3) WHERE id = ($4)'
    : 'UPDATE product SET name = ($1), category_id = ($2) WHERE id = ($3)';
  const values = updateProduct.price
    ? [updateProduct.name, updateProduct.categoryId, updateProduct.price, id]
    : [updateProduct.name, updateProduct.categoryId, id];
  client.query(sql, values, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Product with the id
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('updated product: ', { id: id, ...updateProduct });
    result(null, { id: id, ...updateProduct });
  });
};

Product.remove = (id, result) => {
  client.query(`DELETE FROM product WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Product with the id
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('deleted Product with id: ', id);
    result(null, res);
  });
};

Product.removeAll = (result) => {
  client.query('DELETE FROM product', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log(`deleted ${res.affectedRows} products`);
    result(null, res);
  });
};

module.exports = Product;
