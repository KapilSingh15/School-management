const RegistrationFeeMasterService = require("../../services/master/RegistrationFeeMasterService");
const registrationFeeMasterService = new RegistrationFeeMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new registration fee record
const ADD_REGISTRATION_FEE = async (req, res) => {
    try {
        await registrationFeeMasterService.createRegistrationFee(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Registration fee added successfully',
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

// Update an existing registration fee record
const UPDATE_REGISTRATION_FEE = async (req, res) => {
    const { registrationFeeId } = req.params; // Assuming registrationFeeId is passed as a route parameter
    try {
        await registrationFeeMasterService.updateRegistrationFee(registrationFeeId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Registration fee updated successfully',
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

// Delete a registration fee record
const DELETE_REGISTRATION_FEE = async (req, res) => {
    const { registrationFeeId } = req.params; // Assuming registrationFeeId is passed as a route parameter
    try {
        await registrationFeeMasterService.deleteRegistrationFee(registrationFeeId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Registration fee deleted successfully',
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

// Fetch registration fee records
const FETCH_REGISTRATION_FEES = async (req, res) => {
    try {
        const result = await registrationFeeMasterService.fetchRegistrationFees(req.query);
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
    ADD_REGISTRATION_FEE,
    UPDATE_REGISTRATION_FEE,
    DELETE_REGISTRATION_FEE,
    FETCH_REGISTRATION_FEES
};
