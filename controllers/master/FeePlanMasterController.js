const FeePlanMasterService = require("../../services/master/FeePlanMasterService");
const feePlanMasterService = new FeePlanMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new fee plan record
const ADD_FEE_PLAN = async (req, res) => {
    try {
        await feePlanMasterService.createFeePlan(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Fee plan added successfully',
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

// Update an existing fee plan record
const UPDATE_FEE_PLAN = async (req, res) => {
    const { feePlanId } = req.params; // Assuming feePlanId is passed as a route parameter
    try {
        await feePlanMasterService.updateFeePlan(feePlanId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Fee plan updated successfully',
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

// Delete a fee plan record
const DELETE_FEE_PLAN = async (req, res) => {
    const { feePlanId } = req.params; // Assuming feePlanId is passed as a route parameter
    try {
        await feePlanMasterService.deleteFeePlan(feePlanId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Fee plan deleted successfully',
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

// Fetch fee plan records
const FETCH_FEE_PLANS = async (req, res) => {
    try {
        const result = await feePlanMasterService.fetchFeePlans(req.query);
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
    ADD_FEE_PLAN,
    UPDATE_FEE_PLAN,
    DELETE_FEE_PLAN,
    FETCH_FEE_PLANS
};
