const QuotaMasterService = require("../../services/master/QuotaMasterService");
const quotaMasterService = new QuotaMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new quota record
const ADD_QUOTA = async (req, res) => {
    try {
        await quotaMasterService.createQuota(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Quota added successfully',
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

// Update an existing quota record
const UPDATE_QUOTA = async (req, res) => {
    const { quotaId } = req.params; // Assuming quotaId is passed as a route parameter
    try {
        await quotaMasterService.updateQuota(quotaId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Quota updated successfully',
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

// Delete a quota record
const DELETE_QUOTA = async (req, res) => {
    const { quotaId } = req.params; // Assuming quotaId is passed as a route parameter
    try {
        await quotaMasterService.deleteQuota(quotaId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Quota deleted successfully',
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

// Fetch quota records
const FETCH_QUOTAS = async (req, res) => {
    try {
        const result = await quotaMasterService.fetchQuotas(req.query);
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
    ADD_QUOTA,
    UPDATE_QUOTA,
    DELETE_QUOTA,
    FETCH_QUOTAS
};
