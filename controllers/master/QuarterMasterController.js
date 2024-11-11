const QuarterMasterService = require("../../services/master/QuarterMasterService");
const quarterMasterService = new QuarterMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new quarter record
const ADD_QUARTER = async (req, res) => {
    try {
        await quarterMasterService.createQuarter(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Quarter added successfully',
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

// Update an existing quarter record
const UPDATE_QUARTER = async (req, res) => {
    const { quarterId } = req.params; // Assuming quarterId is passed as a route parameter
    try {
        await quarterMasterService.updateQuarter(quarterId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Quarter updated successfully',
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

// Delete a quarter record
const DELETE_QUARTER = async (req, res) => {
    const { quarterId } = req.params; // Assuming quarterId is passed as a route parameter
    try {
        await quarterMasterService.deleteQuarter(quarterId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Quarter deleted successfully',
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

// Fetch quarter records
const FETCH_QUARTERS = async (req, res) => {
    try {
        const result = await quarterMasterService.fetchQuarters(req.query);
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
    ADD_QUARTER,
    UPDATE_QUARTER,
    DELETE_QUARTER,
    FETCH_QUARTERS
};
