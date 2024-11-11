const QuarterMasterDetailService = require("../../services/master/QuarterMasterDetailService");
const quarterMasterDetailService = new QuarterMasterDetailService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new quarter master detail record
const ADD_QUARTER_MASTER_DETAIL = async (req, res) => {
    try {
        await quarterMasterDetailService.createQuarterMasterDetail(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Quarter master detail added successfully',
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

// Update an existing quarter master detail record
const UPDATE_QUARTER_MASTER_DETAIL = async (req, res) => {
    const { quarterMasterDetailId } = req.params; // Assuming quarterMasterDetailId is passed as a route parameter
    try {
        await quarterMasterDetailService.updateQuarterMasterDetail(quarterMasterDetailId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Quarter master detail updated successfully',
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

// Delete a quarter master detail record
const DELETE_QUARTER_MASTER_DETAIL = async (req, res) => {
    const { quarterMasterDetailId } = req.params; // Assuming quarterMasterDetailId is passed as a route parameter
    try {
        await quarterMasterDetailService.deleteQuarterMasterDetail(quarterMasterDetailId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Quarter master detail deleted successfully',
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

// Fetch quarter master detail records
const FETCH_QUARTER_MASTER_DETAILS = async (req, res) => {
    try {
        const result = await quarterMasterDetailService.fetchQuarterMasterDetails(req.query);
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
    ADD_QUARTER_MASTER_DETAIL,
    UPDATE_QUARTER_MASTER_DETAIL,
    DELETE_QUARTER_MASTER_DETAIL,
    FETCH_QUARTER_MASTER_DETAILS
};
