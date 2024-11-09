const FeeReceiptDetailService = require("../../services/master/FeeReceiptDetailService");
const feeReceiptDetailService = new FeeReceiptDetailService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new fee receipt detail record
const ADD_FEE_RECEIPT_DETAIL = async (req, res) => {
    try {
        await feeReceiptDetailService.createFeeReceiptDetail(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Fee receipt detail added successfully',
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

// Update an existing fee receipt detail record
const UPDATE_FEE_RECEIPT_DETAIL = async (req, res) => {
    const { feeReceiptDetailId } = req.params; // Assuming feeReceiptDetailId is passed as a route parameter
    try {
        await feeReceiptDetailService.updateFeeReceiptDetail(feeReceiptDetailId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Fee receipt detail updated successfully',
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

// Delete a fee receipt detail record
const DELETE_FEE_RECEIPT_DETAIL = async (req, res) => {
    const { feeReceiptDetailId } = req.params; // Assuming feeReceiptDetailId is passed as a route parameter
    try {
        await feeReceiptDetailService.deleteFeeReceiptDetail(feeReceiptDetailId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Fee receipt detail deleted successfully',
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

// Fetch fee receipt detail records
const FETCH_FEE_RECEIPT_DETAILS = async (req, res) => {
    try {
        const result = await feeReceiptDetailService.fetchFeeReceiptDetails(req.query);
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
    ADD_FEE_RECEIPT_DETAIL,
    UPDATE_FEE_RECEIPT_DETAIL,
    DELETE_FEE_RECEIPT_DETAIL,
    FETCH_FEE_RECEIPT_DETAILS
};
