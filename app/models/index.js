const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  define: {
    freezeTableName: true,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.category = require('./category.model.js')(sequelize, Sequelize);
db.type = require('./type.model.js')(sequelize, Sequelize);
module.exports = db;
