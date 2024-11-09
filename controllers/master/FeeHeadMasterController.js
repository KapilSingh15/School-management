const FeeHeadMasterService = require("../../services/master/FeeHeadMasterService");
const feeHeadMasterService = new FeeHeadMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new fee head record
const ADD_FEE_HEAD = async (req, res) => {
    try {
        await feeHeadMasterService.createFeeHead(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Fee head added successfully',
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

// Update an existing fee head record
const UPDATE_FEE_HEAD = async (req, res) => {
    const { feeHeadId } = req.params; // Assuming feeHeadId is passed as a route parameter
    try {
        await feeHeadMasterService.updateFeeHead(feeHeadId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Fee head updated successfully',
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

// Delete a fee head record
const DELETE_FEE_HEAD = async (req, res) => {
    const { feeHeadId } = req.params; // Assuming feeHeadId is passed as a route parameter
    try {
        await feeHeadMasterService.deleteFeeHead(feeHeadId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Fee head deleted successfully',
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

// Fetch fee head records
const FETCH_FEE_HEADS = async (req, res) => {
    try {
        const result = await feeHeadMasterService.fetchFeeHeads(req.query);
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
    ADD_FEE_HEAD,
    UPDATE_FEE_HEAD,
    DELETE_FEE_HEAD,
    FETCH_FEE_HEADS
};
