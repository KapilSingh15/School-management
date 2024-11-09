require('dotenv').config();
var config = require('../config/db.connection'); 
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: false,
        trustServerCertificate: process.env.NODE_ENV === 'development',
        enableArithAbort: true
      }
    },
    logging: process.env.NODE_ENV === 'development' ? console.log : false
  });
  

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize; 
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});

db.schoolDetail = require("./master/schooldetail")(sequelize, Sequelize);
db.AccountTypeMaster = require("./master/AccountTypeMaster")(sequelize, Sequelize);
module.exports = db;
