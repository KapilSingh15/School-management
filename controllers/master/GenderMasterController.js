const GenderMasterService = require("../../services/master/GenderMasterService");
const genderMasterService = new GenderMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new gender record
const ADD_GENDER = async (req, res) => {
    try {
        await genderMasterService.createGender(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Gender added successfully',
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

// Update an existing gender record
const UPDATE_GENDER = async (req, res) => {
    const { genderId } = req.params; // Assuming genderId is passed as a route parameter
    try {
        await genderMasterService.updateGender(genderId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Gender updated successfully',
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

// Delete a gender record
const DELETE_GENDER = async (req, res) => {
    const { genderId } = req.params; // Assuming genderId is passed as a route parameter
    try {
        await genderMasterService.deleteGender(genderId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Gender deleted successfully',
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

// Fetch gender records
const FETCH_GENDERS = async (req, res) => {
    try {
        const result = await genderMasterService.fetchGenders(req.query);
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
    ADD_GENDER,
    UPDATE_GENDER,
    DELETE_GENDER,
    FETCH_GENDERS
};
