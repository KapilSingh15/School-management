const ReligionMasterService = require("../../services/master/ReligionMasterService");
const religionMasterService = new ReligionMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new religion record
const ADD_RELIGION = async (req, res) => {
    try {
        await religionMasterService.createReligion(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Religion added successfully',
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

// Update an existing religion record
const UPDATE_RELIGION = async (req, res) => {
    const { religionId } = req.params; // Assuming religionId is passed as a route parameter
    try {
        await religionMasterService.updateReligion(religionId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Religion updated successfully',
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

// Delete a religion record
const DELETE_RELIGION = async (req, res) => {
    const { religionId } = req.params; // Assuming religionId is passed as a route parameter
    try {
        await religionMasterService.deleteReligion(religionId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Religion deleted successfully',
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

// Fetch religion records
const FETCH_RELIGIONS = async (req, res) => {
    try {
        const result = await religionMasterService.fetchReligions(req.query);
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
    ADD_RELIGION,
    UPDATE_RELIGION,
    DELETE_RELIGION,
    FETCH_RELIGIONS
};
