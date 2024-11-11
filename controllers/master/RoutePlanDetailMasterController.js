const RoutePlanDetailMasterService = require("../../services/master/RoutePlanDetailMasterService");
const routePlanDetailMasterService = new RoutePlanDetailMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new route plan detail record
const ADD_ROUTE_PLAN_DETAIL = async (req, res) => {
    try {
        await routePlanDetailMasterService.createRoutePlanDetail(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Route plan detail added successfully',
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

// Update an existing route plan detail record
const UPDATE_ROUTE_PLAN_DETAIL = async (req, res) => {
    const { routePlanDetailId } = req.params; // Assuming routePlanDetailId is passed as a route parameter
    try {
        await routePlanDetailMasterService.updateRoutePlanDetail(routePlanDetailId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Route plan detail updated successfully',
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

// Delete a route plan detail record
const DELETE_ROUTE_PLAN_DETAIL = async (req, res) => {
    const { routePlanDetailId } = req.params; // Assuming routePlanDetailId is passed as a route parameter
    try {
        await routePlanDetailMasterService.deleteRoutePlanDetail(routePlanDetailId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Route plan detail deleted successfully',
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

// Fetch route plan detail records
const FETCH_ROUTE_PLAN_DETAILS = async (req, res) => {
    try {
        const result = await routePlanDetailMasterService.fetchRoutePlanDetails(req.query);
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
    ADD_ROUTE_PLAN_DETAIL,
    UPDATE_ROUTE_PLAN_DETAIL,
    DELETE_ROUTE_PLAN_DETAIL,
    FETCH_ROUTE_PLAN_DETAILS
};
