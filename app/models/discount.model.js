const client = require('./db');

// constructor
const Discount = function (discount) {
  this.percent = discount.percent;
  this.typeId = discount.typeId;
};

Discount.create = (newDiscount, result) => {
  client.query(
    'INSERT INTO discount (percent, type_id) VALUES ($1, $2) RETURNING id',
    [newDiscount.percent, newDiscount.typeId],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      const { rows, fields } = res;
      console.log('created Discount: ', { id: rows[0].id, ...newDiscount });
      result(null, { id: rows[0].id, ...newDiscount });
    }
  );
};

Discount.findById = (id, result) => {
  // Left join to include discounts without type...
  const query = `SELECT discount.id, discount.percent, type.name discount_type, discount.created_at 
                 FROM discount LEFT JOIN type ON discount.type_id = type.id WHERE discount.id = ${id}`;
  client.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    const { rows, fields } = res;
    if (rows.length) {
      console.log('found Discount: ', rows[0]);
      result(null, rows[0]);
      return;
    }
    // not found Discount with the id
    result({ kind: 'not_found' }, null);
  });
};

Discount.getAll = (typeId, typeName, result) => {
  // Left join to include discounts without type...
  let query = `SELECT discount.id, discount.percent, type.name discount_type, discount.created_at 
               FROM discount LEFT JOIN type ON discount.type_id = type.id`;
  if (typeName) {
    query += ` WHERE LOWER(type.name) LIKE '%${typeName.toLowerCase()}%'`;
  }
  if (typeId) {
    query += ` WHERE discount.type_id = ${typeId}`;
  }
  client.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    const { rows, fields } = res;
    console.log('discounts: ', rows);
    result(null, rows);
  });
};

Discount.updateById = (id, updateDiscount, result) => {
  client.query(
    'UPDATE discount SET percent = ($1), type_id = ($2) WHERE id = ($3)',
    [updateDiscount.percent, updateDiscount.typeId, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      if (res.rowCount == 0) {
        // not found Discount with the id
        result({ kind: 'not_found' }, null);
        return;
      }
      console.log('updated discount: ', { id: id, ...updateDiscount });
      result(null, { id: id, ...updateDiscount });
    }
  );
};

Discount.remove = (id, result) => {
  client.query(`DELETE FROM discount WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.rowCount == 0) {
      // not found Discount with the id
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('deleted Discount with id: ', id);
    result(null, res);
  });
};

Discount.removeAll = (result) => {
  client.query('DELETE FROM discount', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log(`deleted ${res.rowCount} discounts`);
    result(null, res);
  });
};

module.exports = Discount;
