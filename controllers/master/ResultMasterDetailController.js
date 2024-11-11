const ResultMasterDetailService = require("../../services/master/ResultMasterDetailService");
const resultMasterDetailService = new ResultMasterDetailService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new result master detail record
const ADD_RESULT_MASTER_DETAIL = async (req, res) => {
    try {
        await resultMasterDetailService.createResultMasterDetail(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Result master detail added successfully',
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

// Update an existing result master detail record
const UPDATE_RESULT_MASTER_DETAIL = async (req, res) => {
    const { resultMasterDetailId } = req.params; // Assuming resultMasterDetailId is passed as a route parameter
    try {
        await resultMasterDetailService.updateResultMasterDetail(resultMasterDetailId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Result master detail updated successfully',
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

// Delete a result master detail record
const DELETE_RESULT_MASTER_DETAIL = async (req, res) => {
    const { resultMasterDetailId } = req.params; // Assuming resultMasterDetailId is passed as a route parameter
    try {
        await resultMasterDetailService.deleteResultMasterDetail(resultMasterDetailId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Result master detail deleted successfully',
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

// Fetch result master detail records
const FETCH_RESULT_MASTER_DETAILS = async (req, res) => {
    try {
        const result = await resultMasterDetailService.fetchResultMasterDetails(req.query);
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
    ADD_RESULT_MASTER_DETAIL,
    UPDATE_RESULT_MASTER_DETAIL,
    DELETE_RESULT_MASTER_DETAIL,
    FETCH_RESULT_MASTER_DETAILS
};
