const client = require('./db');

// constructor
const Invoice = function (invoice) {
  this.clientId = invoice.clientId;
  this.products = invoice.products;
};

Invoice.create = (newInvoice, result) => {
  console.log('newInvoice', newInvoice);
  client.query(
    'INSERT INTO invoice (client_id) VALUES ($1) RETURNING id',
    [newInvoice.client_id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      const { rows, fields } = res;
      console.log('created Invoice: ', { id: rows[0].id, ...newInvoice });
      result(null, { id: rows[0].id, ...newInvoice });
    }
  );
};

Invoice.getAll = (clientName, clientId, result) => {
  let sql = `SELECT invoice.id, invoice.name, category.name product_category, invoice.price, invoice.created_at 
               FROM invoice INNER JOIN category ON invoice.category_id = category.id`;

  client.query(sql, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    const { rows, fields } = res;
    console.log('invoices: ', rows);
    result(null, rows);
  });
};

Invoice.remove = (id, result) => {
  client.query(
    `DELETE FROM invoice_detail WHERE invoice_id = ${id}`,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Invoice with the id
        result({ kind: 'not_found' }, null);
        return;
      }
      console.log('deleted all Invoice details with id: ', id);
      result(null, res);
    }
  );
  client.query(`DELETE FROM invoice WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Invoice with the id
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('deleted Invoice with id: ', id);
    result(null, res);
  });
};

Invoice.removeAll = (result) => {
  client.query('DELETE FROM invoice_detail', (err, res) => {
    if (err) {
      console.log('error: ', err);
      return;
    }
    console.log('res', res);
    console.log(`deleted ${res.affectedRows} invoice details`);
  });
  client.query('DELETE FROM invoice', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log('res', res);
    console.log(`deleted ${res.affectedRows} invoices`);
    result(null, res);
  });
};

module.exports = Invoice;
