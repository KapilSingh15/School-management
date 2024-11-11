const StaffRoleMasterService = require("../../services/master/StaffRoleMasterService");
const staffRoleMasterService = new StaffRoleMasterService();
const httpStatus = require("http-status");
const Response = require("../../response/index");

// Add a new staff role record
const ADD_STAFF_ROLE = async (req, res) => {
    try {
        await staffRoleMasterService.createStaffRole(req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Staff role added successfully',
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

// Update an existing staff role record
const UPDATE_STAFF_ROLE = async (req, res) => {
    const { staffRoleId } = req.params; // Assuming staffRoleId is passed as a route parameter
    try {
        await staffRoleMasterService.updateStaffRole(staffRoleId, req.body);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Staff role updated successfully',
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

// Delete a staff role record
const DELETE_STAFF_ROLE = async (req, res) => {
    const { staffRoleId } = req.params; // Assuming staffRoleId is passed as a route parameter
    try {
        await staffRoleMasterService.deleteStaffRole(staffRoleId);
        return Response.success(
            req,
            res,
            {
                msgCode: "API_SUCCESS",
                data: 'Staff role deleted successfully',
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

// Fetch staff role records
const FETCH_STAFF_ROLES = async (req, res) => {
    try {
        const result = await staffRoleMasterService.fetchStaffRoles(req.query);
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
    ADD_STAFF_ROLE,
    UPDATE_STAFF_ROLE,
    DELETE_STAFF_ROLE,
    FETCH_STAFF_ROLES
};
