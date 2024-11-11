const RegistrationTypeMasterService = require("../../services/master/RegistrationTypeMasterService");
const registrationTypeMasterService = new RegistrationTypeMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new registration type record
const ADD_REGISTRATION_TYPE = async (req, res) => {
    try {
        await registrationTypeMasterService.createRegistrationType(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Registration type added successfully',
            },
            httpStatus.OK
        );
    } catch (error) {
        return Response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR", ex: error.message },
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

// Update an existing registration type record
const UPDATE_REGISTRATION_TYPE = async (req, res) => {
    const { registrationTypeId } = req.params; // Assuming registrationTypeId is passed as a route parameter
    try {
        await registrationTypeMasterService.updateRegistrationType(registrationTypeId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Registration type updated successfully',
            },
            httpStatus.OK
        );
    } catch (error) {
        return Response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR", ex: error.message },
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

// Delete a registration type record
const DELETE_REGISTRATION_TYPE = async (req, res) => {
    const { registrationTypeId } = req.params; // Assuming registrationTypeId is passed as a route parameter
    try {
        await registrationTypeMasterService.deleteRegistrationType(registrationTypeId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Registration type deleted successfully',
            },
            httpStatus.OK
        );
    } catch (error) {
        return Response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR", ex: error.message },
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

// Fetch registration type records
const FETCH_REGISTRATION_TYPES = async (req, res) => {
    try {
        const result = await registrationTypeMasterService.fetchRegistrationTypes(req.query);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: result,
            },
            httpStatus.OK
        );
    } catch (error) {
        return Response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR", ex: error.message },
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

module.exports = {
    ADD_REGISTRATION_TYPE,
    UPDATE_REGISTRATION_TYPE,
    DELETE_REGISTRATION_TYPE,
    FETCH_REGISTRATION_TYPES
};
