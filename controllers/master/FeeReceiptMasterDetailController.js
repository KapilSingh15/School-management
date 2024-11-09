const FeeReceiptMasterDetailService = require("../../services/master/FeeReceiptMasterDetailService");
const feeReceiptMasterDetailService = new FeeReceiptMasterDetailService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new fee receipt master detail record
const ADD_FEE_RECEIPT_MASTER_DETAIL = async (req, res) => {
    try {
        await feeReceiptMasterDetailService.createFeeReceiptMasterDetail(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Fee receipt master detail added successfully',
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

// Update an existing fee receipt master detail record
const UPDATE_FEE_RECEIPT_MASTER_DETAIL = async (req, res) => {
    const { feeReceiptMasterDetailId } = req.params; // Assuming feeReceiptMasterDetailId is passed as a route parameter
    try {
        await feeReceiptMasterDetailService.updateFeeReceiptMasterDetail(feeReceiptMasterDetailId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Fee receipt master detail updated successfully',
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

// Delete a fee receipt master detail record
const DELETE_FEE_RECEIPT_MASTER_DETAIL = async (req, res) => {
    const { feeReceiptMasterDetailId } = req.params; // Assuming feeReceiptMasterDetailId is passed as a route parameter
    try {
        await feeReceiptMasterDetailService.deleteFeeReceiptMasterDetail(feeReceiptMasterDetailId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Fee receipt master detail deleted successfully',
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

// Fetch fee receipt master detail records
const FETCH_FEE_RECEIPT_MASTER_DETAILS = async (req, res) => {
    try {
        const result = await feeReceiptMasterDetailService.fetchFeeReceiptMasterDetails(req.query);
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
    ADD_FEE_RECEIPT_MASTER_DETAIL,
    UPDATE_FEE_RECEIPT_MASTER_DETAIL,
    DELETE_FEE_RECEIPT_MASTER_DETAIL,
    FETCH_FEE_RECEIPT_MASTER_DETAILS
};
