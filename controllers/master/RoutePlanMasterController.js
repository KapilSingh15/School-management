const RoutePlanMasterService = require("../../services/master/RoutePlanMasterService");
const routePlanMasterService = new RoutePlanMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new route plan record
const ADD_ROUTE_PLAN = async (req, res) => {
    try {
        await routePlanMasterService.createRoutePlan(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Route plan added successfully',
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

// Update an existing route plan record
const UPDATE_ROUTE_PLAN = async (req, res) => {
    const { routePlanId } = req.params; // Assuming routePlanId is passed as a route parameter
    try {
        await routePlanMasterService.updateRoutePlan(routePlanId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Route plan updated successfully',
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

// Delete a route plan record
const DELETE_ROUTE_PLAN = async (req, res) => {
    const { routePlanId } = req.params; // Assuming routePlanId is passed as a route parameter
    try {
        await routePlanMasterService.deleteRoutePlan(routePlanId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Route plan deleted successfully',
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

// Fetch route plan records
const FETCH_ROUTE_PLANS = async (req, res) => {
    try {
        const result = await routePlanMasterService.fetchRoutePlans(req.query);
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
    ADD_ROUTE_PLAN,
    UPDATE_ROUTE_PLAN,
    DELETE_ROUTE_PLAN,
    FETCH_ROUTE_PLANS
};
