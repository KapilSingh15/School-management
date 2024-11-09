const response = require('../response/index');
const httpStatus = require('http-status');

const validate = (schema, source = 'body') => (req, res, next) => {
    const data = req[source];
    const { error } = schema.validate(data);
    const valid = error == null;
    if (valid) {
        return next();
    }
    else {
        const { details } = error;
        const message = details.map((i) => i.message).join(',');
        return response.error(req, res, { msgCode: message }, httpStatus.BAD_REQUEST
        );
    }
}

module.exports = {
    validate
};
