const FeeReceiptMasterService = require("../../services/master/FeeReceiptMasterService");
const feeReceiptMasterService = new FeeReceiptMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new fee receipt record
const ADD_FEE_RECEIPT = async (req, res) => {
    try {
        await feeReceiptMasterService.createFeeReceipt(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Fee receipt added successfully',
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

// Update an existing fee receipt record
const UPDATE_FEE_RECEIPT = async (req, res) => {
    const { feeReceiptId } = req.params; // Assuming feeReceiptId is passed as a route parameter
    try {
        await feeReceiptMasterService.updateFeeReceipt(feeReceiptId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Fee receipt updated successfully',
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

// Delete a fee receipt record
const DELETE_FEE_RECEIPT = async (req, res) => {
    const { feeReceiptId } = req.params; // Assuming feeReceiptId is passed as a route parameter
    try {
        await feeReceiptMasterService.deleteFeeReceipt(feeReceiptId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Fee receipt deleted successfully',
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

// Fetch fee receipt records
const FETCH_FEE_RECEIPTS = async (req, res) => {
    try {
        const result = await feeReceiptMasterService.fetchFeeReceipts(req.query);
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
    ADD_FEE_RECEIPT,
    UPDATE_FEE_RECEIPT,
    DELETE_FEE_RECEIPT,
    FETCH_FEE_RECEIPTS
};
