const FeeBalanceMasterService = require("../../services/master/FeeBalanceMasterService");
const feeBalanceMasterService = new FeeBalanceMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new fee balance record
const ADD_FEE_BALANCE = async (req, res) => {
    try {
        await feeBalanceMasterService.createFeeBalance(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Fee balance added successfully',
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

// Update an existing fee balance record
const UPDATE_FEE_BALANCE = async (req, res) => {
    const { feeBalanceId } = req.params; // Assuming feeBalanceId is passed as a route parameter
    try {
        await feeBalanceMasterService.updateFeeBalance(feeBalanceId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Fee balance updated successfully',
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

// Delete a fee balance record
const DELETE_FEE_BALANCE = async (req, res) => {
    const { feeBalanceId } = req.params; // Assuming feeBalanceId is passed as a route parameter
    try {
        await feeBalanceMasterService.deleteFeeBalance(feeBalanceId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Fee balance deleted successfully',
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

// Fetch fee balance records
const FETCH_FEE_BALANCES = async (req, res) => {
    try {
        const result = await feeBalanceMasterService.fetchFeeBalances(req.query);
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
    ADD_FEE_BALANCE,
    UPDATE_FEE_BALANCE,
    DELETE_FEE_BALANCE,
    FETCH_FEE_BALANCES
};
