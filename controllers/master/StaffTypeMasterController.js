const StaffTypeMasterService = require("../../services/master/StaffTypeMasterService");
const staffTypeMasterService = new StaffTypeMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new staff type record
const ADD_STAFF_TYPE = async (req, res) => {
    try {
        await staffTypeMasterService.createStaffType(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Staff type added successfully',
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

// Update an existing staff type record
const UPDATE_STAFF_TYPE = async (req, res) => {
    const { staffTypeId } = req.params; // Assuming staffTypeId is passed as a route parameter
    try {
        await staffTypeMasterService.updateStaffType(staffTypeId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Staff type updated successfully',
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

// Delete a staff type record
const DELETE_STAFF_TYPE = async (req, res) => {
    const { staffTypeId } = req.params; // Assuming staffTypeId is passed as a route parameter
    try {
        await staffTypeMasterService.deleteStaffType(staffTypeId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Staff type deleted successfully',
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

// Fetch staff type records
const FETCH_STAFF_TYPES = async (req, res) => {
    try {
        const result = await staffTypeMasterService.fetchStaffTypes(req.query);
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
    ADD_STAFF_TYPE,
    UPDATE_STAFF_TYPE,
    DELETE_STAFF_TYPE,
    FETCH_STAFF_TYPES
};
