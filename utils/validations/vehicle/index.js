const Joi = require('joi');

const dateTimeFormat = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
const resourceSchema = Joi.object({
    MfgYear: Joi.string().required().messages({
        'any.required': 'MfgYear is required'
    }),
    VehicleNo: Joi.string().required().messages({
        'any.required': 'VehicleNo is required'
    }),
    VehicleMake: Joi.string().required().messages({
        'any.required': 'VehicleMake is required'
    }),
    EngineNo: Joi.string().required().messages({
        'any.required': 'EngineNo is required'
    }),
    ChasisNo: Joi.string().required().messages({
        'any.required': 'ChasisNo is required'
    }),
    VehicleModel: Joi.string().required().messages({
        'any.required': 'VehicleModel is required'
    }),
    FitnessDate: Joi.string().pattern(dateTimeFormat).required().messages({
        'string.pattern.base': 'FromTime must be in yyyy-mm-dd hh:mm:ss format'
    }),
    CreatedBy: Joi.string().required().messages({
        'any.required': 'CreatedBy is required'
    }),
    fk_VehicleTypeId: Joi.number().integer().required().messages({
        'number.base': 'Vehicle Type must be a number',
        'number.integer': 'Vehicle Type must be an integer',
        'any.required': 'Vehicle Type is required'
    }),
    fk_CompanyId: Joi.number().integer().required().messages({
        'number.base': 'Company must be a number',
        'number.integer': 'Company must be an integer',
        'any.required': 'Company is required'
    }),
    fk_UserId: Joi.number().integer().required().messages({
        'number.base': 'User must be a number',
        'number.integer': 'User must be an integer',
        'any.required': 'User is required'
    }),
    VehicleType: Joi.string().required().messages({
        'any.required': 'VehicleType is required'
    }),
});

function validateAdminVehicleData(req, res, next) {
    const { error } = resourceSchema.validate(req.body, { convert: false });
    if (error) {
        return res.status(400).json({ message: "Validation error", details: error.details });
    }
    next();
}


const updateResourceSchema = Joi.object({
    MfgYear: Joi.string().optional().messages({
        'any.required': 'MfgYear is required'
    }),
    VehicleNo: Joi.string().optional().messages({
        'any.required': 'VehicleNo is required'
    }),
    VehicleMake: Joi.string().optional().messages({
        'any.required': 'VehicleMake is required'
    }),
    EngineNo: Joi.string().optional().messages({
        'any.required': 'EngineNo is required'
    }),
    ChasisNo: Joi.string().optional().messages({
        'any.required': 'ChasisNo is required'
    }),
    VehicleModel: Joi.string().optional().messages({
        'any.required': 'VehicleModel is required'
    }),
    FitnessDate: Joi.string().pattern(dateTimeFormat).optional().messages({
        'string.pattern.base': 'FitnessDate must be in yyyy-mm-dd hh:mm:ss format'
    }),
    CreatedBy: Joi.string().optional().messages({
        'any.required': 'CreatedBy is required'
    }),
    fk_VehicleTypeId: Joi.number().integer().optional().messages({
        'number.base': 'Vehicle Type must be a number',
        'number.integer': 'Vehicle Type must be an integer',
        'any.required': 'Vehicle Type is required'
    }),
    fk_CompanyId: Joi.number().integer().optional().messages({
        'number.base': 'Company must be a number',
        'number.integer': 'Company must be an integer',
        'any.required': 'Company is required'
    }),
    fk_UserId: Joi.number().integer().optional().messages({
        'number.base': 'User must be a number',
        'number.integer': 'User must be an integer',
        'any.required': 'User is required'
    }),
    VehicleType: Joi.string().optional().messages({
        'any.required': 'VehicleType is required'
    }),
    UpdatedBy: Joi.string().required().messages({
        'any.required': 'UpdatedBy is required'
    }),
});

function validateUpdateVehicleData(req, res, next) {
    const { error } = updateResourceSchema.validate(req.body, { convert: false });
    if (error) {
        return res.status(400).json({ message: "Validation error", details: error.details });
    }
    next();
}




module.exports = {
    validateAdminVehicleData , validateUpdateVehicleData
};
