const FeeHeadMonthMasterService = require("../../services/master/FeeHeadMonthMasterService");
const feeHeadMonthMasterService = new FeeHeadMonthMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new fee head month record
const ADD_FEE_HEAD_MONTH = async (req, res) => {
    try {
        await feeHeadMonthMasterService.createFeeHeadMonth(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Fee head month added successfully',
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

// Update an existing fee head month record
const UPDATE_FEE_HEAD_MONTH = async (req, res) => {
    const { feeHeadMonthId } = req.params; // Assuming feeHeadMonthId is passed as a route parameter
    try {
        await feeHeadMonthMasterService.updateFeeHeadMonth(feeHeadMonthId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Fee head month updated successfully',
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

// Delete a fee head month record
const DELETE_FEE_HEAD_MONTH = async (req, res) => {
    const { feeHeadMonthId } = req.params; // Assuming feeHeadMonthId is passed as a route parameter
    try {
        await feeHeadMonthMasterService.deleteFeeHeadMonth(feeHeadMonthId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Fee head month deleted successfully',
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

// Fetch fee head month records
const FETCH_FEE_HEAD_MONTHS = async (req, res) => {
    try {
        const result = await feeHeadMonthMasterService.fetchFeeHeadMonths(req.query);
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
    ADD_FEE_HEAD_MONTH,
    UPDATE_FEE_HEAD_MONTH,
    DELETE_FEE_HEAD_MONTH,
    FETCH_FEE_HEAD_MONTHS
};
