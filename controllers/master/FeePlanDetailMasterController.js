const FeePlanDetailMasterService = require("../../services/master/FeePlanDetailMasterService");
const feePlanDetailMasterService = new FeePlanDetailMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new fee plan detail record
const ADD_FEE_PLAN_DETAIL = async (req, res) => {
    try {
        await feePlanDetailMasterService.createFeePlanDetail(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Fee plan detail added successfully',
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

// Update an existing fee plan detail record
const UPDATE_FEE_PLAN_DETAIL = async (req, res) => {
    const { feePlanDetailId } = req.params; // Assuming feePlanDetailId is passed as a route parameter
    try {
        await feePlanDetailMasterService.updateFeePlanDetail(feePlanDetailId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Fee plan detail updated successfully',
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

// Delete a fee plan detail record
const DELETE_FEE_PLAN_DETAIL = async (req, res) => {
    const { feePlanDetailId } = req.params; // Assuming feePlanDetailId is passed as a route parameter
    try {
        await feePlanDetailMasterService.deleteFeePlanDetail(feePlanDetailId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Fee plan detail deleted successfully',
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

// Fetch fee plan detail records
const FETCH_FEE_PLAN_DETAILS = async (req, res) => {
    try {
        const result = await feePlanDetailMasterService.fetchFeePlanDetails(req.query);
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
    ADD_FEE_PLAN_DETAIL,
    UPDATE_FEE_PLAN_DETAIL,
    DELETE_FEE_PLAN_DETAIL,
    FETCH_FEE_PLAN_DETAILS
};
