const RouteMasterService = require("../../services/master/RouteMasterService");
const routeMasterService = new RouteMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new route record
const ADD_ROUTE = async (req, res) => {
    try {
        await routeMasterService.createRoute(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Route added successfully',
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

// Update an existing route record
const UPDATE_ROUTE = async (req, res) => {
    const { routeId } = req.params; // Assuming routeId is passed as a route parameter
    try {
        await routeMasterService.updateRoute(routeId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Route updated successfully',
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

// Delete a route record
const DELETE_ROUTE = async (req, res) => {
    const { routeId } = req.params; // Assuming routeId is passed as a route parameter
    try {
        await routeMasterService.deleteRoute(routeId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Route deleted successfully',
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

// Fetch route records
const FETCH_ROUTES = async (req, res) => {
    try {
        const result = await routeMasterService.fetchRoutes(req.query);
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
    ADD_ROUTE,
    UPDATE_ROUTE,
    DELETE_ROUTE,
    FETCH_ROUTES
};
