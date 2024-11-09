const HttpStatus = require('http-status');
const response = require('../response/index');

// Method not allowed error middleware.
exports.methodNotAllowed = (req, res) => {
  return response.error(req, res, {
    msgCode: 'INVALID_ROUTE'
  }, HttpStatus.METHOD_NOT_ALLOWED)
};

// Generic error response middleware for validation and internal server errors.
exports.genericErrorHandler = (err, req, res) => {
  let error;
  if (err.isJoi) {
    error = {
      code: HttpStatus.BAD_REQUEST,
      details: err.details ?
        err.details.map((e) => ({
          message: e.message,
          param: e.path.join('.')
        })) :
        err.errors.map((e) => e.messages.join('. ')).join(' and ')
    };
  }
  else if (err.status === undefined && err.response && err.response.data) {
    ({ error } = err.response.data);
  }
  else if (err.status < 500) {
    error = {code: err.status};
  }
  else {
    // Return INTERNAL_SERVER_ERROR for all other cases
    error = {code: HttpStatus.INTERNAL_SERVER_ERROR};
  }
  return response.error(req, res, {msgCode: error.code}, HttpStatus.INTERNAL_SERVER_ERROR)
};

exports.notFound = (req, res) => {
  return response.error(req, res, {msgCode: HttpStatus.NOT_FOUND},HttpStatus.NOT_FOUND)
};