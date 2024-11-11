const StaffMasterService = require("../../services/master/StaffMasterService");
const staffMasterService = new StaffMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new staff record
const ADD_STAFF = async (req, res) => {
    try {
        await staffMasterService.createStaff(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Staff added successfully',
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

// Update an existing staff record
const UPDATE_STAFF = async (req, res) => {
    const { staffId } = req.params; // Assuming staffId is passed as a route parameter
    try {
        await staffMasterService.updateStaff(staffId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Staff updated successfully',
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

// Delete a staff record
const DELETE_STAFF = async (req, res) => {
    const { staffId } = req.params; // Assuming staffId is passed as a route parameter
    try {
        await staffMasterService.deleteStaff(staffId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Staff deleted successfully',
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

// Fetch staff records
const FETCH_STAFFS = async (req, res) => {
    try {
        const result = await staffMasterService.fetchStaffs(req.query);
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
    ADD_STAFF,
    UPDATE_STAFF,
    DELETE_STAFF,
    FETCH_STAFFS
};
