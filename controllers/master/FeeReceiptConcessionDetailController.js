const FeeReceiptConcessionDetailService = require("../../services/master/FeeReceiptConcessionDetailsService");
const feeReceiptConcessionDetailService = new FeeReceiptConcessionDetailService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new fee receipt concession detail record
const ADD_FEE_RECEIPT_CONCESSION_DETAIL = async (req, res) => {
    try {
        await feeReceiptConcessionDetailService.createFeeReceiptConcessionDetail(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Fee receipt concession detail added successfully',
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

// Update an existing fee receipt concession detail record
const UPDATE_FEE_RECEIPT_CONCESSION_DETAIL = async (req, res) => {
    const { feeReceiptConcessionDetailId } = req.params; // Assuming feeReceiptConcessionDetailId is passed as a route parameter
    try {
        await feeReceiptConcessionDetailService.updateFeeReceiptConcessionDetail(feeReceiptConcessionDetailId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Fee receipt concession detail updated successfully',
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

// Delete a fee receipt concession detail record
const DELETE_FEE_RECEIPT_CONCESSION_DETAIL = async (req, res) => {
    const { feeReceiptConcessionDetailId } = req.params; // Assuming feeReceiptConcessionDetailId is passed as a route parameter
    try {
        await feeReceiptConcessionDetailService.deleteFeeReceiptConcessionDetail(feeReceiptConcessionDetailId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Fee receipt concession detail deleted successfully',
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

// Fetch fee receipt concession detail records
const FETCH_FEE_RECEIPT_CONCESSION_DETAILS = async (req, res) => {
    try {
        const result = await feeReceiptConcessionDetailService.fetchFeeReceiptConcessionDetails(req.query);
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
    ADD_FEE_RECEIPT_CONCESSION_DETAIL,
    UPDATE_FEE_RECEIPT_CONCESSION_DETAIL,
    DELETE_FEE_RECEIPT_CONCESSION_DETAIL,
    FETCH_FEE_RECEIPT_CONCESSION_DETAILS
};
