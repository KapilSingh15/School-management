const DriverTypeMasterService = require("../../services/master/DriverTypeMasterService");
const driverTypeMasterService = new DriverTypeMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new driver type record
const ADD_DRIVER_TYPE = async (req, res) => {
    try {
        await driverTypeMasterService.createDriverType(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Driver type added successfully',
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

// Update an existing driver type record
const UPDATE_DRIVER_TYPE = async (req, res) => {
    const { driverTypeId } = req.params; // Assuming driverTypeId is passed as a route parameter
    try {
        await driverTypeMasterService.updateDriverType(driverTypeId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Driver type updated successfully',
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

// Delete a driver type record
const DELETE_DRIVER_TYPE = async (req, res) => {
    const { driverTypeId } = req.params; // Assuming driverTypeId is passed as a route parameter
    try {
        await driverTypeMasterService.deleteDriverType(driverTypeId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Driver type deleted successfully',
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

// Fetch driver type records
const FETCH_DRIVER_TYPES = async (req, res) => {
    try {
        const result = await driverTypeMasterService.fetchDriverTypes(req.query);
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
    ADD_DRIVER_TYPE,
    UPDATE_DRIVER_TYPE,
    DELETE_DRIVER_TYPE,
    FETCH_DRIVER_TYPES
};
