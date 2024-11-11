const ResultMasterService = require("../../services/master/ResultMasterService");
const resultMasterService = new ResultMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new result record
const ADD_RESULT = async (req, res) => {
    try {
        await resultMasterService.createResult(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Result added successfully',
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

// Update an existing result record
const UPDATE_RESULT = async (req, res) => {
    const { resultId } = req.params; // Assuming resultId is passed as a route parameter
    try {
        await resultMasterService.updateResult(resultId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Result updated successfully',
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

// Delete a result record
const DELETE_RESULT = async (req, res) => {
    const { resultId } = req.params; // Assuming resultId is passed as a route parameter
    try {
        await resultMasterService.deleteResult(resultId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Result deleted successfully',
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

// Fetch result records
const FETCH_RESULTS = async (req, res) => {
    try {
        const result = await resultMasterService.fetchResults(req.query);
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
    ADD_RESULT,
    UPDATE_RESULT,
    DELETE_RESULT,
    FETCH_RESULTS
};
