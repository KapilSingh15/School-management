const DriverMasterService = require("../../services/master/DriveMasterService");
const driverMasterService = new DriverMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new driver record
const ADD_DRIVER = async (req, res) => {
    try {
        await driverMasterService.createDriver(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Driver added successfully',
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

// Update an existing driver record
const UPDATE_DRIVER = async (req, res) => {
    const { driverId } = req.params; // Assuming driverId is passed as a route parameter
    try {
        await driverMasterService.updateDriver(driverId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Driver updated successfully',
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

// Delete a driver record
const DELETE_DRIVER = async (req, res) => {
    const { driverId } = req.params; // Assuming driverId is passed as a route parameter
    try {
        await driverMasterService.deleteDriver(driverId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Driver deleted successfully',
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

// Fetch driver records
const FETCH_DRIVERS = async (req, res) => {
    try {
        const result = await driverMasterService.fetchDrivers(req.query);
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
    ADD_DRIVER,
    UPDATE_DRIVER,
    DELETE_DRIVER,
    FETCH_DRIVERS
};
