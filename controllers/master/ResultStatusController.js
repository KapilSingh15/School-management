const ResultStatusService = require("../../services/master/ResultStatusService");
const resultStatusService = new ResultStatusService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new result status record
const ADD_RESULT_STATUS = async (req, res) => {
    try {
        await resultStatusService.createResultStatus(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Result status added successfully',
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

// Update an existing result status record
const UPDATE_RESULT_STATUS = async (req, res) => {
    const { resultStatusId } = req.params; // Assuming resultStatusId is passed as a route parameter
    try {
        await resultStatusService.updateResultStatus(resultStatusId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Result status updated successfully',
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

// Delete a result status record
const DELETE_RESULT_STATUS = async (req, res) => {
    const { resultStatusId } = req.params; // Assuming resultStatusId is passed as a route parameter
    try {
        await resultStatusService.deleteResultStatus(resultStatusId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Result status deleted successfully',
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

// Fetch result status records
const FETCH_RESULT_STATUSES = async (req, res) => {
    try {
        const result = await resultStatusService.fetchResultStatuses(req.query);
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
    ADD_RESULT_STATUS,
    UPDATE_RESULT_STATUS,
    DELETE_RESULT_STATUS,
    FETCH_RESULT_STATUSES
};
