const client = require('./db');
const Client = require('../models/client.model.js');

// constructor
const Invoice = function (invoice) {
  this.clientId = invoice.clientId;
  this.products = invoice.products;
};

Invoice.create = async (newInvoice, result) => {
  // Get discount by client
  let discount;
  try {
    discount = await getDiscount(newInvoice);
  } catch (err) {
    console.log(err);
    result(err, null);
    return;
  }
  // Create Invoice Details
  let totalInvoice, finalAmount;
  try {
    const res = await client.query(
      'INSERT INTO invoice (client_id) VALUES ($1) RETURNING id',
      [newInvoice.clientId]
    );
    const { rows, fields } = res;
    console.log(rows[0]);

    // Insert Details and get Total price value
    totalInvoice = await createDetail(newInvoice, rows[0].id, discount);
    console.log('Amount without every 100$ discount', totalInvoice);
    finalAmount = generalDiscount(totalInvoice);
    console.log('Amount with every 100$ discount', finalAmount);
    console.log('created Invoice: ', {
      id: rows[0].id,
      ...newInvoice,
      totalAmount: finalAmount,
    });
    result(null, { id: rows[0].id, ...newInvoice, totalAmount: finalAmount });
  } catch (err) {
    console.log(err);
    result(err, null);
    return;
  }
};
Invoice.getAll = (result) => {
  const query = `SELECT invoice.id invoice_id, SUM(invoice_detail.price) total FROM invoice 
                 INNER JOIN invoice_detail ON invoice.id = invoice_detail.invoice_id
                 GROUP BY invoice.id`;

  client.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    const { rows, fields } = res;
    const newRows = rows.map((row) => {
      return { invoice_id: row.invoice_id, total: generalDiscount(row.total) };
    });
    result(null, newRows);
  });
};

Invoice.getAllDetail = (clientName, result) => {
  let query = `SELECT client.name client_name, product.name product_name, category.name category_name, 
                    product.price product_price, invoice_detail.quantity, discount.percent, invoice_detail.price total
               FROM invoice INNER JOIN invoice_detail ON invoice.id = invoice_detail.invoice_id
               INNER JOIN client ON client.id = invoice.client_id
               INNER JOIN product ON product.id = invoice_detail.product_id
               INNER JOIN category ON category.id = product.category_id
               LEFT JOIN discount ON discount.id = invoice_detail.discount_id`;
  if (clientName) {
    query += ` WHERE LOWER(client.name) LIKE '%${clientName.toLowerCase()}%'`;
  }
  client.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    const { rows, fields } = res;
    console.log('invoice details: ', rows);
    result(null, rows);
  });
};

Invoice.remove = (id, result) => {
  client.query(
    `DELETE FROM invoice_detail WHERE invoice_id = ${id}`,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        return;
      }
      console.log(`deleted ${res.rowCount} invoice details`);
    }
  );
  client.query(`DELETE FROM invoice WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.rowCount == 0) {
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
    console.log(`deleted ${res.rowCount} invoice details`);
  });
  client.query('DELETE FROM invoice', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log(`deleted ${res.rowCount} invoices`);
    result(null, res);
  });
};

const getDiscount = async (newInvoice) => {
  let discount;
  const getClient = `SELECT type_id, created_at FROM client WHERE id = ${newInvoice.clientId}`;
  const getDiscount = `SELECT discount.id percent_id, discount.percent percent_value, discount.type_id, type.name percent_type
                         FROM discount INNER JOIN type ON type.id = discount.type_id`;

  // get client type and created date
  const clientRes = await client.query(getClient);
  if (!clientRes.rows[0])
    throw new Error(`Client with id ${newInvoice.clientId} is not found.`);

  const { type_id, created_at } = clientRes.rows[0];
  // get all discounts
  const discountRes = await client.query(getDiscount);
  const { percent_id, percent_value } =
    discountRes.rows.find((row) => row.type_id == type_id) || {};
  // Assign discount if appears
  discount = { id: percent_id, value: percent_value };
  // Get 2 years ago date from now...
  const compare_date = new Date();
  compare_date.setFullYear(compare_date.getFullYear() - 2);
  // If Client is not Afiliado or Employee, check if have more than 2 years been client...
  if (!discount.id && created_at < compare_date) {
    const { percent_id, percent_value } =
      discountRes.rows.find((row) =>
        row.percent_type.toLowerCase().includes('fidelidad')
      ) || {};
    discount = { id: percent_id, value: percent_value };
  }
  return discount;
};

const createDetail = async (newInvoice, invoiceId, discount) => {
  let totalInvoice = 0;
  const getProduct = `SELECT product.name, product.price, category.name category_name FROM product 
                      INNER JOIN category ON category.id = product.category_id WHERE product.id = $1`;
  const insertDetail =
    'INSERT INTO invoice_detail (invoice_id, discount_id, product_id, quantity, price) VALUES ($1, $2, $3, $4, $5) RETURNING id';

  await asyncForEach(newInvoice.products, async (item) => {
    // get product price
    const productRes = await client.query(getProduct, [item.productId]);
    if (!productRes.rows[0])
      throw new Error(`Product with id ${item.productId} is not found.`);

    const { name, price, category_name } = productRes.rows[0];
    console.log(
      `Product: ${name} | price = ${price} | category = ${category_name}`
    );
    // get discount by category
    const discount_id = category_name.toLowerCase().includes('comestible')
      ? undefined
      : discount.id;
    const discount_percent = category_name.toLowerCase().includes('comestible')
      ? 0
      : discount.value;
    // get product price with quantity and discount
    const totalPrice = price * item.quantity;
    const discountedPrice = totalPrice - (totalPrice * discount_percent) / 100;
    // sum value to total invoice
    totalInvoice += discountedPrice;

    const detail = await client.query(insertDetail, [
      invoiceId,
      discount_id,
      item.productId,
      item.quantity,
      discountedPrice,
    ]);
    console.log('created Invoice Detail: ', {
      detailId: detail.rows[0].id,
      invoiceId: invoiceId,
      discountValue: discount_percent,
      productName: name,
      productPrice: price,
      quantity: item.quantity,
      price: totalPrice,
      discountedPrice: discountedPrice,
    });
  });

  return totalInvoice;
};

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

const generalDiscount = (total) => {
  // for every $100 discounts of $5 apply.
  let times = Math.trunc(total / 100); //trunc() function returns only the integer portion of a number.
  return total - times * 5;
};

module.exports = Invoice;
