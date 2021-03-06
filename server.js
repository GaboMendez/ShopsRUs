require('dotenv').config();
const express = require('express');
const cors = require('cors');
const types = require('pg').types;
const app = express();

// Get decimal columns from db as number
types.setTypeParser(1700, (val) => {
  return parseFloat(val);
});

var corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to ShopsRUs application.' });
});

require('./app/routes/category.routes')(app);
require('./app/routes/type.routes')(app);
require('./app/routes/client.routes')(app);
require('./app/routes/discount.routes')(app);
require('./app/routes/product.routes')(app);
require('./app/routes/invoice.routes')(app);

// set port, listen for requests
const PORT = process.env.SERVER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
