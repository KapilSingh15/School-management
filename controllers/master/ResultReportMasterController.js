const ResultReportMasterService = require("../../services/master/ResultReportMasterService");
const resultReportMasterService = new ResultReportMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new result report master record
const ADD_RESULT_REPORT = async (req, res) => {
    try {
        await resultReportMasterService.createResultReport(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Result report added successfully',
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

// Update an existing result report master record
const UPDATE_RESULT_REPORT = async (req, res) => {
    const { resultReportId } = req.params; // Assuming resultReportId is passed as a route parameter
    try {
        await resultReportMasterService.updateResultReport(resultReportId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Result report updated successfully',
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

// Delete a result report master record
const DELETE_RESULT_REPORT = async (req, res) => {
    const { resultReportId } = req.params; // Assuming resultReportId is passed as a route parameter
    try {
        await resultReportMasterService.deleteResultReport(resultReportId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Result report deleted successfully',
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

// Fetch result report master records
const FETCH_RESULT_REPORTS = async (req, res) => {
    try {
        const result = await resultReportMasterService.fetchResultReports(req.query);
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
    ADD_RESULT_REPORT,
    UPDATE_RESULT_REPORT,
    DELETE_RESULT_REPORT,
    FETCH_RESULT_REPORTS
};
