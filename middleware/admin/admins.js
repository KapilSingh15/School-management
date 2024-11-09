const errorHandler = require('../error-handler');
const { verifyApiKey, verifyAccessToken } = require('./admins_auth');
const { validate } = require('../request-validator');

module.exports = {
  verifyApiKey,
  verifyAccessToken,
  validate,
  errorHandler
};