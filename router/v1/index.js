const app = require('express')();
const { apiRoutes } = require('../../config/constants')
app.use(`/${apiRoutes.master.base}`, require('./master/index'))




module.exports = app
