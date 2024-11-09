const BusMasterService = require("../../services/master/BusMasterService");
const busMasterService = new BusMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new bus record
const ADD_BUS = async (req, res) => {
    try {
        await busMasterService.createBus(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Bus added successfully',
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

// Update an existing bus record
const UPDATE_BUS = async (req, res) => {
    const { busId } = req.params; // Assuming busId is passed as a route parameter
    try {
        await busMasterService.updateBus(busId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Bus updated successfully',
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

// Delete a bus record
const DELETE_BUS = async (req, res) => {
    const { busId } = req.params; // Assuming busId is passed as a route parameter
    try {
        await busMasterService.deleteBus(busId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Bus deleted successfully',
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

// Fetch bus records
const FETCH_BUSES = async (req, res) => {
    try {
        const result = await busMasterService.fetchBuses(req.query);
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
    ADD_BUS,
    UPDATE_BUS,
    DELETE_BUS,
    FETCH_BUSES
};
