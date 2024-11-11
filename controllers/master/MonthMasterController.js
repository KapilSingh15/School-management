const MonthMasterService = require("../../services/master/MonthMasterService");
const monthMasterService = new MonthMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new month record
const ADD_MONTH = async (req, res) => {
    try {
        await monthMasterService.createMonth(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Month added successfully',
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

// Update an existing month record
const UPDATE_MONTH = async (req, res) => {
    const { monthId } = req.params; // Assuming monthId is passed as a route parameter
    try {
        await monthMasterService.updateMonth(monthId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Month updated successfully',
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

// Delete a month record
const DELETE_MONTH = async (req, res) => {
    const { monthId } = req.params; // Assuming monthId is passed as a route parameter
    try {
        await monthMasterService.deleteMonth(monthId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Month deleted successfully',
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

// Fetch month records
const FETCH_MONTHS = async (req, res) => {
    try {
        const result = await monthMasterService.fetchMonths(req.query);
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
    ADD_MONTH,
    UPDATE_MONTH,
    DELETE_MONTH,
    FETCH_MONTHS
};
